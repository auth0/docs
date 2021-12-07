#!/usr/bin/env bash
# Generates an SSH config file for connections if a config var exists.

if [ "$GIT_SSH_KEY" != "" ]; then
  echo "Detected SSH key for git. Adding SSH config" >&1
  echo "" >&1

  # Ensure we have an ssh folder
  if [ ! -d ~/.ssh ]; then
    mkdir -p ~/.ssh
    chmod 700 ~/.ssh
  fi

  # Load the private key into a file.
  echo $GIT_SSH_KEY | base64 --decode > ~/.ssh/deploy_key

  # Change the permissions on the file to
  # be read-only for this user.
  chmod 400 ~/.ssh/deploy_key

  # Setup the ssh config file.
  echo -e "Host github.com\n"\
          " IdentityFile ~/.ssh/deploy_key\n"\
          " IdentitiesOnly yes\n"\
          " UserKnownHostsFile=/dev/null\n"\
          " StrictHostKeyChecking no"\
          > ~/.ssh/config
fi


echo "Moving content into docs folder"
rm -rf "./docs/"
mkdir -p "./docs/"
shopt -s extglob
mv !(docs) docs
shopt -u extglob

git clone ssh://git@github.com/auth0/auth0-docs.git auth0-docs-repo

echo "Moving docs site into root folder"
shopt -s dotglob
rm -rf "./.github"
mv auth0-docs-repo/* .
rm -rf auth0-docs-repo
shopt -u dotglob

commitHash=$(git rev-parse --short HEAD)
echo "Docs site successfully setup. auth0-docs commit: $commitHash"

# Setup Artifactory npm registry and permissions
if [ ! -z "$NPM_REGISTRY_TOKEN" ] &&  [ ! -z "$NPM_REGISTRY_USER" ] && [ ! -z "$NPM_REGISTRY_URL" ] && [ ! -z "$NPM_REGISTRY_AUTH" ]; then
  echo "Detected NPM Registry. Adding Artifactory config..." >&1
  echo "registry=$NPM_REGISTRY_URL" > ~/.npmrc
  curl -s -u $NPM_REGISTRY_USER:$NPM_REGISTRY_TOKEN $NPM_REGISTRY_AUTH >> ~/.npmrc
  success=$?
  if [ $success -ne 0 ]; then
    echo "... failed!"
  else
    echo "... done."
  fi
  echo "" >&1
fi
