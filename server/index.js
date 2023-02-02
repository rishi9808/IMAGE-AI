import express from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB  from "./mongodb/connect.js";
import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'

dotenv.config();




const app = express();
app.use(cors());
app.use(express.json({ limit:'50mb' }));

app.use('/api/v1/post',postRoutes);                //created api endpoints connecting to front-end
app.use('/api/v1/dalle',dalleRoutes);

app.get('/', async (req,res) => {
    res.send("HEllo from Dall-e");
})

const StartServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL)
        app.listen(8000,() => {
            console.log('Server started')
        })
    } catch (error) {
        console.log(error);
    }
}

StartServer();