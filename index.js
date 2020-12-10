// Bring in express server and create application
let express = require('express');
let app = express();

// Use express Router object
let router = express.Router();

// Create GET to return a list of all data
router.get('/', function (req, res, next) {
    res.send("myData");
})

// Configure router so all routes are prefixed with /api/v1
app.use('/api/', router);

// Create server to listen on port 5000
const server = app.listen(5000, function () {
    console.log('Server is running on http://localhost:5000..')
});

