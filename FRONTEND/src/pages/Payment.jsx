import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const carrito = location.state?.carrito || [];
  const totalPagado = location.state?.total || 0;

  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    cedula: "",
    direccion: "",
    correo: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.nombre.trim()) newErrors.nombre = "Nombre es requerido.";
    if (!form.apellidos.trim()) newErrors.apellidos = "Apellidos son requeridos.";
    if (!form.cedula.trim()) newErrors.cedula = "Cédula es requerida.";
    else if (!/^\d{6,10}$/.test(form.cedula)) newErrors.cedula = "Cédula inválida.";
    if (!form.direccion.trim()) newErrors.direccion = "Dirección es requerida.";
    if (!form.correo.trim()) newErrors.correo = "Correo es requerido.";
    else if (!/\S+@\S+\.\S+/.test(form.correo)) newErrors.correo = "Correo inválido.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);
    // Normalizar claves y guardar carrito como JSON string válido
    const carritoNormalizado = carrito.map(item => ({
      nombre: item.nombre || item.name || '',
      precio: item.precio || item.price || 0,
      cantidad: item.cantidad || item.quantity || 1,
      image: item.image || '',
      id: item.id
    }));
    const nuevaCompra = {
      ...form,
      carrito: JSON.stringify(carritoNormalizado),
      totalPagado,
      fecha: new Date().toISOString(),
    };
    // Guardar en backend Flask
    await fetch('https://virtualstorebend.onrender.com/compras', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevaCompra),
    });
  };

  if (submitted) {
    return (
      <div className="payment-success">
        <h2>✅ ¡Pago realizado correctamente!</h2>
        <p>Gracias por tu compra, <strong>{form.nombre}</strong>.</p>
        <p>Total pagado: <strong>${totalPagado.toLocaleString()} COP</strong></p>
        <p>📧 Confirmación enviada a: <strong>{form.correo}</strong></p>
        <button className="btn-primary" onClick={() => navigate("/")}>Volver a la tienda</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <h2>Formulario de Pago</h2>

      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={form.nombre}
        onChange={handleChange}
      />
      {errors.nombre && <small className="error">{errors.nombre}</small>}

      <input
        type="text"
        name="apellidos"
        placeholder="Apellidos"
        value={form.apellidos}
        onChange={handleChange}
      />
      {errors.apellidos && <small className="error">{errors.apellidos}</small>}

      <input
        type="text"
        name="cedula"
        placeholder="Cédula"
        value={form.cedula}
        onChange={handleChange}
      />
      {errors.cedula && <small className="error">{errors.cedula}</small>}

      <input
        type="text"
        name="direccion"
        placeholder="Dirección"
        value={form.direccion}
        onChange={handleChange}
      />
      {errors.direccion && <small className="error">{errors.direccion}</small>}

      <input
        type="email"
        name="correo"
        placeholder="Correo"
        value={form.correo}
        onChange={handleChange}
      />
      {errors.correo && <small className="error">{errors.correo}</small>}

      <button type="submit">Procesar Pago</button>
    </form>
  );
};

export default Payment;