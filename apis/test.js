// 交卷
export function useSubmitTestApi(body) {
    return useHttpPost("SubmitTest", "/user_test/save", {
        body
    })
}
// 开始考试
export function useReadTestpaperApi(id) {
    return useHttpGet("SubmitTest", "/testpaper/read?id=" + id)
}