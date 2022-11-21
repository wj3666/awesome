import stores from '../stores/stores';
import apiClient from './apiClient';

export const CompressApi = {
    upload: async (fileInfo: any) => {
        const response = await apiClient.post(`/compress/upload`, fileInfo, {
            onUploadProgress: function name(progressEvent) {
                let process = (progressEvent.loaded / progressEvent.total * 100 | 0)
                stores.compressStore.setProcess(process);
            }
        });
        const data = response.data.data;
        // console.log(data)
        return data;
    },
}