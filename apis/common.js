export function useSearchListApi(query) {
    return useHttpGet('searchList', () => {
        let q = useQueryToString(query());
        return '/search' + q
    }, {
        lazy: true
    })
}
// 通用列表
export function useListApi(type, query = {}) {
    let q = useQueryToString(query)
    return useHttpGet(type + "List", `/${type}/list${q}`, {
        lazy: true
    })
}
export function useCouponListApi() {
    return useHttpGet("CouponList", "/coupon/list")
}
//查看课程详情
export function useReadDetailApi(type, query = {}) {
    let q = useQueryToString(query)
    return useHttpGet(`readCourse`, `/${type}/read${q}`, {
        lazy: true,
    });
}