# Passwordless on Regular Web Apps

Passwordless connections, as the name suggests, don't require the user to remember a password. Instead, another mechanism is used to prove identity. It could be a one-time password sent every time the user logs in through SMS, email or Apple TouchID.

## Authenticate users with Magic Link via e-mail
Diagram: flow

### Use Auth0 UI widget (Lock)
snipet de lock pwdless, se mando el mail, resend, el usuario clickea el email, va al callback
No mostrar el callback para manejo de errores inline, usar .on(error) en todo caso
### Use your own UI
idem con auth0js

## Authenticate users with a one time code via SMS
Diagram: flow
### Use Auth0 UI widget (Lock)
snipet de lock pwdless, genera un redirect, callback url lo procesa el server.
No mostrar el callback para manejo de errores inline, usar .on(error) en todo caso
### Use your own UI
snipet de lock pwdless, genera un redirect, callback url lo procesa el server.
No mostrar el callback para manejo de errores inline, usar .on(error) en todo caso

## Authenticate users with a one time code via e-mail
Diagram: flow
### Use Auth0 UI widget (Lock)
idem arriba
### Use your own UI

idem arriba
