---
title: Linking Accounts
description: This tutorial demonstrates how to integrate Auth0 with ReactJS to link accounts.
budicon: 345
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-react-sample',
  path: '05-Linking-Accounts',
  requirements: [
    'React 15.3'
  ]
}) %>

<%= include('../../_includes/_linking_accounts') %>

## 1. Show Linked Accounts Information

The user profile contains an array of identities which consists of profile information from all linked providers. You can verify this by accessing the Auth0 [Users page](${manage_url}/#/users), selecting a user and scrolling down to `identities` under **Identity Provider Attributes**.

This is how a profile looks after linking to Gmail:

![User identities](/media/articles/users/user-identities-linked.png)

If you fetch a profile containing linked accounts, you will have all this information available.

To display this data, create two new components: `LinkedAccountsList` (to render a list of linked accounts) and `LinkedAccountItem` (to render an html row for each identity).

```javascript
// src/components/LinkedAccount/LinkedAccountItem.js

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

  render() {
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
// src/components/LinkedAccount/LinkedAccountsList.js

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

  render() {
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

`LinkedAccountsList` renders a container and one `LinkedAccountItem` for each identity in the user profile. It's expecting `profile` and `auth` as props, which will be sent by its parent, the `Home` component:

```javascript
// src/views/Main/Home/Home.js

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

  logout() {
    this.props.auth.logout()
    this.context.router.push('/login');
  }

  render() {
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

Note that `Home.js` has been updated to render a left column with profile information such as name and avatar, and a **Logout** button. The `LinkedAccountsList` is rendered in right column.

If you run the application, you should see the new home page after a successful login. The __Linked Accounts__ list will only show the main account. The next section shows how to add a button to link an account from another provider.

## 2. Linking Accounts

To link accounts, call the [Link a user account](/api/management/v2#!/Users/post_identities) Auth0 API endpoint. To complete the request, you must provide the primary account Auth0 JWT (the token provided when the user logged in), the user id (from the JWT or the profile API) and the JWT of the account you want to link (secondary account).

Since you need to do a second login to get the secondary account JWT, you will need a second `Auth0Lock` instance managed by a new helper class  created in `src/utils/LinkAccountService.js`:

```javascript
// src/utils/LinkAccountService.js

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

  link() {
    // Call the show method to display the authentication window.
    this.lock.show()
  }
}
```

`AuthService` continues to listen to `authenticated` events, but you will need to determine if a callback was triggered by the regular sign in process or the linking one.

In the code above, the new `Auth0Lock` instance receives specific options, in this case `auth: {params: {state: 'linking'}}`. (For more information, see:
[Authentication Options](/libraries/lock/v10/customization#authentication-options).)

In the updated `AuthService` class, the `_doAuthentication` callback checks for the `linking` state and calls the `LinkAccount` method if present.

```javascript
// src/utils/AuthService.js

import { EventEmitter } from 'events'
import Auth0Lock from 'auth0-lock'
import { browserHistory } from 'react-router'

export default class AuthService extends EventEmitter {
  constructor(clientId, domain) {
    super()
    this.clientId = clientId
    this.domain = domain
    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain, {
      auth: {
        redirectUrl: 'http://localhost:3000/login',
        responseType: 'token'
      }
    })
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this))
    // Add callback for lock `authorization_error` event
    this.lock.on('authorization_error', this._authorizationError.bind(this))
    // binds login functions to keep this context
    this.login = this.login.bind(this)
  }

  _doAuthentication(authResult) {
    authResult.state = authResult.state || '' //making sure state exists
    if (authResult.state.includes('linking')) {
      this.linkAccount(authResult.idToken) // linkAccount when state is linking
    } else {
      // Otherwise saves the user token
      this.setToken(authResult.idToken)
      // navigate to the home route
      browserHistory.replace('/home')
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

  // ...

  fetchApi(url, options) {
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

  linkAccount(token) {
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
      if (response.error) {
        alert(response.message)
      } else {
        // updates profile identities
        this.setProfile({...profile, identities: response})
      }
    })
  }
}
```

This code also introduces two new methods: `fetchApi` (which constructs a request to the Auth0 API with the required headers and parses the response to JSON) and `linkAccount` (which uses `fetchApi` to send a _POST_ request to create a new identity in the user account, and updates the stored profile after a successful response).

**NOTE**: For more details, see the [Link a user account](/api/management/v2#!/Users/post_identities) endpoint documentation.

Now you can update the `LinkedAccountsList` component to render a __Link Account__ button using the `LinkAccountService.link` method:

```javascript
// src/components/LinkedAccount/LinkedAccountsList.js

import React, { PropTypes as T } from 'react'
import LinkAccountService from 'utils/LinkAccountService'

export class LinkedAccountsList extends React.Component {

  render() {
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

Now, if you run the application, you will be able to click the __Link Account__ button on the user home page to link a Facebook or Google account. After a successful link, the new identity will be displayed in the __Linked Accounts__ list.

## 3. Un-Linking Accounts

You can dissociate a linked account by calling the [Delete a linked user account](/api/management/v2#!/Users/delete_provider_by_user_id) Auth0 API endpoint.

You will need to include the primary account `user_id`, and the `provider/user_id` of the identity you want to unlink.

Update `AuthService` to provide an `UnlinkAccount` method:

```javascript
// src/utils/AuthService.js

import { EventEmitter } from 'events'
import Auth0Lock from 'auth0-lock'

export default class AuthService extends EventEmitter {
  // ...
  unlinkAccount(identity) {
    // sends a delete request to unlink the account identity
    this.fetchApi(`<%= "identities/${identity.provider}/${identity.user_id}" %>`, {
      method: 'DELETE'
    })
    .then(response => {
      const profile = this.getProfile()
      if (response.error) {
        alert(response.message)
      } else {
        // updates profile identities
        this.setProfile({...profile, identities: response})
      }
    })
  }
}
```

The `unlinkAccount` method takes an identity object, sends a `DELETE` request to the identities endpoint and, upon success, updates the stored profile with the current identities list. Since `setProfile` emits the `profile_updated` event, the view components will be properly updated.

Lastly, update the `LinkedAccountItem` component to include an __unlink__ button:

```javascript
// src/components/LinkedAccount/LinkedAccountItem.js
import React, { PropTypes as T } from 'react'
import {ListGroupItem, Button} from 'react-bootstrap'
import AuthService from 'utils/AuthService'
import styles from './styles.module.css'

export class LinkedAccountItem extends React.Component {
  // ...
  unlink(identity) {
    // shows a basic confirmation window, and calls auth0 unlink api
    if (window.confirm(`Are you sure you want to unlink <%= "${identity.connection}" %>?`)) {
      this.props.auth.unlinkAccount(identity)
    }
  }

  renderUnlink() {
    // renders the unlink button, excluding the main identify row, which cannot be removed
    const { profile, identity } = this.props
    if (profile.user_id != identity.provider + '|' + identity.user_id) {
      return (
        <Button
            onClick={this.unlink.bind(this, identity)}
            className={styles.unlink}>
            unlink
          </Button>
      )
    }
  }

  render() {
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

When you run the application, you will see an __unlink__ button for each linked account.

