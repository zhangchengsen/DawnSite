import { createDiscreteApi } from "naive-ui";
export const fetchConfig = {
    baseURL: 'http://demonuxtapi.dishait.cn/pc',
    headers: { appid: "bd9d01ecc75dbbaaefce" },
}
function useGetFetchOptions(options = {}) {
    options.baseURL = options.baseURL ?? fetchConfig.baseURL
    options.headers = options.headers ?? fetchConfig.headers
    options.initialCache = options.initialCache ?? false
    options.lazy = options.lazy ?? false
    const token = useCookie('token')
    if (token)
        options.headers.token = token.value
    return options;
}
export async function useHttp(key, url, options = {}) {
    options.key = key
    //用户登录header头 默认传token

    options = useGetFetchOptions(options)
    if (options.$) {
        const data = ref(null)
        const error = ref(null)
        return $fetch(url, options).then(res => {
            data.value = res.data
            return { data, error }
        })
            .catch(err => {
                const msg = err?.data?.data
                if (process.client) {
                    const { message } = createDiscreteApi(['message'])
                    message.error(msg || "服务端错误")
                }
                error.value = msg
                return {
                    data, error
                }
            })
    }
    let res = await useFetch(url, {
        ...options,
        transform: (res) => {
            return res.data
        }
    })
    //客户端的错误处理
    if (process.client && res.error.value) {
        const msg = res.error.value?.data?.data
        if (!options.lazy) {
            const { message } = createDiscreteApi(['message'])
            message.error(msg || "服务端错误")
        }
    }
    return res;
}
//GET请求
export function useHttpGet(key, url, opt = {}) {
    opt.method = "GET"
    return useHttp(key, url, opt)
}
//POST请求
export function useHttpPost(key, url, opt = {}) {
    opt.method = "POST"
    return useHttp(key, url, opt)
}