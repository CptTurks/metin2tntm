# FRONTEND NOTLARI — Claude Code (Frontend Ajanı) İçin

Hedef: React prototipini **server-side PHP view + Tailwind (derlenmiş) + Alpine.js**'e taşımak.
**Build yok** (host'ta): Tailwind lokalde CLI ile derlenip `assets/css/app.css` commit edilir. Alpine CDN.
Tasarım/HTML/CSS **birebir korunmalı** — sınıf isimleri ve tema tokenları aşağıda.

---

## 1) React Bileşeni → PHP View Eşlemesi

| React (bu repo) | PHP View | Not |
|---|---|---|
| `components/Layout.jsx` | `Views/layouts/main.php` | header + içerik + footer + sağ/sol ad-slot grid |
| `components/Header.jsx` | `Views/partials/header.php` | logo, 9-nokta uygulamalar menüsü, arama, AYARLAR, kullanıcı menüsü, Yeni Server Ekle. **Dropdownlar CLICK ile açılır + dışarı tıklayınca kapanır (Alpine `x-data`/`@click.outside`)** — hover DEĞİL (bug'dı) |
| `components/Footer.jsx` (Footer) | `Views/partials/footer.php` | linkler + telif |
| `components/Footer.jsx` (AdSlot) | `Views/partials/ad-slots.php` | sağ/sol **dikey "sayfa giydirme"** banner (sticky) |
| `components/HomeSections.jsx` | `home.php` içine parçalar | WelcomeHero, ServerModes(6 kart), TopBanners(2), StatsRow(4) |
| `components/ServerRow.jsx` | `Views/partials/server-row.php` | 3 kolon (sol meta / orta banner+isim / sağ butonlar). `is_vip` → altın çerçeve + "👑 VIP" rozeti |
| `components/AuthModal.jsx` | `Views/partials/auth-modal.php` | Giriş/Kayıt sekmeli modal (Alpine) |
| `pages/Home.jsx` | `Views/home.php` | VIP bölümü normal listenin ÜSTÜNDE |
| `pages/CategoryPage.jsx` | `Views/category.php` | |
| `pages/ServerDetail.jsx` | `Views/server-detail.php` | Server Özellikleri + **Sistem Özellikleri** + yorumlar (yıldız) |
| `pages/AddServer.jsx` | `Views/add-server.php` | **3 sekme**: Server Bilgileri / Genel Özellikler / Sistem Özellikleri (Alpine tab state) |
| `pages/ReklamFiyatlari.jsx` | `Views/reklam-fiyatlari.php` | fiyat kartları + WhatsApp `wa.me/905452249305` |
| `pages/SearchPage.jsx` | `Views/search.php` | `?q=` |
| `pages/Profile.jsx` | `Views/profil.php` | sekmeler: Serverlerim / Yorumlarım / Ayarlar |
| `pages/Admin.jsx` | `Views/admin.php` | sekmeler: Server / Üye / Yorum yönetimi |
| `context/AppContext.js` | — | Backend'e taşınır; view'lar controller'dan veri alır, aksiyonlar `/api/*` fetch |
| `mock/mock.js` | `database/seed.sql` | başlangıç kategorileri, örnek serverler, ad_prices |

---

## 2) Tema Tokenları (CSS — birebir kullan)

`styles/site.css` içindeki değişkenleri Tailwind config veya `:root`'a taşı:
```
--bg:#0b1220; --bg2:#0e1a2c; --card:#0f1f36; --card2:#132747;
--stroke:rgba(255,255,255,.08); --text:#e9f2ff; --muted:#9eb2ce;
--brand:#22c7a9; --brand2:#2a8cff; --warn:#ffb020;
--dle-blue:#3090E8; --dle-red:#E00810; --mode-accent:#f0a44b;  /* vip altın: #ffce52 → #ff8b2a */
```
Önemli sınıflar (birebir taşı): `.site-header .header-inner .brand-logo .apps-dots .apps-dropdown`,
`.content-grid .ad-slot .side-skin .top-banners .top-banner`,
`.m2-modes__grid .m2-mode`, `.m2-top (.m2-top--vip)`, `.srv-row (.srv-vip .srv-vip-badge)`,
`.feature-chip (.yes/.no)`, `.price-grid .price-card (.is-vip .is-accent) .price-ribbon`,
`.tabs-bar .tab-btn`, `.modal-back .modal-box`, `.stars .star`.

Body arka planı radial+linear gradient (site.css'teki `body` kuralı) korunmalı.
Yazı tipi: **Inter** (Google Fonts `<link>`).

---

## 3) Alpine.js ile Değişecek Etkileşimler
- Header dropdownları: `x-data="{open:false}"` + `@click`, `@click.outside="open=false"` (hover kullanma).
- AuthModal: `x-data="{tab:'login'}"`.
- AddServer sekmeleri: `x-data="{tab:'bilgi'}"` + Geri/Devam.
- Beğen / Discord / Anasayfa butonları: `fetch('/api/...')`, dönen sayacı DOM'da güncelle, toast göster.
- Yorum formu: `fetch('/api/comment')`; üye değilse AuthModal aç.

## 4) Görsel Notu
Mevcut görseller Unsplash/Pexels (telifsiz) placeholder. Canlıda gerçek server bannerları `uploads/`'tan gelecek.
Kategori kart görselleri `categories.image`, server kapakları `servers.banner` alanından.

---

## 5) CHANGELOG (frontend) — her değişiklikte güncelle

### v1.0 — İlk prototip
- **Eklenen**: Anasayfa, Kategori, Server Detay, Sunucu Ekle, Profil, Admin; koyu tema; mock veri.
### v1.1
- **Eklenen**: Reklam Fiyatları sayfası; üst 2 banner + sağ/sol dikey "sayfa giydirme" banner; VIP öne çıkan
  serverler bölümü (altın çerçeve/rozet); arama sonuç sayfası (`/ara`).
- **Düzeltilen (BUG)**: Header profil/uygulamalar menüsü hover'da tıklanamadan kapanıyordu →
  **click-toggle + dışarı tıklayınca kapanma** yapıldı. (PHP tarafında Alpine `@click.outside` ile aynı davranış.)
### v1.2
- **Eklenen**: Sunucu Ekle formu **3 sekmeli** oldu (Server Bilgileri / Genel Özellikler / **Sistem Özellikleri**).
- **Eklenen**: Sistem Özellikleri (8 alan) — server detay sayfasında da ✅/❌ listeleniyor.
