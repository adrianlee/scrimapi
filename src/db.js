// Bookshelf.js
var pg = require('pg');
var knex = require('knex')({
  client: 'pg',
  connection: "postgres://bdoynxivzpqptc:zhvZRCXISqRmzkaJeZK9w0I0DO@ec2-54-204-12-25.compute-1.amazonaws.com:5432/d48sfpfmcshk59" + '?ssl=true'
});
var bookshelf = require('bookshelf')(knex);


var db = {};

db.User = bookshelf.Model.extend({
  tableName: 'users',
  teams: function() {
    return this.hasMany(db.Team);
  }
});

db.Team = bookshelf.Model.extend({
  tableName: 'teams',
  owner: function() {
    return this.belongsTo(db.User);
  }
})

module.exports = db;
