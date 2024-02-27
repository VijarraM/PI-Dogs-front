const axiosInstance = require('../axios');
const { DB_URL } = process.env;
const { Temperament } = require('../db');

const findAll = async (req, res) => {
  let temperamentsFromDatabase = await Temperament.findAll();
  if (temperamentsFromDatabase.length > 0) {
    res.json(temperamentsFromDatabase);
  } else {
    const { data: dogs } = await axiosInstance.get(`${DB_URL}/breeds`);
    let temperaments = [];

    dogs.forEach((dog) => {
      const temperamentsSplitted = dog.temperament?.split(', ');
      temperamentsSplitted?.forEach((temperamentName) => {
        if (!temperaments.includes(temperamentName)) {
          temperaments.push(temperamentName);
        }
      });
    });

    const temperamentsForDatabase = temperaments.map((name) => {
      return { name };
    });

    await Temperament.bulkCreate(temperamentsForDatabase);

    temperamentsFromDatabase = await Temperament.findAll();

    res.json(temperamentsFromDatabase);
  }
};

module.exports = findAll;
