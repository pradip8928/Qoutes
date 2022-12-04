const express = require('express')
const app = express()
const dotenv = require("dotenv")
const colors = require("colors")
const path = require("path")
const userRoutes = require("./routes/userRoutes")
const { errorHandler, notFound } = require("./middlewares/errorMiddleware")
const cors = require('cors');

app.use(express.json()); // to accept json data
dotenv.config();
require("./config/DB")
app.use(cors())
app.options('*', cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const Port = process.env.PORT || 3000

// routes

app.use("/api/users", userRoutes);



// -------------deployment-------------------
__dirname = path.resolve()
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, './Client/dist')))
    let data = path.resolve(__dirname, 'Client', 'dist', 'index.html')
    console.log(data);
    app.get("*", (req, res) => {

        res.sendFile(path.resolve(__dirname, 'Client', 'dist', 'index.html'));
    })
} else {
    app.get("/", (req, res) => {

        res.send("API is running......" + req.ip)
    })
}



// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

app.listen(Port, () => {
    console.log(`port is running on ${Port}`);
})