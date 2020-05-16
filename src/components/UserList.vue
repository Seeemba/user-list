<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <UsersTable :users="userModule.users" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
import store from '../store';
import UsersTable from './UsersTable';

function getUsers() {
  store
    .dispatch('userModule/fetchUsers', {})
    .then(() => {
      // add logic here
    });
}

export default {
  name: 'UserList',
  components: {
    UsersTable,
  },
  beforeRouteEnter() {
    getUsers();
  },
  beforeRouteUpdate() {
    getUsers();
  },
  computed: {
    ...mapState(['userModule'])
  }
};
</script>
