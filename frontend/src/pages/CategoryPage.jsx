import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORY_LABELS, CATEGORIES } from '../mock/mock';
import ServerRow from '../components/ServerRow';
import SortBar, { sortServers } from '../components/SortBar';

export default function CategoryPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { servers } = useApp();
  const [sort, setSort] = useState('likes');
  const list = sortServers(servers.filter((s) => s.category === slug && !s.hidden), sort);
  const cat = CATEGORIES.find((c) => c.slug === slug);

  return (
    <>
      <div className="crumb">
        <Link to="/">Anasayfa</Link> <ChevronRight size={14} /> <span>{CATEGORY_LABELS[slug] || 'Kategori'}</span>
      </div>

      <div className="m2-top">
        <div className="m2-top__title">
          <span className="m2-top__badge">🗂️</span>
          <div className="m2-top__main">{CATEGORY_LABELS[slug] || 'Serverler'} ({list.length})</div>
        </div>
        <button className="m2-addBtn" onClick={() => navigate('/sunucu-ekle')}>🚀 Server Ekle</button>
      </div>

      {list.length === 0 ? (
        <div className="card"><div className="empty-state">Bu kategoride henüz server yok. İlk sen ekle!</div></div>
      ) : (
        <>
          <SortBar value={sort} onChange={setSort} />
          {list.map((s) => <ServerRow key={s.id} s={s} />)}
        </>
      )}
    </>
  );
}
