---
title: User Profile
description: This tutorial will show you how to integrate Auth0 with ReactJS to authenticate and fetch/show profile information.
---

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:
* NodeJS 5.2.0
* NPM 3.3.12
* React 15.0.2
:::

<%= include('../../_includes/_github', {
  link: 'https://github.com/auth0-samples/auth0-react-sample/tree/master/04-User-Profile',
}) %>

In the [Login step](/quickstart/spa/react/01-login) of this tutorial, you can find a detailed description of how to use auth0's lock widget to show a login window and authenticate the user. Also, it shows how to protect routes making them available only for authenticated users. In this step, the focus is to present a way to retrieve and show the user profile information.

## 1. Create the AuthService class

The best way to have authentication utilities available across the application is to create a helper class an share its instance to the React Components passing it as their props. Let's create the helper inside the `src/utils` folder to encapsulate the login functionality and name it `AuthService`.

We'll need an `Auth0Lock` instance, which receives your Auth0 credentials and an options object (check the available options [here](/libraries/lock/v10/customization)). Instead of hard coding the credentials here, `AuthService` will receive Auth0 credentials as contructor parameters.

With the internal Auth0 Lock widget instance, we can hook a callback for the `authenticated` event. The event is emitted after every successful login, passing the user authentication token (`idToken`) as a parameter. For now we're storing the `idToken` value into `localStorage`.

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

The other helper methods you see above are `login`, to call `lock.show()` and display the login widget, `logout` to remove the localStorage data and `loggedIn` that just checks if an `idToken` exists, returning a boolean.

## 2. Request User Profile Data

To fetch user profile information, you have to call `lock.getProfile` function, specifying the token and a callback to process the response. Below you can see the code that was added to `AuthService` to fetch the user profile right after a successful authentication, storing the response in `localStorage`. Also, since the profile data request is asynchronous, `EventEmitter` is added to allow sending notifications after a profile update.

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

As an example, we are going to update the Home view component to, instead of just showing a logout button, render the user profile info:

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

Home is now listening for `profile_updated` events from `AuthService` instance, keeping profile data in its internal state. With that, every time the user profile data is updated, the component state changes, updating the props sent to `ProfileDetails` component.

`Profile` component is still missing. You should create a new javascript file in `src/components/Profile/ProfileDetails.js` with:

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

And now after the authentication, you'll see a home page with the user's avatar and info.

## 4. Custom Sign Up Fields

If you need extra fields on user sign up, you can add them using `additionalSignUpFields` key in lock widget options parameter. For more info, please [check the documentation](/libraries/lock/v10/customization#additionalsignupfields-array-). As an example, `AuthService` constructor can be updated to request the user's `address` with:

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

Each `additionalSignUpFields` value is saved into the profile in the `user_metadata` attribute.
Updating our `Profile` component to display the address, we'll have:

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

## 5. Update user profile

<%= include('../_includes/_profile-metadata-explanation') %>

To update the user's profile info, you need to hit [user api endpoint](/api/management/v2#!/Users/patch_users_by_id) sending the new profile values. In our example, we'll update `AuthService` class adding a new method `updateProfile` to handle this functionality, sending the correct request headers. To make the http request, we'll use [`fetch` standard](https://fetch.spec.whatwg.org/)

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

The new `updateProfile` method will be useful in a new component `ProfileEdit`, where we'll have a form to update the custom address field. Check the code below:

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

Finally, let's render the `ProfileEdit` component below the `ProfileDetails` in the Home page, updating the `Home` component render method to something like:

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

If you reload your application you are now able to view and edit the `address` value for the current user profile.

## 6. All done!

You have completed the implementation, showing and editing the Auth0 user profile in your ReactJS project.
