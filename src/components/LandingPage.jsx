import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className='landing-page'>
      <div className='background-image'></div>
      <div className='content'>
        <h1>Bienvenido a Henry Dogs</h1>
        <Link
          to='/home'
          onClick={() => {
            window.location.href = '/home';
          }}
        >
          <button id='button'>Ingresar</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
