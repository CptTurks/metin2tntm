import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { toast } from 'sonner';

export default function AuthModal({ onClose, defaultTab = 'login' }) {
  const { login, register } = useApp();
  const [tab, setTab] = useState(defaultTab);
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const upd = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (tab === 'login') {
      const r = login(form.username, form.password);
      if (r.ok) { toast.success('Giriş başarılı! Hoş geldin.'); onClose(); }
      else toast.error(r.msg);
    } else {
      if (!form.username || !form.email || !form.password) { toast.error('Tüm alanları doldurun.'); return; }
      const r = register(form.username, form.email, form.password);
      if (r.ok) { toast.success('Kayıt tamamlandı! Aramıza hoş geldin.'); onClose(); }
      else toast.error(r.msg);
    }
  };

  return (
    <div className="modal-back" onClick={onClose}>
      <div className="modal-box" data-testid="auth-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h3>{tab === 'login' ? 'Giriş Yap' : 'Kayıt Ol'}</h3>
          <button className="icon-btn" onClick={onClose} aria-label="Kapat"><X size={18} /></button>
        </div>
        <div className="modal-tabs">
          <div className={`modal-tab ${tab === 'login' ? 'active' : ''}`} onClick={() => setTab('login')}>Giriş</div>
          <div className={`modal-tab ${tab === 'register' ? 'active' : ''}`} onClick={() => setTab('register')}>Kayıt</div>
        </div>
        <form className="modal-body" onSubmit={submit}>
          <div className="field">
            <label>{tab === 'login' ? 'Kullanıcı Adı / E-posta' : 'Kullanıcı Adı'}</label>
            <input className="inp" data-testid="auth-username-input" value={form.username} onChange={upd('username')} placeholder={tab === 'login' ? 'kullanıcı adınız' : 'yeni kullanıcı adı'} />
          </div>
          {tab === 'register' && (
            <div className="field">
              <label>E-posta</label>
              <input className="inp" type="email" value={form.email} onChange={upd('email')} placeholder="ornek@mail.com" />
            </div>
          )}
          <div className="field">
            <label>Şifre</label>
            <input className="inp" data-testid="auth-password-input" type="password" value={form.password} onChange={upd('password')} placeholder="••••••" />
          </div>
          <button className="btn btn-primary" data-testid="auth-submit-btn" style={{ width: '100%' }} type="submit">
            {tab === 'login' ? 'Giriş Yap' : 'Kayıt Ol'}
          </button>
          {tab === 'login' && (
            <p className="hint" style={{ textAlign: 'center', marginTop: 14 }}>Demo: <b>mert</b> / <b>123456</b></p>
          )}
        </form>
      </div>
    </div>
  );
}
