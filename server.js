const express = require('express');
const dotenv = require('dotenv')
const morgan = require('morgan');
require('colors');
const cors = require("cors");

const connectDatabase = require('./config/database');

//config dotenv
dotenv.config({ path: './config/config.env' });

//Connect DataBase
connectDatabase();

const app = express();

app.use(cors());
//middleware
app.use(express.json());
app.use(morgan('dev'));

//route
app.use('/api/pizzas', require('./routes/pizzaRoute'));
app.use("/api/users", require('./routes/userRoute'))
app.use("/api/orders", require("./routes/orderRoute"))
// app.get('/', (req, res) => {
//     res.send('Hellow');
// })


const server = app.listen(process.env.PORT || 5000, () => {
    console.log(`Listening to port: ${process.env.PORT}`);
})

//unhandled promise rejetcion
process.on("unhandledRejection", err => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down server  ")
    server.close(() => {
        process.exit(1);
    })
})