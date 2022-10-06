// 查看电子书
export function useBookMenusApi(id) {
    return useHttpGet("bookMenus", `/book/menus?id=${id}`, {
        lazy: true
    })
}
// 查看电子书章节内容
export function useBookDetail(book_id, id) {
    return useHttpGet("bookDetail", `/book/detail?book_id=${book_id}&id=${id}`, {
        lazy: true
    })
}