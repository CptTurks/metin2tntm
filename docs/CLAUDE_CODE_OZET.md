# TopMetin2Pvp — Claude Code Devir Özeti (Frontend Prototip Durumu)

> Bu dosya, projeyi lokal **Claude Code** ajanına anlatmak için hazırlandı.
> Backend (PHP 8 + MariaDB) SENDE ve ayrı yazılıyor; buradaki React app yalnızca
> **tasarım/akış referansı**. Aşağıdaki veri alanları "frontend'in beklediği şekil"dir,
> bağlayıcı şema DEĞİLDİR — kendi MariaDB modeline uyarlayabilirsin.

## 1) Proje Nedir
Metin2 PvP private server tanıtım / toplist platformu. Sunucu sahipleri kayıt olup sunucu ekler;
ziyaretçiler kategoriye göre listeler, **üyeliksiz beğenir**, **üye olarak yorum + yıldız** verir.
Dil: Türkçe. Tema: koyu lacivert/teal. Font: Inter.

## 2) Teknik / Mimari
- Frontend: React (CRA) + React Router + Tailwind + **düz CSS** (`src/styles/site.css`, class-isimli: `.srv-row`, `.m2-top`, `.sort-bar` vb. — PHP view'a birebir taşınabilir).
- State/veri: mock + `localStorage` (`src/context/AppContext.js`, `src/mock/mock.js`). Backend YOK.
- Hedef backend (sende): PHP 8 custom MVC + MariaDB (PDO, prepared statements). Build adımı yok.

## 3) Sayfalar (route → dosya)
- `/` Anasayfa — `pages/Home.jsx` (hero, 6 mod kartı, üst bannerlar, **VIP öne çıkan**, sıralama çubuğu, son eklenenler, **blog şeridi**, istatistik).
- `/kategori/:slug` — `pages/CategoryPage.jsx`
- `/server/:id` — `pages/ServerDetail.jsx`
- `/sunucu-ekle` — `pages/AddServer.jsx` (3 sekme: Server Bilgileri / Genel Özellikler / Sistem Özellikleri) + giriş **BİLGİLENDİRME popup**
- `/reklam-fiyatlari` — `pages/ReklamFiyatlari.jsx` (dokunulmadı, sende DB'ye taşınacak)
- `/ara?q=` — `pages/SearchPage.jsx`
- `/profil` — `pages/Profile.jsx` (serverlerim + kart rozet düzenleme modalı)
- `/admin` — `pages/Admin.jsx` (5 sekme, aşağıda)
- `/gm-kodlari` — `pages/GmKodlari.jsx` (aranabilir + kategori sekmeleri + kopyala)
- `/blog` + `/blog/:id` — `pages/Blog.jsx`, `pages/BlogDetail.jsx` (paylaşım butonları)

## 4) Frontend'in Beklediği Veri Alanları (uyarlanabilir)
**server**: id, name, title, category, startLevel, endLevel, banner, webUrl, discordUrl, description,
likes, webClicks, discordClicks, owner, createdAt, comments[],
`hidden` (bool — yayından kaldırma), `vipTier` ('none'|'green'|'red'), `vipUntil` (tarih),
`featured` (bool — anasayfa vitrini/"öneri"), `online` (sayı), `featuredSystem` (kartta gösterilecek sistem anahtarları, max 4),
`features` ve `system`: her biri **3 durumlu** değer → `'var' | 'yok' | 'na'` ('na' = hiç gösterilmez).
- features anahtarları: lycan, simya, kusak, kemer, tilsim, pet, binek, kostum, beceri, efsunSabit
- system anahtarları: cevrimdisiPazar, yardimciSaman, kEnvanter, ticaretCami, bossTakip, loncaAjan, guvenliPc, itemKilitleme

**comment**: id, user, rating(1-5), text, date, `hidden`(bool).
**user**: username, email, password, rank, registerDate, `isAdmin`(bool).
**banner** (reklam): id, position ('sol'|'sag'|'ust'|'popup'|'sayfa-giydirme'|'orta'), img, url, clicks, impressions, active, start, end.
**announcement**: {text, active} (üst duyuru barı).
**taxonomy** (admin özellik yönetimi): [{id, name, tags:[{id,name}]}].
**infoRules** (Sunucu Ekle popup kuralları): [{id, icon('check'|'warn'|'clock'|'pin'), text}] — `**metin**` kalın.

## 5) İş Kuralları
- **Beğen: üyeliksiz**, tarayıcı başına 1 oy (dedupe). **Yorum/puan: üye zorunlu**.
- VIP kademe **yeşil/kırmızı + bitiş tarihi** (tek bayrak değil). Kartta rozet YOK; VIP sunucunun **adı VIP renginde** + yanında **taç**.
- `featured` sunucular anasayfada üst "VIP Öne Çıkan" vitrininde (likes DESC).
- `hidden` sunucular tüm public listelerden ve doğrudan `/server/:id`'den (admin hariç) gizli.
- Kart sağ üstte canlı `online` sayacı + beğeni. Sistem rozetlerinde "+N" **statik** (tıklanmaz, kart büyümez; detayda görünür).
- Banner: görüntülenince impression, tıklanınca click artar; **/admin'de impression sayılmaz**.

## 6) Admin Paneli (5 sekme) — `pages/Admin.jsx`
1. **Server**: Aktif/Gizle toggle, VIP kademe (Yok/Yeşil/Kırmızı) + bitiş tarihi, Öneri toggle, Sil, **"süresi dolmak üzere" VIP filtresi**.
2. **Üye**: Düzenle modalı — rol (Üye/Admin) + şifre sıfırlama.
3. **Yorum**: Gizle/Göster toggle + Sil.
4. **Reklam**: banner CRUD + Aktif/Pasif; **Site Duyurusu** metni & aç/kapa; **Sunucu Ekle Bilgilendirme Kuralları** editörü.
5. **Özellik**: taksonomi kategori/etiket CRUD.

## 7) Değişiklik Geçmişi
Tüm frontend değişiklikleri detaylı olarak: **`docs/FRONTEND_NOTES.md` → CHANGELOG (v1.3 … v1.8)**.
Her yeni değişikliği oraya "eklenen/çıkarılan/değişen" olarak işlemeye devam et.

## 8) Sabitler
- WhatsApp: `905452249305`. Admin test hesabı (mock): `mert / 123456`.
- Renkler: `--brand:#22c7a9` (teal), `--brand2:#2a8cff` (mavi), VIP yeşil `#34d399`, VIP kırmızı `#ff6b73`, altın `#ffce52→#ff8b2a`.
