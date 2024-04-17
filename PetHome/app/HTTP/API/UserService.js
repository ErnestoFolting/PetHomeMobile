import $api from "../http"

export default class UserService {
    static async getCertainUser(id) {
        const response = await $api.get('/api/users/' + id)
        return response.data
    }
}
