export function useGetGoodsInfoApi(id, type = 'course') {
    return useHttpGet("getGoodsInfo", `/goods/read?type=${type}&id=${id}`, {
        lazy: true
    })
}
// 获取可用优惠券
export function useGetUsableCouponApi(id, type = 'course') {
    return useHttpGet("GetUsableCouponApi", `/user_coupon?goods_id=${id}&type=${type}&page=1`, {
        lazy: true
    })
}
// 创建订单
export function useCreateOrderApi(body, type = '') {
    let url = `/order/save`
    if (type == 'flashsale') {
        url = '/order/flashsale'
    } else if (type == 'group') {
        url = '/order/group'

    }
    console.log('type', type)
    return useHttpPost('creatOrder', url, {
        body
    })
}

// 微信pc支付
export function useWxpayApi(no) {
    return useHttpPost('wxPay', `/order/wxpay`, {
        body: {
            no
        }
    })
}
// 查询订单是否支付成功
export function useGetWxpayApi(no) {
    return useHttpPost('getWxPayStatus', `/order/iswxpay`, {
        body: {
            no
        },
        $: true
    })
}
// 
export function useGetUsableUserCouponApi(group_id, page = 1) {
    return useHttpGet("getGroupWorkList", `/group_work/list?group_id=${group_id}&page=${page}`)
}
