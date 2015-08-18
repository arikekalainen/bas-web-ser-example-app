# bas-web-ser-example-app
Basic Web Service example application

## Components
* Backend : [bas-web-ser-backend](https://github.com/arikekalainen/bas-web-ser-backend)
* Client components : [bas-web-ser-client-components](https://github.com/arikekalainen/bas-web-ser-client-components)
* Typedefinitions : [bas-web-ser-typedefinitions](https://github.com/arikekalainen/bas-web-ser-typedefinitions)
* Basic client stuff: from this repo
 * index.jade and styles


## Compilation
The gulpfile script will execute some npm installs, bower installs, and subrepo gulp tasks.
The result ẃill be found from *release* -folder.
When everything goes well,

... the backend should found from *./release/backend/*

... the client should found from *./release/client/*

So, go ahead and...
1. *$ npm install*
1. *$ gulp*

## Ok to run ?
1. *$ cd release*
1. *$ nodejs backend/main*
1. Open web browser and surf to http://localhost:3000
