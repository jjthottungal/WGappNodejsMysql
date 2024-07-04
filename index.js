require('dotenv').config();
//----------------------------------------
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');


//Seperate router file introduced 
const router = require('./apirouter');

//Declare usage
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());


//Middleware routines - Cross Origin Resource Sharing (CORS)
app.use((req, res, next) => {
    //Enable CORS
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', '*')
        return res.status(200).json({});
    }
    next()
})

//----Routers to call WebApi
app.get('/', (req, res) => {
    res.send('Web Api for Weekly Gathering in Mobile App');
});


//User routes reference file here
app.use('/api', router);


//In case the call not handing by these above routes
app.use((req, res, next) => {
    const error = new Error('Not found the exact END POINT');
    error.status = 404;
    next(error);

});

//Handle any other error
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})


//------------------------// Not to be copied to Server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Order API is runnning at ${port}`));
