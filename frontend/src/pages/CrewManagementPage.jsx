import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  HardHat,
  Home,
  CalendarClock,
  PhoneOff,
  AlertTriangle,
  Clock,
  ArrowRight,
  CheckCircle2,
  Smartphone,
  Bell,
  Eye,
  Workflow,
  Sparkles,
} from 'lucide-react';
import './CrewManagementPage.css';

const CrewManagementPage = () => {
  const revealRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('cmt-in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const setRef = (el) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  return (
    <div className="cmt-page" data-testid="crew-management-page">
      {/* ===== HERO ===== */}
      <section className="cmt-hero">
        <div className="cmt-hero-bg" aria-hidden="true">
          <div className="cmt-grid-overlay"></div>
          <div className="cmt-glow cmt-glow-1"></div>
          <div className="cmt-glow cmt-glow-2"></div>
        </div>

        <div className="cmt-container cmt-hero-inner">
          <span className="cmt-eyebrow" data-testid="cmt-hero-eyebrow">
            <Sparkles size={14} />
            ADD-ON · CREW MANAGEMENT TOOL
          </span>

          <p className="cmt-hero-subline" data-testid="cmt-addon-subline">
            An optional layer for any Gateway AI Systems subscription — turn your marketing site into mission control.
          </p>

          <div className="cmt-sst-banner" data-testid="cmt-sst-banner">
            <span className="cmt-sst-line"></span>
            <span className="cmt-sst-text">A Single Source of Truth</span>
            <span className="cmt-sst-line"></span>
          </div>

          <h1 className="cmt-hero-title">
            One schedule everyone trusts —<br />
            the <span className="cmt-accent">office</span>, the <span className="cmt-accent">crew</span>, and the <span className="cmt-accent-bold">customer.</span>
          </h1>
          <p className="cmt-hero-sub">
            Your website becomes mission control. When the schedule changes, the truck knows,
            the homeowner knows, and the office stops repeating itself. No more group texts.
            No more sticky notes. No more "where's the rig?" voicemails. Just <strong>one source of truth</strong> — visible to whoever needs it.
          </p>

          <div className="cmt-hero-ctas">
            <Link to="/subscribe#addons-selection" className="cmt-btn cmt-btn-primary" data-testid="cmt-hero-cta-subscribe">
              Add It To My Subscription
              <ArrowRight size={16} />
            </Link>
            <Link to="/product-sheet/crew-management" target="_blank" rel="noreferrer" className="cmt-btn cmt-btn-ghost" data-testid="cmt-hero-cta-productsheet">
              Download the Product Sheet
            </Link>
            <Link to="/contact" className="cmt-btn cmt-btn-ghost" data-testid="cmt-hero-cta-contact">
              Talk To Us First
            </Link>
          </div>

          {/* Animated 3-Way Sync Diagram */}
          <div className="cmt-diagram" data-testid="cmt-three-way-diagram">
            <svg className="cmt-diagram-lines" viewBox="0 0 600 320" preserveAspectRatio="none">
              <defs>
                <linearGradient id="cmtLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0D9488" stopOpacity="0.15" />
                  <stop offset="50%" stopColor="#0D9488" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#0D9488" stopOpacity="0.15" />
                </linearGradient>
              </defs>
              <line x1="300" y1="60" x2="120" y2="260" stroke="url(#cmtLineGrad)" strokeWidth="2" />
              <line x1="300" y1="60" x2="480" y2="260" stroke="url(#cmtLineGrad)" strokeWidth="2" />
              <line x1="120" y1="260" x2="480" y2="260" stroke="url(#cmtLineGrad)" strokeWidth="2" />
              {/* Animated pulses traveling each line */}
              <circle r="4" fill="#0D9488" className="cmt-pulse cmt-pulse-1">
                <animateMotion dur="3.6s" repeatCount="indefinite" path="M300,60 L120,260" />
              </circle>
              <circle r="4" fill="#0D9488" className="cmt-pulse cmt-pulse-2">
                <animateMotion dur="3.6s" repeatCount="indefinite" begin="1.2s" path="M120,260 L480,260" />
              </circle>
              <circle r="4" fill="#0D9488" className="cmt-pulse cmt-pulse-3">
                <animateMotion dur="3.6s" repeatCount="indefinite" begin="2.4s" path="M480,260 L300,60" />
              </circle>
            </svg>

            <div className="cmt-node cmt-node-owner" data-testid="cmt-node-owner">
              <div className="cmt-node-ring">
                <Building2 size={22} />
              </div>
              <div className="cmt-node-label">Office / Owner</div>
              <div className="cmt-node-sub">Schedules &amp; dispatches</div>
            </div>

            <div className="cmt-node cmt-node-crew" data-testid="cmt-node-crew">
              <div className="cmt-node-ring">
                <HardHat size={22} />
              </div>
              <div className="cmt-node-label">Crew</div>
              <div className="cmt-node-sub">Sees the next 5 jobs</div>
            </div>

            <div className="cmt-node cmt-node-customer" data-testid="cmt-node-customer">
              <div className="cmt-node-ring">
                <Home size={22} />
              </div>
              <div className="cmt-node-label">Customer</div>
              <div className="cmt-node-sub">Knows when you arrive</div>
            </div>

            <div className="cmt-diagram-caption">
              One schedule. Three views. <strong>One source of truth.</strong>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROBLEM SECTION ===== */}
      <section className="cmt-section cmt-problem" ref={setRef}>
        <div className="cmt-container">
          <div className="cmt-section-head">
            <span className="cmt-section-label">THE EVERYDAY CHAOS</span>
            <h2 className="cmt-section-title">
              Most contractors lose hours every week to one thing: <span className="cmt-accent">miscommunication.</span>
            </h2>
            <p className="cmt-section-sub">
              You know the drill. Sound familiar?
            </p>
          </div>

          <div className="cmt-problem-grid">
            <div className="cmt-problem-card" data-testid="cmt-problem-owner">
              <div className="cmt-problem-icon"><PhoneOff size={22} /></div>
              <h3>The Office Phone Won't Stop</h3>
              <p>
                "When are you coming?" "Did you get my voicemail?" "Where's the rig?"
                Half your day is repeating the schedule you already sent.
              </p>
            </div>

            <div className="cmt-problem-card" data-testid="cmt-problem-crew">
              <div className="cmt-problem-icon"><AlertTriangle size={22} /></div>
              <h3>Crews Show Up Wrong, or Late</h3>
              <p>
                Wrong address. Wrong day. Missing materials. The schedule lived
                in someone's head — or worse, on a paper sticky note in the truck.
              </p>
            </div>

            <div className="cmt-problem-card" data-testid="cmt-problem-customer">
              <div className="cmt-problem-icon"><Clock size={22} /></div>
              <h3>Customers Wait All Day</h3>
              <p>
                A homeowner takes off work for a "Tuesday" appointment, the rig
                runs late, and now you have an angry review and a lost referral.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SOLUTION / 3 PERSONAS ===== */}
      <section className="cmt-section cmt-solution" ref={setRef}>
        <div className="cmt-container">
          <div className="cmt-section-head">
            <span className="cmt-section-label">THE FIX</span>
            <h2 className="cmt-section-title">
              One schedule. <span className="cmt-accent">Three views.</span> <span className="cmt-accent-bold">One source of truth.</span>
            </h2>
            <p className="cmt-section-sub">
              The Crew Management Tool lives inside your Gateway website — so the schedule
              the office sets is the <em>same</em> schedule the crew runs and the <em>same</em> schedule
              the customer sees. No copies. No "did you get my text?" No version drift.
              When one person updates a job, everyone is updated.
            </p>
          </div>

          <div className="cmt-persona-grid">
            <div className="cmt-persona-card cmt-persona-owner" data-testid="cmt-persona-owner">
              <div className="cmt-persona-header">
                <div className="cmt-persona-icon"><Building2 size={24} /></div>
                <div>
                  <div className="cmt-persona-tag">FOR THE OWNER</div>
                  <h3>Run the whole board from one screen.</h3>
                </div>
              </div>
              <ul className="cmt-bullets">
                <li><CheckCircle2 size={16} /> Drag-and-drop scheduling across crews and rigs</li>
                <li><CheckCircle2 size={16} /> Conflict alerts before you double-book a rig</li>
                <li><CheckCircle2 size={16} /> Customer + crew get notified the moment you change a job</li>
                <li><CheckCircle2 size={16} /> Spend less time on the phone, more time bidding work</li>
              </ul>
            </div>

            <div className="cmt-persona-card cmt-persona-crew" data-testid="cmt-persona-crew">
              <div className="cmt-persona-header">
                <div className="cmt-persona-icon"><HardHat size={24} /></div>
                <div>
                  <div className="cmt-persona-tag">FOR THE CREW</div>
                  <h3>Show up to the right job, ready.</h3>
                </div>
              </div>
              <ul className="cmt-bullets">
                <li><CheckCircle2 size={16} /> Today's stops + tomorrow's stops, on a phone</li>
                <li><CheckCircle2 size={16} /> Tap-to-navigate addresses and gate codes</li>
                <li><CheckCircle2 size={16} /> Materials list and customer notes per job</li>
                <li><CheckCircle2 size={16} /> One tap to mark "On Site" or "Complete"</li>
              </ul>
            </div>

            <div className="cmt-persona-card cmt-persona-customer" data-testid="cmt-persona-customer">
              <div className="cmt-persona-header">
                <div className="cmt-persona-icon"><Home size={24} /></div>
                <div>
                  <div className="cmt-persona-tag">FOR THE CUSTOMER</div>
                  <h3>Know exactly when you'll arrive.</h3>
                </div>
              </div>
              <ul className="cmt-bullets">
                <li><CheckCircle2 size={16} /> Live status: "Drill rig arrives Tue, 9 AM"</li>
                <li><CheckCircle2 size={16} /> Automatic email/text the day before</li>
                <li><CheckCircle2 size={16} /> No more "did they forget us?" calls</li>
                <li><CheckCircle2 size={16} /> A professional experience that earns referrals</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== "MORE THAN MARKETING" BANNER ===== */}
      <section className="cmt-section cmt-banner" ref={setRef}>
        <div className="cmt-container">
          <div className="cmt-banner-card">
            <div className="cmt-banner-icon-stack">
              <div className="cmt-banner-icon cmt-bi-1"><Workflow size={20} /></div>
              <div className="cmt-banner-icon cmt-bi-2"><Bell size={20} /></div>
              <div className="cmt-banner-icon cmt-bi-3"><Eye size={20} /></div>
            </div>
            <div className="cmt-banner-text">
              <h2>
                Your website should do more than <span className="cmt-strike">advertise</span>.
                <br />
                It should <span className="cmt-accent-bold">run the work.</span>
              </h2>
              <p>
                Marketing brings the customer in. Crew Management keeps them happy,
                keeps your team aligned, and keeps you out of the daily fire drill.
                That is the difference between a brochure and a business engine.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== INDUSTRIES ===== */}
      <section className="cmt-section cmt-industries" ref={setRef}>
        <div className="cmt-container">
          <div className="cmt-section-head">
            <span className="cmt-section-label">BUILT FOR FIELD-WORK BUSINESSES</span>
            <h2 className="cmt-section-title">
              If your trucks roll to a customer, this saves you time.
            </h2>
          </div>

          <div className="cmt-industry-row">
            {[
              'Well Drilling',
              'Septic Services',
              'Excavation',
              'Paving',
              'Tree Services',
              'HVAC',
              'Plumbing',
              'Roofing',
            ].map((name) => (
              <div className="cmt-industry-pill" key={name} data-testid={`cmt-industry-${name.toLowerCase().replace(/\s+/g, '-')}`}>
                {name}
              </div>
            ))}
          </div>

          <div className="cmt-industry-example">
            <div className="cmt-example-header">
              <CalendarClock size={18} />
              <span>EXAMPLE · WELL DRILLING</span>
            </div>
            <p>
              The driller sees Tuesday's stop on his phone the night before — gate code,
              depth target, casing on the truck. The homeowner gets an automatic
              "We'll be on site Tuesday between 8–10 AM" notification. The office
              owner's phone stays quiet. Same day, three people, zero "where are you?" calls.
            </p>
          </div>
        </div>
      </section>

      {/* ===== ROI ===== */}
      <section className="cmt-section cmt-roi" ref={setRef}>
        <div className="cmt-container">
          <div className="cmt-section-head">
            <span className="cmt-section-label">WHY IT PAYS FOR ITSELF</span>
            <h2 className="cmt-section-title">A few quiet phone hours a week add up fast.</h2>
          </div>

          <div className="cmt-roi-grid">
            <div className="cmt-roi-card" data-testid="cmt-roi-noshows">
              <div className="cmt-roi-stat">- 70%</div>
              <div className="cmt-roi-label">No-shows &amp; missed appointments</div>
            </div>
            <div className="cmt-roi-card" data-testid="cmt-roi-calls">
              <div className="cmt-roi-stat">- 5 hrs</div>
              <div className="cmt-roi-label">Of "where are you?" calls per week</div>
            </div>
            <div className="cmt-roi-card" data-testid="cmt-roi-reviews">
              <div className="cmt-roi-stat">+ 4.7★</div>
              <div className="cmt-roi-label">Reviews from on-time, communicated jobs</div>
            </div>
            <div className="cmt-roi-card" data-testid="cmt-roi-referrals">
              <div className="cmt-roi-stat">+ 28%</div>
              <div className="cmt-roi-label">Repeat &amp; referral revenue</div>
            </div>
          </div>
          <p className="cmt-roi-disclaimer">
            *Directional figures based on common contractor scheduling outcomes. Your mileage will vary.
          </p>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="cmt-section cmt-final-cta" ref={setRef}>
        <div className="cmt-container">
          <div className="cmt-final-card">
            <Smartphone size={28} className="cmt-final-icon" />
            <h2>Ready to stop being your own dispatcher?</h2>
            <p>
              The Crew Management Tool is rolling out as an <strong>optional add-on</strong> to your
              Gateway AI Systems subscription. Pricing is being finalized — add it to your subscription
              now to lock in early-access positioning.
            </p>
            <div className="cmt-final-ctas">
              <Link to="/subscribe#addons-selection" className="cmt-btn cmt-btn-primary cmt-btn-lg" data-testid="cmt-final-cta-subscribe">
                Subscribe &amp; Add Crew Management
                <ArrowRight size={16} />
              </Link>
              <Link to="/product-sheet/crew-management" target="_blank" rel="noreferrer" className="cmt-btn cmt-btn-ghost cmt-btn-lg" data-testid="cmt-final-cta-productsheet">
                Download the Product Sheet
              </Link>
              <Link to="/contact" className="cmt-btn cmt-btn-ghost cmt-btn-lg" data-testid="cmt-final-cta-contact">
                Ask Questions First
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CrewManagementPage;
