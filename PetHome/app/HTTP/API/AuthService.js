import $api from "../http"
export default class AuthService {
    static async login(creds) {
        const response = await $api.post("/api/auth/login", creds)
        return response
    }
    static async registration(registrationData) {
        const response = await $api.post("/api/auth/register", registrationData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
        return response.data
    }
    static async logout() { //if needed
        const response = await $api.post("/api/auth/logout")
        return response.data
    }

    static async checkAuth() {
        const response = await $api("/api/auth/refresh-token", {
            method: "post",
            withCredentials: true
        })
        return response.data
    }
}
