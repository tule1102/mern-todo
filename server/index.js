const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
const path = require('path')
const app = express();

//user cors
app.use(cors());

// allows us us to get data into json format
app.use(express.json());

const _dirname = path.dirname("");
console.log("rabbit  " + _dirname)
const buildPath = path.join(_dirname, "../client/todo-list/build");

app.use(express.static(buildPath));
// build on aws
console.log("frog " + __dirname)

// app.get("/*", function(req,res){
//     res.sendFile(
//         path.join(__dirname, "../client/todo-list/build/index.html")
//         // function(err) {
//         //     if (err) {
//         //         res.status(500).send(err)
//         //     }
//         // }
//     )
//     // res.sendFile('index.html', {root: _dirname})
// })

app.get("/*", (req,res) => {
    res.sendFile(
        path.resolve(__dirname, "../client/todo-list/build/index.html")
        // function(err) {
        //     if (err) {
        //         res.status(500).send(err)
        //     }
        // }
    )
    // res.sendFile('index.html', {root: _dirname})
})

//Port
const PORT = process.env.PORT || 5500;



// Lets import routes
const TodoItemRoute = require('./routes/todoItems')

// Lets connect to mongodb
mongoose.connect(process.env.DB_CONNECT)
.then(() => console.log("Database connected"))
.catch(err => console.log(err))


app.use('/', TodoItemRoute)

app.listen(PORT, ()=> console.log("Server connected"));