---
title: Use Auth0 Dashboard Templates with Splunk
description: Learn about how to use the Auth0 Splunk App to visualize your traffic
toc: false
topics:
 - logs
 - streams
 - event-streams
contentType: how-to
---

# Use the Auth0 App for Splunk

Auth0 has created the [Auth0 App for Splunk](https://link.com) to visualize the data from your Auth0 tenant in Splunk. These visualizations allow you to monitor the health of the login traffic for a tenant. The App allows you to use recommended aggregations from Auth0, or to use them as a starting point to create your own custom visualizations.


# Prerequisites

1. [Set up Log Streaming to Splunk](INSERT LINK HERE)

# Installing the Auth0 App for Splunk

1. Navigate to your Splunk homepage.
2. In the **Apps** sidebar on the left of the page click on the **+ Find More Apps** option.
3. In the **Find apps by keyword, technology** search bar, type in `auth0`.
4. Click the green **Install** button on the **Auth0 App for Splunk** card that shows up.
5. Enter your username and password, accept the terms and conditions, and click **Login and Install**.
6. On the **Complete** widget that results, click on the **Open the App** button. 
7. You will now see the Auth0 dashboard with default filters applied.

![Auth0 App for Splunk](/media/articles/logs/splunk-dashboard.png)

# Dashboard Filters

The following filters exist to allow you to drill down into the specifics of your traffic. Note: Leaving them as `*` will search across all values for that field.

| Filter | Description |
|---------|-------------|
| Time Range | A Splunk time input element that lets you choose the duration over which to view events. |
| Index | The Splunk `index` you want to search within. While creating your `Http Event Collector Token`, if you specified a particular index, you may use this value from the dropdown. |
| HTTP Source | The Splunk `source` name.  |
| IP | The IP address whose traffic you want to inspect. This maps to `data.ip` in the log event. |
| Client | The client whose traffic you want to inspect. This maps to `data.client_name` in the log event. |
| Country | The country whose traffic you want to inspect. This is a field obtained using the `iplocation data.ip` search command in the query. It results in a `Country` field being added to each log event. |
| Username | The email address whose login traffic you want to inspect. This maps to `data.user_name` in the log event.  |




