const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const usersRouter = require("./routes/userRoutes")
const coursesRouter = require("./routes/courseRoutes")
const app = express()
const PORT = 8080 || process.env.PORT;

//Middleware
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))
app.use(express.json({ limit: '50mb' }))
app.use(cookieParser())

//MongoDB
mongoose.connect(`mongodb+srv://dbUser:${process.env.mongoPass}@cluster0.ujbe8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB Atlas: ', error);
    });

//Routes
app.use("/user", usersRouter)
app.use("/course", coursesRouter)