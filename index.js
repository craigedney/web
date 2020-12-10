// Bring in express server and create application
let express = require('express');
let app = express();
let myData = require('./data/myData')

// Use express Router object
let router = express.Router();

// Create GET to return a list of all data
router.get('/', function (req, res, next) {
    myData.get(function (data) {
        res.status(200).json({
            "status": 200,
            "statusText": "OK",
            "message": "All data retrieved",
            "data": data
        });
    }, function(err) {
        next(err);
    });
});

// Configure router so all routes are prefixed with /api/v1
app.use('/api/', router);

// Create server to listen on port 5000
const server = app.listen(5000, function () {
    console.log('Server is running on http://localhost:5000..')
});

