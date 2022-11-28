import stores from "../stores/stores";
import apiClient from "./apiClient"

//其他格式转换为jpg
export const ConvertJpg = {
    upload: async (fileInfo: any, i: number) => {
        const res = await apiClient.post(`convertjpg/upload`,
            fileInfo,
            { 
                onUploadProgress: function name(progressEvent) {
                    let process = (progressEvent.loaded / progressEvent.total * 100 | 0)
                    stores.convertJpgStore.setProcess(process, i)
                }
            });
        const data = res.data
        return data
    }
}
//jpg转换为png或者gif
export const JpgConvert={
    upload: async (fileInfo: any, i: number) => {
        const res = await apiClient.post(`jpgconvert/upload`,
            fileInfo,
            { 
                onUploadProgress: function name(progressEvent) {
                    let process = (progressEvent.loaded / progressEvent.total * 100 | 0)
                    stores.jpgConvertStore.setProcess(process, i)
                }
            });
        const data = res.data
        return data
    }
}