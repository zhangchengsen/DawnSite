export async function usePage(initListApiCallback) {
    const route = useRoute();
    const page = ref(parseInt(route.params.page))
    const limit = ref(10);
    //只是将当页部分参数传回去 
    //拿到完整的参数再在这调用
    const { data, error, pending, refresh } = await initListApiCallback({
        page: page.value,
        limit: limit.value
    });
    const rows = computed(() => data.value?.rows ?? []);
    const total = computed(() => data.value?.count ?? 0);
    //接收当页的参数
    function handlePageChange(p) {
        navigateTo({
            params: {
                ...route.params,
                page: p,
            },
            query: {
                ...route.query,
            },
        });
    }
    return {
        page, limit, data, pending, error, refresh, rows, total,
        handlePageChange
    }
}