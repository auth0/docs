```ruby
class SecuredResourceController < ApplicationController
  before_action :authenticate

  def index
    # etc...
  end

  # etc...
end
```
