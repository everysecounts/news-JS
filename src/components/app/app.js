import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
        this.sources = document.querySelector('.sources');
        this.menuToggle = document.querySelector('.menu-toggle');
    }

    start() {
        this.sources.addEventListener('click', (e) => {
            const selectedSource = e.target.closest('.source__item');

            if (!selectedSource) return;

            this.sources.querySelector('.active')?.classList.remove('active');
            selectedSource.classList.add('active');

            this.controller.getNews(e, (data) => this.view.drawNews(data));
            this.closeMenu();
        });

        this.menuToggle.addEventListener('click', () => {
            this.toggleMenu();
        });

        document.addEventListener('click', (e) => {
            if (
                this.sources.classList.contains('is-open') &&
                !this.sources.contains(e.target) &&
                !this.menuToggle.contains(e.target)
            ) {
                this.closeMenu();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMenu();
            }
        });

        this.controller.getSources((data) => this.view.drawSources(data));
    }

    toggleMenu() {
        const isOpen = this.sources.classList.toggle('is-open');

        document.body.classList.toggle('menu-open', isOpen);

        this.menuToggle.setAttribute('aria-expanded', String(isOpen));
        this.menuToggle.setAttribute('aria-label', isOpen ? 'Close sources menu' : 'Open sources menu');
    }

    closeMenu() {
        this.sources.classList.remove('is-open');
        document.body.classList.remove('menu-open');

        this.menuToggle.setAttribute('aria-expanded', 'false');
        this.menuToggle.setAttribute('aria-label', 'Open sources menu');
    }
}

export default App;
