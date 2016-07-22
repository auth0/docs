---
title: Linking Accounts
description: This tutorial will show you how to integrate Auth0 with ReactJS to link accounts.
---

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:
* NodeJS 5.2.0
* NPM 3.3.12
* React 15.0.2
:::

<%= include('../../_includes/_github', {
  link: 'https://github.com/auth0-samples/auth0-react-sample/tree/master/05-Linking-Accounts',
}) %>_

In some cases, there could be need for you to link multiple accounts. One very common situation is when a user signed up with email and password which provides very little information about the user. You can urge the user to link their account to an OAuth provider like Facebook or Google. In this article you'll see how to update the application created in [User profile](/quickstart/spa/react/03-user-profile) to allow the user to link or unlink other OAuth provides to his account.

## 1. Show Linked Accounts Information

User's profile contains an array of identities which is made of profile information from other providers. You can see this by accessing the [Auth0 users page](${uiURL}/#/users), selecting a user and scrolling down to the identities. This is what it looks like after linking Gmail:

![User identities](/media/articles/users/user-identities-linked.png)

So if you fetch the profile where there are linked the accounts, you will have the same information there. In order to display them properly, we'll be creating two new components: `LinkedAccountsList` to render a list of linked accounts and `LinkedAccountItem` to render an html row for each identity. Take a look at the code:

```javascript
/* ===== ./src/components/LinkedAccount/LinkedAccountItem.js ===== */
import React, { PropTypes as T } from 'react'
import {ListGroupItem, Button} from 'react-bootstrap'
import AuthService from 'utils/AuthService'
import styles from './styles.module.css'

export class LinkedAccountItem extends React.Component {
  static propTypes = {
    auth: T.instanceOf(AuthService),
    profile: T.object,
    identity: T.object
  }

  render(){
    const { identity } = this.props
    const profileName = identity.profileData ? identity.profileData.name : 'Main'

    return (
      <ListGroupItem header={profileName}>
        {identity.connection}
      </ListGroupItem>
    )
  }
}

export default LinkedAccountItem;
```

```javascript
/* ===== ./src/components/LinkedAccount/LinkedAccountsList.js ===== */
import React, { PropTypes as T } from 'react'
import {ListGroup, Button} from 'react-bootstrap'
import LinkedAccountItem from './LinkedAccountItem'
import AuthService from 'utils/AuthService'
import styles from './styles.module.css'

export class LinkedAccountsList extends React.Component {
  static propTypes = {
    auth: T.instanceOf(AuthService),
    profile: T.object
  }

  render(){
    const { profile, auth } = this.props
    let items = []
    if (profile && profile.identities) {
      items = profile.identities.map(identity => {
        return (<LinkedAccountItem {...this.props} identity={identity} />)
      })
    }

    return (
      <div className={styles.root}>
        <h3>Linked Accounts</h3>
        <ListGroup>{items}</ListGroup>
      </div>
    )
  }
}

export default LinkedAccountsList;
```

Basically `LinkedAccountsList` renders a container and then one `LinkedAccountItem` for each identity in current user profile. It's expecting `profile` and `auth` as props, which we'll the sent by its parent, the `Home` component:

```javascript
/* ===== ./src/views/Main/Home/Home.js ===== */
import React, { PropTypes as T } from 'react'
import {Row, Col, Thumbnail, Button} from 'react-bootstrap'
import AuthService from 'utils/AuthService'
import LinkedAccountsList from 'components/LinkedAccount/LinkedAccountsList'
import styles from './styles.module.css'

export class Home extends React.Component {
  static contextTypes = {
    router: T.object
  }

  static propTypes = {
    auth: T.instanceOf(AuthService)
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      profile: props.auth.getProfile()
    }
    props.auth.on('profile_updated', (newProfile) => {
      this.setState({profile: newProfile})
    })
  }

  logout(){
    this.props.auth.logout()
    this.context.router.push('/login');
  }

  render(){
    const { profile } = this.state
    return (
      <div>
        <h2 className={styles.pageTitle}>Home</h2>
        <Row>
          <Col md={2} mdOffset={4} className={styles.pane}>
            <Thumbnail src={profile.picture}>
              <p>Welcome {profile.name}!</p>
              <p>
                <Button bsStyle="default" onClick={this.logout.bind(this)}>Logout</Button>
              </p>
            </Thumbnail>
          </Col>
          <Col md={4} className={styles.pane}>
            <LinkedAccountsList profile={profile} auth={this.props.auth}></LinkedAccountsList>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Home;
```

