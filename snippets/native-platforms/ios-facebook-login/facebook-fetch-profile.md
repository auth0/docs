```swift
private func fetchProfile(userId: String, accessToken: String) -> AnyPublisher<[String: Any], URLError> {
    var components = URLComponents(string: "\(fbAPIURL)/\(userId)")!
    components.queryItems = [URLQueryItem(name: "access_token", value: accessToken),
                             URLQueryItem(name: "fields", value: "first_name,last_name,email")]

    return fetch(url: components.url!)
}
```