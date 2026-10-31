import News from './news/news';
import Sources from './sources/sources';
import type { EverythingResponse, SourcesResponse } from '../../types';

export class AppView {
    private readonly news: News;
    private readonly sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data?: Partial<EverythingResponse>): void {
        const articles = data?.articles ?? [];
        this.news.draw(articles);
    }

    public drawSources(data?: Partial<SourcesResponse>): void {
        const sources = data?.sources ?? [];
        this.sources.draw(sources);
    }
}

export default AppView;
