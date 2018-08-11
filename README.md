# CargoBiker-App

<img src="./src/imgs/logo.svg" style="position:relative;left: 50%; width: 100px; margin-left: -50px;">

Organize sharing a cargobike with others as micro-community 

**TOC:**

* [install](#installation) (clone, configure, upload)

## Installation 

```
$ git clone git@github.com:llabball/cargobiker-app.git
```

```
$ cp build/config.example.js build/config.js
```

Configure your parametersin `build/config.js`!
```
{
  server: {
    screensUrl: '', // url of API (no trailing slash)
    imagesUrl: ''
  },
  admin: { // authentication of upload request
    name: '', // username
    pass: '' // password
  },
  app: {
    icon: '' // url of the app icon
  }
}
```

```
$ node build/upload.js
```

Finally add the url of your installation to the Jason-App.