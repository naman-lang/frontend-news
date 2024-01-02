import { NewsData } from "./news-data";

export class NewsResponse {
    headers: any;
    body: NewsData[]|any;
    statusCode: string|any;
    statusCodeValue: number|any;
}
