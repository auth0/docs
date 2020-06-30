The sample uses URLSession with [Combine](https://developer.apple.com/documentation/combine) to perform this request.

```swift
private let fbAPIURL = "https://graph.facebook.com/v6.0"

private func fetch(url: URL) -> AnyPublisher<[String: Any], URLError> {
    URLSession.shared.dataTaskPublisher(for: url)
        .subscribe(on: DispatchQueue.global(qos: .userInitiated)) // Execute the request on a background thread
        .receive(on: DispatchQueue.main) // Execute the sink callbacks on the main thread
        .compactMap { try? JSONSerialization.jsonObject(with: $0.data) as? [String: Any] } // Get a JSON dictionary
        .eraseToAnyPublisher()
}

private func fetchSessionAccessToken(appId: String, accessToken: String) -> AnyPublisher<String, URLError> {
    var components = URLComponents(string: "\(fbAPIURL)/oauth/access_token")!
    components.queryItems = [URLQueryItem(name: "grant_type", value: "fb_attenuate_token"),
                             URLQueryItem(name: "fb_exchange_token", value: accessToken),
                             URLQueryItem(name: "client_id", value: appId)]

    return fetch(url: components.url!)
        .compactMap { $0["access_token"] as? String } // Get the Session Access Token
        .eraseToAnyPublisher()
}
```