const express = require('express');

const app = express();
const port = 3000;

// In-memory storage for articles
const articles = [];

// Middleware to parse JSON request bodies
app.use(express.json());

// Endpoint to add a new article
app.post('/articles', (req, res) => {
    const { title, content, tags } = req.body;
    const article = {
        id: articles.length + 1,
        title,
        content,
        tags,
    };
    articles.push(article);
    res.json(article);
});

// Endpoint to search articles by keyword
app.get('/articles/search', (req, res) => {
    const { query } = req.query;
    const results = articles.filter(article => {
        return article.title.toLowerCase().includes(query.toLowerCase()) ||
            article.content.toLowerCase().includes(query.toLowerCase());
    });

    // Sort results by relevance (simple keyword frequency)
    results.sort((a, b) => {
        const aScore = a.title.toLowerCase().split(' ').filter(word => word === query.toLowerCase()).length +
            a.content.toLowerCase().split(' ').filter(word => word === query.toLowerCase()).length;
        const bScore = b.title.toLowerCase().split(' ').filter(word => word === query.toLowerCase()).length +
            b.content.toLowerCase().split(' ').filter(word => word === query.toLowerCase()).length;
        return bScore - aScore;
    });

    res.json(results);
});

// Endpoint to get a specific article by ID
app.get('/articles/:id', (req, res) => {
    const { id } = req.params;
    const article = articles.find(article => article.id === parseInt(id));
    if (article) {
        res.json(article);