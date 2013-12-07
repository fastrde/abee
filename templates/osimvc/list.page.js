// /controllers/page.{{page}}.js

Template.{{page}}Page.events ({
  'click .btn': function () {
    console.count ('click .btn');
    alert ('click .btn!');
  }
})
Template.{{page}}Page.clientsList = function () {
  return {{page}}.find();
}