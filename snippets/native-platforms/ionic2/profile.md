```js
// app/pages/profile/profile.ts

import {Page} from 'ionic-angular';
import {AuthService} from '../../services/auth/auth';

@Page({
  templateUrl: 'build/pages/profile/profile.html',
})
export class ProfilePage {
  
  // We need to inject AuthService so that we can
  // use it in the view
  constructor(private auth: AuthService) {}
}
```