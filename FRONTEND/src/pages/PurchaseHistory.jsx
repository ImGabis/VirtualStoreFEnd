import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PurchaseHistory = () => {
  const [compras, setCompras] = useState([]);

  useEffect(() => {
    fetch('https://virtualstorebend.onrender.com/compras')
      .then(res => res.json())
      .then(data => {
        // Convertir carrito a array si es string
        const repararJson = (texto) => {
          let reparado = texto.replace(/'/g, '"');
          reparado = reparado.replace(/([,{\[])(\s*)([a-zA-Z0-9_]+)(\s*):/g, '$1"$3":');
          return reparado;
        };
        const comprasProcesadas = data.map(compra => {
          let carrito = compra.carrito;
          if (typeof carrito === 'string') {
            try {
              carrito = JSON.parse(carrito);
            } catch {
              try {
                carrito = JSON.parse(repararJson(carrito));
              } catch {
                carrito = [];
              }
            }
          }
          return { ...compra, carrito };
        });
        setCompras(comprasProcesadas);
      });
  }, []);

  const borrarHistorial = async () => {
    if (confirm("¿Estás seguro de borrar todo el historial de compras?")) {
      await fetch('http://localhost:5000/compras', { method: 'DELETE' });
      setCompras([]);
    }
  };

  return (
    <div className="purchase-container">
      <div className="purchase-header">
        <h1>🧾 Historial de Compras</h1>
        <Link to="/" className="back-link">← Volver a la tienda</Link>
      </div>

      {compras.length === 0 ? (
        <p className="no-purchases">No hay compras registradas aún.</p>
      ) : (
        <>
          <div className="purchase-list">
            {compras.map((compra, index) => (
              <div className="purchase-card" key={index}>
                <div className="purchase-row">
                  <strong>Cliente:</strong> {compra.nombre} {compra.apellidos}
                </div>
                <div className="purchase-row">
                  <strong>Correo:</strong> {compra.correo}
                </div>
                <div className="purchase-row">
                  <strong>Dirección:</strong> {compra.direccion}
                </div>
                <div className="purchase-row">
                  <strong>Cédula:</strong> {compra.cedula}
                </div>
                <div className="purchase-row">
                  <strong>Fecha:</strong> {new Date(compra.fecha).toLocaleString()}
                </div>

                 {Array.isArray(compra.carrito) && compra.carrito.length > 0 && (
                   <div className="product-list">
                     <p><strong>Artículos comprados:</strong></p>
                     <table style={{width: '100%', borderCollapse: 'collapse'}}>
                       <thead>
                         <tr>
                           <th style={{border: '1px solid #ccc'}}>Nombre</th>
                           <th style={{border: '1px solid #ccc'}}>Valor unitario</th>
                           <th style={{border: '1px solid #ccc'}}>Cantidad</th>
                           <th style={{border: '1px solid #ccc'}}>Subtotal</th>
                         </tr>
                       </thead>
                       <tbody>
                         {compra.carrito.map((producto, i) => (
                           <tr key={i}>
                             <td style={{border: '1px solid #ccc'}}>{producto.nombre || producto.name || 'Producto'}</td>
                             <td style={{border: '1px solid #ccc'}}>${(producto.precio || producto.price || 0).toLocaleString()} COP</td>
                             <td style={{border: '1px solid #ccc'}}>{producto.cantidad || 1}</td>
                             <td style={{border: '1px solid #ccc'}}>${((producto.precio || producto.price || 0) * (producto.cantidad || 1)).toLocaleString()} COP</td>
                           </tr>
                         ))}
                       </tbody>
                     </table>
                     <p style={{marginTop: '10px'}}><strong>Total pagado por el cliente:</strong> ${compra.totalPagado.toLocaleString()} COP</p>
                   </div>
                 )}
              </div>
            ))}
          </div>

          <div className="center-btn">
            <button className="clear-button" onClick={borrarHistorial}>
              🗑 Borrar historial de compras
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PurchaseHistory;