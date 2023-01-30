const mongoose = require('mongoose');
const dotenv = require('dotenv');

const connectDatabase = require('./config/database');

const Pizza = require('./models/pizzaModel');

const Pizzas = require('./data/pizza-data');

//config .env and mongodb conn file
dotenv.config({ path: './config/config.env' });
connectDatabase();

//import data
const importdata = async () => {
    try {
        await Pizza.deleteMany()
        const sampleData = Pizzas.map(pizza => { return { ...pizza } });
        await Pizza.insertMany(sampleData);
        console.log('Data Imported');
        process.exit();
    } catch (error) {
        console.log(`${error}`);
        process.exit(1)
    }
}

const dataDestroy = () => { };

if (process.argv[2] === '-d') {
    dataDestroy()
} else {
    importdata()
}

