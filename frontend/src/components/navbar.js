import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import 'boxicons';

const handleLogout = () => {
  localStorage.removeItem('token');
  sessionStorage.removeItem('token');
  navigate('/');
};



const Navbar = () => {
  useEffect(() => {
    const nav = document.getElementById('navbar');
    const body = document.body;

    const handleMouseEnter = () => {
      body.classList.add('body-pd');
    };

    const handleMouseLeave = () => {
      body.classList.remove('body-pd');
    };

    if (nav) {
      nav.addEventListener('mouseenter', handleMouseEnter);
      nav.addEventListener('mouseleave', handleMouseLeave);
    }

    // Cleanup function to remove event listeners when component unmounts
    return () => {
      if (nav) {
        nav.removeEventListener('mouseenter', handleMouseEnter);
        nav.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <nav id="navbar">
      {/*icono del navbar*/}
      <ul className="navbar-items flexbox-col">
        <li className="navbar-logo flexbox-left">
          <div className="navbar-item-inner flexbox">
          <box-icon name='drink' type='solid' color='#ffffff' ></box-icon>
          </div>
          <h3 className="link-icono" >GILUC</h3>
        </li>

        {/*Enlace a la homepage, lista de productos*/}
        <li className="navbar-item flexbox-left">
          <Link to="/" className="navbar-item-inner flexbox-left"> 
            <div className="navbar-item-inner-icon-wrapper flexbox">
              <box-icon name='list-ul' color='#ffffff' ></box-icon>
            </div>
            <span className="link-text">Lista</span>
          </Link>
        </li>

        {/*Enlace a los graficos*/}
        <li className="navbar-item flexbox-left">
          <Link to="/charts" className="navbar-item-inner flexbox-left"> 
            <div className="navbar-item-inner-icon-wrapper flexbox">
              <box-icon name='bar-chart-alt-2' type='solid' color='#ffffff' ></box-icon>
            </div>
            <span className="link-text">Estadisticas</span>
          </Link>
          </li>

        {/*Enlace a las compras*/}
        <li className="navbar-item flexbox-left">
          <Link to="/Compra" className="navbar-item-inner flexbox-left"> 
            <div className="navbar-item-inner-icon-wrapper flexbox">
              <box-icon name='cart-add' color='#ffffff' ></box-icon>
            </div>
            <span className="link-text">Compra</span>
          </Link>
          </li>

        {/*Enlace a las ventas*/}
        <li className="navbar-item flexbox-left">
          <Link to="/Venta" className="navbar-item-inner flexbox-left"> 
            <div className="navbar-item-inner-icon-wrapper flexbox">
              <box-icon name='store-alt' color='#ffffff' ></box-icon>
            </div>
            <span className="link-text">Venta</span>
          </Link>
        </li>
        
        {/*Crear usuario*/}
        <li className="navbar-item flexbox-left">
          <Link to="/Venta" className="navbar-item-inner flexbox-left"> 
            <div className="navbar-item-inner-icon-wrapper flexbox">
              <box-icon name='user-plus' type='solid' color='#ffffff' ></box-icon>
            </div>
            <span className="link-text">Crear usuario</span>
          </Link>
        </li>

          <li className="navbar-item logout flexbox-left">
            <div className="navbar-item-inner flexbox-left">
              <div className="navbar-item-inner-icon-wrapper flexbox">
                <box-icon name='user-x' type='solid' color='#ffffff' ></box-icon>
              </div>
                <span className="link-text" onClick={handleLogout}>Cerrar Sesión</span>
            </div>
          </li>
      </ul>
    </nav>
  );
};

export default Navbar;