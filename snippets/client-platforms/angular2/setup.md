```js
// app.ts

import { bootstrap } from '@angular/platform-browser-dynamic';
import { Component, View, provide } from '@angular/core';
import { RouteConfig, Router, APP_BASE_HREF, ROUTER_PROVIDERS, ROUTER_DIRECTIVES, CanActivate } from 'angular2/router-deprecated';
import { HTTP_PROVIDERS, Http } from '@angular/http';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';
```
