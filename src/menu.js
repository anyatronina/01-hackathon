import { Menu } from './core/menu';
import { BackgroundModule } from './modules/background.module';
import { ShapeModule } from './modules/shape.module';
import { ClicksModule } from './modules/clicks.module';


export class ContextMenu extends Menu {
	constructor(selector) {
		super(selector);

		this.backgroundModule = new BackgroundModule('backgroundModule', 'Поменять цвет');
		this.shapeModule = new ShapeModule('shapeModule', 'Создать фигуру');
		this.clicksModule = new ClicksModule('clicksModule', 'Считать клики за 3 секунды');
	}

	open() {
		this.add();
		const isModulesInMenu = (this.el.children.length);

		document.body.addEventListener('contextmenu', (event) => {
			event.preventDefault();

			if (!isModulesInMenu) return;

			this.el.style.top = `${event.clientY}px`;
			this.el.style.left = `${event.clientX}px`;

			this.el.classList.add('open');
		})


		this.el.addEventListener('click', (event) => {
			const calledModule = event.target.dataset.type;

			const isBackgroundModule = (calledModule === 'backgroundModule');
			const isShapeModule = (calledModule === 'shapeModule');
			const isClicksModule = (calledModule === 'clicksModule');

			if (isBackgroundModule) this.backgroundModule.trigger();
			if (isShapeModule) this.shapeModule.trigger();
			if (isClicksModule) this.clicksModule.trigger();

			this.close();
		})
	}

	close() {
		this.el.classList.remove('open');
	}

	add() {
		const moduleHTML1 = this.backgroundModule.toHTML();
		this.el.insertAdjacentHTML('beforeend', moduleHTML1);

		const moduleHTML2 = this.shapeModule.toHTML();
		this.el.insertAdjacentHTML('beforeend', moduleHTML2);

		const moduleHTML3 = this.clicksModule.toHTML();
		this.el.insertAdjacentHTML('beforeend', moduleHTML3);
	}

}