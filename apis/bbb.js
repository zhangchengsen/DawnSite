export function usePostSupportApi(post_id, type = 'support') {
    return useHttpPost("postSupport", '/post/' + type, {
        body: {
            post_id
        }
    })
}
export function useDeletePostApi(id) {
    return useHttpPost("deletePost", '/post/delete', {
        body: {
            id
        }
    })
}
//
export function useBbsListApi() {
    return useHttpGet('bbsList', "/bbs?page=1", {
        lazy: true
    })
}
// 指定分类下的帖子状态
export function usePostListsApi(query) {
    console.log('query', query)

    return useHttpGet('postList', () => {
        let q = useQueryToString(query());
        console.log('q', q)
        return '/post/list' + q
    }, {
        lazy: true
    })
}
export function useReadPostApi(id) {
    return useHttpGet('readPOST', "/post/read?id=" + id, {
        lazy: true
    })
}
// 查看帖子评价列表
export function usePostCommentApi(query) {
    return useHttpGet('PostComment', () => {
        let q = useQueryToString(query());
        console.log('q', q)
        return '/post_comment' + q
    }, {
        lazy: true
    })
}

// 评论帖子
export function useReplyPostApi(body) {
    return useHttpPost("ReplyPost", "/post/reply", {
        body
    })
}
export function useAddPostApi(body) {
    return useHttpPost('addPost', "/post/save", {
        body
    })
}