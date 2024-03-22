import { makeAutoObservable } from "mobx";
import AuthService from "../HTTP/API/AuthService";

export default class Store {
    isAuth = false;
    isLoading = false;
    userId = "";
    constructor() {
        makeAutoObservable(this)
        this.login = this.login.bind(this)
        this.registration = this.registration.bind(this)
        this.logout = this.logout.bind(this)
    }
    setLoading(boolean) {
        this.isLoading = boolean;
    }
    setAuth(boolean) {
        this.isAuth = boolean;
    }
    setUserId(userId) {
        this.userId = userId
    }
    async login(creds) {
        try {
            const response = await AuthService.login(creds)
            this.setAuth(true);
            this.setUserId(response?.data?.userId)
        } catch (e) {
            console.error(e?.message);
            throw e
        }
    }
    async registration(registrationData) {
        try {
            await AuthService.registration(registrationData)
        } catch (e) {
            console.error(e)
            throw e
        }
    }
    async logout() {
        try {
            await AuthService.logout()
            this.setAuth(false);
            this.setUserId("")
        } catch (e) {
            console.error(e)
        }
    }
}
