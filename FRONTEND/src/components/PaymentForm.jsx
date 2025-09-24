import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const carrito = location.state?.carrito || [];
  const totalPagado = location.state?.total || 0;

  const [form, setForm] = useState({
    nombre: "",
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
    if (!form.correo.trim()) newErrors.correo = "Correo es requerido.";
    else if (!/\S+@\S+\.\S+/.test(form.correo)) newErrors.correo = "Correo inválido.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    
    const nuevaCompra = {
      ...form,
      carrito,
      totalPagado,
      fecha: new Date().toISOString(),
    };
    const comprasPrevias = JSON.parse(localStorage.getItem("compras") || "[]");
    localStorage.setItem("compras", JSON.stringify([...comprasPrevias, nuevaCompra]));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="payment-success-modal">
        <div className="payment-success-content">
          <h2>✅ ¡Gracias por su compra!</h2>
          <button className="btn-primary" onClick={() => navigate("/")}>Volver a la tienda</button>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-form-modal">
      <div className="payment-form-content">
        <h2>Formulario de Pago</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
          />
          {errors.nombre && <small className="error">{errors.nombre}</small>}

          <input
            type="email"
            name="correo"
            placeholder="Correo"
            value={form.correo}
            onChange={handleChange}
          />
          {errors.correo && <small className="error">{errors.correo}</small>}
          
          <div className="form-buttons">
            <button type="button" className="btn-light" onClick={() => navigate(-1)}>Cancelar</button>
            <button type="submit" className="btn-success">Pagar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Payment;