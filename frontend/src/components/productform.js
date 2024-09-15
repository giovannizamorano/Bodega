import React, { useState, useEffect } from 'react';

const ProductForm = ({ onSave, product, onCancel, existingProducts }) => {
  const [nombre, setNombre] = useState(product ? product.nombre : '');
  const [precio, setPrecio] = useState(product ? product.precio : '');
  const [cantidad, setCantidad] = useState(product ? product.cantidad : '');
  const [tipo, setTipo] = useState(product ? product.tipo : '');
  const [unidadesPorCaja, setUnidadesPorCaja] = useState(product ? product.unidadesPorCaja : '');
  const [litraje, setLitraje] = useState(product ? product.litraje : '');

  const getUniqueValuesByType = (field) => {
    return [...new Set(existingProducts.filter(p => p.tipo === tipo).map(p => p[field]))];
  };

  const nombreOptions = getUniqueValuesByType('nombre');
  const precioOptions = getUniqueValuesByType('precio');
  const cantidadOptions = getUniqueValuesByType('cantidad');
  const unidadesPorCajaOptions = getUniqueValuesByType('unidadesPorCaja');
  const litrajeOptions = getUniqueValuesByType('litraje');

  const handleTipoChange = (e) => {
    const selectedTipo = e.target.value;
    setTipo(selectedTipo);
  };

  const handleSave = () => {
    const newProduct = {
      nombre,
      precio,
      cantidad,
      tipo,
      litraje,
      unidadesPorCaja,
    };
    onSave(newProduct);
  };

  return (
    <div className="product-form">
      <h2>{product ? 'Editar Producto' : 'Agregar Producto'}</h2>
      <label>Tipo de Producto:</label>
      <input 
        type="text" 
        value={tipo} 
        onChange={handleTipoChange} 
        list="tipoOptions" 
        required 
      />
      <datalist id="tipoOptions">
        {[...new Set(existingProducts.map(p => p.tipo))].map((tipo, index) => (
          <option key={index} value={tipo} />
        ))}
      </datalist>

      <label>Nombre:</label>
      <input 
        type="text" 
        value={nombre} 
        onChange={(e) => setNombre(e.target.value)} 
        list="nombreOptions" 
        required 
      />
      <datalist id="nombreOptions">
        {nombreOptions.map((option, index) => (
          <option key={index} value={option} />
        ))}
      </datalist>

      <label>Precio:</label>
      <input 
        type="number" 
        value={precio} 
        onChange={(e) => setPrecio(e.target.value)} 
        list="precioOptions" 
        required 
      />
      <datalist id="precioOptions">
        {precioOptions.map((option, index) => (
          <option key={index} value={option} />
        ))}
      </datalist>

      <label>Cantidad:</label>
      <input 
        type="number" 
        value={cantidad} 
        onChange={(e) => setCantidad(e.target.value)} 
        list="cantidadOptions" 
        required 
      />
      <datalist id="cantidadOptions">
        {cantidadOptions.map((option, index) => (
          <option key={index} value={option} />
        ))}
      </datalist>

      <label>Unidades por Caja:</label>
      <input 
        type="number" 
        value={unidadesPorCaja} 
        onChange={(e) => setUnidadesPorCaja(e.target.value)} 
        list="unidadesPorCajaOptions" 
        required 
      />
      <datalist id="unidadesPorCajaOptions">
        {unidadesPorCajaOptions.map((option, index) => (
          <option key={index} value={option} />
        ))}
      </datalist>

      <label>CC (Litraje):</label>
      <input 
        type="number" 
        value={litraje} 
        onChange={(e) => setLitraje(e.target.value)} 
        list="litrajeOptions" 
        required 
      />
      <datalist id="litrajeOptions">
        {litrajeOptions.map((option, index) => (
          <option key={index} value={option} />
        ))}
      </datalist>

      <button onClick={handleSave} className="button">Guardar</button>
      <button onClick={onCancel} className="button">Cancelar</button>
    </div>
  );
};

export default ProductForm;