import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import auth from '@/modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
        barImage: 'https://image.winudf.com/v2/image/Y29tLnRkZy5tYXRlcmlhbF9zY3JlZW5fMF8xNTI2NjY1ODY1XzAyMg/screen-0.jpg?h=355&fakeurl=1&type=.jpg',
        drawer: null,
    },
    mutations: {
        SET_BAR_IMAGE (state, payload) {
            state.barImage = payload
        },
        SET_DRAWER (state, payload) {
            state.drawer = payload
        },
    },
    actions: {},
    plugins: [
        new VuexPersistence({ storage: window.localStorage }).plugin,
    ],
    modules: {
        auth,
    },
})
