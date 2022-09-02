export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.provide("commonOpen", item => {
        if (item.type === "webview") {
            window.open(item.url);
        } else if (item.type === "cursor") {
            navigateTo(`/detail/course/${item.course_id}`)
        }
    })
})