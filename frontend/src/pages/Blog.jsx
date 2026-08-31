import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Newspaper } from 'lucide-react';
import { BLOG_POSTS } from '../mock/mock';

export default function Blog() {
  return (
    <>
      <div className="crumb"><Link to="/">Anasayfa</Link> <ChevronRight size={14} /> <span>Blog</span></div>
      <div className="m2-top">
        <div className="m2-top__title"><span className="m2-top__badge"><Newspaper size={18} /></span><div className="m2-top__main">Blog & Rehberler</div></div>
      </div>
      <div className="blog-grid">
        {BLOG_POSTS.map((p) => (
          <Link key={p.id} to={`/blog/${p.id}`} className="blog-card" data-testid={`blog-card-${p.id}`}>
            <img src={p.img} alt={p.title} />
            <div className="blog-card__body">
              <span className="vip-tag vip-tag--green" style={{ alignSelf: 'flex-start' }}>{p.tag}</span>
              <h3 className="blog-card__title">{p.title}</h3>
              <div className="blog-card__meta">{p.author} · {p.date}</div>
              <p className="blog-card__excerpt">{p.excerpt}</p>
              <span className="btn" data-testid={`blog-read-${p.id}`}>Devamını Oku</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
