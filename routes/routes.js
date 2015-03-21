var router = express.Router();

router.get('/', function(req, res) {
    res.sendFile('index.html');
});