const axiosInstance = require('../axios/index');
const { Dog, Temperament } = require('../db');
const { DB_URL } = process.env;

// controller para buscar todos los dogs API y DB
const findAllDogs = async () => {
  const { data: dogs } = await axiosInstance.get(`${DB_URL}/breeds`);

  const detailedDogs = dogs.map((dog) => {
    const temperamentArray = dog.temperament?.split(', ').map((temperament) => ({ name: temperament }));

    return {
      id: dog.id,
      name: dog.name,
      height: dog.height.metric,
      weight: dog.weight.metric,
      life_span: dog.life_span,
      image: dog.image.url,
      temperaments: temperamentArray,
      source: 'API',
    };
  });

  const dogsDb = await Dog.findAll({
    include: [{ model: Temperament, attributes: ['name'], through: { attributes: [] } }],
  });

  const dogsFromDatabaseWithSource = dogsDb.map((dog) => ({
    ...dog.toJSON(),
    source: 'DB',
  }));

  return dogsFromDatabaseWithSource.concat(detailedDogs);
};

// Controller para buscar por ID en API
const findDogById = async (id) => {
  const { data: dogs } = await axiosInstance.get(`${DB_URL}/breeds/${id}`);
  const { data: image } = await axiosInstance.get(`${DB_URL}/images/${dogs.reference_image_id}`);

  // Convierte la cadena de temperamentos en un arreglo de objetos con la clave 'name'
  const temperamentArray = dogs.temperament.split(', ').map((name) => ({ name }));

  const dog = {
    id: dogs.id,
    name: dogs.name,
    height: dogs.height.metric,
    weight: dogs.weight.metric,
    life_span: dogs.life_span,
    image: image.url,
    temperaments: temperamentArray,
    source: 'API',
  };
  return dog;
};

// Controller para buscar por ID en Database
const findDogByIdFromDatabase = async (id) => {
  const dogs = await Dog.findByPk(id, {
    include: {
      model: Temperament,
      attributes: ['name'],
      through: { attributes: [] },
    },
  });

  return dogs;
};

// Controller para crear nuevo Dog
const createNewDog = async (req, res) => {
  // console.log(req.body);
  try {
    const { id, name, height, weight, life_span, image, temperament } = req.body;
    const newDog = {
      id,
      name,
      height,
      weight,
      life_span,
      image,
    };

    const dog = await Dog.create(newDog);

    const temperaments = await Temperament.findAll({
      where: {
        name: temperament,
      },
    });

    await dog.setTemperaments(temperaments);

    const dogCreated = await Dog.findByPk(dog.id, {
      include: {
        model: Temperament,
        attributes: ['name'],
        through: { attributes: [] },
      },
    });

    res.status(201).json(dogCreated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { findAllDogs, findDogById, createNewDog, findDogByIdFromDatabase };
