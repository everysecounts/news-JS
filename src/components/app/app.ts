import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    private readonly controller: AppController;
    private readonly view: AppView;
    private readonly sources: HTMLElement;
    private readonly menuToggle: HTMLButtonElement;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();

        const sources = document.querySelector<HTMLElement>('.sources');
        const menuToggle = document.querySelector<HTMLButtonElement>('.menu-toggle');

        if (!sources || !menuToggle) {
            throw new Error('Sources container or menu toggle was not found');
        }

        this.sources = sources;
        this.menuToggle = menuToggle;
    }

    public start(): void {
        this.sources.addEventListener('click', (event: MouseEvent) => {
            const target = event.target;

            if (!(target instanceof Element)) return;

            const selectedSource = target.closest<HTMLElement>('.source__item');

            if (!selectedSource || !this.sources.contains(selectedSource)) return;

            this.sources.querySelector('.active')?.classList.remove('active');
            selectedSource.classList.add('active');

            this.controller.getNews(event, (data) => this.view.drawNews(data));
            this.closeMenu();
        });

        this.menuToggle.addEventListener('click', () => {
            this.toggleMenu();
        });

        document.addEventListener('click', (event: MouseEvent) => {
            const target = event.target;

            if (
                this.sources.classList.contains('is-open') &&
                target instanceof Node &&
                !this.sources.contains(target) &&
                !this.menuToggle.contains(target)
            ) {
                this.closeMenu();
            }
        });

        document.addEventListener('keydown', (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                this.closeMenu();
            }
        });

        this.controller.getSources((data) => this.view.drawSources(data));
    }

    private toggleMenu(): void {
        const isOpen = this.sources.classList.toggle('is-open');

        document.body.classList.toggle('menu-open', isOpen);

        this.menuToggle.setAttribute('aria-expanded', String(isOpen));
        this.menuToggle.setAttribute('aria-label', isOpen ? 'Close sources menu' : 'Open sources menu');
    }

    private closeMenu(): void {
        this.sources.classList.remove('is-open');
        document.body.classList.remove('menu-open');

        this.menuToggle.setAttribute('aria-expanded', 'false');
        this.menuToggle.setAttribute('aria-label', 'Open sources menu');
    }
}

export default App;
