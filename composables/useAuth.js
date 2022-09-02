import { createDiscreteApi } from "naive-ui"
import { useLogoutApi } from "~~/apis/user"
// 先去找 'user' 没拿到就走默认值
export const useUser = () => useState("user", () => null)
export async function useRefreshUserInfo() {
    const token = useCookie("token")
    const user = useUser()

    // 用户已登录
    if (token.value) {
        let { data, error } = await useGetInfoApi()
        if (data.value) {
            user.value = data.value
        }
    }
}
export async function useLogout() {
    await useLogoutApi()
    const user = useUser()
    user.value = null
    const token = useCookie("token")
    token.value = null
    const { message } = createDiscreteApi(['message'])
    message.success('退出登录成功')
    const route = useRoute();
    if (route.path != '/') {
        navigateTo('/', { replace: true })
    }
}