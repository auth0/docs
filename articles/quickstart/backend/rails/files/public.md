---
name: app/controllers/public_controller.rb
language: ruby
---

<!-- markdownlint-disable MD041 -->

```rb
# frozen_string_literal: true
class PublicController < ActionController::API
  def public
    render json: { message: 'You don\'t need to be authenticated to call this' }
  end
end
```
