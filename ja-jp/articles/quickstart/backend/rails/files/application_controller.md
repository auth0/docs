---
name: app/controllers/application_controller.rb
language: ruby
---

<!-- markdownlint-disable MD041 -->

```ruby
# frozen_string_literal: true

class ApplicationController < ActionController::API
  include Secured
end
```