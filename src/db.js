// Bookshelf.js
var pg = require('pg');
var knex = require('knex')({
  client: 'pg',
  connection: "postgres://bdoynxivzpqptc:zhvZRCXISqRmzkaJeZK9w0I0DO@ec2-54-204-12-25.compute-1.amazonaws.com:5432/d48sfpfmcshk59" + '?ssl=true'
});
var bookshelf = require('bookshelf')(knex);

// var User = bookshelf.Model.extend({
//   tableName: 'users',
//   posts: function() {
//     return this.hasMany(Posts);
//   }
// });

// var Posts = bookshelf.Model.extend({
//   tableName: 'messages',
//   tags: function() {
//     return this.belongsToMany(Tag);
//   }
// });

// var Tag = bookshelf.Model.extend({
//   tableName: 'tags'
// })

// User.where('id', 1).fetch({withRelated: ['posts.tags']}).then(function(user) {
//   console.log(user.related('posts').toJSON());
// }).catch(function(err) {
//   console.error(err);
// });