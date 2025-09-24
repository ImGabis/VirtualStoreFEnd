import React from 'react';

const GoogleMap = () => {
  return (
    <div className="google-map">
      <iframe
        title="Ubicación ArteDiverso Group"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.842049502359!2d-74.08175338458983!3d4.609710596651859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f99f57c67b3cd%3A0xd5075dcffdf7f632!2sBogotá%2C%20Colombia!5e0!3m2!1sen!2sco!4v1615562303615!5m2!1sen!2sco"
        width="100%"
        height="300"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default GoogleMap;
