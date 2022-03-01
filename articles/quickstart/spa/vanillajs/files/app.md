---
name: app.js
language: javascript
---

```javascript
createAuth0Client({
  domain: "${account.namespace}",
  client_id: "${account.clientId}",
  redirect_uri: window.location.origin,
}).then(async (auth0) => {
  // Assumes a button with id "login" in the DOM
  const loginButton = document.getElementById("login");

  loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    auth0.loginWithRedirect();
  });

  if (location.search.includes("state=") && 
      (location.search.includes("code=") || 
      location.search.includes("error="))) {
    await auth0.handleRedirectCallback();
    window.history.replaceState({}, document.title, "/");
  }

  // Assumes a button with id "logout" in the DOM
  const logoutButton = document.getElementById("logout");

  logoutButton.addEventListener("click", (e) => {
    e.preventDefault();
    auth0.logout();
  });

  const isAuthenticated = await auth0.isAuthenticated();
  const userProfile = await auth0.getUser();

  // Assumes an element with id "profile" in the DOM
  const profileElement = document.getElementById("profile");

  if (isAuthenticated) {
    profileElement.style.display = "block";
    profileElement.innerHTML = `
            <p><%= "${userProfile.name}" %></p>
            <img src="<%= "${userProfile.picture}" %>" />
          `;
  } else {
    profileElement.style.display = "none";
  }
});
```
