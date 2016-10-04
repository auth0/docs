## Configure Callback URLs

<%= include('../_includes/_callback-url-introduction') %>

## Structure

The sample projects which accompany each of these steps will have the following directory structure:

```bash
├── app.js
├── bin
│   └── www
├── package.json
├── public
│   └── stylesheets
│       └── style.css
├── README.md
├── routes
│   ├── index.js
│   └── ...
└── views
    ├── index.jade
    └── ...
```

## Dependencies

All the project dependencies are managed by npm and listed in the `package.json` file for each of the samples.

Run the following command to install the required packages.

```bash
npm install
```

Auth0's Lock widget and `auth0.js` library are used throughout these quickstarts. These scripts can be obtained from the following CDN links:

**Lock**
`https://cdn.auth0.com/js/lock/10.3/lock.min.js`

**auth0.js**
`http://cdn.auth0.com/w2/auth0-7.2.js`