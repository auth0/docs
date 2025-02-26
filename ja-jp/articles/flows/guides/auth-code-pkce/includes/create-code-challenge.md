## Create a Code Challenge

Generate a `code_challenge` from the `code_verifier` that will be sent to Auth0 to request an `authorization_code`.


<div class="code-picker">
  <div class="languages-bar">
    <ul>
      <li class="active"><a href="#challenge-javascript" data-toggle="tab">JavaScript</a></li>
      <li><a href="#challenge-java" data-toggle="tab">Java</a></li>
      <li><a href="#challenge-swift" data-toggle="tab">Swift 3</a></li>
      <li><a href="#challenge-objc" data-toggle="tab">Objective-C</a></li>
    </ul>
  </div>
  <div class="tab-content">
    <div id="challenge-javascript" class="tab-pane active">
      <pre>
<code class="javascript hljs">// Dependency: Node.js crypto module
// https://nodejs.org/api/crypto.html#crypto_crypto
function sha256(buffer) {
    return crypto.createHash('sha256').update(buffer).digest();
}
var challenge = base64URLEncode(sha256(verifier));
</code>
</pre>
    </div>
    <div id="challenge-java" class="tab-pane">
      <pre>
<code class="java hljs">// Dependency: Apache Commons Codec
// https://commons.apache.org/proper/commons-codec/
// Import the Base64 class.
// import org.apache.commons.codec.binary.Base64;
byte[] bytes = verifier.getBytes("US-ASCII");
MessageDigest md = MessageDigest.getInstance("SHA-256");
md.update(bytes, 0, bytes.length);
byte[] digest = md.digest();
String challenge = Base64.encodeBase64URLSafeString(digest);</code></pre>
    </div>
    <div id="challenge-swift" class="tab-pane">
      <pre>
<code class="swift hljs">// Dependency: Apple Common Crypto library
// http://opensource.apple.com//source/CommonCrypto
guard let data = verifier.data(using: .utf8) else { return nil }
var buffer = [UInt8](repeating: 0,  count: Int(CC_SHA256_DIGEST_LENGTH))
data.withUnsafeBytes {
    _ = CC_SHA256($0, CC_LONG(data.count), &buffer)
}
let hash = Data(bytes: buffer)
let challenge = hash.base64EncodedString()
    .replacingOccurrences(of: "+", with: "-")
    .replacingOccurrences(of: "/", with: "\_")
    .replacingOccurrences(of: "=", with: "")
    .trimmingCharacters(in: .whitespaces)</code></pre>
    </div>
    <div id="challenge-objc" class="tab-pane">
      <pre>
<code class="objc hljs">// Dependency: Apple Common Crypto library
// http://opensource.apple.com//source/CommonCrypto
u_int8_t buffer[CC_SHA256_DIGEST_LENGTH * sizeof(u_int8_t)];
memset(buffer, 0x0, CC_SHA256_DIGEST_LENGTH);
NSData *data = [verifier dataUsingEncoding:NSUTF8StringEncoding];
CC_SHA256([data bytes], (CC_LONG)[data length], buffer);
NSData *hash = [NSData dataWithBytes:buffer length:CC_SHA256_DIGEST_LENGTH];
NSString *challenge = [[[[hash base64EncodedStringWithOptions:0]
                         stringByReplacingOccurrencesOfString:@"+" withString:@"-"]
                         stringByReplacingOccurrencesOfString:@"/" withString:@"_"]
                         stringByTrimmingCharactersInSet:[NSCharacterSet characterSetWithCharactersInString:@"="]];</code></pre>
    </div>
  </div>
</div>
