import React, { useState } from 'react';

const ContactForm = () => {
  const [form, setForm] = useState({
    nombre: '',
    ciudad: '',
    telefono: '',
    mensaje: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes integrar envío por API o almacenar local
    alert(`Mensaje enviado. Gracias, ${form.nombre}!`);
    setForm({ nombre: '', ciudad: '', telefono: '', mensaje: '' });
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h2>Envíanos un mensaje</h2>
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={form.nombre}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="ciudad"
        placeholder="Ciudad"
        value={form.ciudad}
        onChange={handleChange}
      />
      <input
        type="tel"
        name="telefono"
        placeholder="Teléfono"
        value={form.telefono}
        onChange={handleChange}
      />
      <textarea
        name="mensaje"
        placeholder="Escribe tu mensaje..."
        value={form.mensaje}
        onChange={handleChange}
        rows={4}
        required
      ></textarea>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default ContactForm;