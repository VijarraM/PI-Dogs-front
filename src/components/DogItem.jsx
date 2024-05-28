import React from 'react';
import { Link } from 'react-router-dom';
import './DogItem.css';

const DogItem = ({ dog }) => {
  return (
    <div className='dog-card'>
      <Link
        to={`/dogs/${dog.id}`}
        onClick={() => {
          window.location.href = `/dogs/${dog.id}`;
        }}
      >
        <img src={dog.image} alt={dog.name} className='dog-image1' />
        <h2 className='dog-name'>{dog.name}</h2>
      </Link>
      <h6 className='dog-weight'>Weight: {dog.weight} Kg</h6>
      <h4 className='dog-temperament-title'>Temperaments:</h4>
      <h6 className='dog-temperament'> {dog.temperaments?.map((temperament) => temperament.name).join(', ')}</h6>
    </div>
  );
};

export default DogItem;
