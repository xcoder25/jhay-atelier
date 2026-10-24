import React from 'react';
import { Scissors, Sparkles, CheckCircle2, MapPin } from 'lucide-react';
import { ATELIER_PILLARS } from '../data/atelierData';

export default function AtelierCraft({ onOpenBooking }) {
  return (
    <section id="atelier" className="atelier-craft-section">
      <div className="luxury-container">

        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-eyebrow anim-fade-up">
            <Scissors size={13} className="sparkle-icon" />
            <span>HOW WE TAILOR YOUR OUTFIT</span>
          </div>
          <h2 className="section-title anim-fade-up stagger-1">Crafted by Women&apos;s Tailoring Experts</h2>
          <p className="section-subtitle anim-fade-up stagger-2">
            Every woman deserves clothes that fit her body shape effortlessly. Handmade right here
            in our <strong style={{color: 'var(--c-gold-light)'}}>Uyo, Akwa Ibom</strong> flagship studio — here is how our team crafts and fits your outfit from start to finish.
          </p>
        </div>

        {/* Feature Split Showcase */}
        <div className="craft-showcase-grid">

          {/* Left: Imagery of Master Atelier Hands */}
          <div className="craft-visual-wrapper anim-fade-left">
            <div className="craft-image-frame">
              <img
                src="/images/atelier-craft.jpg"
                alt="JHAY ATELIER Dressmaking and Gold Thread Embroidery — Uyo Studio"
                className="craft-image"
              />
              <div className="craft-badge-overlay">
                <span className="craft-badge-title">HANDMADE IN OUR UYO STUDIO</span>
                <span className="craft-badge-desc">
                  <MapPin size={11} style={{display: 'inline', verticalAlign: 'middle'}} /> Uyo, Akwa Ibom &bull; Precision cutting and hand-embroidery with gold threads
                </span>
              </div>
            </div>

            {/* Atelier Heritage Quote */}
            <div className="tailor-quote-card">
              <p className="tailor-quote-text">
                &ldquo;A dress should never feel restrictive. When an outfit is tailored properly to a woman&apos;s waist, bust, and hips, she walks into any room with effortless confidence.&rdquo;
              </p>
              <div className="tailor-signature-block">
                <span className="signature-name">Head Designer &amp; Master Dressmaker</span>
                <span className="signature-brand">JHAY ATELIER · UYO</span>
              </div>
            </div>

          </div>

          {/* Right: The 4 Bespoke Pillars */}
          <div className="craft-pillars-list anim-fade-right">
            <div className="pillars-header">
              <span className="script-font script-lead">Simple 4-Step Process</span>
              <h3>How Custom Tailoring Works</h3>
            </div>

            <div className="pillars-accordion">
              {ATELIER_PILLARS.map((pillar, idx) => (
                <div key={pillar.step} className={`pillar-item anim-fade-up stagger-${idx + 1}`}>
                  <div className="pillar-num">{pillar.step}</div>
                  <div className="pillar-content">
                    <h4 className="pillar-title">{pillar.title}</h4>
                    <p className="pillar-desc">{pillar.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="craft-cta-box">
              <button
                className="btn-primary gold-gradient-bg tap-scale"
                onClick={onOpenBooking}
              >
                <span>Book a Fitting or Video Chat</span>
              </button>
              <span className="craft-guarantee-note">
                <CheckCircle2 size={14} color="#C8A45D" /> Perfect Fit Guarantee: free adjustments if your dress needs tweaking
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}



