const express=require('express');
require('dotenv').config();

const fs = require("fs");
require("dotenv").config();
const mongoose = require('mongoose');
const uri = process.env.MONGO_URL;


mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
 console.log('connected to database!')
});

const app=express();
app.listen(3000,() => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({limit:'1mb'}));


const ArticleSchema = mongoose.Schema({
  title: String,
  content:String
});

const Article = mongoose.model("Article", ArticleSchema);

const content = fs.readFileSync("article.json");
// const Article = JSON.stringify(content);

Article.insertMany(Article, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
  mongoose.disconnect();
});