```typescript
<!-- ===== ./main.ts ===== -->
import {AUTH_PROVIDERS} from 'angular2-jwt';
import {AppComponent} from './app.component';

bootstrap(AppComponent, [
  ...
  AUTH_PROVIDERS,
  ...
])
```