export function useCourseListApi(page) {
    return useHttpGet(`courseLister`, `/course/list?page=${page}`, {
        lazy: true,
    });
}
//查看课程详情
export function useReadCourseApi(query = {}) {
    let q = useQueryToString(query)
    return useHttpGet(`readCourse`, `/course/read${q}`, {
        lazy: true,
    });
}

export function useHotListApi() {
    return useHttpGet(`hotcourseList`, `/hot`, {
        lazy: true,
    });
}

// 免费学习
export function useLearnApi(body) {
    return useHttpPost("learn", '/order/learn', {
        body
    })
}