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
export function useRegApi(body) {
    return useHttpPost("REG", '/reg', { body })
}
export function useGetCaptchaApi(phone) {
    return useHttpPost("get_captcha", '/get_captcha', {
        body: {
            phone
        }
    })
}
export function useBindPhoneApi(body) {
    return useHttpPost("useBindPhone", '/bind_mobile', {
        body
    })
}
// 忘记密码
export function useForgetApi(body) {
    return useHttpPost("useForget", '/forget', {
        body
    })
}
export function useUserHistoryApi(query) {
    return useHttpGet('userHistory', () => {
        let q = useQueryToString(query());
        return '/user_history/list' + q
    }, {
        lazy: true
    })
}

//获取购买记录
export function useOrderLisApi(page) {
    return useHttpGet('orderList', `/order/list?page=${page}`, {
        lazy: true
    })
}
export function useUserTestApi(page) {
    return useHttpGet('usertest', `/user_test/list?page=${page}`, {
        lazy: true
    })
}
//我的帖子列表
export function usePostListApi(page) {
    return useHttpGet('mypost', `/mypost?page=${page}`, {
        lazy: true
    })
}

export function useUserCouponApi(page) {
    return useHttpGet('user_coupon', `/user_coupon?page=${page}`, {
        lazy: true
    })
}
//我的收藏列表
export function useMyFavaListApi(page) {
    return useHttpGet('user_fava', `/user_fava?page=${page}`, {
        lazy: true
    })
}
//取消收藏
export function useUnCollectApi(body) {
    return useHttpPost('unCollect', `/uncollect`, {
        body
    })
}
//修改资料
export function useUpdateUserInfoApi(body) {
    return useHttpPost("updateUserInfo", "/update_info", {
        body
    })
}

export function useUploadConfig() {
    return {
        action: fetchConfig.baseURL + '/upload',
        headers: {
            appid: fetchConfig.headers.appid,
            token: useCookie("token").value
        }
    }
}

//修改密码
export function useUpdateUserPasswordApi(body) {
    return useHttpPost("updatePassword", "/update_password", {
        body
    })
}
//收藏
export function useCollectApi(body) {
    return useHttpPost('unCollect', `/collect`, {
        body
    })
}

//领取优惠券
export function useGainCouponApi(body) {
    return useHttpPost('gainCoupon', `/user_coupon/receive`, {
        body
    })
}