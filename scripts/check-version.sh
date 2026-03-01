#!/bin/bash

# URL of the webpage
URL="https://auth0.com/docs"

# Slack webhook URL
WEBHOOK_URL="https://hooks.slack.com/triggers/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"

# Function to send Slack notification with the version as a data variable
send_slack_notification() {
    local version="$1"
    curl -s -X POST -H 'Content-type: application/json' --data "{
        \"version\": \"${version}\"
    }" "$WEBHOOK_URL"
}

# Directory to store the current version file
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VERSION_FILE="${SCRIPT_DIR}/tmp/current_version.txt"

# Ensure the tmp directory exists
mkdir -p "${SCRIPT_DIR}/tmp"

# Read the current version from the file, if it exists
if [ -f "$VERSION_FILE" ]; then
    current_version=$(cat "$VERSION_FILE")
else
    current_version=""
fi

# Bypass cache by using cache-control headers and appending a unique query string
cache_bypass=$(date +%s)
response=$(curl -s -H "Cache-Control: no-cache, no-store, must-revalidate" \
                    -H "Pragma: no-cache" \
                    -H "Expires: 0" \
                    "${URL}?nocache=${cache_bypass}")

# Print the response for debugging
echo "Response from URL: $response"

# Extract the new version from the response
new_version=$(echo "$response" | sed -n 's/.*"CONTENT_PACKAGE_VERSION":"\([^"]*\)".*/\1/p')

# Print the new version for debugging
echo "Extracted new version: $new_version"

# Compare with stored version
if [ "$new_version" != "$current_version" ]; then
    echo "Package version updated: $new_version"
    # Send Slack notification with the version
    send_slack_notification "$new_version"
    # Update the current version in the file
    echo "$new_version" > "$VERSION_FILE"
else
    echo "Package version has not changed."
fi