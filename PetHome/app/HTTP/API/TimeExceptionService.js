import $api from "../http"

export default class TimeExceptionService {
    static async addUserTimeExceptions(dates) {
        const response = await $api.post('/api/timeexceptions/', dates)
        return response.data
    }
    static async deleteUserTimeExceptions(dates) {
        const response = await $api.delete('/api/timeexceptions/', {
            data: dates
        })
        return response.data
    }
    static async getUserTimeExceptions() {
        const response = await $api.get('/api/UserData/mytimeexceptions/')
        return response.data
    }
}
