import { makeAutoObservable } from "mobx";
import AuthService from "../HTTP/API/AuthService";

export default class Store {
    isAuth = false;
    isLoading = true;
    userId = "";
    role = "";
    isEditing = false;
    advertsNeedUpdate = false;
    usersNeedUpdate = false;
    constructor() {
        makeAutoObservable(this)
        this.login = this.login.bind(this)
        this.registration = this.registration.bind(this)
        this.logout = this.logout.bind(this)
        this.checkAuth = this.checkAuth.bind(this)
        this.setIsEditing = this.setIsEditing.bind(this)
        this.setAdvertsNeedUpdate = this.setAdvertsNeedUpdate.bind(this)
        this.setUsersNeedUpdate = this.setUsersNeedUpdate.bind(this)
        this.setRole = this.setRole.bind(this)
    }
    setLoading(boolean) {
        this.isLoading = boolean;
    }
    setIsEditing(boolean) {
        this.isEditing = boolean;
    }
    setAuth(boolean) {
        this.isAuth = boolean;
    }
    setUserId(userId) {
        this.userId = userId
    }
    setRole(role) {
        this.role = role
    }
    setAdvertsNeedUpdate(boolean) {
        this.advertsNeedUpdate = boolean;
    }
    setUsersNeedUpdate(boolean) {
        this.usersNeedUpdate = boolean;
    }
    async login(creds) {
        try {
            const response = await AuthService.login(creds)
            this.setAuth(true);
            this.setUserId(response?.data?.userId)
            this.setRole(response?.data?.roles)
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
    async checkAuth() {
        try {
            const data = await AuthService.checkAuth()
            this.setAuth(true);
            this.setUserId(data?.userId)
            this.setRole(data?.roles)
        } catch (e) {
            console.log(e)
        }
    }
}
