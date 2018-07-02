---
title: Login Script for IBM DB2
description: A custom callback script for those integrating with IBM DB2
topics:
    - connections
    - custom-database
    - ibm-db2
contentType: reference
useCase:
    - customize-connections
---

# Login Script for IBM DB2

If you are integrating Auth0 with [IBM DB2](https://www.ibm.com/analytics/us/en/technology/db2/), you can use the following script for your login process.

```js
function login (email, password, callback) {
  var ibmdb = require("ibm_db");

  var credentials = "";
  credentials += "DRIVER={DB2};";
  credentials += "DATABASE=SAMPLE;";
  credentials += "HOSTNAME=<db2host_url>;";
  credentials += "UID=<user_name>;";
  credentials += "PWD=<password>;";
  credentials += "PORT=50001;";
  credentials += "PROTOCOL=TCPIP";

  ibmdb.open(credentials, function(err, conn) {
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
