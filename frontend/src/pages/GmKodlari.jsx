import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Terminal, Search, Copy } from 'lucide-react';
import { GM_CODES } from '../mock/mock';
import { toast } from 'sonner';

export default function GmKodlari() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('all');
  const cats = ['all', ...Array.from(new Set(GM_CODES.map((c) => c.cat)))];
  const ql = q.trim().toLowerCase();
  const list = GM_CODES.filter((c) =>
    (cat === 'all' || c.cat === cat) &&
    (!ql || c.cmd.toLowerCase().includes(ql) || c.desc.toLowerCase().includes(ql) || c.cat.toLowerCase().includes(ql))
  );
  const copy = (cmd) => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(cmd)
        .then(() => toast.success('Komut panoya kopyalandı!'))
        .catch(() => toast.error('Kopyalanamadı — komutu elle seçin.'));
    } else {
      toast.error('Tarayıcı kopyalamayı desteklemiyor.');
    }
  };

  return (
    <>
      <div className="crumb"><Link to="/">Anasayfa</Link> <ChevronRight size={14} /> <span>GM Kodları</span></div>
      <div className="m2-top">
        <div className="m2-top__title"><span className="m2-top__badge"><Terminal size={18} /></span><div className="m2-top__main">GM Komutları ({list.length})</div></div>
      </div>
      <div className="card"><div className="card-body">
        <div className="header-search" style={{ maxWidth: '100%', marginBottom: 14 }}>
          <Search size={16} />
          <input data-testid="gm-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Komut ara... (örn. item, ban, warp)" style={{ width: '100%', marginLeft: 8 }} />
        </div>
        <div className="sort-bar" style={{ marginBottom: 16 }}>
          <span className="sort-bar__label">Kategori</span>
          {cats.map((c) => (
            <button key={c} className={`sort-btn ${cat === c ? 'active' : ''}`} data-testid={`gm-cat-${c}`} onClick={() => setCat(c)}>{c === 'all' ? 'Tümü' : c}</button>
          ))}
        </div>
        {list.length === 0 ? <div className="empty-state">Eşleşen komut bulunamadı.</div> : (
          <table className="data-table">
            <thead><tr><th>Komut</th><th>Açıklama</th><th>Kategori</th><th></th></tr></thead>
            <tbody>
              {list.map((c, i) => (
                <tr key={i} data-testid={`gm-row-${i}`}>
                  <td><code style={{ color: '#7FB8FF', fontWeight: 700 }}>{c.cmd}</code></td>
                  <td>{c.desc}</td>
                  <td><span className="vip-tag vip-tag--green">{c.cat}</span></td>
                  <td><button className="btn" style={{ padding: '6px 10px' }} data-testid={`gm-copy-${i}`} onClick={() => copy(c.cmd)}><Copy size={14} /> Kopyala</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div></div>
    </>
  );
}
