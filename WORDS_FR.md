# Words
Ce document contient l'orthographe et les définitions telles qu'elles doivent être utilisées dans la documentation Auth0.

- **Login / Log in**: Utilisez *log in* comme un verbe, ou *login* comme un nom. N'utilisez PAS *log into* ou *login to*.
- **Logout / Log out**: Utilisez *log out* comme un verbe, ou *logout* comme un nom.
- **Setup / Set up**: Utilisez *set up* comme un verbe, ou *setup* comme un nom.
- **Multi-factor**: Utilisez *multi-factor* à la place de *multifactor* lorsque vous parlez d'authentification multi-facteurs.
- **Rollout / Roll out**: Utilisez *rollout* comme un nom et *roll out* comme un verbe. N'utilisez pas `roll-out`.
- **Email**: Utilisez "email" sans trait d'union pour référencer une adresse email.
- **Click**: Utilisez "Click on" lorsque vous référencez un lien dasn une page web ou une interface utilisateur, "Click" lorsque vous référencez un bouton. Par exemple: Click **Save**. Click on **This link**.
- **Website**: Utilisez "website", PAS "web site".
- **i.e.**: I.e. signifie `in other words`. Utilisez `that is,` à la place.
- **e.g.**: E.g. signifie `for example`. Utilisez `for example,` à la place.
- **etc.**: Utilisez ceci lorsqu'il n'y a pas assez de place pour l'alternative. Sinon utilisez `and so on`.
- **a** vs **an**: Quand le 'u' sonne comme 'you' on utilise 'a' (par exemple, a university vs an umbrella)

## Dashboard-Related Terminology

![](/media/readme/structure.png)

### Account

Représente un utilisateur, ses identifiants, et (éventuellement) un profil et d'autres attributs


### Subscription

Défini des termes personnalisés; c'est un contrat ou un plan de service e.g. essai, gratuit, développeur or développeur-pro

### Tenant

Une unité d'isolation logique des produits que nous offrons. e.g. un tenant d'Auth0 serait `foo.auth0.com` vs. un autre tenant `bar.auth0.com`.

### Tokens

Lorsque vous écrivez à propos de tokens, mettez en majuscules comme suit:

* ID Token
* Access Token
* Refresh Token

#### Within Appliance subscriptions

* **Auth0 tenants** référence des locataires cloud normaux
* **Private instances** référence des instances d'appareils

### TL;DR

En général, à moins que vous ne fassiez référence à la configuration MFA, aux options de paiements, ou aux profils utilisateur (pour le *propriétaire* du compte), vous utiliserez `tenant`, pas `account`.
