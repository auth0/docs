# #!/bin/bash
#

if [ -d "docs" ]; then
  pushd docs
  rm -rf .git
fi

if [ "$GIT_SSH_KEY" != "" ]; then
  echo "Cleaning up SSH config" >&1
  echo "" >&1

  # Now that npm has finished running, we shouldn't need the ssh key/config anymore.
  # Remove the files that we created.
  rm -f ~/.ssh/config
  rm -f ~/.ssh/deploy_key

  # Clear that sensitive key data from the environment
  export GIT_SSH_KEY=0
fi
