Prior to launch, you should have completed all the testing that applies to your environment. 

<%= include('../../_includes/_qa/_introduction.md', { platform: 'b2c' }) %>

### Unit testing

<%= include('../../_includes/_qa/_unit-testing.md', { platform: 'b2c' }) %>

### Integration testing

<%= include('../../_includes/_qa/_integration-testing.md', { platform: 'b2c' }) %>

### Mock Testing

<%= include('../../_includes/_qa/_mock-testing.md', { platform: 'b2c' }) %>

### Pen testing (optional)

If you will be conducting penetration tests, you should be aware of Auth0’s [penetration testing policy](/policies/penetration-testing) and abide by it. Penetration tests require advance notice to Auth0 so that your tests are not mistaken for malicious activity and shut down.

### Load testing (optional)

If you will be conducting load tests, you should be aware of Auth0’s [load testing policy](/policies/load-testing) and abide by it. Load tests require advance notice to Auth0. In planning your load testing, you will also need to be aware of Auth0’s [API rate limits](/policies/rate-limits).

<%= include('../../_includes/_qa/_load-testing.md', { platform: 'b2c' }) %>
