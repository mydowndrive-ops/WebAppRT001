// Vercel Serverless Function: Webhook Callback Pakasir
const { updateTransactionStatus, getTransaction } = require('./store');

module.exports = async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Api-Key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Jika diakses via GET, berikan status informasi endpoint webhook
  if (req.method === 'GET') {
    return res.status(200).json({
      message: 'RT-FinSmart PRO Pakasir Webhook Endpoint siap menerima notifikasi pembayaran.',
      endpoint: '/api/pakasir/webhook',
      status: 'active'
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed.' });
  }

  try {
    let payload = req.body;
    if (typeof payload === 'string') {
      try {
        payload = JSON.parse(payload);
      } catch (e) {
        payload = {};
      }
    }
    payload = payload || {};

    const {
      amount,
      order_id,
      project,
      status,
      payment_method,
      completed_at
    } = payload;

    if (!order_id) {
      return res.status(400).json({ error: 'Payload tidak valid. order_id tidak ditemukan.' });
    }

    console.log(`[Pakasir Webhook] Notifikasi diterima untuk Order ID: ${order_id}, Status: ${status}, Nominal: Rp ${amount}`);

    // Status pembayaran berhasil di Pakasir adalah "completed" atau "success"
    const isSuccess = (status === 'completed' || status === 'success' || status === 'paid');

    if (isSuccess) {
      const updatedTx = updateTransactionStatus(order_id, 'completed', {
        amount: Number(amount),
        project,
        payment_method: payment_method || 'qris',
        completedAt: completed_at || new Date().toISOString()
      });

      return res.status(200).json({
        success: true,
        message: `Pembayaran untuk order ${order_id} berhasil diverifikasi & dicatat!`,
        transaction: updatedTx
      });
    } else {
      updateTransactionStatus(order_id, status || 'pending', {
        details: payload
      });

      return res.status(200).json({
        success: true,
        message: `Status order ${order_id} diperbarui menjadi: ${status}.`
      });
    }

  } catch (error) {
    console.error('Error handling Pakasir webhook:', error);
    return res.status(500).json({
      success: false,
      error: 'Terjadi kesalahan saat memproses webhook.',
      message: error.message
    });
  }
};
