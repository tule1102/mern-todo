const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
const path = require('path')
const app = express();

// allows us us to get data into json format
app.use(express.json());

const _dirname = path.dirname("");
const buildPath = path.join(_dirname, "../client/todo-list/build");
app.use(express.static(buildPath));
// build on aws
app.get("/*", function(req,res){
    res.sendFile(
        // path.join(_dirname, "../client/todo-list/build/index.html"),
        path.resolve('index.html', { root: __dirname }),
        function(err) {
            if (err) {
                res.status(500).send(err)
            }
        }
    )
})

//Port
const PORT = process.env.PORT || 5500;

//user cors
app.use(cors());

// Lets import routes
const TodoItemRoute = require('./routes/todoItems')

// Lets connect to mongodb
mongoose.connect(process.env.DB_CONNECT)
.then(() => console.log("Database connected"))
.catch(err => console.log(err))


app.use('/', TodoItemRoute)

app.listen(PORT, ()=> console.log("Server connected"));