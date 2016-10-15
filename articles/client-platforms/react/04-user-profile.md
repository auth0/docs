---
title: User Profile
description: This tutorial demonstrates how to integrate Auth0 with ReactJS to authenticate and fetch/show profile information
budicon: 292
---

<%= include('../../_includes/_package2', {
  org: 'auth0-samples',
  repo: 'auth0-react-sample',
  path: '04-User-Profile'
}) %>

The [Login step](/quickstart/spa/react/01-login) of this tutorial explains how to use Auth0 Lock to show a login window and authenticate a user and how to protect routes by making them available only for authenticated users.

This step demonstrates how to retrieve and show user profile information.

## 1. Create the AuthService class

The best way to have authentication utilities available across your application is to create a helper class. Then you can share an instance of this class by passing it to the React Component as a prop.

First, you will create the `AuthService` helper class to encapsulate the login functionality and save it inside the `src/utils` folder as `AuthService.js`.

Inside this class, you will create an `Auth0Lock` instance that receives your Auth0 credentials and an options object. (For a list of  available options, see: [Lock: User configurable options](/libraries/lock/v10/customization)). Instead of hard-coding your credentials in this class, they are passed from the `AuthService` constructor parameters to the `Auth0Lock` instance.

Then, with the `Auth0Lock` instance, you can hook a callback for the `authenticated` event. This event will be triggered after every successful login, passing the user authentication token (`idToken`) as a parameter. Then the `setToken` method stores the `idToken` value in `localStorage`.

```javascript
/* ===== ./src/utils/AuthService.js ===== */
import Auth0Lock from 'auth0-lock'

export default class AuthService {
  constructor(clientId, domain) {
    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain, {})
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this))
    // binds login functions to keep this context
    this.login = this.login.bind(this)
  }

  _doAuthentication(authResult){
    // Saves the user token
    this.setToken(authResult.idToken)
  }

  login() {
    // Call the show method to display the widget.
    this.lock.show()
  }

  loggedIn(){
    // Checks if there is a saved token and it's still valid
    return !!this.getToken()
  }

  setToken(idToken){
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken)
  }

  getToken(){
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token')
  }

  logout(){
    // Clear user token from localStorage
    localStorage.removeItem('id_token');
  }
}
```

The other helper methods shown above include: `login` (to call `lock.show()` and display the login widget), `logout` (to remove the `localStorage` data), and `loggedIn` (that checks if an `idToken` exists and returns a boolean).

## 2. Request User Profile Data

To fetch user profile information, call the `lock.getProfile` function, specifying the token and a callback to process the response.

Below you can see the `getProfile` code that has been added to fetch the user profile after successful authentication and store the response in `localStorage`. Also, since the profile data request is asynchronous, `EventEmitter` has been added to allow sending notifications after a profile update.

```javascript
/* ===== ./src/utils/AuthService.js ===== */
import { EventEmitter } from 'events'
import Auth0Lock from 'auth0-lock'

export default class AuthService extends EventEmitter {
  constructor(clientId, domain) {
    super()
    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain, {})
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this))
    // Add callback for lock `authorization_error` event
    this.lock.on('authorization_error', this._authorizationError.bind(this))
    // binds login functions to keep this context
    this.login = this.login.bind(this)
  }

  _doAuthentication(authResult){
    // Saves the user token
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

  ... // omitting some methods to keep it short

  setProfile(profile){
    // Saves profile data to localStorage
    localStorage.setItem('profile', JSON.stringify(profile))
    // Triggers profile_updated event to update the UI
    this.emit('profile_updated', profile)
  }

  getProfile(){
    // Retrieves the profile data from localStorage
    const profile = localStorage.getItem('profile')
    return profile ? JSON.parse(localStorage.profile) : {}
  }

  logout(){
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
  }
}
```

## 3. Show User Profile Data in Home

For example, instead of displaying only a logout button, you can update the Home view component to render user profile info:

```javascript
/* ===== ./src/views/Main/Home/Home.js ===== */
import React, { PropTypes as T } from 'react'
import {Button} from 'react-bootstrap'
import AuthService from 'utils/AuthService'
import ProfileDetails from 'components/Profile/ProfileDetails'
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
    // listen to profile_updated events to update internal state
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
      <div className={styles.root}>
        <h2>Home</h2>
        <ProfileDetails profile={profile}></ProfileDetails>
        <Button onClick={this.logout.bind(this)}>Logout</Button>
      </div>
    )
  }
}

export default Home;
```

Home is now listening for `profile_updated` events from the `AuthService` instance, which keeps profile data in its internal state. Now, each time user profile data is updated, the component state is changed, which updates the props sent to the `ProfileDetails` component.

The `Profile` component is still missing. Create a new `ProfileDetails.js` file in `src/components/Profile/` with the following:

```javascript
/* ===== ./src/components/Profile/ProfileDetails.js ===== */
import React, { PropTypes as T } from 'react'
import {Row, Col, Image} from 'react-bootstrap'

export class ProfileDetails extends React.Component {
  static propTypes = {
    profile: T.object
  }

  render(){
    const { profile } = this.props
    return (
      <Row>
        <Col md={2} mdOffset={4}>
          <Image src={profile.picture} circle/>
        </Col>
        <Col md={6}>
          <h3>Profile</h3>
          <p><strong>Name: </strong> {profile.name}</p>
          <p><strong>Email: </strong> {profile.email}</p>
          <p><strong>Nickname: </strong> {profile.nickname}</p>
          <p><strong>Created At: </strong> {profile.created_at}</p>
          <p><strong>Updated At: </strong> {profile.updated_at}</p>
        </Col>
      </Row>
    )
  }
}

export default ProfileDetails;
```

