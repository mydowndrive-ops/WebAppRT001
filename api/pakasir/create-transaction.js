// Vercel Serverless Function: Create Transaction Pakasir API v2
const { setTransaction } = require('./store');

module.exports = async function handler(req, res) {
  // 1. CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Hanya menerima request POST.' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        body = {};
      }
    }
    body = body || {};

    const {
      order_id,
      amount,
      method = 'qris',
      resident_id,
      resident_name,
      months,
      year
    } = body;

    if (!order_id || !amount) {
      return res.status(400).json({
        error: 'Parameter tidak lengkap. order_id dan amount wajib diisi.'
      });
    }

    const apiKey = process.env.PAKASIR_API_KEY;
    const projectSlug = process.env.PAKASIR_PROJECT_SLUG;

    // A. Fallback Mode: Jika API Key belum disetel di Vercel Environment Variables
    if (!apiKey || !projectSlug || apiKey === 'your_api_key_here') {
      const mockTxnId = 'sandbox_' + Date.now().toString(36);
      const mockQrString = `00020101021226680016ID.CO.PAKASIR.WWW01189360091800000000000215${order_id}520458125303360540${amount}5802ID5919RT001 GRAHA ASRI6013CIKARANG UTAR63040A1B`;
      
      const mockResult = {
        success: true,
        isSandbox: true,
        message: 'Mode Simulasi Aktif (PAKASIR_API_KEY belum disetel di Vercel). Menggunakan Sandbox Demo.',
        txn_id: mockTxnId,
        project: projectSlug || 'demo-rt001',
        order_id: order_id,
        amount: Number(amount),
        fee: 500,
        total_payment: Number(amount) + 500,
        payment_method: method,
        qr_string: method === 'qris' ? mockQrString : '',
        va_number: method !== 'qris' ? '8801928' + Math.floor(100000 + Math.random() * 900000) : '',
        payment_link: `https://app.pakasir.com/pay-v2/${mockTxnId}`
      };

      setTransaction(order_id, {
        ...mockResult,
        status: 'pending',
        resident_id,
        resident_name,
        months,
        year,
        createdAt: new Date().toISOString()
      });

      return res.status(200).json(mockResult);
    }

    // B. Live Mode: Request ke Endpoint Resmi Pakasir API v2
    const targetUrl = `https://app.pakasir.com/api/v2/create-transaction/${encodeURIComponent(projectSlug)}/${encodeURIComponent(order_id)}`;

    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': apiKey
      },
      body: JSON.stringify({
        method: method,
        amount: Number(amount)
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Pakasir API Error:', data);
      return res.status(response.status).json({
        success: false,
        error: data.message || 'Gagal membuat transaksi di Pakasir.',
        details: data
      });
    }

    // Simpan ke memory/cache store untuk keperluan polling & callback
    setTransaction(order_id, {
      ...data,
      status: 'pending',
      resident_id,
      resident_name,
      months,
      year,
      createdAt: new Date().toISOString()
    });

    return res.status(200).json({
      success: true,
      isSandbox: false,
      ...data
    });

  } catch (error) {
    console.error('Error create-transaction:', error);
    return res.status(500).json({
      success: false,
      error: 'Terjadi kesalahan pada server backend saat menghubungi Pakasir.',
      message: error.message
    });
  }
};
