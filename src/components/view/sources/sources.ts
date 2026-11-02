import type { SourceItem } from '../../../types';
import './sources.css';

class Sources {
    public draw(data: SourceItem[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');
        const sourcesContainer = document.querySelector<HTMLElement>('.sources');

        if (!sourceItemTemp || !sourcesContainer) {
            throw new Error('Sources template or container was not found');
        }

        data.forEach((source: SourceItem) => {
            const sourceClone: DocumentFragment = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            sourceClone.querySelector<HTMLElement>('.source__item-name')!.textContent = source.name;
            sourceClone.querySelector<HTMLElement>('.source__item')!.dataset.sourceId = source.id;

            fragment.append(sourceClone);
        });

        sourcesContainer.append(fragment);
    }
}

export default Sources;
