# TopMetin2Pvp — Proje Özeti & Kısıtlar (HANDOFF)

> Bu dosya, projeyi **yeni (gizli) bir Emergent projesine** veya **lokal Claude Code ajanlarına** aktarırken
> ilk mesaj olarak yapıştırman için hazırlandı. Kısa özet + mimari kısıtlar + hangi ajanın hangi dosyayı
> okuyacağı burada.

---

## 1) Proje Nedir?

**Metin2 PvP private server tanıtım / toplist platformu.** Sunucu sahipleri kayıt olup sunucularını
tanıtır. Ziyaretçiler serverleri kategorilere göre listeler, oy verir, yorum yapar.

- **Oylama (Beğen): ÜYELİK GEREKTİRMEZ** — tarayıcı/IP başına 1 oy (tekilleştirme).
- **Yorum + yıldız puanı: ÜYELİK GEREKTİRİR.**
- **VIP sistemi (ücretli):** VIP serverler listenin en üstünde altın çerçeveli + "👑 VIP" rozetli görünür.
- **Reklam alanları:** sağ/sol dikey "sayfa giydirme" bannerları, üstte yan yana 2 banner, reklam fiyatları sayfası.

### Kategoriler (6)
`vip-server (VIP)`, `farm-server (Farm)`, `emek-server (Emek)`, `oldschool-server (Oldschool)`,
`newschool-server (Newschool)`, `ws-server (Ws'lik)`

### Sayfalar
- **Anasayfa**: Hoşgeldin hero + 6 mod kartı + üst 2 banner + VIP öne çıkan serverler + son eklenen serverler + istatistikler.
- **Kategori** (`/kategori/{slug}`): kategoriye göre server listesi (beğeniye göre sıralı).
- **Server Detay** (`/server/{id}`): kapak, Server Özellikleri, Sistem Özellikleri, açıklama, Anasayfa/Discord/Beğen butonları, yıldızlı yorumlar (üyelik ister).
- **Sunucu Ekle** (`/sunucu-ekle`): 3 sekmeli form → **Server Bilgileri / Genel Özellikler / Sistem Özellikleri**.
- **Reklam Fiyatları** (`/reklam-fiyatlari`): fiyat kartları + WhatsApp iletişim.
- **Arama** (`/ara?q=`): isim/başlık/kategori araması.
- **Profil** (`/profil`): kullanıcının serverleri, yorumları, ayarları.
- **Admin** (`/admin`): server/üye/yorum yönetimi, VIP toggle.

---

## 2) MİMARİ KISITLAR (ÇOK ÖNEMLİ — DEĞİŞTİRME)

Bu proje **shared hosting** için tasarlandı; kısıtlar bilinçlidir:

- **PHP 8.x** — framework YOK. `app/Core` altında hafif kendi MVC: **Router, Controller, View, Database**.
- **VERİTABANI: MariaDB (MySQL DEĞİL).** "MySQL uyumlu ama MySQL değil."
  - Canlı (Plesk/VPS): **MariaDB 10.11.14**
  - Local (XAMPP): **MariaDB 10.4.32**
  - Bağlantı: **PDO + `pdo_mysql` driver** (MariaDB bunu kullanır), `ATTR_EMULATE_PREPARES => false`,
    **her sorgu prepared statement.**
  - MySQL 8'e özgü **JSON fonksiyonları / window function farklarından KAÇIN** — MariaDB'de farklı davranabilir.
    (Bu yüzden şema JSON kolonu yerine ayrı bool kolonları kullanır — bkz. `database/schema.sql`.)
- **BUILD ADIMI YOK.** Hosting'e `httpdocs/` içine atınca çalışmalı.
  - **Tailwind**: geliştirmede CDN/Play script; **production'a almadan önce Tailwind CLI ile derlenip statik
    `assets/css/app.css` olarak servis edilmeli** ve commit'lenmeli (host'ta derleme yapılmaz).
  - **Alpine.js**: CDN (build gerekmez).
- **Veritabanı kurulumu:** phpMyAdmin'den `database/schema.sql` **import** etmek yeterli olmalı.
- **Sürekli çalışan process YOK** (Java daemon, Node worker, queue consumer yok).
  Zamanlanmış işler `cron/*.php` + Plesk Scheduled Tasks ile.
- Composer/SSH bağımlılığı olmayan, elle yüklenip çalışan saf PHP tercih edilir.
- Ölçekleme (LB, K8s, autoscaling) bu aşamada YOK — tek instance.

---

## 3) Bu Repo Ne İçeriyor? (mevcut durum)

Burada **React + Tailwind ile frontend-only bir PROTOTİP** var (veriler mock + `localStorage`).
Backend YOK. Bu prototip, PHP'ye taşınacak **tasarım/akış referansıdır**. Nihai hedef stack yukarıdaki PHP/MariaDB.

---

## 4) İki Ajan İçin Yol Haritası

- 🧠 **Backend ajanı (Claude Code)** → `docs/BACKEND_NOTES.md` + `database/schema.sql` oku.
  React `AppContext` içindeki iş mantığını PHP MVC + MariaDB'ye taşı. Endpoint sözleşmeleri orada.
- 🎨 **Frontend ajanı (Claude Code)** → `docs/FRONTEND_NOTES.md` oku.
  React bileşen → PHP view eşlemesi, sınıf isimleri, renk/tema tokenları orada. HTML/CSS'i birebir koru.
- Her değişiklikte iki not dosyasındaki **CHANGELOG** bölümüne "eklenen/çıkarılan/değişen" satırı düş.

## 5) Sabitler
- WhatsApp iletişim: **+90 545 224 93 05** (`905452249305`)
- Renk teması (CSS değişkenleri): `--bg:#0b1220; --bg2:#0e1a2c; --card:#0f1f36; --brand:#22c7a9(teal);
  --brand2:#2a8cff(mavi); --warn:#ffb020(turuncu); dle-blue:#3090E8; dle-red:#E00810; vip/altın:#ffce52→#ff8b2a`
- Yazı tipi: **Inter** (Google Fonts).
