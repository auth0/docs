---
name: app/controllers/private_controller.rb
language: ruby
---

<!-- markdownlint-disable MD041 -->

```rb
# frozen_string_literal: true
class PrivateController < ApplicationController
  before_action :authorize

  def private
    render json: { message: 'Hello from a private endpoint! You need to be authenticated to see this.' }
  end

  def private_scoped
    validate_permissions ['read:messages'] do
      render json: { message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.' }
    end
  end
end
```
