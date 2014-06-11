---
title: Getting started with Auth0
url: /
---
# Getting started with Auth0

Hello@@account.userName ? ' ' + account.userName : ''@@! Ready to test drive Auth0? All tutorials have been tailored to your account. So in most cases, all you need to do is copy the code snippets and paste them into your projects and tools.

<div class="row getting-started-logos clearfix">
	<div id="navigator-container"></div>
</div>


<script src="https://cdn.auth0.com/tutorial-navigator/0.7.0/build.js" type="text/javascript"></script>
<link href="https://cdn.auth0.com/tutorial-navigator/0.7.0/build.css" type="text/css" rel="stylesheet"></link>
<script type="text/javascript">
  (function(){function r(e,t){if("function"==typeof e){return r("*",e)}if("function"==typeof t){var n=new o(e);for(var i=1;i<arguments.length;++i){r.callbacks.push(n.middleware(arguments[i]))}}else if("string"==typeof e){r.show(e,t)}else{r.start(e)}}function i(e){var t=window.location.pathname+window.location.search;if(t==e.canonicalPath)return;r.stop();e.unhandled=true;window.location=e.canonicalPath}function s(e,n){if("/"==e[0]&&0!=e.indexOf(t))e=t+e;var r=e.indexOf("?");this.canonicalPath=e;this.path=e.replace(t,"")||"/";this.title=document.title;this.state=n||{};this.state.path=e;this.querystring=~r?e.slice(r+1):"";this.pathname=~r?e.slice(0,r):e;this.params=[];this.hash="";if(!~this.path.indexOf("#"))return;var i=this.path.split("#");this.path=i[0];this.hash=i[1]||"";this.querystring=this.querystring.split("#")[0]}function o(e,t){t=t||{};this.path=e;this.method="GET";this.regexp=u(e,this.keys=[],t.sensitive,t.strict)}function u(e,t,n,r){if(e instanceof RegExp)return e;if(e instanceof Array)e="("+e.join("|")+")";e=e.concat(r?"":"/?").replace(/\/\(/g,"(?:/").replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?/g,function(e,n,r,i,s,o){t.push({name:i,optional:!!o});n=n||"";return""+(o?"":n)+"(?:"+(o?n:"")+(r||"")+(s||r&&"([^/.]+?)"||"([^/]+?)")+")"+(o||"")}).replace(/([\/.])/g,"\\$1").replace(/\*/g,"(.*)");return new RegExp("^"+e+"$",n?"":"i")}function a(e){if(e.state){var t=e.state.path;r.replace(t,e.state)}}function f(e){if(1!=l(e))return;if(e.metaKey||e.ctrlKey||e.shiftKey)return;if(e.defaultPrevented)return;var n=e.target;while(n&&"A"!=n.nodeName)n=n.parentNode;if(!n||"A"!=n.nodeName)return;var i=n.getAttribute("href");if(n.pathname==location.pathname&&(n.hash||"#"==i))return;if(i.indexOf("mailto:")>-1)return;if(n.target)return;if(!c(n.href))return;var s=n.pathname+n.search+(n.hash||"");var o=s+n.hash;s=s.replace(t,"");if(t&&o==s)return;e.preventDefault();r.show(o)}function l(e){e=e||window.event;return null==e.which?e.button:e.which}function c(e){var t=location.protocol+"//"+location.hostname;if(location.port)t+=":"+location.port;return 0==e.indexOf(t)}var e=true;var t="";var n;r.callbacks=[];r.base=function(e){if(0==arguments.length)return t;t=e};r.start=function(t){t=t||{};if(n)return;n=true;if(false===t.dispatch)e=false;if(false!==t.popstate)window.addEventListener("popstate",a,false);if(false!==t.click)window.addEventListener("click",f,false);if(!e)return;var i=location.pathname+location.search+location.hash;r.replace(i,null,true,e)};r.stop=function(){n=false;removeEventListener("click",f,false);removeEventListener("popstate",a,false)};r.show=function(e,t,n){var i=new s(e,t);if(false!==n)r.dispatch(i);if(!i.unhandled)i.pushState();return i};r.replace=function(e,t,n,i){var o=new s(e,t);o.init=n;if(null==i)i=true;if(i)r.dispatch(o);o.save();return o};r.dispatch=function(e){function n(){var s=r.callbacks[t++];if(!s)return i(e);s(e,n)}var t=0;n()};r.Context=s;s.prototype.pushState=function(){history.pushState(this.state,this.title,this.canonicalPath)};s.prototype.save=function(){history.replaceState(this.state,this.title,this.canonicalPath)};r.Route=o;o.prototype.middleware=function(e){var t=this;return function(n,r){if(t.match(n.path,n.params))return e(n,r);r()}};o.prototype.match=function(e,t){var n=this.keys,r=e.indexOf("?"),i=~r?e.slice(0,r):e,s=this.regexp.exec(decodeURIComponent(i));if(!s)return false;for(var o=1,u=s.length;o<u;++o){var a=n[o-1];var f="string"==typeof s[o]?decodeURIComponent(s[o]):s[o];if(a){t[a.name]=undefined!==t[a.name]?t[a.name]:f}else{t.push(f)}}return true};if("undefined"==typeof module){window.page=r}else{module.exports=r}})()
