# SLA

At an additional cost, Auth0 offers a __99.9%__ uptime service level agreement guarantee to subscribers enabling it in their subscription. Details on SLA below:


#### I. Definitions.
* "Downtime" is period of at least 1 minute in which there is more than a five percent authentication error rate, as measured by a 3rd party service monitoring service such as Pingdom. Downtime is measured based on the backend server side error rate.
* "Monthly Uptime Percentage" means total number of minutes in a calendar month minus the number of minutes of Downtime suffered in a calendar month (other than Permitted Downtime), divided by the total number of minutes in a calendar month.
* “Permitted Downtime” has the meaning set forth in Section III on this Schedule.
* “Non-Permitted Downtime” means any downtime that is not Permitted Downtime.
* “SLC” means service level credits (calculated as set forth below) that Auth0 will credit at the end of the Service term, at no charge to Subscriber. 

#### II.  Subscription Services Availability. 

During the Term of the Agreement, the Subscription Services will be operational and available to Subscriber at least 99.9% of the time in minutes in any calendar month (referred to as “Availability”). 

If Auth0 fails to meet its Availability service level due to circumstances not listed within one of the exception in Section III below, and if Subscriber meets its obligations under the Agreement, Subscriber shall be eligible to receive service level credits (“SLCs”) as set forth in Section IV below. 

Auth0 will publish a monthly report describing Service availability on [uptime.auth0.com](http://uptime.auth0.com/749624).

#### III. Exceptions. 

Subscriber shall receive no SLCs in connection with any unavailability of the Subscription Services caused by any one or more of the following (referred to as “Permitted Downtime”):

* Circumstances beyond Auth0’s reasonable control, including the Force Majeure Events;
* Defects in software or hardware owned or controlled by Subscriber causing downtime.

#### IV.  Service Level Credits.  Auth0 shall apply the following Service Level Credits:

| Monthly Uptime Percentage | Days of Service added to the end of the Service term, at no charge to Customer |
| --- | :---: |
| < 99.9% - >= 99.0% | 3 |
| < 99.0%  - >= 95.0% | 7 |
| < 95.0% | 15 |

Availability is calculated as follows: 

```
(Total Time) - (Non-Permitted Downtime) - (Permitted Downtime)
--------------------------------------------------------------  X 100
(Total Time) - (Permitted Downtime)
```

If you require a different SLA or a dedicated instance of Auth0 in your own IT environment [contact sales](https://auth0.com/?contact=true).
  
