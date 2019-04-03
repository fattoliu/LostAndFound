<template>
    <div class="page-login">
        <div class="title-h1">校园失物招领</div>
        <div class="form-login">
            <img
                :src="userIcon"
                class="icon"
            ></img>
            <input
                class="form-control"
                placeholder="用户名"
                type="text"
                v-model="loginname"
            >
        </div>
        <div class="form-login">
            <img
                :src="pwdIcon"
                class="icon"
            ></img>
            <input
                class="form-control"
                placeholder="密码"
                type="password"
                v-model="password"
            >
        </div>

        <div class="btn-login">登 录</div>
    </div>
</template>

<script>
import userIcon from '../assets/imgs/icon_user.png'
import pwdIcon from '../assets/imgs/icon_pwd.png'
export default {
    name: 'login',
    data () {
        return {
            userIcon: userIcon,
            pwdIcon: pwdIcon,
            loginname: '',
            password: ''
        }
    }
}
</script>

<style scoped lang="less">
.page-login {
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;
    flex-flow: column;
    background: #387eff;
    justify-content: center;
    align-items: center;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    .title-h1 {
        color: #ffdf4e;
        font-size: 36px;
        font-weight: 500;
        width: 70%;
        text-align: center;
        padding: 0 0 48px 0;
        box-sizing: border-box;
    }
    .btn-login {
        background: #ffdf4e;
        font-size: 18px;
        color: #333;
        text-align: center;
        width: 70%;
        margin-top: 16px;
        padding: 10px;
        border-radius: 100px;
        -moz-box-shadow: 0px 4px 20px #e2e2e2bb;
        -webkit-box-shadow: 0px 4px 20px #e2e2e2bb;
        box-shadow: 0px 4px 20px #e2e2e2bb;
        &:active {
            background: #ffdf4eb9;
        }
    }
    .form-login {
        position: relative;
        background: white;
        font-size: 14px;
        margin-bottom: 16px;
        color: #333;
        display: flex;
        flex-flow: rows;
        width: 70%;
        align-items: center;
        padding: 8px;
        border: 1px solid #e2e2e2;
        border-radius: 100px;

        .icon {
            width: 16px;
            height: 16px;
            margin-left: 16px;
        }
        input {
            padding: 8px;
            flex: 1;
            font-size: 14px;
            outline: 0;
            background: transparent;
            border: none;
        }
    }
}
</style>
