import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBreed } from '../redux/actions';
import './DogDetailPage.css';
import Navbar from './NavBar';

const DogDetailPage = () => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();
  const dog = useSelector((state) => state.breedDetail);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getBreed(id));
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error al cargar:', error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div>
      <Navbar />

      <div className='outer-container'>
        {loading ? (
          <div className='loading'>
            <img
              src='https://cdn.dribbble.com/users/1782673/screenshots/4683964/ezgif.com-video-to-gif__2_.gif'
              alt='Cargando...'
            />
            <p className='p-loading'> Cargando details...</p>
          </div>
        ) : (
          <div className='dog-detail-container'>
            <img src={dog.image} alt={dog.name} className='dog-image3' />
            <div className='dog-details'>
              <h1>{dog.name}</h1>
              <p>Id: {dog.id}</p>
              <p>Altura: {dog.height} cm</p>
              <p>Peso: {dog.weight} kg</p>
              <p>Esperanza de vida: {dog.life_span}</p>
              <p>Temperamentos: {dog.temperaments?.map((temperament) => temperament.name).join(', ')}</p>
              <Link
                to='/home'
                onClick={() => {
                  window.location.href = '/home';
                }}
              >
                {' '}
                <button className='button'>Volver a Home</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DogDetailPage;
