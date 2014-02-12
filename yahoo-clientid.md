# Obtaining a Consumer Key and Consumer Secret for Yahoo!

To configure a Yahoo! connection you will need to register Auth0 on the [Yahoo! Developer Network portal](https://developer.yahoo.com/).

##1. Add a new Project
Log in into [Yahoo! Developer Network portal](https://developer.yahoo.com/), select [__My Projects__](https://developer.apps.yahoo.com/projects) and click on __Create a Project__:

![](img/yahoo-register-1.png)

---

##2. Register a new project

Complete the form. For __Access Scopes__ select "This app requires access to private user data." and use this URL for the __Callback Domain__:

	https://@@account.namespace@@/login/callback

Also make sure to select at least one Yahoo API:

![](img/yahoo-register-3.png)

---

##3. Get your Consumer Key and Consumer Secret

Once the project is created, enter your new `Consumer Key` a  nd `Consumer Secret` into the Yahoo! connection settings in Auth0.

![](img/yahoo-register-2.png)


