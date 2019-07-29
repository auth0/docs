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

On **July 30th 00:00 UTC**, Facebook connections that request the `context` field will fail, so Auth0 will stop requesting it for all connections at that time.

On April 30th [Facebook deprecated]( https://developers.facebook.com/docs/graph-api/changelog/4-30-2019-endpoint-deprecations) the use of the ‘Social Context’ field for new applications. Auth0 continued to request that field by default for Facebook connections created before April 30th 2019. You can make sure the field is not requested before July 30th by unchecking the ‘Social context’ field in the User Data connection section:
 
![facebook context](/media/articles/migrations/facebook-context.png)
 
Once you uncheck ‘Social context’, the profile data will not include the context field. The field has the following content:
 
```
"context": {
  "mutual_likes": {"data": [],"summary": {"total_count": 0}},
  "id": "dXNlcl9...UZD"
}
```
 
**Do I need to take any action?**
 
If you are not using the ‘context’ field in the Facebook profile returned by Auth0 in your application, then your application will keep working without changes. Otherwise, you will need to adjust your application code so it does not rely on it.
 
If you want to make sure your application is not affected on July 30th we recommend you to uncheck the ‘Social context’ field in the Facebook connection properties.
