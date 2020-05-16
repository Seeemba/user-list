import UserService from '../../services/UserService';

export const namespaced = true;

export const state = {
  users: [],
  user: {}
};

export const mutations = {
  ADD_USER(state, user) {
    state.users.push(user);
  },
  SET_USERS(state, users) {
    state.users = users;
  },
  SET_USER(state, user) {
    state.user = user;
  }
};

export const actions = {
  createUser({ commit, dispatch }, user) {
    return UserService.postUser(user)
      .then(() => {
        commit('ADD_USER', user);
        console.log('User created.');
        const notification = {
          type: 'success',
          message: 'The user has been created!'
        };

        dispatch('notificationModule/add', notification, { root: true });
      })
      .catch(error => {
        console.log('There was an error ', error);
        const notification = {
          type: 'error',
          message: 'There was a problem creating the user: ' + error.message
        };

        dispatch('notificationModule/add', notification, { root: true });
        throw error;
      });
  },
  fetchUsers({ commit, dispatch, state }, { page }) {
    return UserService.getUsers(state.perPage, page)
      .then(response => {
        commit('SET_USERS', response);
      })
      .catch(error => {
        console.log('There was an error: ', error);
        const notification = {
          type: 'error',
          message: 'There was a problem fetching users: ' + error.message
        };

        dispatch('notificationModule/add', notification, { root: true });
      });
  },
  fetchUser({ commit, getters }, id) {
    let user = getters.getUserById(id);
    if (user) {
      commit('SET_USER', user);
      return user;
    } else {
      return UserService.getUser(id).then(response => {
        commit('SET_USER', response.data);
        return response.data;
      });
    }
  }
};

export const getters = {
  getUserById: state => id => {
    return state.users.find(user => user.id === id);
  }
};
