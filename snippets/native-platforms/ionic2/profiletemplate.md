```html
<!-- src/pages/profile/profile.html -->
  
<ion-header>
  <ion-navbar>
    <ion-title>Profile</ion-title>
  </ion-navbar>
</ion-header>

<ion-content padding *ngIf="!auth.authenticated()">
  
  <button ion-button block (click)="auth.login()">Login</button>
  
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
  
  <button ion-button block (click)="auth.logout()">Logout</button>
  
</ion-content>
```