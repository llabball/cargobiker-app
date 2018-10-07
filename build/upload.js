var JasonAppDocModel = require('./JasonServerDoc')
var config = require('./config')
var readfiles = require('recursive-readdir')
var fs = require('fs')
  
readfiles(__dirname + '/../src/views/').then(
  function(files) {
    uploadScreens(files)
  },
  function(error) {
    console.error('[ERR] could not read view files: ', error)
  }
)

function uploadScreens (files) {
  files.forEach(function (file_path) {
    try {
      var screen = JSON.parse(fs.readFileSync(file_path, 'utf8'))
    } catch (error) {
      console.error('[ERR] could parse screen file content to JSON: ', error)
      return
    }
    var appDoc = new JasonAppDocModel()

    appDoc.urlRoot = config.server.screensUrl
    appDoc.username = config.admin.name
    appDoc.password = config.admin.pass
    appDoc._id = screen.$jason.head.title

    appDoc.fetch({
      success: function (model, response, options) {
        upload(appDoc)
      },
      error: function (model, response, options) {
        upload(appDoc)
      }
    })

    function upload (appDoc) {
      appDoc.save(screen, {
        success: function (model, response, options) {
          console.log('[OKAY] Screen ' + appDoc._id + ' saved')
        },
        error: function (model, response, options) {
          console.log('[FAIL] Screen ' + appDoc._id + ' failed to upload: ' + Object.keys(response))
        }
      })
    }
  })
}

// Images must be uploaded
// have done it menually to prevent uploading it every time 
//
// readfiles(__dirname + '/../src/imgs/').then(
//   function(files) {
//     files.forEach(function (file_path) {
//       try {
//         var screen = JSON.parse(fs.readFileSync(file_path, 'utf8'))
//       } catch (error) {
//         console.error('[ERR] could parse screen file content to JSON: ', error)
//         return
//       }
//     })
//   },
//   function(error) {
//     console.error('[ERR] could not read image files: ', error)
//   }
// )