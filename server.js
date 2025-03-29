const express = require('express');
const app = express();
const cors = require('cors')
const connectDB = require('./config/dbConnection');
const userRouter = require('./routers/userRouter')
const productRouter = require('./routers/productRouter');
const categoryRouter = require('./routers/categoryRouter');

// Dsatabase connections
connectDB(); 

app.use(express.json());
app.use(cors({
    origin: "*",
    methods: ["POST", "GET", "PUT", "DELETE", "PATCH"]
}));

app.use('/api/auth', userRouter);
app.use('/api', productRouter);
app.use('/api', categoryRouter);


const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
