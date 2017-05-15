```js
// src/pages/home/home.ts

import { Component } from '@angular/core';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public auth: AuthService) {}

}
```
