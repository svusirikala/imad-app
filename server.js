var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool ;


var config = { 
    user : 'svusirikala7',
    database: 'svusirikala7',
    host : 'db.imad.hasura-app.io',
    port : '5432',
 //   password : process.env.DB_PASSWORD
    password: 'db-svusirikala7-59637'
}

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

var pool = new Pool(config);
app.get('/test-db', function(req,res) { 
	pool.query('SELECT *  FROM test', function(err,result) {
   		if (err)  {
   			res.status(500).send(err.toString());
   		} else {
   			res.send(JSON.stringify(result.rows));
   		}
   	});
});

var counter = 0;
app.get('/counter', function (req, res) {
  counter = counter + 1;
  res.send(counter.toString());
});

var names = [];
app.get('/submit-name', function(req,res) {
  var name = req.query.name;
  names.push(name);
  res.send(JSON.stringify(names));
});

app.get('/articles/:articleName', function (req, res) {
	// articleName is the variable that will loop thru 
	// all the objects in the article object
  var articleName = req.params.articleName;
  pool.query("SELECT *  FROM articles WHERE title = $1",[req.params.articleName], function(err,result) {
   		if (err)  {
   			res.status(500).send(err.toString());
   		} else {
   			if (result.rows.length === 0) {
   				res.status(404).send('Article not found');
   			} else {
   				var articleData = result.rows[0];
   				res.send(createTemplate(articleData));
   			}
   		}
   	});
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
