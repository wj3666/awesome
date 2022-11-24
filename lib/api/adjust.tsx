import stores from "../stores/stores";
import apiClient from "./apiClient"

export const AdjustApi={
    updateSize: async (fileInfo: any,i:number) => {
        const response = await apiClient.post(`/adjust/upload`, fileInfo,{
            onUploadProgress:function name(progressEvent) {
                let process=(progressEvent.loaded/progressEvent.total*100|0)
                stores.adjustStore.setProcess(process,i)
            },
        });
        const data = response.data;
        return data;
    },
}
