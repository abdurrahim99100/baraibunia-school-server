const express = require('express');
const cors = require('cors');
const app = express();
const requireEnv = require('dotenv')
requireEnv.config();
const port = process.env.PORT || 5000;

// use middle ware;
app.use(express.json());
app.use(cors());




const user = process.env.DB_USER;
console.log(user);


// --------------------------------------------------------------------
// main code start
// --------------------------------------------------------------------


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.g3vskme.mongodb.net/?retryWrites=true&w=majority`;

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
        //===========================================================================//
        //START//
        //===========================================================================//

        // GET COLLECTION IN MONGODB DATA BASE;

        const classCollection = client.db("baraibunia-high-school-database").collection("class");





        // class related code;
        app.post('/class', async (req, res) => {
            const newClass = req.body;
            const result = await classCollection.insertOne(newClass);
            res.send(result);
        });

        app.get('/class', async (req, res) => {
            const result = await classCollection.find().toArray();
            res.send(result);
        })




        //===========================================================================//
        //END//
        //===========================================================================//

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


// --------------------------------------------------------------------
// main code end
// --------------------------------------------------------------------








// by default server get operation;
app.get('/', (req, res) => {
    res.send('BARAIBUNIA HIGH SCHOOL SERVER IS RUNNING');
});

app.listen(port, () => {
    console.log(`SYSTEM IS RUNNING ON PORT ${port}`);
});