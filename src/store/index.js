import Vue from 'vue';
import Vuex from 'vuex';

import * as notificationModule from './modules/notification';
import * as userModule from '../store/modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    notificationModule,
    userModule
  }
});
