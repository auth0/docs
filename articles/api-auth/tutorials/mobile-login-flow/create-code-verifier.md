



# Create a Code Verifier

First, you will need to generate and store a `code_verifier`, which is a cryptographically random key that, along with its transformed value (called the `code_challenge`), will be sent to Auth0 for an `authorization_code`.

For sample scripts, to generate a `code_verifier` and a `code_challenge`, refer to [Execute an Authorization Code Grant Flow with PKCE](/api-auth/tutorials/authorization-code-grant-pkce#1-create-a-code-verifier).




First, you need to generate and store a `code_verifier`.

<div class="code-picker">
  <div class="languages-bar">
    <ul>
      <li class="active"><a href="#verifier-javascript" data-toggle="tab">JavaScript</a></li>
      <li><a href="#verifier-java" data-toggle="tab">Java</a></li>
      <li><a href="#verifier-swift" data-toggle="tab">Swift 3</a></li>
      <li><a href="#verifier-objc" data-toggle="tab">Objective-C</a></li>
    </ul>
  </div>
  <div class="tab-content">
    <div id="verifier-javascript" class="tab-pane active">
      <pre>
<code class="javascript hljs">function base64URLEncode(str) {
    return str.toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

var verifier = base64URLEncode(crypto.randomBytes(32));</code></pre>
    </div>
    <div id="verifier-java" class="tab-pane">
      <pre>
<code class="java hljs">SecureRandom sr = new SecureRandom();
byte[] code = new byte[32];
sr.nextBytes(code);
String verifier = Base64.encodeToString(code, Base64.URL_SAFE | Base64.NO_WRAP | Base64.NO_PADDING);</code></pre>
    </div>
    <div id="verifier-swift" class="tab-pane">
      <pre>
<code class="swift hljs">var buffer = [UInt8](repeating: 0, count: 32)
_ = SecRandomCopyBytes(kSecRandomDefault, buffer.count, &buffer)
let verifier = Data(bytes: buffer).base64EncodedString()
    .replacingOccurrences(of: "+", with: "-")
    .replacingOccurrences(of: "/", with: "\_")
    .replacingOccurrences(of: "=", with: "")
    .trimmingCharacters(in: .whitespaces)</code></pre>
    </div>
    <div id="verifier-objc" class="tab-pane">
      <pre>
<code class="objc hljs">NSMutableData *data = [NSMutableData dataWithLength:32];
int result __attribute__((unused)) = SecRandomCopyBytes(kSecRandomDefault, 32, data.mutableBytes);
NSString *verifier = [[[[data base64EncodedStringWithOptions:0]
                        stringByReplacingOccurrencesOfString:@"+" withString:@"-"]
                        stringByReplacingOccurrencesOfString:@"/" withString:@"_"]
                             stringByTrimmingCharactersInSet:[NSCharacterSet characterSetWithCharactersInString:@"="]];</code></pre>
    </div>
  </div>
</div>
