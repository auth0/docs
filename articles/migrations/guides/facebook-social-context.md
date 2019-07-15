---
title: 'Context' Facebook Field Deprecation
description: Facebook is removing access to the 'social context' field from their profile
toc: true
contentType:
  - how-to
useCase:
  - add-login
  - migrate
---
# 'Context' Facebook Field Deprecation

On April 30th [Facebook deprecated]( https://developers.facebook.com/docs/graph-api/changelog/4-30-2019-endpoint-deprecations) the use of the ‘Social Context’ field for new applications. 
 
For Facebook connections created before April 30th 2019, Auth0 requests that field by default. You can make sure the field is not requested by unchecking the ‘Social context’ field in the User Data connection section:
 
![facebook context](/media/articles/migrations/facebook-context.png)
 
Once you uncheck ‘Social context’, the profile data will not include the context field, which has the following content:
 
```
"context": {
  "mutual_likes": {"data": [],"summary": {"total_count": 0}},
  "id": "dXNlcl9...UZD"
}
```
 
On July 30th 00:00 UTC, Facebook connections that request the field will fail, so Auth0 will stop requesting it for all connections.
 
**Do I need to take any action?**
 
If you are not using the ‘context’ field in the Facebook profile returned by Auth0 in your application, then your application will keep working without changes.
 
If you are using it, you’ll need to adjust the code so it does not rely on it.
 
If you want to make sure your application is not affected on July 30th we recommend you to uncheck the ‘Social context’ field in the Facebook connection properties.

