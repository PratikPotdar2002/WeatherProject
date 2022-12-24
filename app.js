//jshint esversion:6
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();


app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){

  const query = req.body.cityName;
  const apiKey = "ab9d21abed320ea5ddcdd43fb3984d9c";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&APPID="+apiKey+"&units="+unit+"&10d@2x.png";


  https.get(url,function(response){
    // console.log(response.statusCode);
    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      const temp =  weatherData.main.feels_like;
      const weatherDescription = weatherData.weather[0].description;
      const weatherImg = weatherData.weather[0].icon;
      const imgUrl = "http://openweathermap.org/img/wn/"+weatherImg+"@2x.png";
      //in one response we can just send one send request at one time;
      res.write("<p>The weather is currently:"+weatherDescription+"</p>");
      res.write("<h1>Temerature in "+query+" is:"+temp+"</h1>");
      res.write("<img src="+imgUrl+">");
      res.send();
      console.log(weatherDescription);
    });
  });
});






app.listen(3000,function(){
  console.log("Server is running on port 3000");
});
