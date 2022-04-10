import { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from "axios";
import {
    GetJobOptions,
    Job,
    ListProjectJobsOptions,
    ListPipelineJobsOptions,
    GetJobLogOptions,
} from "../interface/api/jobs";

import { PaginatedResponse } from "../interface/api/PaginatedResponse";
import ApiEndpoint from "./AbstractApiEndpoint";

export class Jobs extends ApiEndpoint {
    /**
     * Get a list of jobs in a project. Jobs are sorted in descending order of their IDs.
     * @param options Query options
     * @returns List of jobs in project
     */
    public listProjectJobs(options: ListProjectJobsOptions, page: number = 1, perPage: number = 20): Promise<PaginatedResponse<Job>> {
        return this.getAxios().get(`projects/${options.id}/jobs?page=${page}&per_page=${perPage}`)
            .then((response: AxiosResponse) => this.paginatedResult<Job>(response.data, response.headers))
    }

    /**
     * Get a list of jobs for a pipeline.
     * @param options Query options
     * @param page Page number to fetch
     * @param perPage Jobs per page
     * @returns List of jobs in pipeline
     */
    public listPipelineJobs(options: ListPipelineJobsOptions, page: number = 1, perPage: number = 20): Promise<PaginatedResponse<Job>> {
        return this.getAxios().get<Job[]>(`projects/${options.id}/pipelines/${options.pipeline_id}/jobs?page=${page}&per_page=${perPage}`)
            .then((response: AxiosResponse<Job[]>) => this.paginatedResult<Job>(response.data, response.headers));
    }

    /**
     * Get a single job of a project
     * @param options Query options
     * @returns A job
     */
    public getJob(options: GetJobOptions): Promise<Job> {
        return this.getAxios().get<Job>(`projects/${options.id}/jobs/${options.job_id}`)
            .then((response: AxiosResponse<Job>) => response.data);
    }

    public getJobLog(options: GetJobLogOptions): Promise<string> {
        return this.getAxios().get<string>(`projects/${options.id}/jobs/${options.job_id}/trace`)
            .then((response: AxiosResponse<string>) => response.data);
        // const interceptor = (config: AxiosRequestConfig<any>) => {
        //     if((config.headers as AxiosRequestHeaders)["Accept"]) {
        //         (config.headers as AxiosRequestHeaders)["Accept"] = "text/plain";
        //     }

        //     return config;
        // }
        // this.getAxios().interceptors.request.use(interceptor, () => console.log("error"));

        // this.getAxios().interceptors.request.eject(interceptor);
    }
}