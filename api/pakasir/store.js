// Helper penyimpanan transaksi Pakasir di serverless backend
const fs = require('fs');
const path = require('path');

const TMP_FILE = path.join(process.platform === 'win32' ? process.env.TEMP || '.' : '/tmp', 'rt_pakasir_txs.json');

// In-memory memory cache
const memoryStore = new Map();

function readDiskCache() {
  try {
    if (fs.existsSync(TMP_FILE)) {
      const raw = fs.readFileSync(TMP_FILE, 'utf8');
      const data = JSON.parse(raw);
      for (const [k, v] of Object.entries(data)) {
        memoryStore.set(k, v);
      }
    }
  } catch (e) {
    // Ignore cache error in ephemeral environments
  }
}

function writeDiskCache() {
  try {
    const obj = {};
    for (const [k, v] of memoryStore.entries()) {
      obj[k] = v;
    }
    fs.writeFileSync(TMP_FILE, JSON.stringify(obj, null, 2), 'utf8');
  } catch (e) {
    // Ignore cache error in ephemeral environments
  }
}

// Inisialisasi awal
readDiskCache();

function setTransaction(orderId, data) {
  readDiskCache();
  const existing = memoryStore.get(orderId) || {};
  const updated = {
    ...existing,
    ...data,
    updatedAt: new Date().toISOString()
  };
  memoryStore.set(orderId, updated);
  writeDiskCache();
  return updated;
}

function getTransaction(orderId) {
  readDiskCache();
  return memoryStore.get(orderId) || null;
}

function updateTransactionStatus(orderId, status, extraData = {}) {
  readDiskCache();
  const current = memoryStore.get(orderId) || { orderId, createdAt: new Date().toISOString() };
  current.status = status;
  current.completedAt = status === 'completed' ? (extraData.completedAt || new Date().toISOString()) : current.completedAt;
  Object.assign(current, extraData);
  memoryStore.set(orderId, current);
  writeDiskCache();
  return current;
}

module.exports = {
  setTransaction,
  getTransaction,
  updateTransactionStatus
};
