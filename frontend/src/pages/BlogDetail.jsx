import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, ArrowLeft, Link2 } from 'lucide-react';
import { BLOG_POSTS } from '../mock/mock';
import { toast } from 'sonner';

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = BLOG_POSTS.find((p) => String(p.id) === String(id));

  if (!post) {
    return <div className="card"><div className="empty-state">Yazı bulunamadı. <Link to="/blog" style={{ color: 'var(--brand2)' }}>Blog'a dön</Link></div></div>;
  }

  const url = window.location.href;
  const share = (net) => {
    const u = encodeURIComponent(url);
    const t = encodeURIComponent(post.title);
    const map = {
      whatsapp: `https://wa.me/?text=${t}%20${u}`,
      twitter: `https://twitter.com/intent/tweet?text=${t}&url=${u}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
    };
    window.open(map[net], '_blank', 'noopener');
  };
  const copyLink = () => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(url)
        .then(() => toast.success('Bağlantı kopyalandı!'))
        .catch(() => toast.error('Kopyalanamadı — bağlantıyı elle seçin.'));
    } else {
      toast.error('Tarayıcı kopyalamayı desteklemiyor.');
    }
  };

  return (
    <>
      <div className="crumb">
        <Link to="/">Anasayfa</Link> <ChevronRight size={14} /> <Link to="/blog">Blog</Link> <ChevronRight size={14} /> <span>{post.title}</span>
      </div>
      <button className="btn" style={{ marginBottom: 16 }} data-testid="blog-back-btn" onClick={() => navigate('/blog')}><ArrowLeft size={16} /> Geri</button>
      <article className="card blog-detail" data-testid={`blog-detail-${post.id}`}>
        <img className="blog-detail__cover" src={post.img} alt={post.title} />
        <div className="card-body">
          <span className="vip-tag vip-tag--green" style={{ alignSelf: 'flex-start' }}>{post.tag}</span>
          <h1 className="blog-detail__title">{post.title}</h1>
          <div className="blog-card__meta" style={{ marginBottom: 4 }}>{post.author} · {post.date}</div>
          <p className="blog-detail__body">{post.body}</p>
          <div className="share-bar" data-testid="blog-share-bar">
            <span className="share-bar__label">Paylaş:</span>
            <button className="share-btn share-btn--wa" data-testid="share-whatsapp" onClick={() => share('whatsapp')}>WhatsApp</button>
            <button className="share-btn share-btn--tw" data-testid="share-twitter" onClick={() => share('twitter')}>X (Twitter)</button>
            <button className="share-btn share-btn--fb" data-testid="share-facebook" onClick={() => share('facebook')}>Facebook</button>
            <button className="share-btn" data-testid="share-copy" onClick={copyLink}><Link2 size={14} /> Bağlantı</button>
          </div>
        </div>
      </article>
    </>
  );
}
