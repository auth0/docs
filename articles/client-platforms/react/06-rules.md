---
title: Rules
description: This tutorial will show you how to use Auth0 rules to extend what Auth0 has to offer.
budicon: 173
---

<%= include('../../_includes/_package2', {
  org: 'auth0-samples',
  repo: 'auth0-react-sample',
  path: '06-Rules'
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

