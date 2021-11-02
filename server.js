const express = require('express');
const port = process.env.PORT || 8080;
const host = process.env.HOST || '127.0.0.1';
const expressSanitizer = require('express-sanitizer');
const path = require('path');
const puppeteer = require('puppeteer');
const { getSystemErrorMap } = require('util');
var globalPayload;
var myArgs = process.argv.slice(2);
var flag;

if(myArgs.length == 0)
    flag = "CxTF{H3ll0_fr0m_Isr43l}"
else flag = myArgs[0]

/* Initializing some things here and there */
var app = express();
app.use(express.urlencoded());
app.use(express.json());
app.use(expressSanitizer());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/* Choo Chooooo */
app.listen(port, function(err){
    if(!err){
        console.log('Your app is listening on ' + host + ' and port ' + port);
    } else {
        console.log(err);
    }
});

/* Route for posting the payload, sends a rendered page with the payload to the user
for self-XSS and then proceeds to create a headless browser to simulate the victim */
app.post('/new-chirp', (req, res) => {
    console.log(req.body);
    res.status(200).render('newChirp', {
        user: 'DefinitelyNotShady',
        payload: req.body.content
    });

    globalPayload = req.body.content;  //The route for the page served to the bot was giving me shit when passing the payload as a
                                      //parameter, so i just stored it in a global variable (TODO: implement it as FIFO stack) 

    /* Implementation of the puppeteer headless browser */
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setCookie({
            name: "flag",
            value: "CxTF{H3ll0_fr0m_Isr43l}",
            url: "http://localhost"
        });
        await page.goto('http://localhost:8080/z0mb13');
        
        await browser.close();
    })();
});

/* Route that serves the bot the XSS infected page */
app.get('/z0mb13', (req, res) => {
    var payload = globalPayload;
    if(res.status(200)){
        res.render('newChirp', {
            user: 'DefinitelyNotShady',
            payload: payload
        })
    } else {
        console.log(res.status)
        console.log(Browser.errors)
    }
});

module.exports = app;
