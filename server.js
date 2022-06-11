const express = require( "express" );
const app = express();
const authRouter = require('./RequestToBD/Auth/authRouter');
const reqTableRouter = require('./RequestToBD/getReqTable/ReqTableRouter');
const reqTablePostRouter = require('./RequestToBD/postReqTable/ReqTableRouter');
const reqTableUpdateRouter = require('./RequestToBD/updateReqTable/updateReqTableRouter')
const reqTableDeleteRowRouter = require('./RequestToBD/DeleteRow/deleteRowReqTableRouter')
let cors = require('cors')

const corsOptions ={
    origin:'http://localhost:3000',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(express.json());
app.use(cors(corsOptions));


app.use('/auth' , authRouter);
app.use('/postReqTable', reqTablePostRouter);
app.use('/reqTable', reqTableRouter);
app.use('/updateReqTable', reqTableUpdateRouter);
app.use('/deleteRowReqTable', reqTableDeleteRowRouter);


app.listen(8000, () => {
    console.log('Application listening on port 8000!');
});

module.exports = app;

//--------------------------------------------------------------------------------------------------