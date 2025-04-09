const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

// Use Middleware
app.use(cors());
app.use(express.json());


app.get('/', (req, res)=>{
    res.send('Hello');
    console.log('World');
})


app.get('/johfa', (req, res)=>{
    res.send('I am johfa tahsin');
    console.log('World');
})



app.get('/fahim', (req, res)=>{
    res.send('I am fahim');
    console.log('World');
})



app.listen(port, ()=>{
   console.log('Server is Running in Port: ', port);
});