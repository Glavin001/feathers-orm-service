var assert = require('assert');
var request = require('supertest');
var feathers = require('feathers');
var async = require('async'); // jshint unused: false
var path = require('path');
//
var Sequelize = require('sequelize');
var ormService = require('../lib');

// Config
var port = 8080;
// Setup for Travis CI: http://docs.travis-ci.com/user/database-setup/#MySQL
var database = 'feathers_orm_service';
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

var todoImportedService = ormService(path.resolve(__dirname, '../examples/todo_model'), sequelize);

describe('Basic CRUD tests', function () {

    it('should create a new Todo', function(done) {

        var app = feathers();
        // Add Service
        app.use('/todo', todoService);
        // Sync
        sequelize.sync()
        .complete(function() {
            // Start Server
            var server = app.listen(port, function() {

                request(server)
                    .post('/todo')
                    .send({
                        'description': 'This is an example TODO!'
                    })
                    .expect(200)
                    .end(function(err,res) { // jshint unused: false
                        //console.log(res.body);
                        if (err) {
                            return done(err);
                        }

                        server.close(done);
                    });
            
            });

        });

    });

    it('should read all Todos', function(done) {

        var app = feathers();
        // Add Service
        app.use('/todo', todoService);
        // Sync
        sequelize.sync()
        .complete(function() {
            // Start Server
            var server = app.listen(port, function() {

                request(server)
                    .get('/todo')
                    .expect(200)
                    .end(function(err,res) { // jshint unused: false
                        //console.log(res.body);
                        if (err) {
                            return done(err);
                        }

                        server.close(done);
                    });
            
            });

        });

    });


    it('should read all Todos with imported model', function(done) {

        var app = feathers();
        // Add Service
        app.use('/todo', todoImportedService);
        // Sync
        sequelize.sync()
        .complete(function() {
            // Start Server
            var server = app.listen(port, function() {

                request(server)
                    .get('/todo')
                    .expect(200)
                    .end(function(err,res) { // jshint unused: false
                        //console.log(res.body);
                        if (err) {
                            return done(err);
                        }

                        server.close(done);
                    });
            
            });

        });

    });

    it('should delete the first Todo', function(done) {

        var app = feathers();
        // Add Service
        app.use('/todo', todoService);
        // Sync
        sequelize.sync()
        .complete(function() {
            // Start Server
            var server = app.listen(port, function() {

                request(server)
                    .get('/todo')
                    .expect(200)
                    .end(function(err,res) { // jshint unused: false

                        if (err) {
                            return done(err);
                        }
                        var results = res.body;
                        
                        async.each(results,
                            function(result, callback) {
                                var id = result.id;
                                request(server)
                                    .del('/todo/'+id)
                                    .expect(200)
                                    .end(function(err, res) {
                                        callback(err);
                                    });
                            },
                            function() {
                                server.close(done);
                            }
                        );
                    });
            
            });

        });

    });


});