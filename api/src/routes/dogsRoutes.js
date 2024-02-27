const { Router } = require('express');
const router = Router();
const {
  findAllDogs,
  findDogById,
  createNewDog,
  findDogByIdFromDatabase,
} = require('../controllers/dogs.controllers.js');

// Ruta para traer todos los perros de la API/DB
router.get('/', async (req, res) => {
  try {
    const { name } = req.query;
    const dogs = await findAllDogs();
    if (name) {
      const dogsFiltered = dogs.filter((dog) => dog.name.toLowerCase().includes(name.toLocaleLowerCase()));

      if (dogsFiltered.length === 0) {
        res.status(404).json({ message: 'No se encontraron razas' });
      } else {
        res.status(200).json(dogsFiltered);
      }
    } else {
      res.status(200).json(dogs);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para traer dog por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let dog = null;
    const regexExpUUID = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    if (regexExpUUID.test(id)) {
      dog = await findDogByIdFromDatabase(id);
    } else {
      dog = await findDogById(id);
    }
    if (!dog) {
      res.status(404).send('Dog not found!');
    }
    res.status(200).json(dog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ruta para crear nuevo Dog
router.post('/', createNewDog);

module.exports = router;
