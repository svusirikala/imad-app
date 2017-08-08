var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles = {
	'article-one' : {
		title: 'Page 1 | Sri' ,
		heading: 'Page 1 of Sri s blog',
		date: 'Aug 7 2017',
		content: 
		`<p1>
              This is the introductory page of my blog...
          </p1>
          <p2>
              These are my hobbies
          </p2>
          <ol>
              <li>
                  reading
              </li>
              <li>
                  reading
              </li>
              <li>
                  reading
              </li>
          </ol>`

	},
	'article-two' : {
		title: 'Page 2 | Sri' ,
		heading: 'Page 2 of Sri s blog',
		date: 'Aug 8 2017',
		content: 
		`<p1>
              This is the second page of my blog...
          </p1>
          <p2>
              This is my loaction
          </p2>
          <ol>
              <li>
                  India
              </li>
              <li>
                  India
              </li>
              <li>
                  India
              </li>
          </ol>`

	},
	'article-three' : {
		title: 'Page 3 | Sri' ,
		heading: 'Page 3 of Sri s blog',
		date: 'Aug 9 2017',
		content: 
		`<p1>
              This is the third page of my blog...
          </p1>
          <p2>
              These are the places i like
          </p2>
          <ol>
              <li>
                  kashmir
              </li>
              <li>
                  kerala
              </li>
              <li>
                  goa
              </li>
          </ol>`

	}
}

function createTemplate (data) {
	var title = data.title;
	var heading = data.heading;
	var date = data.date;
	var content = data.content;
	var htmlTemplate = `
	<html>
	  <head>
	      <title>
	         ${title}
	      </title>
	      <link href="/ui/style.css" rel="stylesheet" />
	      <meta name="viewpoint" content="width=device-width, initial-scale=1" /> 
	  </head>
	  <body>
	      <div class="container">
	          <div>
	              <a href ="/">home</a>
	          </div>
	          <hr/>
	          <h3>
	              ${heading}
	          </h3>
	          <div>
	              ${date}
	          </div>
	          <div>
	              ${content}
	          </div>
	      </div>
	  </body>
	</html>
	`;
	return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:articleName', function (req, res) {
	// articleName is the variable that will loop thru 
	// all the objects in the article object
  var articleName = req.params.articleName;
  res.send(createTemplate(articles[articleName]));
});


app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 8080;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
