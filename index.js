const express = require("express")
const bodyParser = require("body-parser")
const app = express();
const ejs = require("ejs")

app.set('view engine','ejs');
app.use("/", express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true}))
// app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/html/homepage.html')
});



app.listen(3000||process.env.PORT,()=>console.log("server running at port 3000"))