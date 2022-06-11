const express = require( "express" );
const app = express();
const authRouter = require('./RequestToBD/Auth/authRouter');
const requestTableRowActionsRouter =require('./RequestToBD/RequestTable/RowAction/Router')
let cors = require('cors')

const corsOptions ={
    origin:'http://localhost:3000',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(express.json());
app.use(cors(corsOptions));


app.use('/requestTable/rowActions', requestTableRowActionsRouter);
app.use('/auth' , authRouter);


app.listen(8000, () => {
    console.log('Application listening on port 8000!');
});

module.exports = app;

//--------------------------------------------------------------------------------------------------