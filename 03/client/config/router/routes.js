import Index from "../../views/todo/index.vue"
import Res from "../../views/login/registered.vue"
import Login from "../../views/login/login.vue"
import ResLogin from "../../views/login/reslogin.vue"



export default [
    {
        path: "/app",
        component: Index
    },
    {
        path: "/login",
        component: Res
    },
    {
        path: "/res",
        component: Login
    },
    {
        path: "/user",
        component: ResLogin
    }
]