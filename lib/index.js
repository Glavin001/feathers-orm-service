/*
 * feathers-orm-service
 *
 * Copyright (c) 2014 Glavin Wiechert
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(config) {
    return function() {
        var app = this;
        var services = {};

        // Enable the orm-service Plugin
        app.enable('feathers orm-service');

        // Check for configuration
        if (config) {
            // Apply configuration
        }

        // Optional: Register this plugin as a Feathers provider
        app.providers.push(function(path, service) {
            services[path] = service;
        });

    };
};
