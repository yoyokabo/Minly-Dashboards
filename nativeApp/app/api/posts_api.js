import ApiManager from "./ApiManager";

export const posts_get = async () => {
    try {
        const result = await ApiManager.get('/posts/')

        return result
        }
            

    catch (error) {
        return error
    }
}

export const posts_like = async (id,token) => {
    try {
        const result = await ApiManager.patch(('/posts/' + id) ,{token})

        return result
        }
            

    catch (error) {
        return error
    }
}

export const posts_create = async (data,token) => {
    try {
        const formData = new FormData
        formData.append("token",token)
        formData.append("file",data.media)
        formData.append("type",data.type)
        formData.append("caption",data.caption)
        console.log(formData)
        const result = await ApiManager.post('/posts/', formData,{
            headers: {
                "content-type": "multipart/form-data"
              }
        });
        return result
        }
            

    catch (error) {
        return error
    }
}