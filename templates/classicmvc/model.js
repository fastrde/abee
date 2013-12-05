{{Model}}Collection = new Meteor.Collection("{{model}}");

//Constructor
{{Model}} = function(){
  {{#each attr}} this._{{name}} = null; 
  {{/each}}
};

{{#each attr}}
//Getter/Setter for {{name}}
{{Model}}.prototype.get{{Name}} = function(){
  return this._{{name}};
}
{{Model}}.prototype.set{{Name}} = function(value){
  this._{{name}} = value;
}
{{/each}}

