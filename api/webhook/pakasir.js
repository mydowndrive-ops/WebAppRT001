// Vercel Serverless Function: Webhook Endpoint /api/webhook/pakasir
// Menerima callback notifikasi pembayaran sukses dari Pakasir (https://app.pakasir.com)

const webhookHandler = require('../pakasir/webhook');

module.exports = async function handler(req, res) {
  return webhookHandler(req, res);
};
