---
title: Rules
description: This tutorial will show you how to use Auth0 rules to extend what Auth0 has to offer.
---

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:
* NodeJS 5.2.0
* NPM 3.3.12
* React 15.0.2
:::

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-react-sample',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-react-sample',
  pkgBranch: 'master',
  pkgPath: '06-Rules',
  pkgFilePath: null,
  pkgType: 'js'
}) %>

<%= include('../_includes/_rules-introduction') %>

## 1. Create a Rule

<%= include('../_includes/_rules-create-section') %>

## 2. Test the Rule Result

<%= include('../_includes/_rules-test-result-intro', { profilelink: '/docs/quickstart/spa/react/04-user-profile' }) %>

```javascript
/* ===== ./src/components/Profile/ProfileDetails.js ===== */
import React, { PropTypes as T } from 'react'
import {Row, Col, Image} from 'react-bootstrap'
import s from './styles.module.css'

export class ProfileDetails extends React.Component {
  static propTypes = {
    profile: T.object
  }

  render(){
    const { profile } = this.props
    return (
      <Row className={s.root}>
        <Col md={2} mdOffset={4}>
          <Image src={profile.picture} circle className={s.avatar} />
        </Col>
        <Col md={6}>
          <h3>Profile Details</h3>
          <p><strong>Name: </strong> {profile.name}</p>
          <p><strong>Email: </strong> {profile.email}</p>
          <p><strong>Nickname: </strong> {profile.nickname}</p>
          <p><strong>Created At: </strong> {profile.created_at}</p>
          <p><strong>Updated At: </strong> {profile.updated_at}</p>
          <p><strong>Country (added by rule): </strong> {profile.country}</p>
        </Col>
      </Row>
    )
  }
}

export default ProfileDetails;
```

![Country rule sample](/media/articles/reactjs/rule-country-show.png)

