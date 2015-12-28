```js
#app.js file
if (Meteor.isClient) {
	
  Template.Auth0Login.events({
    'click button.login': function () {
      lock.show();
    },
    
  });
}
```
