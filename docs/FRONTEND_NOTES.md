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
### v1.3
- **Eklenen**: **Pop-Up Reklam** — girişte açılan 800x450 modal reklam. Bileşen: `components/PopupAd.jsx`.
  Oturumda **bir kez** gösterilir (`sessionStorage` anahtarı `tm2_popup_seen`), 700ms gecikmeyle açılır,
  dışarı tıkla/× ile kapanır. Veri: `mock.js` → `POPUP_AD {img,url,title}`. CSS: `.popup-ad-back/-box/-tag/-close/-cta/-title/-btn`.
  PHP tarafında: aktif "Pop-UP Reklam Alanı" paketi varsa view'a bas, Alpine `x-data="{open:true}"` + `x-show`, sessionStorage kontrolü JS ile.
- **Eklenen**: **Sıralama çubuğu (SortBar)** — Beğeni / Tarih / Tıklanma. Bileşen: `components/SortBar.jsx`
  (+ export edilen `sortServers(list, sort)` yardımcı fonksiyonu). Anasayfa (varsayılan: Tarih), Kategori & Arama
  (varsayılan: Beğeni) sayfalarında kullanılıyor. VIP bölümü sıralamadan **etkilenmez** (hep beğeniye göre).
  CSS: `.sort-bar/.sort-bar__label/.sort-btn(.active)`. Sıralama alanları: `likes`, `createdAt` (date), `webClicks+discordClicks` (clicks).
- **Eklenen**: **Sistem Rozetleri** — sunucu kartında (sol kolon) açık sistem özelliklerinden ilk 4 tanesi küçük
  rozet olarak, fazlası `+N` olarak gösterilir. Kaynak: `server.system` + `SYSTEM_FEATURE_LABELS`.
  CSS: `.srv-sys-badges/.srv-sys-badge(.srv-sys-badge--more)`.
- **Değişen**: Pop-Up artık **ilk gösterimde** `tm2_popup_seen` yazar (kapatmadan yenilense de tekrar açılmaz).
- **Değişen**: `sortServers` — `likes`/`clicks` için deterministik eşitlik bozucu (`b.id - a.id`) eklendi.
- **Değişen (UI)**: Giriş/Kayıt modalı (`.modal-box`) dikeyde biraz aşağı alındı (`margin-top:6vh`) — çok yukarıda kalıyordu.
### v1.4
- **Eklenen (UX)**: Pop-Up modalı **Escape** ile kapanır + açıkken arka plan **kaydırma kilidi** (`body overflow:hidden`);
  `role="dialog" aria-modal="true"` eklendi.
- **Eklenen**: **Öne Çıkan Rozet Seçimi** — Sunucu Ekle → Sistem Özellikleri sekmesinde, sunucu sahibi kartta
  görünecek rozetleri seçer (en fazla 4). Yeni alan: `server.featuredSystem` (key dizisi). Bir sistem özelliği
  "Yok" yapılırsa öne çıkanlardan otomatik çıkar. `ServerRow` `featuredSystem` varsa onu, yoksa ilk 4 açık
  özelliği gösterir. Seçici CSS: `.badge-picker-wrap/.badge-picker-title/.badge-picker/.badge-pick(.on)`.
  PHP tarafında: `servers.featured_system` (JSON/CSV) ya da ayrı `server_featured_badges` tablosu olarak modellenebilir (öneri, bağlayıcı değil).
- **Değişen**: Arama başlığı "'q' için N sonuç **bulundu**" olarak güncellendi.
- **Eklenen (test)**: `data-testid` — `header-search-input/-submit`, `auth-open-btn`, `featured-badge-picker`, `featured-pick-<key>`.

> Not: Arama sonuçları sayfası (`/ara?q=`) ve Kategori sayfası (`/kategori/{slug}`) zaten mevcut ve tasarım
> diline (`.srv-row`, `.m2-top`, `.card`) sadık; header araması ve anasayfa mod kartları bu sayfalara yönlendirir.
### v1.4.1 (bugfix)
- **Düzeltilen (BUG - KRİTİK)**: Sunucu Ekle'de tab 2'de **"Devam"** butonu formu erken gönderiyordu
  (React aynı buton DOM node'unu kullanıp `type`'ı button→submit değiştiriyordu). Fix: iki nav butonu ayrı
  `key` aldı ve "Serveri Yayınla" `type="button" onClick={submit}` yapıldı. Ayrıca `submit` yalnızca
  `tab === 'sistem'` iken çalışır (Enter ile erken gönderim engellendi).
- **Düzeltilen (BUG)**: "en fazla 4 rozet" toast'u StrictMode'da iki kez tetikleniyordu → `toast` state
  updater'ından çıkarıldı.
- **Değişen**: `ServerRow` "+N" sayacı artık `featuredSystem` üzerinden hesaplanır (sahibi 3 rozet seçtiyse
  yanıltıcı fazladan sayaç çıkmaz).
- **Eklenen (test)**: `addserver-name`, `addserver-title`, `addserver-next-btn`, `addserver-publish-btn`, `sys-select-<key>`.