Now, after authentication, the home page will display the user's avatar and info.

## 4. Custom Sign Up Fields

If you need extra fields on user sign up, you can add the `additionalSignUpFields` key to the Lock options parameter. For more information, see: [additionalSignUpFields](/libraries/lock/v10/customization#additionalsignupfields-array-).

As an example, the `AuthService` constructor can be modified to request a user's `address`:

```javascript
/* ===== ./src/utils/AuthService.js ===== */
import Auth0Lock from 'auth0-lock'

export default class AuthService extends EventEmitter {
  constructor(clientId, domain) {
    super()
    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain, {
      additionalSignUpFields: [{
        name: "address",                              // required
        placeholder: "enter your address",            // required
        icon: "https://example.com/address_icon.png", // optional
        validator: function(value) {                  // optional
          // only accept addresses with more than 10 chars
          return value.length > 10;
        }
      }]
    })
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this))
    // Add callback for lock `authorization_error` event
    this.lock.on('authorization_error', this._authorizationError.bind(this))
    // binds login functions to keep this context
    this.login = this.login.bind(this)
  }
  ...
}
```

Each `additionalSignUpFields` value is saved to the profile in the `user_metadata` attribute.

Now, update the `Profile` component to display the address:

```javascript
/* ===== ./src/components/Profile/ProfileDetails.js ===== */
...
export class ProfileDetails extends React.Component {
  ...
  render(){
    const { profile } = this.props
    const { address } = profile.user_metadata || {} // new address field
    return (
      <Row className={s.root}>
        <Col md={2} mdOffset={4}>
          <Image src={profile.picture} circle className={s.avatar} />
        </Col>
        <Col md={6}>
          <h3>Profile</h3>
          <p><strong>Name: </strong> {profile.name}</p>
          <p><strong>Email: </strong> {profile.email}</p>
          <p><strong>Nickname: </strong> {profile.nickname}</p>
          <p><strong>Address: </strong> {address}</p>
          <p><strong>Created At: </strong> {profile.created_at}</p>
          <p><strong>Updated At: </strong> {profile.updated_at}</p>
        </Col>
      </Row>
    )
  }
}
```

## 5. Update User Profile

<%= include('../_includes/_profile-metadata-explanation') %>

To update the user profile, call the [Update a user](/api/management/v2#!/Users/patch_users_by_id) endpoint with the new profile values.

Update the `AuthService` class to add a new `updateProfile` method to make the http request with the correct request headers using the [fetch standard](https://fetch.spec.whatwg.org/).

```javascript
/* ===== ./src/utils/AuthService.js ===== */
export default class AuthService extends EventEmitter {
  // a small constructor change to make domain accessible in other methods
  constructor(clientId, domain) {
    super()
    this.domain = domain // setting domain parameter as an instance attribute
    ...
  }

  // the new updateProfile
  updateProfile(userId, data){
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken() //setting authorization header
    }
    // making the PATCH http request to auth0 api
    return fetch(`https://<%= "${this.domain}" %>/api/v2/users/<%="${userId}"%>`, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(newProfile => this.setProfile(newProfile)) //updating current profile
  }
  ...
}
```

This `updateProfile` method can be used in a new `ProfileEdit` component, which includes a form to update the custom `address` field:

```javascript
/* ===== ./src/components/Profile/ProfileEdit.js ===== */
import React, { PropTypes as T } from 'react'
import ReactDOM from 'react-dom'
import AuthService from 'utils/AuthService'
import {Row, Col, Image, Form, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap'
import s from './styles.module.css'

export class ProfileEdit extends React.Component {
  // receiving AuthService instance and profile data as props
  static propTypes = {
    profile: T.object,
    auth: T.instanceOf(AuthService)
  }

  // method trigged when edit form is submitted
  handleSubmit(e){
    e.preventDefault()
    const { profile, auth } = this.props
    auth.updateProfile(profile.user_id, {
      user_metadata: {
        address: ReactDOM.findDOMNode(this.refs.address).value // the new address
      }
    })
  }

  render(){
    const { profile } = this.props
    const { address } = profile.user_metadata || {}
    return (
      <Row className={s.root}>
        <Col md={4} mdOffset={6}>
          <h3>Editing Profile</h3>
          <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
            <FormGroup controlId="address">
              <Col componentClass={ControlLabel} sm={2}>
                Address
              </Col>
              <Col sm={10}>
                <FormControl type="text" defaultValue={address} ref="address" />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button type="submit">Save</Button>
              </Col>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    )
  }
}

export default ProfileEdit;
```
Lastly, render the `ProfileEdit` component below the `ProfileDetails` on the Home page by updating the `Home` component render method:

```javascript
/* ===== ./src/views/Main/Home/Home.js ===== */
...
export class Home extends React.Component {
  ...
  render(){
    const { profile } = this.state
    return (
      <div className={styles.root}>
        <h2>Home</h2>
        <ProfileDetails profile={profile}></ProfileDetails>
        <ProfileEdit profile={profile} auth={this.props.auth}></ProfileEdit>
        <Button onClick={this.logout.bind(this)}>Logout</Button>
      </div>
    )
  }
}
```

Now, if you reload your application, you will be able to view and edit the `address` value for the current user profile.

