---
name: app.module.ts
language: javascript
---

```javascript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthModule } from '@auth0/auth0-angular';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AuthModule.forRoot({
      domain: '${account.namespace}',
      clientId: '${account.clientId}'
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```