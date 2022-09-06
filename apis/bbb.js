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