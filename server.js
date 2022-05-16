const express = require( "express" );
const app = express();
const loginRouter = require('./RequestToBD/LogIn/LogIn');
const authRouter = require('./RequestToBD/Auth/authRouter');
let cors = require('cors')

const corsOptions ={
    origin:'http://localhost:3000',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(express.json());
app.use(cors(corsOptions));

app.use('/auth' , authRouter);
app.use('/LogIn', loginRouter);

app.listen(8000, () => {
    console.log('Application listening on port 8000!');
});

module.exports = app;

//--------------------------------------------------------------------------------------------------