import $api from "../http"

export default class UserDataService {
    static async getUserRequests(id) {
        const response = await $api.get('/api/userdata/myrequests')
        return response.data
    }
    static async getUserProfile() {
        const response = await $api.get('/api/userdata/myprofile')
        return response.data
    }
    static async deleteUserProfile() {
        const response = await $api.delete('/api/userdata')
        return response.data
    }
    static async redoUserProfile(redoData) {
        const response = await $api.put('/api/userdata', redoData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
        return response
    }
    static async redoUserAdvert(redoData, id) {
        const response = await $api.put('/api/userdata/myadverts/' + id, redoData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
        return response.data
    }
}
