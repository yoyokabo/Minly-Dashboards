import ApiManager from "./ApiManager";

export const user_login = async (username,password) => {
    try {
        const result = await ApiManager.post('/users/login', { username, password })

        return result
        }
            

    catch (error) {
        return error
    }
}

export const user_register = async (email,username,password) => {
    try {
        const result = await ApiManager.post('/users/register', { password,email, username })

        return result
        }
            

    catch (error) {
        return error
    }
}