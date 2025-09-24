import React from 'react';
import { Link } from 'react-router-dom';
import ContactInfo from '../components/ContactInfo';
import GoogleMap from '../components/GoogleMap';
import SocialMediaButtons from '../components/SocialMediaButtons';
import ContactForm from '../components/ContactForm';

const ContactPage = () => {
  return (
    <div className="contact-page">
      <h1>Contáctanos</h1>
      <Link to="/" className="back-link">← Volver a la tienda</Link>
      <ContactInfo />
      <GoogleMap />
      <SocialMediaButtons />
      <ContactForm />
    </div>
  );
};

export default ContactPage;
