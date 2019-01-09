---
title: Create an Express app
description: This quickstart will teach the fundamentals of protecting parts of a Node.js application. We'll use Auth0 to greatly speed up the implementation of a user system.
budicon: 448
topics:
  - quickstarts
  - webapp
  - login
  - user profile
  - logout
  - nodejs
  - express
contentType: tutorial
useCase: quickstart
github:
    path: 01-Create-express-app
---

This section will get you started with a simple Node Express application. If you have an existing Express application that you would like to use for this Quickstart you can skip to the next section: [Implementing a user profile page](/quickstart/webapp/nodejs2/02-Implement-profile-page).

## Create your application using Express-Generator

To get started we will be making use of [express-generator](https://expressjs.com/en/starter/generator.html) to quickly generate our application skeleton.

Start by installing Express-Generator.
```shell
$ npm install express-generator -g
```

And then using Express to create a new Express app in a directory called `profileapp`.
```shell
$ express --view=pug --git profileapp
```

Express-generator creates a number of folders and files that a standard Node Express application would use. We are using the Pug templating engine (as defined in the `--view=pug` flag) and we're used the `--git` configuration flag to auto-generate a `.gitignore` file. 

Now let's switch to your new application directory.
```shell
$ cd profileapp
```

If all went to plan you should have a folder structure similar to the following.
```shell
.
|-- app.js
|-- bin
|   └-- www
|-- public
|   |-- images
|   |-- javascripts
|   └-- stylesheets
|       └-- style.css
|-- routes
|   |-- index.js
|   └-- users.js
└-- views
    |-- error.pug
    |-- index.pug
    └-- layout.pug
```

Here you can see that Express-Generator has created our node application `app.js` and folders to hold our routes logic (`/routes`) and our Pug templates (`/views`). There is also some boilerplate template code with `index.pug` which renders our home page by extending the `layout.pug` template.

## Install node dependencies
We can now install our node dependencies.
```shell
$ npm install
```

Node will download and install all the required dependencies for a basic node express server and place them into a `node-modules` folder. We shouldn't need to ever worry about the contents of this folder, npm will manage it for us.

## Run the node server and test locally
Finally we can run our application locally to confirm it worked.
```shell
$ npm start
```

Navigate your browser to [http://localhost:3000](http://localhost:3000/) and you will see the default Express home page.

![Express welcome screen](/media/articles/quickstart/express_running.png)

In the next section we will [Implement a user profile page](/quickstart/webapp/nodejs2/02-Implement-profile-page).