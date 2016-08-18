```html
<p class="lead">
    <sec:authorize access="hasRole('ADMIN')">
        <label>This line is only visible if you have ROLE_ADMIN</label>
    </sec:authorize>
</p>
<p class="lead">
    <sec:authorize access="hasRole('USER')">
        <label>This line is only visible if you have ROLE_USER</label>
    </sec:authorize>
</p>
```