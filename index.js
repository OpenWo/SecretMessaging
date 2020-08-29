const express = require("express")
const bodyParser = require("body-parser")
const app = express();
const ejs = require("ejs")

app.set('view engine','ejs');
app.use("/", express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true}))
// app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.render('midhome');
    // res.sendFile(__dirname+'/public/html/homepage.html')
});
app.post('/',(req,res)=>{
    res.render("home");
})



app.listen(3000||process.env.PORT,()=>console.log("server running at port 3000"))