// Bring in express server and create application
let express = require('express');
let app = express();
let myData = require('./data/myData')

// Use express Router object
let router = express.Router();

//Configure middleware to support JSON data parsing in request object
app.use(express.json());

// Create GET to return a list of all data
router.get('/', function (req, res, next) {
    myData.get(function (data) {
        res.status(200).json({
            "status": 200,
            "statusText": "OK",
            "message": "All data retrieved",
            "data": data
        });
    }, function (err) {
        next(err);
    });
});

// Create GET/search?id=n&name=str to search for data by 'id' and/or 'name'
router.get('/search', function (req, res, next) {
    let searchObject = {
        "id": req.query.id,
        "name": req.query.name
    };

    myData.search(searchObject, function (data) {
        res.status(200).json({
            "status": 200,
            "statusText": "OK",
            "message": "All data retrieved",
            "data": data
        });
    }, function (err) {
        next(err);
    });
});

// Create GET/id to return a single piece of data
router.get('/:id', function (req, res, next) {
    myData.getById(req.params.id, function (data) {
            if (data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": "Single piece of data retrieved",
                    "data": data
                });
            } else {
                res.status(404).json({
                    "status": 404,
                    "statusText": "Not Found",
                    "message": "The data '" + req.params.id + "'could not be found",
                    "error": {
                        "code": "NOT_FOUND",
                        "message": "The data '" + req.params.id + "'could not be found"
                    }
                });
            }
        },
        function (err) {
            next(err);
        });
});

// Create POST in raw JSON to add data
router.post('/', function (req, res, next) {
    myData.insert(req.body, function (data) {
        res.status(201).json({
            "status": 201,
            "statusText": "Created",
            "message": "New data added",
            "data": data
        });
    }, function (err) {
        next(err);
    });
});

// Create PUT to update a single piece of data
router.put('/:id', function (req, res, next) {
    myData.getById(req.params.id, function (data) {
        if (data) {
            // Attempt to update the data
            myData.update(req.body, req.params.id, function (data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": "Data '" + req.params.id + "' updated",
                    "data": data
                });
            });
        } else {
            res.status(404).json({
                "status": 404,
                "statusText": "Not Found",
                "message": "Data '" + req.params.id + "' could not be found",
                "error": {
                    "code": "NOT_FOUND",
                    "message": "The data '" + req.params.id + "'could not be found"
                }
            });
        }
    }, function (err) {
        next(err);
    });
});

// Create DELETE to delete a single piece of data
router.delete('/:id', function (req, res, next) {
    myData.getById(req.params.id, function (data) {
        if (data) {
            // Attempt to delete the data
            myData.delete(req.params.id, function (data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": "The data ' " + req.params.id + "' has been deleted",
                    "data": "Data " + req.params.id + " deleted"
                });
            });
        } else {
            res.status(404).json({
                "status": 404,
                "statusText": "Not Found",
                "message": "Data '" + req.params.id + "' could not be found",
                "error": {
                    "code": "NOT_FOUND",
                    "message": "The data '" + req.params.id + "'could not be found"
                }
            });
        }
    }, function (err) {
        next(err);
    });
});

router.patch('/:id', function (req, res, next) {
        myData.getById(req.params.id, function (data) {
            if (data) {
                // Attempt to update the data
                myData.update(req.body, req.params.id, function (data) {
                    res.status(200).json({
                        "status": 200,
                        "statusText": "OK",
                        "message": "Data '" + req.params.id + "' patched",
                        "data": data
                    });
                });
            } else {
                res.status(404).json({
                    "status": 404,
                    "statusText": "Not Found",
                    "message": "Data '" + req.params.id + "' could not be found",
                    "error": {
                        "code": "NOT_FOUND",
                        "message": "The data '" + req.params.id + "'could not be found"
                    }
                });
            }
        }, function (err) {
            next(err);
        });
});

// Configure router so all routes are prefixed with /api/v1
app.use('/api/', router);

// Create server to listen on port 5000
const server = app.listen(5000, function () {
    console.log('Server is running on http://localhost:5000..')
});

