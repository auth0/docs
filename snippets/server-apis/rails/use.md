```ruby
class SecuredResourceController < ApplicationController
  before_action :authenticate_user

  def index
    # etc...
  end

  # etc...
end
```
