const mongoose = require('mongoose');
var cheerio = require("cheerio");
var axios = require("axios");
const db = require("../../models");


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/joblistings", { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});



// First, tell the console what server3.js is doing
console.log("\n******************************************\n" +
  "Webscraping through Indeed.com\n" +
  "\n******************************************\n");

// Make request via axios to grab the HTML from Indeeds website

axios.get("https://www.indeed.com/jobs?q=junior+web+developer&l=Independence%2C+MO").then(function (response) {

  // Load the HTML into cheerio
  var $ = cheerio.load(response.data);

  // Make an empty array for saving our scraped info
  var results = [];

  //Use Cheerio and search through each div with class of "result"
  $("div.result").each(function (i, element) {
    //Use Cheerio find method to gather job data info

    jobTitle = $(element).find("div.title").find("a").attr("title");
    company = $(element).find("div.sjcl").find("span.company").text().trim();
    city = $(element).find("div.sjcl").find("span.location").text().split(",")[0];
    state = $(element).find("div.sjcl").find("span.location").text().split(",")[1];
    summary = $(element).find("div.summary").find("ul").text();
    link = $(element).find("div.title").find("a").attr("href");


    //Push the Job main info into results array

    results.push({
      jobTitle: jobTitle,
      companyArray: company,
      city: city,
      state: state,
      summary: summary,
      link: link
    });


  });

  // After looping through each element found, log the results to the console

  console.log(results);

  axios.post("/api/jobs", results)
    .then();


  // db.Jobs
  //   .remove({})
  //   .then(() => db.Jobs.collection.insertMany(results))
  //   .then(data => {
  //     console.log(data.result.n + " records inserted!");
  //     process.exit(0);
  //   })
  //   .catch(err => {
  //     console.error(err);
  //     process.exit(1);
  //   });



});