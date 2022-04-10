import { AxiosInstance, AxiosResponseHeaders } from "axios";
import { PaginatedResponse } from "../interface/api/PaginatedResponse";

export default abstract class AbstractApiEndpoint {
    private axios: AxiosInstance;

    public constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    protected getAxios(): AxiosInstance {
        return this.axios;
    }

    protected paginatedResult<Type>(data: Type[], headers: AxiosResponseHeaders): PaginatedResponse<Type> {
        return {
            nextPage: parseInt(headers["x-next-page"]) || -1,
            page: parseInt(headers["x-page"]) || -1,
            perPage: parseInt(headers["x-per-page"]) || -1,
            prevPage: parseInt(headers["x-prev-page"]) || -1,
            total: parseInt(headers["x-total"]) || -1,
            totalPages: parseInt(headers["x-total-pages"]) || -1,
            items: data
        }
    }
}