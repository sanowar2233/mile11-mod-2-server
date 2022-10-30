const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors=require('cors')
const app =express();
const port =process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

// vaehIH6UMr2I1E0o
// dbuser2





const uri = "mongodb+srv://dbuser2:vaehIH6UMr2I1E0o@cluster0.jr3dxw2.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){

    try{
        const userCollection=client.db('nodeMongoCrud').collection('users')

        app.get('/users', async(req,res)=>{
            const query={};
            const cursor=userCollection.find(query)
            const users=await cursor.toArray();
            res.send(users)
        })

        app.get('/users/:id', async (req,res)=>{
            const id =req.params.id;
            const query={_id: ObjectId(id)}
            const user=await userCollection.findOne(query)
            res.send(user)


        })
        
        app.post('/users',async(req,res)=>{
            const user=req.body;
            console.log(user)
            const result=await userCollection.insertOne(user)
            res.send(result)

        })

        app.delete('/users/:id', async(req,res)=>{
            const id = req.params.id;
            const query={_id: ObjectId(id)}
            const result = await userCollection.deleteOne(query)
            console.log(result)
            res.send(result)
           
        })





   

    }
    finally{

    }

}

run().catch(err=>console.log(err))


app.get('/', (req,res)=>{
    res.send('hello from mongodb crud')
})

app.listen(port, ()=>{
    console.log(`listening to port ${port}`)
})