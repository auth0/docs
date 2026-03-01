### Configure Callback URL

For security purposes, you must add <% if(spa){ %>your page's URL<%} else {%>the callback URL<%}%> to the list of <dfn data-key="callback">**Allowed callback URLs**</dfn> in your application's settings at [Auth0 Dashboard > Applications > Applications](${manage_url}/#/applications).