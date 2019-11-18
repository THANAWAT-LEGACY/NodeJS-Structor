import express from 'express';

// modules
import employee from './employee';

//create app
const app = express();

app.use('/employee',employee);
// app.use('/xxxx',xxxx);
// app.use('/xxxx',xxxx);
// app.use('/xxxx',xxxx);


app.all('/*',(req,res)=>res.sendStatus(404));

export default app;