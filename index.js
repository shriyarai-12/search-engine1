const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

// Data structures
let articles = []; // Store articles
let index = {}; // Keyword index for fast searches
let idCounter = 1; // Unique article ID counter

// Load existing articles (if data.json exists)
if (fs.existsSync('data.json')) {
    const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
    articles = data.articles;
    index = data.index;
    idCounter = data.idCounter;
}