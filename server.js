const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();


const getYear = () => {
    return new Date().getFullYear();
}

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to write log');
        }
    });
    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    // res.send('Hello express');
    res.render('home.hbs', {
        pageTitle: 'Home',
        welcomeMessage: 'welcome to my place',
    });
});

app.get('/about', (req, res) => {
    // res.send('About Page');
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Encountered an error with your request'
    });
});

app.listen(3431, () => {
    console.log(`Listening on port: 3431`);
});
