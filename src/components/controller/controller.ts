import AppLoader from './appLoader';
import type { EverythingResponse, ResponseCallback, SourcesResponse } from '../../types';

class AppController extends AppLoader {
    public getSources(callback: ResponseCallback<SourcesResponse>): void {
        super.getResp<SourcesResponse>(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    public getNews(event: MouseEvent, callback: ResponseCallback<EverythingResponse>): void {
        const target = event.target;
        const newsContainer = event.currentTarget;

        if (!(target instanceof Element) || !(newsContainer instanceof HTMLElement)) {
            return;
        }

        const sourceItem = target.closest<HTMLElement>('.source__item');

        if (!sourceItem || !newsContainer.contains(sourceItem)) {
            return;
        }

        const sourceId = sourceItem.dataset.sourceId;

        if (!sourceId || newsContainer.dataset.source === sourceId) {
            return;
        }

        newsContainer.dataset.source = sourceId;

        super.getResp<EverythingResponse>(
            {
                endpoint: 'everything',
                options: {
                    sources: sourceId,
                },
            },
            callback
        );
    }
}

export default AppController;
