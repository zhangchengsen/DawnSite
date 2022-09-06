import { createDiscreteApi } from "naive-ui"
export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie("token")
    const user = useUser()
    const route = useRoute()
    if (!token.value) {
        if (process.client) {
            const { message } = createDiscreteApi(['message'])
            message.error('请先登录')
        }
        return navigateTo('/login?from=' + route.fullPath)


    }
    const phone = user.value?.phone
    if (!phone && route.name != 'bindPhone') {
        if (process.client) {
            const { message } = createDiscreteApi(['message'])
            message.error("请先绑定手机")

        }
        return navigateTo("/bindPhone?from=" + route.fullPath)
    }
})
