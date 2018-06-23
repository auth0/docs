```php
// app/AppKernel.php

public function registerBundles()
{
    $bundles = array(
        // ...
        new Http\HttplugBundle\HttplugBundle(),
        new HWI\Bundle\OAuthBundle\HWIOAuthBundle(),
    );
}
```
