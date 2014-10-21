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
      clientplatforms: @@JSON.stringify(quickstart.clientPlatforms)@@,
      hybridplatforms: @@JSON.stringify(quickstart.hybridPlatforms)@@,
      nativeplatforms: @@JSON.stringify(quickstart.nativePlatforms)@@,
      serverplatforms: @@JSON.stringify(quickstart.serverPlatforms)@@,
      serverapis: @@JSON.stringify(quickstart.serverApis)@@
    });

    function eqlPath (url) {
      var base = page.base() || '';
      var path = window.location.pathname.slice(base.length) || '/';
      return path === url;
    }

    /**
     * Routing
     */

    page('*', quickstartRoute);
    page('/quickstart/:apptype?', checkstate, render);
    page('/quickstart/:apptype/:platform?', checkstate, render);
    page('/quickstart/:apptype/:platform/:api?', checkstate, render);

    // Initialize routing
    // page.base('/quickstart');
    page();

    function quickstartRoute(ctx, next) {
      // Prepend `/quickstart` to routes withouth `/quickstart`
      // if(!/^\/quickstart/.test(ctx.path)) ctx.path = '/quickstart' + ctx.path;
      ctx.pathname = ctx.pathname || '/';
      // prepend quickstart if pathname is '/'
      if(/^\/$/.test(ctx.pathname)) ctx.path = '/quickstart' + ctx.path;
      next();
    }

    function checkstate(ctx, next) {
      var apptype = ctx.params.apptype || '';
      var platform = ctx.params.platform || '';
      var api = ctx.params.api || '';

      tutorial.set({
        apptype: apptype,
        nativePlatform: 'native-mobile' === apptype ? platform : '',
        hybridPlatform: 'hybrid' === apptype ? platform : '',
        clientPlatform: 'spa' === apptype ? platform : '',
        serverPlatform: 'webapp' === apptype ? platform : '',
        serverApi: 'no-api' === api || !api ? '' : api
      });

      var codevisible = ('no-api' === api || 'webapp' === apptype);
      if (!api || codevisible) tutorial.set('codevisible', codevisible);
      next();
    }

    function render(ctx, next) {
      tutorial.render('#navigator-container');
      swiftypeindex(tutorial.get('codevisible'));
      titleupdate();
    }

    /**
     * Bind tutorial changes to pushState
     */

    tutorial.on('apptype', onapptype);
    tutorial.on('apptype', titleupdate);
    tutorial.on('nativePlatform', onplatform);
    tutorial.on('nativePlatform', titleupdate);
    tutorial.on('hybridPlatform', onplatform);
    tutorial.on('hybridPlatform', titleupdate);
    tutorial.on('clientPlatform', onplatform);
    tutorial.on('clientPlatform', titleupdate);
    tutorial.on('serverPlatform', onplatform);
    tutorial.on('serverPlatform', titleupdate);
    tutorial.on('serverApi', onserverapi)
    tutorial.on('serverApi', titleupdate)
    tutorial.on('codevisible', oncodevisible);
    tutorial.on('codevisible', swiftypeindex);
    tutorial.on('codevisible', titleupdate);

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
          : ('webapp' === apptype ? '' : 'no-api'))
        .replace(/\/$/, '');

      if (!eqlPath(url)) return page(url);
    };

    function swiftypeindex (visible) {
      if (!visible) {
        return $('#tutorial-navigator .code-snippets').removeAttr('data-swiftype-index');
      }

      $('#tutorial-navigator .code-snippets').attr('data-swiftype-index', 'true');
    }

    // pretty printing
    tutorial.pretty(function() {
      return 'function' === typeof window.prettyPrint
        ? window.prettyPrint()
        : null;
    });

    function swiftypeindex (visible) {
      if (!visible) {
        return $('#tutorial-navigator .code-snippets').removeAttr('data-swiftype-index');
      }

      $('#tutorial-navigator .code-snippets').attr('data-swiftype-index', 'true');
    }

    function titleupdate() {
      var title = 'Quickstart for ';
      var appTitle = tutorial.get('apptype') ? tutorial.apptypeTitle() : '';
      if (!appTitle) return $('head title').html('Getting started with Auth0');

      var platformTitle = tutorial.get('nativePlatform') || tutorial.get('hybridPlatform') || tutorial.get('clientPlatform') || tutorial.get('serverPlatform')
        ? tutorial.platformTitle() : '';
      if (!platformTitle) return $('head title').html(title + appTitle);

      var apiTitle = tutorial.get('serverApi') ? tutorial.apiTitle() : '';
      if (!apiTitle && !tutorial.get('codevisible')) return $('head title').html(title +  platformTitle);
      if (!apiTitle) return $('head title').html('Getting started with ' + platformTitle);
      return $('head title').html('Getting started with ' + platformTitle + ' and ' + apiTitle);
    }

  })()
</script>

