## Create a Code Verifier

Create a `code_verifier`, which is a cryptographically-random key that will eventually be sent to Auth0 to request an `authorization_code`.

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
<code class="javascript hljs">// Dependency: Node.js crypto module
// https://nodejs.org/api/crypto.html#crypto_crypto
function base64URLEncode(str) {
    return str.toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}
var verifier = base64URLEncode(crypto.randomBytes(32));</code></pre>
  </div>
    <div id="verifier-java" class="tab-pane">
      <pre>
<code class="java hljs">// Dependency: Apache Commons Codec
// https://commons.apache.org/proper/commons-codec/
// Import the Base64 class.
// import org.apache.commons.codec.binary.Base64;
SecureRandom sr = new SecureRandom();
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

