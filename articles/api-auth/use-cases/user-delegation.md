---
sitemap: false
title: API Auth Use Case: User Delegation
url: /api-auth/use-cases/user-delegation
---

> Organizer is a company that allows users to manage their appointments, contacts and tasks. They are now planning to open up their API and allow third party applications to integrate with this API.
>
> The following companies have already integrated Organizer within their Apps:
>  - Calendar App: allows users to manage their Organizer appointments together with their other calendars in the application and will also allow users to create new appointments and invite their contacts
>  - My Todos: allows users to manage their todos in different platforms, now including the Organizer platform
>  - Text App: this next generation messaging platform allows you to easily communicate with your friends and can now get your contacts from Organizer to discover more friends
>
> Organizer decided to use a standards based approach instead of rolling their own authentication for their API. Using OAuth2, their services are represented as Resource Servers and their consumers are the Clients. These Clients will interact with Auth0, the Authorization Server to get an access token which they can use to talk to the Organizer API.
