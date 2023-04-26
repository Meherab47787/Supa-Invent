//Dependencies
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoute');
const productRoutes = require('./routes/productRoute');
const supplierRoutes = require('./routes/supplierRoute')
const AppError = require('./util/appError');
const globalErrorHandler = require('./controllers/globalErrorHandler');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const path = require('path')


//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
}) 
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

//Route Middlewares
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/supplier', supplierRoutes);


app.get('/', (req, res) => {
    res.send("Home page");
})





//Error handeling Middleware
app.all('*', (req, res, next) => {
    // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
    
    // err.status = 'fail';
    // err.statusCode = 404;
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404)); 
})

app.use(globalErrorHandler)



module.exports = app