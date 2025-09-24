import React from 'react';

const Total = ({ total }) => (
  <div className="total-box">
    <h2>Total a Pagar: ${total.toLocaleString()} COP</h2>
  </div>
);

export default Total;
