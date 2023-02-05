const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
const path = require('path')
const app = express();

//user cors
app.use(cors());
// app.use(cors({credentials: true, origin: '*'}))

// allows us us to get data into json format
app.use(express.json());

app.use(express.static(path.join(__dirname, "../client/todo-list/build")));

app.get("*", (req, res) =>
    res.sendFile(
    path.resolve(__dirname, "../", "client", "todo-list", "build", "index.html")
    )
);



// const _dirname = path.dirname("");
// const buildPath = path.join(_dirname, "../client/todo-list/build");
// app.use(express.static(buildPath));

// app.get("/*", function(req,res){
//     res.sendFile(
//         path.join(__dirname, "../client/todo-list/build/index.html"),
//         function(err) {
//             if (err) {
//                 res.status(500).send(err)
//                 console.log("Error Danger! " + err)
//             }
//         }
//     )
// })



// const _dirname = path.resolve()
// app.use(express.static(path.join(_dirname, '../client/todo-list/build')));
// app.get("*",(req,res) => {
//   res.sendFile(path.join(_dirname, '../client/todo-list/build/index.html'));
// })



const PORT = process.env.PORT || 5500;

// Lets import routes
const TodoItemRoute = require('./routes/todoItems')

// Lets connect to mongodb
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_CONNECT)
.then(() => console.log("Database connected"))
.catch(err => console.log(err))


app.use('/', TodoItemRoute)

app.listen(PORT, ()=> console.log("Server connected"));