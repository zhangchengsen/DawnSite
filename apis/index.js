export function useIndexData() {
    return useHttpGet("indexData", "/index", {
        lazy: true,
    });
}
export function useGroupData(query) {
    let q = useQueryToString(query);
    return useHttpGet("groupData", "/group/list" + q);
}
