var request = require('supertest');
var feathers = require('feathers');
//
var Sequelize = require('sequelize');
var ormService = require('../lib');

// Config
var port = 8080;
// Setup for Travis CI: http://docs.travis-ci.com/user/database-setup/#MySQL
var database = 'feathers-orm-service';
var username = 'root';
var password = null; // Blank
var dialect = 'mysql';


var sequelize = new Sequelize(database, username, password, {
    dialect: dialect
});

// Create a new service
var name = 'Todo';
var attributes = {
    // "id": sequilize.STRING,
    description: Sequelize.STRING,
    done: Sequelize.BOOLEAN
};
var options = {
    tableName: 'todos'
};
var todoService = ormService(name, attributes, options, sequelize);

console.log('service', todoService);

var app = feathers();
// Add Service
app.use('/todo', todoService);
// Sync
sequelize.sync()
.complete(function() {
    // Start Server
    app.listen(port, function() {
        console.log('Listening on port '+port);
    });
});
