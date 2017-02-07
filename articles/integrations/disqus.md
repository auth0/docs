---
title: Disqus
description: How to set up Single Sign On (SSO) integration with Disqus.
---

# Disqus

Disqus allows you to embed a discussion section onto your site where your users can enter comments and interact with you and your other visitors. By implementing a Single Sign On (SSO) integration between Disqus and Auth0, users that have signed in and authenticated via Auth0 can leave comments as themselves in your Disqus discussion section.

## Install and Configure Disqus

1. If you don't already have an account with Disqus, create one. If you do, log in.
2. Select the **I want to install Disqus on my site** box.

  ![](/disqus-on-site.png)

3. You will be directed to the *Create a new site* page. Provide your **Website Name** and your website's **Category**. When you've provided the requested information, click **Create Site** to continue.

  > You **Website Name** will become your unique Disqus URL. Make note of this URL, since it is required to configure your Auth0 Client.

  ![](/create-new-site.png)

4. Select your site's platform to receive customized instructions on installing Disqus and embedding its UI onto your site. If the platform you're using isn't listed, select **I don't see my platform, install manually with Universal Code** at the bottom of the page.

  ![](/platforms.png)

  When you have finished the installation process, click **Configure** to move on to the next step.

5. Configure your Disqus installation by providing the requested information about your website. When done (or if you want to complete this at a later time using the *Settings* page), click **Complete Setup**.

## Enable Single Sign On with Disqus

Once you have installed and configured your Disqus instance, you need to enable Single Sign On.

1. Navigate to the [Applications section of the Disqus API](https://disqus.com/api/applications/) to register your application.
2. To use SSO, you will need to 