Notice that `Home` is updated to render a left column with some profile info like name, avatar and a button to `logout`. The right columns is reserved to render the `LinkedAccountsList`. If you run the application you should see the new home page after a successful login, and the __Linked Accounts__ list shows only the main account. In the next topic we show how to add a button to link an account from an external provider.

## 2. Linking Accounts

To link accounts you basically need to hit the [link user account endpoint](/api/management/v2#!/Users/post_identities) in auth0 api. To complete the request, the primary auth0 JWT (the token provided when the user login), the user id (could be taken from the JWT or from profile api) and the JWT of the account you want to link (secondary account) should be provided.

As you need to do a second login to get the secondary account JWT, we will use another instance of `Auth0Lock`, this time managed by a new helper class we're creating in `src/utils/LinkAccountService.js`.

```javascript
/* ===== ./src/utils/LinkAccountService.js ===== */
import Auth0Lock from 'auth0-lock'

export default class LinkAccountService {
  constructor(auth) {
    this.auth = auth
    // the Auth0Lock instance to show signin window to link a provider
    this.lock = new Auth0Lock(auth.clientId, auth.domain, {
      auth: {params: {state: 'linking'}}, // state to identify in the callback
      allowedConnections: ['facebook', 'google-oauth2'],
      languageDictionary: { // allows to override dictionary entries
        title: 'Link with:' // new window title
      }
    })
    this.link = this.link.bind(this)
  }

  link(){
    // Call the show method to display the authentication window.
    this.lock.show()
  }
}
```

`AuthService` continues responsible to listen to `authenticated` events, but we need a way to determine if the callback was trigged by a regular sign in process or by a linking. That's why in the code above you see the new `Auth0Lock` instance is receiving specific options, in that case `auth: {params: {state: 'linking'}}`. For more information about supported options please
[check the documentation](https://github.com/auth0/lock/tree/v10.0.0-rc.1#authentication-options). Next you see the updated `AuthService` class where `_doAuthentication` callback is checking for `linking` status and calling `LinkAccount` method instead.

```javascript
/* ===== ./src/utils/AuthService.js ===== */
import { EventEmitter } from 'events'
import Auth0Lock from 'auth0-lock'

export default class AuthService extends EventEmitter {
  constructor(clientId, domain) {
    super()
    this.clientId = clientId
    this.domain = domain
    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain)
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this))
    // Add callback for lock `authorization_error` event
    this.lock.on('authorization_error', this._authorizationError.bind(this))
    // binds login functions to keep this context
    this.login = this.login.bind(this)
  }

  _doAuthentication(authResult){
    authResult.state = authResult.state || '' //making sure state exists
    if (authResult.state.includes('linking')){
      this.linkAccount(authResult.idToken) // linkAccount when state is linking
    } else {
      // Otherwise saves the user token
      this.setToken(authResult.idToken)
      // Async loads the user profile data
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          console.log('Error loading the Profile', error)
        } else {
          this.setProfile(profile)
        }
      })
    }
  }

  ... // omitting methods

  fetchApi(url, options){
    // performs api calls sending the required authentication headers
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    }

    const userId = this.getProfile().user_id
    return fetch(`<%= "https://${this.domain}/api/v2/users/${userId}/${url}" %>`, {
      headers,
      ...options
    })
    .then(response => response.json())
  }

  linkAccount(token){
    // prepares api request body data
    const data = {
      link_with: token
    }
    // sends a post to auth0 api to create a new identity
    return this.fetchApi('identities', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    .then(response => {
      const profile = this.getProfile()
      if (response.error){
        alert(response.message)
      } else {
        // updates profile identities
        this.setProfile({...profile, identities: response})
      }
    })
  }
}
```

The code introduces also two new methods: `fetchApi` to send requests to auth0 users api with the required headers and parsing the requests to json. Finally, `linkAccount` uses `fetchApi` to send a _POST_ request and create a new identity in user account, updating the stored profile after a successful response. For more details, check the [user identities endpoint documentation](/api/management/v2#!/Users/post_identities).

Now you're able to update the `LinkedAccountsList` component to render a __Link Account__ button using the `LinkAccountService.link` method:

```javascript
/* ===== ./src/components/LinkedAccount/LinkedAccountsList.js ===== */
import React, { PropTypes as T } from 'react'
import LinkAccountService from 'utils/LinkAccountService'
...

export class LinkedAccountsList extends React.Component {
  ... //omitting some code

  render(){
    const { profile, auth } = this.props
    const linker = new LinkAccountService(auth) // initializing the new helper
    let items = []
    if (profile) {
      items = profile.identities.map(identity => {
        return (<LinkedAccountItem {...this.props} identity={identity} />)
      })
    }

    return (
      <div className={styles.root}>
        <h3>Linked Accounts</h3>
        <ListGroup>{items}</ListGroup>
        // the button to call auth0lock and show sign in window
        <Button onClick={linker.link} bsStyle="primary">Link Account</Button>
      </div>
    )
  }
}

export default LinkedAccountsList;
```

Running the application, you'are now able to click on __Link Account__ button in the user home page and link a _facebook_ or _google_ account to it. After the successful link, the new identity is showed in the __Linked Accounts__ list.

## 3. Un-Linking Accounts

You can also dissociate a linked account by just hitting the [unlink user account endpoint](/api/management/v2#!/Users/delete_provider_by_user_id) in auth0 api. You need to send the primary `user_id` and the `provider/user_id` of the identity you want to unlink. Let's update `AuthService` to, besides a `LinkAccount` method, provide also an `UnlinkAccount` method:

```javascript
/* ===== ./src/utils/AuthService.js ===== */
import { EventEmitter } from 'events'
import Auth0Lock from 'auth0-lock'

export default class AuthService extends EventEmitter {
  ... //omitting some code
  unlinkAccount(identity){
    // sends a delete request to unlink the account identity
    this.fetchApi(`<%= "identities/${identity.provider}/${identity.user_id}" %>`, {
      method: 'DELETE'
    })
    .then(response => {
      const profile = this.getProfile()
      if (response.error){
        alert(response.message)
      } else {
        // updates profile identities
        this.setProfile({...profile, identities: response})
      }
    })
  }
}
```

The method `unlinkAccount` receives the identity object, sending a `DELETE` request to the identities endpoint and, in case of success, updates the stored profile with the current identities list. As `setProfile` emits the event `profile_updated`, the view components will be properly updated.

But, we still need to update the `LinkedAccountItem` component to show an __unlink__ button, as showed below:

```javascript
/* ===== ./src/components/LinkedAccount/LinkedAccountItem.js ===== */
import React, { PropTypes as T } from 'react'
import {ListGroupItem, Button} from 'react-bootstrap'
import AuthService from 'utils/AuthService'
import styles from './styles.module.css'

export class LinkedAccountItem extends React.Component {
  ...

  unlink(identity){
    // shows a basic confirmation window, and calls auth0 unlink api
    if (window.confirm(`Are you sure you want to unlink <%= "${identity.connection}" %>?`)) {
      this.props.auth.unlinkAccount(identity)
    }
  }

  renderUnlink(){
    // renders the unlink button, excluding the main identify row, which cannot be removed
    const { profile, identity } = this.props
    if (profile.user_id != identity.provider + '|' + identity.user_id){
      return (
        <Button
            onClick={this.unlink.bind(this, identity)}
            className={styles.unlink}>
            unlink
          </Button>
      )
    }
  }

  render(){
    const { identity } = this.props
    const profileName = identity.profileData ? identity.profileData.name : 'Main'

    return (
      <ListGroupItem header={profileName}>
        {identity.connection}
        {this.renderUnlink()}
      </ListGroupItem>
    )
  }
}

export default LinkedAccountItem;
```

When you run the application you see the __unlink__ button for each linked account.

## 4. All Done!

You have completed the implementation of linking and unlinking accounts in Auth0 user profile in your ReactJS project.
