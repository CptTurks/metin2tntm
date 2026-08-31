import React from 'react';
import { Megaphone, Check, AlertTriangle, Clock, Pin, ArrowRight } from 'lucide-react';
import { INFO_RULES } from '../mock/mock';

const ICONS = { check: Check, warn: AlertTriangle, clock: Clock, pin: Pin };

function renderText(t) {
  return t.split(/\*\*(.+?)\*\*/g).map((p, i) => (i % 2 === 1 ? <strong key={i}>{p}</strong> : <span key={i}>{p}</span>));
}

export default function InfoModal({ onAccept }) {
  return (
    <div className="info-back" data-testid="info-modal-backdrop">
      <div className="info-box" role="dialog" aria-modal="true" data-testid="info-modal">
        <span className="info-tag"><Megaphone size={13} /> ÖNEMLİ</span>
        <h2 className="info-title">BİLGİLENDİRME</h2>
        <p className="info-desc">
          Lütfen ilan paylaşmadan önce aşağıdaki kuralları dikkatlice okuyun. <strong>OKUDUM VE ANLIYORUM</strong> butonuna bastığınızda, bu kuralları kabul etmiş sayılırsınız.
        </p>
        <div className="info-rules">
          {INFO_RULES.map((r, i) => {
            const Ico = ICONS[r.icon] || Check;
            return (
              <div className="info-rule" key={i}>
                <span className={`info-rule__ico info-rule__ico--${r.icon}`}><Ico size={16} /></span>
                <span className="info-rule__text">{renderText(r.text)}</span>
              </div>
            );
          })}
        </div>
        <button className="info-btn" data-testid="info-accept-btn" onClick={onAccept}>
          OKUDUM VE ANLIYORUM <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
