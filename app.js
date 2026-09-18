/**
 * RT-FinSmart PRO - Executive Financial Management System
 * RT.001 / RW.013
 * 
 * Auto-Split Engine, Batch Checklist Matrix, Executive Analytics,
 * WhatsApp Receipt Generator, PWA & Local Persistence.
 */

// ==================== INITIAL CONFIG & STATE ====================

const APP_STORAGE_KEY = 'RT001_FINSMART_PRO_DATA_V1';

const DEFAULT_POS_CONFIG = [
  { id: 'sampah', name: 'Anggaran Sampah & Kebersihan', defaultNominal: 20000, icon: 'fa-solid fa-recycle', color: '#10b981' },
  { id: 'kas_rt', name: 'Anggaran Kas RT', defaultNominal: 10000, icon: 'fa-solid fa-building-columns', color: '#f59e0b' },
  { id: 'dana_sosial', name: 'Anggaran Dana Sosial', defaultNominal: 5000, icon: 'fa-solid fa-hand-holding-heart', color: '#06b6d4' },
  { id: 'santunan_duka', name: 'Anggaran Santunan Duka', defaultNominal: 5000, icon: 'fa-solid fa-dove', color: '#6366f1' },
  { id: 'phbi', name: 'Anggaran Keagamaan (PHBI)', defaultNominal: 5000, icon: 'fa-solid fa-mosque', color: '#a855f7' },
  { id: 'hut_1708', name: 'Anggaran HUT RI (1708)', defaultNominal: 5000, icon: 'fa-solid fa-flag', color: '#f43f5e' }
];

const OTHER_POS_CONFIG = [
  { id: 'shr', name: 'Pos SHR (Sumbangan Hari Raya)', icon: 'fa-solid fa-gifts', color: '#fbbf24' },
  { id: 'ronda', name: 'Pos Iuran Ronda / Keamanan', icon: 'fa-solid fa-shield-halved', color: '#3b82f6' },
  { id: 'pembangunan', name: 'Pos Pembangunan & Fasum', icon: 'fa-solid fa-trowel-bricks', color: '#ec4899' },
  { id: 'sukarela', name: 'Pos Donasi Sukarela', icon: 'fa-solid fa-heart', color: '#14b8a6' }
];

const DEFAULT_ACCOUNTS = [
  {
    id: 'b1',
    name: 'Bendahara 1',
    roleTitle: 'Bendahara 1 (Admin RBAC)',
    desc: 'Admin RBAC',
    badge: 'Keuangan Utama',
    badgeClass: 'b1-pill',
    icon: 'fa-solid fa-crown',
    colorClass: 'gold-icon',
    accessLevel: 'B1'
  },
  {
    id: 'b2',
    name: 'Bendahara 2',
    roleTitle: 'Bendahara 2 (Koordinator Jimpitan)',
    desc: 'Koordinator Jimpitan & Ronda',
    badge: 'JIMPITAN',
    badgeClass: 'b2-pill',
    icon: 'fa-solid fa-moon',
    colorClass: 'emerald-icon',
    accessLevel: 'B2'
  },
  {
    id: 'pengurus',
    name: 'Pengurus RT',
    roleTitle: 'Pengurus RT (Ketua, Sekr, Humas)',
    desc: 'Agenda, Ronda & Aspirasi Warga',
    badge: 'PENGURUS',
    badgeClass: 'pengurus-pill',
    icon: 'fa-solid fa-user-tie',
    colorClass: 'purple-icon',
    accessLevel: 'PENGURUS'
  },
  {
    id: 'warga',
    name: 'Warga RT.001',
    roleTitle: 'Portal Warga Terverifikasi',
    desc: 'Cek Iuran, Bantuan & Jadwal Ronda',
    badge: 'WARGA',
    badgeClass: 'warga-pill',
    icon: 'fa-solid fa-house-user',
    colorClass: 'cyan-icon',
    accessLevel: 'WARGA'
  }
];

const DEFAULT_FUND_REQUESTS = [
  {
    id: 'DANA-202609-001',
    residentId: 'w-1',
    residentName: 'Wageyanto',
    address: 'Jl. Citarum II Blok B6 No. 02',
    phone: '081289060002',
    category: 'Lampu & Kelistrikan PJU',
    targetPos: 'pembangunan',
    targetPosName: 'Pos Pembangunan & Fasum',
    title: 'Penggantian 2 Bohlam Lampu PJU Mati Depan Blok B6',
    amount: 350000,
    urgency: 'Tinggi',
    location: 'Jl. Citarum II depan tiang Blok B6 No. 04 & 06',
    description: 'Lampu penerangan jalan utama mati sejak 3 hari lalu. Kondisi jalan menjadi gelap gulita saat malam hari dan rawan bagi keamanan warga yang melintas.',
    date: '2026-09-14 19:30',
    status: 'approved',
    adminNote: 'Disetujui untuk pembelian 2 bohlam LED outdoor 50W tahan air.',
    photoUrl: ''
  },
  {
    id: 'DANA-202609-002',
    residentId: 'w-2',
    residentName: 'Fatkhurahman',
    address: 'Jl. Citarum II Blok B6 No. 04',
    phone: '081289060004',
    category: 'Keamanan & Pos Siskamling',
    targetPos: 'ronda',
    targetPosName: 'Pos Iuran Ronda / Keamanan',
    title: 'Perbaikan Engsel & Gembok Portal Akses Siskamling',
    amount: 185000,
    urgency: 'Mendesak',
    location: 'Akses Portal Masuk Siskamling Jl. Citarum II',
    description: 'Engsel portal besi agak macet dan gembok pengaman malam rusak/berkarat, perlu diganti segera agar penutupan portal jam 23.00 berjalan lancar.',
    date: '2026-09-16 08:45',
    status: 'pending',
    adminNote: '',
    photoUrl: ''
  },
  {
    id: 'DANA-202609-003',
    residentId: 'w-6',
    residentName: 'Jumiran',
    address: 'Jl. Citarum II Blok B6 No. 12',
    phone: '081289060012',
    category: 'Kebersihan & Saluran Drainase',
    targetPos: 'sampah',
    targetPosName: 'Anggaran Sampah & Kebersihan',
    title: 'Pembersihan Sedimen Lumpur & Sampah Saluran Got Blok B6',
    amount: 450000,
    urgency: 'Normal',
    location: 'Saluran air depan Blok B6 No. 10 - 18',
    description: 'Menjelang musim hujan, sedimen lumpur got mulai meninggi, perlu disewa tenaga kebersihan untuk pengerukan got agar tidak tersumbat dan banjir.',
    date: '2026-09-12 10:15',
    status: 'disbursed',
    adminNote: 'Dana telah dicairkan dan pekerjaan pengerukan got telah tuntas dilaksanakan bersama warga.',
    photoUrl: ''
  }
];

const DEFAULT_RONDA_GROUPS = [
  {
    week: 1,
    weekName: 'Minggu ke-1',
    cycle: 'Sabtu Ke-1 Tiap Bulan',
    leader: { name: 'Pak Budi', initials: 'BD', role: 'Komandan Regu' },
    members: [
      { name: 'Pak Joko', initials: 'JK' },
      { name: 'Pak Ahmad', initials: 'AH' },
      { name: 'Pak Doni', initials: 'DN' }
    ]
  },
  {
    week: 2,
    weekName: 'Minggu ke-2',
    cycle: 'Sabtu Ke-2 Tiap Bulan',
    leader: { name: 'Pak Slamet', initials: 'SL', role: 'Komandan Regu' },
    members: [
      { name: 'Pak Eko', initials: 'EK' },
      { name: 'Pak Rudi', initials: 'RD' },
      { name: 'Pak Yanto', initials: 'YT' }
    ]
  },
  {
    week: 3,
    weekName: 'Minggu ke-3',
    cycle: 'Sabtu Ke-3 Tiap Bulan',
    leader: { name: 'Pak Wawan', initials: 'WW', role: 'Komandan Regu' },
    members: [
      { name: 'Pak Agus', initials: 'AG' },
      { name: 'Pak Haryanto', initials: 'HY' },
      { name: 'Pak Dedi', initials: 'DD' }
    ]
  },
  {
    week: 4,
    weekName: 'Minggu ke-4',
    cycle: 'Sabtu Ke-4 Tiap Bulan',
    leader: { name: 'Pak Hendra', initials: 'HD', role: 'Komandan Regu' },
    members: [
      { name: 'Pak Rian', initials: 'RN' },
      { name: 'Pak Fajar', initials: 'FJ' },
      { name: 'Pak Arif', initials: 'AF' }
    ]
  }
];

const INITIAL_RESIDENTS = [
  {
    "id": "w-1",
    "noUrut": 1,
    "name": "Wageyanto",
    "username": "Wageyanto",
    "password": "C2B602",
    "street": "Jl. Citarum II",
    "block": "Blok B6",
    "houseNo": "No. 02",
    "phone": "081289060002",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-2",
    "noUrut": 2,
    "name": "Fatkhurahman",
    "username": "Fatkhurahman",
    "password": "C2B604",
    "street": "Jl. Citarum II",
    "block": "Blok B6",
    "houseNo": "No. 04",
    "phone": "081289060004",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-3",
    "noUrut": 3,
    "name": "Nono Suyatno",
    "username": "Nono Suyatno",
    "password": "C2B606",
    "street": "Jl. Citarum II",
    "block": "Blok B6",
    "houseNo": "No. 06",
    "phone": "081289060006",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-4",
    "noUrut": 4,
    "name": "Manahara Dimas",
    "username": "Manahara Dimas",
    "password": "C2B608",
    "street": "Jl. Citarum II",
    "block": "Blok B6",
    "houseNo": "No. 08",
    "phone": "081289060008",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-5",
    "noUrut": 5,
    "name": "Jati Purnomo",
    "username": "Jati Purnomo",
    "password": "C2B610",
    "street": "Jl. Citarum II",
    "block": "Blok B6",
    "houseNo": "No. 10",
    "phone": "081289060010",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-6",
    "noUrut": 6,
    "name": "Jumiran",
    "username": "Jumiran",
    "password": "C2B612",
    "street": "Jl. Citarum II",
    "block": "Blok B6",
    "houseNo": "No. 12",
    "phone": "081289060012",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-7",
    "noUrut": 7,
    "name": "M.Hutagalung",
    "username": "M.Hutagalung",
    "password": "C2B614",
    "street": "Jl. Citarum II",
    "block": "Blok B6",
    "houseNo": "No. 14",
    "phone": "081289060014",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-8",
    "noUrut": 8,
    "name": "Andriyanto. K",
    "username": "Andriyanto. K",
    "password": "C2B616",
    "street": "Jl. Citarum II",
    "block": "Blok B6",
    "houseNo": "No. 16",
    "phone": "081289060016",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-9",
    "noUrut": 9,
    "name": "Sukoco",
    "username": "Sukoco",
    "password": "C2B618",
    "street": "Jl. Citarum II",
    "block": "Blok B6",
    "houseNo": "No. 18",
    "phone": "081289060018",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-10",
    "noUrut": 10,
    "name": "Khoirul",
    "username": "Khoirul",
    "password": "C2B620",
    "street": "Jl. Citarum II",
    "block": "Blok B6",
    "houseNo": "No. 20",
    "phone": "081289060020",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-11",
    "noUrut": 11,
    "name": "Mehdi Bazargan",
    "username": "Mehdi Bazargan",
    "password": "C2B622",
    "street": "Jl. Citarum II",
    "block": "Blok B6",
    "houseNo": "No. 22",
    "phone": "081289060022",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-12",
    "noUrut": 12,
    "name": "Agus Nursanto",
    "username": "Agus Nursanto",
    "password": "C2B624",
    "street": "Jl. Citarum II",
    "block": "Blok B6",
    "houseNo": "No. 24",
    "phone": "081289060024",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-13",
    "noUrut": 13,
    "name": "Silmi",
    "username": "Silmi",
    "password": "C2B626",
    "street": "Jl. Citarum II",
    "block": "Blok B6",
    "houseNo": "No. 26",
    "phone": "081289060026",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-14",
    "noUrut": 14,
    "name": "Sutarno",
    "username": "Sutarno",
    "password": "C2B628",
    "street": "Jl. Citarum II",
    "block": "Blok B6",
    "houseNo": "No. 28",
    "phone": "081289060028",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-15",
    "noUrut": 16,
    "name": "Joko Susilo",
    "username": "Joko Susilo",
    "password": "C2B632",
    "street": "Jl. Citarum II",
    "block": "Blok B6",
    "houseNo": "No. 32",
    "phone": "081289060032",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-16",
    "noUrut": 17,
    "name": "Agung",
    "username": "Agung",
    "password": "C2B634",
    "street": "Jl. Citarum II",
    "block": "Blok B6",
    "houseNo": "No. 34",
    "phone": "081289060034",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-17",
    "noUrut": 18,
    "name": "Yatno",
    "username": "Yatno",
    "password": "C2B636",
    "street": "Jl. Citarum II",
    "block": "Blok B6",
    "houseNo": "No. 36",
    "phone": "081289060036",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-18",
    "noUrut": 19,
    "name": "H.Tahmidul Akbar",
    "username": "H.Tahmidul Akbar",
    "password": "C2B701",
    "street": "Jl. Citarum II",
    "block": "Blok B7",
    "houseNo": "No. 01",
    "phone": "081289070001",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-19",
    "noUrut": 20,
    "name": "Isriyanto Putra",
    "username": "Isriyanto Putra",
    "password": "C2B703",
    "street": "Jl. Citarum II",
    "block": "Blok B7",
    "houseNo": "No. 03",
    "phone": "081289070003",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-20",
    "noUrut": 21,
    "name": "Ama jupri",
    "username": "Ama jupri",
    "password": "C2B705",
    "street": "Jl. Citarum II",
    "block": "Blok B7",
    "houseNo": "No. 05",
    "phone": "081289070005",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-21",
    "noUrut": 22,
    "name": "Faisal Muit",
    "username": "Faisal Muit",
    "password": "C2B707",
    "street": "Jl. Citarum II",
    "block": "Blok B7",
    "houseNo": "No. 07",
    "phone": "081289070007",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-22",
    "noUrut": 23,
    "name": "Didi Prayitno",
    "username": "Didi Prayitno",
    "password": "C2B709",
    "street": "Jl. Citarum II",
    "block": "Blok B7",
    "houseNo": "No. 09",
    "phone": "081289070009",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-23",
    "noUrut": 24,
    "name": "Abu Rifat",
    "username": "Abu Rifat",
    "password": "C2B711",
    "street": "Jl. Citarum II",
    "block": "Blok B7",
    "houseNo": "No. 11",
    "phone": "081289070011",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-24",
    "noUrut": 25,
    "name": "Dedi",
    "username": "Dedi",
    "password": "C2B715",
    "street": "Jl. Citarum II",
    "block": "Blok B7",
    "houseNo": "No. 15",
    "phone": "081289070015",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-25",
    "noUrut": 26,
    "name": "Bagas Santoso",
    "username": "Bagas Santoso",
    "password": "C2B717",
    "street": "Jl. Citarum II",
    "block": "Blok B7",
    "houseNo": "No. 17",
    "phone": "081289070017",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-26",
    "noUrut": 27,
    "name": "Hardiyatna",
    "username": "Hardiyatna",
    "password": "C2B719",
    "street": "Jl. Citarum II",
    "block": "Blok B7",
    "houseNo": "No. 19",
    "phone": "081289070019",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-27",
    "noUrut": 29,
    "name": "Supriya/Kapri",
    "username": "Supriya/Kapri",
    "password": "C2B723",
    "street": "Jl. Citarum II",
    "block": "Blok B7",
    "houseNo": "No. 23",
    "phone": "081289070023",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-28",
    "noUrut": 30,
    "name": "Faiz",
    "username": "Faiz",
    "password": "C2B725",
    "street": "Jl. Citarum II",
    "block": "Blok B7",
    "houseNo": "No. 25",
    "phone": "081289070025",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-29",
    "noUrut": 31,
    "name": "Supeno",
    "username": "Supeno",
    "password": "C2B727",
    "street": "Jl. Citarum II",
    "block": "Blok B7",
    "houseNo": "No. 27",
    "phone": "081289070027",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-30",
    "noUrut": 32,
    "name": "Arif Nur",
    "username": "Arif Nur",
    "password": "C2B729",
    "street": "Jl. Citarum II",
    "block": "Blok B7",
    "houseNo": "No. 29",
    "phone": "081289070029",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-31",
    "noUrut": 33,
    "name": "Yusuf",
    "username": "Yusuf",
    "password": "C2B731",
    "street": "Jl. Citarum II",
    "block": "Blok B7",
    "houseNo": "No. 31",
    "phone": "081289070031",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-32",
    "noUrut": 34,
    "name": "Oktaviandri",
    "username": "Oktaviandri",
    "password": "C2B733",
    "street": "Jl. Citarum II",
    "block": "Blok B7",
    "houseNo": "No. 33",
    "phone": "081289070033",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-33",
    "noUrut": 35,
    "name": "Trio Rahmat",
    "username": "Trio Rahmat",
    "password": "C2B735",
    "street": "Jl. Citarum II",
    "block": "Blok B7",
    "houseNo": "No. 35",
    "phone": "081289070035",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-34",
    "noUrut": 36,
    "name": "Fery",
    "username": "Fery",
    "password": "C2B737A",
    "street": "Jl. Citarum II",
    "block": "Blok B7",
    "houseNo": "No. 37A",
    "phone": "081289070037",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-35",
    "noUrut": 37,
    "name": "Fery",
    "username": "Fery",
    "password": "C2B737B",
    "street": "Jl. Citarum II",
    "block": "Blok B7",
    "houseNo": "No. 37B",
    "phone": "081289070037",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-36",
    "noUrut": 38,
    "name": "Yudi Adjie. D",
    "username": "Yudi Adjie. D",
    "password": "C4B601",
    "street": "Jl. Citarum IVA",
    "block": "Blok B6",
    "houseNo": "No. 01",
    "phone": "081289060001",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-37",
    "noUrut": 39,
    "name": "Ibnu",
    "username": "Ibnu",
    "password": "C4B603",
    "street": "Jl. Citarum IVA",
    "block": "Blok B6",
    "houseNo": "No. 03",
    "phone": "081289060003",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-38",
    "noUrut": 40,
    "name": "Elan",
    "username": "Elan",
    "password": "C4B605",
    "street": "Jl. Citarum IVA",
    "block": "Blok B6",
    "houseNo": "No. 05",
    "phone": "081289060005",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-39",
    "noUrut": 41,
    "name": "Sujari",
    "username": "Sujari",
    "password": "C4B607",
    "street": "Jl. Citarum IVA",
    "block": "Blok B6",
    "houseNo": "No. 07",
    "phone": "081289060007",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-40",
    "noUrut": 42,
    "name": "Andira",
    "username": "Andira",
    "password": "C4B609",
    "street": "Jl. Citarum IVA",
    "block": "Blok B6",
    "houseNo": "No. 09",
    "phone": "081289060009",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-41",
    "noUrut": 43,
    "name": "M. Askur",
    "username": "M. Askur",
    "password": "C4B611",
    "street": "Jl. Citarum IVA",
    "block": "Blok B6",
    "houseNo": "No. 11",
    "phone": "081289060011",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-42",
    "noUrut": 44,
    "name": "Supriyanto",
    "username": "Supriyanto",
    "password": "C4B615",
    "street": "Jl. Citarum IVA",
    "block": "Blok B6",
    "houseNo": "No. 15",
    "phone": "081289060015",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-43",
    "noUrut": 45,
    "name": "Omos",
    "username": "Omos",
    "password": "C4B617",
    "street": "Jl. Citarum IVA",
    "block": "Blok B6",
    "houseNo": "No. 17",
    "phone": "081289060017",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-44",
    "noUrut": 46,
    "name": "Maman",
    "username": "Maman",
    "password": "C4B619",
    "street": "Jl. Citarum IVA",
    "block": "Blok B6",
    "houseNo": "No. 19",
    "phone": "081289060019",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-45",
    "noUrut": 47,
    "name": "Abib Dwi K",
    "username": "Abib Dwi K",
    "password": "C4B621",
    "street": "Jl. Citarum IVA",
    "block": "Blok B6",
    "houseNo": "No. 21",
    "phone": "081289060021",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-46",
    "noUrut": 48,
    "name": "Marsidi",
    "username": "Marsidi",
    "password": "C4B623",
    "street": "Jl. Citarum IVA",
    "block": "Blok B6",
    "houseNo": "No. 23",
    "phone": "081289060023",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-47",
    "noUrut": 49,
    "name": "Juniar Sinaga",
    "username": "Juniar Sinaga",
    "password": "C4B625",
    "street": "Jl. Citarum IVA",
    "block": "Blok B6",
    "houseNo": "No. 25",
    "phone": "081289060025",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-48",
    "noUrut": 50,
    "name": "Warsito",
    "username": "Warsito",
    "password": "C4B627",
    "street": "Jl. Citarum IVA",
    "block": "Blok B6",
    "houseNo": "No. 27",
    "phone": "081289060027",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-49",
    "noUrut": 51,
    "name": "Usep Usmara",
    "username": "Usep Usmara",
    "password": "C4B629",
    "street": "Jl. Citarum IVA",
    "block": "Blok B6",
    "houseNo": "No. 29",
    "phone": "081289060029",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-50",
    "noUrut": 52,
    "name": "Sahidin",
    "username": "Sahidin",
    "password": "C4B731",
    "street": "Jl. Citarum IVA",
    "block": "Blok B7",
    "houseNo": "No. 31",
    "phone": "081289070031",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-51",
    "noUrut": 53,
    "name": "Triyanto",
    "username": "Triyanto",
    "password": "C4B633",
    "street": "Jl. Citarum IVA",
    "block": "Blok B6",
    "houseNo": "No. 33",
    "phone": "081289060033",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-52",
    "noUrut": 54,
    "name": "Rahmat",
    "username": "Rahmat",
    "password": "C4B635",
    "street": "Jl. Citarum IVA",
    "block": "Blok B6",
    "houseNo": "No. 35",
    "phone": "081289060035",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-53",
    "noUrut": 55,
    "name": "M H Alfadli",
    "username": "M H Alfadli",
    "password": "C4B637",
    "street": "Jl. Citarum IVA",
    "block": "Blok B6",
    "houseNo": "No. 37",
    "phone": "081289060037",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-54",
    "noUrut": 56,
    "name": "KOST-1",
    "username": "KOST-1",
    "password": "C4B6K1",
    "street": "Jl. Citarum IVA",
    "block": "Blok B6",
    "houseNo": "K1",
    "phone": "081289060001",
    "domicile": "Kontrak",
    "members": 1
  },
  {
    "id": "w-55",
    "noUrut": 57,
    "name": "Moh.Sulaiman",
    "username": "Moh.Sulaiman",
    "password": "C8B302",
    "street": "Jl. Citarum VIIIB",
    "block": "Blok B3",
    "houseNo": "No. 02",
    "phone": "081289030002",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-56",
    "noUrut": 58,
    "name": "Aris Suyitno",
    "username": "Aris Suyitno",
    "password": "C8B304",
    "street": "Jl. Citarum VIIIB",
    "block": "Blok B3",
    "houseNo": "No. 04",
    "phone": "081289030004",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-57",
    "noUrut": 59,
    "name": "Narno",
    "username": "Narno",
    "password": "C8B306",
    "street": "Jl. Citarum VIIIB",
    "block": "Blok B3",
    "houseNo": "No. 06",
    "phone": "081289030006",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-58",
    "noUrut": 60,
    "name": "Jumari Susanto",
    "username": "Jumari Susanto",
    "password": "C8B308",
    "street": "Jl. Citarum VIIIB",
    "block": "Blok B3",
    "houseNo": "No. 08",
    "phone": "081289030008",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-59",
    "noUrut": 61,
    "name": "Sukasno",
    "username": "Sukasno",
    "password": "C8B310",
    "street": "Jl. Citarum VIIIB",
    "block": "Blok B3",
    "houseNo": "No. 10",
    "phone": "081289030010",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-60",
    "noUrut": 62,
    "name": "H. Pandoli",
    "username": "H. Pandoli",
    "password": "C8B312",
    "street": "Jl. Citarum VIIIB",
    "block": "Blok B3",
    "houseNo": "No. 12",
    "phone": "081289030012",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-61",
    "noUrut": 63,
    "name": "Haris",
    "username": "Haris",
    "password": "C8B314",
    "street": "Jl. Citarum VIIIB",
    "block": "Blok B3",
    "houseNo": "No. 14",
    "phone": "081289030014",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-62",
    "noUrut": 64,
    "name": "Paino",
    "username": "Paino",
    "password": "C8B316",
    "street": "Jl. Citarum VIIIB",
    "block": "Blok B3",
    "houseNo": "No. 16",
    "phone": "081289030016",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-63",
    "noUrut": 65,
    "name": "Sunarno",
    "username": "Sunarno",
    "password": "C8B318",
    "street": "Jl. Citarum VIIIB",
    "block": "Blok B3",
    "houseNo": "No. 18",
    "phone": "081289030018",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-64",
    "noUrut": 66,
    "name": "Arif",
    "username": "Arif",
    "password": "C8B320",
    "street": "Jl. Citarum VIIIB",
    "block": "Blok B3",
    "houseNo": "No. 20",
    "phone": "081289030020",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-65",
    "noUrut": 67,
    "name": "Yayat Ruhyat-1",
    "username": "Yayat Ruhyat-1",
    "password": "C8B322",
    "street": "Jl. Citarum VIIIB",
    "block": "Blok B3",
    "houseNo": "No. 22",
    "phone": "081289030022",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-66",
    "noUrut": 68,
    "name": "Yayat Ruhyat-2",
    "username": "Yayat Ruhyat-2",
    "password": "C8B324",
    "street": "Jl. Citarum VIIIB",
    "block": "Blok B3",
    "houseNo": "No. 24",
    "phone": "081289030024",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-67",
    "noUrut": 69,
    "name": "Heru Tri Iswanto",
    "username": "Heru Tri Iswanto",
    "password": "C8B326",
    "street": "Jl. Citarum VIIIB",
    "block": "Blok B3",
    "houseNo": "No. 26",
    "phone": "081289030026",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-68",
    "noUrut": 70,
    "name": "Supratno",
    "username": "Supratno",
    "password": "C8B328",
    "street": "Jl. Citarum VIIIB",
    "block": "Blok B3",
    "houseNo": "No. 28",
    "phone": "081289030028",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-69",
    "noUrut": 71,
    "name": "Rinto Sithorus",
    "username": "Rinto Sithorus",
    "password": "C8B330",
    "street": "Jl. Citarum VIIIB",
    "block": "Blok B3",
    "houseNo": "No. 30",
    "phone": "081289030030",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-70",
    "noUrut": 72,
    "name": "Dwi susanto",
    "username": "Dwi susanto",
    "password": "C8B301",
    "street": "Jl. Citarum VIIIC",
    "block": "Blok B3",
    "houseNo": "No. 01",
    "phone": "081289030001",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-71",
    "noUrut": 73,
    "name": "Lilis Marsidi",
    "username": "Lilis Marsidi",
    "password": "C8B303",
    "street": "Jl. Citarum VIIIC",
    "block": "Blok B3",
    "houseNo": "No. 03",
    "phone": "081289030003",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-72",
    "noUrut": 74,
    "name": "Samit",
    "username": "Samit",
    "password": "C8B305",
    "street": "Jl. Citarum VIIIC",
    "block": "Blok B3",
    "houseNo": "No. 05",
    "phone": "081289030005",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-73",
    "noUrut": 75,
    "name": "Kosong",
    "username": "Kosong",
    "password": "C8B607",
    "street": "Jl. Citarum VIIIC",
    "block": "Blok B6",
    "houseNo": "No. 07",
    "phone": "081289060007",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-74",
    "noUrut": 76,
    "name": "Supardi",
    "username": "Supardi",
    "password": "C8B609",
    "street": "Jl. Citarum VIIIC",
    "block": "Blok B6",
    "houseNo": "No. 09",
    "phone": "081289060009",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-75",
    "noUrut": 77,
    "name": "Usman",
    "username": "Usman",
    "password": "C8B611",
    "street": "Jl. Citarum VIIIC",
    "block": "Blok B6",
    "houseNo": "No. 11",
    "phone": "081289060011",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-76",
    "noUrut": 78,
    "name": "Doni Rahman",
    "username": "Doni Rahman",
    "password": "C8B615",
    "street": "Jl. Citarum VIIIC",
    "block": "Blok B6",
    "houseNo": "No. 15",
    "phone": "081289060015",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-77",
    "noUrut": 79,
    "name": "Ma'muroji",
    "username": "Ma'muroji",
    "password": "C8B617",
    "street": "Jl. Citarum VIIIC",
    "block": "Blok B6",
    "houseNo": "No. 17",
    "phone": "081289060017",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-78",
    "noUrut": 80,
    "name": "Joshua",
    "username": "Joshua",
    "password": "C8B619",
    "street": "Jl. Citarum VIIIC",
    "block": "Blok B6",
    "houseNo": "No. 19",
    "phone": "081289060019",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-79",
    "noUrut": 81,
    "name": "Basis Pambudi",
    "username": "Basis Pambudi",
    "password": "C8B621",
    "street": "Jl. Citarum VIIIC",
    "block": "Blok B6",
    "houseNo": "No. 21",
    "phone": "081289060021",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-80",
    "noUrut": 82,
    "name": "Sutiyono",
    "username": "Sutiyono",
    "password": "C8B623",
    "street": "Jl. Citarum VIIIC",
    "block": "Blok B6",
    "houseNo": "No. 23",
    "phone": "081289060023",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-81",
    "noUrut": 83,
    "name": "Kosong",
    "username": "Kosong",
    "password": "C8B625",
    "street": "Jl. Citarum VIIIC",
    "block": "Blok B6",
    "houseNo": "No. 25",
    "phone": "081289060025",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-82",
    "noUrut": 84,
    "name": "Hendrik",
    "username": "Hendrik",
    "password": "C8B627",
    "street": "Jl. Citarum VIIIC",
    "block": "Blok B6",
    "houseNo": "No. 27",
    "phone": "081289060027",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-83",
    "noUrut": 85,
    "name": "Kosong",
    "username": "Kosong",
    "password": "C8B629",
    "street": "Jl. Citarum VIIIC",
    "block": "Blok B6",
    "houseNo": "No. 29",
    "phone": "081289060029",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-84",
    "noUrut": 86,
    "name": "Aswin Prantama",
    "username": "Aswin Prantama",
    "password": "C8B631",
    "street": "Jl. Citarum VIIIC",
    "block": "Blok B6",
    "houseNo": "No. 31",
    "phone": "081289060031",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-85",
    "noUrut": 87,
    "name": "Solehudin",
    "username": "Solehudin",
    "password": "C8B402",
    "street": "Jl. Citarum VIIIC",
    "block": "Blok B4",
    "houseNo": "No. 02",
    "phone": "081289040002",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-86",
    "noUrut": 88,
    "name": "Bambang",
    "username": "Bambang",
    "password": "C8B404",
    "street": "Jl. Citarum VIIIC",
    "block": "Blok B4",
    "houseNo": "No. 04",
    "phone": "081289040004",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-87",
    "noUrut": 89,
    "name": "Feisal",
    "username": "Feisal",
    "password": "C8B406",
    "street": "Jl. Citarum VIIIC",
    "block": "Blok B4",
    "houseNo": "No. 06",
    "phone": "081289040006",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-88",
    "noUrut": 90,
    "name": "Nana Dirgana",
    "username": "Nana Dirgana",
    "password": "C8B408",
    "street": "Jl. Citarum VIIIC",
    "block": "Blok B4",
    "houseNo": "No. 08",
    "phone": "081289040008",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-89",
    "noUrut": 91,
    "name": "Misno",
    "username": "Misno",
    "password": "C8B410",
    "street": "Jl. Citarum VIIIC",
    "block": "Blok B4",
    "houseNo": "No. 10",
    "phone": "081289040010",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-90",
    "noUrut": 92,
    "name": "Rasju",
    "username": "Rasju",
    "password": "C8B412",
    "street": "Jl. Citarum VIIIC",
    "block": "Blok B4",
    "houseNo": "No. 12",
    "phone": "081289040012",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-91",
    "noUrut": 93,
    "name": "Kosong",
    "username": "Kosong",
    "password": "C8B414",
    "street": "Jl. Citarum VIIIC",
    "block": "Blok B4",
    "houseNo": "No. 14",
    "phone": "081289040014",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-92",
    "noUrut": 94,
    "name": "Mulyadi",
    "username": "Mulyadi",
    "password": "C8B416",
    "street": "Jl. Citarum VIIIC",
    "block": "Blok B4",
    "houseNo": "No. 16",
    "phone": "081289040016",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-93",
    "noUrut": 95,
    "name": "Indra, Dwi",
    "username": "Indra, Dwi",
    "password": "C8B418",
    "street": "Jl. Citarum VIIIC",
    "block": "Blok B4",
    "houseNo": "No. 18",
    "phone": "081289040018",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-94",
    "noUrut": 96,
    "name": "Pariyanto",
    "username": "Pariyanto",
    "password": "C8B420",
    "street": "Jl. Citarum VIIIC",
    "block": "Blok B4",
    "houseNo": "No. 20",
    "phone": "081289040020",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-95",
    "noUrut": 97,
    "name": "Hardiyanto",
    "username": "Hardiyanto",
    "password": "C8B422",
    "street": "Jl. Citarum VIIIC",
    "block": "Blok B4",
    "houseNo": "No. 22",
    "phone": "081289040022",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-96",
    "noUrut": 98,
    "name": "Rofik. W",
    "username": "Rofik. W",
    "password": "C8B424",
    "street": "Jl. Citarum VIIIC",
    "block": "Blok B4",
    "houseNo": "No. 24",
    "phone": "081289040024",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-97",
    "noUrut": 99,
    "name": "Khaeroni",
    "username": "Khaeroni",
    "password": "C8B426",
    "street": "Jl. Citarum VIIIC",
    "block": "Blok B4",
    "houseNo": "No. 26",
    "phone": "081289040026",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-98",
    "noUrut": 100,
    "name": "Kosong",
    "username": "Kosong",
    "password": "C8B428",
    "street": "Jl. Citarum VIIIC",
    "block": "Blok B4",
    "houseNo": "No. 28",
    "phone": "081289040028",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-99",
    "noUrut": 101,
    "name": "Budi Sujalmi",
    "username": "Budi Sujalmi",
    "password": "C8B430",
    "street": "Jl. Citarum VIIIC",
    "block": "Blok B4",
    "houseNo": "No. 30",
    "phone": "081289040030",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-100",
    "noUrut": 102,
    "name": "Sudarto",
    "username": "Sudarto",
    "password": "C9B401",
    "street": "Jl. Citarum IX",
    "block": "Blok B4",
    "houseNo": "No. 01",
    "phone": "081289040001",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-101",
    "noUrut": 103,
    "name": "Yudi",
    "username": "Yudi",
    "password": "C9B403",
    "street": "Jl. Citarum IX",
    "block": "Blok B4",
    "houseNo": "No. 03",
    "phone": "081289040003",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-102",
    "noUrut": 104,
    "name": "Dudeh",
    "username": "Dudeh",
    "password": "C9B405",
    "street": "Jl. Citarum IX",
    "block": "Blok B4",
    "houseNo": "No. 05",
    "phone": "081289040005",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-103",
    "noUrut": 105,
    "name": "Iyushadi",
    "username": "Iyushadi",
    "password": "C9B407",
    "street": "Jl. Citarum IX",
    "block": "Blok B4",
    "houseNo": "No. 07",
    "phone": "081289040007",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-104",
    "noUrut": 106,
    "name": "Zainudin",
    "username": "Zainudin",
    "password": "C9B409",
    "street": "Jl. Citarum IX",
    "block": "Blok B4",
    "houseNo": "No. 09",
    "phone": "081289040009",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-105",
    "noUrut": 107,
    "name": "Suparsidi",
    "username": "Suparsidi",
    "password": "C9B411",
    "street": "Jl. Citarum IX",
    "block": "Blok B4",
    "houseNo": "No. 11",
    "phone": "081289040011",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-106",
    "noUrut": 108,
    "name": "Kosong",
    "username": "Kosong",
    "password": "C9B415",
    "street": "Jl. Citarum IX",
    "block": "Blok B4",
    "houseNo": "No. 15",
    "phone": "081289040015",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-107",
    "noUrut": 109,
    "name": "Rio",
    "username": "Rio",
    "password": "C9B417",
    "street": "Jl. Citarum IX",
    "block": "Blok B4",
    "houseNo": "No. 17",
    "phone": "081289040017",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-108",
    "noUrut": 110,
    "name": "Tomy Dwi",
    "username": "Tomy Dwi",
    "password": "C9B419",
    "street": "Jl. Citarum IX",
    "block": "Blok B4",
    "houseNo": "No. 19",
    "phone": "081289040019",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-109",
    "noUrut": 111,
    "name": "Romli",
    "username": "Romli",
    "password": "C9B421",
    "street": "Jl. Citarum IX",
    "block": "Blok B4",
    "houseNo": "No. 21",
    "phone": "081289040021",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-110",
    "noUrut": 112,
    "name": "Tarmidi",
    "username": "Tarmidi",
    "password": "C9B423",
    "street": "Jl. Citarum IX",
    "block": "Blok B4",
    "houseNo": "No. 23",
    "phone": "081289040023",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-111",
    "noUrut": 113,
    "name": "Nur Qomar",
    "username": "Nur Qomar",
    "password": "C9B425",
    "street": "Jl. Citarum IX",
    "block": "Blok B4",
    "houseNo": "No. 25",
    "phone": "081289040025",
    "domicile": "Tetap",
    "members": 4
  },
  {
    "id": "w-112",
    "noUrut": 114,
    "name": "M. Toha",
    "username": "M. Toha",
    "password": "C9B427",
    "street": "Jl. Citarum IX",
    "block": "Blok B4",
    "houseNo": "No. 27",
    "phone": "081289040027",
    "domicile": "Tetap",
    "members": 4
  }
];

const GOOGLE_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1zwrXck7x2HzVV6KhFgb3DgdAw5SrIUXm64a2M1mbclo/export?format=csv';

// App State
let state = {
  currentUser: null, // null = Belum login (default public portal warga)
  adminAccounts: JSON.parse(JSON.stringify(DEFAULT_ACCOUNTS)),
  accountPins: { b1: '1111', b2: '2222', pengurus: '3333', warga: '0000' }, // Default PINs
  mandatoryDues: 50000,
  posConfig: JSON.parse(JSON.stringify(DEFAULT_POS_CONFIG)),
  otherPosConfig: JSON.parse(JSON.stringify(OTHER_POS_CONFIG)),
  residents: JSON.parse(JSON.stringify(INITIAL_RESIDENTS)),
  payments: [], // Array of payment records
  expenses: [], // Array of expense records
  jimpitanIncomes: [], // Array of jimpitan income records
  jimpitanExpenses: [], // Array of jimpitan expense records
  fundRequests: JSON.parse(JSON.stringify(DEFAULT_FUND_REQUESTS)), // Array of citizen fund requests
  rondaGroups: JSON.parse(JSON.stringify(DEFAULT_RONDA_GROUPS)), // 4-week patrol and jimpitan schedule
  currentVerifiedResident: null,
  selectedMonth: 9, // September
  selectedYear: 2026,
  activeReceiptData: null
};

// Chart instances
let cashflowChart = null;
let posDistributionChart = null;
let publicAnnualDuesChart = null;
let currentAnnualChartType = 'area'; // 'area' (smooth spline) | 'bar' (rounded bars)
let wargaAnnualDuesChart = null;
let currentWargaAnnualChartType = 'area';

// ==================== STORAGE & SEEDING ====================

function loadState() {
  try {
    const saved = localStorage.getItem(APP_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      state = Object.assign(state, parsed);
      
      // Keamanan sesi: jika tidak ada sesi login aktif di sessionStorage, jangan biarkan currentUser tersangkut
      if (typeof isLoggedIn === 'function' && !isLoggedIn()) {
        state.currentUser = null;
        state.currentVerifiedResident = null;
      }
      
      // Auto-migrate if stored residents is old demo/placeholder data (e.g. contains Bambang Sutrisno)
      if (!state.residents || state.residents.length < 100 || state.residents.some(r => r.name.includes('Bambang Sutrisno'))) {
        console.log('Migrating residents to official RT.001 RW.013 citizen database...');
        state.residents = JSON.parse(JSON.stringify(INITIAL_RESIDENTS));
        seedInitialDemoData();
        saveState();
      } else if (!state.payments || state.payments.length === 0) {
        seedInitialDemoData();
        saveState();
      }

      // Pastikan seluruh warga memiliki kredensial username dan password dari spreadsheet resmi
      if (state.residents && Array.isArray(state.residents)) {
        let credsUpdated = false;
        state.residents.forEach(res => {
          const init = INITIAL_RESIDENTS.find(ir => ir.noUrut === res.noUrut || ir.id === res.id || ir.name.toLowerCase() === res.name.toLowerCase());
          if (init) {
            if (!res.username) { res.username = init.username || res.name; credsUpdated = true; }
            if (!res.password) { res.password = init.password || 'RT001'; credsUpdated = true; }
          } else {
            if (!res.username) { res.username = res.name; credsUpdated = true; }
            if (!res.password) { res.password = (res.block.replace(/\s+/g, '') + res.houseNo.replace(/\D/g, '')).toUpperCase() || 'RT001'; credsUpdated = true; }
          }
        });
        if (credsUpdated) saveState();
      }

      // Pastikan semua 4 akun sistem (b1, b2, pengurus, warga) selalu tersedia
      if (!state.adminAccounts || !Array.isArray(state.adminAccounts) || state.adminAccounts.length === 0) {
        state.adminAccounts = JSON.parse(JSON.stringify(DEFAULT_ACCOUNTS));
        saveState();
      } else {
        // Gabungkan akun default jika belum ada di storage sebelumnya
        let accountsUpdated = false;
        const b1Acc = state.adminAccounts.find(a => a.id === 'b1');
        if (b1Acc) {
          if (b1Acc.badge !== 'Keuangan Utama' || b1Acc.desc !== 'Admin RBAC') {
            b1Acc.badge = 'Keuangan Utama';
            b1Acc.desc = 'Admin RBAC';
            accountsUpdated = true;
          }
        }
        DEFAULT_ACCOUNTS.forEach(defAcc => {
          if (!state.adminAccounts.some(a => a.id === defAcc.id)) {
            state.adminAccounts.push(JSON.parse(JSON.stringify(defAcc)));
            accountsUpdated = true;
          }
        });
        if (accountsUpdated) saveState();
      }

      // Pastikan PIN masing-masing akun tersedia
      if (!state.accountPins) {
        state.accountPins = { b1: '1111', b2: '2222', pengurus: '3333', warga: '0000' };
        saveState();
      } else {
        let pinsUpdated = false;
        if (!state.accountPins.b1) { state.accountPins.b1 = '1111'; pinsUpdated = true; }
        if (!state.accountPins.b2) { state.accountPins.b2 = '2222'; pinsUpdated = true; }
        if (!state.accountPins.pengurus) { state.accountPins.pengurus = '3333'; pinsUpdated = true; }
        if (!state.accountPins.warga) { state.accountPins.warga = '0000'; pinsUpdated = true; }
        if (pinsUpdated) saveState();
      }

      // Pastikan fundRequests tersedia
      if (!state.fundRequests || !Array.isArray(state.fundRequests) || state.fundRequests.length === 0) {
        state.fundRequests = JSON.parse(JSON.stringify(DEFAULT_FUND_REQUESTS));
        saveState();
      }

      // Pastikan rondaGroups tersedia
      if (!state.rondaGroups || !Array.isArray(state.rondaGroups) || state.rondaGroups.length === 0) {
        state.rondaGroups = JSON.parse(JSON.stringify(DEFAULT_RONDA_GROUPS));
        saveState();
      }

      // Pastikan data historis iuran tahunan tersedia untuk grafik publik
      ensureAnnualHistoricalDues();
    } else {
      state.adminAccounts = JSON.parse(JSON.stringify(DEFAULT_ACCOUNTS));
      state.accountPins = { b1: '1111', b2: '2222', pengurus: '3333', warga: '0000' };
      state.fundRequests = JSON.parse(JSON.stringify(DEFAULT_FUND_REQUESTS));
      state.rondaGroups = JSON.parse(JSON.stringify(DEFAULT_RONDA_GROUPS));
      seedInitialDemoData();
      saveState();
    }
  } catch (err) {
    console.warn('Error loading state from localStorage', err);
    state.adminAccounts = JSON.parse(JSON.stringify(DEFAULT_ACCOUNTS));
    state.accountPins = { b1: '1111', b2: '2222', pengurus: '3333', warga: '0000' };
    state.fundRequests = JSON.parse(JSON.stringify(DEFAULT_FUND_REQUESTS));
    state.rondaGroups = JSON.parse(JSON.stringify(DEFAULT_RONDA_GROUPS));
    seedInitialDemoData();
  }
}

function saveState() {
  try {
    localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(state));
    // Realtime update grafik tahunan publik jika elemen terpasang di layar
    if (document.getElementById('chartPublicAnnualDues')) {
      renderPublicAnnualDuesChart();
    }
    if (document.getElementById('chartWargaAnnualDues')) {
      renderWargaAnnualDuesChart();
    }
  } catch (err) {
    console.error('Error saving state', err);
  }
}

function seedInitialDemoData() {
  // Pre-seed some payments for realistic immediate demonstration
  const samplePayments = [
    { id: 'pay-1', residentId: 'w-1', month: 9, year: 2026, amount: 50000, date: '2026-09-02', method: 'Tunai / Cash', refNo: 'RT01-202609-0001' },
    { id: 'pay-2', residentId: 'w-2', month: 9, year: 2026, amount: 50000, date: '2026-09-03', method: 'Transfer Bank / QRIS', refNo: 'RT01-202609-0002' },
    { id: 'pay-3', residentId: 'w-3', month: 9, year: 2026, amount: 50000, date: '2026-09-04', method: 'Tunai / Cash', refNo: 'RT01-202609-0003' },
    { id: 'pay-4', residentId: 'w-5', month: 9, year: 2026, amount: 50000, date: '2026-09-05', method: 'Tunai / Cash', refNo: 'RT01-202609-0004' },
    { id: 'pay-5', residentId: 'w-6', month: 9, year: 2026, amount: 50000, date: '2026-09-06', method: 'Transfer Bank / QRIS', refNo: 'RT01-202609-0005' },
    { id: 'pay-6', residentId: 'w-7', month: 9, year: 2026, amount: 50000, date: '2026-09-07', method: 'Tunai / Cash', refNo: 'RT01-202609-0006' },
    { id: 'pay-7', residentId: 'w-8', month: 9, year: 2026, amount: 50000, date: '2026-09-08', method: 'Tunai / Cash', refNo: 'RT01-202609-0007' },
    { id: 'pay-8', residentId: 'w-10', month: 9, year: 2026, amount: 50000, date: '2026-09-09', method: 'Transfer Bank / QRIS', refNo: 'RT01-202609-0008' },
    { id: 'pay-9', residentId: 'w-11', month: 9, year: 2026, amount: 50000, date: '2026-09-10', method: 'Tunai / Cash', refNo: 'RT01-202609-0009' },
    { id: 'pay-10', residentId: 'w-12', month: 9, year: 2026, amount: 50000, date: '2026-09-11', method: 'Tunai / Cash', refNo: 'RT01-202609-0010' },
    { id: 'pay-11', residentId: 'w-15', month: 9, year: 2026, amount: 50000, date: '2026-09-12', method: 'Tunai / Cash', refNo: 'RT01-202609-0011' },
    { id: 'pay-12', residentId: 'w-16', month: 9, year: 2026, amount: 50000, date: '2026-09-13', method: 'Transfer Bank / QRIS', refNo: 'RT01-202609-0012' }
  ];

  // Seed sample other dues (SHR)
  const sampleOtherDues = [
    { id: 'oth-1', category: 'SHR', residentId: 'w-1', amount: 150000, date: '2026-09-01', notes: 'Sumbangan Hari Raya Idul Fitri', refNo: 'SHR-001' },
    { id: 'oth-2', category: 'SHR', residentId: 'w-2', amount: 100000, date: '2026-09-02', notes: 'Sumbangan Hari Raya', refNo: 'SHR-002' },
    { id: 'oth-3', category: 'Pembangunan', residentId: 'w-3', amount: 200000, date: '2026-09-05', notes: 'Donasi Pembelian Kanopi Balai RT', refNo: 'DEV-001' }
  ];

  // Seed sample expenses
  const sampleExpenses = [
    { id: 'exp-1', posId: 'sampah', amount: 250000, date: '2026-09-05', title: 'Honor 2 Petugas Pengangkut Sampah (Minggu 1 & 2)', recipient: 'Bpk. Sugeng & Bpk. Darsono' },
    { id: 'exp-2', posId: 'kas_rt', amount: 85000, date: '2026-09-08', title: 'Konsumsi & ATK Rapat Pleno Pengurus RT', recipient: 'Seksi Konsumsi' },
    { id: 'exp-3', posId: 'santunan_duka', amount: 150000, date: '2026-09-10', title: 'Santunan Duka Cita Keluarga Almarhum Bpk. Wardoyo', recipient: 'Keluarga Bpk. Wardoyo (Blok C)' }
  ];

  state.payments = samplePayments.concat(sampleOtherDues);
  state.expenses = sampleExpenses;
  ensureAnnualHistoricalDues();
}

/**
 * Memastikan data historis iuran 12 bulan (Januari - Desember) tersedia
 * agar visualisasi grafik langsung kaya data dan realistis.
 * Ketika Admin 1 menambah/mengubah checklist, data akan terupdate otomatis.
 */
function ensureAnnualHistoricalDues() {
  if (!state.payments || !Array.isArray(state.payments)) {
    state.payments = [];
  }

  // 1. Cek kelengkapan data tahun berjalan 2026 (Bulan 1 s/d 8)
  const hasJan2026 = state.payments.some(p => !p.category && p.month === 1 && p.year === 2026);
  if (!hasJan2026) {
    const historical2026 = [
      // Bulan 1: Jan (18 KK x 50.000 = Rp 900.000) - tepat sesuai contoh user!
      ...generateMonthlyBatchPayments(1, 2026, 18),
      // Bulan 2: Feb (24 KK x 50.000 = Rp 1.200.000) - tepat sesuai contoh user!
      ...generateMonthlyBatchPayments(2, 2026, 24),
      // Bulan 3: Mar (16 KK x 50.000 = Rp 800.000) - tepat sesuai contoh user!
      ...generateMonthlyBatchPayments(3, 2026, 16),
      // Bulan 4: Apr (22 KK x 50.000 = Rp 1.100.000)
      ...generateMonthlyBatchPayments(4, 2026, 22),
      // Bulan 5: Mei (19 KK x 50.000 = Rp 950.000)
      ...generateMonthlyBatchPayments(5, 2026, 19),
      // Bulan 6: Jun (23 KK x 50.000 = Rp 1.150.000)
      ...generateMonthlyBatchPayments(6, 2026, 23),
      // Bulan 7: Jul (21 KK x 50.000 = Rp 1.050.000)
      ...generateMonthlyBatchPayments(7, 2026, 21),
      // Bulan 8: Agu (25 KK x 50.000 = Rp 1.250.000)
      ...generateMonthlyBatchPayments(8, 2026, 25),
    ];
    state.payments = state.payments.concat(historical2026);
    try { localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
  }

  // 2. Cek kelengkapan data arsip tahun 2025 (12 bulan penuh)
  const has2025 = state.payments.some(p => !p.category && p.year === 2025);
  if (!has2025) {
    const histCounts2025 = [18, 20, 19, 21, 22, 24, 20, 23, 22, 21, 25, 26];
    let historical2025 = [];
    histCounts2025.forEach((cnt, idx) => {
      historical2025 = historical2025.concat(generateMonthlyBatchPayments(idx + 1, 2025, cnt));
    });
    state.payments = state.payments.concat(historical2025);
    try { localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
  }
}

/**
 * Helper untuk membuat batch pembayaran iuran warga per bulan
 */
function generateMonthlyBatchPayments(month, year, count) {
  const result = [];
  const residentsList = (state.residents && state.residents.length > 0) ? state.residents : INITIAL_RESIDENTS;
  const numResidents = residentsList.length;
  const mm = String(month).padStart(2, '0');

  for (let i = 0; i < count && i < numResidents; i++) {
    const res = residentsList[i];
    const day = String(Math.min(28, (i % 20) + 2)).padStart(2, '0');
    result.push({
      id: `pay-hist-${year}${mm}-${res.id || i}`,
      residentId: res.id,
      month: month,
      year: year,
      amount: 50000,
      date: `${year}-${mm}-${day}`,
      method: (i % 2 === 0) ? 'Tunai / Cash' : 'Transfer Bank / QRIS',
      refNo: `RT01-${year}${mm}-${String(1000 + i)}`
    });
  }
  return result;
}


// ==================== AUTO-SPLIT CALCULATION ENGINE ====================

/**
 * Calculates the exact breakdown splits for a given mandatory payment amount
 */
function calculateAutoSplit(amount) {
  const splits = {};
  const totalConfigSum = state.posConfig.reduce((acc, pos) => acc + pos.defaultNominal, 0);

  if (totalConfigSum === 0) return splits;

  state.posConfig.forEach(pos => {
    // Proportional or fixed split
    const portion = (pos.defaultNominal / totalConfigSum) * amount;
    splits[pos.id] = Math.round(portion);
  });

  return splits;
}

/**
 * Computes consolidated financial balances across all Pos Anggaran
 */
function computeFinancials() {
  const posBalances = {};

  // Initialize 6 core pos
  state.posConfig.forEach(pos => {
    posBalances[pos.id] = {
      id: pos.id,
      name: pos.name,
      icon: pos.icon,
      color: pos.color,
      defaultNominal: pos.defaultNominal,
      income: 0,
      expense: 0,
      balance: 0
    };
  });

  // Initialize other pos
  state.otherPosConfig.forEach(pos => {
    posBalances[pos.id] = {
      id: pos.id,
      name: pos.name,
      icon: pos.icon,
      color: pos.color,
      defaultNominal: 0,
      income: 0,
      expense: 0,
      balance: 0
    };
  });

  // Calculate Income from Payments
  state.payments.forEach(p => {
    if (p.category) {
      // It is an other due (e.g. SHR, Ronda, Pembangunan, Sukarela)
      const targetPosId = p.category.toLowerCase().includes('shr') ? 'shr' :
                          p.category.toLowerCase().includes('ronda') ? 'ronda' :
                          p.category.toLowerCase().includes('pembang') ? 'pembangunan' : 'sukarela';
      if (posBalances[targetPosId]) {
        posBalances[targetPosId].income += Number(p.amount);
      }
    } else {
      // Mandatory monthly dues -> auto-split to 6 core pos
      const splits = calculateAutoSplit(Number(p.amount));
      for (const [posId, splitAmount] of Object.entries(splits)) {
        if (posBalances[posId]) {
          posBalances[posId].income += Number(splitAmount);
        }
      }
    }
  });

  // Deduct Expenses
  state.expenses.forEach(e => {
    if (posBalances[e.posId]) {
      posBalances[e.posId].expense += Number(e.amount);
    }
  });

  // Calculate Balance for each Pos
  let totalConsolidatedIncome = 0;
  let totalConsolidatedExpense = 0;
  let totalConsolidatedBalance = 0;

  for (const posId in posBalances) {
    const pos = posBalances[posId];
    pos.balance = pos.income - pos.expense;
    totalConsolidatedIncome += pos.income;
    totalConsolidatedExpense += pos.expense;
    totalConsolidatedBalance += pos.balance;
  }

  // Monthly statistics for active selected period
  const monthPayments = state.payments.filter(p => !p.category && p.month === state.selectedMonth && p.year === state.selectedYear);
  const paidResidentsCount = new Set(monthPayments.map(p => p.residentId)).size;
  const totalResidentsCount = state.residents.length;
  const unpaidResidentsCount = Math.max(0, totalResidentsCount - paidResidentsCount);
  const monthMandatoryIncome = monthPayments.reduce((acc, p) => acc + Number(p.amount), 0);
  const collectionPercentage = totalResidentsCount > 0 ? Math.round((paidResidentsCount / totalResidentsCount) * 100) : 0;

  return {
    posBalances,
    totalConsolidatedIncome,
    totalConsolidatedExpense,
    totalConsolidatedBalance,
    paidResidentsCount,
    unpaidResidentsCount,
    totalResidentsCount,
    monthMandatoryIncome,
    collectionPercentage
  };
}

// ==================== FORMATTERS ====================

function formatRupiah(number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(number || 0);
}

function formatDateIndo(dateStr) {
  if (!dateStr) return '-';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
}

function formatDateLong(dateStr) {
  return formatDateIndo(dateStr);
}

function formatCurrency(number) {
  return formatRupiah(number);
}

// ==================== APP HISTORY & MOBILE BACK NAVIGATION CONTROLLER ====================

let isProgrammaticNav = false;
let lastRootBackPress = 0;

function pushNavHistory(type, id = null, hash = '') {
  try {
    const currentState = window.history.state;
    if (currentState && currentState.type === type && currentState.id === id) {
      return;
    }
    const targetUrl = hash ? (hash.startsWith('#') ? hash : `#${hash}`) : (window.location.hash || '#hub');
    window.history.pushState({ appNav: true, type, id, time: Date.now() }, '', targetUrl);
  } catch (e) {
    console.warn('pushNavHistory error:', e);
  }
}

function popNavHistory() {
  isProgrammaticNav = true;
  window.history.back();
}

function setupAppHistoryNavigation() {
  // 1. Initial State Setup (Root Guard)
  try {
    const currentHash = window.location.hash || '';
    if (!currentHash || currentHash === '#' || currentHash === '#hub') {
      window.history.replaceState({ appNav: true, type: 'root', time: Date.now() }, '', '#hub');
      window.history.pushState({ appNav: true, type: 'root-guard', time: Date.now() }, '', '#hub');
    }
  } catch (e) {
    console.warn('Initial history setup failed:', e);
  }

  // 2. Global popstate listener (Menangani tombol Back ponsel / gesture Android / browser)
  window.addEventListener('popstate', () => {
    if (isProgrammaticNav) {
      isProgrammaticNav = false;
      return;
    }

    // A. Prioritas 0: Jika Event Popup Banner sedang terbuka
    const bannerWrap = document.getElementById('hub-event-banner-wrap');
    if (bannerWrap && (bannerWrap.classList.contains('show-popup') || (bannerWrap.style.display !== 'none' && bannerWrap.style.display !== ''))) {
      if (typeof window.closeEventPopupBanner === 'function') {
        window.closeEventPopupBanner(true);
        return;
      }
    }

    // B. Prioritas 1: Jika modal login overlay sedang terbuka
    const loginOverlay = document.getElementById('login-overlay');
    if (loginOverlay && loginOverlay.style.display !== 'none' && !loginOverlay.classList.contains('fade-out')) {
      hideLoginOverlay(true);
      return;
    }

    // C. Prioritas 2: Jika drawer menu layanan sedang terbuka
    const publicDrawer = document.getElementById('public-offcanvas-drawer');
    if (publicDrawer && publicDrawer.classList.contains('open')) {
      closePublicDrawer(true);
      return;
    }

    // D. Prioritas 3: Jika ada modal dialog aplikasi yang sedang aktif (.modal-backdrop.active atau .modal.active)
    const activeModal = document.querySelector('.modal-backdrop.active, .modal.active');
    if (activeModal) {
      closeModal(activeModal.id, true);
      return;
    }

    // E. Prioritas 4: Jika sedang berada di sub-halaman publik (misal: Kegiatan, Demografi, Layanan, Tentang, Pengurus)
    const publicPortal = document.getElementById('portal-public');
    const publicHub = document.getElementById('public-home-hub');
    const isPublicVisible = publicPortal && publicPortal.style.display !== 'none';
    if (isPublicVisible && publicHub && publicHub.style.display === 'none') {
      switchPublicView('hub', true);
      return;
    }

    // F. Prioritas 5: Jika sedang berada di dashboard/portal aplikasi pengurus (bukan portal publik)
    const adminApp = document.getElementById('app');
    if (adminApp && adminApp.style.display !== 'none') {
      const activeAdminSection = document.querySelector('.view-section.active');
      const isWarga = state.currentUser === 'warga';
      const defaultViewId = isWarga ? 'view-portal-warga' : (state.currentUser === 'b2' ? 'view-jimpitan' : 'view-dashboard');

      if (activeAdminSection && activeAdminSection.id !== defaultViewId) {
        navigateToView(isWarga ? 'portal-warga' : (state.currentUser === 'b2' ? 'jimpitan' : 'dashboard'));
        return;
      } else {
        showPublicPortal();
        return;
      }
    }

    // G. Prioritas 6: Berada di Beranda Utama (Hub)
    // Terapkan proteksi ganda agar tidak langsung menutup aplikasi / browser secara tidak sengaja
    const now = Date.now();
    if (now - lastRootBackPress < 2000) {
      // Pengguna menekan Back 2x berturut-turut dalam 2 detik -> izinkan browser keluar
      window.history.back();
    } else {
      lastRootBackPress = now;
      showToast('Tekan sekali lagi untuk keluar dari aplikasi', 'info');
      // Push guard state kembali agar back berikutnya tetap bisa dicegat
      try {
        window.history.pushState({ appNav: true, type: 'root-guard', time: Date.now() }, '', '#hub');
      } catch (err) {}
    }
  });
}

// Modal helper functions with History API support
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    if (typeof pushNavHistory === 'function') {
      pushNavHistory('modal', modalId, `modal-${modalId}`);
    }
  }
}

function closeModal(modalId, fromPopState = false) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    if (!fromPopState && typeof popNavHistory === 'function' && window.history.state?.type === 'modal' && window.history.state?.id === modalId) {
      popNavHistory();
    }
  }
}

const MONTH_NAMES = [
  '', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

// ==================== TOAST NOTIFICATIONS ====================

function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const icon = type === 'success' ? 'fa-circle-check text-emerald' :
               type === 'error' ? 'fa-circle-xmark text-rose' : 'fa-circle-info text-gold';

  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ==================== DOM RENDERING FUNCTIONS ====================

/**
 * Renders Executive Dashboard
 */
function renderDashboard() {
  const fin = computeFinancials();

  // Top Hero Balances
  document.getElementById('dash-total-balance').textContent = formatRupiah(fin.totalConsolidatedBalance);
  document.getElementById('dash-total-income').textContent = formatRupiah(fin.totalConsolidatedIncome);
  document.getElementById('dash-total-expense').textContent = formatRupiah(fin.totalConsolidatedExpense);
  document.getElementById('dash-month-mandatory').textContent = formatRupiah(fin.monthMandatoryIncome);

  // KPI Card
  document.getElementById('dash-collection-percent').textContent = `${fin.collectionPercentage}%`;
  document.getElementById('dash-progress-fill').style.width = `${fin.collectionPercentage}%`;
  document.getElementById('dash-paid-count').textContent = `${fin.paidResidentsCount} KK`;
  document.getElementById('dash-unpaid-count').textContent = `${fin.unpaidResidentsCount} KK`;

  // Sidebar Badge
  const sidebarUnpaid = document.getElementById('sidebar-unpaid-badge');
  if (sidebarUnpaid) {
    sidebarUnpaid.textContent = fin.unpaidResidentsCount;
  }

  // 6 Pos Cards Grid
  const posGrid = document.getElementById('dashboard-pos-grid');
  if (posGrid) {
    posGrid.innerHTML = '';
    state.posConfig.forEach(pos => {
      const data = fin.posBalances[pos.id] || { balance: 0, income: 0, expense: 0 };
      const card = document.createElement('div');
      card.className = 'pos-card';
      card.innerHTML = `
        <div class="pos-card-header">
          <div class="pos-icon-box" style="background: ${pos.color}20; color: ${pos.color}">
            <i class="${pos.icon}"></i>
          </div>
          <span class="pos-portion-tag">${formatRupiah(pos.defaultNominal)} / kk</span>
        </div>
        <h4>${pos.name}</h4>
        <div class="pos-card-balance">${formatRupiah(data.balance)}</div>
        <div class="pos-mini-flow">
          <span><i class="fa-solid fa-arrow-down text-emerald"></i> ${formatRupiah(data.income)}</span>
          <span><i class="fa-solid fa-arrow-up text-rose"></i> ${formatRupiah(data.expense)}</span>
        </div>
      `;
      posGrid.appendChild(card);
    });
  }

  // Capaian Iuran Berdasarkan Nama Jalan
  renderDashboardStreetKpi();

  // Update Dashboard Asset Banner
  try {
    const asetList = getAsetList();
    const totalVal = asetList.reduce((acc, it) => acc + (Number(it.harga) || 0), 0);
    const okCount = asetList.filter(it => it.kondisi === 'ok').length;
    const badCount = asetList.length - okCount;
    const dashAssetVal = document.getElementById('dash-asset-total-val');
    if (dashAssetVal) dashAssetVal.textContent = formatRupiah(totalVal);
    const dashAssetOk = document.getElementById('dash-asset-ok-count');
    if (dashAssetOk) dashAssetOk.textContent = `${okCount} Aset (${Math.round((okCount / (asetList.length || 1)) * 100)}%)`;
    const dashAssetBad = document.getElementById('dash-asset-bad-count');
    if (dashAssetBad) dashAssetBad.textContent = `${badCount} Perlu Perhatian`;
  } catch (e) {
    console.warn('Dashboard asset banner update:', e);
  }

  // Recent Transactions Table
  const tbodyRecent = document.getElementById('tbody-recent-tx');
  if (tbodyRecent) {
    tbodyRecent.innerHTML = '';

    // Merge payments & expenses sorted by date
    const allTx = [];

    state.payments.forEach(p => {
      const resident = state.residents.find(r => r.id === p.residentId);
      const residentName = resident ? resident.name : 'Warga';
      const houseNo = resident ? `(${resident.block} ${resident.houseNo})` : '';
      
      let title = p.category ? `[${p.category}] ${p.notes || 'Iuran Tambahan'} - ${residentName}` :
                               `Iuran Wajib ${MONTH_NAMES[p.month]} ${p.year} - ${residentName} ${houseNo}`;

      allTx.push({
        id: p.id,
        date: p.date,
        title: title,
        posName: p.category ? `Pos ${p.category}` : 'Auto-Split 6 Pos Anggaran',
        type: 'INCOME',
        amount: p.amount,
        rawObj: p,
        resident: resident
      });
    });

    state.expenses.forEach(e => {
      const pos = state.posConfig.find(p => p.id === e.posId) || state.otherPosConfig.find(p => p.id === e.posId);
      const posName = pos ? pos.name : e.posId;

      allTx.push({
        id: e.id,
        date: e.date,
        title: `${e.title} (Penerima: ${e.recipient})`,
        posName: posName,
        type: 'EXPENSE',
        amount: e.amount,
        rawObj: e
      });
    });

    // Sort descending by date
    allTx.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Show top 6 transactions
    const topTx = allTx.slice(0, 6);
    if (topTx.length === 0) {
      tbodyRecent.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted);">Belum ada transaksi tercatat</td></tr>`;
    } else {
      topTx.forEach(tx => {
        const tr = document.createElement('tr');
        const isIncome = tx.type === 'INCOME';
        tr.innerHTML = `
          <td>${formatDateIndo(tx.date)}</td>
          <td><strong>${tx.title}</strong></td>
          <td><span class="split-pill">${tx.posName}</span></td>
          <td>
            <span class="${isIncome ? 'status-badge-paid' : 'status-badge-unpaid'}">
              <i class="fa-solid ${isIncome ? 'fa-arrow-down' : 'fa-arrow-up'}"></i>
              ${isIncome ? 'Pemasukan' : 'Pengeluaran'}
            </span>
          </td>
          <td style="font-weight: 700; color: ${isIncome ? 'var(--emerald-400)' : 'var(--rose-400)'}">
            ${isIncome ? '+' : '-'} ${formatRupiah(tx.amount)}
          </td>
          <td>
            ${isIncome && !tx.rawObj.category ? `
              <button class="btn btn-sm btn-outline btn-view-rcp" data-payid="${tx.id}">
                <i class="fa-solid fa-receipt text-gold"></i> Kwitansi
              </button>
            ` : '-'}
          </td>
        `;
        tbodyRecent.appendChild(tr);
      });
    }
  }

  // Render Charts
  renderExecutiveCharts(fin);
}

/**
 * Computes compliance and payment stats per street for the active selected period
 */
function computeStreetStats() {
  const currentMonthPayments = state.payments.filter(
    p => !p.category && p.month === state.selectedMonth && p.year === state.selectedYear
  );
  const paidResidentIds = new Set(currentMonthPayments.map(p => p.residentId));

  const streetDefinitions = [
    { name: 'Jl. Citarum II', blocks: 'Blok B6, B7' },
    { name: 'Jl. Citarum IVA', blocks: 'Blok B6, B7' },
    { name: 'Jl. Citarum VIIIB', blocks: 'Blok B3' },
    { name: 'Jl. Citarum VIIIC', blocks: 'Blok B3, B4, B6' },
    { name: 'Jl. Citarum IX', blocks: 'Blok B4' }
  ];

  return streetDefinitions.map(def => {
    const residentsOnStreet = state.residents.filter(r => r.street === def.name);
    const totalWarga = residentsOnStreet.length;
    const paidWarga = residentsOnStreet.filter(r => paidResidentIds.has(r.id)).length;
    const unpaidWarga = Math.max(0, totalWarga - paidWarga);
    const percent = totalWarga > 0 ? Math.round((paidWarga / totalWarga) * 100) : 0;
    const totalCollected = paidWarga * state.mandatoryDues;
    const totalTarget = totalWarga * state.mandatoryDues;

    return {
      name: def.name,
      blocks: def.blocks,
      totalWarga,
      paidWarga,
      unpaidWarga,
      percent,
      totalCollected,
      totalTarget
    };
  });
}

/**
 * Renders executive street-by-street collection compliance cards on Dashboard
 */
function renderDashboardStreetKpi() {
  const grid = document.getElementById('dashboard-street-grid');
  if (!grid) return;

  const periodBadge = document.getElementById('dash-street-period-badge');
  if (periodBadge) {
    periodBadge.innerHTML = `<i class="fa-solid fa-calendar-check text-gold"></i> Periode ${MONTH_NAMES[state.selectedMonth]} ${state.selectedYear}`;
  }

  const streetStats = computeStreetStats();
  grid.innerHTML = '';

  streetStats.forEach(item => {
    const tier = item.percent >= 75 ? 'tier-high' : item.percent >= 40 ? 'tier-mid' : 'tier-low';
    const tierIcon = item.percent >= 75 ? 'fa-circle-check' : item.percent >= 40 ? 'fa-clock' : 'fa-triangle-exclamation';

    const card = document.createElement('div');
    card.className = 'street-card glass-panel';
    card.innerHTML = `
      <div>
        <div class="street-card-top">
          <div class="street-icon-title">
            <div class="street-icon-box">
              <i class="fa-solid fa-road"></i>
            </div>
            <div class="street-info">
              <h4>${item.name}</h4>
              <span class="street-sub"><i class="fa-solid fa-map-pin"></i> ${item.blocks} • ${item.totalWarga} KK</span>
            </div>
          </div>
          <span class="street-percent-badge ${tier}">
            <i class="fa-solid ${tierIcon}"></i> ${item.percent}%
          </span>
        </div>

        <div class="street-progress-wrap">
          <div class="street-progress-bar">
            <div class="street-progress-fill ${tier}" style="width: ${item.percent}%"></div>
          </div>
        </div>

        <div class="street-stats-grid">
          <div class="street-stat-item">
            <span class="stat-caption">Sudah Bayar</span>
            <span class="stat-figure text-emerald">${item.paidWarga} KK</span>
          </div>
          <div class="street-stat-item">
            <span class="stat-caption">Belum Bayar</span>
            <span class="stat-figure ${item.unpaidWarga > 0 ? 'text-rose' : 'text-emerald'}">${item.unpaidWarga} KK</span>
          </div>
        </div>

        <div class="street-nominal-row">
          <span class="nom-label">Dana Terkumpul</span>
          <span class="nom-val">${formatRupiah(item.totalCollected)} <span style="font-size: 0.7rem; color: var(--text-muted); font-weight: normal;">/ ${formatRupiah(item.totalTarget)}</span></span>
        </div>
      </div>

      <button class="btn-street-jump" data-jump-street="${item.name}">
        <i class="fa-solid fa-list-check"></i> Buka Checklist Jalan Ini
      </button>
    `;
    grid.appendChild(card);
  });
}

function jumpToChecklistStreet(streetName) {
  document.querySelectorAll('.view-section').forEach(s => s.classList.remove('active'));
  const chkView = document.getElementById('view-checklist');
  if (chkView) chkView.classList.add('active');

  document.querySelectorAll('.sidebar-menu .menu-item, .bottom-nav .bnav-item').forEach(m => m.classList.remove('active'));
  document.querySelectorAll('[data-target="checklist"]').forEach(m => m.classList.add('active'));

  const pageTitle = document.getElementById('page-title');
  const pageSub = document.getElementById('page-subtitle');
  if (pageTitle) pageTitle.textContent = 'Checklist Iuran Wajib Bulanan';
  if (pageSub) pageSub.textContent = `Penyaringan: ${streetName}`;

  const streetSelect = document.getElementById('filter-street');
  if (streetSelect) streetSelect.value = streetName;
  const searchInput = document.getElementById('checklist-search');
  if (searchInput) searchInput.value = '';

  renderChecklist();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Initializes and updates Chart.js Executive Charts
 */
function renderExecutiveCharts(fin) {
  if (typeof Chart === 'undefined') return;
  // 1. Cashflow Trend Chart
  const ctxCashflow = document.getElementById('cashflowChart');
  if (ctxCashflow) {
    const labels = ['Mei 26', 'Jun 26', 'Jul 26', 'Agu 26', 'Sep 26', 'Okt 26'];
    const incomeData = [950000, 1100000, 1050000, 1200000, fin.totalConsolidatedIncome, 0];
    const expenseData = [350000, 480000, 400000, 520000, fin.totalConsolidatedExpense, 0];

    if (cashflowChart) {
      cashflowChart.data.datasets[0].data = incomeData;
      cashflowChart.data.datasets[1].data = expenseData;
      cashflowChart.update();
    } else {
      cashflowChart = new Chart(ctxCashflow, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Pemasukan (Rp)',
              data: incomeData,
              borderColor: '#10b981',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              borderWidth: 3,
              fill: true,
              tension: 0.4
            },
            {
              label: 'Pengeluaran (Rp)',
              data: expenseData,
              borderColor: '#f43f5e',
              backgroundColor: 'rgba(244, 63, 94, 0.05)',
              borderWidth: 2,
              borderDash: [5, 5],
              tension: 0.4
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { labels: { color: '#94a3b8', font: { family: 'Plus Jakarta Sans' } } }
          },
          scales: {
            x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } },
            y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } }
          }
        }
      });
    }
  }

  // 2. Pos Distribution Doughnut Chart
  const ctxPos = document.getElementById('posDistributionChart');
  if (ctxPos) {
    const posLabels = state.posConfig.map(p => p.name);
    const posData = state.posConfig.map(p => {
      const data = fin.posBalances[p.id];
      return data ? Math.max(0, data.balance) : 0;
    });
    const posColors = state.posConfig.map(p => p.color);

    if (posDistributionChart) {
      posDistributionChart.data.labels = posLabels;
      posDistributionChart.data.datasets[0].data = posData;
      posDistributionChart.data.datasets[0].backgroundColor = posColors;
      posDistributionChart.update();
    } else {
      posDistributionChart = new Chart(ctxPos, {
        type: 'doughnut',
        data: {
          labels: posLabels,
          datasets: [{
            data: posData,
            backgroundColor: posColors,
            borderColor: '#0b0f19',
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom', labels: { color: '#94a3b8', boxWidth: 12, font: { size: 10 } } }
          },
          cutout: '65%'
        }
      });
    }
  }
}

/**
 * Renders Batch Checklist Iuran Wajib Matrix
 */
function renderChecklist() {
  const tbody = document.getElementById('tbody-checklist');
  if (!tbody) return;

  const searchTerm = (document.getElementById('checklist-search')?.value || '').toLowerCase();
  const blockFilter = document.getElementById('filter-block')?.value || 'ALL';
  const streetFilter = document.getElementById('filter-street')?.value || 'ALL';
  const statusFilter = document.getElementById('filter-status')?.value || 'ALL';

  tbody.innerHTML = '';

  let totalCollected = 0;
  let targetTotal = state.residents.length * state.mandatoryDues;

  const currentMonthPayments = state.payments.filter(
    p => !p.category && p.month === state.selectedMonth && p.year === state.selectedYear
  );

  state.residents.forEach(resident => {
    // Check match search & filters
    const matchSearch = resident.name.toLowerCase().includes(searchTerm) ||
                        resident.block.toLowerCase().includes(searchTerm) ||
                        resident.houseNo.toLowerCase().includes(searchTerm) ||
                        (resident.street && resident.street.toLowerCase().includes(searchTerm));
    const matchBlock = blockFilter === 'ALL' || resident.block === blockFilter;
    const matchStreet = streetFilter === 'ALL' || resident.street === streetFilter;

    const paymentRecord = currentMonthPayments.find(p => p.residentId === resident.id);
    const isPaid = !!paymentRecord;

    const matchStatus = statusFilter === 'ALL' ||
                        (statusFilter === 'PAID' && isPaid) ||
                        (statusFilter === 'UNPAID' && !isPaid);

    if (isPaid) {
      totalCollected += Number(paymentRecord.amount);
    }

    if (!matchSearch || !matchBlock || !matchStreet || !matchStatus) return;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="text-align: center;">
        <div class="custom-checkbox-wrapper">
          <input type="checkbox" class="checklist-item-toggle" data-resident-id="${resident.id}" ${isPaid ? 'checked' : ''}>
        </div>
      </td>
      <td>
        <div style="font-weight: 600; color: #fff; font-size: 0.95rem;">${resident.name}</div>
        <div class="text-xs text-muted"><i class="fa-brands fa-whatsapp text-emerald"></i> ${resident.phone}</div>
      </td>
      <td>
        <strong style="color: var(--emerald-300); font-weight: 600;">${resident.street || 'Jl. Citarum II'}</strong>
        <div class="text-xs text-muted">${resident.block} ${resident.houseNo} • ${resident.domicile} (${resident.members} Jiwa)</div>
      </td>
      <td>
        <strong style="color: ${isPaid ? 'var(--emerald-400)' : 'var(--text-muted)'}">${formatRupiah(state.mandatoryDues)}</strong>
      </td>
      <td>
        <div class="split-pill-group">
          ${state.posConfig.map(pos => `<span class="split-pill" title="${pos.name}">${pos.name.split(' ')[1] || pos.name}: ${formatRupiah(pos.defaultNominal)}</span>`).join('')}
        </div>
      </td>
      <td>
        ${isPaid ? `<span class="status-badge-paid"><i class="fa-solid fa-circle-check"></i> ${formatDateIndo(paymentRecord.date)}</span>` :
                   `<span class="status-badge-unpaid"><i class="fa-solid fa-circle-xmark"></i> Belum Bayar</span>`}
      </td>
      <td style="text-align: right;">
        ${isPaid ? `
          <button class="btn btn-sm btn-outline btn-open-receipt" data-payid="${paymentRecord.id}" title="Lihat Kwitansi Digital">
            <i class="fa-solid fa-receipt text-gold"></i>
          </button>
          <button class="btn btn-sm btn-emerald btn-send-wa" data-payid="${paymentRecord.id}" title="Kirim WA">
            <i class="fa-brands fa-whatsapp"></i> WA
          </button>
        ` : `
          <button class="btn btn-sm btn-gold btn-pay-individual" data-resident-id="${resident.id}" title="Bayar Sekarang">
            <i class="fa-solid fa-check"></i> Bayar
          </button>
        `}
      </td>
    `;

    tbody.appendChild(tr);
  });

  // Summary pill
  const elCollected = document.getElementById('chk-total-collected');
  const elTarget = document.getElementById('chk-total-target');
  if (elCollected) elCollected.textContent = formatRupiah(totalCollected);
  if (elTarget) elTarget.textContent = formatRupiah(targetTotal);
}

/**
 * Toggles a resident's payment status on checkbox click
 */
function toggleResidentPayment(residentId, isChecked) {
  const resident = state.residents.find(r => r.id === residentId);
  if (!resident) return;

  if (isChecked) {
    // Add payment record
    const refNo = `RT01-${state.selectedYear}${String(state.selectedMonth).padStart(2, '0')}-${String(Math.floor(Math.random() * 9000) + 1000)}`;
    const today = new Date().toISOString().split('T')[0];

    const newPayment = {
      id: `pay-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      residentId: residentId,
      month: state.selectedMonth,
      year: state.selectedYear,
      amount: state.mandatoryDues,
      date: today,
      method: 'Tunai / Cash (Checklist)',
      refNo: refNo
    };

    state.payments.push(newPayment);
    saveState();
    showToast(`Iuran ${resident.name} (${MONTH_NAMES[state.selectedMonth]} ${state.selectedYear}) Berhasil Diterima & Di-split ke 6 Pos!`, 'success');
  } else {
    // Remove payment record
    const index = state.payments.findIndex(
      p => !p.category && p.residentId === residentId && p.month === state.selectedMonth && p.year === state.selectedYear
    );
    if (index !== -1) {
      state.payments.splice(index, 1);
      saveState();
      showToast(`Status pembayaran ${resident.name} dibatalkan.`, 'info');
    }
  }

  // Re-render UI
  renderChecklist();
  renderDashboard();
  renderPosDetails();
}

/**
 * Renders 6 Pos Anggaran & SHR Details Section
 */
function renderPosDetails() {
  const container = document.getElementById('pos-full-details-container');
  if (!container) return;

  const fin = computeFinancials();
  container.innerHTML = '';

  // All pos (6 Core + Others)
  const allPosList = [...state.posConfig, ...state.otherPosConfig];

  allPosList.forEach(pos => {
    const data = fin.posBalances[pos.id] || { balance: 0, income: 0, expense: 0 };
    const isCore = state.posConfig.some(p => p.id === pos.id);

    const card = document.createElement('div');
    card.className = 'pos-full-card';
    card.innerHTML = `
      <div class="pos-full-top">
        <div class="pos-icon-box" style="background: ${pos.color}20; color: ${pos.color}">
          <i class="${pos.icon}"></i>
        </div>
        <div>
          <h3>${pos.name}</h3>
          <p>${isCore ? `Alokasi Wajib: ${formatRupiah(pos.defaultNominal)} per warga` : 'Iuran Tambahan / Insidental'}</p>
        </div>
      </div>

      <div class="pos-flow-stats">
        <div>
          <span>Total Pemasukan:</span>
          <strong class="text-emerald">+ ${formatRupiah(data.income)}</strong>
        </div>
        <div>
          <span>Total Pengeluaran:</span>
          <strong class="text-rose">- ${formatRupiah(data.expense)}</strong>
        </div>
      </div>

      <div class="pos-remaining-bar">
        <span>Sisa Saldo Kas Aktif:</span>
        <strong>${formatRupiah(data.balance)}</strong>
      </div>

      <div class="mt-auto" style="display: flex; gap: 0.5rem;">
        <button class="btn btn-sm btn-outline btn-full btn-quick-expense-for-pos" data-posid="${pos.id}">
          <i class="fa-solid fa-minus text-rose"></i> Tarik / Catat Keluar
        </button>
      </div>
    `;

    container.appendChild(card);
  });
}

/**
 * Renders Expenses Table
 */
function renderExpenses() {
  const tbody = document.getElementById('tbody-expenses');
  const posFilter = document.getElementById('filter-expense-pos')?.value || 'ALL';
  const searchTerm = (document.getElementById('expense-search')?.value || '').toLowerCase();

  if (!tbody) return;
  tbody.innerHTML = '';

  const filtered = state.expenses.filter(e => {
    const matchPos = posFilter === 'ALL' || e.posId === posFilter;
    const matchSearch = e.title.toLowerCase().includes(searchTerm) ||
                        e.recipient.toLowerCase().includes(searchTerm);
    return matchPos && matchSearch;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted);">Belum ada data pengeluaran kas</td></tr>`;
    return;
  }

  filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

  filtered.forEach(exp => {
    const pos = state.posConfig.find(p => p.id === exp.posId) || state.otherPosConfig.find(p => p.id === exp.posId);
    const posName = pos ? pos.name : exp.posId;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${formatDateIndo(exp.date)}</td>
      <td><strong>${exp.title}</strong></td>
      <td><span class="split-pill" style="border: 1px solid ${pos ? pos.color : '#fff'}; color: #fff;">${posName}</span></td>
      <td>${exp.recipient}</td>
      <td style="font-weight: 700; color: var(--rose-400);">- ${formatRupiah(exp.amount)}</td>
      <td>
        <button class="btn btn-sm btn-outline btn-outline-rose btn-delete-expense" data-expid="${exp.id}" title="Hapus Pengeluaran">
          <i class="fa-solid fa-trash"></i>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

/**
 * Renders Residents Database Table
 */
function renderResidents() {
  const tbody = document.getElementById('tbody-warga');
  const searchTerm = (document.getElementById('warga-search')?.value || '').toLowerCase();
  const statusFilter = document.getElementById('filter-warga-status')?.value || 'ALL';
  const blockFilter = document.getElementById('filter-warga-block')?.value || 'ALL';

  if (!tbody) return;
  tbody.innerHTML = '';

  const currentMonthPayments = state.payments.filter(
    p => !p.category && p.month === state.selectedMonth && p.year === state.selectedYear
  );

  let no = 1;
  state.residents.forEach(res => {
    const matchSearch = res.name.toLowerCase().includes(searchTerm) ||
                        res.block.toLowerCase().includes(searchTerm) ||
                        res.houseNo.toLowerCase().includes(searchTerm) ||
                        (res.street && res.street.toLowerCase().includes(searchTerm)) ||
                        (res.username && res.username.toLowerCase().includes(searchTerm)) ||
                        (res.password && res.password.toLowerCase().includes(searchTerm)) ||
                        res.phone.includes(searchTerm);
    const matchStatus = statusFilter === 'ALL' || res.domicile === statusFilter;
    const matchBlock = blockFilter === 'ALL' || res.block === blockFilter;

    if (!matchSearch || !matchStatus || !matchBlock) return;

    const isPaid = currentMonthPayments.some(p => p.residentId === res.id);

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${res.noUrut || no++}</td>
      <td><span style="font-weight: 600; color: #fff; font-size: 0.95rem;">${res.name}</span></td>
      <td>
        <strong style="color: var(--emerald-300); font-weight: 600;">${res.street || 'Jl. Citarum II'}</strong>
        <div class="text-xs text-muted">${res.block} ${res.houseNo}</div>
      </td>
      <td>
        <div style="display:flex; flex-direction:column; gap:0.25rem;">
          <span class="badge-credential-user" title="Username Login Portal Warga">
            <i class="fa-solid fa-user-tag text-emerald"></i> ${res.username || res.name}
          </span>
          <div style="display:flex; align-items:center; gap:0.35rem;">
            <span class="badge-credential-pwd" title="Password Akun Rumah">
              <i class="fa-solid fa-key text-gold"></i> ${res.password || '-'}
            </span>
            <button type="button" class="btn-copy-cred" data-copy-user="${res.username || res.name}" data-copy-pass="${res.password || ''}" data-copy-name="${res.name}" data-copy-house="${res.block} ${res.houseNo}" title="Salin Info Akun ke Format WhatsApp">
              <i class="fa-brands fa-whatsapp text-emerald"></i>
            </button>
          </div>
        </div>
      </td>
      <td><span class="split-pill">${res.domicile}</span></td>
      <td><i class="fa-brands fa-whatsapp text-emerald"></i> ${res.phone}</td>
      <td>${res.members} Orang</td>
      <td>
        <span class="${isPaid ? 'status-badge-paid' : 'status-badge-unpaid'}">
          ${isPaid ? 'Lunas Bulan Ini' : 'Belum Bayar'}
        </span>
      </td>
      <td style="text-align: right; white-space: nowrap;">
        <button class="btn btn-sm btn-outline btn-edit-warga" data-warga-id="${res.id}" title="Edit Data &amp; Akun Warga">
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button class="btn btn-sm btn-outline btn-outline-rose btn-delete-warga" data-warga-id="${res.id}" title="Hapus">
          <i class="fa-solid fa-trash"></i>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

/**
 * Live Sync Residents from Google Sheets published CSV URL
 */
async function syncResidentsFromGoogleSheet() {
  const btn = document.getElementById('btn-sync-warga-sheet');
  const origHtml = btn ? btn.innerHTML : '';
  try {
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Menghubungkan Google Sheets...';
    }

    const response = await fetch(GOOGLE_SHEET_CSV_URL);
    if (!response.ok) throw new Error('Status respons: ' + response.status);
    const csvText = await response.text();
    const lines = csvText.split(/\r?\n/).filter(l => l.trim().length > 0);
    if (lines.length <= 1) throw new Error('Data CSV dari Google Sheets kosong');

    const syncedList = [];
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      // Robust CSV line parser handling quotes
      const cols = [];
      let cur = '';
      let inQuotes = false;
      for (let c = 0; c < line.length; c++) {
        const char = line[c];
        if (char === '"') inQuotes = !inQuotes;
        else if (char === ',' && !inQuotes) {
          cols.push(cur.trim());
          cur = '';
        } else cur += char;
      }
      cols.push(cur.trim());

      if (cols.length < 5 || !cols[1]) continue;
      const noUrut = parseInt(cols[0], 10) || i;
      const name = cols[1];
      let rawStreet = cols[2];
      let street = rawStreet.toLowerCase().startsWith('jl.') ? rawStreet : 'Jl. ' + rawStreet;
      if (street.toUpperCase() === 'JL. CITARUM IVA') street = 'Jl. Citarum IVA';

      let rawBlock = cols[3];
      let block = rawBlock.toLowerCase().startsWith('blok') ? rawBlock : 'Blok ' + rawBlock;

      let rawNo = cols[4];
      let houseNo = rawNo.toLowerCase().startsWith('no.') ? rawNo : (rawNo.startsWith('K') ? rawNo : 'No. ' + rawNo);

      const existing = state.residents.find(r => r.name.toLowerCase() === name.toLowerCase() && r.block === block);
      syncedList.push({
        id: existing ? existing.id : `w-${i}`,
        noUrut: noUrut,
        name: name,
        street: street,
        block: block,
        houseNo: houseNo,
        phone: existing ? existing.phone : `081289${(rawBlock.replace(/\D/g, '') || '0').padStart(2, '0')}${(rawNo.replace(/\D/g, '') || String(i)).padStart(4, '0').slice(-4)}`,
        domicile: existing ? existing.domicile : (name.toUpperCase().includes('KOST') ? 'Kontrak' : 'Tetap'),
        members: existing ? existing.members : (name.toUpperCase().includes('KOST') ? 1 : 4)
      });
    }

    if (syncedList.length > 0) {
      state.residents = syncedList;
      saveState();
      renderResidents();
      renderChecklist();
      renderDashboard();
      showToast(`✅ Sukses! ${syncedList.length} data warga berhasil disinkronkan dari Google Sheets.`, 'success');
    }
  } catch (err) {
    console.error('Google Sheet Sync Error:', err);
    showToast('Gagal sinkronisasi Google Sheets: ' + err.message, 'error');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = origHtml;
    }
  }
}

/**
 * Renders Accounting & Financial Report Area
 */
function renderReport() {
  const fin = computeFinancials();
  const reportType = document.querySelector('input[name="reportType"]:checked')?.value || 'monthly';

  const periodTitle = document.getElementById('report-period-title');
  if (periodTitle) {
    periodTitle.textContent = reportType === 'monthly' ? `Periode: ${MONTH_NAMES[state.selectedMonth]} ${state.selectedYear}` :
                              reportType === 'annual' ? `Periode: Tahun Buku ${state.selectedYear}` :
                              'Buku Kas Umum Konsolidasi Seluruh Periode';
  }

  // Summary figures
  document.getElementById('rep-initial-balance').textContent = formatRupiah(0);
  document.getElementById('rep-total-in').textContent = formatRupiah(fin.totalConsolidatedIncome);
  document.getElementById('rep-total-out').textContent = formatRupiah(fin.totalConsolidatedExpense);
  document.getElementById('rep-final-balance').textContent = formatRupiah(fin.totalConsolidatedBalance);

  // Breakdown per Pos in Report Table
  const tbodyReportPos = document.getElementById('tbody-report-pos');
  if (tbodyReportPos) {
    tbodyReportPos.innerHTML = '';
    let idx = 1;
    [...state.posConfig, ...state.otherPosConfig].forEach(pos => {
      const data = fin.posBalances[pos.id] || { income: 0, expense: 0, balance: 0 };
      const isCore = state.posConfig.some(p => p.id === pos.id);

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="text-align: center;">${idx++}</td>
        <td><strong>${pos.name}</strong></td>
        <td>${isCore ? `${formatRupiah(pos.defaultNominal)} / KK` : 'Iuran Bebas'}</td>
        <td style="color: var(--emerald-400); font-weight: 600;">${formatRupiah(data.income)}</td>
        <td style="color: var(--rose-400); font-weight: 600;">${formatRupiah(data.expense)}</td>
        <td style="font-weight: 700; color: var(--gold-400);">${formatRupiah(data.balance)}</td>
      `;
      tbodyReportPos.appendChild(tr);
    });
  }

  // Detailed Ledger in Report
  const tbodyLedger = document.getElementById('tbody-report-ledger');
  if (tbodyLedger) {
    tbodyLedger.innerHTML = '';
    const allTx = [];

    state.payments.forEach(p => {
      const res = state.residents.find(r => r.id === p.residentId);
      const title = p.category ? `[${p.category}] ${p.notes || ''} - ${res ? res.name : ''}` :
                                 `Iuran Wajib ${MONTH_NAMES[p.month]} ${p.year} - ${res ? res.name : ''} (${res ? res.block + ' ' + res.houseNo : ''})`;

      allTx.push({
        date: p.date,
        title: title,
        posName: p.category ? `Pos ${p.category}` : 'Auto-Split 6 Pos',
        debet: Number(p.amount),
        kredit: 0
      });
    });

    state.expenses.forEach(e => {
      const pos = state.posConfig.find(p => p.id === e.posId) || state.otherPosConfig.find(p => p.id === e.posId);
      allTx.push({
        date: e.date,
        title: `${e.title} (Penerima: ${e.recipient})`,
        posName: pos ? pos.name : e.posId,
        debet: 0,
        kredit: Number(e.amount)
      });
    });

    allTx.sort((a, b) => new Date(a.date) - new Date(b.date));

    let runningBalance = 0;
    let idx = 1;
    allTx.forEach(tx => {
      runningBalance += (tx.debet - tx.kredit);
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="text-align: center;">${idx++}</td>
        <td>${formatDateIndo(tx.date)}</td>
        <td>${tx.title}</td>
        <td><span class="split-pill">${tx.posName}</span></td>
        <td style="color: var(--emerald-400);">${tx.debet > 0 ? formatRupiah(tx.debet) : '-'}</td>
        <td style="color: var(--rose-400);">${tx.kredit > 0 ? formatRupiah(tx.kredit) : '-'}</td>
        <td style="font-weight: 700;">${formatRupiah(runningBalance)}</td>
      `;
      tbodyLedger.appendChild(tr);
    });
  }

  // Date for signature
  const sigDate = document.getElementById('sig-date-text');
  if (sigDate) {
    sigDate.textContent = `Jakarta, ${formatDateIndo(new Date().toISOString().split('T')[0])}`;
  }
}

/**
 * Renders Budget Settings Inputs
 */
function renderSettings() {
  const mandatoryInput = document.getElementById('set-mandatory-amount');
  if (mandatoryInput) {
    mandatoryInput.value = state.mandatoryDues;
  }

  const container = document.getElementById('pos-allocation-inputs');
  if (!container) return;
  container.innerHTML = '';

  state.posConfig.forEach(pos => {
    const row = document.createElement('div');
    row.className = 'pos-alloc-row';
    row.innerHTML = `
      <div class="pos-alloc-name">
        <i class="${pos.icon}" style="color: ${pos.color}; margin-right: 6px;"></i>
        ${pos.name}
      </div>
      <div class="input-with-prefix pos-alloc-input">
        <span class="prefix">Rp</span>
        <input type="number" class="pos-alloc-field" data-posid="${pos.id}" value="${pos.defaultNominal}" min="0" step="500" required>
      </div>
    `;
    container.appendChild(row);
  });

  updateAllocationSum();
  renderAccountManagement();
}

function updateAllocationSum() {
  const fields = document.querySelectorAll('.pos-alloc-field');
  let sum = 0;
  fields.forEach(f => {
    sum += Number(f.value) || 0;
  });

  const sumEl = document.getElementById('total-allocated-sum');
  const statusEl = document.getElementById('allocation-match-status');
  const targetMandatory = Number(document.getElementById('set-mandatory-amount')?.value) || state.mandatoryDues;

  if (sumEl) sumEl.textContent = formatRupiah(sum);

  if (statusEl) {
    if (sum === targetMandatory) {
      statusEl.className = 'badge-success';
      statusEl.textContent = '✓ Sesuai (100%)';
    } else {
      const diff = sum - targetMandatory;
      statusEl.className = 'badge-error';
      statusEl.textContent = diff > 0 ? `⚠ Kelebihan ${formatRupiah(diff)}` : `⚠ Kurang ${formatRupiah(Math.abs(diff))}`;
    }
  }
}

/**
 * Render Manajemen Akun & Daftar Pengurus Aktif
 */
function renderAccountManagement() {
  const accounts = state.adminAccounts || DEFAULT_ACCOUNTS;
  
  // 1. Populate Dropdown Select di Form Ganti PIN
  const selectEl = document.getElementById('change-pin-account-select');
  if (selectEl) {
    const currentVal = selectEl.value;
    selectEl.innerHTML = accounts.map(a => `<option value="${a.id}">${a.name} (${a.roleTitle || a.desc || a.id})</option>`).join('');
    if (currentVal && accounts.some(a => a.id === currentVal)) {
      selectEl.value = currentVal;
    }
  }

  // 2. Populate Daftar Akun Pengurus Aktif
  const listEl = document.getElementById('accounts-management-list');
  if (listEl) {
    listEl.innerHTML = accounts.map(acc => {
      const isProtected = (acc.id === 'b1' || acc.id === 'b2' || acc.id === 'pengurus' || acc.id === 'warga');
      const icon = acc.icon || (acc.accessLevel === 'B1' ? 'fa-solid fa-crown' : (acc.accessLevel === 'B2' ? 'fa-solid fa-moon' : (acc.accessLevel === 'PENGURUS' ? 'fa-solid fa-user-tie' : 'fa-solid fa-house-user')));
      const badge = acc.badge || acc.accessLevel;
      let badgeColor = 'var(--gold-400)';
      let iconBg = 'rgba(245,158,11,0.15)';
      if (acc.accessLevel === 'B2') {
        badgeColor = 'var(--emerald-400)';
        iconBg = 'rgba(16,185,129,0.15)';
      } else if (acc.accessLevel === 'PENGURUS') {
        badgeColor = '#c084fc';
        iconBg = 'rgba(168,85,247,0.15)';
      } else if (acc.accessLevel === 'WARGA') {
        badgeColor = '#38bdf8';
        iconBg = 'rgba(6,182,212,0.15)';
      }
      
      return `
        <div class="acc-item-card" data-acc-id="${acc.id}">
          <div class="acc-item-left">
            <div class="acc-item-icon" style="background: ${iconBg}; color: ${badgeColor};">
              <i class="${icon}"></i>
            </div>
            <div class="acc-item-info">
              <h5>${acc.name} <span style="font-weight:400; color:#94a3b8; font-size:0.75rem;">(@${acc.id})</span></h5>
              <div class="acc-item-meta">
                <span style="color: ${badgeColor}; font-weight: 600;">${acc.roleTitle || acc.desc || 'Pengurus'}</span>
                <span>&bull;</span>
                <span title="Tersimpan aman di sistem">PIN: ● ● ● ●</span>
              </div>
            </div>
          </div>
          <div class="acc-item-actions">
            <button type="button" class="btn-acc-action btn-quick-select-pin" data-acc-id="${acc.id}" title="Ganti PIN Akun Ini">
              <i class="fa-solid fa-key text-gold"></i> Ganti PIN
            </button>
            ${!isProtected ? `
              <button type="button" class="btn-acc-delete" data-acc-id="${acc.id}" title="Hapus Akun Pengurus Ini">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            ` : `
              <span class="text-xs text-muted" style="padding: 0.35rem 0.5rem;" title="Akun utama pengurus RT dilindungi"><i class="fa-solid fa-lock"></i> Utama</span>
            `}
          </div>
        </div>
      `;
    }).join('');

    // Listener tombol Ganti PIN cepat
    listEl.querySelectorAll('.btn-quick-select-pin').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-acc-id');
        if (selectEl) {
          selectEl.value = id;
          document.getElementById('change-pin-old')?.focus();
          const target = accounts.find(a => a.id === id);
          showToast(`Akun ${target ? target.name : id} dipilih. Masukkan PIN lama dan PIN baru di formulir atas.`, 'info');
        }
      });
    });

    // Listener tombol Hapus Akun
    listEl.querySelectorAll('.btn-acc-delete').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-acc-id');
        deleteAccount(id);
      });
    });
  }

  // Perbarui tombol login & kartu modal switcher secara realtime
  if (typeof window.renderDynamicLoginCards === 'function') window.renderDynamicLoginCards();
  if (typeof window.renderDynamicSwitchCards === 'function') window.renderDynamicSwitchCards();
}

/**
 * Hapus Akun Pengurus Tambahan
 */
function deleteAccount(accId) {
  if (accId === 'b1' || accId === 'b2') {
    showToast('Akun utama Bendahara 1 & 2 tidak dapat dihapus demi integritas sistem!', 'warning');
    return;
  }
  const acc = (state.adminAccounts || []).find(a => a.id === accId);
  if (!acc) return;

  if (confirm(`Apakah Anda yakin ingin menghapus akun pengurus "${acc.name}" (@${acc.id})?`)) {
    state.adminAccounts = (state.adminAccounts || []).filter(a => a.id !== accId);
    if (state.accountPins && state.accountPins[accId]) {
      delete state.accountPins[accId];
    }
    saveState();
    renderAccountManagement();
    showToast(`Akun pengurus "${acc.name}" berhasil dihapus.`, 'info');
  }
}

// ==================== DIGITAL RECEIPT & WHATSAPP ====================

function openDigitalReceipt(paymentId) {
  const payment = state.payments.find(p => p.id === paymentId);
  if (!payment) return;

  const resident = state.residents.find(r => r.id === payment.residentId);
  if (!resident) return;

  state.activeReceiptData = { payment, resident };

  document.getElementById('rcp-no').textContent = payment.refNo || 'RT01-INV';
  document.getElementById('rcp-date').textContent = formatDateIndo(payment.date);
  document.getElementById('rcp-name').textContent = resident.name;
  document.getElementById('rcp-address').textContent = `${resident.block} ${resident.houseNo} (${resident.domicile})`;
  document.getElementById('rcp-total-amount').textContent = formatRupiah(payment.amount);

  const splitList = document.getElementById('rcp-split-list');
  if (splitList) {
    splitList.innerHTML = '';
    const splits = calculateAutoSplit(payment.amount);
    state.posConfig.forEach(pos => {
      const portion = splits[pos.id] || pos.defaultNominal;
      const row = document.createElement('div');
      row.className = 'rcp-split-row';
      row.innerHTML = `<span>${pos.name}</span><strong>${formatRupiah(portion)}</strong>`;
      splitList.appendChild(row);
    });
  }

  // Open Modal
  document.getElementById('modal-receipt')?.classList.add('active');
}

function shareReceiptViaWhatsApp() {
  if (!state.activeReceiptData) return;
  const { payment, resident } = state.activeReceiptData;

  const splits = calculateAutoSplit(payment.amount);
  const splitsText = state.posConfig.map(pos => `• ${pos.name}: ${formatRupiah(splits[pos.id])}`).join('\n');

  const text = 
`*BUKTI PEMBAYARAN IURAN RT.001 / RW.013*
----------------------------------------
No. Transaksi: *${payment.refNo || 'RT01-INV'}*
Tanggal: *${formatDateIndo(payment.date)}*

Yth. Bpk/Ibu *${resident.name}*
Alamat: *${resident.block} ${resident.houseNo}*

Terima kasih, pembayaran Iuran Kas RT Periode *${MONTH_NAMES[payment.month]} ${payment.year}* sebesar *${formatRupiah(payment.amount)}* telah kami terima.

*Rincian Alokasi Pos Anggaran:*
${splitsText}

_Status: LUNAS TERVERIFIKASI BENDAHARA RT.001_
----------------------------------------
_Sistem Keuangan Eksekutif RT-FinSmart Pro_`;

  let phone = (resident.phone || '').replace(/\D/g, '');
  if (phone.startsWith('0')) {
    phone = '62' + phone.substring(1);
  }

  const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}

// ==================== MODAL HELPERS & POPULATION ====================

function populateBlockFilterOptions() {
  const blocks = [...new Set(state.residents.map(r => r.block))].filter(Boolean).sort();
  
  // Checklist filter block select
  const filterBlock = document.getElementById('filter-block');
  if (filterBlock) {
    const curVal = filterBlock.value;
    filterBlock.innerHTML = '<option value="ALL">Semua Blok / Gang</option>' +
      blocks.map(b => `<option value="${b}">${b}</option>`).join('');
    if (blocks.includes(curVal)) filterBlock.value = curVal;
  }

  // Warga modal block select
  const wargaBlock = document.getElementById('warga-block');
  if (wargaBlock) {
    const curVal = wargaBlock.value;
    wargaBlock.innerHTML = blocks.map(b => `<option value="${b}">${b}</option>`).join('') +
      '<option value="Blok Lainnya">+ Tambah Blok Baru</option>';
    if (blocks.includes(curVal)) wargaBlock.value = curVal;
  }
}

function parseGoogleSheetCSV(csvText) {
  const lines = csvText.trim().split(/\r?\n/).filter(line => line.trim().length > 0);
  if (lines.length < 2) return [];

  const results = [];
  // Expected headers: NO, NAMA, JALAN, BLOK, NO
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(',').map(c => c.trim().replace(/^["']|["']$/g, ''));
    if (cols.length >= 4 && cols[1]) {
      const noUrut = Number(cols[0]) || i;
      const name = cols[1];
      const street = cols[2] ? (cols[2].startsWith('Jl') ? cols[2] : `Jl. ${cols[2]}`) : 'Jl. Citarum II';
      const rawBlock = cols[3] || 'B6';
      const block = rawBlock.startsWith('Blok') ? rawBlock : `Blok ${rawBlock}`;
      const rawNo = cols[4] || cols[0];
      const houseNo = rawNo.startsWith('No') ? rawNo : `No. ${rawNo}`;
      
      const cleanDigits = rawNo.replace(/\D/g, '').padStart(3, '0');
      const blockDigits = (rawBlock.replace(/\D/g, '') || '06').padStart(2, '0');
      const phone = `081289${blockDigits}${cleanDigits}`;

      results.push({
        id: `w-${noUrut}-${rawBlock}-${rawNo}`.toLowerCase().replace(/[^a-z0-9-]/g, ''),
        noUrut: noUrut,
        name: name,
        street: street,
        block: block,
        houseNo: houseNo,
        phone: phone,
        domicile: 'Tetap',
        members: 4
      });
    }
  }
  return results;
}

async function syncResidentsFromGoogleSheet(notify = true) {
  try {
    if (notify) showToast('Menghubungi Google Sheets RT.001 RW.013...', 'info');
    const response = await fetch(GOOGLE_SHEET_CSV_URL);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const csvText = await response.text();
    const freshResidents = parseGoogleSheetCSV(csvText);

    if (!freshResidents || freshResidents.length === 0) {
      throw new Error('Data CSV kosong atau format tidak sesuai');
    }

    // Preserve custom edits (phone, domicile, members) if already modified
    const merged = freshResidents.map(fresh => {
      const existing = state.residents.find(r => 
        (r.name && r.name.toLowerCase() === fresh.name.toLowerCase()) ||
        (r.block === fresh.block && r.houseNo === fresh.houseNo)
      );
      if (existing) {
        return {
          ...fresh,
          id: existing.id,
          phone: existing.phone || fresh.phone,
          domicile: existing.domicile || fresh.domicile,
          members: existing.members || fresh.members
        };
      }
      return fresh;
    });

    state.residents = merged;
    saveState();
    populateBlockFilterOptions();
    populateResidentSelects();
    renderChecklist();
    renderResidents();
    renderDashboard();

    if (notify) {
      showToast(`Sukses! ${merged.length} data warga resmi berhasil disinkronkan dari Google Sheets.`, 'success');
    }
  } catch (err) {
    console.error('Error syncing Google Sheets:', err);
    if (notify) {
      showToast(`Gagal sinkron Google Sheets: ${err.message}. Memastikan data offline tetap aktif.`, 'error');
    }
  }
}

function populateResidentSelects() {
  const selects = ['qp-resident-select', 'od-resident-select'];
  selects.forEach(selId => {
    const el = document.getElementById(selId);
    if (el) {
      el.innerHTML = '<option value="">-- Pilih Warga --</option>';
      state.residents.forEach(res => {
        const opt = document.createElement('option');
        opt.value = res.id;
        opt.textContent = `${res.name} (${res.block} ${res.houseNo})`;
        el.appendChild(opt);
      });
    }
  });

  // Expense pos select
  const expPosSelect = document.getElementById('exp-pos-select');
  const filterExpPos = document.getElementById('filter-expense-pos');
  
  if (expPosSelect) {
    expPosSelect.innerHTML = '<option value="">-- Pilih Pos Anggaran --</option>';
    [...state.posConfig, ...state.otherPosConfig].forEach(pos => {
      const opt = document.createElement('option');
      opt.value = pos.id;
      opt.textContent = pos.name;
      expPosSelect.appendChild(opt);
    });
  }

  if (filterExpPos) {
    filterExpPos.innerHTML = '<option value="ALL">Semua Pos Anggaran</option>';
    [...state.posConfig, ...state.otherPosConfig].forEach(pos => {
      const opt = document.createElement('option');
      opt.value = pos.id;
      opt.textContent = pos.name;
      filterExpPos.appendChild(opt);
    });
  }
}

function populateMonthCheckboxes(targetContainerId) {
  const container = document.getElementById(targetContainerId);
  if (!container) return;

  container.innerHTML = '';
  for (let m = 1; m <= 12; m++) {
    const label = document.createElement('label');
    label.className = 'month-chip';
    label.innerHTML = `
      <input type="checkbox" name="qpMonth" value="${m}" ${m === state.selectedMonth ? 'checked' : ''}>
      <span>${MONTH_NAMES[m].substring(0, 3)}</span>
    `;
    container.appendChild(label);
  }
}

/**
 * Dynamically populates the year selector dropdowns up to 10 years into the future
 */
function populateGlobalYearSelect() {
  const yearSel = document.getElementById('global-year-select');
  if (!yearSel) return;

  const currentYear = new Date().getFullYear();
  // Collect all years recorded in transactions (payments, expenses, etc.)
  const recordedYears = [
    ...(state.payments || []).map(p => Number(p.year)),
    ...(state.expenses || []).map(e => e.date ? new Date(e.date).getFullYear() : null)
  ].filter(y => !isNaN(y) && y > 2000);

  // Dynamic range: at least from 2022 (awal periode kepengurusan 2022-2027 / 4 tahun ke belakang), up to currentYear + 10
  const startYear = Math.min(2022, currentYear - 4, ...recordedYears);
  const endYear = Math.max(currentYear + 10, ...recordedYears);

  const activeYear = state.selectedYear || currentYear;

  // Populate navbar year selector
  const existingOptions = Array.from(yearSel.options).map(o => Number(o.value));
  const needsRebuild = existingOptions.length === 0 || existingOptions[0] !== startYear || existingOptions[existingOptions.length - 1] !== endYear;

  if (needsRebuild) {
    yearSel.innerHTML = '';
    for (let y = startYear; y <= endYear; y++) {
      const opt = document.createElement('option');
      opt.value = y;
      opt.textContent = `${y}`;
      if (y === activeYear) {
        opt.selected = true;
      }
      yearSel.appendChild(opt);
    }
  }
  yearSel.value = activeYear;

  // Also sync modal quick-pay year select if present
  const qpYearSel = document.getElementById('qp-year-select');
  if (qpYearSel) {
    const qpExisting = Array.from(qpYearSel.options).map(o => Number(o.value));
    if (qpExisting.length === 0 || qpExisting[0] !== startYear || qpExisting[qpExisting.length - 1] !== endYear) {
      qpYearSel.innerHTML = '';
      for (let y = startYear; y <= endYear; y++) {
        const opt = document.createElement('option');
        opt.value = y;
        opt.textContent = `Tahun ${y}`;
        if (y === activeYear) {
          opt.selected = true;
        }
        qpYearSel.appendChild(opt);
      }
    }
    qpYearSel.value = activeYear;
  }
}

// ==================== EVENT LISTENERS & NAVIGATION ====================

function setupNavigation() {
  // ==========================================================================
  // INTERACTIVE SIDEBAR MANAGEMENT (COLLAPSE / EXPAND / AUTO & MOBILE DRAWER)
  // ==========================================================================
  const sidebarEl = document.getElementById('sidebar');
  const appContainerEl = document.getElementById('app');
  const menuToggleBtn = document.getElementById('menu-toggle');
  const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
  const sidebarBackdropEl = document.getElementById('sidebar-backdrop');

  const isDesktopScreen = () => window.innerWidth > 1024;

  function toggleSidebarDesktop(forceState) {
    if (!sidebarEl || !appContainerEl) return;
    const currentlyCollapsed = sidebarEl.classList.contains('collapsed');
    const willCollapse = (typeof forceState === 'boolean') ? forceState : !currentlyCollapsed;

    if (willCollapse) {
      sidebarEl.classList.add('collapsed');
      appContainerEl.classList.add('sidebar-collapsed');
      localStorage.setItem('rt_sidebar_collapsed', 'true');
      if (menuToggleBtn) {
        menuToggleBtn.title = "Buka Lebar Menu Sidebar (Ctrl+B)";
      }
    } else {
      sidebarEl.classList.remove('collapsed');
      appContainerEl.classList.remove('sidebar-collapsed');
      localStorage.setItem('rt_sidebar_collapsed', 'false');
      if (menuToggleBtn) {
        menuToggleBtn.title = "Ciutkan Menu Sidebar (Ctrl+B)";
      }
    }
  }

  function toggleSidebarMobile(forceOpen) {
    if (!sidebarEl) return;
    const currentlyOpen = sidebarEl.classList.contains('mobile-open');
    const willOpen = (typeof forceOpen === 'boolean') ? forceOpen : !currentlyOpen;

    if (willOpen) {
      sidebarEl.classList.add('mobile-open');
      sidebarBackdropEl?.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else {
      sidebarEl.classList.remove('mobile-open');
      sidebarBackdropEl?.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function handleUniversalSidebarToggle() {
    if (isDesktopScreen()) {
      toggleSidebarDesktop();
    } else {
      toggleSidebarMobile();
    }
  }

  // Restore or automatically apply sidebar collapse on desktop
  const savedSidebarPref = localStorage.getItem('rt_sidebar_collapsed');
  if (isDesktopScreen()) {
    if (savedSidebarPref === 'true') {
      toggleSidebarDesktop(true);
    } else if (savedSidebarPref === null && window.innerWidth < 1280) {
      // Smart automatic collapse on compact laptop screens to give spacious view
      toggleSidebarDesktop(true);
    }
  }

  // Toggle button event listeners
  menuToggleBtn?.addEventListener('click', handleUniversalSidebarToggle);
  sidebarToggleBtn?.addEventListener('click', () => {
    if (isDesktopScreen()) {
      toggleSidebarDesktop();
    } else {
      toggleSidebarMobile(false);
    }
  });

  // Click outside on backdrop to close mobile drawer
  sidebarBackdropEl?.addEventListener('click', () => {
    toggleSidebarMobile(false);
  });

  // Desktop Menu & Mobile Bottom Nav click handling
  const navLinks = document.querySelectorAll('.menu-item, .bnav-item');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('data-target');
      navigateToView(target);

      // Close mobile sidebar if open on mobile devices
      if (!isDesktopScreen()) {
        toggleSidebarMobile(false);
      }
    });
  });

  // Global Keyboard shortcut: Ctrl + B or Alt + S to toggle sidebar
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'b' || e.key === 'B')) {
      e.preventDefault();
      handleUniversalSidebarToggle();
    } else if (e.altKey && (e.key === 's' || e.key === 'S')) {
      e.preventDefault();
      handleUniversalSidebarToggle();
    }
  });

  // Smooth window resize handling
  let sidebarResizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(sidebarResizeTimer);
    sidebarResizeTimer = setTimeout(() => {
      if (isDesktopScreen()) {
        toggleSidebarMobile(false);
        const pref = localStorage.getItem('rt_sidebar_collapsed');
        if (pref === 'true') {
          toggleSidebarDesktop(true);
        } else if (pref === 'false') {
          toggleSidebarDesktop(false);
        }
      } else {
        sidebarEl?.classList.remove('collapsed');
        appContainerEl?.classList.remove('sidebar-collapsed');
      }
    }, 150);
  });

  // Global Period Selectors
  const monthSel = document.getElementById('global-month-select');
  const yearSel = document.getElementById('global-year-select');

  // Populate dynamic year options (up to 10 years ahead)
  populateGlobalYearSelect();

  if (monthSel) {
    monthSel.value = state.selectedMonth;
    monthSel.addEventListener('change', (e) => {
      state.selectedMonth = Number(e.target.value);
      renderAll();
    });
  }

  if (yearSel) {
    yearSel.value = state.selectedYear;
    yearSel.addEventListener('change', (e) => {
      state.selectedYear = Number(e.target.value);
      renderAll();
    });
  }
}

function navigateToView(viewId) {
  // If B2 attempts to navigate to B1-only page, redirect to jimpitan
  if (state.currentUser === 'b2' && B1_ONLY_TARGETS.includes(viewId)) {
    viewId = 'jimpitan';
  }

  // If Pengurus attempts to navigate to Checklist or B1-only page, redirect to pengurus-struktur
  if (state.currentUser === 'pengurus' && (viewId === 'checklist' || B1_ONLY_TARGETS.includes(viewId))) {
    viewId = 'pengurus-struktur';
  }

  // Hide all sections
  document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
  // Deactivate all nav links
  document.querySelectorAll('.menu-item, .bnav-item').forEach(link => link.classList.remove('active'));

  // Show target section
  const targetSec = document.getElementById(`view-${viewId}`);
  if (targetSec) targetSec.classList.add('active');

  // Activate matching links
  document.querySelectorAll(`[data-target="${viewId}"]`).forEach(link => link.classList.add('active'));

  // Update Page Title
  const titles = {
    'dashboard': { title: 'Dashboard Eksekutif', sub: 'Ringkasan Arus Kas & Pos Anggaran Terkini' },
    'checklist': { title: 'Checklist Iuran Wajib', sub: `Periode: ${MONTH_NAMES[state.selectedMonth]} ${state.selectedYear} (Auto-Split 6 Pos)` },
    'pos-anggaran': { title: '6 Pos Anggaran & SHR', sub: 'Rekapitulasi Saldo Masuk, Keluar & Sisa Kas Pos' },
    'pengeluaran': { title: 'Pengeluaran Kas RT', sub: 'Pencatatan Biaya Operasional & Pembebanan Pos' },
    'warga': { title: 'Data Warga RT.001', sub: 'Daftar Kepala Keluarga, Kontak WA & Status Domisili' },
    'laporan': { title: 'Laporan & Pembukuan', sub: 'Laporan Pertanggungjawaban Keuangan Siap Cetak' },
    'pengaturan': { title: 'Pengaturan Pos & Sistem', sub: 'Konfigurasi Iuran, Split Anggaran & Cadangan Database' },
    'jimpitan': { title: 'Uang Jimpitan Ronda', sub: 'Perolehan & Pengeluaran Kas Ronda Malam Minggu' },
    'pengajuan-dana-admin': { title: 'Pengajuan Dana Warga', sub: 'Verifikasi, Persetujuan & Realisasi Pencairan Kas Fasilitas' },
    'pengurus-struktur': { title: 'Bagan & Struktur Pengurus RT', sub: 'Tata Kelola Organisasi RT.001 / RW.013 Graha Asri Periode 2022–2027' },
    'aset-rt': { title: 'Inventaris & Aset RT.001', sub: 'Pencatatan Sarana Prasarana & Nilai Perolehan Aset Lingkungan Graha Asri' },
    'portal-warga': { title: 'Portal Mandiri Warga RT.001', sub: 'Layanan Mandiri, Rekapitulasi Iuran Pribadi & Jadwal Ronda Lingkungan' }
  };

  if (titles[viewId]) {
    document.getElementById('page-title').textContent = titles[viewId].title;
    document.getElementById('page-subtitle').textContent = titles[viewId].sub;
  }

  // Re-render specific view if needed
  if (viewId === 'checklist') renderChecklist();
  if (viewId === 'pos-anggaran') renderPosDetails();
  if (viewId === 'pengeluaran') renderExpenses();
  if (viewId === 'warga') renderResidents();
  if (viewId === 'laporan') renderReport();
  if (viewId === 'pengaturan') renderSettings();
  if (viewId === 'dashboard') renderDashboard();
  if (viewId === 'jimpitan') renderJimpitan();
  if (viewId === 'pengajuan-dana-admin') renderAdminFundRequests();
  if (viewId === 'pengurus-struktur') renderPengurusStruktur();
  if (viewId === 'aset-rt') renderAsetRt();
  if (viewId === 'portal-warga') renderPortalWarga();
}

function setupModalEventListeners() {
  // Close buttons
  document.querySelectorAll('.modal-close, [data-close]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const modalId = btn.getAttribute('data-close') || btn.closest('.modal-backdrop')?.id;
      if (modalId) {
        document.getElementById(modalId)?.classList.remove('active');
      }
    });
  });

  // Close when clicking backdrop
  document.querySelectorAll('.modal-backdrop').forEach(bd => {
    bd.addEventListener('click', (e) => {
      if (e.target === bd) {
        bd.classList.remove('active');
      }
    });
  });

  // Quick Pay Modal Trigger
  document.getElementById('btn-quick-pay')?.addEventListener('click', () => {
    populateGlobalYearSelect();
    populateResidentSelects();
    populateMonthCheckboxes('qp-months-container');
    const qpYear = document.getElementById('qp-year-select');
    if (qpYear) qpYear.value = state.selectedYear;
    document.getElementById('modal-quick-pay')?.classList.add('active');
  });

  // Form: Quick Pay Submission
  document.getElementById('form-quick-pay')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const residentId = document.getElementById('qp-resident-select').value;
    const targetYear = Number(document.getElementById('qp-year-select')?.value) || state.selectedYear;
    const nominal = Number(document.getElementById('qp-nominal-per-month').value) || state.mandatoryDues;
    const method = document.getElementById('qp-payment-method').value;
    const selectedMonthCheckboxes = document.querySelectorAll('input[name="qpMonth"]:checked');

    if (!residentId) {
      showToast('Pilih warga terlebih dahulu!', 'error');
      return;
    }

    if (selectedMonthCheckboxes.length === 0) {
      showToast('Pilih minimal 1 bulan pembayaran!', 'error');
      return;
    }

    const resident = state.residents.find(r => r.id === residentId);
    let countPaid = 0;

    selectedMonthCheckboxes.forEach(cb => {
      const m = Number(cb.value);
      // Check if already paid
      const exists = state.payments.find(p => !p.category && p.residentId === residentId && p.month === m && p.year === targetYear);
      if (!exists) {
        const refNo = `RT01-${targetYear}${String(m).padStart(2, '0')}-${String(Math.floor(Math.random() * 9000) + 1000)}`;
        state.payments.push({
          id: `pay-${Date.now()}-${m}`,
          residentId: residentId,
          month: m,
          year: targetYear,
          amount: nominal,
          date: new Date().toISOString().split('T')[0],
          method: method,
          refNo: refNo
        });
        countPaid++;
      }
    });

    saveState();
    document.getElementById('modal-quick-pay')?.classList.remove('active');
    showToast(`Sukses mencatat ${countPaid} bulan pembayaran (Tahun ${targetYear}) untuk ${resident ? resident.name : 'warga'}!`, 'success');
    renderAll();
  });

  // Form: Other Dues (SHR / Donasi)
  document.getElementById('btn-add-other-dues')?.addEventListener('click', () => {
    populateResidentSelects();
    document.getElementById('od-date').value = new Date().toISOString().split('T')[0];
    document.getElementById('modal-other-dues')?.classList.add('active');
  });

  document.getElementById('form-other-dues')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const category = document.getElementById('od-category').value;
    const residentId = document.getElementById('od-resident-select').value;
    const amount = Number(document.getElementById('od-amount').value);
    const date = document.getElementById('od-date').value;
    const notes = document.getElementById('od-notes').value;

    const refNo = `${category.substring(0, 3).toUpperCase()}-${Date.now().toString().slice(-4)}`;

    state.payments.push({
      id: `oth-${Date.now()}`,
      category: category,
      residentId: residentId,
      amount: amount,
      date: date,
      notes: notes,
      refNo: refNo
    });

    saveState();
    document.getElementById('modal-other-dues')?.classList.remove('active');
    showToast(`Pemasukan ${category} sebesar ${formatRupiah(amount)} berhasil disimpan!`, 'success');
    renderAll();
  });

  // Form: Expense Logger
  document.getElementById('btn-open-expense-modal')?.addEventListener('click', () => {
    openExpenseModal();
  });

  document.getElementById('btn-add-expense-pos')?.addEventListener('click', () => {
    openExpenseModal();
  });

  document.getElementById('form-expense')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const posId = document.getElementById('exp-pos-select').value;
    const amount = Number(document.getElementById('exp-amount').value);
    const date = document.getElementById('exp-date').value;
    const title = document.getElementById('exp-title').value;
    const recipient = document.getElementById('exp-recipient').value;

    state.expenses.push({
      id: `exp-${Date.now()}`,
      posId: posId,
      amount: amount,
      date: date,
      title: title,
      recipient: recipient
    });

    saveState();
    document.getElementById('modal-expense')?.classList.remove('active');
    showToast(`Pengeluaran sebesar ${formatRupiah(amount)} berhasil dicatat!`, 'success');
    renderAll();
  });

  // Form: Add / Edit Warga
  document.getElementById('btn-add-warga')?.addEventListener('click', () => {
    document.getElementById('modal-warga-title').innerHTML = '<i class="fa-solid fa-user-plus text-emerald"></i> Tambah Data Warga Baru';
    document.getElementById('warga-edit-id').value = '';
    document.getElementById('form-warga').reset();
    const uInput = document.getElementById('warga-username');
    const pInput = document.getElementById('warga-password');
    if (uInput) uInput.value = '';
    if (pInput) pInput.value = '';
    document.getElementById('modal-warga')?.classList.add('active');
  });

  // Tombol Auto Generate Password Sandi Warga Standar
  document.getElementById('btn-generate-warga-pwd')?.addEventListener('click', () => {
    const blockVal = document.getElementById('warga-block')?.value || 'B6';
    const noVal = document.getElementById('warga-house-no')?.value || '01';
    const cleanBlock = blockVal.replace(/[^bB0-9]/g, '').toUpperCase();
    const cleanNo = (noVal.replace(/\D/g, '') || '01').padStart(2, '0');
    // Format kode sandi e.g. C2B602
    const generated = `C2${cleanBlock}${cleanNo}`;
    const pwdInput = document.getElementById('warga-password');
    if (pwdInput) {
      pwdInput.value = generated;
      showToast(`Kode sandi standar dibuat: ${generated}`, 'info');
    }
  });

  document.getElementById('form-warga')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const editId = document.getElementById('warga-edit-id').value;
    const name = document.getElementById('warga-name').value.trim();
    const block = document.getElementById('warga-block').value;
    const houseNo = document.getElementById('warga-house-no').value.trim();
    const phone = document.getElementById('warga-phone').value.trim();
    const domicile = document.getElementById('warga-domicile').value;
    const members = Number(document.getElementById('warga-family-members').value) || 1;
    const username = (document.getElementById('warga-username')?.value || '').trim() || name;
    
    // Default password generator if blank
    const cleanBlock = block.replace(/[^bB0-9]/g, '').toUpperCase();
    const cleanNo = (houseNo.replace(/\D/g, '') || '01').padStart(2, '0');
    const defaultGeneratedPass = `C2${cleanBlock}${cleanNo}`;
    const password = (document.getElementById('warga-password')?.value || '').trim() || defaultGeneratedPass;

    if (editId) {
      // Edit existing
      const res = state.residents.find(r => r.id === editId);
      if (res) {
        res.name = name;
        res.username = username;
        res.password = password;
        res.block = block;
        res.houseNo = houseNo;
        res.phone = phone;
        res.domicile = domicile;
        res.members = members;

        // Jika warga yang diedit adalah yang sedang login, update sesi verified
        if (state.currentVerifiedResident && state.currentVerifiedResident.id === res.id) {
          state.currentVerifiedResident = Object.assign(state.currentVerifiedResident, res);
        }
      }
      showToast('Data & Kredensial akun warga berhasil diperbarui!', 'success');
    } else {
      // New resident
      const nextNoUrut = (state.residents && state.residents.length > 0)
        ? Math.max(...state.residents.map(r => r.noUrut || 0)) + 1
        : 1;
      const newWarga = {
        id: `w-${Date.now()}`,
        noUrut: nextNoUrut,
        name: name,
        username: username,
        password: password,
        street: 'Jl. Citarum II',
        block: block,
        houseNo: houseNo,
        phone: phone,
        domicile: domicile,
        members: members
      };
      state.residents.push(newWarga);
      showToast('Warga baru beserta akun portal berhasil ditambahkan!', 'success');
    }

    saveState();
    document.getElementById('modal-warga')?.classList.remove('active');
    renderResidents();
    renderChecklist();
    renderDashboard();
    if (typeof renderResidentAccountsModal === 'function') renderResidentAccountsModal();
    if (typeof renderPortalWarga === 'function' && state.currentUser === 'warga') renderPortalWarga();
  });

  // Form: Budget & Pos Settings
  document.getElementById('form-budget-settings')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const mandatoryAmount = Number(document.getElementById('set-mandatory-amount').value);
    const fields = document.querySelectorAll('.pos-alloc-field');

    let totalAlloc = 0;
    const newPosConfig = JSON.parse(JSON.stringify(state.posConfig));

    fields.forEach(f => {
      const pId = f.getAttribute('data-posid');
      const val = Number(f.value) || 0;
      totalAlloc += val;
      const targetPos = newPosConfig.find(p => p.id === pId);
      if (targetPos) targetPos.defaultNominal = val;
    });

    if (totalAlloc !== mandatoryAmount) {
      showToast(`Total alokasi (${formatRupiah(totalAlloc)}) harus sama dengan nominal iuran wajib (${formatRupiah(mandatoryAmount)})!`, 'error');
      return;
    }

    state.mandatoryDues = mandatoryAmount;
    state.posConfig = newPosConfig;
    saveState();
    showToast('Pengaturan pos anggaran berhasil disimpan!', 'success');
    renderAll();
  });

  // Settings allocation inputs change listener
  document.getElementById('set-mandatory-amount')?.addEventListener('input', updateAllocationSum);
  document.getElementById('pos-allocation-inputs')?.addEventListener('input', updateAllocationSum);

  // APK Guide Triggers
  document.getElementById('apk-info-trigger')?.addEventListener('click', () => {
    document.getElementById('modal-apk-guide')?.classList.add('active');
  });

  document.getElementById('btn-open-apk-guide')?.addEventListener('click', () => {
    document.getElementById('modal-apk-guide')?.classList.add('active');
  });

  // WhatsApp and Receipt share buttons
  document.getElementById('btn-share-receipt-wa')?.addEventListener('click', shareReceiptViaWhatsApp);
  document.getElementById('btn-print-receipt')?.addEventListener('click', () => window.print());
  document.getElementById('btn-print-report')?.addEventListener('click', () => window.print());

  // Report tab switching
  document.querySelectorAll('input[name="reportType"]').forEach(r => {
    r.addEventListener('change', () => {
      document.querySelectorAll('.radio-pill').forEach(pill => pill.classList.remove('active'));
      r.closest('.radio-pill')?.classList.add('active');
      renderReport();
    });
  });
}

function openExpenseModal(preSelectedPosId = null) {
  populateResidentSelects();
  const dateInput = document.getElementById('exp-date');
  if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];

  const posSelect = document.getElementById('exp-pos-select');
  if (posSelect && preSelectedPosId) {
    posSelect.value = preSelectedPosId;
  }

  // Update available saldo hint
  updateExpenseSaldoHint();
  document.getElementById('modal-expense')?.classList.add('active');
}

function updateExpenseSaldoHint() {
  const posSelect = document.getElementById('exp-pos-select');
  const hint = document.getElementById('exp-available-saldo-hint');
  if (!posSelect || !hint) return;

  const fin = computeFinancials();
  const posData = fin.posBalances[posSelect.value];
  if (posData) {
    hint.textContent = `Sisa Saldo Tersedia di Pos Ini: ${formatRupiah(posData.balance)}`;
  } else {
    hint.textContent = 'Sisa Saldo Tersedia di Pos Ini: Rp 0';
  }
}

document.getElementById('exp-pos-select')?.addEventListener('change', updateExpenseSaldoHint);

// ==================== DELEGATED EVENT LISTENERS ====================

function setupDelegatedEvents() {
  // Checklist item checkbox toggle
  document.getElementById('tbody-checklist')?.addEventListener('change', (e) => {
    if (e.target.classList.contains('checklist-item-toggle')) {
      const residentId = e.target.getAttribute('data-resident-id');
      const isChecked = e.target.checked;
      toggleResidentPayment(residentId, isChecked);
    }
  });

  // Checklist table buttons
  document.getElementById('tbody-checklist')?.addEventListener('click', (e) => {
    const btnReceipt = e.target.closest('.btn-open-receipt');
    const btnWA = e.target.closest('.btn-send-wa');
    const btnPay = e.target.closest('.btn-pay-individual');

    if (btnReceipt) {
      openDigitalReceipt(btnReceipt.getAttribute('data-payid'));
    } else if (btnWA) {
      openDigitalReceipt(btnWA.getAttribute('data-payid'));
      setTimeout(() => shareReceiptViaWhatsApp(), 300);
    } else if (btnPay) {
      const residentId = btnPay.getAttribute('data-resident-id');
      toggleResidentPayment(residentId, true);
    }
  });

  // Recent transactions table buttons
  document.getElementById('tbody-recent-tx')?.addEventListener('click', (e) => {
    const btnReceipt = e.target.closest('.btn-view-rcp');
    if (btnReceipt) {
      openDigitalReceipt(btnReceipt.getAttribute('data-payid'));
    }
  });

  // Pos details quick expense button
  document.getElementById('pos-full-details-container')?.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-quick-expense-for-pos');
    if (btn) {
      const posId = btn.getAttribute('data-posid');
      openExpenseModal(posId);
    }
  });

  // Expense table delete button
  document.getElementById('tbody-expenses')?.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-delete-expense');
    if (btn) {
      const expId = btn.getAttribute('data-expid');
      if (confirm('Yakin ingin menghapus catatan pengeluaran ini?')) {
        state.expenses = state.expenses.filter(exp => exp.id !== expId);
        saveState();
        showToast('Pengeluaran berhasil dihapus.', 'info');
        renderAll();
      }
    }
  });

  // Warga table edit, copy credentials & delete buttons
  document.getElementById('tbody-warga')?.addEventListener('click', (e) => {
    const btnEdit = e.target.closest('.btn-edit-warga');
    const btnDelete = e.target.closest('.btn-delete-warga');
    const btnCopyCred = e.target.closest('.btn-copy-cred');

    if (btnCopyCred) {
      const uName = btnCopyCred.getAttribute('data-copy-name') || '';
      const uHouse = btnCopyCred.getAttribute('data-copy-house') || '';
      const uUser = btnCopyCred.getAttribute('data-copy-user') || '';
      const uPass = btnCopyCred.getAttribute('data-copy-pass') || '';
      const waMsg = `Yth. Bapak/Ibu ${uName} (${uHouse}),\n\nBerikut akun resmi Anda untuk login ke *Portal Warga RT.001 / RW.013*:\n\n🔑 *Username:* ${uUser}\n🔒 *Password:* ${uPass}\n\nSilakan gunakan akun ini untuk masuk ke Web Portal Warga guna mengecek status iuran bulanan, jadwal ronda malam minggu, serta layanan pengajuan fasilitas lingkungan.\n\nSalam hangat,\n*Pengurus RT.001 / RW.013*`;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(waMsg).then(() => {
          showToast(`✅ Format WhatsApp akun ${uName} berhasil disalin!`, 'success');
        }).catch(() => {
          prompt('Salin teks akun warga ini:', waMsg);
        });
      } else {
        prompt('Salin teks akun warga ini:', waMsg);
      }
      return;
    }

    if (btnEdit) {
      const wargaId = btnEdit.getAttribute('data-warga-id');
      const res = state.residents.find(r => r.id === wargaId);
      if (res) {
        document.getElementById('modal-warga-title').innerHTML = '<i class="fa-solid fa-user-pen text-gold"></i> Edit Data &amp; Akun Warga';
        document.getElementById('warga-edit-id').value = res.id;
        document.getElementById('warga-name').value = res.name;
        document.getElementById('warga-block').value = res.block;
        document.getElementById('warga-house-no').value = res.houseNo;
        document.getElementById('warga-phone').value = res.phone;
        document.getElementById('warga-domicile').value = res.domicile;
        document.getElementById('warga-family-members').value = res.members;

        const uInput = document.getElementById('warga-username');
        const pInput = document.getElementById('warga-password');
        if (uInput) uInput.value = res.username || res.name;
        if (pInput) pInput.value = res.password || '';

        document.getElementById('modal-warga')?.classList.add('active');
      }
    } else if (btnDelete) {
      const wargaId = btnDelete.getAttribute('data-warga-id');
      if (confirm('Yakin ingin menghapus warga ini dari database?')) {
        state.residents = state.residents.filter(r => r.id !== wargaId);
        saveState();
        showToast('Warga berhasil dihapus.', 'info');
        renderAll();
        if (typeof renderResidentAccountsModal === 'function') renderResidentAccountsModal();
      }
    }
  });

  // Sync Google Sheets button
  document.getElementById('btn-sync-warga-sheet')?.addEventListener('click', () => {
    syncResidentsFromGoogleSheet(true);
  });

  // Checklist search and filter inputs
  document.getElementById('checklist-search')?.addEventListener('input', renderChecklist);
  document.getElementById('filter-street')?.addEventListener('change', renderChecklist);
  document.getElementById('filter-block')?.addEventListener('change', renderChecklist);
  document.getElementById('filter-status')?.addEventListener('change', renderChecklist);

  // Jump to street from Dashboard Street KPI card
  document.addEventListener('click', e => {
    const jumpBtn = e.target.closest('[data-jump-street]');
    if (jumpBtn) {
      const streetName = jumpBtn.getAttribute('data-jump-street');
      jumpToChecklistStreet(streetName);
    }
  });

  // Expense search & filter
  document.getElementById('expense-search')?.addEventListener('input', renderExpenses);
  document.getElementById('filter-expense-pos')?.addEventListener('change', renderExpenses);

  // Warga search & filter
  document.getElementById('warga-search')?.addEventListener('input', renderResidents);
  document.getElementById('filter-warga-status')?.addEventListener('change', renderResidents);
  document.getElementById('filter-warga-block')?.addEventListener('change', renderResidents);
  document.getElementById('btn-sync-warga-sheet')?.addEventListener('click', syncResidentsFromGoogleSheet);

  // Batch mark all displayed as paid
  document.getElementById('btn-batch-pay-all')?.addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('.checklist-item-toggle:not(:checked)');
    if (checkboxes.length === 0) {
      showToast('Semua warga yang tampil sudah berstatus lunas!', 'info');
      return;
    }

    if (confirm(`Tandai ${checkboxes.length} warga yang tampil sebagai Lunas (${formatRupiah(state.mandatoryDues)} per warga)?`)) {
      checkboxes.forEach(cb => {
        const residentId = cb.getAttribute('data-resident-id');
        toggleResidentPayment(residentId, true);
      });
      showToast(`Sukses menandai ${checkboxes.length} warga lunas!`, 'success');
    }
  });

  // Direct buttons
  document.getElementById('btn-goto-checklist')?.addEventListener('click', () => navigateToView('checklist'));
  document.getElementById('btn-goto-pos')?.addEventListener('click', () => navigateToView('pos-anggaran'));
  document.getElementById('btn-view-all-tx')?.addEventListener('click', () => navigateToView('laporan'));
  document.getElementById('btn-export-checklist-pdf')?.addEventListener('click', () => window.print());
}

// ==================== BACKUP & RESTORE UTILITIES ====================

function setupBackupAndRestore() {
  const doBackup = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `RT001_FINSMART_BACKUP_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('File cadangan data RT (JSON) berhasil diunduh!', 'success');
  };

  document.getElementById('btn-backup-data')?.addEventListener('click', doBackup);
  document.getElementById('btn-do-backup')?.addEventListener('click', doBackup);

  // Restore
  document.getElementById('file-restore-input')?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const restored = JSON.parse(event.target.result);
        if (restored && restored.residents && restored.posConfig) {
          state = Object.assign(state, restored);
          saveState();
          showToast('Database keuangan RT berhasil dipulihkan!', 'success');
          renderAll();
        } else {
          showToast('Format file backup tidak valid!', 'error');
        }
      } catch (err) {
        showToast('Gagal membaca file backup JSON!', 'error');
      }
    };
    reader.readAsText(file);
  });

  // Reset demo data
  document.getElementById('btn-reset-demo')?.addEventListener('click', () => {
    if (confirm('Apakah Anda yakin ingin me-reset seluruh data ke data sampel bawaan RT.001 RW.013?')) {
      localStorage.removeItem(APP_STORAGE_KEY);
      state.mandatoryDues = 50000;
      state.posConfig = JSON.parse(JSON.stringify(DEFAULT_POS_CONFIG));
      state.otherPosConfig = JSON.parse(JSON.stringify(OTHER_POS_CONFIG));
      state.residents = JSON.parse(JSON.stringify(INITIAL_RESIDENTS));
      seedInitialDemoData();
      saveState();
      showToast('Data simulasi RT.001 berhasil di-reset ke awal.', 'info');
      renderAll();
    }
  });

  // Export CSV
  document.getElementById('btn-export-warga-csv')?.addEventListener('click', () => {
    let csv = 'No,Blok,No_Rumah,Nama,No_WhatsApp,Domisili,Jumlah_Jiwa\n';
    state.residents.forEach((r, idx) => {
      csv += `${idx + 1},"${r.block}","${r.houseNo}","${r.name}","${r.phone}","${r.domicile}",${r.members}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Data_Warga_RT001_RW013_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    showToast('Data warga berhasil diekspor ke format CSV!', 'success');
  });

  document.getElementById('btn-export-report-excel')?.addEventListener('click', () => {
    let csv = 'Tanggal,Keterangan,Pos_Anggaran,Pemasukan_Debet,Pengeluaran_Kredit\n';
    state.payments.forEach(p => {
      const res = state.residents.find(r => r.id === p.residentId);
      const title = p.category ? `[${p.category}] - ${res ? res.name : ''}` : `Iuran Kas ${MONTH_NAMES[p.month]} ${p.year} - ${res ? res.name : ''}`;
      csv += `"${p.date}","${title}","${p.category || 'Auto-Split 6 Pos'}",${p.amount},0\n`;
    });
    state.expenses.forEach(e => {
      const pos = state.posConfig.find(p => p.id === e.posId) || state.otherPosConfig.find(p => p.id === e.posId);
      csv += `"${e.date}","${e.title} (${e.recipient})","${pos ? pos.name : e.posId}",0,${e.amount}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Laporan_Keuangan_RT001_${state.selectedYear}_${state.selectedMonth}.csv`;
    link.click();
    showToast('Laporan kas berhasil diekspor ke CSV/Excel!', 'success');
  });
}

/**
 * Event Listeners untuk Manajemen Akun & Ganti PIN
 */
function setupAccountManagementEvents() {
  // 1. Form Ganti PIN Akun Pengurus
  const formChangePin = document.getElementById('form-change-pin');
  if (formChangePin) {
    formChangePin.addEventListener('submit', (e) => {
      e.preventDefault();
      const accId = document.getElementById('change-pin-account-select')?.value;
      const oldPin = document.getElementById('change-pin-old')?.value.trim();
      const newPin = document.getElementById('change-pin-new')?.value.trim();
      const confirmPin = document.getElementById('change-pin-confirm')?.value.trim();

      if (!accId) {
        showToast('Pilih akun pengurus terlebih dahulu.', 'warning');
        return;
      }

      if (!state.accountPins) state.accountPins = { b1: '1111', b2: '2222' };
      const currentStoredPin = state.accountPins[accId] || (accId === 'b1' ? '1111' : '2222');

      if (oldPin !== currentStoredPin) {
        showToast('❌ PIN Lama yang Anda masukkan salah!', 'error');
        document.getElementById('change-pin-old')?.focus();
        return;
      }

      if (newPin.length < 4) {
        showToast('⚠️ PIN Baru minimal 4 digit/karakter.', 'warning');
        document.getElementById('change-pin-new')?.focus();
        return;
      }

      if (newPin !== confirmPin) {
        showToast('❌ Konfirmasi PIN Baru tidak cocok dengan PIN Baru!', 'error');
        document.getElementById('change-pin-confirm')?.focus();
        return;
      }

      state.accountPins[accId] = newPin;
      saveState();

      document.getElementById('change-pin-old').value = '';
      document.getElementById('change-pin-new').value = '';
      document.getElementById('change-pin-confirm').value = '';

      const accObj = (state.adminAccounts || DEFAULT_ACCOUNTS).find(a => a.id === accId);
      const accName = accObj ? accObj.name : accId;
      showToast(`✅ Berhasil! PIN/Password untuk ${accName} telah diperbarui.`, 'success');
      renderAccountManagement();
    });
  }

  // 2. Buka Modal Tambah Akun Pengurus Baru
  document.getElementById('btn-open-add-account-modal')?.addEventListener('click', () => {
    document.getElementById('acc-input-name').value = '';
    document.getElementById('acc-input-username').value = '';
    document.getElementById('acc-input-pin').value = '';
    document.getElementById('acc-input-pin-confirm').value = '';
    openModal('modal-add-account');
    setTimeout(() => document.getElementById('acc-input-name')?.focus(), 150);
  });

  // 3. Form Tambah Akun Pengurus Baru Submit
  const formAddAccount = document.getElementById('form-add-account');
  if (formAddAccount) {
    formAddAccount.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('acc-input-name')?.value.trim();
      let username = (document.getElementById('acc-input-username')?.value.trim() || '').toLowerCase().replace(/[^a-z0-9_-]/g, '');
      const role = document.getElementById('acc-input-role')?.value;
      const pin = document.getElementById('acc-input-pin')?.value.trim();
      const pinConfirm = document.getElementById('acc-input-pin-confirm')?.value.trim();

      if (!name || !username || !pin) {
        showToast('Harap lengkapi seluruh isian formulir akun.', 'warning');
        return;
      }

      if (username.length < 3) {
        showToast('Username ID akun minimal 3 karakter.', 'warning');
        return;
      }

      if (!state.adminAccounts) state.adminAccounts = JSON.parse(JSON.stringify(DEFAULT_ACCOUNTS));
      if (state.adminAccounts.some(a => a.id.toLowerCase() === username)) {
        showToast(`Username ID "${username}" sudah digunakan! Harap tentukan username lain.`, 'error');
        return;
      }

      if (pin.length < 4) {
        showToast('PIN akun minimal 4 digit/karakter.', 'warning');
        return;
      }

      if (pin !== pinConfirm) {
        showToast('Konfirmasi PIN tidak cocok dengan PIN yang dibuat!', 'error');
        return;
      }

      // Metadata peran
      let roleTitle = 'Pengurus RT';
      let desc = 'Pengurus RT.001';
      let badge = 'PENGURUS';
      let badgeClass = 'b1-pill';
      let icon = 'fa-solid fa-user-shield';
      let accessLevel = role;

      if (role === 'B1') {
        roleTitle = 'Ketua RT / Admin';
        desc = 'Full Control Seluruh Modul';
        badge = 'ADMIN';
        badgeClass = 'b1-pill';
        icon = 'fa-solid fa-crown';
      } else if (role === 'B2') {
        roleTitle = 'Koordinator Jimpitan & Keamanan';
        desc = 'Koordinator Jimpitan Ronda';
        badge = 'JIMPITAN';
        badgeClass = 'b2-pill';
        icon = 'fa-solid fa-moon';
      } else {
        roleTitle = 'Sekretaris / Administrasi';
        desc = 'Pelayanan Administrasi Warga';
        badge = 'ADMIN';
        badgeClass = 'badge-cyan';
        icon = 'fa-solid fa-clipboard-user';
      }

      const newAccount = {
        id: username,
        name: name,
        roleTitle: roleTitle,
        desc: desc,
        badge: badge,
        badgeClass: badgeClass,
        icon: icon,
        accessLevel: accessLevel
      };

      state.adminAccounts.push(newAccount);
      if (!state.accountPins) state.accountPins = { b1: '1111', b2: '2222' };
      state.accountPins[username] = pin;

      saveState();
      closeModal('modal-add-account');
      renderAccountManagement();
      showToast(`🎉 Akun pengurus "${name}" (@${username}) berhasil dibuat dan siap digunakan!`, 'success');
    });
  }
}

// ==================== PWA SERVICE WORKER REGISTRATION ====================

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js?v=2.8.4')
        .then(reg => {
          console.log('RT-FinSmart ServiceWorker registered', reg.scope);
          if (reg.update) {
            reg.update();
          }
        })
        .catch(err => console.warn('ServiceWorker registration error', err));
    });
  }

  // Bersihkan cache lawas browser secara agresif agar pembaruan CSS & JS langsung terlihat
  if ('caches' in window) {
    caches.keys().then((keys) => {
      keys.forEach((key) => {
        if (key !== 'rt-finsmart-cache-v2.8.4') {
          console.log('Menghapus cache lama browser:', key);
          caches.delete(key);
        }
      });
    }).catch(e => console.warn('Cache purge error:', e));
  }
}

// ==================== MASTER RENDER & INIT ====================

function renderAll() {
  try { populateGlobalYearSelect(); } catch (e) { console.error('Error populateGlobalYearSelect', e); }
  try { populateBlockFilterOptions(); } catch (e) { console.error('Error populateBlockFilterOptions', e); }
  try { renderDashboard(); } catch (e) { console.error('Error renderDashboard', e); }
  try { renderChecklist(); } catch (e) { console.error('Error renderChecklist', e); }
  try { renderPosDetails(); } catch (e) { console.error('Error renderPosDetails', e); }
  try { renderExpenses(); } catch (e) { console.error('Error renderExpenses', e); }
  try { renderResidents(); } catch (e) { console.error('Error renderResidents', e); }
  try { renderReport(); } catch (e) { console.error('Error renderReport', e); }
  try { renderSettings(); } catch (e) { console.error('Error renderSettings', e); }
  try { renderJimpitan(); } catch (e) { console.error('Error renderJimpitan', e); }
  try { renderAdminFundRequests(); } catch (e) { console.error('Error renderAdminFundRequests', e); }
  try { updateFundRequestBadges(); } catch (e) { console.error('Error updateFundRequestBadges', e); }
  try { populateResidentSelects(); } catch (e) { console.error('Error populateResidentSelects', e); }
  try { applyRBAC(); } catch (e) { console.error('Error applyRBAC', e); }
  try { updateUserProfileUI(); } catch (e) { console.error('Error updateUserProfileUI', e); }
}

// ==================== SESSION & PORTAL MANAGEMENT (OPSI A) ====================

const LOGIN_SESSION_KEY = 'RT001_LOGIN_SESSION_V1';

function isLoggedIn() {
  return sessionStorage.getItem(LOGIN_SESSION_KEY) !== null;
}

function setSession(role) {
  sessionStorage.setItem(LOGIN_SESSION_KEY, role);
}

function clearSession() {
  sessionStorage.removeItem(LOGIN_SESSION_KEY);
}

/**
 * Tampilkan Portal Publik (Landing Page Warga)
 */
function showPublicPortal() {
  const publicPortal = document.getElementById('portal-public');
  const adminApp     = document.getElementById('app');
  const adminBar     = document.getElementById('admin-public-bar');
  const adminRoleEl  = document.getElementById('admin-bar-role-name');
  const danaView     = document.getElementById('view-layanan-pengajuan-dana');

  if (danaView) danaView.style.display = 'none';
  if (publicPortal) publicPortal.style.display = 'block';
  if (adminApp) {
    adminApp.style.display = 'none';
    adminApp.style.visibility = 'hidden';
  }
  hideLoginOverlay();

  // Reset tampilan ke 1-Layar Executive Hub
  switchPublicView('hub');

  // Jika sedang login, tampilkan floating bar admin di atas portal publik
  if (isLoggedIn()) {
    if (adminBar) adminBar.style.display = 'block';
    if (adminRoleEl) {
      if (state.currentUser === 'b2') adminRoleEl.textContent = 'Admin 2 (Jimpitan)';
      else if (state.currentUser === 'pengurus') adminRoleEl.textContent = 'Pengurus RT';
      else if (state.currentUser === 'warga') adminRoleEl.textContent = 'Portal Warga';
      else adminRoleEl.textContent = 'Admin 1 (Keuangan Utama)';
    }
  } else {
    if (adminBar) adminBar.style.display = 'none';
  }

  // Update metrik live di landing page warga
  updatePublicStats();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Tampilkan Aplikasi Pengurus (RT-FinSmart PRO Admin App)
 */
function showAdminApp() {
  const publicPortal = document.getElementById('portal-public');
  const adminApp     = document.getElementById('app');
  const adminBar     = document.getElementById('admin-public-bar');
  const danaView     = document.getElementById('view-layanan-pengajuan-dana');

  closePublicDrawer();
  if (danaView) danaView.style.display = 'none';
  if (publicPortal) publicPortal.style.display = 'none';
  if (adminBar) adminBar.style.display = 'none';
  if (adminApp) {
    adminApp.style.display = 'flex';
    adminApp.style.visibility = 'visible';
  }
  hideLoginOverlay();
  renderAll();
}

/**
 * Kontrol Off-Canvas Drawer Menu Layanan
 */
function openPublicDrawer() {
  const drawer = document.getElementById('public-offcanvas-drawer');
  const backdrop = document.getElementById('public-drawer-backdrop');
  if (drawer) drawer.classList.add('open');
  if (backdrop) backdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
  if (typeof pushNavHistory === 'function') {
    pushNavHistory('drawer', null, 'menu');
  }
}

function closePublicDrawer(fromPopState = false) {
  const drawer = document.getElementById('public-offcanvas-drawer');
  const backdrop = document.getElementById('public-drawer-backdrop');
  if (drawer) drawer.classList.remove('open');
  if (backdrop) backdrop.classList.remove('open');
  document.body.style.overflow = '';
  if (!fromPopState && typeof popNavHistory === 'function' && window.history.state?.type === 'drawer') {
    popNavHistory();
  }
}

/**
 * Ganti Tampilan Publik Secara Modular (Hub 1-Layar vs Sub-Views)
 * Menjamin index.html tidak memanjang ke bawah dan bebas tumpukan.
 */
function switchPublicView(viewId, fromPopState = false) {
  closePublicDrawer(true);
  const hub = document.getElementById('public-home-hub');
  const danaView = document.getElementById('view-layanan-pengajuan-dana');
  const allSubviews = document.querySelectorAll('.public-subview');

  // 1. Tampilan Utama: 1-Screen Executive Hub
  if (!viewId || viewId === 'hub') {
    if (hub) hub.style.display = 'flex';
    allSubviews.forEach(el => el.style.display = 'none');
    if (danaView) danaView.style.display = 'none';
    updatePublicStats();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (!fromPopState) {
      if (window.location.hash && window.location.hash !== '#' && window.location.hash !== '#hub') {
        window.history.replaceState({ appNav: true, type: 'hub' }, '', '#hub');
      }
      if (typeof popNavHistory === 'function' && window.history.state?.type === 'subview') {
        popNavHistory();
      }
    }
    return;
  }

  // 2. Tampilan Khusus: Layanan Pengajuan Dana (Harus Melalui Portal Warga Terverifikasi)
  if (viewId === 'pengajuan-dana') {
    if (isLoggedIn() && state.currentUser === 'warga' && state.currentVerifiedResident) {
      showAdminApp();
      navigateToView('portal-warga');
      openPortalWargaPengajuanModal(state.currentVerifiedResident);
    } else {
      showToast('Formulir Pengajuan Dana hanya dapat diakses melalui Portal Warga terverifikasi.', 'info');
      if (typeof window.openRoleLogin === 'function') {
        window.openRoleLogin('warga');
      } else {
        showLoginOverlay('warga');
      }
    }
    return;
  }

  // 3. Tampilan Sub-View Modular ('tentang', 'demografi', 'layanan', 'kegiatan', 'pengurus')
  const targetSubview = document.getElementById(`subview-${viewId}`);
  if (targetSubview) {
    if (hub) hub.style.display = 'none';
    if (danaView) danaView.style.display = 'none';
    allSubviews.forEach(el => el.style.display = 'none');
    targetSubview.style.display = 'block';

    if (viewId === 'demografi') {
      try { renderPublicDemografi(); } catch (e) { console.error('Error demografi', e); }
      renderDemografiUI();
      setTimeout(() => renderDemografiCharts(), 120);
    } else if (viewId === 'layanan') {
      try { renderPublicKasSummary(); } catch (e) { console.error('Error kas', e); }
      updatePublicStats();
      setTimeout(() => renderPublicAnnualDuesChart(), 120);
    } else if (viewId === 'kegiatan') {
      try { renderPublicEventsList(); } catch (e) { console.error('Error events', e); }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (!fromPopState) {
      if (window.location.hash !== `#${viewId}`) {
        window.location.hash = viewId;
      }
      if (typeof pushNavHistory === 'function') {
        pushNavHistory('subview', viewId, viewId);
      }
    }
  }
}

/**
 * Update statistik dinamis pada Hub & section Transparansi di halaman publik
 */
function updatePublicStats() {
  // 1. Jumlah KK & Jiwa
  const totalResidents = state.residents ? state.residents.length : 71;
  const residentsEl = document.getElementById('public-stat-residents');
  if (residentsEl) residentsEl.textContent = totalResidents;
  const hubResidents = document.getElementById('hub-stat-residents');
  if (hubResidents) hubResidents.textContent = `${totalResidents} KK (284 Jiwa)`;

  // 2. Tingkat Partisipasi & Kepatuhan Iuran Warga (Bukan Saldo Mentah)
  try {
    const duesNominal = state.mandatoryDues || 50000;
    const targetYear = 2026;
    const currentMonthIdx = 8; // September
    let totalAnnual2026 = 0;
    if (state.payments && Array.isArray(state.payments)) {
      state.payments.forEach(p => {
        if (!p.category && parseInt(p.year, 10) === targetYear) {
          totalAnnual2026 += Number(p.amount) || 0;
        }
      });
    }
    const potentialAnnualElapsed = (totalResidents * duesNominal) * (currentMonthIdx + 1);
    const complianceRate = potentialAnnualElapsed > 0 ? Math.min(100, Math.round((totalAnnual2026 / potentialAnnualElapsed) * 100)) : 88;
    
    const hubCompliance = document.getElementById('hub-stat-compliance');
    if (hubCompliance) hubCompliance.textContent = `${complianceRate}% Partisipasi Warga`;

    const subviewCompliance = document.getElementById('public-subview-compliance');
    if (subviewCompliance) subviewCompliance.textContent = `${complianceRate}%`;
  } catch (err) {
    console.warn('Gagal menghitung kepatuhan publik:', err);
  }

  // 3. Update Grafik Penerimaan Iuran Tahunan Publik (Januari - Desember)
  try {
    renderPublicAnnualDuesChart();
  } catch (err) {
    console.warn('Gagal update grafik tahunan publik:', err);
  }
}

/**
 * Setup Event Listeners untuk Grafik Penerimaan Iuran Tahunan Publik:
 * - Ganti Tahun (2026 / 2025)
 * - Ganti Model Grafik (Smooth Area Spline vs Rounded Bar Chart)
 */
function setupPublicAnnualDuesChartEvents() {
  const yearSelect = document.getElementById('select-annual-chart-year');
  if (yearSelect) {
    yearSelect.addEventListener('change', (e) => {
      const yr = parseInt(e.target.value, 10);
      renderPublicAnnualDuesChart(yr, currentAnnualChartType);
    });
  }

  const toggleBtns = document.querySelectorAll('.annual-toggle-btn[data-chart-type]');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const chartType = btn.getAttribute('data-chart-type');
      if (chartType && chartType !== currentAnnualChartType) {
        currentAnnualChartType = chartType;
        toggleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const currentYear = yearSelect ? parseInt(yearSelect.value, 10) : 2026;
        renderPublicAnnualDuesChart(currentYear, currentAnnualChartType);
      }
    });
  });
}

/**
 * Render visualisasi grafik penerimaan iuran bulanan 1 tahun berjalan
 * Mengambil data riil dari state.payments (input admin 1) per bulannya.
 */
function renderPublicAnnualDuesChart(selectedYear, chartType = currentAnnualChartType) {
  if (typeof Chart === 'undefined') {
    setTimeout(() => renderPublicAnnualDuesChart(selectedYear, chartType), 250);
    return;
  }
  const canvas = document.getElementById('chartPublicAnnualDues');
  if (!canvas) return;

  const yearSelect = document.getElementById('select-annual-chart-year');
  const targetYear = selectedYear ? parseInt(selectedYear, 10) : (yearSelect ? parseInt(yearSelect.value, 10) : 2026);

  // Label 12 Bulan (Januari s/d Desember)
  const fullMonthLabels = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  const shortMonthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

  // Agregasi penerimaan iuran wajib bulanan dari state.payments (input admin 1)
  const monthlyAmounts = new Array(12).fill(0);
  const monthlyPaidKK = new Array(12).fill(0);

  if (state.payments && Array.isArray(state.payments)) {
    state.payments.forEach(p => {
      // Hanya iuran kas warga reguler (bukan SHR / sukarela / kas jimpitan khusus)
      if (!p.category && parseInt(p.year, 10) === targetYear) {
        const m = parseInt(p.month, 10);
        if (m >= 1 && m <= 12) {
          monthlyAmounts[m - 1] += Number(p.amount) || 0;
          monthlyPaidKK[m - 1] += 1;
        }
      }
    });
  }

  // Hitung KPI Eksekutif
  const totalAnnual = monthlyAmounts.reduce((acc, val) => acc + val, 0);

  // Bulan berjalan / bulan aktif yang dievaluasi
  const currentMonthIdx = (targetYear === 2026) ? 8 : 11; // Sep 2026 adalah bulan ke-9 (idx 8)
  const activeMonths = monthlyAmounts.slice(0, currentMonthIdx + 1);
  const validMonthsCount = activeMonths.filter(v => v > 0).length || 1;
  const averageMonthly = Math.round(totalAnnual / validMonthsCount);

  // Cari Bulan Tertinggi (Peak Month)
  let maxAmount = 0;
  let peakMonthIdx = -1;
  monthlyAmounts.forEach((amt, idx) => {
    if (amt > maxAmount) {
      maxAmount = amt;
      peakMonthIdx = idx;
    }
  });

  // Hitung Tingkat Kepatuhan Pembayaran Warga (%)
  const totalResidents = (state.residents && state.residents.length > 0) ? state.residents.length : 71;
  const duesNominal = state.mandatoryDues || 50000;
  const potentialTargetPerMonth = totalResidents * duesNominal;
  const potentialAnnualElapsed = potentialTargetPerMonth * (currentMonthIdx + 1);
  const complianceRate = potentialAnnualElapsed > 0 ? Math.min(100, Math.round((totalAnnual / potentialAnnualElapsed) * 100)) : 0;

  // Update DOM: Hanya 1 Kotak Tunggal "Performa dan Partisipasi Pembayaran Warga" (Data Nominal Privat Disembunyikan)
  const elSingleCompliance = document.getElementById('public-annual-stat-single-compliance');
  if (elSingleCompliance) {
    elSingleCompliance.textContent = `${complianceRate}% Partisipasi Aktif`;
  }
  const elSingleSub = document.getElementById('public-annual-stat-single-sub');
  if (elSingleSub) {
    elSingleSub.textContent = `Tingkat kelancaran gotong royong ${totalResidents} KK RT.001 (Tahun ${targetYear})`;
  }

  // Normalisasi data grafik publik ke Skala Persentase (0 - 100%) untuk melindungi nominal privat kas warga
  const monthlyPercentages = monthlyAmounts.map(amt => {
    if (potentialTargetPerMonth <= 0) return 0;
    return Math.min(100, Math.round((amt / potentialTargetPerMonth) * 100));
  });

  const averagePercentage = Math.min(100, Math.round((averageMonthly / (potentialTargetPerMonth || 1)) * 100));
  const targetPercentageLine = new Array(12).fill(averagePercentage > 0 ? averagePercentage : 85);

  // Buat ulang instance chart publik
  if (publicAnnualDuesChart) {
    publicAnnualDuesChart.destroy();
    publicAnnualDuesChart = null;
  }

  const ctx = canvas.getContext('2d');

  // Gradien bercahaya untuk Area Fill
  const gradientArea = ctx.createLinearGradient(0, 0, 0, 320);
  gradientArea.addColorStop(0, 'rgba(16, 185, 129, 0.45)');
  gradientArea.addColorStop(0.5, 'rgba(5, 150, 105, 0.18)');
  gradientArea.addColorStop(1, 'rgba(4, 20, 14, 0.01)');

  // Gradien warna Batang Mewah (Emerald & Gold untuk Peak)
  const gradientBar = ctx.createLinearGradient(0, 0, 0, 300);
  gradientBar.addColorStop(0, '#34d399');
  gradientBar.addColorStop(1, '#059669');

  const gradientBarPeak = ctx.createLinearGradient(0, 0, 0, 300);
  gradientBarPeak.addColorStop(0, '#fbbf24');
  gradientBarPeak.addColorStop(1, '#d97706');

  // Titik penanda kurva
  const pointBgColors = monthlyPercentages.map((pct, idx) => (idx === peakMonthIdx ? '#f59e0b' : '#10b981'));
  const pointBorderColors = monthlyPercentages.map((pct, idx) => (idx === peakMonthIdx ? '#ffffff' : '#04140e'));
  const pointRadii = monthlyPercentages.map((pct, idx) => (idx === peakMonthIdx ? 7 : (pct > 0 ? 5 : 2)));

  // Warna batang
  const barColors = monthlyPercentages.map((pct, idx) => {
    if (pct === 0) return 'rgba(16, 185, 129, 0.12)';
    if (idx === peakMonthIdx) return gradientBarPeak;
    return gradientBar;
  });

  const barBorders = monthlyPercentages.map((pct, idx) => {
    if (pct === 0) return 'rgba(16, 185, 129, 0.25)';
    if (idx === peakMonthIdx) return '#f59e0b';
    return '#10b981';
  });

  let datasets = [];

  if (chartType === 'area') {
    datasets = [
      {
        type: 'line',
        label: 'Tingkat Partisipasi Warga (%)',
        data: monthlyPercentages,
        borderColor: '#10b981',
        borderWidth: 3.5,
        backgroundColor: gradientArea,
        fill: true,
        tension: 0.45,
        pointBackgroundColor: pointBgColors,
        pointBorderColor: pointBorderColors,
        pointBorderWidth: 2,
        pointRadius: pointRadii,
        pointHoverRadius: 9,
        pointHoverBackgroundColor: '#fbbf24',
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 3,
        order: 2
      },
      {
        type: 'line',
        label: 'Rata-rata Partisipasi (%)',
        data: targetPercentageLine,
        borderColor: '#f59e0b',
        borderWidth: 2,
        borderDash: [6, 6],
        pointRadius: 0,
        fill: false,
        tension: 0,
        order: 1
      }
    ];
  } else {
    datasets = [
      {
        type: 'bar',
        label: 'Tingkat Partisipasi Warga (%)',
        data: monthlyPercentages,
        backgroundColor: barColors,
        borderColor: barBorders,
        borderWidth: 2,
        borderRadius: 10,
        borderSkipped: false,
        maxBarThickness: 38,
        order: 2
      },
      {
        type: 'line',
        label: 'Rata-rata Partisipasi (%)',
        data: targetPercentageLine,
        borderColor: '#f59e0b',
        borderWidth: 2,
        borderDash: [6, 6],
        pointRadius: 3,
        pointBackgroundColor: '#f59e0b',
        pointBorderColor: '#ffffff',
        fill: false,
        tension: 0.1,
        order: 1
      }
    ];
  }

  publicAnnualDuesChart = new Chart(ctx, {
    data: {
      labels: shortMonthLabels,
      datasets: datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false
      },
      animation: {
        duration: 800,
        easing: 'easeOutQuart'
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(4, 20, 14, 0.95)',
          titleColor: '#fbbf24',
          titleFont: { size: 13, weight: 'bold', family: 'Outfit' },
          bodyColor: '#f8fafc',
          bodyFont: { size: 12, family: 'Plus Jakarta Sans' },
          borderColor: 'rgba(16, 185, 129, 0.4)',
          borderWidth: 1.5,
          padding: 12,
          boxPadding: 6,
          usePointStyle: true,
          callbacks: {
            title: function(items) {
              if (!items.length) return '';
              const idx = items[0].dataIndex;
              return `Bulan ${fullMonthLabels[idx]} ${targetYear}`;
            },
            label: function(context) {
              const val = context.parsed.y || 0;
              if (context.dataset.label.includes('Tingkat Partisipasi')) {
                let rating = 'Sangat Baik';
                if (val >= 90) rating = 'Sangat Tinggi (Tertib)';
                else if (val >= 75) rating = 'Tinggi (Baik)';
                else if (val >= 50) rating = 'Cukup';
                else if (val > 0) rating = 'Sedang Berjalan';
                else rating = 'Belum Berjalan';

                return [
                  ` Indeks Partisipasi: ${val}%`,
                  ` Status: ${rating}`
                ];
              } else {
                return ` Rata-rata Tahunan: ${val}%`;
              }
            },
            afterBody: function() {
              return ['\n🔒 Rincian nominal kas privat khusus di Portal Warga.'];
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.04)',
            drawBorder: false
          },
          ticks: {
            color: '#94a3b8',
            font: { family: 'Plus Jakarta Sans', size: 12, weight: '600' }
          }
        },
        y: {
          beginAtZero: true,
          max: 100,
          grid: {
            color: 'rgba(255, 255, 255, 0.05)',
            drawBorder: false
          },
          ticks: {
            color: '#94a3b8',
            font: { family: 'Plus Jakarta Sans', size: 11 },
            callback: function(val) {
              return val + '%';
            }
          }
        }
      }
    }
  });
}

/**
 * Setup Event Listeners untuk Grafik Iuran di Portal Warga:
 * - Ganti Tahun (2026 / 2025)
 * - Ganti Model Grafik (Smooth Area Spline vs Rounded Bar Chart)
 */
function setupWargaAnnualDuesChartEvents() {
  const yearSelect = document.getElementById('select-warga-chart-year');
  if (yearSelect && !yearSelect.dataset.bound) {
    yearSelect.dataset.bound = 'true';
    yearSelect.addEventListener('change', (e) => {
      const yr = parseInt(e.target.value, 10);
      renderWargaAnnualDuesChart(yr, currentWargaAnnualChartType);
    });
  }

  const btnArea = document.getElementById('btn-warga-chart-type-area');
  const btnBar = document.getElementById('btn-warga-chart-type-bar');

  if (btnArea && !btnArea.dataset.bound) {
    btnArea.dataset.bound = 'true';
    btnArea.addEventListener('click', () => {
      if (currentWargaAnnualChartType !== 'area') {
        currentWargaAnnualChartType = 'area';
        btnArea.classList.add('active');
        if (btnBar) btnBar.classList.remove('active');
        const currentYear = yearSelect ? parseInt(yearSelect.value, 10) : 2026;
        renderWargaAnnualDuesChart(currentYear, currentWargaAnnualChartType);
      }
    });
  }

  if (btnBar && !btnBar.dataset.bound) {
    btnBar.dataset.bound = 'true';
    btnBar.addEventListener('click', () => {
      if (currentWargaAnnualChartType !== 'bar') {
        currentWargaAnnualChartType = 'bar';
        btnBar.classList.add('active');
        if (btnArea) btnArea.classList.remove('active');
        const currentYear = yearSelect ? parseInt(yearSelect.value, 10) : 2026;
        renderWargaAnnualDuesChart(currentYear, currentWargaAnnualChartType);
      }
    });
  }
}

/**
 * Render visualisasi grafik penerimaan iuran bulanan 1 tahun berjalan DETAIL untuk PORTAL WARGA
 * Menampilkan rincian nominal riil kas RT, 4 KPI Box, dan detail KK pembayaran lengkap.
 */
function renderWargaAnnualDuesChart(selectedYear, chartType = currentWargaAnnualChartType) {
  if (typeof Chart === 'undefined') {
    setTimeout(() => renderWargaAnnualDuesChart(selectedYear, chartType), 250);
    return;
  }
  const canvas = document.getElementById('chartWargaAnnualDues');
  if (!canvas) return;

  const yearSelect = document.getElementById('select-warga-chart-year');
  const targetYear = selectedYear ? parseInt(selectedYear, 10) : (yearSelect ? parseInt(yearSelect.value, 10) : 2026);

  const fullMonthLabels = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  const shortMonthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

  // Agregasi penerimaan iuran wajib bulanan dari state.payments (input admin 1)
  const monthlyAmounts = new Array(12).fill(0);
  const monthlyPaidKK = new Array(12).fill(0);

  if (state.payments && Array.isArray(state.payments)) {
    state.payments.forEach(p => {
      if (!p.category && parseInt(p.year, 10) === targetYear) {
        const m = parseInt(p.month, 10);
        if (m >= 1 && m <= 12) {
          monthlyAmounts[m - 1] += Number(p.amount) || 0;
          monthlyPaidKK[m - 1] += 1;
        }
      }
    });
  }

  // Hitung KPI Eksekutif Finansial Riil
  const totalAnnual = monthlyAmounts.reduce((acc, val) => acc + val, 0);
  const currentMonthIdx = (targetYear === 2026) ? 8 : 11;
  const activeMonths = monthlyAmounts.slice(0, currentMonthIdx + 1);
  const validMonthsCount = activeMonths.filter(v => v > 0).length || 1;
  const averageMonthly = Math.round(totalAnnual / validMonthsCount);

  let maxAmount = 0;
  let peakMonthIdx = -1;
  monthlyAmounts.forEach((amt, idx) => {
    if (amt > maxAmount) {
      maxAmount = amt;
      peakMonthIdx = idx;
    }
  });

  const totalResidents = (state.residents && state.residents.length > 0) ? state.residents.length : 71;
  const duesNominal = state.mandatoryDues || 50000;
  const potentialTargetPerMonth = totalResidents * duesNominal;
  const potentialAnnualElapsed = potentialTargetPerMonth * (currentMonthIdx + 1);
  const complianceRate = potentialAnnualElapsed > 0 ? Math.min(100, Math.round((totalAnnual / potentialAnnualElapsed) * 100)) : 0;

  // Update nilai DOM pada 4 KPI Box Portal Warga
  const elTotal = document.getElementById('warga-annual-stat-total');
  if (elTotal) elTotal.textContent = formatCurrency(totalAnnual);

  const elYearLabel = document.getElementById('warga-annual-stat-year-label');
  if (elYearLabel) elYearLabel.textContent = `Tahun ${targetYear}`;

  const elAvg = document.getElementById('warga-annual-stat-average');
  if (elAvg) elAvg.textContent = formatCurrency(averageMonthly);

  const elPeak = document.getElementById('warga-annual-stat-peak');
  const elPeakAmt = document.getElementById('warga-annual-stat-peak-amount');
  if (elPeak && elPeakAmt) {
    if (peakMonthIdx >= 0 && maxAmount > 0) {
      elPeak.textContent = fullMonthLabels[peakMonthIdx];
      elPeakAmt.textContent = `${formatCurrency(maxAmount)} (${monthlyPaidKK[peakMonthIdx]} KK)`;
    } else {
      elPeak.textContent = '-';
      elPeakAmt.textContent = 'Belum ada data';
    }
  }

  const elComp = document.getElementById('warga-annual-stat-compliance');
  if (elComp) elComp.textContent = `${complianceRate}%`;

  const elCompSub = document.getElementById('warga-annual-stat-compliance-sub');
  if (elCompSub) {
    const totalKKPaid = monthlyPaidKK.reduce((a, b) => a + b, 0);
    elCompSub.textContent = `${totalKKPaid} pembayaran / ${validMonthsCount} bulan`;
  }

  // Setup Event Listeners untuk Switcher Portal Warga
  setupWargaAnnualDuesChartEvents();

  // Dataset garis rata-rata penerimaan bulanan
  const targetLineData = new Array(12).fill(averageMonthly > 0 ? averageMonthly : 1000000);

  if (wargaAnnualDuesChart) {
    wargaAnnualDuesChart.destroy();
    wargaAnnualDuesChart = null;
  }

  const ctx = canvas.getContext('2d');

  const gradientArea = ctx.createLinearGradient(0, 0, 0, 320);
  gradientArea.addColorStop(0, 'rgba(16, 185, 129, 0.45)');
  gradientArea.addColorStop(0.5, 'rgba(5, 150, 105, 0.18)');
  gradientArea.addColorStop(1, 'rgba(4, 20, 14, 0.01)');

  const gradientBar = ctx.createLinearGradient(0, 0, 0, 300);
  gradientBar.addColorStop(0, '#34d399');
  gradientBar.addColorStop(1, '#059669');

  const gradientBarPeak = ctx.createLinearGradient(0, 0, 0, 300);
  gradientBarPeak.addColorStop(0, '#fbbf24');
  gradientBarPeak.addColorStop(1, '#d97706');

  const pointBgColors = monthlyAmounts.map((amt, idx) => (idx === peakMonthIdx ? '#f59e0b' : '#10b981'));
  const pointBorderColors = monthlyAmounts.map((amt, idx) => (idx === peakMonthIdx ? '#ffffff' : '#04140e'));
  const pointRadii = monthlyAmounts.map((amt, idx) => (idx === peakMonthIdx ? 7 : (amt > 0 ? 5 : 2)));

  const barColors = monthlyAmounts.map((amt, idx) => {
    if (amt === 0) return 'rgba(16, 185, 129, 0.12)';
    if (idx === peakMonthIdx) return gradientBarPeak;
    return gradientBar;
  });

  const barBorders = monthlyAmounts.map((amt, idx) => {
    if (amt === 0) return 'rgba(16, 185, 129, 0.25)';
    if (idx === peakMonthIdx) return '#f59e0b';
    return '#10b981';
  });

  let datasets = [];

  if (chartType === 'area') {
    datasets = [
      {
        type: 'line',
        label: 'Penerimaan Iuran Warga (Rp)',
        data: monthlyAmounts,
        borderColor: '#10b981',
        borderWidth: 3.5,
        backgroundColor: gradientArea,
        fill: true,
        tension: 0.45,
        pointBackgroundColor: pointBgColors,
        pointBorderColor: pointBorderColors,
        pointBorderWidth: 2,
        pointRadius: pointRadii,
        pointHoverRadius: 9,
        pointHoverBackgroundColor: '#fbbf24',
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 3,
        order: 2
      },
      {
        type: 'line',
        label: 'Rata-rata Penerimaan (Rp)',
        data: targetLineData,
        borderColor: '#f59e0b',
        borderWidth: 2,
        borderDash: [6, 6],
        pointRadius: 0,
        fill: false,
        tension: 0,
        order: 1
      }
    ];
  } else {
    datasets = [
      {
        type: 'bar',
        label: 'Penerimaan Iuran Warga (Rp)',
        data: monthlyAmounts,
        backgroundColor: barColors,
        borderColor: barBorders,
        borderWidth: 2,
        borderRadius: 10,
        borderSkipped: false,
        maxBarThickness: 38,
        order: 2
      },
      {
        type: 'line',
        label: 'Rata-rata Penerimaan (Rp)',
        data: targetLineData,
        borderColor: '#f59e0b',
        borderWidth: 2,
        borderDash: [6, 6],
        pointRadius: 3,
        pointBackgroundColor: '#f59e0b',
        pointBorderColor: '#ffffff',
        fill: false,
        tension: 0.1,
        order: 1
      }
    ];
  }

  wargaAnnualDuesChart = new Chart(ctx, {
    data: {
      labels: shortMonthLabels,
      datasets: datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false
      },
      animation: {
        duration: 800,
        easing: 'easeOutQuart'
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(4, 20, 14, 0.95)',
          titleColor: '#fbbf24',
          titleFont: { size: 13, weight: 'bold', family: 'Outfit' },
          bodyColor: '#f8fafc',
          bodyFont: { size: 12, family: 'Plus Jakarta Sans' },
          borderColor: 'rgba(16, 185, 129, 0.4)',
          borderWidth: 1.5,
          padding: 12,
          boxPadding: 6,
          usePointStyle: true,
          callbacks: {
            title: function(items) {
              if (!items.length) return '';
              const idx = items[0].dataIndex;
              return `Bulan ${fullMonthLabels[idx]} ${targetYear}`;
            },
            label: function(context) {
              if (context.dataset.label.includes('Penerimaan')) {
                const val = context.parsed.y || 0;
                const idx = context.dataIndex;
                const kkCount = monthlyPaidKK[idx] || 0;
                return [
                  ` Penerimaan Iuran: ${formatCurrency(val)}`,
                  ` Warga Lunas: ${kkCount} KK`
                ];
              } else {
                return ` Rata-rata Bulanan: ${formatCurrency(context.parsed.y)}`;
              }
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.04)',
            drawBorder: false
          },
          ticks: {
            color: '#94a3b8',
            font: { family: 'Plus Jakarta Sans', size: 12, weight: '600' }
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(255, 255, 255, 0.05)',
            drawBorder: false
          },
          ticks: {
            color: '#94a3b8',
            font: { family: 'Plus Jakarta Sans', size: 11 },
            callback: function(val) {
              if (val >= 1000000) return (val / 1000000).toFixed(1) + ' Jt';
              if (val >= 1000) return (val / 1000) + ' Rb';
              return val;
            }
          }
        }
      }
    }
  });
}




/**
 * Tampilkan Modal Login Eksekutif Glassmorphism
 */
function showLoginOverlay(defaultRole = 'warga') {
  const overlay = document.getElementById('login-overlay');
  if (overlay) {
    overlay.classList.remove('fade-out');
    overlay.style.display = 'flex';
    if (typeof pushNavHistory === 'function') {
      pushNavHistory('login', null, 'login');
    }
    if (typeof window.applyLoginModeGlobal === 'function') {
      window.applyLoginModeGlobal(defaultRole === 'pengurus' || defaultRole === 'b1' || defaultRole === 'b2' ? 'direct-pengurus' : 'direct-warga', defaultRole);
    }
  }
}

/**
 * Tutup Modal Login Eksekutif
 */
function hideLoginOverlay(fromPopState = false) {
  const overlay = document.getElementById('login-overlay');
  if (overlay) {
    overlay.classList.add('fade-out');
    setTimeout(() => {
      if (overlay.classList.contains('fade-out')) {
        overlay.style.display = 'none';
      }
    }, 280);
    if (!fromPopState && typeof popNavHistory === 'function' && window.history.state?.type === 'login') {
      popNavHistory();
    }
  }
}

// ==================== LOGIN PORTAL LOGIC ====================

function setupLoginPortal() {
  let selectedRole = null;
  let currentLoginMode = 'direct-warga';

  const overlay          = document.getElementById('login-overlay');
  const pinInput         = document.getElementById('login-pin-input');
  const pinSection       = document.getElementById('login-pin-section');
  const wargaSection     = document.getElementById('login-warga-section');
  const wargaUserInput   = document.getElementById('login-warga-user-input');
  const wargaPassInput   = document.getElementById('login-warga-pass-input');
  const wargaEyeBtn      = document.getElementById('login-warga-eye-btn');
  const wargaEyeIcon     = document.getElementById('login-warga-eye-icon');
  const wargaErrorMsg    = document.getElementById('login-warga-error-msg');
  const eyeBtn           = document.getElementById('login-eye-btn');
  const eyeIcon          = document.getElementById('login-eye-icon');
  const checkShowPin     = document.getElementById('login-toggle-show-pin');
  const errorMsg         = document.getElementById('login-error-msg');
  const roleLabel        = document.getElementById('login-selected-role-label');
  const submitBtn        = document.getElementById('btn-login-submit');
  const showForgot       = document.getElementById('btn-show-forgot');
  const backBtn          = document.getElementById('btn-back-to-login');
  const mainView         = document.getElementById('login-main-view');
  const forgotView       = document.getElementById('login-forgot-view');
  const copyEmailBtn     = document.getElementById('btn-copy-reset-email');
  const closeBtn         = document.getElementById('btn-close-login-overlay');

  // Direct login elements
  const directHeader     = document.getElementById('login-direct-header');
  const directBadge      = document.getElementById('direct-portal-badge');
  const directIcon       = document.getElementById('direct-portal-icon');
  const directName       = document.getElementById('direct-portal-name');
  const directTitle      = document.getElementById('direct-portal-title');
  const directSubtitle   = document.getElementById('direct-portal-subtitle');
  const pengurusChips    = document.getElementById('login-pengurus-chips');
  const sectionTitle     = document.getElementById('login-section-title');
  const roleGrid         = document.getElementById('login-role-grid');
  const switchToPengurus = document.getElementById('btn-switch-to-pengurus');
  const switchToWarga    = document.getElementById('btn-switch-to-warga');
  const showAllAccounts  = document.getElementById('btn-show-all-accounts');

  // ---- Apply Login Mode (Direct Warga or Direct Pengurus ONLY - NO Account Selection Cards) ----
  function applyLoginMode(mode, targetRole) {
    currentLoginMode = mode;
    if (errorMsg) errorMsg.style.display = 'none';
    if (wargaErrorMsg) wargaErrorMsg.style.display = 'none';

    // Pastikan 4-cards grid dan section title SELALU disembunyikan total
    if (sectionTitle) sectionTitle.style.display = 'none';
    if (roleGrid) roleGrid.style.display = 'none';
    if (pengurusChips) pengurusChips.style.display = 'none';
    if (showAllAccounts) showAllAccounts.style.display = 'none';

    if (mode === 'direct-pengurus' || targetRole === 'pengurus' || targetRole === 'b1' || targetRole === 'b2') {
      selectedRole = targetRole || 'pengurus';
      if (directHeader) {
        directHeader.style.display = 'block';
        if (directBadge) directBadge.className = 'direct-portal-badge badge-pengurus-glow';
        if (directIcon) directIcon.className = 'fa-solid fa-crown text-gold';
        if (directName) directName.textContent = 'Portal Pengurus RT.001';
        if (directTitle) directTitle.textContent = 'Masuk Akses Pengurus';
        if (directSubtitle) directSubtitle.textContent = 'Masukkan PIN Pengurus Anda untuk membuka sistem administrasi & kas';
      }

      if (wargaSection) wargaSection.style.display = 'none';
      if (pinSection) pinSection.style.display = 'block';
      if (submitBtn) submitBtn.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i> <span>MASUK KE SISTEM</span>';

      if (roleLabel) {
        roleLabel.textContent = 'Masukkan PIN Pengurus:';
      }

      if (switchToPengurus) switchToPengurus.style.display = 'none';
      if (switchToWarga) switchToWarga.style.display = 'inline-flex';

      if (pinInput) {
        pinInput.value = '';
        setTimeout(() => pinInput.focus(), 150);
      }
    } else {
      // Direct Warga (Default)
      selectedRole = 'warga';
      if (directHeader) {
        directHeader.style.display = 'block';
        if (directBadge) directBadge.className = 'direct-portal-badge badge-warga-glow';
        if (directIcon) directIcon.className = 'fa-solid fa-house-chimney-user text-cyan';
        if (directName) directName.textContent = 'Portal Mandiri Warga RT.001';
        if (directTitle) directTitle.textContent = 'Masuk Portal Warga';
        if (directSubtitle) directSubtitle.textContent = 'Masukkan password rumah tangga Anda untuk cek iuran & layanan mandiri';
      }

      if (pinSection) pinSection.style.display = 'none';
      if (wargaSection) wargaSection.style.display = 'block';
      if (submitBtn) submitBtn.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i> <span>MASUK KE PORTAL WARGA</span>';

      if (switchToPengurus) switchToPengurus.style.display = 'inline-flex';
      if (switchToWarga) switchToWarga.style.display = 'none';

      if (wargaPassInput) {
        wargaPassInput.value = '';
        setTimeout(() => wargaPassInput.focus(), 150);
      }
    }
  }

  // Expose applyLoginMode secara global
  window.applyLoginModeGlobal = applyLoginMode;

  // Switch Portal links
  if (switchToPengurus) {
    switchToPengurus.addEventListener('click', (e) => {
      e.preventDefault();
      applyLoginMode('direct-pengurus', 'pengurus');
    });
  }
  if (switchToWarga) {
    switchToWarga.addEventListener('click', (e) => {
      e.preventDefault();
      applyLoginMode('direct-warga', 'warga');
    });
  }

  // Expose openRoleLogin globally for direct login triggers
  window.openRoleLogin = function(role) {
    const isPengurus = (role === 'pengurus' || role === 'b1' || role === 'b2');
    showLoginOverlay(isPengurus ? 'pengurus' : 'warga');
    applyLoginMode(isPengurus ? 'direct-pengurus' : 'direct-warga', role || (isPengurus ? 'pengurus' : 'warga'));
  };

  // Inisialisasi awal ke mode warga
  applyLoginMode('direct-warga', 'warga');

  // ---- Password visibility helper (syncs Eye Icon and Tik Checkbox) ----
  function setPinVisibility(visible) {
    if (pinInput) pinInput.type = visible ? 'text' : 'password';
    if (eyeIcon) eyeIcon.className = visible ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye';
    if (checkShowPin) checkShowPin.checked = visible;
  }

  // Eye icon button toggle for PIN
  if (eyeBtn) {
    eyeBtn.addEventListener('click', () => {
      const isCurrentlyHidden = pinInput ? pinInput.type === 'password' : false;
      setPinVisibility(isCurrentlyHidden);
    });
  }

  // Eye icon button toggle for Warga Password
  if (wargaEyeBtn && wargaPassInput) {
    wargaEyeBtn.addEventListener('click', () => {
      const isPwd = wargaPassInput.type === 'password';
      wargaPassInput.type = isPwd ? 'text' : 'password';
      if (wargaEyeIcon) {
        wargaEyeIcon.className = isPwd ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye';
      }
    });
  }

  // Tik Checkbox toggle
  if (checkShowPin) {
    checkShowPin.addEventListener('change', () => {
      setPinVisibility(checkShowPin.checked);
    });
  }

  // ---- Login submit ----
  function attemptLogin() {
    // A. Autentikasi Akun Warga RT.001 (1 input password rumah)
    if (selectedRole === 'warga') {
      const enteredPass = (wargaPassInput?.value || '').trim();

      if (!enteredPass) {
        showToast('Mohon masukkan password rumah Anda.', 'warning');
        if (wargaErrorMsg) {
          wargaErrorMsg.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Mohon masukkan password rumah Anda.';
          wargaErrorMsg.style.display = 'flex';
        }
        if (wargaPassInput) wargaPassInput.focus();
        return;
      }

      // Cocokkan terhadap database password 112 warga
      const cleanEnteredPass = enteredPass.toLowerCase().replace(/\s+/g, '');
      const matched = (state.residents || []).find(r => {
        if (!r.password) return false;
        const cleanResidentPass = String(r.password).trim().toLowerCase().replace(/\s+/g, '');
        return cleanResidentPass === cleanEnteredPass;
      });

      if (matched) {
        state.currentUser = 'warga';
        state.currentVerifiedResident = matched;
        setSession('warga');
        saveState();
        hideLoginOverlay();
        showAdminApp();
        navigateToView('portal-warga');
        showToast(`✅ Selamat Datang di Portal Warga, Bapak/Ibu ${matched.name} (${matched.block} ${matched.houseNo})!`, 'success');
      } else {
        if (wargaErrorMsg) {
          wargaErrorMsg.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Password tidak sesuai. Info passwordnya silakan WA ke Admin-1.';
          wargaErrorMsg.style.display = 'flex';
        }
        showToast('Password tidak sesuai. Info passwordnya silakan WA ke Admin-1.', 'error');
        if (wargaPassInput) {
          wargaPassInput.value = '';
          wargaPassInput.focus();
        }
      }
      return;
    }

    // B. Autentikasi Akun Pengurus (PIN 1111 / 2222 / 3333)
    const enteredPin = (pinInput?.value || '').trim();
    if (!enteredPin) {
      showToast('Mohon masukkan PIN Pengurus.', 'warning');
      if (errorMsg) {
        errorMsg.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Mohon masukkan PIN Pengurus.';
        errorMsg.style.display = 'flex';
      }
      if (pinInput) pinInput.focus();
      return;
    }

    if (!state.accountPins) state.accountPins = { b1: '1111', b2: '2222', pengurus: '3333' };

    let authenticatedRole = null;
    // Auto-detect role langsung dari PIN yang dimasukkan pengurus
    for (const [rId, rPin] of Object.entries(state.accountPins)) {
      if (rPin === enteredPin) {
        authenticatedRole = rId;
        break;
      }
    }

    // Periksa juga akun custom jika ada
    if (!authenticatedRole && state.adminAccounts) {
      const customAcc = state.adminAccounts.find(a => (a.pin === enteredPin || (a.id === 'b1' && enteredPin === '1111') || (a.id === 'b2' && enteredPin === '2222') || (a.id === 'pengurus' && enteredPin === '3333')));
      if (customAcc) authenticatedRole = customAcc.id;
    }

    if (authenticatedRole) {
      selectedRole = authenticatedRole;
      state.currentUser = selectedRole;
      setSession(selectedRole);
      saveState();
      hideLoginOverlay();

      const accounts = state.adminAccounts || DEFAULT_ACCOUNTS;
      const acc = accounts.find(a => a.id === selectedRole);

      // Cek apakah ada aksi tertunda
      if (typeof window.pendingPengurusAction === 'function') {
        const pendingAction = window.pendingPengurusAction;
        window.pendingPengurusAction = null;
        pendingAction();
        showToast(`✅ Terverifikasi sebagai ${acc ? acc.name : selectedRole}!`, 'success');
        return;
      }

      showAdminApp();
      const isJimpitanOnly = acc && acc.accessLevel === 'B2';
      const isPengurusRole = acc && acc.accessLevel === 'PENGURUS';
      if (isPengurusRole) {
        navigateToView('pengurus-struktur');
      } else if (isJimpitanOnly) {
        navigateToView('jimpitan');
      } else {
        navigateToView('dashboard');
      }
      showToast(`✅ Selamat datang, ${acc ? acc.name : selectedRole}!`, 'success');
    } else {
      if (errorMsg) {
        errorMsg.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> PIN salah. Silakan coba lagi (PIN: 1111 / 2222 / 3333).';
        errorMsg.style.display = 'flex';
        errorMsg.style.animation = 'none';
        requestAnimationFrame(() => { errorMsg.style.animation = ''; });
      }
      showToast('PIN Pengurus salah. Silakan coba lagi.', 'error');
      if (pinInput) {
        pinInput.value = '';
        pinInput.focus();
      }
    }
  }

  if (submitBtn) submitBtn.addEventListener('click', attemptLogin);
  if (pinInput) {
    pinInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') attemptLogin();
    });
  }
  if (wargaUserInput) {
    wargaUserInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        if (wargaPassInput && !wargaPassInput.value) wargaPassInput.focus();
        else attemptLogin();
      }
    });
  }
  if (wargaPassInput) {
    wargaPassInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') attemptLogin();
    });
  }

  // ---- Tombol Tutup Overlay Login (Kembali ke Web Warga) ----
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      hideLoginOverlay();
    });
  }

  // ---- Tombol-Tombol Pembuka Login dari Halaman Publik ----
  // 1. Kartu Unggulan Hub: Portal Mandiri Warga RT.001
  document.getElementById('card-hub-portal-warga')?.addEventListener('click', (e) => {
    e.preventDefault();
    if (isLoggedIn() && state.currentUser === 'warga' && state.currentVerifiedResident) {
      showAdminApp();
      navigateToView('portal-warga');
    } else {
      if (typeof window.openRoleLogin === 'function') {
        window.openRoleLogin('warga');
      } else {
        showLoginOverlay('warga');
      }
    }
  });

  // 2. Tombol Footer Hub: Portal Pengurus
  document.getElementById('btn-open-login-footer')?.addEventListener('click', (e) => {
    e.preventDefault();
    if (isLoggedIn() && ['pengurus', 'b1', 'b2'].includes(state.currentUser)) {
      showAdminApp();
      const targetView = state.currentUser === 'pengurus' ? 'pengurus-struktur' : (state.currentUser === 'b2' ? 'jimpitan' : 'dashboard');
      navigateToView(targetView);
    } else {
      if (typeof window.openRoleLogin === 'function') {
        window.openRoleLogin('pengurus');
      } else {
        showLoginOverlay('pengurus');
      }
    }
  });

  // 3. Trigger Login Lainnya (Hero, Layanan, Nav, Mobile)
  const loginTriggers = [
    'btn-open-login-nav',
    'btn-open-login-mobile',
    'btn-open-login-hero',
    'btn-open-login-layanan'
  ];
  loginTriggers.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('click', () => {
        closePublicDrawer();
        if (typeof window.openRoleLogin === 'function') {
          window.openRoleLogin('pengurus');
        } else {
          showLoginOverlay('pengurus');
        }
      });
    }
  });

  // ---- Tombol Navigasi Admin Bar (di Halaman Publik) ----
  document.getElementById('btn-return-to-admin')?.addEventListener('click', () => {
    showAdminApp();
  });
  document.getElementById('btn-bar-logout')?.addEventListener('click', () => {
    doLogout();
  });

  // ---- Tombol dari Sidebar & Top Header untuk Melihat Web Profil Warga ----
  document.getElementById('btn-sidebar-view-public')?.addEventListener('click', () => {
    showPublicPortal();
  });
  document.getElementById('btn-top-view-public')?.addEventListener('click', () => {
    showPublicPortal();
  });

  // ---- Forgot PIN toggle & actions ----
  if (showForgot) {
    showForgot.addEventListener('click', () => {
      if (mainView) mainView.style.display = 'none';
      if (forgotView) forgotView.style.display = 'block';
    });
  }

  if (backBtn) {
    backBtn.addEventListener('click', () => {
      if (forgotView) forgotView.style.display = 'none';
      if (mainView) mainView.style.display = 'block';
    });
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'rt001rw013.grahaasri@gmail.com';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
          showToast('📋 Alamat email disalin ke clipboard!', 'success');
        }).catch(() => {
          showToast(`Email Admin: ${email}`, 'info');
        });
      } else {
        showToast(`Email Admin: ${email}`, 'info');
      }
    });
  }
}

/**
 * Inisialisasi Navigasi Portal Publik (Drawer & Hub 1-Layar)
 */
function setupPublicPortalNavigation() {
  // 1. Tombol Buka Drawer Menu Layanan
  const drawerTriggers = [
    'btn-open-drawer',
    'btn-open-drawer-footer',
    'public-menu-btn'
  ];
  drawerTriggers.forEach(id => {
    document.getElementById(id)?.addEventListener('click', (e) => {
      e.preventDefault();
      openPublicDrawer();
    });
  });

  // Tombol Cepat Portal di Navbar (Warga & Pengurus)
  document.getElementById('btn-nav-portal-warga')?.addEventListener('click', (e) => {
    e.preventDefault();
    if (isLoggedIn() && state.currentUser === 'warga' && state.currentVerifiedResident) {
      showAdminApp();
      navigateToView('portal-warga');
    } else {
      if (typeof window.openRoleLogin === 'function') {
        window.openRoleLogin('warga');
      } else {
        showLoginOverlay('warga');
      }
    }
  });

  document.getElementById('btn-nav-portal-pengurus')?.addEventListener('click', (e) => {
    e.preventDefault();
    if (isLoggedIn() && ['pengurus', 'b1', 'b2'].includes(state.currentUser)) {
      showAdminApp();
      const targetView = state.currentUser === 'pengurus' ? 'pengurus-struktur' : (state.currentUser === 'b2' ? 'jimpitan' : 'dashboard');
      navigateToView(targetView);
    } else {
      if (typeof window.openRoleLogin === 'function') {
        window.openRoleLogin('pengurus');
      } else {
        showLoginOverlay('pengurus');
      }
    }
  });

  // Tombol Akses Portal Warga Langsung dari Menu Drawer
  document.getElementById('btn-drawer-portal-warga')?.addEventListener('click', (e) => {
    e.preventDefault();
    closePublicDrawer();
    if (isLoggedIn() && state.currentUser === 'warga' && state.currentVerifiedResident) {
      showAdminApp();
      navigateToView('portal-warga');
    } else {
      if (typeof window.openRoleLogin === 'function') {
        window.openRoleLogin('warga');
      } else {
        showLoginOverlay('warga');
      }
    }
  });

  // Tombol Masuk RT-FinSmart PRO dari Footer Drawer
  document.getElementById('btn-open-login-drawer')?.addEventListener('click', (e) => {
    e.preventDefault();
    closePublicDrawer();
    if (typeof window.openRoleLogin === 'function') {
      window.openRoleLogin('b1');
    } else {
      showLoginOverlay();
    }
  });

  // Tombol Buka Drawer dari Sub-Views
  document.querySelectorAll('.btn-subview-drawer, .btn-subview-bottom-drawer').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openPublicDrawer();
    });
  });

  // 2. Tombol Tutup Drawer & Backdrop
  document.getElementById('btn-close-drawer')?.addEventListener('click', closePublicDrawer);
  document.getElementById('public-drawer-backdrop')?.addEventListener('click', closePublicDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePublicDrawer();
  });

  // 3. Brand link di navbar -> Kembali ke Hub 1-Layar
  document.getElementById('nav-brand-link')?.addEventListener('click', (e) => {
    e.preventDefault();
    switchPublicView('hub');
  });

  // 4. Delegasi Klik untuk Navigasi Subview (Item Drawer & Kartu Hub)
  document.addEventListener('click', (e) => {
    // Navigasi ke subview tertentu
    const subviewTarget = e.target.closest('[data-subview]');
    if (subviewTarget) {
      e.preventDefault();
      const viewId = subviewTarget.getAttribute('data-subview');
      if (viewId) {
        if (window.location.hash !== `#${viewId}`) {
          window.location.hash = viewId;
        } else {
          switchPublicView(viewId);
        }
      }
      return;
    }

    // Tombol Back ke Hub (Topbar atau Bottom Nav)
    const backHubBtn = e.target.closest('[data-action="back-hub"], .btn-subview-back, .btn-subview-bottom-back');
    if (backHubBtn) {
      e.preventDefault();
      if (window.location.hash && window.location.hash !== '#' && window.location.hash !== '#hub') {
        window.history.back();
      } else {
        switchPublicView('hub');
      }
      return;
    }
  });

  // 5. Dukungan Deep Linking Hash URL (#tentang, #demografi, dll)
  const handleHashChange = () => {
    const hash = (window.location.hash || '').replace('#', '').trim();
    if (['tentang', 'demografi', 'layanan', 'kegiatan', 'pengurus', 'pengajuan-dana'].includes(hash)) {
      switchPublicView(hash, true);
    } else if (hash === 'portal-public' || hash === 'hub' || hash === '') {
      switchPublicView('hub', true);
    }
  };
  window.addEventListener('hashchange', handleHashChange);

  // Periksa hash pada saat pertama kali load
  if (window.location.hash && window.location.hash !== '#' && window.location.hash !== '#hub') {
    handleHashChange();
  }

  // 6. Inisialisasi Kontrol Grafik Iuran Tahunan Publik
  setupPublicAnnualDuesChartEvents();
}


// ==================== EVENT TERDEKAT BANNER ROTATOR ====================

const UPCOMING_EVENTS = [
  {
    id: 'evt-1',
    category: 'Kerja Bakti & Lingkungan',
    categoryIcon: 'fa-solid fa-broom',
    countdown: '3 Hari Lagi',
    title: 'Kerja Bakti Gotong Royong & Fogging DBD Antisipasi Musim Hujan',
    desc: 'Pembersihan serentak saluran drainase 5 klaster jalan, pemangkasan dahan pohon rimbun, pembagian bubuk abate, serta fogging nyamuk DBD demi kesehatan & kenyamanan bersama warga RT.001.',
    date: 'Minggu, 20 September 2026',
    time: '07:00 – 10:30 WIB',
    location: 'Titik Kumpul: Depan Blok B6 & Pos Kamling',
    note: 'Konsumsi & Kopi Pagi Disediakan Pengurus',
    waText: 'Halo Warga RT.001/RW.013! Mengingatkan agenda Kerja Bakti Gotong Royong & Fogging DBD pada Minggu, 20 September 2026 pukul 07:00 WIB di titik kumpul Depan Blok B6. Mari hadir dan guyub rukun!'
  },
  {
    id: 'evt-2',
    category: 'Ronda & Jimpitan Warga',
    categoryIcon: 'fa-solid fa-shield-halved',
    countdown: '2 Hari Lagi',
    title: 'Ronda Malam & Penarikan Jimpitan Warga RT.001',
    desc: 'Patroli keliling malam terpadu, pengecekan gembok portal malam jam 23.00, pengambilan uang kas jimpitan di setiap rumah warga, dan silaturahmi ngopi bersama antar-warga.',
    date: 'Sabtu Malam, 19 September 2026',
    time: '21:00 – 03:00 WIB',
    location: 'Pos Ronda Kamling Utama RT.001',
    note: 'Kopi, Teh Hangat & Kudapan Ronda Disediakan',
    waText: 'Halo Bapak/Warga RT.001! Mengingatkan jadwal Ronda Malam & Penarikan Jimpitan pada Sabtu Malam, 19 September 2026 mulai pukul 21:00 WIB di Pos Kamling Utama. Jaga lingkungan bersama, guyub rukun!'
  },
  {
    id: 'evt-3',
    category: 'Kerohanian & PHBI',
    categoryIcon: 'fa-solid fa-mosque',
    countdown: '8 Hari Lagi',
    title: 'Peringatan Maulid Nabi Muhammad SAW 1448 H & Santunan Yatim',
    desc: 'Tabligh akbar silaturahmi warga, tausiyah hikmah maulid, serta penyaluran santunan anak yatim & dhuafa dari alokasi kas PHBI dan donasi sukarela warga.',
    date: 'Jumat Malam, 25 September 2026',
    time: '19:30 WIB (Ba’da Isya)',
    location: 'Fasum Utama / Masjid RT.001 Graha Asri',
    note: 'Terbuka untuk Seluruh Keluarga & Warga RT.001',
    waText: 'Undangan Warga RT.001: Hadirilah Peringatan Maulid Nabi Muhammad SAW 1448 H & Santunan Yatim pada Jumat Malam, 25 September 2026 pukul 19:30 WIB di Fasum Utama. Semoga membawa berkah bagi lingkungan kita!'
  }
];

let currentUpcomingEventIdx = 0;
let upcomingEventTimer = null;

function setupUpcomingEventBanner() {
  const bannerWrap = document.getElementById('hub-event-banner-wrap');
  if (!bannerWrap) return;

  const titleEl = document.getElementById('event-banner-title');
  const descEl = document.getElementById('event-banner-desc');
  const catEl = document.getElementById('event-banner-category');
  const cdEl = document.getElementById('event-banner-countdown');
  const dateEl = document.getElementById('event-banner-date');
  const timeEl = document.getElementById('event-banner-time');
  const locEl = document.getElementById('event-banner-location');
  const noteEl = document.getElementById('event-banner-note');
  const waBtn = document.getElementById('event-banner-share-wa');
  const currentIdxEl = document.getElementById('event-current-index');
  const totalCountEl = document.getElementById('event-total-count');
  const mainContent = bannerWrap.querySelector('.event-banner-main');

  if (totalCountEl) totalCountEl.textContent = UPCOMING_EVENTS.length;

  function renderCurrentEvent(idx, animate = true) {
    if (idx < 0) idx = UPCOMING_EVENTS.length - 1;
    if (idx >= UPCOMING_EVENTS.length) idx = 0;
    currentUpcomingEventIdx = idx;

    const evt = UPCOMING_EVENTS[currentUpcomingEventIdx];
    if (!evt) return;

    if (animate && mainContent) {
      mainContent.classList.add('fade-transition');
      setTimeout(() => {
        applyData();
        mainContent.classList.remove('fade-transition');
      }, 150);
    } else {
      applyData();
    }

    function applyData() {
      if (titleEl) titleEl.textContent = evt.title;
      if (descEl) descEl.textContent = evt.desc;
      if (catEl) catEl.innerHTML = `<i class="${evt.categoryIcon}"></i> ${evt.category}`;
      if (cdEl) cdEl.innerHTML = `<i class="fa-regular fa-clock"></i> <strong>${evt.countdown}</strong>`;
      if (dateEl) dateEl.textContent = evt.date;
      if (timeEl) timeEl.textContent = evt.time;
      if (locEl) locEl.textContent = evt.location;
      if (noteEl) noteEl.textContent = evt.note;
      if (currentIdxEl) currentIdxEl.textContent = currentUpcomingEventIdx + 1;

      if (waBtn) {
        waBtn.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(evt.waText)}`;
      }

      // Update dots
      document.querySelectorAll('#event-banner-dots .event-dot').forEach((dot, dIdx) => {
        dot.classList.toggle('active', dIdx === currentUpcomingEventIdx);
      });
    }
  }

  function startEventAutoPlay() {
    stopEventAutoPlay();
    upcomingEventTimer = setInterval(() => {
      renderCurrentEvent(currentUpcomingEventIdx + 1, true);
    }, 7000);
  }

  function stopEventAutoPlay() {
    if (upcomingEventTimer) {
      clearInterval(upcomingEventTimer);
      upcomingEventTimer = null;
    }
  }

  // Prev / Next button listeners
  document.getElementById('btn-event-prev')?.addEventListener('click', (e) => {
    e.preventDefault();
    renderCurrentEvent(currentUpcomingEventIdx - 1, true);
    startEventAutoPlay();
  });

  document.getElementById('btn-event-next')?.addEventListener('click', (e) => {
    e.preventDefault();
    renderCurrentEvent(currentUpcomingEventIdx + 1, true);
    startEventAutoPlay();
  });

  // Dots click delegation
  document.getElementById('event-banner-dots')?.addEventListener('click', (e) => {
    const dot = e.target.closest('.event-dot');
    if (!dot) return;
    const idx = parseInt(dot.getAttribute('data-event-idx'), 10);
    if (!isNaN(idx)) {
      renderCurrentEvent(idx, true);
      startEventAutoPlay();
    }
  });

  // Pause on mouse enter, resume on mouse leave
  const bannerBox = bannerWrap.querySelector('.hub-event-banner');
  if (bannerBox) {
    bannerBox.addEventListener('mouseenter', stopEventAutoPlay);
    bannerBox.addEventListener('mouseleave', startEventAutoPlay);
  }

  // ==================== POPUP MODAL BANNER CONTROLS ====================

  window.openEventPopupBanner = function() {
    if (!bannerWrap) return;
    bannerWrap.style.display = 'flex';
    requestAnimationFrame(() => {
      bannerWrap.classList.add('show-popup');
      bannerWrap.classList.remove('closing');
    });
    startEventAutoPlay();
    if (typeof pushNavHistory === 'function') {
      pushNavHistory('event-popup', null, 'event');
    }
  };

  window.closeEventPopupBanner = function(fromPopState = false) {
    if (!bannerWrap) return;
    bannerWrap.classList.add('closing');
    stopEventAutoPlay();
    setTimeout(() => {
      bannerWrap.classList.remove('show-popup', 'closing');
      bannerWrap.style.display = 'none';
    }, 280);
    if (!fromPopState && typeof popNavHistory === 'function' && window.history.state?.type === 'event-popup') {
      popNavHistory();
    }
  };

  // 1. Tombol Tutup Banner (Tanda Silang X) -> Hanya hilang jika ditekan ini
  document.getElementById('btn-close-event-banner')?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.closeEventPopupBanner();
  });

  // 2. Tombol Buka Kembali Event di Live Ticker
  document.getElementById('btn-reopen-event-popup')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.openEventPopupBanner();
  });

  // 3. Tombol Lihat Agenda Lengkap -> Buka subview kegiatan & tutup popup
  document.getElementById('btn-event-view-detail')?.addEventListener('click', () => {
    window.closeEventPopupBanner();
  });

  // 4. Tombol Escape keyboard
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && bannerWrap.classList.contains('show-popup')) {
      window.closeEventPopupBanner();
    }
  });

  // Initial render content
  renderCurrentEvent(0, false);

  // 5. Muncul tiba-tiba di halaman depan publik setelah splash loading selesai
  setTimeout(() => {
    const publicPortal = document.getElementById('portal-public');
    const hub = document.getElementById('public-home-hub');
    const isPublicHubActive = (!publicPortal || publicPortal.style.display !== 'none') &&
                              (!hub || hub.style.display !== 'none');
    if (isPublicHubActive && !isLoggedIn()) {
      window.openEventPopupBanner();
    }
  }, 2800);
}


// ==================== JADWAL RONDA MALAM & JIMPITAN WARGA ====================

function getResidentMonogram(name) {
  if (!name) return 'RT';
  const clean = name.replace(/^(pak|bpk|bapak|ibu|bu|sdr|h\.|haji)\s+/i, '').trim();
  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'RT';
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getCurrentRondaActiveWeek() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const todayDate = now.getDate();
  const todayDay = now.getDay(); // 0=Sunday, 6=Saturday

  const saturdays = [];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let d = 1; d <= daysInMonth; d++) {
    const tempDate = new Date(year, month, d);
    if (tempDate.getDay() === 6) {
      saturdays.push(d);
    }
  }

  let activeSatIndex = saturdays.findIndex(satDate => {
    if (todayDate <= satDate) return true;
    if (todayDay === 0 && todayDate === satDate + 1) return true;
    return false;
  });

  if (activeSatIndex === -1) {
    activeSatIndex = saturdays.length - 1;
  }

  return Math.min(activeSatIndex + 1, 4);
}

function setupRondaSchedule() {
  const section = document.getElementById('jadwal-ronda-warga');
  if (!section) return;

  const currentWeek = getCurrentRondaActiveWeek();
  let activeTabFilter = 'all';

  function getRondaGroups() {
    return (state.rondaGroups && Array.isArray(state.rondaGroups) && state.rondaGroups.length > 0)
      ? state.rondaGroups
      : DEFAULT_RONDA_GROUPS;
  }

  // Render Public Cards Dynamically
  function renderPublicCards() {
    const groups = getRondaGroups();
    const container = document.getElementById('ronda-cards-container');
    if (!container) return;

    // 1. Update Live Status Pill
    const activeGroup = groups.find(g => g.week === currentWeek) || groups[0];
    const activeLabelEl = document.getElementById('ronda-active-week-name');
    if (activeLabelEl && activeGroup) {
      activeLabelEl.textContent = `${activeGroup.weekName} • Regu ${activeGroup.leader.name}`;
    }

    // Build Cards HTML
    container.innerHTML = groups.map(g => {
      const isCurrent = g.week === currentWeek;
      const leaderInitials = g.leader.initials || getResidentMonogram(g.leader.name);

      return `
        <div class="ronda-card ${isCurrent ? 'is-current-week' : ''}" data-week="${g.week}" id="ronda-card-${g.week}">
          <div class="ronda-card-header">
            <div class="ronda-week-badge-wrap">
              <span class="ronda-week-tag">${escapeHtml(g.weekName)}</span>
              <span class="ronda-week-cycle"><i class="fa-regular fa-calendar"></i> ${escapeHtml(g.cycle)}</span>
            </div>
            <span class="ronda-badge-status-current" style="display: ${isCurrent ? 'inline-flex' : 'none'};">
              <span class="dot-pulse"></span> Bertugas Pekan Ini
            </span>
          </div>

          <div class="ronda-leader-box">
            <div class="ronda-leader-avatar">
              <span>${leaderInitials}</span>
              <i class="fa-solid fa-crown ronda-leader-crown" title="Komandan Regu"></i>
            </div>
            <div class="ronda-leader-info">
              <span class="ronda-leader-role"><i class="fa-solid fa-star text-gold"></i> Komandan Regu</span>
              <strong class="ronda-leader-name" data-name="${escapeHtml(g.leader.name)}">${escapeHtml(g.leader.name)}</strong>
            </div>
            <span class="ronda-leader-tag">PJ Malam</span>
          </div>

          <div class="ronda-members-wrap">
            <div class="ronda-members-title">
              <i class="fa-solid fa-users text-emerald"></i>
              <span>Anggota Regu Ronda:</span>
            </div>
            <ul class="ronda-members-list">
              ${g.members.map(m => {
                const mInitials = m.initials || getResidentMonogram(m.name);
                return `
                  <li class="ronda-member-item" data-name="${escapeHtml(m.name)}">
                    <div class="ronda-member-avatar">${mInitials}</div>
                    <div class="ronda-member-detail">
                      <span class="ronda-member-name">${escapeHtml(m.name)}</span>
                      <span class="ronda-member-role">Petugas Keliling &amp; Jimpitan</span>
                    </div>
                    <span class="ronda-member-check"><i class="fa-solid fa-shield-halved"></i></span>
                  </li>
                `;
              }).join('')}
            </ul>
          </div>

          <div class="ronda-card-footer">
            <div class="ronda-card-tasks">
              <span><i class="fa-solid fa-shield-check text-emerald"></i> Patroli Blok</span>
              <span><i class="fa-solid fa-coins text-gold"></i> Tarik Jimpitan</span>
              <span><i class="fa-solid fa-key text-cyan"></i> Gembok 23.00</span>
            </div>
            <div class="ronda-card-actions">
              <button type="button" class="btn-card-action-wa" data-group="${g.week}" title="Kirim Pengingat WhatsApp ke Regu ${g.week}">
                <i class="fa-brands fa-whatsapp"></i> Ingatkan Tim
              </button>
              <button type="button" class="btn-card-action-copy" data-group="${g.week}" title="Salin Jadwal Regu ${g.week}">
                <i class="fa-regular fa-copy"></i>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Rebind individual card buttons
    container.querySelectorAll('.btn-card-action-copy').forEach(btn => {
      btn.addEventListener('click', () => {
        const groupNum = parseInt(btn.getAttribute('data-group'), 10);
        const text = generateWeekText(groupNum);
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(() => {
            showToast(`📋 Jadwal Regu Minggu ke-${groupNum} berhasil disalin!`, 'success');
          }).catch(() => {
            showToast(`📋 Jadwal Regu Minggu ke-${groupNum} siap dibagikan.`, 'info');
          });
        } else {
          showToast(`📋 Jadwal Regu Minggu ke-${groupNum} siap dibagikan.`, 'info');
        }
      });
    });

    container.querySelectorAll('.btn-card-action-wa').forEach(btn => {
      btn.addEventListener('click', () => {
        const groupNum = parseInt(btn.getAttribute('data-group'), 10);
        const text = generateWeekText(groupNum);
        const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
      });
    });

    applyTabFilter(activeTabFilter);
  }

  // Tab filter function
  const tabBtns = section.querySelectorAll('.ronda-tab-btn');

  function applyTabFilter(filterVal) {
    activeTabFilter = filterVal;
    tabBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-filter') === filterVal);
    });

    const cards = section.querySelectorAll('.ronda-card');
    cards.forEach(card => {
      const cardWeek = card.getAttribute('data-week');
      if (filterVal === 'all') {
        card.style.display = 'flex';
      } else if (filterVal === 'current') {
        card.style.display = (parseInt(cardWeek, 10) === currentWeek) ? 'flex' : 'none';
      } else {
        card.style.display = (cardWeek === filterVal) ? 'flex' : 'none';
      }
    });
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const filterVal = btn.getAttribute('data-filter');
      const searchInput = document.getElementById('ronda-search-input');
      if (searchInput && searchInput.value.trim()) {
        searchInput.value = '';
        const clearBtn = document.getElementById('ronda-search-clear');
        if (clearBtn) clearBtn.style.display = 'none';
        const feedback = document.getElementById('ronda-search-feedback');
        if (feedback) feedback.style.display = 'none';
        section.querySelectorAll('.ronda-card').forEach(c => {
          c.querySelectorAll('.ronda-highlight-match').forEach(el => el.classList.remove('ronda-highlight-match'));
        });
      }
      applyTabFilter(filterVal);
    });
  });

  // Search Petugas Ronda Input
  const searchInput = document.getElementById('ronda-search-input');
  const searchClearBtn = document.getElementById('ronda-search-clear');
  const searchFeedback = document.getElementById('ronda-search-feedback');

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.trim().toLowerCase();
      if (searchClearBtn) {
        searchClearBtn.style.display = query ? 'inline-flex' : 'none';
      }

      const cards = section.querySelectorAll('.ronda-card');
      cards.forEach(c => {
        c.querySelectorAll('.ronda-highlight-match').forEach(el => el.classList.remove('ronda-highlight-match'));
      });

      if (!query) {
        if (searchFeedback) searchFeedback.style.display = 'none';
        applyTabFilter(activeTabFilter);
        return;
      }

      const groups = getRondaGroups();
      let totalMatches = 0;
      let matchingWeeks = [];

      cards.forEach(card => {
        const weekNum = parseInt(card.getAttribute('data-week'), 10);
        const groupData = groups.find(g => g.week === weekNum);
        if (!groupData) return;

        let cardHasMatch = false;

        if (groupData.leader.name.toLowerCase().includes(query)) {
          cardHasMatch = true;
          totalMatches++;
          const leaderEl = card.querySelector('.ronda-leader-name');
          if (leaderEl) leaderEl.classList.add('ronda-highlight-match');
        }

        card.querySelectorAll('.ronda-member-item').forEach(mItem => {
          const mName = (mItem.getAttribute('data-name') || '').toLowerCase();
          if (mName.includes(query)) {
            cardHasMatch = true;
            totalMatches++;
            mItem.classList.add('ronda-highlight-match');
          }
        });

        if (cardHasMatch) {
          card.style.display = 'flex';
          matchingWeeks.push(groupData.weekName);
        } else {
          card.style.display = 'none';
        }
      });

      if (searchFeedback) {
        searchFeedback.style.display = 'flex';
        if (totalMatches > 0) {
          searchFeedback.innerHTML = `<i class="fa-solid fa-circle-check text-emerald"></i> <span>Ditemukan <strong>${totalMatches} petugas</strong> cocok dengan kata kunci "<strong>${escapeHtml(query)}</strong>" (${matchingWeeks.join(', ')}).</span>`;
          searchFeedback.style.borderColor = 'rgba(16, 185, 129, 0.4)';
          searchFeedback.style.background = 'rgba(16, 185, 129, 0.15)';
          searchFeedback.style.color = '#a7f3d0';
        } else {
          searchFeedback.innerHTML = `<i class="fa-solid fa-circle-info text-gold"></i> <span>Tidak ditemukan petugas dengan nama "<strong>${escapeHtml(query)}</strong>". Silakan periksa ejaan atau cek daftar kelompok lain.</span>`;
          searchFeedback.style.borderColor = 'rgba(245, 158, 11, 0.4)';
          searchFeedback.style.background = 'rgba(245, 158, 11, 0.15)';
          searchFeedback.style.color = '#fef08a';
        }
      }
    });
  }

  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        searchInput.focus();
      }
      searchClearBtn.style.display = 'none';
      if (searchFeedback) searchFeedback.style.display = 'none';
      section.querySelectorAll('.ronda-card').forEach(c => {
        c.querySelectorAll('.ronda-highlight-match').forEach(el => el.classList.remove('ronda-highlight-match'));
      });
      applyTabFilter(activeTabFilter);
    });
  }

  // Generate texts for Copy & WA
  function generateWeekText(weekNum) {
    const groups = getRondaGroups();
    const group = groups.find(g => g.week === weekNum);
    if (!group) return '';
    let txt = `🛡️ *JADWAL RONDA & JIMPITAN RT.001 - ${group.weekName.toUpperCase()}*\n`;
    txt += `📅 Pelaksanaan: ${group.cycle} (Pukul 21.00 WIB s/d Selesai)\n`;
    txt += `📍 Titik Kumpul: Pos Kamling Utama RT.001\n\n`;
    txt += `⭐ *Komandan Regu:* ${group.leader.name}\n`;
    txt += `👥 *Anggota Petugas Ronda & Jimpitan:*\n`;
    group.members.forEach((m, idx) => {
      txt += `  ${idx + 1}. ${m.name}\n`;
    });
    txt += `\n📌 *Agenda Utama:*\n`;
    txt += `• 21.00 WIB: Apel Pos Kamling & Koordinasi Regu\n`;
    txt += `• 22.00 WIB: Pengambilan Uang Kas Jimpitan Warga\n`;
    txt += `• 23.00 WIB: Penguncian Akses Portal & Patroli Wilayah\n\n`;
    txt += `_Mari jaga keamanan & ketertiban lingkungan RT.001 bersama. Guyub Rukun!_`;
    return txt;
  }

  function generateAllScheduleText() {
    const groups = getRondaGroups();
    let txt = `🛡️ *JADWAL LENGKAP RONDA & JIMPITAN RT.001 GRAHA ASRI*\n`;
    txt += `Setiap Sabtu Malam (Pukul 21.00 - 04.00 WIB)\n\n`;
    groups.forEach(g => {
      txt += `━━━━━━━━━━━━━━━━━━━━━\n`;
      txt += `📌 *${g.weekName.toUpperCase()}* (${g.cycle})\n`;
      txt += `⭐ Komandan: ${g.leader.name}\n`;
      txt += `👥 Anggota: ${g.members.map(m => m.name).join(', ')}\n\n`;
    });
    txt += `━━━━━━━━━━━━━━━━━━━━━\n`;
    txt += `🪙 *Tradisi Jimpitan:* Mohon sediakan uang koin/sukarela di wadah depan rumah.\n`;
    txt += `🔒 *Jam Portal:* Ditutup pukul 23.00 - 05.00 WIB demi keamanan bersama.\n`;
    txt += `_Pengurus Paguyuban RT.001/RW.013_`;
    return txt;
  }

  document.getElementById('btn-copy-ronda-all')?.addEventListener('click', () => {
    const text = generateAllScheduleText();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast('📋 Seluruh Jadwal Ronda 4 Minggu berhasil disalin!', 'success');
      }).catch(() => {
        showToast('📋 Teks jadwal siap dibagikan.', 'info');
      });
    } else {
      showToast('📋 Teks jadwal siap dibagikan.', 'info');
    }
  });

  document.getElementById('btn-share-ronda-wa')?.addEventListener('click', () => {
    const text = generateAllScheduleText();
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  });

  // ==================== MODAL KELOLA JADWAL RONDA (AUTH PENGURUS) ====================
  let currentEditingWeek = 1;
  let draftRondaGroups = null;

  function populateResidentsDatalist() {
    const datalist = document.getElementById('ronda-residents-datalist');
    if (!datalist) return;
    const residents = state.residents || INITIAL_RESIDENTS;
    datalist.innerHTML = residents.map(r => 
      `<option value="${escapeHtml(r.name)}">Blok ${r.block} / No. ${r.houseNo || r.number}</option>`
    ).join('');
  }

  function syncCurrentFormToDraft() {
    if (!draftRondaGroups) return;
    const group = draftRondaGroups.find(g => g.week === currentEditingWeek);
    if (!group) return;

    const leaderInput = document.getElementById('ronda-edit-leader');
    if (leaderInput) {
      const leaderName = leaderInput.value.trim();
      group.leader.name = leaderName;
      group.leader.initials = getResidentMonogram(leaderName);
    }

    const memberInputs = document.querySelectorAll('.ronda-member-name-input');
    const newMembers = [];
    memberInputs.forEach(input => {
      const mName = input.value.trim();
      if (mName) {
        newMembers.push({
          name: mName,
          initials: getResidentMonogram(mName)
        });
      }
    });
    group.members = newMembers;
  }

  function renderRondaManageForm(weekNum) {
    currentEditingWeek = weekNum;
    if (!draftRondaGroups) {
      draftRondaGroups = JSON.parse(JSON.stringify(getRondaGroups()));
    }

    const modalTabs = document.querySelectorAll('.ronda-manage-tab');
    modalTabs.forEach(tab => {
      tab.classList.toggle('active', parseInt(tab.getAttribute('data-week'), 10) === weekNum);
    });

    const group = draftRondaGroups.find(g => g.week === weekNum) || draftRondaGroups[0];
    const badgeEl = document.getElementById('ronda-edit-week-badge');
    const cycleEl = document.getElementById('ronda-edit-cycle-text');
    const leaderInput = document.getElementById('ronda-edit-leader');
    const membersContainer = document.getElementById('ronda-members-edit-container');

    if (badgeEl) badgeEl.textContent = group.weekName;
    if (cycleEl) cycleEl.textContent = `${group.cycle} • Pukul 21.00 – 04.00 WIB`;
    if (leaderInput) leaderInput.value = group.leader ? group.leader.name : '';

    if (membersContainer) {
      if (!group.members || group.members.length === 0) {
        membersContainer.innerHTML = `<div class="text-muted" style="font-size:0.85rem; padding:0.5rem; text-align:center;">Belum ada anggota. Klik "+ Tambah Anggota" untuk menambahkan.</div>`;
      } else {
        membersContainer.innerHTML = group.members.map((m, idx) => `
          <div class="ronda-member-edit-row" data-idx="${idx}">
            <span class="ronda-member-num">${idx + 1}</span>
            <div class="ronda-member-input-wrap">
              <input type="text" class="form-input ronda-member-name-input" value="${escapeHtml(m.name)}" placeholder="Ketik nama petugas ronda..." list="ronda-residents-datalist" autocomplete="off" required>
            </div>
            <button type="button" class="btn-remove-ronda-member" title="Hapus petugas ini" data-idx="${idx}">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        `).join('');

        // Wire delete buttons
        membersContainer.querySelectorAll('.btn-remove-ronda-member').forEach(btn => {
          btn.addEventListener('click', () => {
            const idx = parseInt(btn.getAttribute('data-idx'), 10);
            syncCurrentFormToDraft();
            group.members.splice(idx, 1);
            renderRondaManageForm(currentEditingWeek);
          });
        });
      }
    }
  }

  function openManageRondaModal(weekNum = 1) {
    // 1. Cek Autentikasi Pengurus (Login via Username & PIN/Password)
    if (!isLoggedIn()) {
      window.pendingPengurusAction = () => {
        openManageRondaModal(weekNum);
      };
      showToast('🔒 Memerlukan otorisasi Pengurus RT untuk mengubah jadwal.', 'info');
      showLoginOverlay();
      return;
    }

    // 2. Siapkan data draft dan datalist
    populateResidentsDatalist();
    draftRondaGroups = JSON.parse(JSON.stringify(getRondaGroups()));
    renderRondaManageForm(weekNum);
    openModal('modal-manage-ronda');
  }

  // Wire Tab Switches inside Modal
  document.getElementById('ronda-manage-week-tabs')?.addEventListener('click', (e) => {
    const tab = e.target.closest('.ronda-manage-tab');
    if (!tab) return;
    const targetWeek = parseInt(tab.getAttribute('data-week'), 10);
    if (!isNaN(targetWeek) && targetWeek !== currentEditingWeek) {
      syncCurrentFormToDraft();
      renderRondaManageForm(targetWeek);
    }
  });

  // Wire Add Member Button inside Modal
  document.getElementById('btn-add-ronda-member')?.addEventListener('click', () => {
    syncCurrentFormToDraft();
    const group = draftRondaGroups.find(g => g.week === currentEditingWeek);
    if (group) {
      group.members.push({ name: '', initials: 'RT' });
      renderRondaManageForm(currentEditingWeek);
      // Focus on newly added input
      const inputs = document.querySelectorAll('.ronda-member-name-input');
      if (inputs.length > 0) {
        inputs[inputs.length - 1].focus();
      }
    }
  });

  // Wire Reset Default Button inside Modal
  document.getElementById('btn-reset-ronda-default')?.addEventListener('click', () => {
    if (confirm('Kembalikan seluruh susunan jadwal ronda ke konfigurasi standar awal (4 kelompok default)?')) {
      draftRondaGroups = JSON.parse(JSON.stringify(DEFAULT_RONDA_GROUPS));
      renderRondaManageForm(currentEditingWeek);
      showToast('Susunan jadwal dikembalikan ke template awal.', 'info');
    }
  });

  // Wire Form Submit inside Modal
  document.getElementById('form-manage-ronda')?.addEventListener('submit', (e) => {
    e.preventDefault();
    syncCurrentFormToDraft();

    // Validation: make sure leader and at least 1 member exists in active week
    const currentGroup = draftRondaGroups.find(g => g.week === currentEditingWeek);
    if (!currentGroup || !currentGroup.leader.name.trim()) {
      showToast('Mohon isi nama Komandan Regu terlebih dahulu.', 'warning');
      return;
    }
    if (!currentGroup.members || currentGroup.members.length === 0) {
      showToast('Mohon tambahkan minimal 1 anggota petugas ronda.', 'warning');
      return;
    }

    // Save into state and localStorage
    state.rondaGroups = JSON.parse(JSON.stringify(draftRondaGroups));
    saveState();

    // Re-render public cards immediately
    renderPublicCards();
    closeModal('modal-manage-ronda');
    showToast('✅ Susunan Jadwal Ronda & Jimpitan berhasil diperbarui!', 'success');
  });

  // Trigger from Public Toolbar ("Kelola Jadwal")
  document.getElementById('btn-open-manage-ronda')?.addEventListener('click', () => {
    openManageRondaModal(1);
  });

  // Trigger from Jimpitan Admin View ("Atur Petugas Ronda")
  document.getElementById('btn-admin-manage-ronda')?.addEventListener('click', () => {
    openManageRondaModal(1);
  });

  // Initial Public Render
  renderPublicCards();
}


// ==================== LOGOUT ====================

function doLogout() {
  if (confirm('Yakin ingin keluar dari sistem? Anda perlu memasukkan PIN kembali untuk mengakses RT-FinSmart PRO.')) {
    clearSession();
    state.currentUser = null;
    showPublicPortal();
    // Reset login form state
    const pinInput     = document.getElementById('login-pin-input');
    const eyeIcon      = document.getElementById('login-eye-icon');
    const checkShowPin = document.getElementById('login-toggle-show-pin');
    const errorMsg     = document.getElementById('login-error-msg');
    const mainView     = document.getElementById('login-main-view');
    const forgotView   = document.getElementById('login-forgot-view');
    const roleLabel    = document.getElementById('login-selected-role-label');

    if (pinInput) {
      pinInput.value = '';
      pinInput.type = 'password';
    }
    if (eyeIcon) eyeIcon.className = 'fa-regular fa-eye';
    if (checkShowPin) checkShowPin.checked = false;
    if (errorMsg) errorMsg.style.display = 'none';
    if (mainView) mainView.style.display = 'block';
    if (forgotView) forgotView.style.display = 'none';
    if (roleLabel) { roleLabel.textContent = 'Admin 1'; roleLabel.style.color = 'var(--gold-400)'; }
    showToast('Anda telah keluar dari sistem. Menampilkan portal publik warga.', 'info');
  }
}

function setupLogout() {
  document.getElementById('btn-logout')?.addEventListener('click', doLogout);
  document.getElementById('btn-top-logout')?.addEventListener('click', doLogout);
}

/**
 * 1-Click Smooth Scroll to Top Luxury Feature
 */
function setupScrollToTop() {
  const btnScrollTop = document.getElementById('btn-scroll-top');
  if (!btnScrollTop) return;

  const handleScroll = () => {
    // Show button when scrolled down > 260px
    if (window.scrollY > 260 || document.documentElement.scrollTop > 260 || document.body.scrollTop > 260) {
      btnScrollTop.classList.add('visible');
    } else {
      btnScrollTop.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  btnScrollTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ==================== SPLASH SCREEN CONTROLLER ====================

function setupSplashScreen() {
  const splash = document.getElementById('app-splash-screen');
  if (!splash) return;

  // Tampilkan animasi splash selama ~1.85s, lalu transisi keluar secara elegan
  setTimeout(() => {
    splash.classList.add('splash-hidden');
    setTimeout(() => {
      splash.style.display = 'none';
    }, 650);
  }, 1850);
}

// ==================== INIT ====================

document.addEventListener('DOMContentLoaded', () => {
  setupSplashScreen();
  loadState();
  setupNavigation();
  setupScrollToTop();
  setupModalEventListeners();
  setupDelegatedEvents();
  setupBackupAndRestore();
  setupAccountSwitcher();
  setupAccountManagementEvents();
  setupJimpitanEvents();
  setupLoginPortal();
  setupPublicPortalNavigation();
  setupUpcomingEventBanner();
  setupRondaSchedule();
  setupLogout();
  registerServiceWorker();
  initDemografi();
  setupFundRequestModule();
  setupResidentAccountsEvents();
  setupAsetRtModule();
  setupAppHistoryNavigation();

  // Check session → if logged in, go to admin dashboard/portal; else show public landing page
  if (isLoggedIn()) {
    const sessionRole = sessionStorage.getItem(LOGIN_SESSION_KEY);
    if (sessionRole) {
      state.currentUser = sessionRole;
    }
    showAdminApp();
    if (state.currentUser === 'warga') {
      navigateToView('portal-warga');
    } else if (state.currentUser === 'b2') {
      navigateToView('jimpitan');
    } else if (state.currentUser === 'pengurus') {
      navigateToView('pengurus-struktur');
    } else {
      navigateToView('dashboard');
    }
  } else {
    state.currentUser = null;
    state.currentVerifiedResident = null;
    showPublicPortal();
    // Render the app in background so it's ready when user logs in
    try { renderAll(); } catch (e) { console.error('Error pre-rendering admin data', e); }
  }
});


// ==================== ADMIN 1 / ADMIN 2 RBAC ACCESS CONTROL ====================

// Pages only Admin 1 can access
const B1_ONLY_TARGETS = ['dashboard', 'checklist', 'pos-anggaran', 'pengeluaran', 'pengajuan-dana-admin', 'warga', 'laporan', 'pengaturan'];

function applyRBAC() {
  const currentAcc = (state.adminAccounts || DEFAULT_ACCOUNTS).find(a => a.id === state.currentUser) || { accessLevel: state.currentUser === 'b2' ? 'B2' : 'B1' };
  const isB1 = !currentAcc || currentAcc.accessLevel === 'B1';
  const isB2 = currentAcc && currentAcc.accessLevel === 'B2';
  const isPengurus = currentAcc && currentAcc.accessLevel === 'PENGURUS';
  const isWarga = currentAcc && currentAcc.accessLevel === 'WARGA';

  // Sidebar and bottom nav menu items
  document.querySelectorAll('[data-role-req]').forEach(el => {
    const req = el.getAttribute('data-role-req');
    const target = el.getAttribute('data-target');

    // Menu Khusus: Checklist Iuran Wajib dikeluarkan/disembunyikan dari peran Pengurus RT & Warga
    if (target === 'checklist') {
      if (isPengurus || isWarga || !isB1) {
        el.style.display = 'none';
        return;
      } else {
        el.style.display = '';
        el.classList.remove('menu-item-locked');
        return;
      }
    }

    if (req === 'ALL') {
      el.classList.remove('menu-item-locked');
      el.style.display = '';
    } else if (req === 'WARGA') {
      if (isWarga) {
        el.classList.remove('menu-item-locked');
        el.style.display = '';
      } else {
        el.style.display = 'none';
      }
    } else if (req === 'B1' && !isB1) {
      el.classList.add('menu-item-locked');
      if (isWarga || isPengurus) el.style.display = 'none';
    } else if (req === 'B2' && isWarga) {
      el.classList.add('menu-item-locked');
      el.style.display = 'none';
    } else {
      el.classList.remove('menu-item-locked');
      el.style.display = '';
    }
  });

  // If Warga user is on an Admin-only section, redirect them to portal-warga
  if (isWarga) {
    const activeSection = document.querySelector('.view-section.active');
    if (activeSection && activeSection.id !== 'view-portal-warga' && activeSection.id !== 'view-pengurus-struktur' && activeSection.id !== 'view-jimpitan') {
      navigateToView('portal-warga');
    }
  }

  // If Admin 2 / Jimpitan user is on an Admin 1-only section, redirect them to jimpitan
  if (isB2) {
    const activeSection = document.querySelector('.view-section.active');
    if (activeSection && activeSection.id !== 'view-jimpitan' && activeSection.id !== 'view-pengurus-struktur') {
      navigateToView('jimpitan');
    }
  }

  // If Pengurus user is on an Admin 1-only section, redirect them to pengurus-struktur
  if (isPengurus) {
    const activeSection = document.querySelector('.view-section.active');
    if (activeSection && B1_ONLY_TARGETS.includes(activeSection.id.replace('view-', ''))) {
      navigateToView('pengurus-struktur');
    }
  }

  // Quick-pay button: hide for non-Admin 1
  const qpBtn = document.getElementById('btn-quick-pay');
  if (qpBtn) qpBtn.style.display = isB1 ? '' : 'none';

  // Demografi edit buttons: hide for non-Admin 1 (only Admin 1 can edit)
  const demoTopBtn = document.getElementById('btn-top-open-demografi');
  if (demoTopBtn) demoTopBtn.style.display = isB1 ? '' : 'none';
  const demoWargaBtn = document.getElementById('btn-open-demografi-modal-admin');
  if (demoWargaBtn) demoWargaBtn.style.display = isB1 ? '' : 'none';
}

function updateUserProfileUI() {
  const currentAcc = (state.adminAccounts || DEFAULT_ACCOUNTS).find(a => a.id === state.currentUser) || {
    id: state.currentUser,
    name: 'Pengurus',
    roleTitle: 'Akses Pengurus',
    badge: 'PENGURUS',
    accessLevel: 'B1',
    icon: 'fa-solid fa-user-shield'
  };

  const isB1 = currentAcc.accessLevel === 'B1';
  const isB2 = currentAcc.accessLevel === 'B2';
  const isPengurus = currentAcc.accessLevel === 'PENGURUS';
  const isWarga = currentAcc.accessLevel === 'WARGA';

  const nameEl = document.getElementById('sidebar-user-name');
  const roleEl = document.getElementById('sidebar-user-role');
  const badgeEl = document.getElementById('sidebar-role-badge');
  const avatarEl = document.getElementById('sidebar-user-avatar');

  if (isWarga && state.currentVerifiedResident) {
    if (nameEl) nameEl.textContent = state.currentVerifiedResident.name;
    if (roleEl) roleEl.textContent = `${state.currentVerifiedResident.block} ${state.currentVerifiedResident.houseNo}`;
    if (badgeEl) {
      badgeEl.textContent = 'WARGA RT.001';
      badgeEl.className = 'role-badge role-badge-warga';
    }
  } else {
    if (nameEl) nameEl.textContent = currentAcc.name;
    if (roleEl) roleEl.textContent = currentAcc.roleTitle || currentAcc.desc || currentAcc.name;
    if (badgeEl) {
      badgeEl.textContent = currentAcc.badge || 'USER';
      if (isB1) badgeEl.className = 'role-badge role-badge-b1';
      else if (isB2) badgeEl.className = 'role-badge role-badge-b2';
      else if (isPengurus) badgeEl.className = 'role-badge role-badge-pengurus';
      else if (isWarga) badgeEl.className = 'role-badge role-badge-warga';
      else badgeEl.className = 'role-badge';
    }
  }

  if (avatarEl) {
    let iconColor = 'var(--gold-400)';
    if (isB2) iconColor = 'var(--emerald-400)';
    else if (isPengurus) iconColor = '#c084fc';
    else if (isWarga) iconColor = '#38bdf8';

    avatarEl.innerHTML = `<i class="${currentAcc.icon || 'fa-solid fa-user-shield'}" style="color:${iconColor};"></i>`;
  }
}

function setupAccountSwitcher() {
  let selectedTargetAccount = null;

  window.renderDynamicSwitchCards = function() {
    const container = document.querySelector('#modal-switch-account .account-select-card')?.parentElement;
    if (!container) return;
    const accounts = state.adminAccounts || DEFAULT_ACCOUNTS;
    container.innerHTML = accounts.map(acc => {
      let iconBg = 'rgba(245,158,11,0.2)';
      let iconColor = 'var(--gold-400)';
      let badgeClass = 'role-badge-b1';

      if (acc.accessLevel === 'B2') {
        iconBg = 'rgba(16,185,129,0.2)';
        iconColor = 'var(--emerald-400)';
        badgeClass = 'role-badge-b2';
      } else if (acc.accessLevel === 'PENGURUS') {
        iconBg = 'rgba(168,85,247,0.2)';
        iconColor = '#c084fc';
        badgeClass = 'role-badge-pengurus';
      } else if (acc.accessLevel === 'WARGA') {
        iconBg = 'rgba(6,182,212,0.2)';
        iconColor = '#38bdf8';
        badgeClass = 'role-badge-warga';
      }

      return `
        <div class="account-select-card ${selectedTargetAccount === acc.id ? 'selected' : ''}" data-account="${acc.id}">
          <div class="acc-icon-circle" style="background:${iconBg};">
            <i class="${acc.icon || 'fa-solid fa-user-shield'}" style="color:${iconColor};"></i>
          </div>
          <h4>${acc.name}</h4>
          <p>${acc.desc || acc.roleTitle || ''}</p>
          <span class="role-badge ${badgeClass}">${acc.badge || 'PENGURUS'}</span>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.account-select-card').forEach(card => {
      card.addEventListener('click', () => {
        container.querySelectorAll('.account-select-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        selectedTargetAccount = card.dataset.account;
        const targetAcc = accounts.find(a => a.id === selectedTargetAccount);
        document.getElementById('switch-target-label').textContent = targetAcc ? `(${targetAcc.name})` : '';
        document.getElementById('switch-pin-input').value = '';
        document.getElementById('switch-pin-error').style.display = 'none';
        document.getElementById('switch-pin-input').focus();
      });
    });
  };

  // Open modal
  document.getElementById('btn-open-switch-account')?.addEventListener('click', () => {
    selectedTargetAccount = null;
    document.getElementById('switch-pin-input').value = '';
    document.getElementById('switch-pin-error').style.display = 'none';
    document.getElementById('switch-target-label').textContent = '(Pilih akun pengurus)';
    if (typeof window.renderDynamicSwitchCards === 'function') {
      window.renderDynamicSwitchCards();
    }
    openModal('modal-switch-account');
  });

  // Confirm switch
  document.getElementById('btn-confirm-switch-account')?.addEventListener('click', () => {
    if (!selectedTargetAccount) {
      showToast('Silakan pilih akun pengurus terlebih dahulu.', 'warning');
      return;
    }
    const enteredPin = document.getElementById('switch-pin-input').value.trim();
    if (!state.accountPins) state.accountPins = { b1: '1111', b2: '2222' };
    const correctPin = state.accountPins[selectedTargetAccount];
    if (enteredPin === correctPin) {
      state.currentUser = selectedTargetAccount;
      setSession(selectedTargetAccount);
      saveState();
      closeModal('modal-switch-account');
      renderAll();
      const accounts = state.adminAccounts || DEFAULT_ACCOUNTS;
      const acc = accounts.find(a => a.id === selectedTargetAccount);
      const isJimpitanOnly = acc && acc.accessLevel === 'B2';
      const isPengurusRole = acc && acc.accessLevel === 'PENGURUS';
      if (isPengurusRole) {
        navigateToView('pengurus-struktur');
      } else if (isJimpitanOnly) {
        navigateToView('jimpitan');
      } else {
        navigateToView('dashboard');
      }
      showToast(`✅ Berhasil masuk sebagai ${acc ? acc.name : selectedTargetAccount}`, 'success');
    } else {
      document.getElementById('switch-pin-error').style.display = 'block';
      document.getElementById('switch-pin-input').value = '';
      document.getElementById('switch-pin-input').focus();
    }
  });

  // Enter key on PIN input
  document.getElementById('switch-pin-input')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('btn-confirm-switch-account').click();
  });

  // Intercept navigation to Admin 1-only pages when user has non-B1 access
  document.addEventListener('click', e => {
    const navItem = e.target.closest('[data-target]');
    if (!navItem) return;
    const currentAcc = (state.adminAccounts || DEFAULT_ACCOUNTS).find(a => a.id === state.currentUser);
    const isB1 = !currentAcc || currentAcc.accessLevel === 'B1';
    if (isB1) return;
    const target = navItem.dataset.target;
    if (B1_ONLY_TARGETS.includes(target)) {
      e.preventDefault();
      e.stopPropagation();
      showToast('🔒 Menu ini dikhususkan untuk Administrator Utama (Admin 1 / Bendahara 1).', 'warning');
    }
  }, true);
}


// ==================== MODUL JIMPITAN RONDA ====================

const JIMPITAN_INCOME_KEY = 'jimp-income';
const JIMPITAN_EXPENSE_KEY = 'jimp-expense';

function renderJimpitan() {
  const incomes = state.jimpitanIncomes || [];
  const expenses = state.jimpitanExpenses || [];

  const totalIncome = incomes.reduce((s, r) => s + Number(r.amount), 0);
  const totalExpense = expenses.reduce((s, r) => s + Number(r.amount), 0);
  const saldo = totalIncome - totalExpense;

  // KPI Cards
  const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  setEl('jimp-total-income', formatCurrency(totalIncome));
  setEl('jimp-income-count', `${incomes.length} pertemuan tercatat`);
  setEl('jimp-total-expense', formatCurrency(totalExpense));
  setEl('jimp-expense-count', `${expenses.length} pos pengeluaran`);
  setEl('jimp-saldo', formatCurrency(saldo));

  const saldoEl = document.getElementById('jimp-saldo');
  if (saldoEl) saldoEl.style.color = saldo >= 0 ? 'var(--gold-400)' : 'var(--rose-400)';

  // Last income
  if (incomes.length > 0) {
    const sorted = [...incomes].sort((a, b) => new Date(b.date) - new Date(a.date));
    const last = sorted[0];
    setEl('jimp-last-date', formatDateLong(last.date));
    setEl('jimp-last-amount', `${formatCurrency(last.amount)} • ${last.regu || ''} - ${last.koordinator || ''}`);
  } else {
    setEl('jimp-last-date', 'Belum ada data');
    setEl('jimp-last-amount', '-');
  }

  // Income table
  const tbodyIncome = document.getElementById('tbody-jimpitan-income');
  if (tbodyIncome) {
    if (incomes.length === 0) {
      tbodyIncome.innerHTML = '<tr><td colspan="6" style="text-align:center; color:var(--text-muted); padding:2.5rem;"><i class="fa-solid fa-moon" style="opacity:.3; font-size:2rem;"></i><br>Belum ada catatan perolehan jimpitan.</td></tr>';
    } else {
      const sorted = [...incomes].sort((a, b) => new Date(b.date) - new Date(a.date));
      tbodyIncome.innerHTML = sorted.map(r => `
        <tr>
          <td>${formatDateLong(r.date)}</td>
          <td><span class="jimpitan-regu-pill"><i class="fa-solid fa-people-group"></i> ${r.regu || '-'}</span></td>
          <td>${r.koordinator || '-'}</td>
          <td class="text-emerald font-semibold">${formatCurrency(r.amount)}</td>
          <td style="font-size:.78rem; color:var(--text-muted); max-width:120px;">${r.notes || '-'}</td>
          <td><button class="btn btn-sm btn-outline-rose" data-jimp-delete-income="${r.id}" title="Hapus"><i class="fa-solid fa-trash"></i></button></td>
        </tr>`).join('');
    }
  }

  // Expense table
  const tbodyExpense = document.getElementById('tbody-jimpitan-expense');
  if (tbodyExpense) {
    if (expenses.length === 0) {
      tbodyExpense.innerHTML = '<tr><td colspan="4" style="text-align:center; color:var(--text-muted); padding:2.5rem;"><i class="fa-solid fa-cart-shopping" style="opacity:.3; font-size:2rem;"></i><br>Belum ada catatan pengeluaran.</td></tr>';
    } else {
      const sorted = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));
      tbodyExpense.innerHTML = sorted.map(r => `
        <tr>
          <td>${formatDateLong(r.date)}</td>
          <td>
            <div style="font-size:.88rem;">${r.desc}</div>
            <small style="color:var(--text-muted);">${r.category}</small>
          </td>
          <td class="text-rose font-semibold">${formatCurrency(r.amount)}</td>
          <td><button class="btn btn-sm btn-outline-rose" data-jimp-delete-expense="${r.id}" title="Hapus"><i class="fa-solid fa-trash"></i></button></td>
        </tr>`).join('');
    }
  }
}

function setupJimpitanEvents() {
  // Set default date to next/last Sunday
  const nextSunday = () => {
    const today = new Date();
    const day = today.getDay(); // 0=Sun, 6=Sat
    const diff = day === 0 ? 0 : 7 - day;
    const d = new Date(today);
    d.setDate(today.getDate() + diff);
    return d.toISOString().split('T')[0];
  };

  // Open income modal
  document.getElementById('btn-add-jimpitan-income')?.addEventListener('click', () => {
    document.getElementById('jimp-income-date').value = nextSunday();
    document.getElementById('jimp-income-amount').value = '';
    document.getElementById('jimp-income-koordinator').value = '';
    document.getElementById('jimp-income-notes').value = '';
    openModal('modal-add-jimpitan-income');
  });

  // Open expense modal
  document.getElementById('btn-add-jimpitan-expense')?.addEventListener('click', () => {
    document.getElementById('jimp-expense-date').value = new Date().toISOString().split('T')[0];
    document.getElementById('jimp-expense-amount').value = '';
    document.getElementById('jimp-expense-desc').value = '';
    openModal('modal-add-jimpitan-expense');
  });

  // Submit income form
  document.getElementById('form-jimpitan-income')?.addEventListener('submit', e => {
    e.preventDefault();
    const date = document.getElementById('jimp-income-date').value;
    const regu = document.getElementById('jimp-income-regu').value;
    const koordinator = document.getElementById('jimp-income-koordinator').value.trim();
    const amount = parseInt(document.getElementById('jimp-income-amount').value);
    const notes = document.getElementById('jimp-income-notes').value.trim();

    if (!date || !amount || amount <= 0) {
      showToast('Lengkapi tanggal dan nominal perolehan jimpitan.', 'error');
      return;
    }

    const newRecord = {
      id: `jimp-in-${Date.now()}`,
      date, regu, koordinator, amount, notes,
      createdAt: new Date().toISOString()
    };
    if (!state.jimpitanIncomes) state.jimpitanIncomes = [];
    state.jimpitanIncomes.push(newRecord);
    saveState();
    closeModal('modal-add-jimpitan-income');
    renderJimpitan();
    showToast(`✅ Perolehan jimpitan ${formatCurrency(amount)} (${regu}) berhasil dicatat!`, 'success');
  });

  // Submit expense form
  document.getElementById('form-jimpitan-expense')?.addEventListener('submit', e => {
    e.preventDefault();
    const date = document.getElementById('jimp-expense-date').value;
    const category = document.getElementById('jimp-expense-category').value;
    const desc = document.getElementById('jimp-expense-desc').value.trim();
    const amount = parseInt(document.getElementById('jimp-expense-amount').value);

    if (!date || !desc || !amount || amount <= 0) {
      showToast('Lengkapi semua kolom pengeluaran.', 'error');
      return;
    }

    const newRecord = {
      id: `jimp-ex-${Date.now()}`,
      date, category, desc, amount,
      createdAt: new Date().toISOString()
    };
    if (!state.jimpitanExpenses) state.jimpitanExpenses = [];
    state.jimpitanExpenses.push(newRecord);
    saveState();
    closeModal('modal-add-jimpitan-expense');
    renderJimpitan();
    showToast(`✅ Pengeluaran ronda ${formatCurrency(amount)} berhasil dicatat!`, 'success');
  });

  // Delete income / expense via event delegation
  document.addEventListener('click', e => {
    // Delete jimpitan income
    const incomeDelBtn = e.target.closest('[data-jimp-delete-income]');
    if (incomeDelBtn) {
      const id = incomeDelBtn.getAttribute('data-jimp-delete-income');
      state.jimpitanIncomes = (state.jimpitanIncomes || []).filter(r => r.id !== id);
      saveState();
      renderJimpitan();
      showToast('Catatan perolehan jimpitan dihapus.', 'info');
      return;
    }
    // Delete jimpitan expense
    const expDelBtn = e.target.closest('[data-jimp-delete-expense]');
    if (expDelBtn) {
      const id = expDelBtn.getAttribute('data-jimp-delete-expense');
      state.jimpitanExpenses = (state.jimpitanExpenses || []).filter(r => r.id !== id);
      saveState();
      renderJimpitan();
      showToast('Catatan pengeluaran ronda dihapus.', 'info');
    }
  });

  // Export CSV
  document.getElementById('btn-export-jimpitan-csv')?.addEventListener('click', () => {
    const incomes = state.jimpitanIncomes || [];
    const expenses = state.jimpitanExpenses || [];
    let csv = 'Jenis,Tanggal,Regu/Kategori,Keterangan,Nominal\n';
    incomes.forEach(r => csv += `"Perolehan Jimpitan","${r.date}","${r.regu}","${r.koordinator} - ${r.notes}",${r.amount}\n`);
    expenses.forEach(r => csv += `"Pengeluaran Ronda","${r.date}","${r.category}","${r.desc}",${r.amount}\n`);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Laporan_Jimpitan_RT001_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    showToast('Laporan jimpitan berhasil diekspor ke CSV!', 'success');
  });
}

// ==================== MODUL STATISTIK DEMOGRAFI WARGA RT.001 RW.013 ====================
const DEMOGRAFI_STORAGE_KEY = 'rt_demografi_data_v1';

const DEFAULT_DEMOGRAFI_DATA = {
  lastUpdated: '16 September 2026',
  totalKK: 71,
  totalJiwa: 284,
  gender: {
    lakiLaki: 138,
    perempuan: 146
  },
  remaja: {
    total: 50,
    lakiLaki: 24,
    perempuan: 26
  },
  usia: {
    balita0_5: 28,      // Usia 0 - 5 tahun
    anak6_13: 42,       // Usia 6 - 13 tahun
    remaja14_20: 50,    // Usia 14 - 20 tahun
    dewasa21_50: 124,   // Usia 21 - 50 tahun
    lansiaDiatas50: 40  // Usia diatas 50 tahun
  }
};

let demografiData = null;
let chartDemografiGenderInstance = null;
let chartDemografiUsiaInstance = null;

function loadDemografiData() {
  try {
    const raw = localStorage.getItem(DEMOGRAFI_STORAGE_KEY);
    if (raw) {
      demografiData = JSON.parse(raw);
      if (!demografiData.gender || !demografiData.usia || !demografiData.remaja) {
        demografiData = JSON.parse(JSON.stringify(DEFAULT_DEMOGRAFI_DATA));
      }
    } else {
      demografiData = JSON.parse(JSON.stringify(DEFAULT_DEMOGRAFI_DATA));
    }
  } catch (err) {
    console.error('Error loading demografi data:', err);
    demografiData = JSON.parse(JSON.stringify(DEFAULT_DEMOGRAFI_DATA));
  }
  return demografiData;
}

function saveDemografiData(data) {
  demografiData = data;
  try {
    localStorage.setItem(DEMOGRAFI_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving demografi data to localStorage:', e);
  }
  renderDemografiUI();
}

function renderDemografiUI() {
  if (!demografiData) loadDemografiData();
  const d = demografiData;

  // 1. KPI Badges & Values
  const elTotalJiwa = document.getElementById('val-total-jiwa');
  if (elTotalJiwa) elTotalJiwa.innerHTML = `${d.totalJiwa} <span class="unit">Jiwa</span>`;

  const elTotalKK = document.getElementById('val-total-kk');
  if (elTotalKK) elTotalKK.textContent = `Dari ${d.totalKK || 71} Kepala Keluarga (KK)`;

  const elPria = document.getElementById('val-pria');
  if (elPria) elPria.innerHTML = `${d.gender.lakiLaki} <span class="unit">Jiwa</span>`;

  const elPctPria = document.getElementById('pct-pria');
  if (elPctPria) {
    const pct = d.totalJiwa > 0 ? ((d.gender.lakiLaki / d.totalJiwa) * 100).toFixed(1) : 0;
    elPctPria.textContent = `${pct}% dari total warga`;
  }

  const elWanita = document.getElementById('val-wanita');
  if (elWanita) elWanita.innerHTML = `${d.gender.perempuan} <span class="unit">Jiwa</span>`;

  const elPctWanita = document.getElementById('pct-wanita');
  if (elPctWanita) {
    const pct = d.totalJiwa > 0 ? ((d.gender.perempuan / d.totalJiwa) * 100).toFixed(1) : 0;
    elPctWanita.textContent = `${pct}% dari total warga`;
  }

  const elRemajaTotal = document.getElementById('val-remaja-total');
  const remTotal = d.remaja.total || (d.remaja.lakiLaki + d.remaja.perempuan);
  if (elRemajaTotal) elRemajaTotal.innerHTML = `${remTotal} <span class="unit">Jiwa</span>`;

  const elSubRemaja = document.getElementById('sub-remaja');
  if (elSubRemaja) elSubRemaja.textContent = `${d.remaja.lakiLaki} Putra • ${d.remaja.perempuan} Putri`;

  // 2. Age Quick Pills
  const elPillBalita = document.getElementById('pill-balita');
  if (elPillBalita) elPillBalita.textContent = d.usia.balita0_5;

  const elPillAnak = document.getElementById('pill-anak');
  if (elPillAnak) elPillAnak.textContent = d.usia.anak6_13;

  const elPillRemaja = document.getElementById('pill-remaja');
  if (elPillRemaja) elPillRemaja.textContent = d.usia.remaja14_20;

  const elPillDewasa = document.getElementById('pill-dewasa');
  if (elPillDewasa) elPillDewasa.textContent = d.usia.dewasa21_50;

  const elPillLansia = document.getElementById('pill-lansia');
  if (elPillLansia) elPillLansia.textContent = d.usia.lansiaDiatas50;

  // 3. Date updated badge
  const elBadgeDate = document.getElementById('demografi-updated-badge');
  if (elBadgeDate) {
    elBadgeDate.innerHTML = `<i class="fa-solid fa-clock-rotate-left text-emerald"></i> Terakhir diperbarui: ${d.lastUpdated || '16 September 2026'}`;
  }

  // 4. Render or Update Charts
  renderDemografiCharts();
}

function renderDemografiCharts() {
  if (typeof Chart === 'undefined') return;
  const d = demografiData;
  if (!d) return;

  // ---- Chart 1: Gender & Remaja Breakdown (Doughnut Chart) ----
  const ctxGender = document.getElementById('chartDemografiGender');
  if (ctxGender) {
    const remLaki = d.remaja.lakiLaki;
    const remPerempuan = d.remaja.perempuan;

    const labels = [
      'Laki-laki (Total)',
      'Perempuan (Total)',
      'Remaja Putra',
      'Remaja Putri'
    ];
    const dataValues = [
      d.gender.lakiLaki,
      d.gender.perempuan,
      remLaki,
      remPerempuan
    ];
    const bgColors = [
      '#06b6d4', // Cyan
      '#f472b6', // Pink
      '#a855f7', // Purple
      '#ec4899'  // Magenta
    ];

    if (chartDemografiGenderInstance) {
      chartDemografiGenderInstance.data.datasets[0].data = dataValues;
      chartDemografiGenderInstance.update();
    } else {
      chartDemografiGenderInstance = new Chart(ctxGender, {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [{
            data: dataValues,
            backgroundColor: bgColors,
            borderColor: '#061812',
            borderWidth: 3,
            hoverOffset: 8
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              backgroundColor: 'rgba(3, 24, 16, 0.95)',
              borderColor: 'rgba(16, 185, 129, 0.4)',
              borderWidth: 1,
              titleFont: { family: 'Plus Jakarta Sans', weight: 'bold' },
              bodyFont: { family: 'Plus Jakarta Sans' },
              padding: 10,
              callbacks: {
                label: function(context) {
                  const val = context.raw || 0;
                  const total = d.totalJiwa || 1;
                  const pct = ((val / total) * 100).toFixed(1);
                  return ` ${context.label}: ${val} Jiwa (${pct}%)`;
                }
              }
            }
          },
          cutout: '62%'
        }
      });
    }
  }

  // ---- Chart 2: Distribusi Kelompok Usia (Bar Chart) ----
  const ctxUsia = document.getElementById('chartDemografiUsia');
  if (ctxUsia) {
    const usiaLabels = [
      '0–5 Thn (Balita)',
      '6–13 Thn (Anak)',
      '14–20 Thn (Remaja)',
      '21–50 Thn (Dewasa)',
      '> 50 Thn (Lansia)'
    ];
    const usiaValues = [
      d.usia.balita0_5,
      d.usia.anak6_13,
      d.usia.remaja14_20,
      d.usia.dewasa21_50,
      d.usia.lansiaDiatas50
    ];
    const usiaColors = [
      '#10b981', // Balita - Emerald
      '#06b6d4', // Anak - Cyan
      '#a855f7', // Remaja - Purple
      '#3b82f6', // Dewasa - Blue
      '#f59e0b'  // Lansia - Gold/Amber
    ];

    if (chartDemografiUsiaInstance) {
      chartDemografiUsiaInstance.data.datasets[0].data = usiaValues;
      chartDemografiUsiaInstance.update();
    } else {
      chartDemografiUsiaInstance = new Chart(ctxUsia, {
        type: 'bar',
        data: {
          labels: usiaLabels,
          datasets: [{
            label: 'Jumlah Jiwa',
            data: usiaValues,
            backgroundColor: usiaColors,
            borderRadius: 8,
            borderSkipped: false,
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: 'rgba(3, 24, 16, 0.95)',
              borderColor: 'rgba(245, 158, 11, 0.4)',
              borderWidth: 1,
              padding: 10,
              callbacks: {
                label: function(context) {
                  const val = context.raw || 0;
                  const total = d.totalJiwa || 1;
                  const pct = ((val / total) * 100).toFixed(1);
                  return ` Jumlah: ${val} Jiwa (${pct}%)`;
                }
              }
            }
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: '#94a3b8', font: { family: 'Plus Jakarta Sans', size: 11 } }
            },
            y: {
              grid: { color: 'rgba(255, 255, 255, 0.05)' },
              ticks: {
                color: '#94a3b8',
                font: { family: 'Plus Jakarta Sans', size: 11 },
                stepSize: 10
              },
              beginAtZero: true
            }
          }
        }
      });
    }
  }
}

function openDemografiModal() {
  const modal = document.getElementById('modal-demografi-editor');
  if (!modal) return;

  const d = demografiData || loadDemografiData();

  // Fill form inputs
  const elKK = document.getElementById('edit-total-kk');
  if (elKK) elKK.value = d.totalKK || 71;

  const elDate = document.getElementById('edit-last-updated');
  if (elDate) elDate.value = d.lastUpdated || '16 September 2026';

  const elLaki = document.getElementById('edit-gender-laki');
  if (elLaki) elLaki.value = d.gender.lakiLaki;

  const elPerempuan = document.getElementById('edit-gender-perempuan');
  if (elPerempuan) elPerempuan.value = d.gender.perempuan;

  const elRemLaki = document.getElementById('edit-remaja-laki');
  if (elRemLaki) elRemLaki.value = d.remaja.lakiLaki;

  const elRemPerempuan = document.getElementById('edit-remaja-perempuan');
  if (elRemPerempuan) elRemPerempuan.value = d.remaja.perempuan;

  const elU0 = document.getElementById('edit-usia-0-5');
  if (elU0) elU0.value = d.usia.balita0_5;

  const elU6 = document.getElementById('edit-usia-6-13');
  if (elU6) elU6.value = d.usia.anak6_13;

  const elU14 = document.getElementById('edit-usia-14-20');
  if (elU14) elU14.value = d.usia.remaja14_20;

  const elU21 = document.getElementById('edit-usia-21-50');
  if (elU21) elU21.value = d.usia.dewasa21_50;

  const elU50 = document.getElementById('edit-usia-diatas-50');
  if (elU50) elU50.value = d.usia.lansiaDiatas50;

  // Fill JSON textarea
  const elJson = document.getElementById('json-demografi-input');
  if (elJson) elJson.value = JSON.stringify(d, null, 2);

  // Recalculate live summary
  recalcDemografiLiveSummary();

  // Show form tab by default
  switchDemografiTab('form');

  modal.classList.add('active');
}

function recalcDemografiLiveSummary() {
  const pria = parseInt(document.getElementById('edit-gender-laki')?.value) || 0;
  const wanita = parseInt(document.getElementById('edit-gender-perempuan')?.value) || 0;
  const liveGender = document.getElementById('live-total-gender');
  if (liveGender) liveGender.textContent = `${pria + wanita} Jiwa`;

  const remL = parseInt(document.getElementById('edit-remaja-laki')?.value) || 0;
  const remP = parseInt(document.getElementById('edit-remaja-perempuan')?.value) || 0;
  const liveRemaja = document.getElementById('live-total-remaja');
  if (liveRemaja) liveRemaja.textContent = `${remL + remP} Jiwa`;

  const u0 = parseInt(document.getElementById('edit-usia-0-5')?.value) || 0;
  const u6 = parseInt(document.getElementById('edit-usia-6-13')?.value) || 0;
  const u14 = parseInt(document.getElementById('edit-usia-14-20')?.value) || 0;
  const u21 = parseInt(document.getElementById('edit-usia-21-50')?.value) || 0;
  const u50 = parseInt(document.getElementById('edit-usia-diatas-50')?.value) || 0;
  const liveUsia = document.getElementById('live-total-usia');
  if (liveUsia) liveUsia.textContent = `${u0 + u6 + u14 + u21 + u50} Jiwa`;
}

function switchDemografiTab(tab) {
  const tabBtnForm = document.getElementById('tab-btn-form');
  const tabBtnJson = document.getElementById('tab-btn-json');
  const paneForm = document.getElementById('form-demografi-manual');
  const paneJson = document.getElementById('pane-demografi-json');

  if (tab === 'json') {
    tabBtnForm?.classList.remove('active');
    tabBtnJson?.classList.add('active');
    if (paneForm) paneForm.style.display = 'none';
    if (paneJson) paneJson.style.display = 'block';

    const currentFromForm = getDemografiFromInputs();
    const elJson = document.getElementById('json-demografi-input');
    if (elJson) elJson.value = JSON.stringify(currentFromForm, null, 2);
  } else {
    tabBtnJson?.classList.remove('active');
    tabBtnForm?.classList.add('active');
    if (paneJson) paneJson.style.display = 'none';
    if (paneForm) paneForm.style.display = 'block';
  }
}

function getDemografiFromInputs() {
  const pria = parseInt(document.getElementById('edit-gender-laki')?.value) || 0;
  const wanita = parseInt(document.getElementById('edit-gender-perempuan')?.value) || 0;
  const remL = parseInt(document.getElementById('edit-remaja-laki')?.value) || 0;
  const remP = parseInt(document.getElementById('edit-remaja-perempuan')?.value) || 0;

  return {
    lastUpdated: document.getElementById('edit-last-updated')?.value || '16 September 2026',
    totalKK: parseInt(document.getElementById('edit-total-kk')?.value) || 71,
    totalJiwa: pria + wanita,
    gender: {
      lakiLaki: pria,
      perempuan: wanita
    },
    remaja: {
      total: remL + remP,
      lakiLaki: remL,
      perempuan: remP
    },
    usia: {
      balita0_5: parseInt(document.getElementById('edit-usia-0-5')?.value) || 0,
      anak6_13: parseInt(document.getElementById('edit-usia-6-13')?.value) || 0,
      remaja14_20: parseInt(document.getElementById('edit-usia-14-20')?.value) || 0,
      dewasa21_50: parseInt(document.getElementById('edit-usia-21-50')?.value) || 0,
      lansiaDiatas50: parseInt(document.getElementById('edit-usia-diatas-50')?.value) || 0
    }
  };
}

function initDemografi() {
  loadDemografiData();
  renderDemografiUI();

  // Open modal button (Khusus Dashboard Admin 1)
  const handleOpenDemografiAdmin = (e) => {
    e?.preventDefault();
    if (state.currentUser !== 'b1') {
      showToast('⚠️ Pengeditan data demografi hanya dapat diakses oleh Admin 1.', 'warning');
      return;
    }
    openDemografiModal();
  };

  document.getElementById('btn-open-demografi-modal-admin')?.addEventListener('click', handleOpenDemografiAdmin);
  document.getElementById('btn-top-open-demografi')?.addEventListener('click', handleOpenDemografiAdmin);

  // Tab buttons in modal
  document.getElementById('tab-btn-form')?.addEventListener('click', () => switchDemografiTab('form'));
  document.getElementById('tab-btn-json')?.addEventListener('click', () => switchDemografiTab('json'));

  // Live calculation on input change
  document.querySelectorAll('.demografi-input-calc').forEach(input => {
    input.addEventListener('input', recalcDemografiLiveSummary);
  });

  // Submit manual form
  const formManual = document.getElementById('form-demografi-manual');
  if (formManual) {
    formManual.addEventListener('submit', (e) => {
      e.preventDefault();
      const updated = getDemografiFromInputs();
      saveDemografiData(updated);
      document.getElementById('modal-demografi-editor')?.classList.remove('active');
      showToast('✅ Data statistik kependudukan berhasil diperbarui!', 'success');
    });
  }

  // Reset to default
  document.getElementById('btn-reset-demografi')?.addEventListener('click', () => {
    if (confirm('Apakah Anda yakin ingin mengatur ulang data kependudukan ke nilai default?')) {
      const defaultData = JSON.parse(JSON.stringify(DEFAULT_DEMOGRAFI_DATA));
      saveDemografiData(defaultData);
      document.getElementById('modal-demografi-editor')?.classList.remove('active');
      showToast('Data kependudukan berhasil direset ke default.', 'info');
    }
  });

  // Apply JSON button
  document.getElementById('btn-apply-demografi-json')?.addEventListener('click', () => {
    const raw = document.getElementById('json-demografi-input')?.value;
    try {
      const parsed = JSON.parse(raw);
      if (!parsed.gender || !parsed.usia || !parsed.remaja) {
        throw new Error('Format JSON harus memiliki objek gender, usia, dan remaja.');
      }
      saveDemografiData(parsed);
      document.getElementById('modal-demografi-editor')?.classList.remove('active');
      showToast('✅ Database JSON berhasil diterapkan dan grafik diperbarui!', 'success');
    } catch (err) {
      alert('Gagal memproses JSON: ' + err.message);
    }
  });

  // Copy JSON button
  document.getElementById('btn-copy-demografi-json')?.addEventListener('click', () => {
    const raw = document.getElementById('json-demografi-input')?.value;
    if (raw && navigator.clipboard) {
      navigator.clipboard.writeText(raw).then(() => {
        showToast('JSON kependudukan berhasil disalin ke clipboard!', 'success');
      });
    }
  });

  // Modal Preview Peta Wilayah HD
  const openPetaModal = () => {
    document.getElementById('modal-peta-wilayah')?.classList.add('active');
  };
  document.getElementById('map-preview-trigger')?.addEventListener('click', openPetaModal);
  document.getElementById('btn-zoom-peta')?.addEventListener('click', (e) => {
    e.stopPropagation();
    openPetaModal();
  });
}

// ==========================================================================
// MODUL LAYANAN PENGAJUAN DANA / PERBAIKAN FASILITAS WARGA RT.001
// Sesuai Ilustrasi Referensi: Verifikasi Warga, Pengajuan & Transparansi
// ==========================================================================

let uploadedDanaPhotoUrl = '';

function setupFundRequestModule() {
  // 1. Tombol Buka Layanan Pengajuan Dana dari berbagai tempat
  const openTriggers = [
    'btn-open-layanan-dana-nav',
    'btn-open-layanan-dana-mobile',
    'btn-open-layanan-dana-hero',
    'btn-admin-preview-public-dana'
  ];
  openTriggers.forEach(id => {
    document.getElementById(id)?.addEventListener('click', () => {
      // Tutup menu mobile jika sedang terbuka
      const mobMenu = document.getElementById('public-mobile-menu');
      if (mobMenu) mobMenu.classList.remove('active');
      showFundRequestView();
    });
  });

  // 2. Tombol Kembali ke Beranda
  document.getElementById('btn-dana-back-home')?.addEventListener('click', () => {
    hideFundRequestView();
  });

  // 3. Toggle Tampilkan / Sembunyikan Password Verifikasi
  const pwInput = document.getElementById('dana-input-password');
  const pwToggle = document.getElementById('btn-dana-toggle-pw');
  const pwEye = document.getElementById('dana-pw-eye-icon');
  if (pwToggle && pwInput) {
    pwToggle.addEventListener('click', () => {
      const isHidden = pwInput.type === 'password';
      pwInput.type = isHidden ? 'text' : 'password';
      if (pwEye) {
        pwEye.className = isHidden ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye';
      }
    });
  }

  // 4. Tombol Verifikasi Identitas
  document.getElementById('btn-dana-do-verify')?.addEventListener('click', verifyResidentIdentity);
  pwInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') verifyResidentIdentity();
  });
  document.getElementById('dana-input-nama')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      if (pwInput && !pwInput.value) {
        pwInput.focus();
      } else {
        verifyResidentIdentity();
      }
    }
  });

  // 5. Tombol Ganti Pemohon / Reset Identitas
  document.getElementById('btn-dana-change-user')?.addEventListener('click', () => {
    state.currentVerifiedResident = null;
    const verifyStep = document.getElementById('dana-verify-step');
    const formStep = document.getElementById('dana-form-step');
    if (verifyStep) verifyStep.style.display = 'block';
    if (formStep) formStep.style.display = 'none';
    const errBox = document.getElementById('dana-verify-error');
    if (errBox) errBox.style.display = 'none';
    const nameEl = document.getElementById('dana-input-nama');
    const pwEl = document.getElementById('dana-input-password');
    if (nameEl) { nameEl.value = ''; nameEl.focus(); }
    if (pwEl) pwEl.value = '';
    showToast('Silakan verifikasi ulang identitas pemohon.', 'info');
  });

  // 6. Format Input Uang Rupiah Otomatis
  const nominalInput = document.getElementById('dana-form-nominal');
  if (nominalInput) {
    nominalInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '');
      if (val) {
        e.target.value = Number(val).toLocaleString('id-ID');
      } else {
        e.target.value = '';
      }
    });
  }

  // 7. Unggah Foto Bukti Kerusakan
  const fileInput = document.getElementById('dana-form-file');
  const previewWrap = document.getElementById('dana-upload-preview');
  const placeholderWrap = document.getElementById('dana-upload-placeholder');
  const previewImg = document.getElementById('dana-preview-img');
  const removeImgBtn = document.getElementById('btn-dana-remove-img');

  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          showToast('Ukuran foto maksimal 5 MB!', 'warning');
          return;
        }
        const reader = new FileReader();
        reader.onload = (evt) => {
          uploadedDanaPhotoUrl = evt.target.result;
          if (previewImg) previewImg.src = uploadedDanaPhotoUrl;
          if (placeholderWrap) placeholderWrap.style.display = 'none';
          if (previewWrap) previewWrap.style.display = 'inline-block';
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (removeImgBtn) {
    removeImgBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      uploadedDanaPhotoUrl = '';
      if (fileInput) fileInput.value = '';
      if (previewWrap) previewWrap.style.display = 'none';
      if (placeholderWrap) placeholderWrap.style.display = 'flex';
    });
  }

  // 8. Kirim Permohonan Pengajuan Dana (Biasa & WhatsApp)
  document.getElementById('btn-dana-submit-request')?.addEventListener('click', () => {
    submitFundRequest(false);
  });
  document.getElementById('btn-dana-submit-wa')?.addEventListener('click', () => {
    submitFundRequest(true);
  });

  // 9. Tab Filter Riwayat Pengajuan Warga
  document.querySelectorAll('.dana-tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.dana-tab-btn').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      const filter = e.currentTarget.getAttribute('data-filter') || 'all';
      renderPublicFundRequests(filter);
    });
  });

  // 10. Tombol Refresh Riwayat
  document.getElementById('btn-dana-refresh-list')?.addEventListener('click', () => {
    const activeTab = document.querySelector('.dana-tab-btn.active');
    const filter = activeTab ? activeTab.getAttribute('data-filter') : 'all';
    renderPublicFundRequests(filter);
    showToast('Daftar pengajuan diperbarui.', 'info');
  });

  // 11. Admin: Tombol Buat Pengajuan Baru
  document.getElementById('btn-admin-create-dana')?.addEventListener('click', () => {
    const targetResident = state.currentVerifiedResident || (state.residents && state.residents[0]) || {
      id: 'res_admin',
      name: state.currentUser === 'b2' ? 'Admin 2 (Koordinator Jimpitan)' : 'Admin 1 (Pengurus RT)',
      street: 'Graha Asri',
      block: 'B6',
      houseNo: '01',
      phone: '081289060004'
    };
    openPortalWargaPengajuanModal(targetResident);
  });

  // 12. Admin: Filter & Pencarian
  document.getElementById('select-filter-status-dana')?.addEventListener('change', renderAdminFundRequests);
  document.getElementById('input-search-dana-admin')?.addEventListener('input', renderAdminFundRequests);

  // 13. Admin: Ekspor CSV Pengajuan Dana
  document.getElementById('btn-export-dana-csv')?.addEventListener('click', exportFundRequestsCSV);

  // Inisialisasi awal list & badge
  updateFundRequestBadges();
}

/**
 * Tampilkan Halaman / Modal Formulir Layanan Pengajuan Dana (Akses Eksklusif Portal Warga)
 */
function showFundRequestView() {
  if (isLoggedIn() && state.currentUser === 'warga' && state.currentVerifiedResident) {
    showAdminApp();
    navigateToView('portal-warga');
    openPortalWargaPengajuanModal(state.currentVerifiedResident);
  } else {
    showToast('Formulir Pengajuan Dana hanya dapat diakses melalui Portal Warga terverifikasi.', 'info');
    showLoginOverlay('warga');
    const wargaRoleCard = document.querySelector('[data-role="warga"]');
    if (wargaRoleCard) wargaRoleCard.click();
  }
}

/**
 * Sembunyikan Halaman Layanan Pengajuan Dana & Kembali ke Beranda Warga
 */
function hideFundRequestView() {
  const danaView = document.getElementById('view-layanan-pengajuan-dana');
  if (danaView) danaView.style.display = 'none';
  showPublicPortal();
}

/**
 * Isi Datalist Warga & Contoh Cepat
 */
function populateDanaResidentsData() {
  const datalist = document.getElementById('dana-residents-datalist');
  const quickTags = document.getElementById('dana-quick-tags');
  if (!state.residents || !state.residents.length) return;

  if (datalist) {
    datalist.innerHTML = state.residents.map(r => `<option value="${r.name}">${r.block} ${r.houseNo} (${r.street})</option>`).join('');
  }

  if (quickTags && quickTags.children.length === 0) {
    // Ambil 4 contoh warga pertama untuk kenyamanan demonstrasi 1-klik
    const sample = state.residents.slice(0, 5);
    sample.forEach(r => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'dana-quick-tag';
      btn.textContent = `${r.name} (${r.houseNo})`;
      btn.title = `Klik untuk langsung mengisi ${r.name}`;
      btn.addEventListener('click', () => {
        const nameInput = document.getElementById('dana-input-nama');
        const pwInput = document.getElementById('dana-input-password');
        if (nameInput) nameInput.value = r.name;
        if (pwInput) {
          pwInput.value = 'rt001';
          pwInput.focus();
        }
      });
      quickTags.appendChild(btn);
    });
  }
}

/**
 * Isi Opsi Dropdown Pos Anggaran
 */
function populateDanaPosOptions() {
  const posSelect = document.getElementById('dana-form-pos');
  if (!posSelect) return;

  let html = '<option value="">-- Pilih Pos Pembebanan Anggaran --</option>';
  
  // Pos Rutin
  if (state.posConfig) {
    state.posConfig.forEach(p => {
      html += `<option value="${p.id}">${p.name}</option>`;
    });
  }

  // Pos Khusus / Lainnya
  if (state.otherPosConfig) {
    state.otherPosConfig.forEach(p => {
      html += `<option value="${p.id}">${p.name}</option>`;
    });
  }

  posSelect.innerHTML = html;
  // Defaultkan ke Pos Pembangunan & Fasum jika ada
  posSelect.value = 'pembangunan';
}

/**
 * Verifikasi Identitas Pemohon (Sesuai Gambar)
 */
function verifyResidentIdentity() {
  const nameInput = document.getElementById('dana-input-nama');
  const pwInput   = document.getElementById('dana-input-password');
  const errorBox  = document.getElementById('dana-verify-error');
  const errorText = document.getElementById('dana-verify-error-text');

  const enteredName = nameInput ? nameInput.value.trim().toLowerCase() : '';
  const enteredPw   = pwInput ? pwInput.value.trim() : '';

  if (!enteredName) {
    if (errorBox) {
      errorText.textContent = 'Silakan masukkan Nama Lengkap Anda.';
      errorBox.style.display = 'flex';
    }
    nameInput?.focus();
    return;
  }

  // Cari di database warga
  const resident = state.residents.find(r => 
    r.name.toLowerCase() === enteredName || 
    r.name.toLowerCase().includes(enteredName)
  );

  if (!resident) {
    if (errorBox) {
      errorText.textContent = 'Nama warga tidak ditemukan dalam daftar 71 KK RT.001. Silakan periksa ejaan nama Anda.';
      errorBox.style.display = 'flex';
    }
    nameInput?.focus();
    return;
  }

  // Cek Password (rt001, warga, nomor rumah, 4 digit akhir nomor HP, atau PIN Pengurus 1111/2222)
  const cleanHouseNo = (resident.houseNo || '').replace(/\D/g, '');
  const phoneTail = (resident.phone || '').slice(-4);
  const validPins = [
    'rt001',
    'warga',
    '123456',
    cleanHouseNo,
    phoneTail,
    state.accountPins ? state.accountPins.b1 : '1111',
    state.accountPins ? state.accountPins.b2 : '2222'
  ];

  const isPasswordValid = validPins.some(p => p && p.toLowerCase() === enteredPw.toLowerCase());

  if (!isPasswordValid) {
    if (errorBox) {
      errorText.textContent = 'Password salah. Tips: Gunakan password warga "rt001" atau nomor rumah / PIN Pengurus.';
      errorBox.style.display = 'flex';
    }
    if (pwInput) {
      pwInput.value = '';
      pwInput.focus();
    }
    return;
  }

  // Sukses verifikasi!
  if (errorBox) errorBox.style.display = 'none';
  state.currentVerifiedResident = resident;

  const verifyStep = document.getElementById('dana-verify-step');
  const formStep = document.getElementById('dana-form-step');
  if (verifyStep) verifyStep.style.display = 'none';
  if (formStep) formStep.style.display = 'block';

  updateVerifiedUserBanner(resident);
  showToast(`✅ Identitas terverifikasi: Bapak/Ibu ${resident.name}. Formulir siap diisi!`, 'success');

  const judulInput = document.getElementById('dana-form-judul');
  if (judulInput) setTimeout(() => judulInput.focus(), 250);
}

/**
 * Update Banner Pengenal Pemohon yang Terverifikasi
 */
function updateVerifiedUserBanner(resident) {
  const nameEl = document.getElementById('dana-verified-name');
  const addrEl = document.getElementById('dana-verified-address');
  const waEl   = document.getElementById('dana-form-whatsapp');

  if (nameEl) nameEl.textContent = resident.name;
  if (addrEl) addrEl.innerHTML = `<i class="fa-solid fa-house-chimney text-emerald"></i> ${resident.street} &bull; ${resident.block} ${resident.houseNo}`;
  if (waEl && !waEl.value) waEl.value = resident.phone || '';
}

/**
 * Kirim Permohonan Pengajuan Dana
 */
function submitFundRequest(sendWhatsApp = false) {
  const resident = state.currentVerifiedResident;
  if (!resident) {
    showToast('Identitas pemohon belum terverifikasi!', 'warning');
    return;
  }

  const kategori  = document.getElementById('dana-form-kategori')?.value;
  const posId     = document.getElementById('dana-form-pos')?.value;
  const judul     = document.getElementById('dana-form-judul')?.value.trim();
  const rawNom    = document.getElementById('dana-form-nominal')?.value.replace(/\D/g, '');
  const urgensi   = document.getElementById('dana-form-urgensi')?.value;
  const lokasi    = document.getElementById('dana-form-lokasi')?.value.trim();
  const wa        = document.getElementById('dana-form-whatsapp')?.value.trim();
  const deskripsi = document.getElementById('dana-form-deskripsi')?.value.trim();

  if (!kategori || !posId || !judul || !rawNom || !urgensi || !lokasi || !wa || !deskripsi) {
    showToast('Mohon lengkapi seluruh isian formulir bertanda bintang (*)!', 'warning');
    return;
  }

  const nominal = Number(rawNom);
  if (nominal <= 0) {
    showToast('Nominal estimasi dana harus lebih besar dari Rp 0!', 'warning');
    return;
  }

  // Nama Pos Anggaran
  const posObj = (state.posConfig || []).find(p => p.id === posId) || (state.otherPosConfig || []).find(p => p.id === posId);
  const posName = posObj ? posObj.name : posId;

  // Buat ID Unik DANA
  const now = new Date();
  const yearMonth = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}`;
  const count = (state.fundRequests || []).length + 1;
  const reqId = `DANA-${yearMonth}-${String(count).padStart(3, '0')}`;

  const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  const newRequest = {
    id: reqId,
    residentId: resident.id,
    residentName: resident.name,
    address: `${resident.street} ${resident.block} ${resident.houseNo}`,
    phone: wa,
    category: kategori,
    targetPos: posId,
    targetPosName: posName,
    title: judul,
    amount: nominal,
    urgency: urgensi,
    location: lokasi,
    description: deskripsi,
    date: dateStr,
    status: 'pending', // 'pending' | 'approved' | 'disbursed' | 'rejected'
    adminNote: '',
    photoUrl: uploadedDanaPhotoUrl || ''
  };

  if (!state.fundRequests) state.fundRequests = [];
  state.fundRequests.unshift(newRequest);
  saveState();

  // Reset form inputs
  document.getElementById('dana-form-judul').value = '';
  document.getElementById('dana-form-nominal').value = '';
  document.getElementById('dana-form-lokasi').value = '';
  document.getElementById('dana-form-deskripsi').value = '';
  uploadedDanaPhotoUrl = '';
  const fileInput = document.getElementById('dana-form-file');
  if (fileInput) fileInput.value = '';
  const previewWrap = document.getElementById('dana-upload-preview');
  const placeholderWrap = document.getElementById('dana-upload-placeholder');
  if (previewWrap) previewWrap.style.display = 'none';
  if (placeholderWrap) placeholderWrap.style.display = 'flex';

  // Perbarui tampilan
  renderPublicFundRequests('all');
  renderAdminFundRequests();
  updateFundRequestBadges();

  showToast(`🎉 Permohonan ${reqId} berhasil dikirim! Pengurus RT akan segera meninjau proposal Anda.`, 'success');

  // Opsi Kirim WhatsApp langsung ke Pengurus
  if (sendWhatsApp) {
    const waText = 
`*PEMBERITAHUAN PENGAJUAN DANA RT.001 / RW.013*
---------------------------------------
No. Registrasi : *${newRequest.id}*
Tanggal       : ${newRequest.date} WIB
Pemohon       : *${newRequest.residentName}*
Alamat        : ${newRequest.address}
No. WhatsApp  : ${newRequest.phone}

*Rincian Pengajuan:*
Kategori      : ${newRequest.category}
Judul Usulan  : *${newRequest.title}*
Pos Anggaran  : ${newRequest.targetPosName}
Estimasi Dana : *Rp ${Number(newRequest.amount).toLocaleString('id-ID')}*
Tingkat Urgensi: ${newRequest.urgency}
Titik Lokasi  : ${newRequest.location}

*Keterangan & Kebutuhan:*
"${newRequest.description}"
---------------------------------------
Mohon Ketua RT & Bendahara dapat meninjau pada sistem RT-FinSmart PRO. Terima kasih!`;

    const encoded = encodeURIComponent(waText);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  }

  // Scroll halus ke daftar transparansi
  const histSec = document.querySelector('.dana-history-section');
  if (histSec) {
    setTimeout(() => {
      histSec.scrollIntoView({ behavior: 'smooth' });
    }, 400);
  }
}

/**
 * Render Riwayat Pengajuan Dana di Halaman Warga (Transparan)
 */
function renderPublicFundRequests(filter = 'all') {
  const container = document.getElementById('dana-public-cards-container');
  if (!container) return;

  const requests = (state.fundRequests || []).filter(r => {
    if (filter === 'all') return true;
    return r.status === filter;
  });

  if (requests.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; background: #ffffff; border-radius: 16px; border: 1px dashed #cbd5e1; color: #64748b;">
        <i class="fa-solid fa-file-circle-check" style="font-size: 2.5rem; color: #94a3b8; margin-bottom: 10px;"></i>
        <h4 style="margin: 0 0 6px 0; color: #334155;">Belum ada pengajuan dana dengan status ini.</h4>
        <p style="margin: 0; font-size: 13.5px;">Ajukan perbaikan fasilitas lingkungan Anda menggunakan formulir di atas.</p>
      </div>
    `;
    return;
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return `<span class="dana-item-badge status-approved"><i class="fa-solid fa-circle-check"></i> Disetujui</span>`;
      case 'disbursed':
        return `<span class="dana-item-badge status-disbursed"><i class="fa-solid fa-hand-holding-dollar"></i> Dana Dicairkan</span>`;
      case 'rejected':
        return `<span class="dana-item-badge status-rejected"><i class="fa-solid fa-circle-xmark"></i> Ditolak</span>`;
      default:
        return `<span class="dana-item-badge status-pending"><i class="fa-solid fa-hourglass-half"></i> Menunggu Review</span>`;
    }
  };

  const getUrgencyIcon = (urgency) => {
    if (urgency === 'Mendesak') return '<span style="color:#ef4444;"><i class="fa-solid fa-triangle-exclamation"></i> Mendesak</span>';
    if (urgency === 'Tinggi') return '<span style="color:#f59e0b;"><i class="fa-solid fa-bolt"></i> Tinggi</span>';
    return '<span style="color:#10b981;"><i class="fa-solid fa-calendar-check"></i> Terjadwal</span>';
  };

  container.innerHTML = requests.map(r => `
    <div class="dana-card-item">
      <div>
        <div class="dana-item-top">
          <span class="dana-item-id">${r.id}</span>
          ${getStatusBadge(r.status)}
        </div>
        <div class="dana-item-category">${r.category}</div>
        <h3 class="dana-item-title">${r.title}</h3>
        <div class="dana-item-details">
          <span><i class="fa-solid fa-user text-blue"></i> Pemohon: <strong>${r.residentName}</strong></span>
          <span><i class="fa-solid fa-location-dot text-rose"></i> Lokasi: ${r.location}</span>
          <span><i class="fa-solid fa-vault text-gold"></i> Pos: ${r.targetPosName || r.targetPos}</span>
          <span><i class="fa-solid fa-gauge-high"></i> Urgensi: ${getUrgencyIcon(r.urgency)}</span>
        </div>
      </div>
      <div>
        <div class="dana-item-nominal">Rp ${Number(r.amount).toLocaleString('id-ID')}</div>
        <div class="dana-item-footer">
          <span><i class="fa-regular fa-clock"></i> ${r.date}</span>
          ${r.photoUrl ? '<span title="Ada lampiran foto"><i class="fa-solid fa-image text-blue"></i> Lampiran</span>' : ''}
        </div>
      </div>
    </div>
  `).join('');
}

/**
 * Render Pengajuan Dana Warga di Admin Portal (RT-FinSmart PRO)
 */
function renderAdminFundRequests() {
  const tbody = document.getElementById('tbody-dana-admin');
  if (!tbody) return;

  const searchVal = (document.getElementById('input-search-dana-admin')?.value || '').toLowerCase().trim();
  const filterVal = document.getElementById('select-filter-status-dana')?.value || 'all';

  const allReqs = state.fundRequests || [];

  // Hitung KPI
  const totalCount = allReqs.length;
  const pendingCount = allReqs.filter(r => r.status === 'pending').length;
  const approvedCount = allReqs.filter(r => r.status === 'approved' || r.status === 'disbursed').length;
  const rejectedCount = allReqs.filter(r => r.status === 'rejected').length;

  const totalAmount = allReqs.reduce((sum, r) => sum + Number(r.amount || 0), 0);
  const disbursedAmount = allReqs
    .filter(r => r.status === 'disbursed')
    .reduce((sum, r) => sum + Number(r.amount || 0), 0);

  // Pasang ke DOM KPI
  const elTotal = document.getElementById('kpi-dana-total');
  const elTotalAmt = document.getElementById('kpi-dana-total-amount');
  const elPending = document.getElementById('kpi-dana-pending');
  const elApproved = document.getElementById('kpi-dana-approved');
  const elDisbursedAmt = document.getElementById('kpi-dana-approved-amount');
  const elRejected = document.getElementById('kpi-dana-rejected');

  if (elTotal) elTotal.textContent = totalCount;
  if (elTotalAmt) elTotalAmt.textContent = `Total diajukan: Rp ${totalAmount.toLocaleString('id-ID')}`;
  if (elPending) elPending.textContent = pendingCount;
  if (elApproved) elApproved.textContent = approvedCount;
  if (elDisbursedAmt) elDisbursedAmt.textContent = `Rp ${disbursedAmount.toLocaleString('id-ID')} terealisasi`;
  if (elRejected) elRejected.textContent = rejectedCount;

  // Filter daftar untuk tabel
  const filtered = allReqs.filter(r => {
    if (filterVal !== 'all' && r.status !== filterVal) return false;
    if (searchVal) {
      const matchName = (r.residentName || '').toLowerCase().includes(searchVal);
      const matchTitle = (r.title || '').toLowerCase().includes(searchVal);
      const matchLoc = (r.location || '').toLowerCase().includes(searchVal);
      const matchId = (r.id || '').toLowerCase().includes(searchVal);
      return matchName || matchTitle || matchLoc || matchId;
    }
    return true;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="9" style="text-align: center; color: var(--text-muted); padding: 3rem;">
          <i class="fa-solid fa-inbox" style="font-size: 2.2rem; opacity: 0.4; margin-bottom: 0.5rem;"></i><br>
          Tidak ada data pengajuan dana yang cocok dengan kriteria pencarian.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map((r, idx) => {
    let badgeHtml = '';
    if (r.status === 'approved') badgeHtml = '<span class="status-badge status-approved"><i class="fa-solid fa-check"></i> Disetujui</span>';
    else if (r.status === 'disbursed') badgeHtml = '<span class="status-badge status-disbursed"><i class="fa-solid fa-hand-holding-dollar"></i> Dicairkan</span>';
    else if (r.status === 'rejected') badgeHtml = '<span class="status-badge status-rejected"><i class="fa-solid fa-xmark"></i> Ditolak</span>';
    else badgeHtml = '<span class="status-badge status-pending"><i class="fa-solid fa-clock"></i> Review</span>';

    let urgencyBadge = '';
    if (r.urgency === 'Mendesak') urgencyBadge = '<span class="badge" style="background:rgba(239,68,68,0.2); color:#f87171;">Mendesak</span>';
    else if (r.urgency === 'Tinggi') urgencyBadge = '<span class="badge" style="background:rgba(245,158,11,0.2); color:#fbbf24;">Tinggi</span>';
    else urgencyBadge = '<span class="badge" style="background:rgba(16,185,129,0.2); color:#34d399;">Normal</span>';

    return `
      <tr>
        <td><strong>${idx + 1}</strong></td>
        <td>
          <span style="font-size:0.78rem; color:var(--text-muted); display:block;">${r.id}</span>
          <span style="font-size:0.85rem;">${r.date.split(' ')[0]}</span>
        </td>
        <td>
          <strong>${r.residentName}</strong>
          <span style="font-size:0.78rem; color:var(--text-muted); display:block;">${r.address}</span>
          <a href="https://wa.me/${(r.phone || '').replace(/^0/, '62').replace(/\D/g, '')}" target="_blank" style="font-size:0.75rem; color:#34d399; text-decoration:none;">
            <i class="fa-brands fa-whatsapp"></i> ${r.phone}
          </a>
        </td>
        <td>
          <strong style="color:var(--text-primary); font-size:0.92rem;">${r.title}</strong>
          <span style="font-size:0.78rem; color:#60a5fa; display:block;"><i class="fa-solid fa-tag"></i> ${r.category}</span>
          <span style="font-size:0.75rem; color:var(--text-muted); display:block;"><i class="fa-solid fa-location-dot"></i> ${r.location}</span>
        </td>
        <td>
          <span class="badge" style="background:rgba(245,158,11,0.15); color:var(--gold-400); font-size:0.75rem;">
            ${r.targetPosName || r.targetPos}
          </span>
        </td>
        <td>
          <strong class="text-gold" style="font-size:0.95rem;">Rp ${Number(r.amount).toLocaleString('id-ID')}</strong>
        </td>
        <td>${urgencyBadge}</td>
        <td>${badgeHtml}</td>
        <td>
          <div style="display:flex; gap:6px; flex-wrap:wrap;">
            <button type="button" class="btn btn-sm btn-outline-cyan" onclick="openFundRequestDetailModal('${r.id}')" title="Buka Detail">
              <i class="fa-solid fa-eye"></i> Detail
            </button>
            ${r.status === 'pending' ? `
              <button type="button" class="btn btn-sm btn-emerald" onclick="approveFundRequest('${r.id}')" title="Setujui">
                <i class="fa-solid fa-check"></i> Setujui
              </button>
            ` : ''}
            ${r.status === 'approved' ? `
              <button type="button" class="btn btn-sm btn-gold" onclick="disburseFundRequest('${r.id}')" title="Cairkan Dana Kas RT">
                <i class="fa-solid fa-money-bill-transfer"></i> Cairkan
              </button>
            ` : ''}
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

/**
 * Buka Modal Detail Pengajuan Dana
 */
function openFundRequestDetailModal(reqId) {
  const req = (state.fundRequests || []).find(r => r.id === reqId);
  if (!req) return;

  const modal = document.getElementById('modal-dana-detail');
  if (!modal) return;

  document.getElementById('modal-dana-id').textContent = `#${req.id}`;
  document.getElementById('modal-dana-pemohon').innerHTML = `<strong>${req.residentName}</strong>`;
  document.getElementById('modal-dana-alamat').textContent = req.address;
  document.getElementById('modal-dana-wa').textContent = req.phone;
  document.getElementById('modal-dana-tanggal').textContent = `${req.date} WIB`;
  document.getElementById('modal-dana-kategori').textContent = req.category;
  document.getElementById('modal-dana-pos').textContent = req.targetPosName || req.targetPos;
  document.getElementById('modal-dana-nominal').textContent = `Rp ${Number(req.amount).toLocaleString('id-ID')}`;
  document.getElementById('modal-dana-lokasi').textContent = req.location;
  document.getElementById('modal-dana-deskripsi').textContent = req.description || '-';

  // Link WhatsApp
  const cleanPhone = (req.phone || '').replace(/^0/, '62').replace(/\D/g, '');
  const waLink = document.getElementById('modal-dana-wa-link');
  if (waLink) waLink.href = `https://wa.me/${cleanPhone}`;

  // Urgency
  const urgEl = document.getElementById('modal-dana-urgency-badge');
  if (urgEl) {
    urgEl.innerHTML = `<span class="badge" style="font-size:0.8rem; padding:4px 10px; background:${req.urgency === 'Mendesak' ? 'rgba(239,68,68,0.25); color:#f87171;' : 'rgba(245,158,11,0.25); color:#fbbf24;'}">Urgensi: ${req.urgency}</span>`;
  }

  // Status
  const statusEl = document.getElementById('modal-dana-status-badge');
  if (statusEl) {
    if (req.status === 'approved') {
      statusEl.className = 'status-badge status-approved';
      statusEl.innerHTML = '<i class="fa-solid fa-check"></i> Disetujui';
    } else if (req.status === 'disbursed') {
      statusEl.className = 'status-badge status-disbursed';
      statusEl.innerHTML = '<i class="fa-solid fa-hand-holding-dollar"></i> Dana Telah Dicairkan';
    } else if (req.status === 'rejected') {
      statusEl.className = 'status-badge status-rejected';
      statusEl.innerHTML = '<i class="fa-solid fa-xmark"></i> Ditolak';
    } else {
      statusEl.className = 'status-badge status-pending';
      statusEl.innerHTML = '<i class="fa-solid fa-hourglass-half"></i> Menunggu Review';
    }
  }

  // Foto Bukti
  const photoContainer = document.getElementById('modal-dana-photo-container');
  const imgEl = document.getElementById('modal-dana-img');
  if (req.photoUrl) {
    if (imgEl) imgEl.src = req.photoUrl;
    if (photoContainer) photoContainer.style.display = 'block';
  } else {
    if (photoContainer) photoContainer.style.display = 'none';
  }

  // Catatan Penolakan / Evaluasi
  const rejectContainer = document.getElementById('modal-dana-reject-container');
  const rejectReason = document.getElementById('modal-dana-reject-reason');
  if (req.adminNote) {
    if (rejectReason) rejectReason.textContent = req.adminNote;
    if (rejectContainer) rejectContainer.style.display = 'block';
  } else {
    if (rejectContainer) rejectContainer.style.display = 'none';
  }

  // Action Button Handlers in Modal
  const btnApprove = document.getElementById('btn-action-dana-approve');
  const btnDisburse = document.getElementById('btn-action-dana-disburse');
  const btnReject = document.getElementById('btn-action-dana-reject');
  const btnWa = document.getElementById('btn-action-dana-wa-notify');

  if (btnApprove) {
    btnApprove.style.display = (req.status === 'pending') ? 'inline-flex' : 'none';
    btnApprove.onclick = () => {
      approveFundRequest(req.id);
      modal.classList.remove('active');
    };
  }

  if (btnDisburse) {
    btnDisburse.style.display = (req.status === 'approved') ? 'inline-flex' : 'none';
    btnDisburse.onclick = () => {
      disburseFundRequest(req.id);
      modal.classList.remove('active');
    };
  }

  if (btnReject) {
    btnReject.style.display = (req.status === 'pending' || req.status === 'approved') ? 'inline-flex' : 'none';
    btnReject.onclick = () => {
      rejectFundRequest(req.id);
      modal.classList.remove('active');
    };
  }

  if (btnWa) {
    btnWa.onclick = () => {
      const msg = encodeURIComponent(`Halo Bapak/Ibu ${req.residentName}, terkait permohonan pengajuan dana ${req.id} ("${req.title}") dengan status saat ini: *${req.status.toUpperCase()}*. Terima kasih atas partisipasinya untuk lingkungan RT.001.`);
      window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank');
    };
  }

  modal.classList.add('active');
}

/**
 * Setujui Pengajuan Dana
 */
function approveFundRequest(reqId) {
  const req = (state.fundRequests || []).find(r => r.id === reqId);
  if (!req) return;

  if (confirm(`Setujui pengajuan dana "${req.title}" senilai Rp ${Number(req.amount).toLocaleString('id-ID')}?`)) {
    req.status = 'approved';
    req.adminNote = `Disetujui oleh ${state.currentUser === 'b2' ? 'Admin 2' : 'Admin 1'} pada ${new Date().toLocaleDateString('id-ID')}. Siap untuk proses pencairan dana.`;
    saveState();
    renderAll();
    renderPublicFundRequests('all');
    showToast(`✅ Pengajuan dana ${req.id} berhasil disetujui!`, 'success');
  }
}

/**
 * Cairkan Dana Kas RT untuk Pengajuan yang Telah Disetujui
 * (Otomatis mencatat pengeluaran ke Pengeluaran Kas RT)
 */
function disburseFundRequest(reqId) {
  const req = (state.fundRequests || []).find(r => r.id === reqId);
  if (!req) return;

  const confirmMsg = `Realisasikan pencairan dana kas sebesar Rp ${Number(req.amount).toLocaleString('id-ID')} untuk:\n"${req.title}"?\n\nSistem akan otomatis mencatat pembebanan pengeluaran pada: ${req.targetPosName || req.targetPos}.`;
  
  if (confirm(confirmMsg)) {
    const today = new Date().toISOString().split('T')[0];
    const expId = `exp-${Date.now()}`;
    const newExpense = {
      id: expId,
      date: today,
      title: `[Realisasi Pengajuan Dana] ${req.title}`,
      amount: Number(req.amount),
      posId: req.targetPos || 'pembangunan',
      recipient: req.residentName,
      refNo: `DISB-${req.id}`
    };

    if (!state.expenses) state.expenses = [];
    state.expenses.unshift(newExpense);

    req.status = 'disbursed';
    req.adminNote = `Dana telah dicairkan sebesar Rp ${Number(req.amount).toLocaleString('id-ID')} pada ${today} (No. Bukti: ${newExpense.refNo})`;

    saveState();
    renderAll();
    renderPublicFundRequests('all');
    showToast(`💸 Dana kas Rp ${Number(req.amount).toLocaleString('id-ID')} berhasil dicairkan dan otomatis dicatat ke pembukuan pengeluaran kas RT!`, 'success');
  }
}

/**
 * Tolak Pengajuan Dana
 */
function rejectFundRequest(reqId) {
  const req = (state.fundRequests || []).find(r => r.id === reqId);
  if (!req) return;

  const reason = prompt('Masukkan catatan/alasan penolakan pengajuan dana:', 'Anggaran pos belum mencukupi / Usulan ditunda untuk musyawarah RT berikutnya');
  if (reason !== null) {
    req.status = 'rejected';
    req.adminNote = reason || 'Ditolak oleh pengurus RT.';
    saveState();
    renderAll();
    renderPublicFundRequests('all');
    showToast(`Pengajuan dana ${req.id} ditandai Ditolak.`, 'info');
  }
}

/**
 * Perbarui Counter Badge di Sidebar Admin
 */
function updateFundRequestBadges() {
  const badge = document.getElementById('sidebar-pengajuan-badge');
  if (!badge) return;

  const pendingCount = (state.fundRequests || []).filter(r => r.status === 'pending').length;
  badge.textContent = pendingCount;
  if (pendingCount > 0) {
    badge.style.display = 'inline-flex';
    badge.style.background = 'rgba(239, 68, 68, 0.4)';
    badge.style.color = '#fca5a5';
  } else {
    badge.style.background = 'rgba(37, 99, 235, 0.35)';
    badge.style.color = '#60a5fa';
  }
}

/**
 * Ekspor Data Pengajuan Dana ke CSV
 */
function exportFundRequestsCSV() {
  const reqs = state.fundRequests || [];
  if (reqs.length === 0) {
    showToast('Belum ada data pengajuan dana untuk diekspor.', 'info');
    return;
  }

  let csv = 'ID,Tanggal,Pemohon,Alamat,No_WA,Kategori,Judul,Pos_Anggaran,Estimasi_Nominal,Urgensi,Status,Catatan_Pengurus\n';
  reqs.forEach(r => {
    csv += `"${r.id}","${r.date}","${r.residentName}","${r.address}","${r.phone}","${r.category}","${r.title.replace(/"/g, '""')}","${r.targetPosName || r.targetPos}",${r.amount},"${r.urgency}","${r.status}","${(r.adminNote || '').replace(/"/g, '""')}"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `Pengajuan_Dana_RT001_${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
  showToast('Data pengajuan dana berhasil diekspor ke format CSV!', 'success');
}


// ==========================================================================
// MODUL STRUKTUR KEPENGURUSAN RT.001 / RW.013 PERIODE 2022 - 2027
// ==========================================================================

const PENGURUS_MASTER_DATA = [
  // Pimpinan Inti
  {
    id: 'p-ketua',
    name: 'FATKHURROHMAN',
    role: 'Ketua RT.001',
    category: 'pimpinan',
    division: 'Pimpinan Eksekutif Wilayah',
    badge: 'KETUA RT',
    avatarIcon: 'fa-solid fa-user-tie',
    glowClass: 'gold-glow',
    colorHex: '#f59e0b',
    phone: '',
    tupoksi: 'Memimpin organisasi RT.001, menetapkan kebijakan strategis lingkungan, memegang garis komando utama, serta mewakili warga dalam hubungan eksternal dengan RW.013 & pemerintah desa.'
  },
  {
    id: 'p-wakil',
    name: 'AMA JUPRI',
    role: 'Wakil Ketua RT.001',
    category: 'pimpinan',
    division: 'Pimpinan Operasional Harian',
    badge: 'WAKIL KETUA',
    avatarIcon: 'fa-solid fa-user-check',
    glowClass: 'purple-glow',
    colorHex: '#a855f7',
    phone: '',
    tupoksi: 'Membantu Ketua RT, memegang garis komando operasional ke seluruh seksi bidang, koordinasi harian dengan Bendahara dan Sekretaris, serta eksekusi kegiatan lapangan.'
  },
  {
    id: 'p-sekretaris',
    name: 'ANDIRA H. P',
    role: 'Sekretaris RT.001',
    category: 'pimpinan',
    division: 'Administrasi & Kesekretariatan',
    badge: 'SEKRETARIS',
    avatarIcon: 'fa-solid fa-file-signature',
    glowClass: 'cyan-glow',
    colorHex: '#06b6d4',
    phone: '',
    tupoksi: 'Mengelola persuratan warga (surat pengantar/keterangan), pendataan kependudukan 71 KK, inventarisasi data domisili, notulensi rapat, dan arsip dokumen RT.'
  },
  {
    id: 'p-bendahara-1',
    name: 'JUMARI S',
    role: 'Bendahara 1 (Admin 1)',
    category: 'pimpinan',
    division: 'Pengelola Keuangan & 6 Pos Kas',
    badge: 'BENDAHARA 1',
    avatarIcon: 'fa-solid fa-crown',
    glowClass: 'emerald-glow',
    colorHex: '#10b981',
    phone: '',
    tupoksi: 'Pembukuan keuangan utama RT, penarikan iuran wajib Rp 50.000/KK, realokasi otomatis 6 pos anggaran, penyusunan LPJ bulanan, dan super admin RT-FinSmart PRO.'
  },
  {
    id: 'p-bendahara-2',
    name: 'OKTAVIANDRI',
    role: 'Bendahara 2 (Admin 2)',
    category: 'pimpinan',
    division: 'Koordinator Jimpitan Ronda',
    badge: 'BENDAHARA 2',
    avatarIcon: 'fa-solid fa-vault',
    glowClass: 'emerald-glow',
    colorHex: '#10b981',
    phone: '',
    tupoksi: 'Mendampingi Bendahara 1, mengkoordinir pengumpulan dan pencatatan kas jimpitan koin ronda malam minggu, serta verifikasi fisik kas kecil di pos ronda.'
  },

  // Dewan Penasehat
  {
    id: 'p-penasehat-1',
    name: 'DWI SUSANTO',
    role: 'Dewan Penasehat RT.001',
    category: 'penasehat',
    division: 'Dewan Pertimbangan Wilayah',
    badge: 'PENASEHAT',
    avatarIcon: 'fa-solid fa-shield-halved',
    glowClass: 'rose-glow',
    colorHex: '#f43f5e',
    phone: '',
    tupoksi: 'Memberikan saran, pertimbangan, dan telaah strategis kepada Ketua RT dalam pengambilan keputusan krusial dan penyelesaian problematika lingkungan warga.'
  },
  {
    id: 'p-penasehat-2',
    name: 'SUPARDI',
    role: 'Dewan Penasehat RT.001',
    category: 'penasehat',
    division: 'Dewan Pertimbangan Wilayah',
    badge: 'PENASEHAT',
    avatarIcon: 'fa-solid fa-shield-halved',
    glowClass: 'rose-glow',
    colorHex: '#f43f5e',
    phone: '',
    tupoksi: 'Pengawas independen tata kelola lingkungan dan pendamping sesepuh warga guna memelihara kerukunan dan keharmonisan antar warga Graha Asri.'
  },
  {
    id: 'p-penasehat-3',
    name: 'NARNO',
    role: 'Dewan Penasehat RT.001',
    category: 'penasehat',
    division: 'Dewan Pertimbangan Wilayah',
    badge: 'PENASEHAT',
    avatarIcon: 'fa-solid fa-shield-halved',
    glowClass: 'rose-glow',
    colorHex: '#f43f5e',
    phone: '',
    tupoksi: 'Penasehat senior lingkungan sekaligus koordinator kepanitiaan ibadah Qurban dan jembatan musyawarah mufakat seluruh warga.'
  },

  // Kebersihan Lingkungan & Pembangunan
  {
    id: 'p-kebersihan-1',
    name: 'HUTAGALUNG',
    role: 'Pengurus Kebersihan & Pembangunan',
    category: 'kebersihan',
    division: 'Seksi Fasum & Lingkungan Hidup',
    badge: 'KEBERSIHAN',
    avatarIcon: 'fa-solid fa-trowel-bricks',
    glowClass: 'cyan-glow',
    colorHex: '#14b8a6',
    phone: '',
    tupoksi: 'Pengawasan kebersihan drainase/saluran air, penanganan sampah lingkungan, agenda gotong royong kerja bakti, dan pemeliharaan jalan.'
  },
  {
    id: 'p-kebersihan-2',
    name: 'SAHIDIN',
    role: 'Pengurus Kebersihan & Pembangunan',
    category: 'kebersihan',
    division: 'Seksi Fasum & Lingkungan Hidup',
    badge: 'KEBERSIHAN',
    avatarIcon: 'fa-solid fa-leaf',
    glowClass: 'cyan-glow',
    colorHex: '#14b8a6',
    phone: '',
    tupoksi: 'Penataan penghijauan taman RT, sanitasi lingkungan, serta pengawasan teknis perbaikan sarana fasilitas umum dan lampu penerangan jalan umum (PJU).'
  },

  // Humas & Sosial (5 Koordinator Jalan)
  {
    id: 'p-humas-1',
    name: 'KHOIRUL',
    role: 'Humas Koordinator Jl. Citarum II',
    street: 'Jl. Citarum II (Blok B6)',
    category: 'humas',
    division: 'Seksi Hubungan Masyarakat & Sosial',
    badge: 'KOORD. CTR II',
    avatarIcon: 'fa-solid fa-bullhorn',
    glowClass: 'cyan-glow',
    colorHex: '#0284c7',
    phone: '',
    tupoksi: 'Menghubungkan aspirasi warga lorong Jl. Citarum II ke pengurus RT, menyalurkan informasi surat edaran, serta mengkoordinir gotong royong warga.'
  },
  {
    id: 'p-humas-2',
    name: 'MAMAN',
    role: 'Humas Koordinator Jl. Citarum IV',
    street: 'Jl. Citarum IV (Blok B7)',
    category: 'humas',
    division: 'Seksi Hubungan Masyarakat & Sosial',
    badge: 'KOORD. CTR IV',
    avatarIcon: 'fa-solid fa-bullhorn',
    glowClass: 'cyan-glow',
    colorHex: '#0284c7',
    phone: '',
    tupoksi: 'Penyambung komunikasi dan sosialisasi agenda kegiatan bagi warga Jl. Citarum IV, koordinasi arisan lorong, dan pemeliharaan guyub rukun.'
  },
  {
    id: 'p-humas-3',
    name: 'SULAIMAN',
    role: 'Humas Koordinator Jl. Citarum VIIIB',
    street: 'Jl. Citarum VIIIB (Blok B9)',
    category: 'humas',
    division: 'Seksi Hubungan Masyarakat & Sosial',
    badge: 'KOORD. CTR VIIIB',
    avatarIcon: 'fa-solid fa-bullhorn',
    glowClass: 'cyan-glow',
    colorHex: '#0284c7',
    phone: '',
    tupoksi: 'Pemberitahuan edaran resmi, verifikasi data warga baru di lorong VIIIB, dan pendampingan sosial bagi keluarga yang mengalami musibah/sakit.'
  },
  {
    id: 'p-humas-4',
    name: 'RASJU',
    role: 'Humas Koordinator Jl. Citarum VIIIC',
    street: 'Jl. Citarum VIIIC (Blok B9/B10)',
    category: 'humas',
    division: 'Seksi Hubungan Masyarakat & Sosial',
    badge: 'KOORD. CTR VIIIC',
    avatarIcon: 'fa-solid fa-bullhorn',
    glowClass: 'cyan-glow',
    colorHex: '#0284c7',
    phone: '',
    tupoksi: 'Memelihara kerukunan warga Jl. Citarum VIIIC, koordinasi partisipasi iuran dan jimpitan ronda, serta menjaga keharmonisan lingkungan.'
  },
  {
    id: 'p-humas-5',
    name: 'ZAINUDIN',
    role: 'Humas Koordinator Jl. Citarum IX',
    street: 'Jl. Citarum IX (Blok B10)',
    category: 'humas',
    division: 'Seksi Hubungan Masyarakat & Sosial',
    badge: 'KOORD. CTR IX',
    avatarIcon: 'fa-solid fa-bullhorn',
    glowClass: 'cyan-glow',
    colorHex: '#0284c7',
    phone: '',
    tupoksi: 'Sosialisasi pengumuman RT ke warga Jl. Citarum IX, inventarisasi kebutuhan fasilitas jalan lorong, dan penggerak kerukunan warga.'
  },

  // Keamanan, Aset & Ketertiban
  {
    id: 'p-keamanan-1',
    name: 'ASWIN PRANTAMA',
    role: 'Pengurus Keamanan & Ketertiban',
    category: 'keamanan',
    division: 'Seksi Keamanan, Aset & Siskamling',
    badge: 'KEAMANAN',
    avatarIcon: 'fa-solid fa-user-shield',
    glowClass: 'emerald-glow',
    colorHex: '#10b981',
    phone: '',
    tupoksi: 'Penyusunan jadwal giliran ronda malam minggu, koordinasi operasional pos kamling, dan pemeliharaan ketertiban lingkungan hunian.'
  },
  {
    id: 'p-keamanan-2',
    name: 'AGUS NURSANTO',
    role: 'Pengurus Keamanan & Ketertiban',
    category: 'keamanan',
    division: 'Seksi Keamanan, Aset & Siskamling',
    badge: 'KEAMANAN',
    avatarIcon: 'fa-solid fa-user-shield',
    glowClass: 'emerald-glow',
    colorHex: '#10b981',
    phone: '',
    tupoksi: 'Patroli berkala lingkungan, koordinasi dengan pihak keamanan gerbang perumahan Graha Asri, dan monitoring tamu luar 1x24 jam.'
  },
  {
    id: 'p-keamanan-3',
    name: 'RAHMAT',
    role: 'Penanggung Jawab Aset & Inventaris RT',
    category: 'keamanan',
    division: 'Pengelolaan Aset Fisik RT',
    badge: 'PENANGGUNG JAWAB ASSET',
    avatarIcon: 'fa-solid fa-boxes-stacked',
    glowClass: 'gold-glow',
    colorHex: '#f59e0b',
    phone: '',
    tupoksi: 'Mencatat, menyimpan, dan merawat seluruh barang inventaris milik RT.001 (tenda, kursi, genset, peralatan pos kamling, alat kebersihan, sound system).'
  },

  // Kerohanian
  {
    id: 'p-rohani-1',
    name: 'TARMIDI',
    role: 'Koordinator Sub Seksi PHBI',
    category: 'kerohanian',
    division: 'Peringatan Hari Besar Islam',
    badge: 'KOORD. PHBI',
    avatarIcon: 'fa-solid fa-mosque',
    glowClass: 'purple-glow',
    colorHex: '#8b5cf6',
    phone: '',
    tupoksi: 'Memimpin penyelenggaraan hari besar keagamaan (Maulid Nabi, Isra Miraj, Ramadhan, Halal bi Halal) didampingi Andira & Sulaiman.'
  },
  {
    id: 'p-rohani-2',
    name: 'NARNO',
    role: 'Koordinator Sub Seksi Qurban',
    category: 'kerohanian',
    division: 'Kepanitiaan Ibadah Qurban',
    badge: 'KOORD. QURBAN',
    avatarIcon: 'fa-solid fa-hands-praying',
    glowClass: 'emerald-glow',
    colorHex: '#10b981',
    phone: '',
    tupoksi: 'Mengkoordinir penerimaan hewan qurban Idul Adha, tata laksana pemotongan, penimbangan, dan distribusi paket qurban kepada warga bersama Jumari, Aswin & Rahmat.'
  },

  // Pemuda & Karang Taruna
  {
    id: 'p-pemuda-1',
    name: '(Dalam Pembentukan)',
    role: 'Ketua Seksi Pemuda & Olahraga',
    category: 'pemuda',
    division: 'Kepemudaan & Kebugaran Warga',
    badge: 'PEMUDA & OLAHRAGA',
    avatarIcon: 'fa-solid fa-medal',
    glowClass: 'gold-glow',
    colorHex: '#eab308',
    phone: '',
    tupoksi: 'Memfasilitasi keolahragaan warga (bulutangkis, tenis meja, jalan sehat) serta pembinaan bakat olahraga pemuda RT.001.'
  },
  {
    id: 'p-taruna-1',
    name: '(Generasi Muda RT.001)',
    role: 'Ketua Remaja Karang Taruna',
    category: 'pemuda',
    division: 'Kreativitas & Generasi Muda',
    badge: 'KARANG TARUNA',
    avatarIcon: 'fa-solid fa-people-group',
    glowClass: 'rose-glow',
    colorHex: '#f43f5e',
    phone: '',
    tupoksi: 'Wadah kreativitas remaja RT.001, pelaksana perlombaan HUT RI 17 Agustus, bakti sosial, dan kepedulian lingkungan generasi muda.'
  }
];

let currentOrgViewMode = 'tree'; // 'tree' | 'cards'
let currentOrgFilterCat = 'all';
let currentOrgSearchQuery = '';

/**
 * Render modul Struktur Pengurus RT.001 Periode 2022-2027
 */
function renderPengurusStruktur() {
  setupOrgControls();
  renderDynamicOrgCards();
  applyOrgFilter();
}

/**
 * Setup Event Listener untuk Tombol Mode, Filter Kategori, Search & Aksi
 */
function setupOrgControls() {
  // 1. Mode Switch: Tree vs Cards
  const btnTree = document.getElementById('btn-mode-tree');
  const btnCards = document.getElementById('btn-mode-cards');
  const treeContainer = document.getElementById('org-tree-container');
  const cardsContainer = document.getElementById('org-cards-container');

  if (btnTree && btnCards && !btnTree.dataset.bound) {
    btnTree.dataset.bound = 'true';

    btnTree.addEventListener('click', () => {
      currentOrgViewMode = 'tree';
      btnTree.classList.add('active');
      btnCards.classList.remove('active');
      if (treeContainer) treeContainer.style.display = 'block';
      if (cardsContainer) cardsContainer.style.display = 'none';
      applyOrgFilter();
    });

    btnCards.addEventListener('click', () => {
      currentOrgViewMode = 'cards';
      btnCards.classList.add('active');
      btnTree.classList.remove('active');
      if (treeContainer) treeContainer.style.display = 'none';
      if (cardsContainer) cardsContainer.style.display = 'block';
      renderDynamicOrgCards();
      applyOrgFilter();
    });
  }

  // 2. Filter Category Pills
  const catPills = document.querySelectorAll('.org-cat-pill');
  catPills.forEach(pill => {
    if (!pill.dataset.bound) {
      pill.dataset.bound = 'true';
      pill.addEventListener('click', () => {
        catPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        currentOrgFilterCat = pill.dataset.cat || 'all';
        applyOrgFilter();
      });
    }
  });

  // 3. Search Box Input
  const searchInput = document.getElementById('input-search-pengurus');
  const clearBtn = document.getElementById('btn-clear-search-pengurus');
  if (searchInput && !searchInput.dataset.bound) {
    searchInput.dataset.bound = 'true';
    searchInput.addEventListener('input', (e) => {
      currentOrgSearchQuery = (e.target.value || '').trim().toLowerCase();
      if (clearBtn) clearBtn.style.display = currentOrgSearchQuery ? 'inline-block' : 'none';
      applyOrgFilter();
    });
  }
  if (clearBtn && !clearBtn.dataset.bound) {
    clearBtn.dataset.bound = 'true';
    clearBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      currentOrgSearchQuery = '';
      clearBtn.style.display = 'none';
      applyOrgFilter();
    });
  }

  // 4. Tombol Cetak Bagan Resmi
  const printBtn = document.getElementById('btn-print-org');
  if (printBtn && !printBtn.dataset.bound) {
    printBtn.dataset.bound = 'true';
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // 5. Tombol Salin Kontak Pengurus
  const copyBtn = document.getElementById('btn-copy-org-contacts');
  if (copyBtn && !copyBtn.dataset.bound) {
    copyBtn.dataset.bound = 'true';
    copyBtn.addEventListener('click', () => {
      copyOrgContactsToClipboard();
    });
  }
}

/**
 * Filter item baik di mode Tree maupun mode Cards
 */
function applyOrgFilter() {
  const cat = currentOrgFilterCat;
  const q = currentOrgSearchQuery;

  // Filter Mode 1: Tree Nodes
  const treeNodes = document.querySelectorAll('#org-tree-container .org-node-card');
  treeNodes.forEach(node => {
    const nodeCat = node.getAttribute('data-category');
    const textContent = (node.textContent || '').toLowerCase();

    const matchesCat = (cat === 'all' || nodeCat === cat);
    const matchesQuery = (!q || textContent.includes(q));

    if (matchesCat && matchesQuery) {
      node.style.opacity = '1';
      node.style.filter = 'none';
      if (q || cat !== 'all') {
        node.style.borderColor = 'var(--gold-400)';
        node.style.boxShadow = '0 0 20px rgba(245, 158, 11, 0.4)';
      } else {
        node.style.borderColor = '';
        node.style.boxShadow = '';
      }
    } else {
      node.style.opacity = '0.25';
      node.style.filter = 'grayscale(80%)';
      node.style.boxShadow = 'none';
    }
  });

  // Filter Mode 2: Executive Cards Grid
  const cardItems = document.querySelectorAll('#org-cards-dynamic-grid .org-exec-card');
  cardItems.forEach(card => {
    const cardCat = card.getAttribute('data-category');
    const textContent = (card.textContent || '').toLowerCase();

    const matchesCat = (cat === 'all' || cardCat === cat);
    const matchesQuery = (!q || textContent.includes(q));

    card.style.display = (matchesCat && matchesQuery) ? 'flex' : 'none';
  });
}

/**
 * Render Katalog Kartu Eksekutif (Mode 2)
 */
function renderDynamicOrgCards() {
  const container = document.getElementById('org-cards-dynamic-grid');
  if (!container) return;

  container.innerHTML = PENGURUS_MASTER_DATA.map(p => {
    const waText = encodeURIComponent(`Halo Bapak/Ibu ${p.name} (${p.role} RT.001 Graha Asri), saya warga ingin berkoordinasi mengenai:`);
    const waUrl = p.phone ? `https://wa.me/${p.phone}?text=${waText}` : `https://wa.me/?text=${waText}`;

    return `
      <div class="org-exec-card glass-panel" data-category="${p.category}" id="card-${p.id}">
        <div>
          <div class="exec-card-top">
            <div class="exec-avatar ${p.glowClass}">
              <i class="${p.avatarIcon}"></i>
            </div>
            <div class="exec-info">
              <h4>${p.name}</h4>
              <span class="exec-role">${p.role}</span>
              <span class="exec-division">${p.division}</span>
              ${p.street ? `<span class="street-pill" style="margin-top:4px;">${p.street}</span>` : ''}
            </div>
          </div>

          <div class="exec-tupoksi">
            <strong><i class="fa-solid fa-list-check"></i> Tugas Pokok &amp; Fungsi (Tupoksi):</strong>
            ${p.tupoksi}
          </div>
        </div>

        <div class="exec-card-actions">
          <a href="${waUrl}" target="_blank" class="btn-exec-wa" title="Kirim Pesan WhatsApp Langsung">
            <i class="fa-brands fa-whatsapp"></i>
            <span>Hubungi Pengurus</span>
          </a>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Salin Daftar Kontak Lengkap ke Clipboard
 */
function copyOrgContactsToClipboard() {
  let doc = `📋 STRUKTUR KEPENGURUSAN RT.001 / RW.013 GRAHA ASRI (PERIODE 2022 - 2027)\n`;
  doc += `========================================================================\n\n`;

  doc += `👑 PUCUK PIMPINAN:\n`;
  doc += `• Ketua RT: FATKHURROHMAN (Komando Utama)\n\n`;

  doc += `🛡️ DEWAN PENASEHAT:\n`;
  doc += `1. DWI SUSANTO\n`;
  doc += `2. SUPARDI\n`;
  doc += `3. NARNO\n\n`;

  doc += `🏛️ PIMPINAN HARIAN (BPH):\n`;
  doc += `• Wakil Ketua RT: AMA JUPRI (Operasional Harian & Komando Seksi)\n`;
  doc += `• Sekretaris: ANDIRA H. P (Administrasi, Persuratan & Data 71 KK)\n`;
  doc += `• Bendahara 1: JUMARI S (Pembukuan Utama, Iuran Wajib & 6 Pos Kas)\n`;
  doc += `• Bendahara 2: OKTAVIANDRI (Uang Jimpitan Ronda Malam Minggu)\n\n`;

  doc += `🌿 SEKSI KEBERSIHAN & PEMBANGUNAN:\n`;
  doc += `1. HUTAGALUNG\n`;
  doc += `2. SAHIDIN\n\n`;

  doc += `📢 SEKSI HUMAS & SOSIAL (KOORDINATOR WILAYAH JALAN):\n`;
  doc += `• Jl. Citarum II    : KHOIRUL\n`;
  doc += `• Jl. Citarum IV    : MAMAN\n`;
  doc += `• Jl. Citarum VIIIB : SULAIMAN\n`;
  doc += `• Jl. Citarum VIIIC : RASJU\n`;
  doc += `• Jl. Citarum IX    : ZAINUDIN\n\n`;

  doc += `🔒 SEKSI KEAMANAN, ASET & KETERTIBAN:\n`;
  doc += `1. ASWIN PRANTAMA (Keamanan & Siskamling)\n`;
  doc += `2. AGUS NURSANTO  (Keamanan & Siskamling)\n`;
  doc += `3. RAHMAT         (Penanggung Jawab Aset & Inventaris RT)\n\n`;

  doc += `🕌 SEKSI KEROHANIAN:\n`;
  doc += `• Sub PHBI   : TARMIDI (Koordinator) | Anggota: 1. Andira, 2. Sulaiman\n`;
  doc += `• Sub Qurban : NARNO (Koordinator)   | Anggota: 1. Jumari, 2. Aswin, 3. Rahmat\n\n`;

  doc += `⚽ SEKSI PEMUDA & OLAHRAGA:\n`;
  doc += `• Ketua : (Dalam Pembentukan / Terbuka untuk Pemuda RT.001)\n\n`;

  doc += `🤝 REMAJA KARANG TARUNA:\n`;
  doc += `• Ketua : (Generasi Muda RT.001 / Kepanitiaan 17 Agustus)\n\n`;
  doc += `========================================================================\n`;
  doc += `Generated by RT-FinSmart PRO • Graha Asri, Cikarang Utara`;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(doc).then(() => {
      showToast('✅ Berhasil menyalin daftar lengkap Pengurus RT.001 ke Clipboard!', 'success');
    }).catch(() => {
      fallbackCopyText(doc);
    });
  } else {
    fallbackCopyText(doc);
  }
}

function fallbackCopyText(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand('copy');
    showToast('✅ Berhasil menyalin teks ke Clipboard!', 'success');
  } catch (err) {
    showToast('Gagal menyalin teks ke clipboard.', 'error');
  }
  document.body.removeChild(textArea);
}

// ==================== KELOLA & CETAK AKUN WARGA (112 KK) ====================

function renderResidentAccountsModal() {
  const tbody = document.getElementById('tbody-modal-accs');
  const countEl = document.getElementById('acc-modal-count');
  const searchVal = (document.getElementById('acc-modal-search')?.value || '').trim().toLowerCase();
  const filterBlock = document.getElementById('acc-modal-filter-block')?.value || 'ALL';

  if (!tbody) return;
  tbody.innerHTML = '';

  const filtered = (state.residents || []).filter(r => {
    const matchBlock = filterBlock === 'ALL' || r.block === filterBlock;
    const matchSearch = !searchVal ||
      r.name.toLowerCase().includes(searchVal) ||
      (r.username && r.username.toLowerCase().includes(searchVal)) ||
      (r.password && r.password.toLowerCase().includes(searchVal)) ||
      r.houseNo.toLowerCase().includes(searchVal) ||
      (r.street && r.street.toLowerCase().includes(searchVal)) ||
      (r.phone && r.phone.includes(searchVal));
    return matchBlock && matchSearch;
  });

  if (countEl) countEl.textContent = `${filtered.length} Warga`;

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 2rem; color: #94a3b8;"><i class="fa-solid fa-circle-info"></i> Tidak ada data warga yang cocok dengan pencarian.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(r => {
    return `
      <tr>
        <td style="font-weight: 600; color: #94a3b8;">${r.noUrut || '-'}</td>
        <td>
          <strong style="color: #fff; font-size: 0.92rem;">${r.name}</strong>
          <div style="font-size: 0.75rem; color: #34d399;"><i class="fa-brands fa-whatsapp"></i> ${r.phone || '-'}</div>
        </td>
        <td>
          <div style="color: #e2e8f0; font-size: 0.88rem;">${r.block} ${r.houseNo}</div>
          <div style="font-size: 0.74rem; color: #94a3b8;">${r.street || 'Jl. Citarum II'}</div>
        </td>
        <td>
          <span class="badge-credential-user">
            <i class="fa-solid fa-user-tag text-emerald"></i> ${r.username || r.name}
          </span>
        </td>
        <td>
          <span class="badge-credential-pwd font-mono">
            <i class="fa-solid fa-key text-gold"></i> ${r.password || '-'}
          </span>
        </td>
        <td style="text-align: right; white-space: nowrap;">
          <button type="button" class="btn btn-sm btn-outline-emerald btn-copy-cred" 
                  data-copy-user="${r.username || r.name}" 
                  data-copy-pass="${r.password || ''}" 
                  data-copy-name="${r.name}" 
                  data-copy-house="${r.block} ${r.houseNo}" 
                  title="Salin Format WhatsApp">
            <i class="fa-brands fa-whatsapp"></i> Salin WA
          </button>
          <button type="button" class="btn btn-sm btn-outline btn-edit-warga-from-modal" data-warga-id="${r.id}" title="Edit Data &amp; Sandi Warga">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function setupResidentAccountsEvents() {
  // Tombol buka modal akun warga
  document.getElementById('btn-open-modal-accounts')?.addEventListener('click', () => {
    document.getElementById('modal-resident-accounts')?.classList.add('active');
    renderResidentAccountsModal();
  });

  // Filter & Search input di modal akun warga
  document.getElementById('acc-modal-search')?.addEventListener('input', renderResidentAccountsModal);
  document.getElementById('acc-modal-filter-block')?.addEventListener('change', renderResidentAccountsModal);

  // Delegasi aksi Edit dari dalam modal akun warga
  document.getElementById('tbody-modal-accs')?.addEventListener('click', (e) => {
    const btnEdit = e.target.closest('.btn-edit-warga-from-modal');
    if (btnEdit) {
      const resId = btnEdit.getAttribute('data-warga-id');
      const res = state.residents.find(r => r.id === resId);
      if (res) {
        document.getElementById('modal-resident-accounts')?.classList.remove('active');
        document.getElementById('modal-warga-title').innerHTML = '<i class="fa-solid fa-user-pen text-gold"></i> Edit Data &amp; Akun Warga';
        document.getElementById('warga-edit-id').value = res.id;
        document.getElementById('warga-name').value = res.name;
        document.getElementById('warga-block').value = res.block;
        document.getElementById('warga-house-no').value = res.houseNo;
        document.getElementById('warga-phone').value = res.phone;
        document.getElementById('warga-domicile').value = res.domicile;
        document.getElementById('warga-family-members').value = res.members;

        const uInput = document.getElementById('warga-username');
        const pInput = document.getElementById('warga-password');
        if (uInput) uInput.value = res.username || res.name;
        if (pInput) pInput.value = res.password || '';

        document.getElementById('modal-warga')?.classList.add('active');
      }
    }
  });

  // Salin Semua Akun dalam Format WhatsApp
  document.getElementById('btn-copy-all-wa-accs')?.addEventListener('click', () => {
    const list = state.residents || [];
    let text = `🔑 *DAFTAR AKUN PORTAL WARGA RT.001 / RW.013*\n`;
    text += `Perumahan Graha Asri, Cikarang Utara\n`;
    text += `========================================\n\n`;

    list.forEach(r => {
      text += `${r.noUrut || '-'}. *${r.name}* (${r.block} ${r.houseNo})\n`;
      text += `   • Username: ${r.username || r.name}\n`;
      text += `   • Password: ${r.password || '-'}\n`;
      text += `   ------------------------------------\n`;
    });

    text += `\nSilakan login ke Portal Warga untuk memantau iuran & jadwal ronda.\nSalam hangat Pengurus RT.001`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast('✅ Berhasil menyalin seluruh akun 112 warga dalam format WhatsApp!', 'success');
      }).catch(() => {
        fallbackCopyText(text);
      });
    } else {
      fallbackCopyText(text);
    }
  });

  // Unduh CSV Akun Warga
  document.getElementById('btn-download-accs-csv')?.addEventListener('click', () => {
    const list = state.residents || [];
    let csv = 'NO,NAMA LENGKAP,JALAN,BLOK,NOMOR RUMAH,NO WHATSAPP,USERNAME LOGIN,PASSWORD RUMAH\n';
    list.forEach(r => {
      csv += `"${r.noUrut || ''}","${(r.name || '').replace(/"/g, '""')}","${r.street || ''}","${r.block || ''}","${r.houseNo || ''}","${r.phone || ''}","${(r.username || r.name).replace(/"/g, '""')}","${(r.password || '').replace(/"/g, '""')}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Daftar_Akun_Portal_Warga_RT001_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('✅ Berhasil mengunduh CSV data akun 112 warga!', 'success');
  });
}

// ==================== DASHBOARD PERSONAL PORTAL WARGA ====================

function renderPortalWarga() {
  const resident = state.currentVerifiedResident || (state.residents && state.residents[0]);
  if (!resident) return;

  // 1. Hero Card Info
  const heroName = document.getElementById('pw-hero-name');
  const heroStreet = document.getElementById('pw-hero-street');
  const heroBlockNo = document.getElementById('pw-hero-blockno');
  const heroDomicile = document.getElementById('pw-hero-domicile');
  const heroUsername = document.getElementById('pw-hero-username');
  const heroPassword = document.getElementById('pw-hero-password');
  const statMembers = document.getElementById('pw-stat-members');
  const statPhone = document.getElementById('pw-stat-phone');
  const statRondaWeek = document.getElementById('pw-stat-ronda-week');
  const statDuesStatus = document.getElementById('pw-stat-dues-status');

  if (heroName) heroName.textContent = resident.name;
  if (heroStreet) heroStreet.textContent = resident.street || 'Jl. Citarum II';
  if (heroBlockNo) heroBlockNo.textContent = `${resident.block} ${resident.houseNo}`;
  if (heroDomicile) heroDomicile.textContent = resident.domicile ? `Warga ${resident.domicile}` : 'Warga Tetap';
  if (heroUsername) heroUsername.textContent = resident.username || resident.name;
  if (heroPassword) heroPassword.textContent = resident.password || '-';
  if (statMembers) statMembers.textContent = `${resident.members || 4} Jiwa`;
  if (statPhone) statPhone.textContent = resident.phone || '-';

  // 2. Tentukan Kelompok Ronda Warga
  let assignedWeek = (resident.noUrut ? ((resident.noUrut - 1) % 4) + 1 : 1);
  const foundInGroup = (state.rondaGroups || []).find(g => 
    (g.leader && g.leader.name.toLowerCase() === resident.name.toLowerCase()) ||
    (g.members && g.members.some(m => m.name.toLowerCase() === resident.name.toLowerCase()))
  );
  if (foundInGroup) assignedWeek = foundInGroup.week;

  if (statRondaWeek) statRondaWeek.textContent = `Minggu ke-${assignedWeek}`;

  // Rincian Ronda Box
  const rondaBox = document.getElementById('pw-ronda-info-box');
  if (rondaBox) {
    const group = (state.rondaGroups || []).find(g => g.week === assignedWeek) || {
      week: assignedWeek,
      weekName: `Minggu ke-${assignedWeek}`,
      cycle: `Sabtu Ke-${assignedWeek} Tiap Bulan`,
      leader: { name: 'Komandan Regu', role: 'Penanggung Jawab' }
    };
    rondaBox.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
        <strong style="color:#fff; font-size:0.95rem;">${group.weekName} &bull; Regu ${group.week}</strong>
        <span style="font-size:0.75rem; color:#38bdf8; background:rgba(6,182,212,0.15); padding:2px 8px; border-radius:4px;">${group.cycle}</span>
      </div>
      <p style="margin:0 0 0.4rem 0; font-size:0.84rem; color:#cbd5e1;">
        <i class="fa-solid fa-user-shield text-gold"></i> Komandan Regu: <strong>${group.leader ? group.leader.name : 'Pak Hendra'}</strong>
      </p>
      <div style="font-size:0.78rem; color:#94a3b8; display:flex; align-items:center; gap:0.4rem;">
        <i class="fa-regular fa-clock text-cyan"></i> Pukul 22:00 WIB s/d 04:00 WIB &bull; Pos Ronda RT.001
      </div>
    `;
  }

  // 3. Matriks 12 Bulan Iuran Wajib Warga Tahun Berjalan (2026)
  const currentYear = state.selectedYear || 2026;
  const currentMonth = state.selectedMonth || 9;
  const resPayments = (state.payments || []).filter(
    p => p.residentId === resident.id && p.year === currentYear && !p.category
  );

  const monthsGrid = document.getElementById('pw-months-grid');
  if (monthsGrid) {
    monthsGrid.innerHTML = '';
    for (let m = 1; m <= 12; m++) {
      const isPaid = resPayments.some(p => p.month === m);
      const isCur = m === currentMonth;
      const cell = document.createElement('div');
      cell.className = `pw-month-cell ${isPaid ? 'paid' : 'unpaid'}`;
      if (isCur) cell.style.borderColor = isPaid ? '#10b981' : '#f59e0b';

      cell.innerHTML = `
        <div class="pw-month-name">
          ${MONTH_NAMES[m].substring(0, 3)} ${isCur ? '<small style="color:var(--gold-400); font-weight:700;">(Kini)</small>' : ''}
        </div>
        <span class="pw-month-status ${isPaid ? 'status-paid' : 'status-unpaid'}">
          ${isPaid ? '<i class="fa-solid fa-circle-check"></i> Lunas' : '<i class="fa-regular fa-circle"></i> Belum'}
        </span>
      `;
      monthsGrid.appendChild(cell);
    }
  }

  const isCurrentMonthPaid = resPayments.some(p => p.month === currentMonth);
  if (statDuesStatus) {
    statDuesStatus.textContent = isCurrentMonthPaid ? `Lunas ${MONTH_NAMES[currentMonth]}` : `Belum ${MONTH_NAMES[currentMonth]}`;
    statDuesStatus.className = isCurrentMonthPaid ? 'pw-stat-val text-emerald' : 'pw-stat-val text-rose';
  }

  const totalPaidNominal = resPayments.length * (state.mandatoryDues || 50000);
  const totalPaidEl = document.getElementById('pw-total-paid-nominal');
  if (totalPaidEl) totalPaidEl.textContent = formatRupiah(totalPaidNominal);

  const summaryBadge = document.getElementById('pw-iuran-summary-badge');
  if (summaryBadge) {
    summaryBadge.textContent = `${resPayments.length} / 12 Bulan Lunas`;
    summaryBadge.className = resPayments.length >= 9 ? 'badge-pill badge-emerald' : 'badge-pill badge-gold';
  }

  // 4. Riwayat Pengajuan Fasum Warga
  const requestsList = document.getElementById('pw-my-requests-list');
  if (requestsList) {
    const myRequests = (state.fundRequests || []).filter(
      fr => fr.residentId === resident.id || (fr.residentName && fr.residentName.toLowerCase() === resident.name.toLowerCase())
    );

    if (myRequests.length === 0) {
      requestsList.innerHTML = `
        <div style="text-align:center; padding: 1.25rem; background:rgba(15,23,42,0.45); border-radius:8px; color:#94a3b8; font-size:0.82rem;">
          <i class="fa-solid fa-inbox" style="font-size:1.5rem; margin-bottom:0.4rem; display:block; color:#64748b;"></i>
          Belum ada riwayat pengajuan fasilitas dari rumah ini.
        </div>
      `;
    } else {
      requestsList.innerHTML = myRequests.map(req => {
        let statusBadge = '<span class="status-badge status-pending">Menunggu</span>';
        if (req.status === 'approved') statusBadge = '<span class="status-badge status-approved">Disetujui</span>';
        else if (req.status === 'disbursed') statusBadge = '<span class="status-badge status-disbursed">Dicairkan</span>';
        else if (req.status === 'rejected') statusBadge = '<span class="status-badge status-rejected">Ditolak</span>';

        return `
          <div class="pw-req-item">
            <div>
              <strong style="color:#fff; font-size:0.86rem; display:block;">${req.title}</strong>
              <span style="font-size:0.75rem; color:#94a3b8;">${req.category || 'Fasilitas'} &bull; ${formatRupiah(req.amount || 0)}</span>
            </div>
            ${statusBadge}
          </div>
        `;
      }).join('');
    }
  }

  // Bind Tombol Kwitansi Terakhir
  const btnLastReceipt = document.getElementById('btn-pw-view-last-receipt');
  if (btnLastReceipt && !btnLastReceipt.dataset.bound) {
    btnLastReceipt.dataset.bound = 'true';
    btnLastReceipt.addEventListener('click', () => {
      const lastPay = resPayments[resPayments.length - 1] || (state.payments && state.payments[0]);
      if (!lastPay) {
        showToast('Belum ada riwayat pembayaran yang tercatat.', 'info');
        return;
      }
      openReceiptModal(lastPay);
    });
  }

  // Bind Tombol Konfirmasi WA ke Bendahara
  const btnConfirmWA = document.getElementById('btn-pw-confirm-wa');
  if (btnConfirmWA && !btnConfirmWA.dataset.bound) {
    btnConfirmWA.dataset.bound = 'true';
    btnConfirmWA.addEventListener('click', () => {
      const b1Phone = '081289060004'; // Bendahara 1 WhatsApp
      const waText = `Halo Bendahara 1 RT.001 / RW.013,\n\nSaya *${resident.name}* (${resident.block} ${resident.houseNo}) ingin konfirmasi pembayaran iuran bulanan RT sebesar Rp 50.000 untuk bulan ${MONTH_NAMES[currentMonth]} ${currentYear}.\n\nMohon dicek dan dicatatkan di sistem. Terima kasih! 🙏`;
      const waUrl = `https://wa.me/${b1Phone.replace(/\D/g, '')}?text=${encodeURIComponent(waText)}`;
      window.open(waUrl, '_blank');
    });
  }

  // Bind Tombol Ajukan Baru ke Modal Pengajuan Dana Portal Warga
  const btnOpenPengajuan = document.getElementById('btn-pw-open-pengajuan');
  if (btnOpenPengajuan && !btnOpenPengajuan.dataset.bound) {
    btnOpenPengajuan.dataset.bound = 'true';
    btnOpenPengajuan.addEventListener('click', () => {
      openPortalWargaPengajuanModal(resident);
    });
  }

  // Render Grafik Penerimaan Iuran Tahunan Detail Khusus Portal Warga
  try {
    renderWargaAnnualDuesChart();
  } catch (err) {
    console.warn('Gagal merender grafik iuran tahunan portal warga:', err);
  }
}

// ==================== MODAL PENGAJUAN DANA WARGA TERVERIFIKASI ====================

let pwUploadedPhotoUrl = '';

/**
 * Buka Modal Pengajuan Dana untuk Warga Terverifikasi di Portal Warga
 */
function openPortalWargaPengajuanModal(resident) {
  if (!resident) {
    showToast('Identitas warga tidak ditemukan. Silakan login kembali.', 'warning');
    return;
  }

  state.currentVerifiedResident = resident;

  // 1. Kunci Identitas Pemohon Sesuai Akun Login
  const nameEl = document.getElementById('pw-form-verified-name');
  if (nameEl) nameEl.textContent = resident.name;

  const addrEl = document.getElementById('pw-form-verified-address');
  if (addrEl) {
    addrEl.innerHTML = `<i class="fa-solid fa-house-chimney text-gold"></i> ${resident.street ? resident.street + ' &bull; ' : ''}Blok ${resident.block} No. ${resident.houseNo}`;
  }

  // 2. Prefill Kontak WhatsApp
  const waInput = document.getElementById('pw-form-whatsapp');
  if (waInput) {
    waInput.value = resident.phone || '';
  }

  // 3. Populate Opsi Pos Anggaran
  const posSelect = document.getElementById('pw-form-pos');
  if (posSelect) {
    let posHtml = '<option value="">-- Pilih Pos Pembebanan Anggaran --</option>';
    if (state.posConfig && state.posConfig.length) {
      state.posConfig.forEach(p => {
        posHtml += `<option value="${p.id}">${p.name}</option>`;
      });
    }
    if (state.otherPosConfig && state.otherPosConfig.length) {
      state.otherPosConfig.forEach(p => {
        posHtml += `<option value="${p.id}">${p.name}</option>`;
      });
    }
    posSelect.innerHTML = posHtml;
    // Default pos pembangunan / fasum jika ada
    posSelect.value = 'pembangunan';
    if (!posSelect.value && state.posConfig && state.posConfig[0]) {
      posSelect.value = state.posConfig[0].id;
    }
  }

  // 4. Reset Field Form
  const katSelect = document.getElementById('pw-form-kategori');
  if (katSelect) katSelect.value = '';
  const judulInput = document.getElementById('pw-form-judul');
  if (judulInput) judulInput.value = '';
  const nominalInput = document.getElementById('pw-form-nominal');
  if (nominalInput) nominalInput.value = '';
  const urgensiSelect = document.getElementById('pw-form-urgensi');
  if (urgensiSelect) urgensiSelect.value = 'Normal';
  const lokasiInput = document.getElementById('pw-form-lokasi');
  if (lokasiInput) lokasiInput.value = '';
  const deskripsiInput = document.getElementById('pw-form-deskripsi');
  if (deskripsiInput) deskripsiInput.value = '';

  // Reset file photo & preview
  pwUploadedPhotoUrl = '';
  const fileInput = document.getElementById('pw-form-file');
  if (fileInput) fileInput.value = '';
  const previewWrap = document.getElementById('pw-upload-preview');
  if (previewWrap) previewWrap.style.display = 'none';

  openModal('modal-pw-pengajuan-dana');
}

/**
 * Inisialisasi Event Listener Modal Pengajuan Dana Portal Warga
 */
function setupPortalWargaFundRequest() {
  // 1. Format Nominal Rupiah Otomatis
  const nominalInput = document.getElementById('pw-form-nominal');
  if (nominalInput && !nominalInput.dataset.bound) {
    nominalInput.dataset.bound = 'true';
    nominalInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '');
      e.target.value = val ? Number(val).toLocaleString('id-ID') : '';
    });
  }

  // 2. Upload & Hapus Foto Bukti Fisik
  const fileInput = document.getElementById('pw-form-file');
  const previewWrap = document.getElementById('pw-upload-preview');
  const previewImg = document.getElementById('pw-preview-img');
  const removeImgBtn = document.getElementById('btn-pw-remove-img');

  if (fileInput && !fileInput.dataset.bound) {
    fileInput.dataset.bound = 'true';
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          showToast('Ukuran foto maksimal 5 MB!', 'warning');
          fileInput.value = '';
          return;
        }
        const reader = new FileReader();
        reader.onload = (evt) => {
          pwUploadedPhotoUrl = evt.target.result;
          if (previewImg) previewImg.src = pwUploadedPhotoUrl;
          if (previewWrap) previewWrap.style.display = 'block';
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (removeImgBtn && !removeImgBtn.dataset.bound) {
    removeImgBtn.dataset.bound = 'true';
    removeImgBtn.addEventListener('click', (e) => {
      e.preventDefault();
      pwUploadedPhotoUrl = '';
      if (fileInput) fileInput.value = '';
      if (previewWrap) previewWrap.style.display = 'none';
    });
  }

  // 3. Submit Formulir Pengajuan Dana Warga
  const form = document.getElementById('form-pw-pengajuan-dana');
  if (form && !form.dataset.bound) {
    form.dataset.bound = 'true';
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const resident = state.currentVerifiedResident;
      if (!resident) {
        showToast('Sesi warga berakhir. Silakan login kembali.', 'error');
        closeModal('modal-pw-pengajuan-dana');
        showLoginOverlay();
        return;
      }

      const kategori   = document.getElementById('pw-form-kategori')?.value.trim();
      const posSelect  = document.getElementById('pw-form-pos');
      const posId      = posSelect ? posSelect.value : 'pembangunan';
      const posName    = posSelect && posSelect.selectedOptions[0] ? posSelect.selectedOptions[0].text : posId;
      const judul      = document.getElementById('pw-form-judul')?.value.trim();
      const rawNominal = (document.getElementById('pw-form-nominal')?.value || '').replace(/\D/g, '');
      const nominal    = Number(rawNominal);
      const urgensi    = document.getElementById('pw-form-urgensi')?.value || 'Normal';
      const lokasi     = document.getElementById('pw-form-lokasi')?.value.trim();
      const whatsapp   = document.getElementById('pw-form-whatsapp')?.value.trim();
      const deskripsi  = document.getElementById('pw-form-deskripsi')?.value.trim();
      const sendWA     = document.getElementById('pw-form-wa-notify')?.checked;

      if (!kategori) {
        showToast('Pilih Kategori Fasilitas / Keperluan.', 'warning');
        return;
      }
      if (!judul) {
        showToast('Masukkan Judul Pengajuan Dana.', 'warning');
        return;
      }
      if (!nominal || nominal <= 0) {
        showToast('Masukkan estimasi biaya yang diajukan (minimal Rp 1).', 'warning');
        return;
      }
      if (!lokasi) {
        showToast('Masukkan titik lokasi fasilitas.', 'warning');
        return;
      }
      if (!whatsapp) {
        showToast('Masukkan nomor WhatsApp pemohon yang aktif.', 'warning');
        return;
      }
      if (!deskripsi) {
        showToast('Masukkan rincian kebutuhan dan alasan pengajuan.', 'warning');
        return;
      }

      // Buat ID Registrasi Unik
      const now = new Date();
      const yearMonth = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}`;
      const count = (state.fundRequests || []).length + 1;
      const reqId = `DANA-${yearMonth}-${String(count).padStart(3, '0')}`;
      const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

      const newRequest = {
        id: reqId,
        residentId: resident.id,
        residentName: resident.name,
        address: `${resident.street ? resident.street + ' ' : ''}${resident.block} ${resident.houseNo}`,
        phone: whatsapp,
        category: kategori,
        targetPos: posId,
        targetPosName: posName,
        title: judul,
        amount: nominal,
        urgency: urgensi,
        location: lokasi,
        description: deskripsi,
        date: dateStr,
        status: 'pending', // 'pending' | 'approved' | 'disbursed' | 'rejected'
        adminNote: '',
        photoUrl: pwUploadedPhotoUrl || ''
      };

      if (!state.fundRequests) state.fundRequests = [];
      state.fundRequests.unshift(newRequest);
      saveState();

      closeModal('modal-pw-pengajuan-dana');

      // Update Tampilan Portal Warga
      renderPortalWarga();

      // Update Tampilan Admin
      if (typeof renderAdminFundRequests === 'function') renderAdminFundRequests();
      if (typeof updateFundRequestBadges === 'function') updateFundRequestBadges();

      showToast(`🎉 Permohonan ${reqId} berhasil dikirim! Pengurus RT akan segera meninjau proposal Anda.`, 'success');

      // Opsi Kirim WhatsApp ke Pengurus
      if (sendWA) {
        const waText = 
`*PEMBERITAHUAN PENGAJUAN DANA FASUM RT.001 / RW.013*
---------------------------------------
No. Registrasi : *${newRequest.id}*
Tanggal       : ${newRequest.date} WIB
Pemohon       : *${newRequest.residentName}* (Warga Terverifikasi)
Alamat        : ${newRequest.address}
No. WhatsApp  : ${newRequest.phone}

*Rincian Pengajuan:*
Kategori      : ${newRequest.category}
Judul Usulan  : *${newRequest.title}*
Pos Anggaran  : ${newRequest.targetPosName}
Estimasi Biaya: *Rp ${Number(newRequest.amount).toLocaleString('id-ID')}*
Tingkat Urgensi: ${newRequest.urgency}
Titik Lokasi  : ${newRequest.location}

*Rincian & Kebutuhan:*
"${newRequest.description}"
---------------------------------------
Pengajuan diajukan secara resmi melalui Portal Mandiri Warga RT.001. Mohon Pengurus meninjau di sistem RT-FinSmart PRO. Terima kasih! 🙏`;

        const encoded = encodeURIComponent(waText);
        window.open(`https://wa.me/?text=${encoded}`, '_blank');
      }
    });
  }
}

// Inisialisasi otomatis
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setupPortalWargaFundRequest();
    setupPortalWargaESurat();
    setupPortalWargaAspirasi();
    setupPengurusOperationalHub();
  });
} else {
  setupPortalWargaFundRequest();
  setupPortalWargaESurat();
  setupPortalWargaAspirasi();
  setupPengurusOperationalHub();
}

// ==================== PORTAL WARGA: e-SURAT PENGANTAR RT MANDIRI ====================

function setupPortalWargaESurat() {
  const btnOpenSurat = document.getElementById('btn-pw-open-surat');
  const formSurat = document.getElementById('form-pw-surat-pengantar');
  const btnPreviewSurat = document.getElementById('btn-action-preview-surat');
  const btnDoPrint = document.getElementById('btn-do-print-surat');

  if (btnOpenSurat) {
    btnOpenSurat.addEventListener('click', () => {
      const resident = state.currentVerifiedResident || (state.residents && state.residents[0]) || {
        name: 'Bapak Wageyanto',
        block: 'B6',
        houseNo: '02',
        street: 'Jl. Citarum II'
      };

      const inpNama = document.getElementById('surat-form-nama');
      const inpAlamat = document.getElementById('surat-form-alamat');
      const inpNik = document.getElementById('surat-form-nik');

      if (inpNama) inpNama.value = resident.name;
      if (inpAlamat) inpAlamat.value = `${resident.street || 'Jl. Citarum II'} ${resident.block} ${resident.houseNo}, RT.001 / RW.013`;
      if (inpNik && !inpNik.value) {
        inpNik.value = resident.nik || `32160212058${String(resident.noUrut || 2).padStart(5, '0')}`;
      }

      openModal('modal-pw-surat-pengantar');
    });
  }

  function updatePrintSheetData() {
    const resident = state.currentVerifiedResident || (state.residents && state.residents[0]) || { name: 'Bapak Wageyanto' };
    const nama = document.getElementById('surat-form-nama')?.value || resident.name;
    const nik = document.getElementById('surat-form-nik')?.value || '3216021205800002';
    const alamat = document.getElementById('surat-form-alamat')?.value || 'Jl. Citarum II Blok B6 No. 02';
    const jenisEl = document.getElementById('surat-form-jenis');
    const keperluan = document.getElementById('surat-form-keperluan')?.value || 'Persyaratan administrasi kependudukan';
    const jenisTeks = jenisEl ? jenisEl.options[jenisEl.selectedIndex].text : 'Surat Pengantar RT';

    const now = new Date();
    const bulanRomawi = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
    const tglStr = `${now.getDate()} ${MONTH_NAMES[now.getMonth() + 1]} ${now.getFullYear()}`;
    const noSurat = `470 / ${String(Math.floor(Math.random() * 40) + 10).padStart(3, '0')} / RT.001-RW.013 / ${bulanRomawi[now.getMonth()]} / ${now.getFullYear()}`;

    const pNama = document.getElementById('print-surat-nama');
    const pNik = document.getElementById('print-surat-nik');
    const pAlamat = document.getElementById('print-surat-alamat');
    const pKeperluan = document.getElementById('print-surat-keperluan');
    const pTanggal = document.getElementById('print-surat-tanggal');
    const pNomor = document.getElementById('print-surat-nomor');
    const pPemohon = document.getElementById('print-ttd-pemohon');
    const pStatus = document.getElementById('print-surat-status');

    if (pNama) pNama.textContent = nama;
    if (pNik) pNik.textContent = nik;
    if (pAlamat) pAlamat.textContent = alamat;
    if (pKeperluan) pKeperluan.textContent = `${jenisTeks} - ${keperluan}`;
    if (pTanggal) pTanggal.textContent = tglStr;
    if (pNomor) pNomor.textContent = `Nomor: ${noSurat}`;
    if (pPemohon) pPemohon.textContent = nama;
    if (pStatus) pStatus.textContent = resident.domicile ? `Warga ${resident.domicile} Terdaftar` : 'Warga Tetap Terdaftar';
  }

  if (btnPreviewSurat) {
    btnPreviewSurat.addEventListener('click', () => {
      updatePrintSheetData();
      openModal('modal-pw-preview-surat');
    });
  }

  if (btnDoPrint) {
    btnDoPrint.addEventListener('click', () => {
      window.print();
    });
  }

  if (formSurat) {
    formSurat.addEventListener('submit', (e) => {
      e.preventDefault();
      updatePrintSheetData();

      const resident = state.currentVerifiedResident || (state.residents && state.residents[0]) || { name: 'Bapak Wageyanto' };
      const nama = document.getElementById('surat-form-nama')?.value || resident.name;
      const nik = document.getElementById('surat-form-nik')?.value || '-';
      const alamat = document.getElementById('surat-form-alamat')?.value || '-';
      const jenisEl = document.getElementById('surat-form-jenis');
      const jenisTeks = jenisEl ? jenisEl.options[jenisEl.selectedIndex].text : 'Surat Pengantar RT';
      const keperluan = document.getElementById('surat-form-keperluan')?.value || '-';

      const now = new Date();
      const tglStr = `${now.getDate()} ${MONTH_NAMES[now.getMonth() + 1]} ${now.getFullYear()}`;

      closeModal('modal-pw-surat-pengantar');
      showToast('✅ Pengajuan e-Surat Pengantar berhasil dibuat!', 'success');

      // Buka pesan WhatsApp resmi ke Ketua RT
      const waKetuaRT = '081289060001';
      const waMessage = 
`*PERMOHONAN RESMI e-SURAT PENGANTAR RT.001 / RW.013*
---------------------------------------
Tanggal    : ${tglStr}
Pemohon    : *${nama}* (Warga Terverifikasi)
NIK        : ${nik}
Alamat     : ${alamat}
Jenis Surat: *${jenisTeks}*
Keperluan  : "${keperluan}"

Mohon Bapak Ketua RT.001 (Bpk. Maryanto) berkenan memberikan pengesahan / tanda tangan resmi. Pengajuan telah tercatat secara digital di sistem RT-FinSmart PRO. Terima kasih! 🙏`;

      window.open(`https://wa.me/${waKetuaRT}?text=${encodeURIComponent(waMessage)}`, '_blank');
    });
  }
}

// ==================== PORTAL WARGA: KOTAK ASPIRASI & MASUKAN ====================

function setupPortalWargaAspirasi() {
  const btnOpenAspirasi = document.getElementById('btn-pw-open-aspirasi');
  const formAspirasi = document.getElementById('form-pw-aspirasi');

  if (btnOpenAspirasi) {
    btnOpenAspirasi.addEventListener('click', () => {
      const resident = state.currentVerifiedResident || (state.residents && state.residents[0]) || {
        name: 'Bapak Wageyanto',
        block: 'B6',
        houseNo: '02'
      };
      const inpNama = document.getElementById('aspirasi-nama');
      if (inpNama) inpNama.value = `${resident.name} (${resident.block} ${resident.houseNo})`;
      openModal('modal-pw-aspirasi');
    });
  }

  if (formAspirasi) {
    formAspirasi.addEventListener('submit', (e) => {
      e.preventDefault();
      const resident = state.currentVerifiedResident || (state.residents && state.residents[0]) || { name: 'Warga' };
      const kategoriEl = document.getElementById('aspirasi-kategori');
      const katTeks = kategoriEl ? kategoriEl.options[kategoriEl.selectedIndex].text : 'Umum';
      const pesan = document.getElementById('aspirasi-pesan')?.value || '';

      if (!state.aspirations) state.aspirations = [];
      const newAsp = {
        id: `ASP-${Date.now()}`,
        residentName: resident.name,
        address: `${resident.block || 'B6'} ${resident.houseNo || '02'}`,
        category: katTeks,
        message: pesan,
        date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
      };
      state.aspirations.unshift(newAsp);
      saveState();

      closeModal('modal-pw-aspirasi');
      showToast('💌 Terima kasih! Aspirasi Anda telah terkirim kepada pengurus RT.001.', 'success');

      // Forward WA ke Pengurus RT
      const waText = `*ASPIRASI WARGA RT.001 / RW.013*\n---------------------------------------\nPengirim : *${newAsp.residentName}* (${newAsp.address})\nKategori : ${newAsp.category}\n\n*Pesan / Masukan:*\n"${newAsp.message}"\n\nTerkirim via Portal Mandiri Warga RT.001.`;
      window.open(`https://wa.me/?text=${encodeURIComponent(waText)}`, '_blank');
    });
  }
}

// ==================== PORTAL PENGURUS OPERATIONAL HUB ====================

let currentVerifikasiFilter = 'all';

function setupPengurusOperationalHub() {
  // 1. Tab switching
  const tabBtns = document.querySelectorAll('.pengurus-tab-btn[data-pengurus-tab]');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-pengurus-tab');
      switchPengurusTab(tabId);
    });
  });

  // 2. Setup Submodules
  setupPengurusVerifikasiEvents();
  setupPengurusBukuIndukEvents();
  setupBroadcastGenerator();
}

function switchPengurusTab(tabId) {
  document.querySelectorAll('.pengurus-tab-btn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-pengurus-tab') === tabId);
  });

  const panels = {
    'struktur': 'pengurus-tab-panel-struktur',
    'verifikasi': 'pengurus-tab-panel-verifikasi',
    'buku-induk': 'pengurus-tab-panel-buku-induk',
    'broadcast': 'pengurus-tab-panel-broadcast'
  };

  Object.keys(panels).forEach(key => {
    const el = document.getElementById(panels[key]);
    if (el) el.style.display = (key === tabId) ? 'block' : 'none';
  });

  if (tabId === 'verifikasi') {
    renderPengurusVerifikasiList(currentVerifikasiFilter);
  } else if (tabId === 'buku-induk') {
    renderBukuIndukWarga();
  } else if (tabId === 'broadcast') {
    updateBroadcastPreview();
  }
}

function setupPengurusVerifikasiEvents() {
  // Filter buttons
  document.querySelectorAll('.btn-filter-verifikasi[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.btn-filter-verifikasi').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentVerifikasiFilter = btn.getAttribute('data-filter') || 'all';
      renderPengurusVerifikasiList(currentVerifikasiFilter);
    });
  });

  // Refresh button
  document.getElementById('btn-refresh-pengurus-verifikasi')?.addEventListener('click', () => {
    renderPengurusVerifikasiList(currentVerifikasiFilter);
    showToast('Data pengajuan fasum diperbarui.', 'info');
  });
}

function renderPengurusVerifikasiList(filter = 'all') {
  const container = document.getElementById('pengurus-verifikasi-list');
  if (!container) return;

  const requests = state.fundRequests || [];

  // Update counts
  const countAll = requests.length;
  const countPending = requests.filter(r => r.status === 'pending').length;
  const countApproved = requests.filter(r => r.status === 'approved').length;
  const countDisbursed = requests.filter(r => r.status === 'disbursed').length;
  const countRejected = requests.filter(r => r.status === 'rejected').length;

  const elAll = document.getElementById('count-verif-all');
  const elPending = document.getElementById('count-verif-pending');
  const elApproved = document.getElementById('count-verif-approved');
  const elDisbursed = document.getElementById('count-verif-disbursed');
  const elRejected = document.getElementById('count-verif-rejected');
  const elBadge = document.getElementById('pengurus-tab-badge-usulan');

  if (elAll) elAll.textContent = countAll;
  if (elPending) elPending.textContent = countPending;
  if (elApproved) elApproved.textContent = countApproved;
  if (elDisbursed) elDisbursed.textContent = countDisbursed;
  if (elRejected) elRejected.textContent = countRejected;
  if (elBadge) {
    elBadge.textContent = countPending;
    elBadge.style.display = countPending > 0 ? 'inline-block' : 'none';
  }

  const filtered = requests.filter(r => {
    if (filter === 'all') return true;
    return r.status === filter;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: #94a3b8; background: rgba(15,23,42,0.45); border-radius: 14px;">
        <i class="fa-solid fa-clipboard-check" style="font-size: 2.5rem; color: #64748b; margin-bottom: 0.75rem; display: block;"></i>
        <h4 style="color:#cbd5e1; margin:0 0 0.25rem 0;">Tidak Ada Usulan Fasum ${filter !== 'all' ? `dengan Status "${filter}"` : ''}</h4>
        <p style="margin:0; font-size:0.85rem;">Semua usulan warga telah diproses atau belum ada usulan baru yang masuk.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(req => {
    let statusClass = 'status-pending';
    let statusTeks = 'Menunggu Review';
    if (req.status === 'approved') { statusClass = 'status-approved'; statusTeks = 'Disetujui Pengurus'; }
    else if (req.status === 'disbursed') { statusClass = 'status-disbursed'; statusTeks = 'Dana Dicairkan'; }
    else if (req.status === 'rejected') { statusClass = 'status-rejected'; statusTeks = 'Ditolak'; }

    const urgencyColor = req.urgency === 'Mendesak' ? 'text-rose' : (req.urgency === 'Tinggi' ? 'text-gold' : 'text-emerald');

    return `
      <div class="pengurus-prop-card" data-req-id="${req.id}">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:0.5rem;">
          <div>
            <span style="font-size:0.75rem; color:#94a3b8; font-family:monospace; font-weight:bold;">${req.id}</span>
            <h4 style="margin:0.15rem 0 0 0; color:#fff; font-size:1.02rem;">${req.title}</h4>
          </div>
          <span class="status-badge ${statusClass}">${statusTeks}</span>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.04); padding:0.6rem 0.85rem; border-radius:8px;">
          <div>
            <span style="font-size:0.75rem; color:#94a3b8; display:block;">Estimasi Biaya:</span>
            <strong class="text-gold" style="font-size:1.05rem;">${formatCurrency(req.amount || 0)}</strong>
          </div>
          <div style="text-align:right;">
            <span style="font-size:0.75rem; color:#94a3b8; display:block;">Pos Pembebanan:</span>
            <span style="font-size:0.82rem; color:#38bdf8; font-weight:600;">${req.targetPosName || 'Pos Pembangunan & Fasum'}</span>
          </div>
        </div>

        <div style="font-size:0.82rem; color:#cbd5e1; display:flex; flex-direction:column; gap:0.35rem;">
          <div><i class="fa-solid fa-user text-purple"></i> Pemohon: <strong>${req.residentName}</strong> (${req.address})</div>
          <div><i class="fa-solid fa-location-dot text-rose"></i> Lokasi: ${req.location}</div>
          <div><i class="fa-solid fa-triangle-exclamation ${urgencyColor}"></i> Urgensi: <strong class="${urgencyColor}">${req.urgency || 'Normal'}</strong> &bull; <i class="fa-regular fa-calendar"></i> ${req.date}</div>
        </div>

        <div style="background:rgba(0,0,0,0.25); border-left:3px solid #06b6d4; padding:0.5rem 0.75rem; font-size:0.8rem; color:#e2e8f0; border-radius:0 6px 6px 0;">
          "${req.description}"
        </div>

        <!-- Action buttons for Pengurus -->
        <div style="display:flex; gap:0.5rem; margin-top:auto; padding-top:0.5rem; border-top:1px solid rgba(255,255,255,0.06); flex-wrap:wrap;">
          ${req.status === 'pending' ? `
            <button type="button" class="btn btn-sm btn-emerald flex-grow-1 btn-act-approve" data-id="${req.id}">
              <i class="fa-solid fa-check"></i> Setujui
            </button>
            <button type="button" class="btn btn-sm btn-outline-danger btn-act-reject" data-id="${req.id}" style="border-color:#f43f5e; color:#f43f5e;">
              <i class="fa-solid fa-xmark"></i> Tolak
            </button>
          ` : ''}
          ${req.status === 'approved' ? `
            <button type="button" class="btn btn-sm btn-cyan flex-grow-1 btn-act-disburse" data-id="${req.id}">
              <i class="fa-solid fa-money-bill-transfer"></i> Cairkan Dana
            </button>
          ` : ''}
          <button type="button" class="btn btn-sm btn-outline-emerald btn-act-wa" data-phone="${req.phone}" data-title="${req.title}" title="Hubungi Pemohon via WA">
            <i class="fa-brands fa-whatsapp"></i> Hubungi
          </button>
        </div>
      </div>
    `;
  }).join('');

  // Bind Actions
  container.querySelectorAll('.btn-act-approve').forEach(b => {
    b.addEventListener('click', () => {
      const id = b.getAttribute('data-id');
      const item = (state.fundRequests || []).find(r => r.id === id);
      if (item) {
        item.status = 'approved';
        saveState();
        renderPengurusVerifikasiList(currentVerifikasiFilter);
        showToast(`✅ Usulan ${id} telah disetujui Pengurus RT!`, 'success');
      }
    });
  });

  container.querySelectorAll('.btn-act-disburse').forEach(b => {
    b.addEventListener('click', () => {
      const id = b.getAttribute('data-id');
      const item = (state.fundRequests || []).find(r => r.id === id);
      if (item) {
        item.status = 'disbursed';
        saveState();
        renderPengurusVerifikasiList(currentVerifikasiFilter);
        showToast(`💰 Dana usulan ${id} telah dicairkan!`, 'success');
      }
    });
  });

  container.querySelectorAll('.btn-act-reject').forEach(b => {
    b.addEventListener('click', () => {
      const id = b.getAttribute('data-id');
      const reason = prompt('Masukkan alasan penolakan/catatan evaluasi untuk warga:');
      if (reason !== null) {
        const item = (state.fundRequests || []).find(r => r.id === id);
        if (item) {
          item.status = 'rejected';
          item.adminNote = reason;
          saveState();
          renderPengurusVerifikasiList(currentVerifikasiFilter);
          showToast(`❌ Usulan ${id} ditolak dengan catatan evaluasi.`, 'info');
        }
      }
    });
  });

  container.querySelectorAll('.btn-act-wa').forEach(b => {
    b.addEventListener('click', () => {
      const phone = b.getAttribute('data-phone') || '081289060002';
      const title = b.getAttribute('data-title') || 'Usulan Fasum';
      const msg = `Halo Bapak/Ibu,\n\nKami dari Pengurus RT.001 / RW.013 ingin menindaklanjuti usulan Anda mengenai *${title}*.\n\nTerima kasih! 🙏`;
      window.open(`https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`, '_blank');
    });
  });
}

function setupPengurusBukuIndukEvents() {
  const inputSearch = document.getElementById('input-search-buku-induk');
  const selectStreet = document.getElementById('select-buku-induk-street');
  const btnExport = document.getElementById('btn-export-buku-induk-csv');

  if (inputSearch) {
    inputSearch.addEventListener('input', () => {
      renderBukuIndukWarga(inputSearch.value, selectStreet ? selectStreet.value : 'all');
    });
  }

  if (selectStreet) {
    selectStreet.addEventListener('change', () => {
      renderBukuIndukWarga(inputSearch ? inputSearch.value : '', selectStreet.value);
    });
  }

  if (btnExport) {
    btnExport.addEventListener('click', () => {
      exportBukuIndukCSV();
    });
  }
}

function renderBukuIndukWarga(query = '', street = 'all') {
  const tbody = document.getElementById('tbody-buku-induk-warga');
  if (!tbody) return;

  const residents = (state.residents && state.residents.length > 0) ? state.residents : INITIAL_RESIDENTS;
  const q = (query || '').toLowerCase().trim();

  const filtered = residents.filter(r => {
    const matchStreet = (street === 'all') || (r.street === street);
    const matchQuery = !q || (
      (r.name && r.name.toLowerCase().includes(q)) ||
      (r.block && r.block.toLowerCase().includes(q)) ||
      (r.houseNo && r.houseNo.toLowerCase().includes(q)) ||
      (r.phone && r.phone.includes(q))
    );
    return matchStreet && matchQuery;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" style="text-align:center; padding:2rem; color:#94a3b8;">
          <i class="fa-solid fa-users-slash" style="font-size:1.8rem; margin-bottom:0.5rem; display:block; color:#64748b;"></i>
          Data warga tidak ditemukan sesuai kata kunci atau filter jalan.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map((r, idx) => {
    const rondaWeek = (r.noUrut ? ((r.noUrut - 1) % 4) + 1 : 1);
    const phoneClean = (r.phone || '081289060002').replace(/\D/g, '');
    const domicileTag = r.domicile === 'Kontrak' ? '<span class="badge-gold-pill" style="font-size:0.72rem;">Kontrak</span>' : '<span class="badge-emerald-pill" style="font-size:0.72rem;">Tetap</span>';

    return `
      <tr>
        <td style="font-size:0.8rem; color:#94a3b8; text-align:center;">${idx + 1}</td>
        <td><strong class="text-gold" style="font-family:monospace;">${r.block} ${r.houseNo}</strong></td>
        <td><strong style="color:#fff;">${r.name}</strong></td>
        <td style="color:#cbd5e1; font-size:0.85rem;">${r.street || 'Jl. Citarum II'}</td>
        <td style="text-align:center; font-size:0.85rem;">${r.members || 4} Jiwa</td>
        <td>${domicileTag}</td>
        <td><span style="font-size:0.78rem; color:#38bdf8; background:rgba(6,182,212,0.15); padding:2px 8px; border-radius:4px;">Minggu ke-${rondaWeek}</span></td>
        <td style="text-align:center;">
          <a href="https://wa.me/${phoneClean}" target="_blank" class="btn btn-sm btn-outline-emerald" style="padding:0.25rem 0.65rem; font-size:0.75rem; text-decoration:none;">
            <i class="fa-brands fa-whatsapp"></i> WA
          </a>
        </td>
      </tr>
    `;
  }).join('');
}

function exportBukuIndukCSV() {
  const residents = (state.residents && state.residents.length > 0) ? state.residents : INITIAL_RESIDENTS;
  let csv = 'No,Blok,No_Rumah,Nama_Kepala_Keluarga,Ruas_Jalan,Jiwa,Status_Hunian,No_WhatsApp\n';
  residents.forEach((r, idx) => {
    csv += `${idx + 1},"${r.block}","${r.houseNo}","${r.name}","${r.street || 'Jl. Citarum II'}",${r.members || 4},"${r.domicile || 'Tetap'}","${r.phone || '-'}"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Buku_Induk_Kependudukan_RT001_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast('✅ Berhasil mengunduh Buku Induk 71 KK (CSV)!', 'success');
}

// ==================== BROADCAST WA GENERATOR UNTUK PENGURUS ====================

const BROADCAST_TEMPLATES = {
  'kerja-bakti': (agenda) => 
`*PENGUMUMAN KERJA BAKTI & FOGGING RT.001 / RW.013*
---------------------------------------
Kepada Yth.
Bapak/Ibu Warga RT.001 / RW.013 Perumahan Graha Asri

Dalam rangka menjaga kebersihan saluran drainase, mengantisipasi genangan musim hujan, dan pencegahan jentik nyamuk DBD, Pengurus RT mengundang seluruh warga untuk hadir dalam:

🗓 *Hari / Tanggal* : Minggu, 20 September 2026
⏰ *Waktu*          : 07.00 WIB s/d Selesai
📍 *Titik Kumpul*   : Depan Pos Ronda RT.001 / Blok B6
🎯 *Agenda*         : ${agenda || 'Kerja Bakti Massal, Normalisasi Selokan Got & Fogging Nyamuk'}

Perlengkapan yang disarankan dibawa: cangkul, sekop, sapu lidi, dan karung sampah. Konsumsi ringan & bubuk abate disediakan oleh Pengurus.

Atas partisipasi dan semangat guyub rukun seluruh warga, kami ucapkan terima kasih. 🙏

_Salam Guyub Rukun,_
*Pengurus RT.001 / RW.013 Graha Asri*`,

  'rapat-warga': (agenda) => 
`*UNDANGAN RAPAT KOORDINASI WARGA RT.001 / RW.013*
---------------------------------------
Kepada Yth.
Bapak/Ibu Kepala Keluarga RT.001 / RW.013

Mengharap kehadiran Bapak/Ibu dalam rangka Rapat Koordinasi dan Evaluasi Keuangan Semester II Tahun 2026 yang akan dilaksanakan pada:

🗓 *Hari / Tanggal* : Sabtu Malam, 26 September 2026
⏰ *Waktu*          : 19.30 WIB (Ba'da Isya) s/d Selesai
📍 *Tempat*         : Balai Pertemuan Warga RT.001 (Blok B6)
📋 *Agenda*         : ${agenda || 'Laporan Transparansi Kas, Evaluasi Keamanan, dan Usulan Fasum Baru'}

Mengingat pentingnya agenda musyawarah ini, dimohon kehadiran tepat pada waktunya.

_Hormat Kami,_
*Ketua RT.001 & Jajaran Pengurus*`,

  'pengingat-iuran': (agenda) => 
`*PENGINGAT PEMBAYARAN IURAN WAJIB RT BULAN BERJALAN*
---------------------------------------
Yth. Bapak/Ibu Warga RT.001 / RW.013

Diberitahukan bahwa pembayaran Iuran Wajib RT sebesar *Rp 50.000 / bulan* untuk periode bulan berjalan telah dibuka.

Iuran dialokasikan secara transparan ke 6 Pos Anggaran:
1. Pos Pengelolaan Sampah & Kebersihan
2. Pos Operasional Kas RT
3. Pos Sosial & Kematian
4. Pos Pembangunan & Fasilitas Umum
5. Pos PHBI & Kegiatan Keagamaan
6. Pos Peringatan HUT RI 17 Agustus

Pembayaran dapat dilakukan melalui:
• Tunai ke Bendahara 1 (Bpk. Wageyanto / Blok B6 No. 02)
• Transfer Bank / QRIS RT-FinSmart PRO

Bagi yang telah melunasi, kami sampaikan terima kasih sebesar-besarnya! 🙏

*Bendahara RT.001 Graha Asri*`,

  'pengingat-ronda': (agenda) => 
`*PEMBERITAHUAN JADWAL RONDA MALAM MINGGU*
---------------------------------------
Yth. Rekan-rekan Regu Ronda RT.001 / RW.013

Mengingatkan kembali tugas ronda dan patroli keamanan lingkungan pada:

🗓 *Malam Ini* : Sabtu Malam s/d Minggu Pagi
⏰ *Waktu*     : 22.00 WIB s/d 04.00 WIB
📍 *Posko*     : Pos Kamling RT.001 (Blok B6)

Tugas Petugas:
1. Patroli berkala 5 klaster jalan
2. Penarikan uang jimpitan ronda warga
3. Penguncian portal gang pukul 23.00 WIB

Mari jaga bersama keamanan & kenyamanan lingkungan rumah kita. Terima kasih atas dedikasinya! 🛡️

*Seksi Keamanan & Ketertiban RT.001*`,

  'keamanan-lingkungan': (agenda) => 
`*EDARAN KEAMANAN & KETERTIBAN LINGKUNGAN RT.001*
---------------------------------------
Kepada Seluruh Warga RT.001 / RW.013 yang Kami Hormati,

Menyikapi peningkatan mobilitas dan demi kenyamanan bersama, dihimbau kepada seluruh warga:
1. Mengunci pintu gembok pagar dan mematikan kompor/alat listrik saat bepergian.
2. Memasukkan kendaraan bermotor roda dua ke dalam garasi pada malam hari.
3. Tamu menginap lebih dari 1x24 jam wajib melapor kepada Pengurus RT.
4. Portal lorong jalan ditutup setiap pukul 23.00 WIB demi keamanan bersama.

Apabila menemukan hal mencurigakan, segera hubungi Pos Ronda atau Seksi Keamanan RT.001.

*Pengurus RT.001 / RW.013 Perum Graha Asri*`,

  'kustom': (agenda) => 
`*PEMBERITAHUAN PENGURUS RT.001 / RW.013*
---------------------------------------
Kepada Yth. Seluruh Warga RT.001 / RW.013

${agenda || 'Tuliskan isi pengumuman pengurus di sini...'}

Demikian pemberitahuan ini disampaikan. Atas perhatian dan kerjasamanya, kami haturkan terima kasih. 🙏

*Pengurus RT.001 / RW.013 Perumahan Graha Asri*`
};

function setupBroadcastGenerator() {
  const selectTpl = document.getElementById('select-broadcast-template');
  const inputAgenda = document.getElementById('input-broadcast-agenda');
  const textareaContent = document.getElementById('textarea-broadcast-content');
  const btnCopy = document.getElementById('btn-copy-broadcast-text');
  const btnOpenWA = document.getElementById('btn-open-wa-broadcast');

  function refreshContent() {
    const tplKey = selectTpl ? selectTpl.value : 'kerja-bakti';
    const agendaVal = inputAgenda ? inputAgenda.value : '';
    const fn = BROADCAST_TEMPLATES[tplKey] || BROADCAST_TEMPLATES['kerja-bakti'];
    const generated = fn(agendaVal);
    if (textareaContent) textareaContent.value = generated;
    updateBroadcastPreview();
  }

  if (selectTpl) {
    selectTpl.addEventListener('change', () => {
      refreshContent();
    });
  }

  if (inputAgenda) {
    inputAgenda.addEventListener('input', () => {
      refreshContent();
    });
  }

  if (textareaContent) {
    textareaContent.addEventListener('input', () => {
      updateBroadcastPreview();
    });
  }

  if (btnCopy) {
    btnCopy.addEventListener('click', () => {
      if (textareaContent) {
        navigator.clipboard.writeText(textareaContent.value).then(() => {
          showToast('📋 Teks broadcast disalin ke clipboard!', 'success');
        }).catch(() => {
          textareaContent.select();
          document.execCommand('copy');
          showToast('📋 Teks broadcast disalin!', 'success');
        });
      }
    });
  }

  if (btnOpenWA) {
    btnOpenWA.addEventListener('click', () => {
      const text = textareaContent ? textareaContent.value : '';
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    });
  }

  // Initial call
  refreshContent();
}

function updateBroadcastPreview() {
  const textareaContent = document.getElementById('textarea-broadcast-content');
  const bubble = document.getElementById('wa-bubble-preview');
  if (textareaContent && bubble) {
    bubble.textContent = textareaContent.value;
  }
}


// ==========================================================================
// MODUL INVENTARIS & ASET RT.001 / RW.013 GRAHA ASRI (GOOGLE SHEETS DATASET)
// ==========================================================================

const DEFAULT_ASET_RT = [
  { id: 1, nama: 'Televisi 21"', kategori: 'elektronik', qty: 1, satuan: 'unit', tgl_beli: '-', harga: 0, kondisi: 'ok', sumber: 'Kas RT', keterangan: 'Inventaris hibah pos ronda untuk monitor CCTV / hiburan warga', icon: 'fa-tv' },
  { id: 2, nama: 'Water Dispenser', kategori: 'pos_dapur', qty: 2, satuan: 'unit', tgl_beli: '-', harga: 0, kondisi: 'ok', sumber: 'Kas RT', keterangan: 'Dispenser galon air minum pos kamling & sekretariat', icon: 'fa-faucet-drip' },
  { id: 3, nama: 'Kursi Lipat / Plastik', kategori: 'pos_dapur', qty: 60, satuan: 'pcs', tgl_beli: '-', harga: 0, kondisi: 'sebagian_rusak', sumber: 'Kas RT', keterangan: '59 pcs kondisi prima, hilang 1 pcs saat kegiatan warga', icon: 'fa-chair' },
  { id: 4, nama: 'Tenda Terop', kategori: 'tenda_lapangan', qty: 2, satuan: 'lokal', tgl_beli: '-', harga: 0, kondisi: 'ok', sumber: 'Kas RT', keterangan: 'Fasilitas tenda acara hajatan, kerja bakti & kedukaan warga', icon: 'fa-campground' },
  { id: 5, nama: 'Terpal Tenda', kategori: 'tenda_lapangan', qty: 2, satuan: 'lembar', tgl_beli: '-', harga: 0, kondisi: 'ok', sumber: 'Kas RT', keterangan: 'Atap penutup tenda terop lingkungan', icon: 'fa-sheet-plastic' },
  { id: 6, nama: 'Terpal (Alas)', kategori: 'tenda_lapangan', qty: 1, satuan: 'lembar', tgl_beli: '-', harga: 0, kondisi: 'rusak', sumber: 'Kas RT', keterangan: 'Kondisi sobek / tidak layak pakai (Rencana usulan peremajaan baru)', icon: 'fa-rug' },
  { id: 7, nama: 'Sound System & Mic Wireless', kategori: 'elektronik', qty: 1, satuan: 'unit', tgl_beli: '-', harga: 2000000, kondisi: 'ok', sumber: 'Kas Jimpitan', keterangan: 'Pengadaan dari akumulasi dana jimpitan ronda warga', icon: 'fa-bullhorn' },
  { id: 8, nama: 'Umbul-umbul Bendera 17 Agustus', kategori: 'event', qty: 25, satuan: 'pcs', tgl_beli: 'Agustus 2020', harga: 437000, kondisi: 'ok', sumber: 'Kas RT', keterangan: 'Pengadaan tgl 9 & 10 Agustus 2020 untuk dekorasi gapura RT', icon: 'fa-flag' },
  { id: 9, nama: 'Lampu Hias Kedip 17 Agustus', kategori: 'event', qty: 11, satuan: 'pcs', tgl_beli: 'Agustus 2020', harga: 132000, kondisi: 'ok', sumber: 'Kas RT', keterangan: 'Pembelian tgl 9 Agustus 2020 untuk semarak kemerdekaan', icon: 'fa-lightbulb' },
  { id: 10, nama: 'Umbul-umbul Bendera 17 Agustus (Tahap 2)', kategori: 'event', qty: 15, satuan: 'pcs', tgl_beli: 'Agustus 2022', harga: 150000, kondisi: 'ok', sumber: 'Kas RT', keterangan: 'Pembelian tambahan tgl 6 Agustus 2022', icon: 'fa-flag' },
  { id: 11, nama: 'Tangga Lipat Pasang Tenda', kategori: 'tenda_lapangan', qty: 2, satuan: 'unit', tgl_beli: 'Agustus 2020', harga: 800000, kondisi: 'ok', sumber: 'Kas RT', keterangan: 'Tangga aluminium kokoh untuk pasang tratak tenda & lampu jalan', icon: 'fa-stairs' },
  { id: 12, nama: 'Multifunction Inkjet Printer Canon PIXMA E410', kategori: 'elektronik', qty: 1, satuan: 'unit', tgl_beli: 'November 2020', harga: 925000, kondisi: 'ok', sumber: 'Kas RT', keterangan: 'Pencetakan surat pengantar warga, laporan kas & administrasi', icon: 'fa-print' },
  { id: 13, nama: 'Lampu LED 36 Watt (Type TL Tube)', kategori: 'elektronik', qty: 3, satuan: 'pcs', tgl_beli: 'November 2020', harga: 300000, kondisi: 'ok', sumber: 'Kas RT', keterangan: 'Penerangan pos kamling & area pintu portal', icon: 'fa-bolt' },
  { id: 14, nama: 'Tikar Anyam Plastik (2m x 3m)', kategori: 'event', qty: 4, satuan: 'pcs', tgl_beli: 'Maret 2022', harga: 420000, kondisi: 'ok', sumber: 'Kas Jimpitan', keterangan: 'Pengadaan menggunakan dana Jimpitan Ronda Warga', icon: 'fa-border-all' },
  { id: 15, nama: 'Lampu LED Vario 30 Watt (Bohlam)', kategori: 'elektronik', qty: 2, satuan: 'pcs', tgl_beli: 'Mei 2022', harga: 110000, kondisi: 'ok', sumber: 'Halal Bihalal', keterangan: 'Pengadaan sisa dana acara Halal Bihalal Warga', icon: 'fa-lightbulb' },
  { id: 16, nama: 'Tikar Anyam Plastik (2m x 3m) Seri 2', kategori: 'event', qty: 4, satuan: 'pcs', tgl_beli: 'Juni 2022', harga: 428000, kondisi: 'ok', sumber: 'Kas Jimpitan', keterangan: 'Pengadaan menggunakan alokasi kas Jimpitan Ronda', icon: 'fa-border-all' },
  { id: 17, nama: 'Rak Penyimpanan Barang di Pos Ronda', kategori: 'pos_dapur', qty: 1, satuan: 'unit', tgl_beli: 'Juli 2022', harga: 6003884, kondisi: 'ok', sumber: 'Kas RT', keterangan: 'Rak besi kokoh penyimpanan seluruh peralatan inventaris pos', icon: 'fa-table-cells-large' },
  { id: 18, nama: 'Meja Serbaguna Lipat', kategori: 'pos_dapur', qty: 6, satuan: 'pcs', tgl_beli: 'Juli 2022', harga: 0, kondisi: 'ok', sumber: 'Kas RT', keterangan: 'Meja pertemuan warga, rapat koordinasi & posyandu', icon: 'fa-table' },
  { id: 19, nama: 'Thermos Dispenser (Sigma 9.5 Liter)', kategori: 'pos_dapur', qty: 2, satuan: 'pcs', tgl_beli: 'September 2022', harga: 608000, kondisi: 'ok', sumber: 'Kas RT', keterangan: 'Thermos air panas kapasitas besar untuk ronda & konsumsi rapat', icon: 'fa-mug-hot' },
  { id: 20, nama: 'Mesin Fogging MAHKOTA MTF 180 A', kategori: 'elektronik', qty: 1, satuan: 'unit', tgl_beli: 'September 2022', harga: 3545000, kondisi: 'ok', sumber: 'Kas RT', keterangan: 'Mesin pengasapan mandiri pencegahan nyamuk DBD di 71 KK', icon: 'fa-smog' },
  { id: 21, nama: 'Meja Tenis Meja MDF 18mm (Set Lengkap)', kategori: 'tenda_lapangan', qty: 1, satuan: 'set', tgl_beli: 'Oktober 2022', harga: 2716000, kondisi: 'ok', sumber: 'Saweran Warga', keterangan: 'Pengadaan dari saweran & penggalangan dana antusiasme warga', icon: 'fa-table-tennis-paddle-ball' },
  { id: 22, nama: 'Lampu Sorot Lapangan Volley', kategori: 'elektronik', qty: 1, satuan: 'pcs', tgl_beli: 'September 2022', harga: 0, kondisi: 'ok', sumber: 'Sumbangan Warga', keterangan: 'Hibah sumbangan dari Pak Dokter untuk sarana olahraga malam', icon: 'fa-sun' },
  { id: 23, nama: 'Lampu LED Hannochs Nova 45 Watt', kategori: 'elektronik', qty: 3, satuan: 'pcs', tgl_beli: 'Desember 2022', harga: 201000, kondisi: 'ok', sumber: 'Kas RT', keterangan: 'Lampu LED daya tinggi untuk fasum lapangan & gerbang utama', icon: 'fa-lightbulb' },
  { id: 24, nama: 'Kipas Angin Gantung (Ceiling Fan) GMC BM-503', kategori: 'elektronik', qty: 1, satuan: 'unit', tgl_beli: 'Februari 2022', harga: 245000, kondisi: 'ok', sumber: 'Kas Jimpitan', keterangan: 'Kipas langit-langit pos ronda dari kas Jimpitan warga', icon: 'fa-fan' },
  { id: 25, nama: 'STB TANAKA T2 Sniper (SN: 0452 9658 97)', kategori: 'elektronik', qty: 1, satuan: 'set', tgl_beli: 'Maret 2023', harga: 200000, kondisi: 'ok', sumber: 'Kas RT', keterangan: 'Set Top Box siaran digital pos ronda & remote control', icon: 'fa-satellite-dish' },
  { id: 26, nama: 'Nampan Plastik Merk Nice Ø30 cm', kategori: 'pos_dapur', qty: 60, satuan: 'pcs', tgl_beli: 'Mei 2023', harga: 350000, kondisi: 'ok', sumber: 'Kas RT', keterangan: 'Peralatan konsumsi pertemuan, kenduri & arisan lingkungan', icon: 'fa-utensils' },
  { id: 27, nama: 'Piring Plastik Model Rotan', kategori: 'pos_dapur', qty: 12, satuan: 'pcs', tgl_beli: 'Mei 2023', harga: 30000, kondisi: 'ok', sumber: 'Kas RT', keterangan: 'Piring saji kenduri & pertemuan santai warga', icon: 'fa-plate-wheat' },
  { id: 28, nama: 'Bola Volley Mikasa MVA300', kategori: 'tenda_lapangan', qty: 1, satuan: 'pcs', tgl_beli: 'Juli 2023', harga: 100000, kondisi: 'ok', sumber: 'Kas RT', keterangan: 'Bola pertandingan resmi lapangan volley warga RT.001', icon: 'fa-volleyball' },
  { id: 29, nama: 'Meja Karambol Ukuran 90 x 90 cm', kategori: 'tenda_lapangan', qty: 1, satuan: 'pcs', tgl_beli: 'Juli 2023', harga: 150000, kondisi: 'ok', sumber: 'Kas RT', keterangan: 'Sarana rekreasi & silaturahmi pos kamling ronda malam', icon: 'fa-dice' },
  { id: 30, nama: 'Jaring Lapangan Volley 6m x 30m x 1.5mm', kategori: 'tenda_lapangan', qty: 30, satuan: 'meter', tgl_beli: 'Juli 2023', harga: 336000, kondisi: 'ok', sumber: 'Kas RT', keterangan: 'Jaring pengaman pembatas pinggir lapangan volley', icon: 'fa-border-none' },
  { id: 31, nama: 'Jaring Lapangan Volley 6m x 12m x 1.5mm', kategori: 'tenda_lapangan', qty: 12, satuan: 'meter', tgl_beli: 'Juli 2023', harga: 151000, kondisi: 'ok', sumber: 'Kas RT', keterangan: 'Jaring pengaman pembatas ujung lapangan volley', icon: 'fa-border-none' },
  { id: 32, nama: 'Tali Tambang Nylon No.8 Panjang 45m', kategori: 'tenda_lapangan', qty: 45, satuan: 'meter', tgl_beli: 'Juli 2023', harga: 146000, kondisi: 'ok', sumber: 'Kas RT', keterangan: 'Tali bentangan tiang net & tenda (dibagi 3 utas)', icon: 'fa-lines-leaning' },
  { id: 33, nama: 'Lampu Hias Kedip 17 Agustus (Merah Putih)', kategori: 'event', qty: 20, satuan: 'pcs', tgl_beli: 'Juli 2023', harga: 259000, kondisi: 'ok', sumber: 'Kas RT', keterangan: 'Dekorasi meriah HUT Kemerdekaan RI di gerbang & jalan', icon: 'fa-lightbulb' }
];

const ASET_STORAGE_KEY = 'rt_finsmart_aset_items_v2';
let asetViewMode = 'cards'; // 'cards' | 'table'

function getAsetList() {
  try {
    const raw = localStorage.getItem(ASET_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Error reading aset storage:', e);
  }
  return [...DEFAULT_ASET_RT];
}

function saveAsetList(list) {
  try {
    localStorage.setItem(ASET_STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error('Error saving aset storage:', e);
  }
}

function getCategoryMeta(cat) {
  const map = {
    'tenda_lapangan': { label: 'Tenda & Lapangan', icon: 'fa-campground', color: '#10b981', badgeClass: 'badge-emerald' },
    'elektronik': { label: 'Elektronik & Mesin', icon: 'fa-bolt', color: '#38bdf8', badgeClass: 'badge-cyan' },
    'pos_dapur': { label: 'Pos & Dapur Warga', icon: 'fa-utensils', color: '#f59e0b', badgeClass: 'badge-gold' },
    'event': { label: 'Perlengkapan Event', icon: 'fa-flag', color: '#a855f7', badgeClass: 'badge-purple' }
  };
  return map[cat] || { label: 'Umum', icon: 'fa-box', color: '#94a3b8', badgeClass: 'badge-secondary' };
}

function getConditionBadge(kondisi) {
  if (kondisi === 'ok') {
    return `<span class="badge-status-pill pill-ok"><i class="fa-solid fa-circle-check"></i> Laik Pakai (OK)</span>`;
  }
  if (kondisi === 'sebagian_rusak') {
    return `<span class="badge-status-pill pill-warning"><i class="fa-solid fa-triangle-exclamation"></i> Sebagian Rusak/Hilang</span>`;
  }
  return `<span class="badge-status-pill pill-danger"><i class="fa-solid fa-circle-xmark"></i> Rusak / Tidak Laik</span>`;
}

function renderAsetRt() {
  const list = getAsetList();

  // 1. Calculate overall KPIs
  const totalVal = list.reduce((acc, it) => acc + (Number(it.harga) || 0), 0);
  const totalItems = list.length;
  const okItems = list.filter(it => it.kondisi === 'ok').length;
  const defectItems = list.filter(it => it.kondisi !== 'ok').length;
  const okPercent = totalItems > 0 ? ((okItems / totalItems) * 100).toFixed(1) : 0;
  const totalQtyPhysical = list.reduce((acc, it) => acc + (Number(it.qty) || 1), 0);

  // Update KPI card elements
  const elTotalVal = document.getElementById('kpi-aset-total-val');
  if (elTotalVal) elTotalVal.textContent = formatRupiah(totalVal);

  const elTotalItems = document.getElementById('kpi-aset-total-items');
  if (elTotalItems) elTotalItems.textContent = `${totalItems} Macam`;

  const elTotalPhysical = document.getElementById('kpi-aset-total-physical');
  if (elTotalPhysical) elTotalPhysical.textContent = `${totalQtyPhysical} Fisik Barang Tersimpan`;

  const elOkRate = document.getElementById('kpi-aset-ok-rate');
  if (elOkRate) elOkRate.textContent = `${okItems} Aset (${okPercent}%)`;

  const elDefectCount = document.getElementById('kpi-aset-defect-count');
  if (elDefectCount) elDefectCount.textContent = `${defectItems} Butuh Perhatian`;

  const sidebarBadge = document.getElementById('sidebar-aset-badge');
  if (sidebarBadge) sidebarBadge.textContent = totalItems;

  // 2. Read filter inputs
  const searchInput = document.getElementById('input-search-aset');
  const searchVal = searchInput ? searchInput.value.toLowerCase().trim() : '';

  const filterCat = document.getElementById('filter-kategori-aset');
  const catVal = filterCat ? filterCat.value : 'all';

  const filterKondisi = document.getElementById('filter-kondisi-aset');
  const kondisiVal = filterKondisi ? filterKondisi.value : 'all';

  const filterSumber = document.getElementById('filter-sumber-aset');
  const sumberVal = filterSumber ? filterSumber.value : 'all';

  // Toggle clear search button
  const btnClear = document.getElementById('btn-clear-search-aset');
  if (btnClear) btnClear.style.display = searchVal ? 'block' : 'none';

  // Toggle reset filters button
  const hasActiveFilters = searchVal !== '' || catVal !== 'all' || kondisiVal !== 'all' || sumberVal !== 'all';
  const btnReset = document.getElementById('btn-reset-aset-filters');
  if (btnReset) btnReset.style.display = hasActiveFilters ? 'inline-flex' : 'none';

  // 3. Filter data
  const filtered = list.filter(item => {
    // Search match
    if (searchVal) {
      const matchName = (item.nama || '').toLowerCase().includes(searchVal);
      const matchKet = (item.keterangan || '').toLowerCase().includes(searchVal);
      const matchSumber = (item.sumber || '').toLowerCase().includes(searchVal);
      const matchBeli = (item.tgl_beli || '').toLowerCase().includes(searchVal);
      if (!matchName && !matchKet && !matchSumber && !matchBeli) return false;
    }

    // Category match
    if (catVal !== 'all' && item.kategori !== catVal) return false;

    // Condition match
    if (kondisiVal === 'ok' && item.kondisi !== 'ok') return false;
    if (kondisiVal === 'defect' && item.kondisi === 'ok') return false;

    // Source match
    if (sumberVal !== 'all' && item.sumber !== sumberVal) return false;

    return true;
  });

  // Display count
  const elDisplayCount = document.getElementById('aset-displayed-count');
  if (elDisplayCount) elDisplayCount.textContent = filtered.length;

  // 4. Render Grid View
  const gridContainer = document.getElementById('aset-grid-view');
  if (gridContainer) {
    if (filtered.length === 0) {
      gridContainer.innerHTML = `
        <div class="aset-empty-box glass-panel" style="grid-column: 1 / -1; text-align: center; padding: 3rem 1.5rem;">
          <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(245, 158, 11, 0.15); color: #fbbf24; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; margin: 0 auto 1rem;">
            <i class="fa-solid fa-box-archive"></i>
          </div>
          <h3 style="color: #fff; margin-bottom: 0.4rem;">Tidak Ada Inventaris Ditemukan</h3>
          <p style="color: #94a3b8; font-size: 0.9rem; max-width: 420px; margin: 0 auto 1.25rem;">Tidak ada barang yang cocok dengan kata kunci atau filter yang Anda pilih.</p>
          <button type="button" class="btn btn-outline-gold" onclick="resetAsetFilters()">
            <i class="fa-solid fa-rotate-left"></i> Reset Filter Pencarian
          </button>
        </div>
      `;
    } else {
      gridContainer.innerHTML = filtered.map(item => {
        const catMeta = getCategoryMeta(item.kategori);
        const condBadge = getConditionBadge(item.kondisi);
        const formattedPrice = item.harga > 0 ? formatRupiah(item.harga) : '<span class="text-muted" style="font-size:0.85rem;"><i class="fa-solid fa-hand-holding-heart"></i> Hibah / Inventaris</span>';
        const cardGlow = item.kondisi === 'rusak' ? 'border-defect' : (item.kondisi === 'sebagian_rusak' ? 'border-warning' : '');

        return `
          <div class="aset-card glass-panel ${cardGlow}" data-id="${item.id}">
            <div class="aset-card-topline">
              <span class="aset-cat-tag ${catMeta.badgeClass}">
                <i class="fa-solid ${catMeta.icon}"></i> ${catMeta.label}
              </span>
              ${condBadge}
            </div>

            <div class="aset-card-header">
              <div class="aset-icon-box" style="background: ${catMeta.color}1c; color: ${catMeta.color}; border: 1px solid ${catMeta.color}35;">
                <i class="fa-solid ${item.icon || catMeta.icon}"></i>
              </div>
              <div class="aset-header-info">
                <h3 class="aset-name">${escapeHtml(item.nama)}</h3>
                <div class="aset-qty-badge">
                  <i class="fa-solid fa-layer-group text-emerald"></i>
                  <strong>${item.qty} ${escapeHtml(item.satuan)}</strong>
                </div>
              </div>
            </div>

            <p class="aset-notes"><i class="fa-regular fa-note-sticky text-gold"></i> ${escapeHtml(item.keterangan || 'Tidak ada catatan khusus')}</p>

            <div class="aset-card-specs">
              <div class="spec-col">
                <span class="spec-lbl"><i class="fa-regular fa-calendar-days text-cyan"></i> Pengadaan</span>
                <span class="spec-val">${escapeHtml(item.tgl_beli || '-')}</span>
              </div>
              <div class="spec-col">
                <span class="spec-lbl"><i class="fa-solid fa-hand-holding-dollar text-emerald"></i> Sumber Dana</span>
                <span class="spec-val font-semibold text-emerald">${escapeHtml(item.sumber || 'Kas RT')}</span>
              </div>
            </div>

            <div class="aset-card-footer">
              <div class="aset-price-wrap">
                <span class="price-lbl">Nilai Perolehan</span>
                <div class="price-val ${item.harga > 0 ? 'text-gold' : ''}">${formattedPrice}</div>
              </div>
              <div class="aset-card-actions">
                <button type="button" class="btn-icon-action btn-action-edit" onclick="openEditAsetModal(${item.id})" title="Edit Data Barang">
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button type="button" class="btn-icon-action btn-action-delete" onclick="deleteAsetItem(${item.id})" title="Hapus Barang">
                  <i class="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  // 5. Render Table View
  const tbody = document.getElementById('tbody-aset-full');
  if (tbody) {
    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="9" style="text-align: center; color: #94a3b8; padding: 2.5rem;">
            <i class="fa-solid fa-box-archive" style="font-size: 2rem; opacity: 0.3; margin-bottom: 0.5rem; display: block;"></i>
            Tidak ada inventaris yang cocok dengan filter pencarian.
          </td>
        </tr>
      `;
    } else {
      const filteredSum = filtered.reduce((acc, it) => acc + (Number(it.harga) || 0), 0);
      const tfootVal = document.getElementById('tfoot-aset-total-val');
      if (tfootVal) tfootVal.textContent = formatRupiah(filteredSum);

      tbody.innerHTML = filtered.map((item, idx) => {
        const catMeta = getCategoryMeta(item.kategori);
        const condBadge = getConditionBadge(item.kondisi);
        const formattedPrice = item.harga > 0 ? formatRupiah(item.harga) : '<span class="text-muted">-</span>';

        return `
          <tr>
            <td style="text-align: center; color: #94a3b8; font-weight: 700;">${idx + 1}</td>
            <td>
              <div style="display: flex; align-items: center; gap: 0.65rem;">
                <div style="width: 32px; height: 32px; border-radius: 8px; background: ${catMeta.color}1c; color: ${catMeta.color}; display: flex; align-items: center; justify-content: center; font-size: 0.95rem; flex-shrink: 0;">
                  <i class="fa-solid ${item.icon || catMeta.icon}"></i>
                </div>
                <div>
                  <strong style="color: #fff; font-size: 0.92rem;">${escapeHtml(item.nama)}</strong>
                </div>
              </div>
            </td>
            <td><span class="aset-cat-tag ${catMeta.badgeClass}" style="font-size: 0.72rem;"><i class="fa-solid ${catMeta.icon}"></i> ${catMeta.label}</span></td>
            <td style="text-align: center;"><strong>${item.qty}</strong> <span style="font-size: 0.8rem; color: #94a3b8;">${escapeHtml(item.satuan)}</span></td>
            <td><span style="color: #cbd5e1; font-size: 0.85rem;">${escapeHtml(item.tgl_beli || '-')}</span></td>
            <td style="text-align: right; font-weight: 700; color: #fbbf24;">${formattedPrice}</td>
            <td style="text-align: center;">${condBadge}</td>
            <td>
              <div style="font-size: 0.82rem; color: #cbd5e1;">
                <span class="badge-tag-emerald" style="font-size: 0.72rem; padding: 2px 6px; display: inline-block; margin-bottom: 2px;"><i class="fa-solid fa-coins"></i> ${escapeHtml(item.sumber || 'Kas RT')}</span>
                <div style="color: #94a3b8;">${escapeHtml(item.keterangan || '-')}</div>
              </div>
            </td>
            <td style="text-align: center;">
              <div style="display: flex; gap: 0.35rem; justify-content: center;">
                <button type="button" class="btn-icon-action btn-action-edit" onclick="openEditAsetModal(${item.id})" title="Edit">
                  <i class="fa-solid fa-pen"></i>
                </button>
                <button type="button" class="btn-icon-action btn-action-delete" onclick="deleteAsetItem(${item.id})" title="Hapus">
                  <i class="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </td>
          </tr>
        `;
      }).join('');
    }
  }
}

function resetAsetFilters() {
  const searchInput = document.getElementById('input-search-aset');
  if (searchInput) searchInput.value = '';

  const filterCat = document.getElementById('filter-kategori-aset');
  if (filterCat) filterCat.value = 'all';

  const filterKondisi = document.getElementById('filter-kondisi-aset');
  if (filterKondisi) filterKondisi.value = 'all';

  const filterSumber = document.getElementById('filter-sumber-aset');
  if (filterSumber) filterSumber.value = 'all';

  renderAsetRt();
}

function setAsetViewMode(mode) {
  asetViewMode = mode;
  const gridEl = document.getElementById('aset-grid-view');
  const tableEl = document.getElementById('aset-table-view');
  const btnCards = document.getElementById('btn-view-cards');
  const btnTable = document.getElementById('btn-view-table');

  if (mode === 'table') {
    if (gridEl) gridEl.style.display = 'none';
    if (tableEl) tableEl.style.display = 'block';
    if (btnCards) btnCards.classList.remove('active');
    if (btnTable) btnTable.classList.add('active');
  } else {
    if (gridEl) gridEl.style.display = 'grid';
    if (tableEl) tableEl.style.display = 'none';
    if (btnCards) btnCards.classList.add('active');
    if (btnTable) btnTable.classList.remove('active');
  }
}

function openAddAsetModal() {
  const modal = document.getElementById('modal-add-aset');
  if (!modal) return;

  document.getElementById('modal-aset-title').innerHTML = '<i class="fa-solid fa-box-open text-gold"></i> Catat Inventaris Aset Baru';
  document.getElementById('input-aset-id').value = '';
  document.getElementById('input-aset-nama').value = '';
  document.getElementById('input-aset-kategori').value = 'tenda_lapangan';
  document.getElementById('input-aset-kondisi').value = 'ok';
  document.getElementById('input-aset-qty').value = '1';
  document.getElementById('input-aset-satuan').value = 'unit';
  document.getElementById('input-aset-harga').value = '0';
  document.getElementById('input-aset-pembelian').value = '';
  document.getElementById('input-aset-sumber').value = 'Kas RT';
  document.getElementById('input-aset-keterangan').value = '';

  modal.classList.add('active');
}

function openEditAsetModal(id) {
  const list = getAsetList();
  const item = list.find(it => it.id === Number(id));
  if (!item) return;

  const modal = document.getElementById('modal-add-aset');
  if (!modal) return;

  document.getElementById('modal-aset-title').innerHTML = '<i class="fa-solid fa-pen-to-square text-gold"></i> Edit Inventaris Aset RT';
  document.getElementById('input-aset-id').value = item.id;
  document.getElementById('input-aset-nama').value = item.nama;
  document.getElementById('input-aset-kategori').value = item.kategori;
  document.getElementById('input-aset-kondisi').value = item.kondisi;
  document.getElementById('input-aset-qty').value = item.qty;
  document.getElementById('input-aset-satuan').value = item.satuan;
  document.getElementById('input-aset-harga').value = item.harga || 0;
  document.getElementById('input-aset-pembelian').value = item.tgl_beli || '';
  document.getElementById('input-aset-sumber').value = item.sumber || 'Kas RT';
  document.getElementById('input-aset-keterangan').value = item.keterangan || '';

  modal.classList.add('active');
}

function deleteAsetItem(id) {
  const list = getAsetList();
  const item = list.find(it => it.id === Number(id));
  if (!item) return;

  if (!confirm(`Apakah Anda yakin ingin menghapus aset "${item.nama}" dari daftar inventaris?`)) {
    return;
  }

  const updated = list.filter(it => it.id !== Number(id));
  saveAsetList(updated);
  showToast(`Aset "${item.nama}" berhasil dihapus.`, 'info');
  renderAsetRt();
  renderDashboard();
}

function prepareAsetPrintReport() {
  const list = getAsetList();
  const totalVal = list.reduce((acc, it) => acc + (Number(it.harga) || 0), 0);
  const totalPhysical = list.reduce((acc, it) => acc + (Number(it.qty) || 1), 0);
  const okCount = list.filter(it => it.kondisi === 'ok').length;
  const defectCount = list.length - okCount;

  const container = document.getElementById('aset-print-doc-content');
  if (!container) return;

  const currentDateStr = new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date());

  container.innerHTML = `
    <div style="font-family: Arial, sans-serif; color: #1e293b; line-height: 1.5;">
      <!-- Kop Surat -->
      <div style="text-align: center; border-bottom: 3px double #0f172a; padding-bottom: 12px; margin-bottom: 20px;">
        <h2 style="margin: 0; font-size: 1.3rem; letter-spacing: 0.08em; color: #064e3b; text-transform: uppercase;">RUKUN TETANGGA 001 / RUKUN WARGA 013</h2>
        <h3 style="margin: 3px 0 6px 0; font-size: 1rem; color: #047857;">PERUMAHAN GRAHA ASRI &bull; KEL. SIMPANGAN, CIKARANG UTARA, KAB. BEKASI</h3>
        <p style="margin: 0; font-size: 0.8rem; color: #64748b;">Sekretariat: Jl. Citarum II, Perum Graha Asri, Desa Simpangan, Kec. Cikarang Utara, Kab. Bekasi 17530</p>
      </div>

      <!-- Judul Dokumen -->
      <div style="text-align: center; margin-bottom: 18px;">
        <h3 style="margin: 0 0 4px 0; font-size: 1.15rem; text-decoration: underline; letter-spacing: 0.05em;">BERITA ACARA &amp; DAFTAR INVENTARIS ASET</h3>
        <p style="margin: 0; font-size: 0.85rem; color: #475569;">Nomor Registrasi: 004/BA-ASET/RT.001-RW.013/VII/2023</p>
      </div>

      <!-- Keterangan Pembuka -->
      <p style="font-size: 0.88rem; margin-bottom: 14px;">
        Pada hari ini, dicatat dan dilaporkan secara resmi rekapitulasi inventarisasi aset, sarana dan prasarana milik bersama RT.001 / RW.013 Graha Asri dengan rincian sebagai berikut:
      </p>

      <!-- Ringkasan Statistik Aset -->
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 10px;">
        <div style="text-align: center;">
          <span style="font-size: 0.72rem; color: #64748b; text-transform: uppercase; display: block;">Total Valuasi</span>
          <strong style="font-size: 0.95rem; color: #047857;">${formatRupiah(totalVal)}</strong>
        </div>
        <div style="text-align: center;">
          <span style="font-size: 0.72rem; color: #64748b; text-transform: uppercase; display: block;">Ragam Aset</span>
          <strong style="font-size: 0.95rem;">${list.length} Macam</strong>
        </div>
        <div style="text-align: center;">
          <span style="font-size: 0.72rem; color: #64748b; text-transform: uppercase; display: block;">Kondisi Laik (OK)</span>
          <strong style="font-size: 0.95rem; color: #059669;">${okCount} Item (${Math.round((okCount / (list.length || 1)) * 100)}%)</strong>
        </div>
        <div style="text-align: center;">
          <span style="font-size: 0.72rem; color: #64748b; text-transform: uppercase; display: block;">Rusak / Perlu Perhatian</span>
          <strong style="font-size: 0.95rem; color: #dc2626;">${defectCount} Item</strong>
        </div>
      </div>

      <!-- Tabel Daftar Aset -->
      <table style="width: 100%; border-collapse: collapse; font-size: 0.82rem; margin-bottom: 24px;">
        <thead>
          <tr style="background: #e2e8f0; color: #0f172a;">
            <th style="border: 1px solid #cbd5e1; padding: 6px 8px; width: 30px; text-align: center;">No</th>
            <th style="border: 1px solid #cbd5e1; padding: 6px 8px; text-align: left;">Nama Barang Aset</th>
            <th style="border: 1px solid #cbd5e1; padding: 6px 8px; text-align: center; width: 70px;">Qtty</th>
            <th style="border: 1px solid #cbd5e1; padding: 6px 8px; text-align: center; width: 85px;">Pengadaan</th>
            <th style="border: 1px solid #cbd5e1; padding: 6px 8px; text-align: right; width: 105px;">Nilai Perolehan</th>
            <th style="border: 1px solid #cbd5e1; padding: 6px 8px; text-align: center; width: 75px;">Kondisi</th>
            <th style="border: 1px solid #cbd5e1; padding: 6px 8px; text-align: left;">Sumber Dana &amp; Keterangan</th>
          </tr>
        </thead>
        <tbody>
          ${list.map((it, idx) => `
            <tr style="background: ${idx % 2 === 0 ? '#ffffff' : '#f8fafc'};">
              <td style="border: 1px solid #cbd5e1; padding: 5px 6px; text-align: center;">${idx + 1}</td>
              <td style="border: 1px solid #cbd5e1; padding: 5px 8px; font-weight: bold;">${escapeHtml(it.nama)}</td>
              <td style="border: 1px solid #cbd5e1; padding: 5px 6px; text-align: center;">${it.qty} ${escapeHtml(it.satuan)}</td>
              <td style="border: 1px solid #cbd5e1; padding: 5px 6px; text-align: center;">${escapeHtml(it.tgl_beli || '-')}</td>
              <td style="border: 1px solid #cbd5e1; padding: 5px 8px; text-align: right;">${it.harga > 0 ? formatRupiah(it.harga) : '-'}</td>
              <td style="border: 1px solid #cbd5e1; padding: 5px 6px; text-align: center; font-weight: bold; color: ${it.kondisi === 'ok' ? '#047857' : '#b91c1c'};">
                ${it.kondisi === 'ok' ? 'OK (Baik)' : (it.kondisi === 'sebagian_rusak' ? 'Sebagian' : 'Rusak')}
              </td>
              <td style="border: 1px solid #cbd5e1; padding: 5px 8px;">
                <strong>${escapeHtml(it.sumber || 'Kas RT')}</strong>: ${escapeHtml(it.keterangan || '-')}
              </td>
            </tr>
          `).join('')}
        </tbody>
        <tfoot>
          <tr style="background: #e2e8f0; font-weight: bold;">
            <td colspan="4" style="border: 1px solid #cbd5e1; padding: 6px 8px; text-align: right;">GRAND TOTAL NILAI ASET TERDATA:</td>
            <td style="border: 1px solid #cbd5e1; padding: 6px 8px; text-align: right; color: #047857;">${formatRupiah(totalVal)}</td>
            <td colspan="2" style="border: 1px solid #cbd5e1; padding: 6px 8px; text-align: center;">${totalPhysical} Fisik Barang</td>
          </tr>
        </tfoot>
      </table>

      <!-- Tanda Tangan Pengurus -->
      <div style="display: flex; justify-content: space-between; margin-top: 30px; font-size: 0.88rem; page-break-inside: avoid;">
        <div style="text-align: center; width: 220px;">
          <p style="margin: 0 0 55px 0;">Mengetahui,<br><strong>Ketua RT.001 / RW.013</strong></p>
          <strong style="text-decoration: underline;">MARYANTO</strong>
          <span style="display: block; font-size: 0.75rem; color: #64748b;">Ketua RT.001</span>
        </div>
        <div style="text-align: center; width: 220px;">
          <p style="margin: 0 0 55px 0;">Pengelola Sarpras,<br><strong>Seksi Perlengkapan &amp; Aset</strong></p>
          <strong style="text-decoration: underline;">KASIRUN</strong>
          <span style="display: block; font-size: 0.75rem; color: #64748b;">Seksi Perlengkapan</span>
        </div>
        <div style="text-align: center; width: 220px;">
          <p style="margin: 0 0 55px 0;">Bekasi, ${currentDateStr}<br><strong>Bendahara RT.001</strong></p>
          <strong style="text-decoration: underline;">JUMARI S</strong>
          <span style="display: block; font-size: 0.75rem; color: #64748b;">Bendahara 1</span>
        </div>
      </div>
    </div>
  `;

  const modal = document.getElementById('modal-print-aset');
  if (modal) modal.classList.add('active');
}

function setupAsetRtModule() {
  // 1. Initial Render
  try {
    renderAsetRt();
  } catch (e) {
    console.error('Error in initial renderAsetRt:', e);
  }

  // 2. Search realtime
  const searchInput = document.getElementById('input-search-aset');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      renderAsetRt();
    });
  }

  // 3. Clear search button
  const btnClear = document.getElementById('btn-clear-search-aset');
  if (btnClear) {
    btnClear.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      renderAsetRt();
    });
  }

  // 4. Filters change
  ['filter-kategori-aset', 'filter-kondisi-aset', 'filter-sumber-aset'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('change', () => {
        renderAsetRt();
      });
    }
  });

  // 5. Reset button
  const btnReset = document.getElementById('btn-reset-aset-filters');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      resetAsetFilters();
    });
  }

  // 6. View Mode Toggles
  const btnCards = document.getElementById('btn-view-cards');
  if (btnCards) {
    btnCards.addEventListener('click', () => {
      setAsetViewMode('cards');
    });
  }

  const btnTable = document.getElementById('btn-view-table');
  if (btnTable) {
    btnTable.addEventListener('click', () => {
      setAsetViewMode('table');
    });
  }

  // 7. Modal Add Button
  const btnOpenAdd = document.getElementById('btn-open-add-aset');
  if (btnOpenAdd) {
    btnOpenAdd.addEventListener('click', () => {
      openAddAsetModal();
    });
  }

  // 8. Form Add / Edit Submit
  const formAdd = document.getElementById('form-add-aset');
  if (formAdd) {
    formAdd.addEventListener('submit', (e) => {
      e.preventDefault();

      const idVal = document.getElementById('input-aset-id').value;
      const namaVal = document.getElementById('input-aset-nama').value.trim();
      const catVal = document.getElementById('input-aset-kategori').value;
      const kondisiVal = document.getElementById('input-aset-kondisi').value;
      const qtyVal = Number(document.getElementById('input-aset-qty').value) || 1;
      const satuanVal = document.getElementById('input-aset-satuan').value.trim() || 'unit';
      const hargaVal = Number(document.getElementById('input-aset-harga').value) || 0;
      const tglBeliVal = document.getElementById('input-aset-pembelian').value.trim() || '-';
      const sumberVal = document.getElementById('input-aset-sumber').value;
      const ketVal = document.getElementById('input-aset-keterangan').value.trim();

      if (!namaVal) {
        showToast('Mohon masukkan nama barang aset.', 'error');
        return;
      }

      const list = getAsetList();

      if (idVal) {
        // Edit existing
        const idx = list.findIndex(it => it.id === Number(idVal));
        if (idx !== -1) {
          list[idx] = {
            ...list[idx],
            nama: namaVal,
            kategori: catVal,
            kondisi: kondisiVal,
            qty: qtyVal,
            satuan: satuanVal,
            harga: hargaVal,
            tgl_beli: tglBeliVal,
            sumber: sumberVal,
            keterangan: ketVal
          };
          showToast(`Aset "${namaVal}" berhasil diperbarui.`, 'success');
        }
      } else {
        // Create new
        const newId = list.length > 0 ? Math.max(...list.map(it => it.id)) + 1 : 1;
        const newItem = {
          id: newId,
          nama: namaVal,
          kategori: catVal,
          kondisi: kondisiVal,
          qty: qtyVal,
          satuan: satuanVal,
          harga: hargaVal,
          tgl_beli: tglBeliVal,
          sumber: sumberVal,
          keterangan: ketVal,
          icon: getCategoryMeta(catVal).icon
        };
        list.unshift(newItem);
        showToast(`Aset baru "${namaVal}" berhasil dicatat!`, 'success');
      }

      saveAsetList(list);
      renderAsetRt();
      renderDashboard();

      // Close modal
      const modal = document.getElementById('modal-add-aset');
      if (modal) modal.classList.remove('active');
    });
  }

  // 9. Print Preview & Execute
  const btnPrintReport = document.getElementById('btn-print-aset-report');
  if (btnPrintReport) {
    btnPrintReport.addEventListener('click', () => {
      prepareAsetPrintReport();
    });
  }

  const btnExecutePrint = document.getElementById('btn-execute-print-aset');
  if (btnExecutePrint) {
    btnExecutePrint.addEventListener('click', () => {
      window.print();
    });
  }

  // 10. Dashboard Quick Access Button
  const btnDashOpen = document.getElementById('btn-dash-open-aset');
  if (btnDashOpen) {
    btnDashOpen.addEventListener('click', () => {
      navigateToView('aset-rt');
    });
  }
}





