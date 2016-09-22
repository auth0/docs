```java
   @RequestMapping(value="/portal/home", method = RequestMethod.GET)
   protected String home(final Map<String, Object> model, final Principal principal) {
       logger.info("Home page");
       final Auth0User user = (Auth0User) principal;
       logger.info("Principal name: "  user.getName());
       model.put("user", user);
       return "home";
   }
```