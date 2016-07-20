```html
  <!-- app/pages/profile/profile.html -->
  
<ion-navbar *navbar>
  <ion-title>Profile</ion-title>
</ion-navbar>

<ion-content padding *ngIf="!auth.authenticated()">
  
  <button block (click)="auth.login()">Login</button>
  
</ion-content>

<ion-content padding *ngIf="auth.authenticated()">  
  
  <ion-card>

    <ion-item *ngIf="auth.user">
      <ion-avatar item-left>
        <img src="{{ auth.user.picture }}">
      </ion-avatar>
      <h2>{{ auth.user.nickname }}</h2>
      <p>{{ auth.user.email }}</p>
    </ion-item>
  
  </ion-card>
  
  <button block (click)="auth.logout()">Logout</button>
  
</ion-content>
```