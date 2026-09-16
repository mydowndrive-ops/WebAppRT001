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

const INITIAL_RESIDENTS = [
  {
    "id": "w-1",
    "noUrut": 1,
    "name": "Wageyanto",
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
  currentUser: 'b1', // 'b1' = Admin 1 (Full Control), 'b2' = Admin 2 (Jimpitan Only)
  accountPins: { b1: '1111', b2: '2222' }, // Default PINs
  mandatoryDues: 50000,
  posConfig: JSON.parse(JSON.stringify(DEFAULT_POS_CONFIG)),
  otherPosConfig: JSON.parse(JSON.stringify(OTHER_POS_CONFIG)),
  residents: JSON.parse(JSON.stringify(INITIAL_RESIDENTS)),
  payments: [], // Array of payment records
  expenses: [], // Array of expense records
  jimpitanIncomes: [], // Array of jimpitan income records
  jimpitanExpenses: [], // Array of jimpitan expense records
  selectedMonth: 9, // September
  selectedYear: 2026,
  activeReceiptData: null
};

// Chart instances
let cashflowChart = null;
let posDistributionChart = null;

// ==================== STORAGE & SEEDING ====================

function loadState() {
  try {
    const saved = localStorage.getItem(APP_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      state = Object.assign(state, parsed);
      
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
    } else {
      seedInitialDemoData();
      saveState();
    }
  } catch (err) {
    console.warn('Error loading state from localStorage', err);
    seedInitialDemoData();
  }
}

function saveState() {
  try {
    localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(state));
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

// Modal helper functions
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('active');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
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
      <td><span class="split-pill">${res.domicile}</span></td>
      <td><i class="fa-brands fa-whatsapp text-emerald"></i> ${res.phone}</td>
      <td>${res.members} Orang</td>
      <td>
        <span class="${isPaid ? 'status-badge-paid' : 'status-badge-unpaid'}">
          ${isPaid ? 'Lunas Bulan Ini' : 'Belum Bayar'}
        </span>
      </td>
      <td style="text-align: right;">
        <button class="btn btn-sm btn-outline btn-edit-warga" data-warga-id="${res.id}" title="Edit Data">
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

  // Dynamic range: at least from 2024 (or earliest recorded data), up to currentYear + 10
  const startYear = Math.min(2024, currentYear - 2, ...recordedYears);
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
  // Desktop Menu & Mobile Bottom Nav
  const navLinks = document.querySelectorAll('.menu-item, .bnav-item');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('data-target');
      navigateToView(target);

      // Close mobile sidebar if open
      document.getElementById('sidebar')?.classList.remove('mobile-open');
    });
  });

  // Mobile Hamburger Toggle
  document.getElementById('menu-toggle')?.addEventListener('click', () => {
    document.getElementById('sidebar')?.classList.toggle('mobile-open');
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
    'jimpitan': { title: 'Uang Jimpitan Ronda', sub: 'Perolehan & Pengeluaran Kas Ronda Malam Minggu' }
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
    document.getElementById('modal-warga')?.classList.add('active');
  });

  document.getElementById('form-warga')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const editId = document.getElementById('warga-edit-id').value;
    const name = document.getElementById('warga-name').value;
    const block = document.getElementById('warga-block').value;
    const houseNo = document.getElementById('warga-house-no').value;
    const phone = document.getElementById('warga-phone').value;
    const domicile = document.getElementById('warga-domicile').value;
    const members = Number(document.getElementById('warga-family-members').value) || 1;

    if (editId) {
      // Edit existing
      const res = state.residents.find(r => r.id === editId);
      if (res) {
        res.name = name;
        res.block = block;
        res.houseNo = houseNo;
        res.phone = phone;
        res.domicile = domicile;
        res.members = members;
      }
      showToast('Data warga berhasil diperbarui!', 'success');
    } else {
      // New resident
      const newWarga = {
        id: `w-${Date.now()}`,
        name: name,
        block: block,
        houseNo: houseNo,
        phone: phone,
        domicile: domicile,
        members: members
      };
      state.residents.push(newWarga);
      showToast('Warga baru berhasil ditambahkan!', 'success');
    }

    saveState();
    document.getElementById('modal-warga')?.classList.remove('active');
    renderResidents();
    renderChecklist();
    renderDashboard();
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

  // Warga table edit & delete buttons
  document.getElementById('tbody-warga')?.addEventListener('click', (e) => {
    const btnEdit = e.target.closest('.btn-edit-warga');
    const btnDelete = e.target.closest('.btn-delete-warga');

    if (btnEdit) {
      const wargaId = btnEdit.getAttribute('data-warga-id');
      const res = state.residents.find(r => r.id === wargaId);
      if (res) {
        document.getElementById('modal-warga-title').innerHTML = '<i class="fa-solid fa-user-pen text-gold"></i> Edit Data Warga';
        document.getElementById('warga-edit-id').value = res.id;
        document.getElementById('warga-name').value = res.name;
        document.getElementById('warga-block').value = res.block;
        document.getElementById('warga-house-no').value = res.houseNo;
        document.getElementById('warga-phone').value = res.phone;
        document.getElementById('warga-domicile').value = res.domicile;
        document.getElementById('warga-family-members').value = res.members;
        document.getElementById('modal-warga')?.classList.add('active');
      }
    } else if (btnDelete) {
      const wargaId = btnDelete.getAttribute('data-warga-id');
      if (confirm('Yakin ingin menghapus warga ini dari database?')) {
        state.residents = state.residents.filter(r => r.id !== wargaId);
        saveState();
        showToast('Warga berhasil dihapus.', 'info');
        renderAll();
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

// ==================== PWA SERVICE WORKER REGISTRATION ====================

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js')
        .then(reg => console.log('RT-FinSmart ServiceWorker registered', reg.scope))
        .catch(err => console.warn('ServiceWorker registration error', err));
    });
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

  if (publicPortal) publicPortal.style.display = 'block';
  if (adminApp) {
    adminApp.style.display = 'none';
    adminApp.style.visibility = 'hidden';
  }
  hideLoginOverlay();

  // Jika sedang login, tampilkan floating bar admin di atas portal publik
  if (isLoggedIn()) {
    if (adminBar) adminBar.style.display = 'block';
    if (adminRoleEl) {
      adminRoleEl.textContent = state.currentUser === 'b2' ? 'Admin 2 (Jimpitan)' : 'Admin 1 (Super Admin)';
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
 * Update statistik dinamis pada section Transparansi & Data Digital di halaman publik
 */
function updatePublicStats() {
  // 1. Jumlah KK
  const totalResidents = state.residents ? state.residents.length : 71;
  const residentsEl = document.getElementById('public-stat-residents');
  if (residentsEl) residentsEl.textContent = totalResidents;

  // 2. Total Saldo Kas Terkonsolidasi
  try {
    const fin = computeFinancials();
    const balanceEl = document.getElementById('public-stat-balance');
    if (balanceEl) balanceEl.textContent = formatCurrency(fin.totalConsolidatedBalance || 0);
  } catch (err) {
    console.warn('Gagal menghitung saldo konsolidasi publik:', err);
  }

  // 3. Saldo Kas Jimpitan Ronda
  try {
    const jIn = (state.jimpitanIncomes || []).reduce((sum, r) => sum + Number(r.amount || 0), 0);
    const jEx = (state.jimpitanExpenses || []).reduce((sum, r) => sum + Number(r.amount || 0), 0);
    const jBal = jIn - jEx;
    const jimpEl = document.getElementById('public-stat-jimpitan');
    if (jimpEl) jimpEl.textContent = formatCurrency(jBal);
  } catch (err) {
    console.warn('Gagal menghitung saldo jimpitan publik:', err);
  }
}

/**
 * Tampilkan Modal Login Eksekutif Glassmorphism
 */
function showLoginOverlay() {
  const overlay = document.getElementById('login-overlay');
  if (overlay) {
    overlay.classList.remove('fade-out');
    overlay.style.display = 'flex';
    const pinInput = document.getElementById('login-pin-input');
    if (pinInput) setTimeout(() => pinInput.focus(), 150);
  }
}

/**
 * Tutup Modal Login Eksekutif
 */
function hideLoginOverlay() {
  const overlay = document.getElementById('login-overlay');
  if (overlay) {
    overlay.classList.add('fade-out');
    setTimeout(() => {
      if (overlay.classList.contains('fade-out')) {
        overlay.style.display = 'none';
      }
    }, 280);
  }
}

// ==================== LOGIN PORTAL LOGIC ====================

function setupLoginPortal() {
  let selectedRole = null;

  const overlay      = document.getElementById('login-overlay');
  const pinInput     = document.getElementById('login-pin-input');
  const eyeBtn       = document.getElementById('login-eye-btn');
  const eyeIcon      = document.getElementById('login-eye-icon');
  const checkShowPin = document.getElementById('login-toggle-show-pin');
  const errorMsg     = document.getElementById('login-error-msg');
  const roleLabel    = document.getElementById('login-selected-role-label');
  const submitBtn    = document.getElementById('btn-login-submit');
  const showForgot   = document.getElementById('btn-show-forgot');
  const backBtn      = document.getElementById('btn-back-to-login');
  const mainView     = document.getElementById('login-main-view');
  const forgotView   = document.getElementById('login-forgot-view');
  const cardB1       = document.getElementById('login-card-b1');
  const cardB2       = document.getElementById('login-card-b2');
  const copyEmailBtn = document.getElementById('btn-copy-reset-email');
  const closeBtn     = document.getElementById('btn-close-login-overlay');

  // ---- Role card selection ----
  function selectRole(role) {
    selectedRole = role;
    cardB1.classList.remove('selected-b1', 'selected-b2');
    cardB2.classList.remove('selected-b1', 'selected-b2');
    if (role === 'b1') {
      cardB1.classList.add('selected-b1');
      roleLabel.textContent = 'Admin 1';
      roleLabel.style.color = 'var(--gold-400)';
    } else {
      cardB2.classList.add('selected-b2');
      roleLabel.textContent = 'Admin 2';
      roleLabel.style.color = 'var(--emerald-400)';
    }
    if (errorMsg) errorMsg.style.display = 'none';
    if (pinInput) { pinInput.value = ''; pinInput.focus(); }
  }

  if (cardB1) cardB1.addEventListener('click', () => selectRole('b1'));
  if (cardB2) cardB2.addEventListener('click', () => selectRole('b2'));

  // Default selection to B1 for quick entry
  selectRole('b1');

  // ---- Password visibility helper (syncs Eye Icon and Tik Checkbox) ----
  function setPinVisibility(visible) {
    if (pinInput) pinInput.type = visible ? 'text' : 'password';
    if (eyeIcon) eyeIcon.className = visible ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye';
    if (checkShowPin) checkShowPin.checked = visible;
  }

  // Eye icon button toggle
  if (eyeBtn) {
    eyeBtn.addEventListener('click', () => {
      const isCurrentlyHidden = pinInput ? pinInput.type === 'password' : false;
      setPinVisibility(isCurrentlyHidden);
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
    if (!selectedRole) {
      showToast('Pilih akun Admin 1 atau Admin 2 terlebih dahulu.', 'warning');
      return;
    }
    const enteredPin = pinInput.value.trim();
    const correctPin = state.accountPins[selectedRole];

    if (enteredPin === correctPin) {
      // Successful login
      state.currentUser = selectedRole;
      setSession(selectedRole);
      saveState();
      hideLoginOverlay();
      showAdminApp();
      navigateToView(selectedRole === 'b2' ? 'jimpitan' : 'dashboard');
      const label = selectedRole === 'b1' ? 'Admin 1 – Full Control' : 'Admin 2 – Koordinator Jimpitan';
      showToast(`✅ Selamat datang, ${label}!`, 'success');
    } else {
      // Wrong PIN
      if (errorMsg) {
        errorMsg.style.display = 'flex';
        errorMsg.style.animation = 'none';
        requestAnimationFrame(() => { errorMsg.style.animation = ''; });
      }
      pinInput.value = '';
      pinInput.focus();
    }
  }

  if (submitBtn) submitBtn.addEventListener('click', attemptLogin);
  if (pinInput) {
    pinInput.addEventListener('keydown', e => {
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
  const loginTriggers = [
    'btn-open-login-nav',
    'btn-open-login-mobile',
    'btn-open-login-hero',
    'btn-open-login-layanan',
    'btn-open-login-footer'
  ];
  loginTriggers.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('click', () => {
        // Tutup menu mobile jika sedang terbuka
        const mobMenu = document.getElementById('public-mobile-menu');
        if (mobMenu) mobMenu.classList.remove('active');
        showLoginOverlay();
      });
    }
  });

  // ---- Mobile Hamburger Menu on Public Navbar ----
  const mobBtn = document.getElementById('public-menu-btn');
  const mobMenu = document.getElementById('public-mobile-menu');
  if (mobBtn && mobMenu) {
    mobBtn.addEventListener('click', () => {
      mobMenu.classList.toggle('active');
    });
    // Tutup menu saat salah satu link diklik
    document.querySelectorAll('.public-mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        mobMenu.classList.remove('active');
      });
    });
  }

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

// ==================== INIT ====================

document.addEventListener('DOMContentLoaded', () => {
  loadState();
  setupNavigation();
  setupScrollToTop();
  setupModalEventListeners();
  setupDelegatedEvents();
  setupBackupAndRestore();
  setupAccountSwitcher();
  setupJimpitanEvents();
  setupLoginPortal();
  setupLogout();
  registerServiceWorker();
  initDemografi();

  // Check session → if logged in, go to admin dashboard; else show public landing page
  if (isLoggedIn()) {
    const sessionRole = sessionStorage.getItem(LOGIN_SESSION_KEY);
    if (sessionRole === 'b1' || sessionRole === 'b2') {
      state.currentUser = sessionRole;
    }
    showAdminApp();
    navigateToView(state.currentUser === 'b2' ? 'jimpitan' : 'dashboard');
  } else {
    showPublicPortal();
    // Render the app in background so it's ready when user logs in
    try { renderAll(); } catch (e) { console.error('Error pre-rendering admin data', e); }
  }
});


// ==================== ADMIN 1 / ADMIN 2 RBAC ACCESS CONTROL ====================

// Pages only Admin 1 can access
const B1_ONLY_TARGETS = ['dashboard', 'checklist', 'pos-anggaran', 'pengeluaran', 'warga', 'laporan', 'pengaturan'];

function applyRBAC() {
  const isB2 = state.currentUser === 'b2';

  // Sidebar and bottom nav menu items
  document.querySelectorAll('[data-role-req]').forEach(el => {
    const req = el.getAttribute('data-role-req');
    if (req === 'B1' && isB2) {
      el.classList.add('menu-item-locked');
    } else {
      el.classList.remove('menu-item-locked');
    }
  });

  // If Admin 2 user is on an Admin 1-only section, redirect them to jimpitan
  if (isB2) {
    const activeSection = document.querySelector('.view-section.active');
    if (activeSection && activeSection.id !== 'view-jimpitan') {
      navigateToView('jimpitan');
    }
  }

  // Quick-pay button: hide for Admin 2
  const qpBtn = document.getElementById('btn-quick-pay');
  if (qpBtn) qpBtn.style.display = isB2 ? 'none' : '';

  // Demografi edit buttons: hide for Admin 2 (only Admin 1 can edit)
  const demoTopBtn = document.getElementById('btn-top-open-demografi');
  if (demoTopBtn) demoTopBtn.style.display = isB2 ? 'none' : '';
  const demoWargaBtn = document.getElementById('btn-open-demografi-modal-admin');
  if (demoWargaBtn) demoWargaBtn.style.display = isB2 ? 'none' : '';
}

function updateUserProfileUI() {
  const isB2 = state.currentUser === 'b2';
  const nameEl = document.getElementById('sidebar-user-name');
  const roleEl = document.getElementById('sidebar-user-role');
  const badgeEl = document.getElementById('sidebar-role-badge');
  const avatarEl = document.getElementById('sidebar-user-avatar');

  if (isB2) {
    if (nameEl) nameEl.textContent = 'Admin 2';
    if (roleEl) roleEl.textContent = 'Koordinator Jimpitan Ronda';
    if (badgeEl) { badgeEl.textContent = 'Admin 2'; badgeEl.className = 'role-badge role-badge-b2'; }
    if (avatarEl) avatarEl.innerHTML = '<i class="fa-solid fa-moon" style="color:var(--emerald-400);"></i>';
  } else {
    if (nameEl) nameEl.textContent = 'Admin 1';
    if (roleEl) roleEl.textContent = 'Full Control Keuangan';
    if (badgeEl) { badgeEl.textContent = 'Admin 1'; badgeEl.className = 'role-badge role-badge-b1'; }
    if (avatarEl) avatarEl.innerHTML = '<i class="fa-solid fa-user-shield" style="color:var(--gold-400);"></i>';
  }
}

function setupAccountSwitcher() {
  let selectedTargetAccount = null;

  // Open modal
  document.getElementById('btn-open-switch-account')?.addEventListener('click', () => {
    selectedTargetAccount = null;
    document.getElementById('switch-pin-input').value = '';
    document.getElementById('switch-pin-error').style.display = 'none';
    document.getElementById('switch-target-label').textContent = '(Admin 1 atau Admin 2)';
    document.querySelectorAll('.account-select-card').forEach(c => c.classList.remove('selected'));
    openModal('modal-switch-account');
  });

  // Select account card
  document.querySelectorAll('.account-select-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.account-select-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedTargetAccount = card.dataset.account;
      document.getElementById('switch-target-label').textContent =
        selectedTargetAccount === 'b1' ? '(Akun Admin 1)' : '(Akun Admin 2)';
      document.getElementById('switch-pin-input').value = '';
      document.getElementById('switch-pin-error').style.display = 'none';
      document.getElementById('switch-pin-input').focus();
    });
  });

  // Confirm switch
  document.getElementById('btn-confirm-switch-account')?.addEventListener('click', () => {
    if (!selectedTargetAccount) {
      showToast('Silakan pilih akun (Admin 1 atau Admin 2) terlebih dahulu.', 'warning');
      return;
    }
    const enteredPin = document.getElementById('switch-pin-input').value.trim();
    const correctPin = state.accountPins[selectedTargetAccount];
    if (enteredPin === correctPin) {
      state.currentUser = selectedTargetAccount;
      setSession(selectedTargetAccount);
      saveState();
      closeModal('modal-switch-account');
      renderAll();
      navigateToView(selectedTargetAccount === 'b2' ? 'jimpitan' : 'dashboard');
      const label = selectedTargetAccount === 'b1' ? 'Admin 1 (Full Control)' : 'Admin 2 (Koordinator Jimpitan)';
      showToast(`✅ Berhasil masuk sebagai ${label}`, 'success');
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

  // Intercept navigation to Admin 1-only pages when user is Admin 2
  document.addEventListener('click', e => {
    const navItem = e.target.closest('[data-target]');
    if (!navItem || state.currentUser !== 'b2') return;
    const target = navItem.dataset.target;
    if (B1_ONLY_TARGETS.includes(target)) {
      e.preventDefault();
      e.stopPropagation();
      showToast('🔒 Akun Admin 2 hanya berwenang pada menu Uang Jimpitan Ronda.', 'warning');
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
