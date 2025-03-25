const express = require('express');
const app = express();

app.use(express.json());
app.use(cors({
    origin: "*",
    methods: ["POST", "GET", "PUT", "DELETE", "PATCH"]
}));


const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
