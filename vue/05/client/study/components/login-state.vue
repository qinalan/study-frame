<template>
    <div class="login-state">
        <img src="../../assets/avatar/2.jpg" alt="">
        <ul>
            <li>用户管理</li>
            <li>用户信息</li>
            <li @click="logout">退出登录</li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'login-state',
        methods: {
            logout() {
                this.$store.commit('updateShowLoginState', true);
                /* this.axios.post('/user/logout').then(({ data }) => {
                    if (data.loginExisted) {
                        this.$store.commit('updateShowLoginState');
                        tool.removerItem('username');
                    }
                }).catch(errors => {
                    console.log(errors);
                }); */
                this.$store.dispatch('UserLogout');
            }
        }
    };
</script>

<style scoped lang="scss">
    .login-state{
        position: relative;
        width: 100%;
        height: 100%;
        img{
            width: 30px;
            height: 100%;
            border-radius: 50%;
        }
        ul{
            display: none;
            position: absolute;
            top: 30px;
            left: 0;
            width: 100%;
            height: 93px;
            border-radius: 5px;
            border-top: 0;
            li{
                width: 100%;
                height: 30px;
                border-bottom: 1px solid #e3726d;
                background: greenyellow;
                color: black;
                font-size: 12px;
                text-align: center;
                line-height: 30px;
                cursor: pointer;
            }
            li:hover{
                color: red;
            }
        }
    }
    .login-state:hover ul{
        display: block;
    }
</style>
