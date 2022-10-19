const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
var http = require("http");
const Joi = require("joi");
const app = express();
// const dbConfig = 'mongodb+srv://<maikhanh4444>:<maikhanh4444>@cluster0.zoco1ts.mongodb.net/?retryWrites=true&w=majority';
// const COURSES = [
//     { id: 1 , name: 'Nodejs' },
//     { id: 2 , name: 'Nodejs' },
//  ]
// var server = http.createServer((request, response) =>{
//     // Thiết lập Header
//     response.setHeader('Context-type', 'application/json');
//     // response.setHeader('author', 'thehalfheart@gmail.com');
//     // response.setHeader('blog', 'freetuts.net');
//     response.writeHead(200, {});
//     response.end(JSON.stringify({ success: true, data : COURSES }));
// });

// app.use(bodyParser.json({limit:"50mb"}));
//Middlewares
app.use(morgan("dev")); //  run với tốc độ nhanh hơn
app.use(bodyParser.json());
app.use(helmet());
// app.use(express.json())

dotenv.config();
// mongoose.connect((process.env.MOONGO_DB), ()=>{
//     console.log("mongoose is connected");
// });
//mongoose.connect('mongodb://localhost:27017/myapp');
// mongoose.connect((process.env.MOONGO_DB))
mongoose
    .connect("mongodb://0.0.0.0:27017/nodejsp1")
    .then(() => console.log("✅ Connected database from mongodb."))
    .catch((error) =>
        console.error(
            `❌ Connect database is failed with error which is ${error}`
        )
    );

const userRoute = require("./routes/usersRouter"); //  đi đến thư mục users trong routes
// Routes
app.use("/users", userRoute); // localhost:3000/users

const deckRoute = require("./routes/decksRouter"); //  đi đến thư mục users trong routes
// Routes
app.use("/decks", deckRoute); // localhost:3000/users

// app.use(cors());
// app.use(morgan("common"));

// app.get("/api",(req,res) =>{
//     res.status(200).json("hello");

// });

// app.get('/', (req, res, next) => {
//     return res.status(200).json({
//         message: 'Server is OK!'
//     })
// });



// app.get("/api/courses/:id",(req,res) =>{
//     const course = COURSES.find(COURSES => COURSES.id === parseInt(req.params.id) )
//     if(!course)  res.status(404).send(" id không tồn tại ");
//     res.send(course);
//     req.query
// });

// app.post("/api/courses/add",(req,res) =>{
//     const course = {
//         id : req.body.id,
//         name : req.body.name,
//     }
//     COURSES.push(course)
//     res.send(JSON.stringify({ success: true, data : COURSES }));
//     console.log(req.body);
// });

// app.put("/api/courses/edit/:id",(req,res) =>{
//     const course = COURSES.find(COURSES => COURSES.id === parseInt(req.params.id) )
//     course.name = req.body.name;
//     res.send(JSON.stringify({ success: true, data : COURSES }));
//     console.log(course);
// });

// app.delete("/api/courses/delete/:id",(req,res) =>{
//     const course = COURSES.find(COURSES => COURSES.id === parseInt(req.params.id) )
//     let index = COURSES.indexOf(course);
//     COURSES.splice(index,0);
//     res.send(JSON.stringify({ success: true, data : COURSES }));
//     // course.name = req.body.name;
//     // res.send(JSON.stringify({ success: true, data : COURSES }));
//     // console.log(course);
// });
// Catch 404 Errors and forward them to error handler
app.use((req, res, next) => {
    const err = new Error("Not Found"); // tạo ra lỗi
    err.status = 404;
    next(err); // chuyển lỗi
});

// Error handler function
// trả lỗi cho client sẽ return
app.use((err, req, res, next) => {
    const error = app.get("env") === "development" ? err : {};
    const status = err.status || 500; // lỗi không xác định

    // response to client
    return res.status(status).json({
        error: {
            message: error.message,
        },
    });
});

const port = app.get("port") || 3000;
app.listen(port, () => {
    console.log(`Server is running ....${port}`);
});
