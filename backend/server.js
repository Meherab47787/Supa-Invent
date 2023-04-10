const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
mongoose.set('strictQuery', true);
const app = require('./app')



const PORT = process.env.BACKEND_PORT

const db = process.env.MONGODBOLDURI
const server = mongoose.connect(db)
        .then(() => {
            console.log("Database connected successfully");
            app.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`);
            })
        })
        .catch((err) => console.log(err));