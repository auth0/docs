### Test your Hook implementation

Click the **Run** icon on the top right to test the Hook. Edit the parameters to specify the phone number to receive the message, and click the **Run** button.

### Activate the custom delivery provider

The Hook is now ready to send MFA codes. The last steps are to configure the Phone Message Factor to use the custom code and test the MFA flow.

1. Navigate to the [Multifactor Auth](${manage_url}/#/mfa) page in the [Auth0 Dashboard](${manage_url}/), and click the **Phone Message** factor box.

2. In the modal that appears, select **Custom** for the **Delivery Provider**, then make any adjustments you'd like to the templates. Click **Save** when complete, and close the modal.

3. Enable the Phone Message factor using the toggle switch.

### Test the MFA flow

Trigger an MFA flow and double check that everything works as intended. If you do not receive the message, please take a look at the [Hook Logs](/hooks/view-logs).