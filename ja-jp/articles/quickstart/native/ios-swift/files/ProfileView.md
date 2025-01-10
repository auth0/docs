---
name: ProfileView.swift
language: swift
---

```swift
import SwiftUI

struct ProfileView: View {
    let user: User

    var body: some View {
        VStack {
            AsyncImage(url: URL(string: user.picture))
            Text("Email: \(user.email)")
        }
    }
}
```
