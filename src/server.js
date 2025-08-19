require("dotenv").config();
const express = require("express");
const expresslayout = require("express-ejs-layouts");
const methodOverride = require('method-override');
const main = require("./routes/main");
const admin = require("./routes/admin");
const dbConnect = require("./config/dbConnect");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const User = require("./models/user");




const app = express();
dbConnect();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(session({
    secret: 'admin',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.CONNECTION_STRING })
}));



app.use(express.static("public"));

//templates
app.use(expresslayout); 
app.set("layout", "./layouts/main");
app.set("view engine", 'ejs');

//ROUTES 
app.use('/', main);
app.use("/", admin);

//start server 
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
});