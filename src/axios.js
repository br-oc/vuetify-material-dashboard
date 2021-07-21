import axios from 'axios'
import store from '@/store'
import router from '@/router'

export const URL = {
    main: '/',
}

const ax = axios.create({
    baseURL: URL.main,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
})

axios.interceptors.response.use(undefined, function (error) {
    if (error) {
        const originalRequest = error.config
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true
            store.dispatch('LogOut')
            return router.push('/login')
        }
    }
})
export default ax
