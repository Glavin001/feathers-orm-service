# feathers-orm-service [![Build Status](https://travis-ci.org/Glavin001/feathers-orm-service.png?branch=master)](https://travis-ci.org/Glavin001/feathers-orm-service)

> Easily create a Object Relational Mapping Service for Featherjs.

## Getting Started

To install feathers-orm-service from [npm](https://www.npmjs.org/), run:

```bash
$ npm install feathers-orm-service --save
```

Finally, to use the plugin in your Feathers app:

```javascript
// Require
var feathers = require('feathers');
var plugin = require('feathers-orm-service');
// Setup
var app = feathers();
// Use Plugin
app.configure(plugin({ /* configuration */ }));
```

## Documentation

See the [docs](docs/).

## Author

- [Glavin Wiechert](https://github.com/Glavin001)

## License

Copyright (c) 2014 Glavin Wiechert

Licensed under the [MIT license](LICENSE).