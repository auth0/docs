---
name: app/controllers/private_controller.rb
language: powershell
---
    
```powershell
    # frozen_string_literal: true
    class PublicController < ApplicationController
      def public
render json: { message: 'All good. You don\'t need to be authenticated to call this.' }
      end
end
```
