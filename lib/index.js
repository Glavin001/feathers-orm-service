/*
 * feathers-orm-service
 *
 * Copyright (c) 2014 Glavin Wiechert
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function() {

    // Constructor
    function Store() {
        var sequelize = null;
        // Passed a Model
        if (arguments.length === 1) {
            this.model = arguments[0];
        }
        // Import a Model
        else if (arguments.length === 2) {
            var modelPath = arguments[0];
            sequelize = arguments[1];
            // Import model
            this.model = sequelize.import(modelPath);
        }
        // Define Model Inline
        else if (arguments.length === 4) {
            var modelName = arguments[0];
            var attributes = arguments[1];
            var options = arguments[2];
            sequelize = arguments[3];
            // Create Model
            this.model = sequelize.define(modelName, attributes, options);
        }
        else {
            throw new Error('Invalid number of arguments passed to constructor.');
        }

        return this;
    }

    // Helpers
    var parseQuery = function(query) {
        if (typeof query !== 'object')
        {
            query = {};
        }
        // Parse query arguments
        for (var k in query)
        {
            if (typeof query[k] !== 'object')
            {
                try
                {
                    query[k] = JSON.parse(query[k]);
                } catch (e)
                {
                    console.log('Error:', e);
                    query[k] = null;
                }
            }
        }
        return query;
    };

    // Returns a Todo by it's id
    Store.prototype.find = function (params, callback) {
        if (typeof params === 'function') {
            callback = params;
            params = {};
        }
        var query = parseQuery(params.query);

        this.model.findAll(query)
        .complete(function(err, results) {
            callback(err, results);
        });
    };

    Store.prototype.get = function (id, params, callback) {
        if (typeof params === 'function') {
            callback = params;
            params = {};
        }
        this.model.find(id)
        .success(function (result) {
            callback(null, result);
        })
        .error(function(err) {
            callback(err, null);
        });
    };

    Store.prototype.create = function (data, params, callback) {
        // Create our actual Todo object so that we only get what we really want
        var obj = this.model.create(data);
        obj.success(function (data) {
            callback(null, data);
        })
        .error(function(err) {
            callback(err, null);
        });
    };

    Store.prototype.update = function (id, data, params, callback) {
        this.model.find(id)
        .success(function(result) {
            result.updateAttributes(data)
            .success(function(result) {
                callback(null, result);
            })
            .error(function(err) {
                callback(err, null);
            });
        })
        .error(function(err) {
            callback(err, null);
        });
    };

    Store.prototype.remove = function (id, params, callback) {
        this.model.find(id)
        .success(function(result) {
            if (!result) {
                return callback(null, {});
            }
            result.destroy()
            .success(function() {
                callback(null, {});
            })
            .error(function(err) {
                callback(err, null);
            });
        })
        .error(function(err) {
            callback(err, null);
        });
    };

    // See http://stackoverflow.com/a/1608546/2578205
    function construct(constructor, args) {
        function F() {
            return constructor.apply(this, args);
        }
        F.prototype = constructor.prototype;
        return new F();
    }

    return construct(Store, arguments);

};
