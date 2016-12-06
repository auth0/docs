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
mkdir -p "./docs/"
shopt -s extglob
mv !(docs) docs
shopt -u extglob

git clone https://$GITHUB_USER_NAME:$GITHUB_ACCESS_TOKEN@github.com/auth0/auth0-docs.git auth0-docs-repo

echo "Moving docs site into root folder"
shopt -s dotglob
mv auth0-docs-repo/* .
rm -rf auth0-docs-repo
shopt -u dotglob

echo "Docs site successfully setup."
