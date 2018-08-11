var AmpersandModel = require('ampersand-model')

module.exports = AmpersandModel.extend({
  url: function () {
    if (this.isNew()) 
      return this.urlRoot
    else
      return this.urlRoot + '/' + this.getId()
  },
  ajaxConfig: function () {
    return {
      headers: {
        'Content-Type': 'application/json',
        'If-Match': this._rev,
        'Authorization': this.BasicAuth
      }
    }
  },
  parse: function (resp) {
    // complete post response
    if (resp._id) return resp
    // updated post response
    if (resp.rev) this._rev = resp.rev
    if (resp.id) this._id = resp.id
  },
  idAttribute: '_id',
  props: {
    _id: {
      type: 'string'
    },
    _rev: {
      type: 'string'
    },
    _deleted: {
      type: 'boolean'
    },
    created_at: {
      type: 'string',
      default: function () {return new Date().toISOString()}
    },
    created_by: {
      type: 'string',
      default: 'test'
    },
    updated_at: {
      type: 'string',
      default: function () {return new Date().toISOString()}
    },
    updated_by: {
      type: 'string',
      default: 'test'
    },
    type: {
      type: 'string',
      required: true,
      default: 'jason_app'
    },
    $jason: 'object'
  },
  session: {
    ok: 'boolean',
    error: 'string',
    reason: 'string',
    username: 'string',
    password: 'string'
  },
  derived: {
    BasicAuth: {
      deps: ['username', 'password'],
      fn: function () {
        var token = this.username + ':' + this.password
        var encodedToken
        
        if (this.window && this.window.btoa) encodedToken = window.btoa(token)
        if (!encodedToken && Buffer) encodedToken = new Buffer(token).toString('base64')

        return 'Basic ' + encodedToken
      }
    }
  }
})