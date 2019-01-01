# include-me

[![Build Status](https://travis-ci.com/Emre-Kul/include-me.svg?branch=master)](https://travis-ci.com/Emre-Kul/include-me)
![](https://img.shields.io/github/license/Emre-Kul/include-me.svg)

include-me is basic templating project which import file content to selected file inside folder and its sub folders.
## INSTALLATION

```bash
$ yarn add include-me
$ npm install include-me
```

## USAGE
### Example Folder Structure
```
.
+-- pages
|   +-- common
|       +-- footer.html
|   +-- index.html

```
### Content of 'footer.html'
```
<footer>
    Hello From Footer
</footer>
```
### Content of 'index.html'
```
<template>
    <html>
        <head></head>
        <body>
            Hello From Content
            ${include('footer')}
        </body>
    </html>
</template>
```
### Run
```javascript
const includeMe = new IncludeMe(__dirname + '/pages', 'name');

const asObject = includeMe.load().asObject();
const asArray = includeMe.load().asArray();
```

See example folder.

## Issues
* [X] auto publish npm package
* [X] create continuous integration
* [X] add recursive import functionality
* [X] solve the cycle problem  
* [ ] add error handle functionality (almost done)
* [ ] write the all unit tests (almost done)
* [X] write documentation (Basic) 
* [X] add badges(travis, license, npm in future) 
* [X] add license file

## Authors
* Emre Kul
