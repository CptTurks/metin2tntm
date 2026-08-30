# BACKEND NOTLARI — Claude Code (Backend Ajanı) İçin

Hedef stack: **PHP 8.x (framework yok) + kendi hafif MVC (app/Core) + MariaDB (PDO)**.
Kısıtların tamamı `/HANDOFF.md`'de. Bu dosya: klasör yapısı, DB modeli, endpoint sözleşmeleri, iş kuralları.

---

## 0) DB Bağlantı Kuralı (zorunlu)

```php
// app/Core/Database.php
$dsn = "mysql:host={$h};port={$port};dbname={$db};charset=utf8mb4";
$pdo = new PDO($dsn, $user, $pass, [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,   // ZORUNLU
]);
```
- **MariaDB 10.11 (canlı) / 10.4 (local).** MySQL 8 JSON fonksiyonları / bazı window function'lardan KAÇIN.
- Her sorgu **prepared statement** (kullanıcı girdisi asla string concat ile SQL'e girmez).
- Şifreler: `password_hash()` / `password_verify()` (bcrypt).

---

## 1) Önerilen Klasör Yapısı (build yok, httpdocs'a atınca çalışır)

```
httpdocs/
  .htaccess               # tüm istekleri index.php'ye yönlendir (RewriteEngine)
  index.php               # front controller (bootstrap + Router)
  config.php              # DB kimlik bilgileri (git'e koyma; config.sample.php commit et)
  app/
    Core/  Router.php  Controller.php  View.php  Database.php  Auth.php  Csrf.php  Request.php
    Controllers/  HomeController.php  ServerController.php  AuthController.php
                  ProfileController.php  AdminController.php  AdController.php  ApiController.php
    Models/  Server.php  User.php  Comment.php  Vote.php  Category.php  AdPrice.php
    Views/   layouts/main.php  partials/{header,footer,ad-slots,server-row,auth-modal}.php
             {home,category,server-detail,add-server,reklam-fiyatlari,profil,admin,search}.php
  assets/  css/app.css (derlenmiş Tailwind)  js/app.js (Alpine yardımcıları)
  uploads/                # banner yüklemeleri (yazılabilir)
  storage/                # log/cache (yazılabilir)
  cron/                   # cron/*.php (daemon yok)
database/  schema.sql  seed.sql
```

`.htaccess` örneği:
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.php [QSA,L]
```

---

## 2) Veri Modeli (detay: database/schema.sql)

Tablolar: `users`, `categories`, `servers`, `server_features`, `server_system`, `comments`, `votes`,
`clicks`, `ad_prices`. Booleanlar `TINYINT(1)`. Charset `utf8mb4_unicode_ci`.

Özellik kolonları JSON DEĞİL, ayrı bool kolonlar (MariaDB uyumu için):
- **server_features**: lycan, simya, kusak, kemer, tilsim, pet, binek, kostum, beceri, efsun_sabit
- **server_system**: k_envanter, boss_takip, guvenli_pc, lonca_ajan, ticaret_cami, yardimci_saman,
  cevrimdisi_pazar, item_kilitleme

---

## 3) Sayfa Route'ları (server-rendered)

| Metod | Yol | Açıklama | Yetki |
|---|---|---|---|
| GET | `/` | Anasayfa (hero, modlar, üst banner, VIP serverler, son serverler, istatistik) | herkes |
| GET | `/kategori/{slug}` | Kategoriye göre liste (likes DESC) | herkes |
| GET | `/server/{id}` | Server detay (özellikler + sistem + yorumlar) | herkes |
| GET | `/sunucu-ekle` | 3 sekmeli ekleme formu | üye |
| POST | `/sunucu-ekle` | Server oluştur | üye |
| GET | `/reklam-fiyatlari` | Reklam paketleri | herkes |
| GET | `/ara?q=` | Arama sonuçları | herkes |
| GET | `/profil` | Kullanıcı paneli | üye |
| GET | `/admin` | Yönetim paneli | admin |
| POST | `/giris` `/kayit` `/cikis` | Auth | - |

## 4) AJAX / JSON Endpoint'leri (Alpine.js fetch) — CSRF token zorunlu

| Metod | Yol | Body | Kural |
|---|---|---|---|
| POST | `/api/vote` | `{server_id}` | **Üyeliksiz.** IP hash + cookie ile tekilleştir; aynı server'a 2. oy → 409 |
| POST | `/api/click` | `{server_id, type: 'web'\|'discord'}` | Sayaç +1, ilgili URL'yi döndür |
| POST | `/api/comment` | `{server_id, rating(1-5), body}` | **Üye zorunlu**; XSS için body escape |
| POST | `/api/admin/server/delete` | `{id}` | admin |
| POST | `/api/admin/vip/toggle` | `{id}` | admin |
| POST | `/api/admin/comment/delete` | `{id}` | admin |

JSON yanıt formatı: `{ ok: bool, msg: string, data?: any }`.

## 5) İş Kuralları (React AppContext'ten birebir)

- **voteServer(id)**: IP zaten oy verdiyse `{ok:false, msg:'Bu server için zaten oy kullandınız.'}`,
  aksi halde `servers.likes++` ve `votes` tablosuna kayıt.
- **trackClick(id,type)**: `web_clicks` veya `discord_clicks` +1 (ve `clicks` log satırı).
- **addComment**: sadece üye; ortalama puan = yorumların rating ortalaması.
- **addServer**: `owner_id = oturum kullanıcısı`, yeni server default `is_vip=0`, sayaçlar 0.
- **VIP**: `is_vip=1` olan serverler anasayfada normal listenin ÜSTÜNDE, `likes DESC` sıralı; VIP paketi
  "VIP Server Bölümü — 1 Ay — 500 TL" (bkz. ad_prices). `vip_until` tarih alanı ile süre; cron ile süresi
  bitenleri `is_vip=0` yap (`cron/expire_vip.php`).
- **Admin**: server/yorum silme, üye listeleme, VIP aç/kapat.

## 6) Güvenlik
- Tüm formlarda **CSRF token** (`app/Core/Csrf.php`).
- View'larda çıktı `htmlspecialchars()` ile escape.
- Yetki kontrolü Controller seviyesinde (`Auth::requireUser()`, `Auth::requireAdmin()`).
- Dosya yükleme: mime/uzantı whitelist (jpg,png,gif,webp), boyut limiti, `uploads/` altına rastgele isim.

---

## 7) CHANGELOG (backend) — her değişiklikte güncelle

### [Başlangıç] Frontend prototipinden çıkarılan sözleşme
- **Eklenen**: DB şeması (schema.sql), endpoint tablosu, iş kuralları yukarıda tanımlandı.
- **Çıkarılan**: React `localStorage` katmanı → MariaDB kalıcı depolamaya taşınacak.
- **Not**: Voting üyeliksiz (IP dedupe); yorum/puan üyelik ister; VIP ücretli & üstte.
