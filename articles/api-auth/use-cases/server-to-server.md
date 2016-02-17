---
sitemap: false
title: API Auth Use Case: Server to Server Authentication
url: /api-auth/use-cases/server-to-server
---

> World Mappers is a company that has been collecting geospatial data for many years and they are now planning to expose this data to third parties through new services that offer geocoding and route planning.
>
> Their customers will be able to register and request access to one or more of these services. The customers will for example use these services to find the closest restaurant to your current location, to find a taxi or even for route planning in an application managing drivers and deliveries.
>
> World Mappers decided to use a standards based approach instead of rolling their own authentication for their API. Using OAuth2, their services are represented as Resource Owners and their consumers are the Clients. These Clients will interact with Auth0, the Authorization Server to get an access token which they can use to talk to the World Mapper API.
