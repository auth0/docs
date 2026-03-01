---
name: UserProfile.vue
language: html
---

```html
<template>
  <div v-if="isLoading">Loading ...</div>
  <div v-else-if="!user"></div>
  <div v-else class="profile-container">
    <ion-avatar>
      <img :src="user.picture" :alt="user.name" />
    </ion-avatar>
    <h2>{{ user.name }}</h2>
    <p>{{ user.email }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useAuth0 } from "@auth0/auth0-vue";
import { IonAvatar } from "@ionic/vue";

export default defineComponent({
  components: {
    IonAvatar,
  },
  setup() {
    const { user, isLoading } = useAuth0();

    return { user, isLoading };
  },
});
</script>
```