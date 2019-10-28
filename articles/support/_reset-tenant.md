## Reset tenants

To reset your tenant to its initial state, you can use the [Deploy CLI Tool](/extensions/deploy-cli). This creates a "clean" environment for development or test purposes and removes unwanted items.

1. Install the tool `a0deploy` by running the following in your command-line interface: `npm i -g auth0-deploy-cli`

2. Get a snapshot of the state you would like to preserve: `a0deploy export -c config.json -f yaml -o ./`

3. [Update the configuration file](/extensions/deploy-cli/guides/import-export-yaml-file#import-tenant-configuration) used for the import.

4. Update your tenant with its stored state: `a0deploy import -c config.json -f yaml -i ./tenant.yaml`