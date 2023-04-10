const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());


// mongodb connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.1d18zed.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


// CRUD Operations
async function run() {
    try {

        const aboutDetailCollection = client.db("adda").collection("aboutDetail");


        // aboutDetail
        app.get('/about', async (req, res) => {
            const query = {};

            const result = await aboutDetailCollection.find(query).toArray();

            res.send(result);

        });

        app.put('/about', async (req, res) => {
            const aboutDetail = req.body;
            const id = aboutDetail.id;
            // console.log(aboutDetail);

            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };

            const updatedDoc = {
                $set: {
                    name: aboutDetail.name,
                    email: aboutDetail.email,
                    university: aboutDetail.university,
                    address: aboutDetail.address
                }
            };

            const result = await aboutDetailCollection.updateOne(filter, updatedDoc, options);

            res.send(result);
        });

    }
    finally {

    }
};
run().catch(console.log);


app.get('/', (req, res) => {
    res.send('ADDA server is running.....');
});


app.listen(port, () => {
    console.log(`ADDA server is running on port: ${port}`);
});