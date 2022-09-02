export default {
    scrollBehavior(to, from, savePosition) {
        //在按下后退前进 自动返回原来位置
        if (savePosition) return savePosition
        return { top: 0 }
    }
}