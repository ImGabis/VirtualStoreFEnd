
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import '../AppDatos.css';

const metricOptions = [
  { value: 'cantidad', label: 'Cantidad' },
  { value: 'ingreso', label: 'Ingreso' },
  { value: 'cliente', label: 'Cliente del mes' }
];

const Datos = () => {
  const [metrica, setMetrica] = useState('cantidad');
  const [top5, setTop5] = useState([]);
  const [topClientes, setTopClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarDatos = () => {
    setLoading(true);
    fetch('http://localhost:5000/compras')
      .then(res => res.json())
      .then(data => {
        if (metrica === 'cliente') {
          // Top clientes por totalPagado
          const clientes = {};
          data.forEach(compra => {
            const nombre = (compra.nombre || '') + ' ' + (compra.apellidos || '');
            if (!clientes[nombre]) clientes[nombre] = { total: 0, compras: 0 };
            clientes[nombre].total += parseFloat(compra.totalPagado) || 0;
            clientes[nombre].compras += 1;
          });
          const topClientes = Object.entries(clientes)
            .sort((a, b) => b[1].total - a[1].total)
            .slice(0, 5)
            .map(([nombre, datos]) => ({ nombre, ...datos }));
          setTopClientes(topClientes);
          setLoading(false);
          return;
        }
        // Procesar compras para obtener top 5 productos
        const productos = {};
        data.forEach(compra => {
          let articulos = [];
          try {
            articulos = JSON.parse(compra.carrito.replace(/'/g, '"'));
          } catch {
            articulos = [];
          }
          articulos.forEach(item => {
            const nombre = item.nombre || item.name || 'Desconocido';
            const cantidad = parseInt(item.cantidad) || 0;
            const ingreso = (parseFloat(item.precio) || 0) * cantidad;
            if (!productos[nombre]) productos[nombre] = { cantidad: 0, ingreso: 0 };
            productos[nombre].cantidad += cantidad;
            productos[nombre].ingreso += ingreso;
          });
        });
        // Ordenar y tomar top 5 según la métrica
        const top = Object.entries(productos)
          .sort((a, b) => b[1][metrica] - a[1][metrica])
          .slice(0, 5)
          .map(([nombre, datos]) => ({ nombre, ...datos }));
        setTop5(top);
        setLoading(false);
      });
  };

  useEffect(() => {
    cargarDatos();
    // eslint-disable-next-line
  }, [metrica]);

  return (
    <div className="datos-page">
  <h2>Datos y estadísticas</h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <label htmlFor="metrica-select">Métrica:</label>
        <select id="metrica-select" value={metrica} onChange={e => setMetrica(e.target.value)}>
          {metricOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <button onClick={cargarDatos} style={{ padding: '0.5rem 1rem' }}>Actualizar</button>
      </div>
      <div className="graficas">
        {metrica === 'cliente' ? (
          <>
            <h3>Top 5 clientes del mes (por monto comprado)</h3>
            {loading ? <p>Cargando...</p> : (
              <table style={{width: '100%', borderCollapse: 'collapse'}}>
                <thead>
                  <tr>
                    <th style={{border: '1px solid #ccc'}}>Cliente</th>
                    <th style={{border: '1px solid #ccc'}}>Total comprado</th>
                    <th style={{border: '1px solid #ccc'}}>Compras realizadas</th>
                  </tr>
                </thead>
                <tbody>
                  {topClientes.map((cliente, i) => (
                    <tr key={i}>
                      <td style={{border: '1px solid #ccc'}}>{cliente.nombre}</td>
                      <td style={{border: '1px solid #ccc'}}>${cliente.total.toLocaleString()} COP</td>
                      <td style={{border: '1px solid #ccc'}}>{cliente.compras}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        ) : (
          <>
            <h3>Top 5 por {metrica === 'cantidad' ? 'cantidad vendida' : 'ingreso recaudado'}</h3>
            {loading ? <p>Cargando gráfica...</p> : (
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={top5} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="nombre" angle={-20} textAnchor="end" interval={0} height={80} />
                  <YAxis />
                  <Tooltip formatter={(value) => metrica === 'ingreso' ? `$${value.toLocaleString()}` : value} />
                  <Legend />
                  <Bar dataKey={metrica} fill={metrica === 'cantidad' ? '#1a237e' : '#ffd700'} name={metrica === 'cantidad' ? 'Cantidad vendida' : 'Ingreso recaudado'} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </>
        )}
      </div>
      <Link to="/">
        <button className="back-button">Regresar a la tienda</button>
      </Link>
    </div>
  );
};

export default Datos;
