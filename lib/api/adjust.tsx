import apiClient from "./apiClient"

export const AdjustApi={
    updateSize: async (fileInfo: any) => {
        const response = await apiClient.post(`/adjust/update`, fileInfo);
        const data = response.data;
        return data;
    },
}