// ES6
const express = require("express")
const bodyParser = require("body-parser")
// const session = require('express-session');
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cookieSession = require('cookie-session')
const app = express();
const server=require('http').Server(app);
const io=require('socket.io')(server);
const stream = require('./src/connect/stream')
const ejs = require("ejs")
let path = require( 'path' );
const cors = require('cors')
app.set('view engine','ejs');
app.use("/", express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true}))

app.use( '/public/connect', express.static( path.join( __dirname, 'connect' ) ) );

// console.log(call())

app.use(cors())

app.use(cookieSession({
    name: 'tuto-session',
    keys: ['key1', 'key2']
    // secret: "Our little secret.",
    // resave: false,
    // saveUninitialized: false
  }));
  
  const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

  app.use(passport.initialize());
  app.use(passport.session());

 
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});


passport.use(new GoogleStrategy({
    clientID: '184348631037-7p456gele3i8o54pnm71ihnq6lkj8o31.apps.googleusercontent.com',
    clientSecret: 'E1jQq9aOO9yBWQ9yq63zSNyP',
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    return done(null,profile);
  }
));


app.get("/auth/google",
  passport.authenticate('google', { scope: ["profile", "email"] })
);

app.get("/auth/google/secrets",
  passport.authenticate('google', { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect to secrets.
    res.redirect("/secrets");
  });


app.get('/',(req,res)=>{
    res.render('midhome');
    // res.sendFile(__dirname+'/public/html/homepage.html')
});
app.post('/',(req,res)=>{
    res.redirect("/login");
})

app.get("/login",(req,res)=>{
  res.render('login');
})

app.get("/logout",(req,res)=>{
  req.session = null;
  req.logout();
  res.redirect("/");
})
// app.post("/logout",(req,res)=>{
//   req.session = null;
//   req.logout();
//   res.redirect("/");
// })

app.get("/secrets",isLoggedIn,(req,res)=>{
  // if(req.isAuthenticated()){
    // res.sendFile(__dirname+"/index.html")
    // res.render("index")
        res.sendFile(__dirname+"/src/connect/index.html")
  // }
  // else{
  //   res.redirect('/login');
  // }
});

io.of('/stream').on('connection', stream )

app.listen(3000||process.env.PORT,()=>console.log("server running at port 3000"))