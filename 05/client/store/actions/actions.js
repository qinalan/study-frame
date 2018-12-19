import * as types from '../types/types';

export default {
    UserLogin({ commit }, data) {
        commit(types.LOGIN, data);
    },
    UserLogout({ commit }, data) {
        commit(types.LOGOUT, data);
    }
};