```html
<!-- src/pages/home/home.html -->

<ion-header>
  <ion-navbar>
    <ion-title>
      Home Page
    </ion-title>
  </ion-navbar>
</ion-header>

<ion-content padding>

  <!-- just a login button if not authenticated -->
  <div *ngIf="!auth.isAuthenticated()">
    <button ion-button block color="primary" (click)="auth.login()">Login</button>
  </div>

  <!-- a card with your picture and name, plus a logout button -->
  <div *ngIf="auth.isAuthenticated()">
    <ion-card>
      <img [src]="auth.user.picture" />
      <ion-card-content>
        <ion-card-title>{{ auth.user.name }}</ion-card-title>
      </ion-card-content>
    </ion-card>
    <button ion-button block color="primary" (click)="auth.logout()">Logout</button>
  </div>

</ion-content>
```
