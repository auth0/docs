
```js
function login (email, password, callback) {
  var ibmdb = require("ibm_db");

  ibmdb.open("DRIVER={DB2};DATABASE=SAMPLE;HOSTNAME=<db2host_url>;UID=<user_name>;PWD=<password>;PORT=50001;PROTOCOL=TCPIP", function(err, conn) {
    if (err) callback(new Error("Error while trying to connect to auth source"));
    conn.query("select * from =<user_name>.USERS where email='" + email + "'", function(err, data) {
      if (err) callback(new Error(err));
      else {
      if (!bcrypt.compareSync(password, data[0].PASSWORDHASH)) return;

      //map attributes to profile – sample below
      var profile = {
        user_id: data[0].ID,
        nickname: data[0].EMAIL,
        email: data[0].EMAIL,
        given_name : data[0].FIRSTNAME,
        family_name : data[0].LASTNAME
      };

      callback(null,profile);
      }
      conn.close(function() {

      });
    });
  });
}
```
