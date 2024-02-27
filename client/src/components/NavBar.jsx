import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <div className='navbar-left'>
        <img
          src='https://img2.freepng.es/20180419/zve/kisspng-dog-puppy-cartoon-clip-art-2018-adorable-dogs-5ad8f85c440c32.2083954715241687962787.jpg'
          alt='Henry Dogs Logo'
        />
        <h1>Henry Dogs</h1>
      </div>

      <div className='navbar-right'>
        <Link
          to='/home'
          onClick={() => {
            window.location.href = '/home';
          }}
        >
          Home
        </Link>
        {/* <Link
          to='/about'
          onClick={() => {
            window.location.href = '/about';
          }}
        >
          About
        </Link> */}
        <Link
          to='/create'
          onClick={() => {
            window.location.href = '/create';
          }}
        >
          Create Dog
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
