
import apiClient from './apiClient'

export const HomeApi={
    getData:async ()=>{
        const res = await apiClient.get(`/user`,{
            params:{

            },
        });
        const data=res.data
        return data
    },
    upload: async (fileInfo: any) => {
        const response = await apiClient.post(`/user/update`, fileInfo);
        const data = response.data;
        return data;
    },
    getUser: async () => {
        const response = await apiClient.get(`/user`);
        const data = response.data;
        return data;
    },
    editProfile: async (id: any, avatarImg: string) => {
        const response = await apiClient.post(`/user/editprofile`, {
            id: id,
            avatarImg: avatarImg
        });
        const data = response.data;
        return data;
    },
    MkdirFile:async (filePath:string)=>{
        const res=await  apiClient.post(`/mkdirfile`,{
            filePath
        })
        const data=res.data
        return data
    }
}