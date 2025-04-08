const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;

// Use Middleware
app.use(cors(
  {
    origin: ['https://myvercel-fugz.vercel.app'],
    methods: ["POST", "GET"],
    credentials: true
  }
));
app.use(express.json());




const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://todo:yBcFt77J5DJehPCX@cluster0.whohm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const uri = "mongodb+srv://todo:yBcFt77J5DJehPCX@cluster0.whohm.mongodb.net/<database>?retryWrites=true&w=majority"

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const todoCollection = client.db('ToDoWebApp').collection('todos');


     // Get all todos
     app.get('/todos', async (req, res) => {
        try {
            const cursor = todoCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        } catch (error) {
            console.error('Error fetching todos:', error);
            res.status(500).send({ success: false, message: 'Server error.' });
        }
    });





    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res)=>{
    res.send('Hello');
    console.log('World');
})



app.listen(port, ()=>{
   console.log('Server is Running in Port: 3000');
});

