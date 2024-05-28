import $api from "../http";

export default class AdminService {
  static async getAllUsers() {
    const response = await $api.get("/api/users")
    return response.data
  }

  static async getAllAdverts(queryParams) {
    const response = await $api.get("/api/adverts", {
      params: {
        PageNumber: queryParams?.currentPage,
        PageSize: queryParams?.advertsLimit,
        isDatesFit: queryParams?.isDatesFit,
        priceFrom: queryParams?.costFrom,
        priceTo: queryParams?.costTo
      }
    })
    return response.data
  }

  static async deleteUser(id) {
    const response = await $api.delete('/api/users/' + id)
    return response.data
  }

  static async deleteAdvert(id) {
    const response = await $api.delete('/api/adverts/' + id)
    return response.data
  }
}
