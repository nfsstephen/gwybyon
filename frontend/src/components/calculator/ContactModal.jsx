import React, { useState } from 'react';

const ContactModal = ({ show, onClose, calculatorType, calculatorInputs, results }) => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
  });
  const [submitMessage, setSubmitMessage] = useState('');

  if (!show) return null;

  const handleChange = (e) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestData = {
      type: calculatorType,
      timestamp: new Date().toISOString(),
      contact: contactForm,
      calculatorInputs,
      results: {
        annualNetReturn: results.annualNetReturn,
        investment: results.investment,
        netAnnualReturn: results.netAnnualReturn,
      },
    };
    const existing = JSON.parse(localStorage.getItem('confirmationRequests') || '[]');
    existing.push(requestData);
    localStorage.setItem('confirmationRequests', JSON.stringify(existing));

    setSubmitMessage('Thank you! Your request has been submitted. We will contact you shortly.');
    setTimeout(() => {
      onClose();
      setSubmitMessage('');
      setContactForm({ name: '', email: '', phone: '', company: '' });
    }, 3000);
  };

  return (
    <div className="calc-modal-overlay" onClick={onClose} data-testid="contact-modal-overlay">
      <div className="calc-modal" onClick={(e) => e.stopPropagation()}>
        <button className="calc-modal-close" onClick={onClose} data-testid="contact-modal-close">
          &times;
        </button>
        <h2>Request Confirmation</h2>
        <p>Enter your contact information and we'll confirm these numbers with you.</p>

        {submitMessage ? (
          <div className="calc-submit-success" data-testid="contact-submit-success">
            {submitMessage}
          </div>
        ) : (
          <form onSubmit={handleSubmit} data-testid="contact-modal-form">
            <div className="calc-modal-field">
              <label htmlFor="contact-name">Name *</label>
              <input
                type="text"
                id="contact-name"
                name="name"
                value={contactForm.name}
                onChange={handleChange}
                required
                data-testid="contact-name-input"
              />
            </div>
            <div className="calc-modal-field">
              <label htmlFor="contact-email">Email *</label>
              <input
                type="email"
                id="contact-email"
                name="email"
                value={contactForm.email}
                onChange={handleChange}
                required
                data-testid="contact-email-input"
              />
            </div>
            <div className="calc-modal-field">
              <label htmlFor="contact-phone">Phone</label>
              <input
                type="tel"
                id="contact-phone"
                name="phone"
                value={contactForm.phone}
                onChange={handleChange}
                data-testid="contact-phone-input"
              />
            </div>
            <div className="calc-modal-field">
              <label htmlFor="contact-company">Company</label>
              <input
                type="text"
                id="contact-company"
                name="company"
                value={contactForm.company}
                onChange={handleChange}
                data-testid="contact-company-input"
              />
            </div>
            <button type="submit" className="calc-modal-submit" data-testid="contact-submit-btn">
              Submit Request
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactModal;
