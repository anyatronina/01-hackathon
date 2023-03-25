import { Menu } from './core/menu';
import { BackgroundModule } from "./modules/background.module";
import { ShapeModule } from "./modules/shape.module";
import { ClicksModule } from "./modules/clicks.module";


export class ContextMenu extends Menu {

	open() {
		document.body.addEventListener('contextmenu', (event) => {
			event.preventDefault();
			this.el.style.top = `${event.clientY}px`;
			this.el.style.left = `${event.clientX}px`;
			this.el.classList.add('open');
		})

		this.add();
	}

	close() {
		this.el.classList.remove('open');
	}

	add() {
		const backgroundModule = new BackgroundModule('backgroundModule', 'Поменять цвет');
		const moduleHTML1 = backgroundModule.toHTML();
		this.el.insertAdjacentHTML('beforeend', moduleHTML1);

		const shapeModule = new ShapeModule('shapeModule', 'Создать фигуру');
		const moduleHTML2 = shapeModule.toHTML();
		this.el.insertAdjacentHTML('beforeend', moduleHTML2);

		const clicksModule = new ClicksModule('clicksModule', 'Считать клики за 3 секунды');
		const moduleHTML3 = clicksModule.toHTML();
		this.el.insertAdjacentHTML('beforeend', moduleHTML3);
	}

}