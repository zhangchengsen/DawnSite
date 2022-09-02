export function useLoginApi(body) {
    return useHttpPost("Login", "/login", {
        body
    })
}
export function useGetInfoApi() {
    return useHttpGet("getinfo", "/getinfo", { $: true });
}
// 退出登录
export function useLogoutApi() {
    return useHttpPost("logout", '/logout')
}