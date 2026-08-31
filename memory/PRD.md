# TopMetin2Pvp — Metin2 PvP Server Tanıtım Sitesi (PRD)

## Orijinal Problem / Amaç
Metin2 private server tanıtım + toplist platformu. Sunucu sahipleri kayıt olup sunucularını tanıtır.
Bu proje **pixel-perfect Frontend Prototipi**: React + Tailwind + LocalStorage (mock backend YOK).
Kullanıcı bunu daha sonra kendi lokal AI ajanlarıyla **PHP 8.x (framework yok, custom MVC) + MariaDB 10.11**
stack'ine port edecek. React app sadece UI/UX blueprint'idir.

**Kullanıcı dili: Türkçe (ajan Türkçe cevap vermeli).**

## Kullanıcının Bağlayıcı Kuralları
1. Backend/DB şeması İCAT ETME — gerçek backend PHP+MariaDB'de ayrı yazılıyor (VIP iki kademeli kırmızı/yeşil+tarih;
   özellikler dinamik taksonomi). HANDOFF/BACKEND_NOTES öneri olarak kalabilir, bağlayıcı değil.
2. CSS düz, class-isimli, React'e bağımsız olmalı (site.css tarzı: `.srv-row`, `.m2-mode`, `.sort-bar`).
   shadcn/Radix'e gömülü stil YAZMA — PHP'ye taşınamıyor.
3. Her tasarım değişikliğinde `docs/FRONTEND_NOTES.md` CHANGELOG'una eklenen/çıkarılan/değişen yaz.
4. Reklam fiyat kartları sayfasına dokunma (DB'ye taşınacak).
5. Görsellerde Unsplash/Pexels placeholder kullanımı OK.

## Teknik Mimari
- `/app/frontend` React (CRA) + Tailwind + plain CSS (`src/styles/site.css`)
- State: `context/AppContext.js` (localStorage mock), veri: `mock/mock.js`
- Sayfalar: Home, CategoryPage, ServerDetail, AddServer (3 sekme), Profile, Admin, ReklamFiyatlari, SearchPage
- Handoff docs: `/app/HANDOFF.md`, `/app/docs/*`, `/app/database/schema.sql` (öneri niteliğinde)

## Tamamlanan İşler
### Önceki oturumlar
- Koyu/teal tema UI, tüm sayfalar, mock veri, reklam bannerları, VIP bölümü (altın çerçeve), 3 sekmeli Sunucu Ekle, header dropdown click-toggle fix.
### Bu oturum (Haziran 2026)
- **Pop-Up Reklam** (`components/PopupAd.jsx`): girişte 800x450 modal, oturumda bir kez (`sessionStorage: tm2_popup_seen`), ilk gösterimde işaretlenir.
- **Sıralama Filtresi** (`components/SortBar.jsx` + `sortServers` helper): Beğeni/Tarih/Tıklanma. Home (varsayılan Tarih), Category & Search (varsayılan Beğeni). VIP bölümü etkilenmez.
- **Sistem Rozetleri** (`ServerRow.jsx`): sunucu kartında açık sistem özelliklerinden ilk 4 + `+N`.
- **UI**: Giriş/Kayıt modalı dikeyde aşağı alındı (`.modal-box margin-top:6vh`).
- **Popup Cilası**: Escape ile kapatma + arka plan scroll kilidi + `role=dialog`.
- **Öne Çıkan Rozet Seçimi**: Sunucu Ekle → Sistem Özellikleri sekmesinde sahibi kartta görünecek rozetleri seçer (max 4, `server.featuredSystem`).
- **Bugfix**: 3-sekmeli formda "Devam" butonunun erken submit hatası + StrictMode çift toast düzeltildi.
- Testing agent ile doğrulandı (iteration_1/2/3.json — hepsi %100).

## Backlog (kalan tanıtım görevleri)
- P2: **GM Kodları Sayfası** — aranabilir GM komutları listesi.
- P3: **Blog Bölümü** — Metin2 rehber/duyuru sayfası.
- Polish (opsiyonel): popup için Escape ile kapatma + body scroll lock + `role=dialog` a11y.

## Notlar
- Backend YOK, eklenmeyecek (kullanıcı isteği). Tüm veri mock/localStorage.
- Test kimlik: demo kullanıcı `mert` / `123456` (localStorage mock).
