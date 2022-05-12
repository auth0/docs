---
name: ContentView.swift
language: swift
---

```swift
import SwiftUI
import Auth0

struct ContentView: View {
    @State var user = User.empty
    @State var loggedIn = false

    var body: some View {
        if loggedIn {
            VStack {
                ProfileView(user: self.$user)
                Button("Logout", action: self.logout)
            }
        } else {
            Button("Login", action: self.login)
        }
    }
}

extension ContentView {
    func login() {
        Auth0
            .webAuth()
            .start { result in
                switch result {
                case .success(let credentials):
                    self.user = User.from(credentials.idToken)
                    self.loggedIn = true
                case .failure(let error):
                    print("Failed with: \(error)")
                }
            }
    }

    func logout() {
        Auth0
            .webAuth()
            .clearSession { result in
                switch result {
                case .success:
                    self.loggedIn = false
                case .failure(let error):
                    print("Failed with: \(error)")
                }
            }
    }
}
```
