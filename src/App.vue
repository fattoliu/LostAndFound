<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'app',
    created () { }
}
</script>
<style lang="less">
@import '~vux/src/styles/reset.less';
#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
