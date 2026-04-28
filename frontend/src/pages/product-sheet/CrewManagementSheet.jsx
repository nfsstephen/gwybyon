import React from 'react';
import {
  Sparkles, Building2, HardHat, Home, CalendarClock,
  CheckCircle2, Printer, Workflow, Eye, Bell, ArrowRight
} from 'lucide-react';
import './CrewManagementSheet.css';

const CrewManagementSheet = () => {
  return (
    <div className="cms-wrapper">
      {/* Print button — hidden when actually printing */}
      <div className="cms-toolbar" data-testid="cms-toolbar">
        <div className="cms-toolbar-inner">
          <div className="cms-toolbar-title">Crew Management Tool — Product Sheet</div>
          <button
            type="button"
            className="cms-print-btn"
            onClick={() => window.print()}
            data-testid="cms-print-btn"
          >
            <Printer size={15} /> Save as PDF
          </button>
        </div>
      </div>

      {/* =========== PAGE 1 =========== */}
      <section className="cms-page cms-page-1" data-testid="cms-page-1">
        <header className="cms-header">
          <div className="cms-brand">
            <div className="cms-brand-mark">
              <Sparkles size={14} />
              GATEWAY AI SYSTEMS
            </div>
            <div className="cms-brand-url">gwyai.com</div>
          </div>
          <div className="cms-doctype">PRODUCT SHEET · v1</div>
        </header>

        <div className="cms-hero">
          <div className="cms-phrase">
            <span className="cms-phrase-line" />
            <span className="cms-phrase-text"><em>"A Single Source of Truth"</em></span>
            <span className="cms-phrase-line" />
          </div>
          <h1 className="cms-title">
            Crew Management Tool
          </h1>
          <p className="cms-sub">
            Turn your website from a marketing brochure into <strong>mission control</strong> — one
            shared schedule that keeps your office, your crews, and your customers on the same page.
            Automatically.
          </p>
        </div>

        {/* The problem */}
        <div className="cms-block">
          <div className="cms-block-label">THE EVERYDAY PROBLEM</div>
          <p className="cms-block-body">
            Most contractors lose 5+ hours a week to <strong>miscommunication</strong>. The office
            answers the same "when are you coming?" calls all day. Crews show up to the wrong
            address. Customers sit at home waiting. Angry reviews. Lost referrals.
          </p>
        </div>

        {/* Three personas */}
        <div className="cms-personas" data-testid="cms-personas">
          <div className="cms-persona cms-persona-owner">
            <div className="cms-persona-icon"><Building2 size={18} /></div>
            <div className="cms-persona-tag">OFFICE / OWNER</div>
            <h3>Run the board from one screen.</h3>
            <ul>
              <li><CheckCircle2 size={12} /> Drag-and-drop schedule across crews &amp; rigs</li>
              <li><CheckCircle2 size={12} /> Create jobs, customers, visits in one flow</li>
              <li><CheckCircle2 size={12} /> Crew + customer auto-notified on every change</li>
              <li><CheckCircle2 size={12} /> Less phone time, more billable work</li>
            </ul>
          </div>

          <div className="cms-persona cms-persona-crew">
            <div className="cms-persona-icon"><HardHat size={18} /></div>
            <div className="cms-persona-tag">THE CREW</div>
            <h3>Show up to the right job, ready.</h3>
            <ul>
              <li><CheckCircle2 size={12} /> Today's + tomorrow's stops on a phone</li>
              <li><CheckCircle2 size={12} /> Gate codes &amp; internal notes per job</li>
              <li><CheckCircle2 size={12} /> Materials and customer info at a glance</li>
              <li><CheckCircle2 size={12} /> One tap to mark "On Site" or "Complete"</li>
            </ul>
          </div>

          <div className="cms-persona cms-persona-customer">
            <div className="cms-persona-icon"><Home size={18} /></div>
            <div className="cms-persona-tag">THE CUSTOMER</div>
            <h3>Know exactly when you'll arrive.</h3>
            <ul>
              <li><CheckCircle2 size={12} /> Live status: "Drill rig arrives Tue, 9 AM"</li>
              <li><CheckCircle2 size={12} /> No login needed — just a link</li>
              <li><CheckCircle2 size={12} /> Sees crew's full commitment (builds trust)</li>
              <li><CheckCircle2 size={12} /> Fewer calls in, more referrals out</li>
            </ul>
          </div>
        </div>

        {/* Key value band */}
        <div className="cms-band">
          <div className="cms-band-icon"><Workflow size={18} /></div>
          <div className="cms-band-text">
            <strong>Your website does more than advertise.</strong> It runs the work. Marketing
            brings customers in. Crew Management keeps them happy and keeps your team aligned.
          </div>
        </div>

        {/* ROI stats */}
        <div className="cms-roi">
          <div className="cms-roi-stat">
            <div className="cms-roi-num">− 70%</div>
            <div className="cms-roi-label">No-shows &amp; missed appointments</div>
          </div>
          <div className="cms-roi-stat">
            <div className="cms-roi-num">− 5 hrs</div>
            <div className="cms-roi-label">Of "where are you?" calls per week</div>
          </div>
          <div className="cms-roi-stat">
            <div className="cms-roi-num">+ 4.7★</div>
            <div className="cms-roi-label">Reviews from on-time jobs</div>
          </div>
          <div className="cms-roi-stat">
            <div className="cms-roi-num">+ 28%</div>
            <div className="cms-roi-label">Repeat &amp; referral revenue</div>
          </div>
        </div>
      </section>

      {/* =========== PAGE 2 =========== */}
      <section className="cms-page cms-page-2" data-testid="cms-page-2">
        <header className="cms-header">
          <div className="cms-brand">
            <div className="cms-brand-mark">
              <Sparkles size={14} />
              GATEWAY AI SYSTEMS
            </div>
            <div className="cms-brand-url">gwyai.com</div>
          </div>
          <div className="cms-doctype">PRODUCT SHEET · v1</div>
        </header>

        <h2 className="cms-h2">How It Works</h2>

        <div className="cms-how">
          <div className="cms-how-step">
            <div className="cms-how-num">1</div>
            <h4>Schedule a visit in the dashboard</h4>
            <p>Click any day. Pick a customer (or create one on the spot). Pick a job (or create one). Set a time and crew. Done.</p>
          </div>
          <div className="cms-how-step">
            <div className="cms-how-num">2</div>
            <h4>Crew sees it on their phone</h4>
            <p>The crew opens the same site, logs in, sees today's stops in order with addresses and gate codes. No new app to install.</p>
          </div>
          <div className="cms-how-step">
            <div className="cms-how-num">3</div>
            <h4>Customer gets a tracker link</h4>
            <p>You text or email them a link. They click it — no password — and see a live page showing exactly when your crew will arrive.</p>
          </div>
        </div>

        {/* Mock dashboard visual — CSS-only */}
        <div className="cms-mock">
          <div className="cms-mock-head">
            <div className="cms-mock-title">OWNER DASHBOARD · PREVIEW</div>
          </div>
          <div className="cms-mock-body">
            <div className="cms-mock-grid">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((d, i) => (
                <div key={d} className="cms-mock-col">
                  <div className="cms-mock-day">{d}</div>
                  {i === 0 && <>
                    <div className="cms-mock-pill cms-mp-teal">8 AM · Drilling Day 1</div>
                    <div className="cms-mock-pill cms-mp-orange">10 AM · Pump-Out</div>
                  </>}
                  {i === 1 && <div className="cms-mock-pill cms-mp-teal">8 AM · Drilling Day 2</div>}
                  {i === 2 && <div className="cms-mock-pill cms-mp-blue">9 AM · Pump Replace</div>}
                  {i === 3 && <div className="cms-mock-pill cms-mp-blue">9 AM · Pump Install</div>}
                  {i === 4 && <div className="cms-mock-pill cms-mp-teal">8 AM · New Well</div>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Customer view mock */}
        <div className="cms-mock cms-mock-customer">
          <div className="cms-mock-head">
            <div className="cms-mock-title">CUSTOMER VIEW · PREVIEW</div>
          </div>
          <div className="cms-mock-body cms-mock-customer-body">
            <div className="cms-mock-greet">Hi John — here's your job with Andrews Well Drilling</div>
            <div className="cms-mock-countdown">
              <span className="cms-mock-countdown-dot" />
              <div>
                <div className="cms-mock-cd-label">NEXT ON SITE</div>
                <div className="cms-mock-cd-big">6d 10h</div>
                <div className="cms-mock-cd-sub">Drill Rig 1 · Mon May 4 · 8:00 AM</div>
              </div>
            </div>
            <div className="cms-mock-timeline">
              <div className="cms-mock-dot cms-mock-dot-done"><CheckCircle2 size={11} /></div>
              <div className="cms-mock-tl-line cms-mock-tl-done" />
              <div className="cms-mock-dot cms-mock-dot-active"><CalendarClock size={11} /></div>
              <div className="cms-mock-tl-line" />
              <div className="cms-mock-dot"><Eye size={11} /></div>
              <div className="cms-mock-tl-line" />
              <div className="cms-mock-dot"><CheckCircle2 size={11} /></div>
            </div>
            <div className="cms-mock-tl-labels">
              <span>Pending</span><span>Scheduled</span><span>On Site</span><span>Completed</span>
            </div>
          </div>
        </div>

        {/* What's included / delivery */}
        <div className="cms-included">
          <div className="cms-included-col">
            <div className="cms-included-label">INCLUDED</div>
            <ul>
              <li><Bell size={12} /> Owner dashboard — schedule, jobs, customers, crews</li>
              <li><Bell size={12} /> Crew mobile view</li>
              <li><Bell size={12} /> Customer-facing tracker page (tokenized, no login)</li>
              <li><Bell size={12} /> Embed mode — drops into your existing website</li>
              <li><Bell size={12} /> Hosted + maintained by Gateway (no separate server)</li>
            </ul>
          </div>
          <div className="cms-included-col">
            <div className="cms-included-label">REQUIREMENTS</div>
            <ul>
              <li><CheckCircle2 size={12} /> Active Gateway AI Systems subscription</li>
              <li><CheckCircle2 size={12} /> Website built or maintained by Gateway</li>
              <li><CheckCircle2 size={12} /> Industry match (available for 8 industries)</li>
              <li><CheckCircle2 size={12} /> Crew Management add-on purchased</li>
            </ul>
          </div>
        </div>

        {/* CTA band */}
        <div className="cms-cta">
          <div className="cms-cta-text">
            <strong>Ready to stop being your own dispatcher?</strong>
            <br />
            Add Crew Management to your subscription at gwyai.com/subscribe
          </div>
          <div className="cms-cta-arrow"><ArrowRight size={22} /></div>
        </div>

        <footer className="cms-footer">
          <span>© Gateway AI Systems · gwyai.com</span>
          <span>Crew Management Tool · Product Sheet v1 · {new Date().getFullYear()}</span>
        </footer>
      </section>
    </div>
  );
};

export default CrewManagementSheet;