</script>

<script type="text/javascript">
		(function() {
	    var TutorialNavigator = require('tutorial-navigator');
	    var tutorial = new TutorialNavigator();
	    var extract = /\/(.+)-tutorial/;
	    var compose = function(val) { return val ? '/' + val + '-tutorial' : ''};
	    var eqlPath = function(url) {
	      var base = page.base() || '';
	      var path = window.location.hash || '#!/';
	      return path === url;
	    }

	    /**
	     * Routing
	     */

	    page('*', rewrite);
	    page('/:apptype?', checkstate, render);
	    page('/:apptype/:platform?', checkstate, render);
	    page('/:apptype/:platform/:api?', checkstate, render);

	    // Initialize routing
	    page.base('/');
	    page();

	    function rewrite(ctx, next) {
	    		if (ctx.pathname !== '/' && !ctx.hash) return next();
	        ctx.path = ctx.hash.replace(/^[\#\!]/, '')
	        next();
	    }

	    function checkstate(ctx, next) {
	      var apptype = ctx.params.apptype || '';
	      var platform = compose(ctx.params.platform || '');
	      var api = ctx.params.api || '';

	      tutorial.set({
	        apptype: apptype,
	        nativePlatform: 'native-mobile' === apptype ? platform : '',
	        hybridPlatform: 'hybrid' === apptype ? platform : '',
	        clientPlatform: 'spa-api' === apptype ? platform : '',
	        serverPlatform: 'web' === apptype ? platform : '',
	        serverApi: 'no-api' === api || !api ? '' : compose(api)
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
	      var url = '#!/:apptype'.replace(':apptype', val || '')
	      if (!eqlPath(url)) return page(url);
	    }

	    function onplatform(val, old) {
	      var url = '#!/:apptype/:platform';
	      var apptype = tutorial.get('apptype');
	      var platform = val ? extract.exec(val)[1] : '';

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

	      var url = '#!/:apptype/:platform/:api'
	        .replace(':apptype', apptype)
	        .replace(':platform', extract.exec(platform)[1])
	        .replace(':api', api ? extract.exec(api)[1] : 'no-api')
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

	      var url = '#!/:apptype/:platform/:api'
	        .replace(':apptype', apptype)
	        .replace(':platform', extract.exec(platform)[1])
	        .replace(':api', api
	          ? extract.exec(api)[1]
	          : ('web' === apptype ? '' : 'no-api'))
	        .replace(/\/$/, '');

	      if (!eqlPath(url)) return page(url);
	    };

	    // pretty printing
	    tutorial.on('codevisible', prettifyonvisible);
	    tutorial.on('nativevisible', prettifyonvisible);
	    tutorial.on('hybridvisible', prettifyonvisible);
	    tutorial.on('clientvisible', prettifyonvisible);
	    tutorial.on('serverapivisible', prettifyonvisible);

	    function prettifyonvisible(visible) {
	      if (visible && prettyPrint) prettyPrint();
	    }
		})()
</script>

