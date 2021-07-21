import axios from '../axios'

const state = {
    token: null,
}
const initialState = state
const getters = {
    isAuthenticated: state => !!state.token,
    StateUser: state => state.user,
}
const actions = {
    async LogIn ({ commit }, user) {
        return axios.post('/api/auth/login', user)
            .then(async ({ data }) => {
                if (data.data.success) {
                    await commit('setToken', data.data.token)
                    axios.defaults.headers.common.Authorization = `Bearer ${data.data.token}`
                    return Promise.resolve(data)
                } else {
                    return Promise.reject(data)
                }
        })
        // await commit('setUser', User.get('Email'))
    },
    async LogOut ({ commit }) {
        commit('logOut', null)
        commit('setToken', null)
    },
}
const mutations = {
    setUser (state, username) {
        state.user = username
    },
    setToken (state, token) {
        state.token = token
    },
    logOut (state) {
        state.user = null
        state.token = null
        state = initialState
    },
}
export default {
    state,
    getters,
    actions,
    mutations,
}
