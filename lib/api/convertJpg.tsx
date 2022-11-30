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
//jpg转换为png或静态gif
export const JpgConvert={
    upload: async (fileInfo: any, i: number,GIFMode:boolean) => {
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
    },
    //jpg转换为gif
    uploadGIF:async (fileInfo:any,id:number)=>{
        const res=await apiClient.post(`jpgconvert/uploadGIF`,
            fileInfo,)
        const data=res.data
        return data
    },
    convertGIF:async (moveUrl:any,seconds:string,playBack:boolean,width:number,height:number)=>{
        const res=await apiClient.post(`jpgconvert/convertGIF`,
        {moveUrl,seconds,playBack,width,height},
        {
            onUploadProgress: function name(progressEvent) {
                let process = (progressEvent.loaded / progressEvent.total * 100 | 0)
                stores.jpgConvertStore.setProcess(process, 0)
            }
        })
        const data=res.data
        return data
    }
}