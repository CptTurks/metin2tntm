// Mock data for Metin2 PvP Server tanıtım sitesi
// Tüm veriler frontend-only, localStorage ile yönetilir.

export const CATEGORIES = [
  { slug: 'vip-server', label: 'VIP', img: 'https://images.unsplash.com/photo-1553986782-9f6de60b51b4?crop=entropy&cs=srgb&fm=jpg&q=85&w=600' },
  { slug: 'farm-server', label: 'Farm', img: 'https://images.unsplash.com/photo-1460194436988-671f763436b7?crop=entropy&cs=srgb&fm=jpg&q=85&w=600' },
  { slug: 'emek-server', label: 'Emek', img: 'https://images.unsplash.com/photo-1529981188441-8a2e6fe30103?crop=entropy&cs=srgb&fm=jpg&q=85&w=600' },
  { slug: 'oldschool-server', label: 'Oldschool', img: 'https://images.unsplash.com/photo-1600081522768-cb2e80ed4491?crop=entropy&cs=srgb&fm=jpg&q=85&w=600' },
  { slug: 'newschool-server', label: 'Newschool', img: 'https://images.unsplash.com/photo-1640903581708-8d491706515b?crop=entropy&cs=srgb&fm=jpg&q=85&w=600' },
  { slug: 'ws-server', label: "Ws'lik", img: 'https://images.pexels.com/photos/19249878/pexels-photo-19249878.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
];

export const CATEGORY_LABELS = {
  'vip-server': 'VIP Serverler',
  'farm-server': 'Farm Serverler',
  'emek-server': 'Emek Serverler',
  'oldschool-server': 'OldSchool Serverler',
  'newschool-server': 'NewSchool Serverler',
  'ws-server': "Ws'lik Serverler",
};

const BANNERS = [
  'https://images.unsplash.com/photo-1600081728723-c8aa2ee3236a?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200',
  'https://images.unsplash.com/photo-1600081522768-cb2e80ed4491?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200',
  'https://images.pexels.com/photos/19249701/pexels-photo-19249701.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1200',
  'https://images.unsplash.com/photo-1514539079130-25950c84af65?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200',
  'https://images.unsplash.com/photo-1460194436988-671f763436b7?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200',
  'https://images.pexels.com/photos/19249878/pexels-photo-19249878.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1200',
];

export const AD_BANNERS = [
  'https://images.unsplash.com/photo-1640903581708-8d491706515b?crop=entropy&cs=srgb&fm=jpg&q=85&w=600',
  'https://images.unsplash.com/photo-1529981188441-8a2e6fe30103?crop=entropy&cs=srgb&fm=jpg&q=85&w=600',
];

function feat(l, s, k, ke, t, p, b, ko, be, ef) {
  return { lycan: l, simya: s, kusak: k, kemer: ke, tilsim: t, pet: p, binek: b, kostum: ko, beceri: be, efsunSabit: ef };
}

export const SERVERS = [
  {
    id: 311, name: 'Elora2', category: 'farm-server',
    title: 'Elora2 Manas Yormayan 1-105 Yapı | 5 Aralık 21.00\'DA Sizlerle | Dengeli Boss Farmı | Urielx86 %100 Hile Koruması | Sürekli Pvp-Pvm Eventler',
    startLevel: 1, endLevel: 105, likes: 4, banner: BANNERS[0],
    features: feat(false, true, true, true, true, true, true, true, true, false),
    webUrl: 'https://elora2.com', discordUrl: 'https://discord.com/invite/Elora2',
    webClicks: 9, discordClicks: 3, owner: 'mert', createdAt: '2026-01-14',
    description: 'Elora2 Farm serveri, manas yormayan dengeli yapısı ve %100 hile koruması ile sizlerle. 1-105 seviye aralığında sürekli PvP ve PvM eventleri, dengeli boss farmı ile eğlenceli bir oyun deneyimi sunar. Urielx86 altyapısı kullanılmaktadır.',
    comments: [
      { id: 1, user: 'ejderha_avcisi', rating: 5, text: 'Server gerçekten çok dengeli, boss farmı harika. Kesinlikle tavsiye ederim!', date: '2026-01-15' },
      { id: 2, user: 'pvpking', rating: 4, text: 'Hile koruması iyi ama açılışta biraz lag vardı, sonra düzeldi.', date: '2026-01-16' },
    ],
  },
  {
    id: 310, name: 'SoloMT2', category: 'oldschool-server',
    title: 'SoloMT2 1-99 ORTA EMEK | BUGÜN AÇILDI | 150.000 TL ÖDÜL HAVUZU | Özlenen Günlere Işınlanıyoruz | Kaydol 250 EP Değerinde Başlangıç Set Hediye',
    startLevel: 1, endLevel: 99, likes: 3, banner: BANNERS[1],
    features: feat(true, true, true, true, true, false, false, true, false, true),
    webUrl: 'https://solomt2.com', discordUrl: 'https://discord.gg/z3pmuGS8vg',
    webClicks: 4, discordClicks: 1, owner: 'demir', createdAt: '2026-01-12',
    description: 'SoloMT2 oldschool serveri, özlenen günlere geri dönüş! 150.000 TL ödül havuzu, kayıt olan herkese 250 EP değerinde başlangıç seti hediye. 1-99 orta emek yapısı ile klasik metin2 keyfini yaşayın.',
    comments: [
      { id: 1, user: 'nostaljik', rating: 5, text: 'Tam aradığım oldschool server. Ödül havuzu da cabası!', date: '2026-01-13' },
    ],
  },
  {
    id: 309, name: 'ManasMT2', category: 'emek-server',
    title: 'ManasMT2 1-99 Emek Server | Full Emek Yapı | Adil Yönetim | 7/24 Aktif Admin | Yeni Sezon Başladı',
    startLevel: 1, endLevel: 99, likes: 2, banner: BANNERS[2],
    features: feat(true, true, true, true, true, false, false, true, false, true),
    webUrl: 'https://manasmt2.com', discordUrl: 'https://discord.gg/manasmt2',
    webClicks: 12, discordClicks: 6, owner: 'kaan', createdAt: '2026-01-10',
    description: 'ManasMT2 tam emek serveri, adil yönetim ve 7/24 aktif admin kadrosu ile yeni sezonuna başladı. Full emek yapısı ile gerçek metin2 deneyimini yaşayın.',
    comments: [],
  },
  {
    id: 308, name: 'DragonPvP', category: 'vip-server', vip: true,
    title: 'DragonPvP 1-120 VIP Server | Sınırsız Item | Anında Level | VIP Sisteminde Devrim | Hemen Katıl',
    startLevel: 1, endLevel: 120, likes: 8, banner: BANNERS[3],
    features: feat(true, true, true, true, true, true, true, true, true, false),
    webUrl: 'https://dragonpvp.com', discordUrl: 'https://discord.gg/dragonpvp',
    webClicks: 25, discordClicks: 14, owner: 'ares', createdAt: '2026-01-08',
    description: 'DragonPvP VIP serveri, sınırsız item ve anında level sistemi ile PvP tutkunları için tasarlandı. VIP sisteminde devrim niteliğinde yeniliklerle sizi bekliyoruz.',
    comments: [
      { id: 1, user: 'vipgamer', rating: 5, text: 'VIP sistemi gerçekten farklı, çok beğendim.', date: '2026-01-09' },
      { id: 2, user: 'silahsor', rating: 5, text: 'PvP dengesi çok iyi ayarlanmış.', date: '2026-01-10' },
      { id: 3, user: 'metin2ci', rating: 3, text: 'İyi ama biraz pay2win olmuş bence.', date: '2026-01-11' },
    ],
  },
  {
    id: 307, name: 'PhoenixMT2', category: 'newschool-server', vip: true,
    title: 'PhoenixMT2 1-105 NewSchool | Modern Arayüz | Yeni Skiller | Binek & Kostüm Sistemi | Açılışa Özel Bonuslar',
    startLevel: 1, endLevel: 105, likes: 6, banner: BANNERS[4],
    features: feat(true, true, true, true, true, true, true, true, true, false),
    webUrl: 'https://phoenixmt2.com', discordUrl: 'https://discord.gg/phoenixmt2',
    webClicks: 18, discordClicks: 9, owner: 'zephyr', createdAt: '2026-01-06',
    description: 'PhoenixMT2 newschool serveri, modern arayüz ve yeni skiller ile klasik metin2yı yeniden yorumluyor. Binek ve kostüm sistemleri, açılışa özel bonuslarla dolu.',
    comments: [
      { id: 1, user: 'modernci', rating: 4, text: 'Arayüz çok şık olmuş, yeni skiller güzel.', date: '2026-01-07' },
    ],
  },
  {
    id: 306, name: 'WarZoneMT2', category: 'ws-server',
    title: "WarZoneMT2 Ws'lik Server | Sürekli Savaş | Kalabalık Kitle | Anlık PvP | Guild Savaşları",
    startLevel: 1, endLevel: 99, likes: 5, banner: BANNERS[5],
    features: feat(false, false, true, true, false, false, false, true, true, false),
    webUrl: 'https://warzonemt2.com', discordUrl: 'https://discord.gg/warzonemt2',
    webClicks: 21, discordClicks: 11, owner: 'komutan', createdAt: '2026-01-04',
    description: "WarZoneMT2 ws'lik serveri, sürekli savaş ve anlık PvP odaklı yapısı ile kalabalık bir oyuncu kitlesine sahip. Guild savaşları ve büyük çaplı PvP eventleri ile adrenalin dolu anlar.",
    comments: [
      { id: 1, user: 'savasci42', rating: 5, text: 'WS sever biri olarak burası tam benlik!', date: '2026-01-05' },
      { id: 2, user: 'clanlider', rating: 4, text: 'Guild savaşları çok keyifli.', date: '2026-01-06' },
    ],
  },
];

export const FEATURE_LABELS = {
  lycan: 'Lycan', simya: 'Simya', kusak: 'Kuşak', kemer: 'Kemer', tilsim: 'Tılsım',
  pet: 'Levelli Pet', binek: 'Binek Sistemi', kostum: 'Kostümler', beceri: 'Yeni Beceriler',
};

// Sistem Özellikleri (Sunucu Ekle - 3. sekme)
export const SYSTEM_FEATURE_LABELS = {
  kEnvanter: '(K) Envanter',
  bossTakip: 'Boss Takip Sistemi',
  guvenliPc: 'Güvenli PC Girişi',
  loncaAjan: 'Lonca Ajan Sistemi',
  ticaretCami: 'Ticaret Camı',
  yardimciSaman: 'Yardımcı Şaman',
  cevrimdisiPazar: 'Çevrimdışı Pazar',
  itemKilitleme: 'İtem Kilitleme Sistemi',
};

export const DEFAULT_SYSTEM = {
  kEnvanter: true, bossTakip: true, guvenliPc: true, loncaAjan: true,
  ticaretCami: true, yardimciSaman: true, cevrimdisiPazar: true, itemKilitleme: true,
};

// Mevcut mock serverlere varsayılan sistem/yönetim alanları ekle
const ONLINE_SEED = [128, 342, 87, 512, 291, 176];
SERVERS.forEach((s, i) => {
  if (!s.system) {
    s.system = { ...DEFAULT_SYSTEM };
    // biraz çeşitlilik: bazı serverlerde bazı özellikler kapalı
    if (i % 2 === 1) { s.system.cevrimdisiPazar = false; s.system.loncaAjan = false; }
    if (i % 3 === 0) { s.system.yardimciSaman = false; }
  }
  s.hidden = false;
  s.vipTier = s.vip ? 'red' : 'none';
  s.vipUntil = s.vip ? '2026-12-31' : '';
  s.featured = !!s.vip;
  s.online = ONLINE_SEED[i] ?? 0;
  s.featuredSystem = s.featuredSystem || [];
  s.taxTags = s.taxTags || [];
  s.comments = (s.comments || []).map((c) => ({ hidden: false, ...c }));
});
// Çeşitlilik için bir sunucuyu yeşil VIP yap
const _phoenix = SERVERS.find((s) => s.name === 'PhoenixMT2');
if (_phoenix) _phoenix.vipTier = 'green';

// VIP kademe etiketleri (gerçek backend: yeşil/kırmızı iki kademe)
export const VIP_TIERS = { none: 'Yok', green: 'Yeşil', red: 'Kırmızı' };

export const SITE_STATS = {
  serverCount: 6, memberCount: 1284, totalVotes: 4127, dailyVisits: 8563,
};

export const MOCK_USER = {
  username: 'mert',
  email: 'mert@topmetin2pvp.com',
  rank: 'Yönetici',
  registerDate: '2025-11-30',
  avatar: null,
  isAdmin: true,
};

// WhatsApp iletişim numarası (reklam talepleri için)
export const WA_NUMBER = '905452249305';

// Girişte açılan Pop-Up reklam (800x450) — reklam fiyatları sayfasındaki "Pop-UP Reklam Alanı"
export const POPUP_AD = {
  img: 'https://images.unsplash.com/photo-1668261834846-eb10673033bf?crop=entropy&cs=srgb&fm=jpg&q=85&w=1000',
  url: 'https://discord.gg/topmetin2pvp',
  title: 'HasMt2 — Büyük Açılış! 1-105 Emek Server',
};

// Sağ/Sol dikey "sayfa giydirme" (page skin) bannerları (portrait ~220x900)
export const SIDE_BANNERS = {
  left: 'https://images.unsplash.com/photo-1779274243035-9a53377374c2?crop=entropy&cs=srgb&fm=jpg&q=85&w=440',
  right: 'https://images.unsplash.com/photo-1672673321304-07d3c58247a0?crop=entropy&cs=srgb&fm=jpg&q=85&w=440',
};

// Üstte yan yana 2 adet geniş reklam bannerı (reklamlı sunucular)
export const TOP_BANNERS = [
  { img: 'https://images.unsplash.com/photo-1600081728723-c8aa2ee3236a?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200', url: '#', title: 'HasMt2' },
  { img: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200', url: '#', title: 'Rumeli2' },
];

// Reklam fiyatları (orijinal reklam-fiyatlari sayfasından)
export const AD_PRICES = [
  { icon: 'crown', name: 'VIP Server Bölümü', size: 'Liste en üstünde', duration: '1 Ay', price: '500 TL', highlight: true },
  { icon: 'rocket', name: 'Pop-UP Reklam Alanı', size: '800x450', duration: '1 Hafta', price: '2500 TL' },
  { icon: 'rocket', name: 'Sidebar Kare Reklam Alanı', size: '203x250', duration: '1 Hafta', price: '1000 TL' },
  { icon: 'rocket', name: 'Sağ Kayan Sabit Dikey Reklam', size: '220x911', duration: '1 Hafta', price: '2500 TL' },
  { icon: 'rocket', name: 'Sol Kayan Sabit Dikey Reklam', size: '220x911', duration: '1 Hafta', price: '2500 TL' },
  { icon: 'rocket', name: 'Site Üst Yatay Reklam Alanı', size: '1444x206', duration: '1 Hafta', price: '2500 TL' },
  { icon: 'rocket', name: 'Orta Reklam Kare - 1', size: '329x274', duration: '1 Hafta', price: '1000 TL' },
  { icon: 'rocket', name: 'Orta Reklam Kare - 2', size: '329x274', duration: '1 Hafta', price: '1000 TL' },
  { icon: 'rocket', name: 'Orta Reklam Kare - 3', size: '329x274', duration: '1 Hafta', price: '1000 TL' },
  { icon: 'rocket', name: 'Konu İçi Alt Geniş Reklam', size: '750x245', duration: '1 Hafta', price: '750 TL', accent: true },
  { icon: 'rocket', name: 'Konu İçi Kare - 1', size: '329x274', duration: '1 Hafta', price: '750 TL', accent: true },
  { icon: 'rocket', name: 'Konu İçi Kare - 2', size: '329x274', duration: '1 Hafta', price: '750 TL', accent: true },
];

// Sunucu Ekle bilgilendirme popup'ı kuralları (** ile kalın)
export const INFO_RULES = [
  { icon: 'check', text: 'Sadece **aktif ve erişilebilir** sunucuları sitemize ekleyiniz.' },
  { icon: 'warn', text: 'Oyun içerisinde, haksızlıklara, yardımlara müsade etmeyin.' },
  { icon: 'clock', text: 'Kısa süreli server olmaktan kaçının. Oyuncularınıza kaliteli hizmet verin.' },
  { icon: 'pin', text: 'Gerekli görüldüğünde, kurallara uymayan ilanlar **haber verilmeden kaldırılabilir.**' },
];

// Admin — reklam (banner) yönetimi başlangıç verisi
export const BANNER_POSITIONS = {
  sol: 'Sol Dikey', sag: 'Sağ Dikey', ust: 'Üst Yatay', popup: 'Pop-Up',
  'sayfa-giydirme': 'Sayfa Giydirme', orta: 'Orta Kare',
};
export const ADMIN_BANNERS = [
  { id: 1, position: 'popup', img: POPUP_AD.img, url: POPUP_AD.url, clicks: 152, impressions: 4300, active: true, start: '2026-06-01', end: '2026-06-30' },
  { id: 2, position: 'ust', img: TOP_BANNERS[0].img, url: '#', clicks: 88, impressions: 2100, active: true, start: '2026-06-01', end: '2026-06-15' },
  { id: 3, position: 'sol', img: SIDE_BANNERS.left, url: '#', clicks: 40, impressions: 1500, active: true, start: '', end: '' },
  { id: 4, position: 'sag', img: SIDE_BANNERS.right, url: '#', clicks: 33, impressions: 1450, active: false, start: '', end: '' },
];

// Admin — site duyurusu (üst bar)
export const ANNOUNCEMENT_SEED = { text: '🎉 Yeni sezon başladı! Sunucunu ekle, ilk hafta üst sırada öne çık.', active: true };

// Admin — özellik (taksonomi) yönetimi: kategori > etiket. Sunucu ekleme formunu besler.
export const TAXONOMY_SEED = [
  { id: 1, name: 'Seviye Aralığı', tags: [{ id: 11, name: '1-99' }, { id: 12, name: '1-105' }, { id: 13, name: '1-120' }] },
  { id: 2, name: 'Zorluk', tags: [{ id: 21, name: 'Emek' }, { id: 22, name: 'Orta' }, { id: 23, name: 'Kolay' }] },
  { id: 3, name: 'Ekol', tags: [{ id: 31, name: 'Oldschool' }, { id: 32, name: 'Newschool' }] },
];
