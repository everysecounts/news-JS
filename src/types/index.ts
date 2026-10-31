export type NewsCategory = 'business' | 'entertainment' | 'general' | 'health' | 'science' | 'sports' | 'technology';

export type NewsLanguage =
    | 'ar'
    | 'de'
    | 'en'
    | 'es'
    | 'fr'
    | 'he'
    | 'it'
    | 'nl'
    | 'no'
    | 'pt'
    | 'ru'
    | 'sv'
    | 'ud'
    | 'zh';

export interface NewsSource {
    id: string | null;
    name: string;
}

export interface Source {
    id: string;
    name: string;
    description: string;
    url: string;
    category: NewsCategory;
    language: NewsLanguage;
    country: string;
}

export interface Article {
    source: NewsSource;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface SourcesResponse {
    status: 'ok' | 'error';
    sources: Source[];
}

export interface EverythingResponse {
    status: 'ok' | 'error';
    totalResults: number;
    articles: Article[];
}

export enum HTTPMethods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export type RequestOptions = Record<string, string | undefined>;

export interface RequestParams {
    endpoint: string;
    options?: RequestOptions;
}

export type ResponseCallback<T> = (data: T) => void;
