import { AxiosRequestConfig } from 'axios';
import PromiseQueue from 'promise-queue';
export declare class RequestBase {
    static queue: PromiseQueue;
    private static sendRequest;
    private static getQueue;
    static setConcurrency(concurrency: number): void;
    static request<T>(options: AxiosRequestConfig): Promise<T>;
}
