import stores from '../stores/stores';
import apiClient from './apiClient';

export const CompressApi = {
    upload: async (fileInfo: any, i: number) => {
        const response = await apiClient.post(`/compress/upload`, fileInfo, {
            onUploadProgress: function name(progressEvent) {
                let process = (progressEvent.loaded / progressEvent.total * 100 | 0)
                stores.compressStore.setProcess(process, i);
            }
        });
        const data = response.data;
        return data;
    },
}

export interface ProcessData {
    idx: number,
    process: number
}

export interface ImgUrlData {
    idx: number,
    url: string
}