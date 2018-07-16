var JasonAppDocModel = require('../../server/utils/JasonAppDoc')
var config = require('../../build/config')
var fs = require('fs')
  
var screens = []
fs.readdirSync(__dirname + '/views/').forEach(function (filename) {
  screens.push(JSON.parse(fs.readFileSync(__dirname + '/views/' + filename, 'utf8')))
})

uploadScreens(screens)

function uploadScreens (screens) {
  screens.forEach(function (screen) {
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