const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
const path = require('path')
const app = express();

//user cors
// app.use(cors());
// app.use(cors({credentials: true, origin: '*'}))

// allows us us to get data into json format
app.use(express.json());

// app.use(cors({
//     origin: 'http://ec2-3-142-184-95.us-east-2.compute.amazonaws.com',
//     credentials: true
// }))

// app.use(cors({credentials: true, origin: 'http://3.142.184.95/5500'}));

app.use(cors({
    origin: 'ec2-3-142-184-95.us-east-2.compute.amazonaws.com/:1',
    methods: ['GET', 'POST']
  }))


  
// Traversy Media

// app.use(express.static(path.join(__dirname + '../client/todo-list/build')));
// app.get('/*', (req,res) => {
//     // res.sendFile(path.resolve(__dirname, '..','client', 'build', 'index.html'))
//     res.send("something son")
//     res.sendFile('/client/todo-list/build/index.html', {root: '/'});
// })
const _dirname = path.dirname("");
// console.log("_dirname is  " + _dirname)
const buildPath = path.join(_dirname, "../client/todo-list/build");

app.use(express.static(buildPath));
// // build on aws
// console.log("__dirname " + __dirname)

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
//     // res.sendFile('index.html', {root: _dirname})
// })

// app.get("/*", function(req,res){
//     res.sendFile(
//         path.resolve("../client/todo-list/build/index.html", {root: __dirname})
//         // function(err) {
//         //     if (err) {
//         //         res.status(500).send(err)
//         //     }
//         // }
//     )
//     // res.sendFile('index.html', {root: _dirname})
// })

// const _dirname = path.resolve()
// app.use(express.static(path.join(_dirname, '../client/todo-list/build')));
// app.get("*",(req,res) => {
//   res.sendFile(path.join(_dirname, '../client/todo-list/build/index.html'));
// })
// HEROKU
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static('client/build'));
  
//     // This prevents "CANNOT GET /" errors when directly accessing pages from the web.
//     app.get('*', (req, res) =>
//     {
//       console.log("get(*) Entered")
//       res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
//     });
//   }

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