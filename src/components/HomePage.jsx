import React, { useState, useEffect } from 'react';
import './HomePage.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBreeds, getAllTemperaments, getFilteredBreeds, orderBy } from '../redux/actions'; // Asegúrate de importar la acción getAllBreeds
import Navbar from './NavBar';
import DogItem from './DogItem'; // Importa el componente DogItem
import Pagination from './Pagination';
import axios from 'axios';

const HomePage = () => {
  const dispatch = useDispatch();

  const breeds = useSelector((state) => state.breeds);
  const temperaments = useSelector((state) => state.temperaments).sort();

  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(''); // Estado para la consulta de búsqueda
  const [filteredBreeds, setFilteredBreeds] = useState([]); // Estado para las razas filtradas

  const [page, setPage] = useState(1);

  const perPage = 8;
  const maxPage = Math.ceil(breeds.length / perPage);

  const handleFilter = function (event) {
    const temperament = event.target.value;
    dispatch(getFilteredBreeds(temperament));
  };

  const handleOrderBy = async (event) => {
    const order = event.target.value;

    const { data: allBreeds } = await axios.get('http://localhost:3001/dogs');
    if (!order) {
      return { data: allBreeds };
    } else {
      dispatch(orderBy(order, allBreeds));
    }
  };

  const handleSearch = async () => {
    try {
      if (searchQuery.trim() !== '') {
        const url = `http://localhost:3001/dogs?name=${searchQuery}`;
        const response = await axios.get(url);
        if (response.data.length > 0) {
          setFilteredBreeds(response.data);
        } else {
          alert('No se encontraron perros con ese nombre');
        }
      } else {
        setFilteredBreeds([]);
      }
    } catch (error) {
      console.error('Error al buscar por nombre:', error);
      alert('No se encontraron perros con ese nombre');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllBreeds());
        await dispatch(getAllTemperaments());
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error al cargar los datos de los perros/temperamentos:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='body'>
      <Navbar />

      <div className='homepage-container'>
        {loading ? (
          <div className='loading'>
            <img
              src='https://cdn.dribbble.com/users/1782673/screenshots/4683964/ezgif.com-video-to-gif__2_.gif'
              alt='Cargando...'
            />
            <p className='p-loading'> Cargando razas de perros...</p>
          </div>
        ) : (
          <>
            {/* Barra de búsqueda */}
            <div className='search-container'>
              <input
                className='search-input'
                type='text'
                placeholder='Search dog...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {/* Botón para realizar la búsqueda */}
              <button className='search-button' onClick={handleSearch}>
                Search
              </button>
            </div>

            {/* Filters */}

            <div className='filters-container'>
              <div className='filters'>
                <label>Filter by: </label>
                <select name='orderBy' onChange={(e) => handleOrderBy(e)}>
                  <option value='All'>API & DB</option>
                  <option value='API'>API</option>
                  <option value='DB'>DB</option>
                </select>

                <select name='filterBy' onChange={(e) => handleFilter(e)}>
                  <option value=''>Temperaments</option>
                  {temperaments.map((t) => (
                    <option key={t.id} value={t.name}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className='order'>
                <label>Order by: </label>
                <select name='orderBy' onChange={(e) => handleOrderBy(e)}>
                  <option value='name_asc'>A - Z</option>
                  <option value='name_desc'>Z - A</option>
                </select>

                <select name='orderBy' onChange={(e) => handleOrderBy(e)}>
                  <option name=''>Weight</option>
                  <option value='weight_asc'>Min first</option>
                  <option value='weight_desc'>Max first</option>
                </select>
              </div>
            </div>

            {/* Lista de perros */}
            <div className='dog-list'>
              {searchQuery && filteredBreeds.length > 0
                ? // Si hay una consulta de búsqueda y hay resultados, muestra las razas filtradas
                  filteredBreeds.map((dog) => <DogItem key={dog.id} dog={dog} />)
                : // Si no hay consulta de búsqueda o no hay resultados, muestra todas las razas
                  breeds
                    .slice((page - 1) * perPage, (page - 1) * perPage + perPage)
                    .map((dog) => <DogItem key={dog.id} dog={dog} />)}
            </div>

            <Pagination page={page} setPage={setPage} maxPage={maxPage} breeds={breeds} />
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
