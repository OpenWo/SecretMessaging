const express = require("express")
const bodyParser = require("body-parser")
const app = express();
const ejs = require("ejs")

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({ extended: true}))
app.use(express.static('public'))



app.listen(3000||process.env.PORT,()=>console.log("server running at port 3000"))