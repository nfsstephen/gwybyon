import React from 'react';
import { Clock, Calendar, Phone } from 'lucide-react';
import './ContactUsPage.css';

export default function ContactUsPage() {
  return (
    <div className="cu-page" data-testid="contact-us-page">
      {/* Hero / Message Section */}
      <section className="cu-hero">
        <div className="cu-hero-inner">
          <span className="cu-badge">GET IN TOUCH</span>
          <h1 className="cu-title">Contact Us</h1>
          <div className="cu-message" data-testid="contact-us-message">
            <p>
              The customers of this process are all working people and thus they need to be 
              taking care of business during the day. <strong>We have adjusted our schedule 
              and will be available from 6 PM until 9 PM EST Monday through Thursday and 
              then again Saturday morning 9 AM until Noon.</strong>
            </p>
            <p>
              We ask that you use our scheduling tool below to schedule a meeting and give 
              us the privilege of answering any and all questions.
            </p>
          </div>
          <div className="cu-hours" data-testid="contact-hours">
            <div className="cu-hours-item">
              <Clock size={20} />
              <div>
                <strong>Mon – Thu</strong>
                <span>6:00 PM – 9:00 PM EST</span>
              </div>
            </div>
            <div className="cu-hours-item">
              <Calendar size={20} />
              <div>
                <strong>Saturday</strong>
                <span>9:00 AM – 12:00 PM EST</span>
              </div>
            </div>
            <div className="cu-hours-item">
              <Phone size={20} />
              <div>
                <strong>By Appointment</strong>
                <span>Schedule below</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cal.com Scheduling Embed */}
      <section className="cu-scheduler" data-testid="contact-scheduler">
        <div className="cu-scheduler-inner">
          <h2 className="cu-scheduler-title">Schedule a Meeting</h2>
          <div className="cu-cal-embed">
            <iframe
              src="https://cal.com/turfstephen-gmail.com?embed=true&theme=light"
              title="Schedule a meeting"
              width="100%"
              height="700"
              frameBorder="0"
              data-testid="cal-embed-iframe"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
