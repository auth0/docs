---
title: Getting started with Auth0
url: /
---

<script type="text/javascript">

  // Redirect old `/#!/..` urls to new `/quickstart/...`
  var pathname = window.location.pathname || '/';
  var hash = window.location.hash;
  var regex = /^\#\!\//;
  if ('/' === pathname && regex.test(hash)) {
    window.location = window.location.origin + hash.replace(regex, '/quickstart/');
  };

</script>

<!-- Page content -->

# Getting started with Auth0

Hello@@account.userName ? ' ' + account.userName : ''@@! Ready to test drive Auth0? All tutorials have been tailored to your account. So in most cases, all you need to do is copy the code snippets and paste them into your projects and tools.

<!-- Tutorial Navigator -->

<div class="row getting-started-logos clearfix">
  <div id="navigator-container" class="col-sm-12"></div>
</div>

<script src="https://cdn.auth0.com/tutorial-navigator/latest/build.min.js" type="text/javascript"></script>
<link href="https://cdn.auth0.com/tutorial-navigator/latest/build.min.css" type="text/css" rel="stylesheet"></link>
<script type="text/javascript" src="/js/page.min.js"></script>

<script type="text/javascript">
  (function () {
    // Initialize and render `TutorialNavigator`
    var TutorialNavigator = require('tutorial-navigator');
    var tutorial = new TutorialNavigator({
      docsDomain: document.location.origin,
      apptypes: @@JSON.stringify(quickstart.apptypes)@@,
      clientPlatforms: @@JSON.stringify(quickstart.clientPlatforms)@@,
      hybridPlatforms: @@JSON.stringify(quickstart.hybridPlatforms)@@,
      nativePlatforms: @@JSON.stringify(quickstart.nativePlatforms)@@,
      serverPlatforms: @@JSON.stringify(quickstart.serverPlatforms)@@,
      serverApis: @@JSON.stringify(quickstart.serverApis)@@
    });

    function eqlPath (url) {
      var base = page.base() || '';
      var path = window.location.pathname.slice(base.length) || '/';
      return path === url;
    }

    /**
     * Routing
     */

    function rewrite(ctx, next) {
      // Prepend `/quickstart` to routes withouth `/quickstart`
      // if(!/^\/quickstart/.test(ctx.path)) ctx.path = '/quickstart' + ctx.path;
      ctx.pathname = ctx.pathname || '/';
      // prepend quickstart if pathname is '/'
      if(/^\/$/.test(ctx.pathname)) ctx.path = '/quickstart' + ctx.path;
      next();
    }

    page('*', rewrite);
    page('/quickstart/:apptype?', checkstate, render);
    page('/quickstart/:apptype/:platform?', checkstate, render);
    page('/quickstart/:apptype/:platform/:api?', checkstate, render);

    // Initialize routing
    // page.base('/quickstart');
    page();

    function checkstate(ctx, next) {
      var apptype = ctx.params.apptype || '';
      var platform = ctx.params.platform || '';
      var api = ctx.params.api || '';

      tutorial.set({
        apptype: apptype,
        nativePlatform: 'native-mobile' === apptype ? platform : '',
        hybridPlatform: 'hybrid' === apptype ? platform : '',
        clientPlatform: 'spa' === apptype ? platform : '',
        serverPlatform: 'web' === apptype ? platform : '',
        serverApi: 'no-api' === api || !api ? '' : api
      });

      var codevisible = ('no-api' === api || 'web' === apptype);
      if (!api || codevisible) tutorial.set('codevisible', codevisible);
      next();
    }

    function render(ctx, next) {
      tutorial.render('#navigator-container');
    }

    /**
     * Bind tutorial changes to pushState
     */

    tutorial.on('apptype', onapptype);
    tutorial.on('nativePlatform', onplatform);
    tutorial.on('hybridPlatform', onplatform);
    tutorial.on('clientPlatform', onplatform);
    tutorial.on('serverPlatform', onplatform);
    tutorial.on('serverApi', onserverapi)
    tutorial.on('codevisible', oncodevisible);

    function onapptype(val, old) {
      var url = '/quickstart/:apptype'.replace(':apptype', val || '')
      if (!eqlPath(url)) return page(url);
    }

    function onplatform(val, old) {
      var url = '/quickstart/:apptype/:platform';
      var apptype = tutorial.get('apptype');
      var platform = val ? val : '';

      if (!apptype) return;

      url = url
        .replace(':apptype', apptype)
        .replace(':platform', platform)
        .replace(/\/$/, '');

      if (!eqlPath(url)) return page(url);
    }

    function onserverapi(api, old) {
      var apptype = tutorial.get('apptype');
      var platform = tutorial.get('clientPlatform')
        || tutorial.get('nativePlatform')
        || tutorial.get('hybridPlatform');

      if (!apptype) return;
      if (!platform) return;
      if (old && !api) return;

      var url = '/quickstart/:apptype/:platform/:api'
        .replace(':apptype', apptype)
        .replace(':platform', platform)
        .replace(':api', api ? api : 'no-api')
        .replace(/\/$/, '');

      if (!eqlPath(url)) return page(url);
    };

    function oncodevisible(visible, old) {
      if (!visible) return;
      var apptype = tutorial.get('apptype');
      var platform = tutorial.get('clientPlatform')
        || tutorial.get('nativePlatform')
        || tutorial.get('hybridPlatform')
        || tutorial.get('serverPlatform');
      var api = tutorial.get('serverApi');

      if (!apptype) return;
      if (!platform) return;
      if (old && !visible) return;

      var url = '/quickstart/:apptype/:platform/:api'
        .replace(':apptype', apptype)
        .replace(':platform', platform)
        .replace(':api', api
          ? api
          : ('web' === apptype ? '' : 'no-api'))
        .replace(/\/$/, '');

      if (!eqlPath(url)) return page(url);
    };

    // pretty printing
    tutorial.pretty(function() {
      return 'function' === typeof window.prettyPrint
        ? window.prettyPrint()
        : null;
    });

  })()
</script>

