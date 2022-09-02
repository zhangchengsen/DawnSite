// 将对象转url参数
export function useQueryToString(query = {}) {
    let q = ""
    for (const key in query) {
        if (q === '') {
            q = `?${key}=${query[key]}`
        } else {
            q += `&${key}=${query[key]}`
        }
    }
    return q;
}
export function useEnterEvent(event) {
    function handleEnterEvent(e) {
        if (e.key === "Enter") {
            event();
            e.preventDefault();
        }
    }
    onBeforeMount(() => document.addEventListener("keydown", handleEnterEvent))
    onBeforeUnmount(() => document.removeEventListener("keydown", handleEnterEvent))
}

