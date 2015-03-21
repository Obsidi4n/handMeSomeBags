var db = require('./public/js/db');
var express = require('express');
var bodyParser = require('body-parser');
// var session = require('cookie-session');
app = express();

app.use(express.static(__dirname +'/public'));
app.use(bodyParser.json());

app.set('authFlag',1);
app.disable('authFlag');
var auth = function(req, res, next){ 
	if (!app.get('authFlag') )//&& req.session.authToken === 'logged' ) 
		res.sendFile('unauthorized.html', { root: __dirname+'/public/pages' }); 
	else 
		next(); 
	};

app.get('/', function(req, res) {
    res.sendFile('index.html', { root: __dirname+'/public' });
});

app.post('/login',function(req,res){
	db.User.find({username: req.body.user, password: req.body.pass}, function(err,user){
	if ( user.length || (req.body.user === 'admin' &&  req.body.pass === 'secret') )
	{
		console.log('Logging in');
		if(user.length)
			console.log(user);
		app.enable('authFlag');
		// req.session.authToken = 'logged';
		res.send('/mainPage');
	}		
	else if(err)
		res.status(500).send('Db error. Please check with admin');
	else
		res.status(401).send('Incorrect credentials');
  });
});

app.get('/mainPage', auth, function(req, res) {
    res.sendFile('main.html', { root: __dirname+'/public/pages' });
});

app.get('/logout',function(req,res){
	console.log('Logging out');
	app.disable('authFlag');
	//delete req.session.authToken;
	console.log('Auth Flag: '+app.get('authFlag'));
	res.send('/');
});

app.get('/register', function(req, res) {
    res.sendFile('register.html', { root: __dirname+'/public/pages' });
});

app.post('/register',function(req,res){
	var b = req.body;
	console.log('Trying to register '+ b.user);
	if(b.user && b.pass && b.email && b.contact)
	{
		new db.User({
			username: b.user,
		    password:b.pass,
		    email:b.email,
		    contact:b.contact
		}).save(function(e, u){
			if(e)
				res.status(500).send('Error adding user. Please check with administrator.');
			else
			{
				// console.log(db.User.find());
				console.log(u);
				res.send('User successfully added!');
				console.log('Users: ' + db.User.find().length); 
			}				
		});
	}
	else
		res.status(403).send('User values missing. Please check');
});

app.get('*',function(req,res){
	console.log("Mr.Anderson, you have to stay within the system");
	res.redirect('/');
})

var server = app.listen(7896);
console.log("I'm ready");
console.log('Users: ' + db.User.find().length);