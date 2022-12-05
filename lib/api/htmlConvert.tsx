import apiClient from "./apiClient";

export const HtmlConvertApi = {
    //根据htmlurl转成图片存入本地
    upload: async (htmlUrl: string,width:number) => {
        const res = await apiClient.post('/htmlconvert/upload', {
            htmlUrl,width
        })
        const data = res.data
        return data
    }
}