import Vue from 'vue'
import Vuex from 'vuex'
import {User} from "../store/store";
import {MainSocket} from "../store/mainSocket";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        User, MainSocket
    },

});
