module.exports = (function () {
  return {
    server: {
      screensUrl: '', // complete url to the server API (no trailing slash)
      imagesUrl: ''
    },
    admin: { // this user have to have the right to create/update/delete the app
      name: '', // username
      pass: '' // password
    },
    app: {
      icon: '' // url of the app icon
      //,offline: 'on'
    }
  }
})()