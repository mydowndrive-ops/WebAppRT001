// Vercel Serverless Function: Check Status Transaksi Pakasir
const { getTransaction, updateTransactionStatus } = require('./store');

module.exports = async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const orderId = req.query.order_id || req.query.orderId;
  const simulateSuccess = req.query.simulate === '1' || req.query.simulate_success === '1';

  if (!orderId) {
    return res.status(400).json({ error: 'order_id wajib disertakan dalam query parameter.' });
  }

  try {
    let tx = getTransaction(orderId);

    // Fitur Sandbox Simulator: Untuk keperluan pengujian lokal/demo langsung
    if (simulateSuccess && tx) {
      tx = updateTransactionStatus(orderId, 'completed', {
        simulated: true,
        completedAt: new Date().toISOString()
      });
    }

    if (!tx) {
      return res.status(404).json({
        success: false,
        status: 'not_found',
        message: `Transaksi dengan Order ID ${orderId} belum tercatat di server.`
      });
    }

    return res.status(200).json({
      success: true,
      order_id: orderId,
      status: tx.status || 'pending',
      amount: tx.amount,
      payment_method: tx.payment_method,
      completedAt: tx.completedAt,
      transaction: tx
    });

  } catch (error) {
    console.error('Error check-status:', error);
    return res.status(500).json({
      success: false,
      error: 'Gagal memeriksa status transaksi.',
      message: error.message
    });
  }
};
