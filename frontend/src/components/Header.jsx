import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Settings, UserCircle2, Rocket, LogOut, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';
import AuthModal from './AuthModal';

export default function Header() {
  const { user, logout } = useApp();
  const navigate = useNavigate();
  const [authOpen, setAuthOpen] = useState(false);
  const [appsOpen, setAppsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [q, setQ] = useState('');
  const appsRef = useRef(null);
  const menuRef = useRef(null);

  // Outside-click closes dropdowns (fixes: menu closing before you can click an item)
  useEffect(() => {
    const onDocClick = (e) => {
      if (appsRef.current && !appsRef.current.contains(e.target)) setAppsOpen(false);
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const submitSearch = (e) => { e.preventDefault(); navigate(`/ara?q=${encodeURIComponent(q)}`); };

  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="brand-group">
          <Link to="/" className="brand" aria-label="TopMetin2Pvp ana sayfa">
            <span className="brand-logo">
              <span className="lg-icon">⚔</span>
              <span><span className="lg-a">TOP</span><span className="lg-b">METIN2PVP</span></span>
            </span>
          </Link>

          <div className="apps-menu" ref={appsRef}>
            <button className="icon-btn" data-testid="apps-toggle-btn" aria-label="Uygulamalar" onClick={() => { setAppsOpen((o) => !o); setMenuOpen(false); }}>
              <span className="apps-dots">{Array.from({ length: 9 }).map((_, i) => <span key={i} />)}</span>
            </button>
            <div className={`apps-dropdown ${appsOpen ? 'open' : ''}`} role="menu">
              <div className="apps-title">UYGULAMALARI</div>
              <div className="apps-links">
                <button className="apps-link apps-link--blog" data-testid="apps-link-gm" role="menuitem" onClick={() => { setAppsOpen(false); navigate('/gm-kodlari'); }}>✅ GM Kodları</button>
                <button className="apps-link apps-link--analiz" data-testid="apps-link-reklam" role="menuitem" onClick={() => { setAppsOpen(false); navigate('/reklam-fiyatlari'); }}>✅ Reklam Fiyatları</button>
                <button className="apps-link apps-link--forum" data-testid="apps-link-blog" role="menuitem" onClick={() => { setAppsOpen(false); navigate('/blog'); }}>✅ BLOG</button>
              </div>
            </div>
          </div>
        </div>

        <nav className="header-actions">
          <form className="header-search" onSubmit={submitSearch}>
            <input data-testid="header-search-input" value={q} onChange={(e) => setQ(e.target.value)} type="search" placeholder="Ne aramak istiyorsun..." />
            <button className="s-btn" data-testid="header-search-submit" type="submit" aria-label="Ara"><Search size={17} /></button>
          </form>

          {user?.isAdmin && (
            <button className="pill" onClick={() => navigate('/admin')} title="Admin Panel">
              <Shield size={16} /> <span className="hide-sm">Admin</span>
            </button>
          )}

          <button className="pill" onClick={() => navigate('/reklam-fiyatlari')} title="Reklam Fiyatları"><Settings size={16} /><span className="hide-sm">AYARLAR</span></button>

          {user ? (
            <div className="apps-menu" ref={menuRef}>
              <button className="pill pill-primary" onClick={() => { setMenuOpen((o) => !o); setAppsOpen(false); }}>
                <span className="pill-avatar">{user.username.charAt(0).toUpperCase()}</span>
                <span>{user.username}</span>
              </button>
              <div className={`apps-dropdown ${menuOpen ? 'open' : ''}`} style={{ minWidth: 210, left: 'auto', right: 0 }}>
                <div className="apps-title">HESAP</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 10 }}>
                  <button className="btn" onClick={() => { setMenuOpen(false); navigate('/profil'); }}><UserCircle2 size={16} /> Profilim</button>
                  {user.isAdmin && <button className="btn" onClick={() => { setMenuOpen(false); navigate('/admin'); }}><Shield size={16} /> Admin Panel</button>}
                  <button className="btn btn-danger" onClick={() => { logout(); setMenuOpen(false); navigate('/'); }}><LogOut size={16} /> Çıkış Yap</button>
                </div>
              </div>
            </div>
          ) : (
            <button className="pill pill-primary" data-testid="auth-open-btn" onClick={() => setAuthOpen(true)}>
              <UserCircle2 size={16} /> Giriş / Kayıt
            </button>
          )}

          <button className="pill pill-new" onClick={() => navigate('/sunucu-ekle')}>
            <Rocket size={16} /> <span className="hide-sm">Yeni Server Ekle</span>
          </button>
        </nav>
      </div>

      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    </header>
  );
}
