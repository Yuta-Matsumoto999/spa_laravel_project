import axiosClient from "./axiosClient/axiosClient";

const authApi = {
    initialCsrfToken: () => axiosClient.get("/sanctum/csrf-cookie"),
    register: (params) => axiosClient.post("api/admin/v1/register", params),
    login: (params) => axiosClient.post("api/admin/v1/login", params),
    authenticateCheck: () => axiosClient.get("api/admin/v1/authenticate-check"),
}

export default authApi;