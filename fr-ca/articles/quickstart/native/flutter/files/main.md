---
name: main_view.dart
language: dart
---

```dart
import 'package:auth0_flutter/auth0_flutter.dart';
import 'package:flutter/material.dart';
import 'profile_view.dart';

class MainView extends StatefulWidget {
  const MainView({Key? key}) : super(key: key);

  @override
  State<MainView> createState() => _MainViewState();
}

class _MainViewState extends State<MainView> {
  Credentials? _credentials;

  late Auth0 auth0;

  @override
  void initState() {
    super.initState();
    auth0 = Auth0('${account.namespace}', '${account.clientId}');
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        if (_credentials == null)
          ElevatedButton(
              onPressed: () async {
                // Use a Universal Link callback URL on iOS 17.4+ / macOS 14.4+
                // useHTTPS is ignored on Android
                final credentials =
                    await auth0.webAuthentication().login(useHTTPS: true);

                setState(() {
                  _credentials = credentials;
                });
              },
              child: const Text("Log in"))
        else
          Column(
            children: [
              ProfileView(user: _credentials!.user),
              ElevatedButton(
                  onPressed: () async {
                    // Use a Universal Link logout URL on iOS 17.4+ / macOS 14.4+
                    // useHTTPS is ignored on Android
                    await auth0.webAuthentication().logout(useHTTPS: true);

                    setState(() {
                      _credentials = null;
                    });
                  },
                  child: const Text("Log out"))
            ],
          )
      ],
    );
  }
}
```
