---
name: index.html
language: html
---
```html
<!-- src/main/resources/templates/index.html -->
<html lang="en" xmlns:th="http://www.thymeleaf.org" xmlns:sec="http://www.thymeleaf.org/thymeleaf-extras-springsecurity5">
    <body>
        <div sec:authorize="!isAuthenticated()">
            <a th:href="@{/oauth2/authorization/okta}">Log In</a>
        </div>
        <div sec:authorize="isAuthenticated()">
            <p>You are logged in!</p>
            <img th:src="<%= "${profile.get('picture')}" %>" th:attr="<%= "alt=${profile.get('name')}" %>"/>
            <h2 th:text="<%= "${profile.get('name')}" %>"></h2>
            <p th:text="<%= "${profile.get('email')}" %>"></p>
            <form name="logoutForm" th:action="@{/logout}" method="post">
                <button type="submit" value="Log out"/>
            </form>
        </div>
    </body>
</html>
```