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
    const route = useRoute();
    if (route.path != '/') {
        navigateTo('/', { replace: true })
    }
}
//登录并且绑定手机号之后才能操作
export function useHashAuth(callback = null) {
    const route = useRoute()
    const token = useCookie("token")
    const user = useUser()
    const { message } = createDiscreteApi(["message"])

    if (!token.value) {
        message.error("请先登录")
        return navigateTo('/login?from=' + route.fullPath)
    }
    const phone = user.value?.phone
    if (!phone && route.name != 'bindPhone') {
        message.error("请先绑定手机号")
        return navigateTo("/bindPhone?from=" + route.fullPath)
    }
    if (callback && typeof callback === 'function') {
        callback()
    }
}
export function useHandleSupport() {
    const supportLoading = ref(false);
    const handleSupport = (item) => {
        useHashAuth(async () => {
            let type = item.issupport ? "unsupport" : "support";
            supportLoading.value = true;
            const { error, data } = await usePostSupportApi(item.id, type);
            supportLoading.value = false;
            if (error?.value) return;
            if (type === "unsupport") item.support_count--;
            else item.support_count++;
            item.issupport = !item.issupport;
            const { message } = createDiscreteApi(["message"]);
            message.success("操作成功");
        });
    };
    return { handleSupport, supportLoading }
}