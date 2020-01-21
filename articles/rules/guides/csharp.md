---
title: Use C# in Rules
description: Learn how to use C# in Rules with Edge.js
topics:
  - rules
  - extensibility
  - csharp
contentType: how-to
useCase: extensibility-rules
---
# Use C<span>#</span> in Rules

Even though you typically write Rules in JavaScript, there is support for using C# by making use of [Edge.js](http://tjanczuk.github.io/edge/#/). In order to use C# in your Rule you will first need to `require` Edge:

```js
var edge = require('edge');
```

You can then declare an Edge function, and embed the C# code inside the function body using a JavaScript multi-line comment block:

```js
var helloWorld = edge.func(function () {/*
  async (input) => { 
      return ".NET Welcomes " + input.ToString(); 
  }
*/});
```

Please note from the code above that you need to declare the C# function as an `async` Lambda taking a single input parameter:

```cs
async (input) => { 
    return ".NET Welcomes " + input.ToString(); 
}
```

Finally, you can call the `helloWorld` function from somewhere else inside your Rule. Here is the full sample code for the Rule making use of C#:

```js
function (user, context, callback) {
  var edge = require('edge');
  
  var helloWorld = edge.func(function () {/*
    async (input) => { 
        return ".NET Welcomes " + input.ToString(); 
    }
  */});
  
  helloWorld('JavaScript', function (error, result) {
    callback(error, user, context);
  });
}
```

You can take this one step further by adding the result of the C# function as a [namespaced Claim](/tokens/guides/create-namespaced-custom-claims):

```js
function (user, context, callback) {
  var edge = require('edge');
  
  var helloWorld = edge.func(function () {/*
    async (input) => { 
        return ".NET Welcomes " + input.ToString(); 
    }
  */});
  
  helloWorld('JavaScript', function (error, result) {
    context.accessToken['https://company.com/hello'] = result;
    callback(error, user, context);
  });
}
```

You can also pass the `user` or `context` parameters which was passed into the Rule to the C# function. In this case you will need to declare the `input` parameter of the Lambda function as `dynamic` so you can access the attributes from the JavaScript object inside the C# function. You will also need to pass the `user` or `context` object to the `helloWorld` function.

In the updated sample below you can see that the C# function replaces the `@` and `.` characters in the user's email address with the `_` character:

```js
function (user, context, callback) {
  var edge = require('edge');
  
  var helloWorld = edge.func(function () {/*
    async (dynamic input) => { 
        return input.email.Replace('@', '_').Replace('.', '_'); 
    }
  */});
  
  helloWorld(user, function (error, result) {
    context.accessToken['https://company.com/email'] = result;
    callback(error, user, context);
  });
}
```

::: note
For details on the properties of the `context` argument refer to [Context Argument Properties in Rules](/rules/context).
:::
