## Get User Information with one-click social authentication on Unbounce Landing Pages

![](https://dl.dropboxusercontent.com/u/21665105/unbounce.gif)

## How it works

1. Create an account in [Auth0](https://app.auth0.com)
2. Add the following script to your unbounce landing page, and change the variables `YOUR_AUTH0_CLIENT_ID`, `YOUR_AUTH0_DOMAIN`, `UNBOUNCE_PAGE_URL`.

> Notice also that you have to create a button for each social provider and then change the IDs in the script and make sure to add jQuery as well since we use that to get the element.

```
<script src="http://cdn.auth0.com/w2/auth0-2.1.js"></script>
<script>

/***** CHANGE THIS ******/

var SUBMIT_FORM_BUTTON_ID = '#lp-pom-button-27';
var SOCIAL_BUTTON_ID_1 = '#lp-pom-button-76';
var SOCIAL_BUTTON_ID_2 = '#lp-pom-button-78';
// var SOCIAL_BUTTON_ID_2 = '#lp-pom-button-76';
var YOUR_AUTH0_CLIENT_ID = 'GET IT FROM AUTH0.COM';
var YOUR_AUTH0_DOMAIN = 'GET IT FROM AUTH0.COM';    // e.g. superduper.auth0.com
var UNBOUNCE_PAGE_URL = 'http://yourunbouncepage.com'; // e.g http://unbouncepages.com/changeit

/************************/
  
$(function() {
   var auth0 = new Auth0({
    domain:                 YOUR_AUTH0_DOMAIN,
    clientID:               YOUR_AUTH0_CLIENT_ID, 
    callbackURL:            UNBOUNCE_PAGE_URL,
    callbackOnLocationHash: true
  });
  
    function callback(err, profile, id_token, access_token, state) {
      if (err) return;
      for (var field in profile) {
        if (field === 'identities') continue;
        $('<input>').attr({
          type: 'hidden',
          id: field,
          name: field,
          value: profile[field]
        }).appendTo('form');
      }
      
      $('#email_address').val(profile.email);
      
      $(SUBMIT_FORM_BUTTON_ID).get(0).click();
    }
    
    $(SOCIAL_BUTTON_ID_1).bind('click', function(e) {
      auth0.login({
        connection: 'google-oauth2',
        popup: true
      }, callback)
      
      return false;
    });

    $(SOCIAL_BUTTON_ID_2).bind('click', function(e) {
      auth0.login({
        connection: 'linkedin',
        popup: true
      }, callback)
      
      return false;
    });
  });
</script>
```

> You can also use the powerful Rules pipeline to integrate with 3rd party services like FullContact, Zapier, Salesforce, and many more. [Read more about rules here](https://github.com/auth0/rules).
