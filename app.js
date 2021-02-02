const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/", function(req, response){
    response.sendFile(__dirname + "/index.html");
});

app.post("/", function(request, res){
    const cityName = request.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName +"&appid=c85ce601f31f707c153537eac865348f&units=metric";
    https.get(url, function(response){
        if(response.statusCode === 200){
            response.on("data", function(data){
                const weatherData = JSON.parse(data);
                res.write(`<h1> City Name is: ` + weatherData.name + `</h1>`)
                res.write(`<p> Today weather temperature: ` + weatherData.main.temp + `</p>`)
                res.write(`<p> You feels like: ` + weatherData.main.feels_like + `</p>`)
                res.write("<a href='/'>Search for anohter city</a>")
                res.send()
            });
        } else if (response.statusCode === 404) {
            res.send("Your city is not found Please write a correct city name <a href='/'>try again!</a>")
        } else {
            res.send("there was an error");
        }
    });

    
    const jasonUrl = JSON.parse
})


app.listen(process.env.PORT || 3000, function(){
    console.log("server is started now");
});