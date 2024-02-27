import React, { useEffect, useState } from 'react';
import './DogCreatePage.css';
import { getAllTemperaments } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Navbar from './NavBar';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const DogCreatePage = () => {
  // Variables de estado
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [image, setImage] = useState('');
  const [minWeight, setMinWeight] = useState('');
  const [maxWeight, setMaxWeight] = useState('');
  const [weightError, setWeightError] = useState('');
  const [minHeight, setMinHeight] = useState('');
  const [maxHeight, setMaxHeight] = useState('');
  const [heightError, setHeightError] = useState('');
  const [lifeSpan, setLifeSpan] = useState('');
  const [lifeSpanError, setLifeSpanError] = useState('');
  const [selectedTemperaments, setSelectedTemperaments] = useState([]);

  // Hooks
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  const history = useHistory();

  // Efecto para cargar los temperamentos
  useEffect(() => {
    const fetchTemperaments = async () => {
      try {
        dispatch(getAllTemperaments());
      } catch (error) {
        console.error('Error al cargar los datos de los perros:', error);
      }
    };

    fetchTemperaments();
  }, [dispatch]);

  // Funciones de validación
  const validateName = (inputName) => {
    // Expresión regular para verificar si el nombre contiene solo letras
    const nameRegex = /^[a-zA-Z\s]+$/;

    if (inputName.length === 0) {
      setNameError('El nombre es obligatorio.');
    } else if (inputName.length > 40) {
      setNameError('El nombre no puede tener más de 40 caracteres.');
    } else if (!nameRegex.test(inputName)) {
      setNameError('El nombre solo debe contener letras y espacios.');
    } else {
      setNameError('');
    }
  };

  const validateWeight = (inputMinWeight, inputMaxWeight) => {
    const min = parseInt(inputMinWeight);
    const max = parseInt(inputMaxWeight);

    if (inputMinWeight.length === 0 || inputMaxWeight.length === 0) {
      setWeightError('Ambos campos de peso son obligatorios.');
    } else if (isNaN(min) || isNaN(max)) {
      setWeightError('Los campos de peso deben ser números.');
    } else if (min < 1 || max < 1) {
      setWeightError('Los valores de peso deben ser mayores o iguales a 1.');
    } else if (min >= max) {
      setWeightError('El peso mínimo debe ser menor que el peso máximo.');
    } else {
      setWeightError('');
    }
  };

  const validateHeight = (inputMinHeight, inputMaxHeight) => {
    const min = parseInt(inputMinHeight);
    const max = parseInt(inputMaxHeight);

    if (inputMinHeight.length === 0 || inputMaxHeight.length === 0) {
      setHeightError('Ambos campos de altura son obligatorios.');
    } else if (isNaN(min) || isNaN(max)) {
      setHeightError('Los campos de altura deben ser números.');
    } else if (min < 1 || max < 1) {
      setHeightError('Los valores de altura deben ser mayores o iguales a 1.');
    } else if (max > 150) {
      setHeightError('Los valores máximos no pueden superar los 150 cm.');
    } else if (min >= max) {
      setHeightError('La altura mínima debe ser menor que la altura máxima.');
    } else {
      setHeightError('');
    }
  };

  const validateLifeSpan = (inputLifeSpan) => {
    const lifespanValue = parseInt(inputLifeSpan);

    if (inputLifeSpan.length === 0) {
      setLifeSpanError('La esperanza de vida es obligatoria.');
    } else if (isNaN(lifespanValue)) {
      setLifeSpanError('La esperanza de vida debe ser un número.');
    } else if (lifespanValue <= 0 || lifespanValue > 30) {
      setLifeSpanError('La esperanza de vida debe estar entre 1 y 30 años.');
    } else {
      setLifeSpanError('');
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const weightRange = `${minWeight} - ${maxWeight}`;
    const heightRange = `${minHeight} - ${maxHeight}`;

    // Verificar las validaciones antes de enviar el formulario
    if (name.trim() === '' || weightError || heightError || lifeSpanError || selectedTemperaments.length === 0) {
      // Mostrar un mensaje de error al usuario
      alert('Por favor, completa todos los campos del formulario y verifica las validaciones.');
    } else {
      const newDog = {
        name,
        image: imagenAUsar,
        height: heightRange,
        weight: weightRange,
        life_span: lifeSpan,
        temperament: selectedTemperaments,
      };

      // Enviar el formulario solo si no hay errores
      const breed = await axios.post('http://localhost:3001/dogs', newDog);
      history.push(`/dogs/${breed.data.id}`);
    }
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    validateName(newName);
    setName(newName);
  };

  const handleMinWeightChange = (e) => {
    const newMinWeight = e.target.value;
    validateWeight(newMinWeight, maxWeight);
    setMinWeight(newMinWeight);
  };

  const handleMaxWeightChange = (e) => {
    const newMaxWeight = e.target.value;
    validateWeight(minWeight, newMaxWeight);
    setMaxWeight(newMaxWeight);
  };

  const handleMinHeightChange = (e) => {
    const newMinHeight = e.target.value;
    validateHeight(newMinHeight, maxHeight);
    setMinHeight(newMinHeight);
  };

  const handleMaxHeightChange = (e) => {
    const newMaxHeight = e.target.value;
    validateHeight(minHeight, newMaxHeight);
    setMaxHeight(newMaxHeight);
  };

  const handleLifeSpanChange = (e) => {
    const newLifeSpan = e.target.value;
    validateLifeSpan(newLifeSpan);
    setLifeSpan(newLifeSpan);
  };

  const handleImageChange = (e) => {
    const newValue = e.target.value;
    setImage(newValue);
  };

  // Función para limpiar form
  const handleCancel = () => {
    setName('');
    setImage('');
    setMinWeight('');
    setMaxWeight('');
    setMinHeight('');
    setMaxHeight('');
    setLifeSpan('');
    setSelectedTemperaments([]);
  };

  // Función para eliminar temperamentos seleccionados
  const handleRemoveTemperament = (temperament) => {
    setSelectedTemperaments(selectedTemperaments.filter((t) => t !== temperament));
  };

  const imagenPorDefecto = 'https://i.pinimg.com/originals/a8/00/d9/a800d917556bfed4b134dd401c1ef489.jpg';

  const imagenAUsar = image.trim() === '' ? imagenPorDefecto : image;

  return (
    <div>
      <Navbar></Navbar>

      <div className='dog-create-container'>
        <div className='img-container'>
          <img className='img-create' src={imagenAUsar} alt='Imagen' />
        </div>
        <div className='form-container'>
          <h1>Create your dog</h1>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor='name'>Name:</label>
              <input type='text' id='name' className='input-text' value={name} onChange={handleNameChange} />
              {nameError && <p className='error-message'>{nameError}</p>}
            </div>
            <div className='form-group'>
              <label htmlFor='image'>URL Image:</label>
              <input type='text' id='image' className='input-text' value={image} onChange={handleImageChange} />
            </div>
            <div className='form-group'>
              <label>Weight:</label>
              <div className='range-container'>
                <input id='minWeight' className='range-input' value={minWeight} onChange={handleMinWeightChange} />
                <span className='unit-label'>Min.</span>
                <input id='maxWeight' className='range-input' value={maxWeight} onChange={handleMaxWeightChange} />
                <span className='unit-label'>Max.</span>
                KG
              </div>
              {weightError && <p className='error-message'>{weightError}</p>}
            </div>

            <div className='form-group'>
              <label>Height:</label>
              <div className='range-container'>
                <input id='minHeight' className='range-input' value={minHeight} onChange={handleMinHeightChange} />
                <span className='unit-label'>Min.</span>
                <input id='maxHeight' className='range-input' value={maxHeight} onChange={handleMaxHeightChange} />
                <span className='unit-label'>Max.</span>
                CM
              </div>
              {heightError && <p className='error-message'>{heightError}</p>}
            </div>

            <div className='form-group'>
              <label htmlFor='lifeSpan'>Life Span:</label>
              <input id='lifeSpan' className='input-text' value={lifeSpan} onChange={handleLifeSpanChange} />
              {lifeSpanError && <p className='error-message'>{lifeSpanError}</p>}
            </div>

            <div>
              <div>
                <label className='temperaments'>Temperaments:</label>
              </div>
              <div>
                <select
                  value={selectedTemperaments}
                  onChange={(e) => {
                    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
                    setSelectedTemperaments([...selectedTemperaments, ...selectedOptions]);
                  }}
                >
                  <option value='' disabled>
                    Select ...
                  </option>
                  {temperaments.map((temperament) => (
                    <option key={temperament.ID} value={temperament.name}>
                      {temperament.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className='selected-temperaments'>
                <p className='title'>Selected Temperaments:</p>
                <div className='temperament-tags'>
                  {selectedTemperaments.map((temperament, index) => (
                    <div className='temperament-tag' key={index}>
                      {temperament}
                      <button className='button-x' onClick={() => handleRemoveTemperament(temperament)}>
                        <span className='remove-button'>X</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className='button-container'>
              <button type='button' className='cancel-button' onClick={handleCancel}>
                CLEAR FORM
              </button>
              <button type='button' className='create-button' onClick={handleSubmit}>
                CREATE
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DogCreatePage;
