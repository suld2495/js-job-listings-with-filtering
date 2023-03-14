import Person from "./Person.js";
import { createElement } from "./utils/Element.js";

export const people = [];

class Container {
  #people = [];
  #filter = new Set();
  #root;

  constructor() {
    this.addEvent();
  }

  addEvent() {
    document.addEventListener('click', (e) => {
      const { target } = e;

      if (!target.matches('.tags .tag')) {
        return;
      }

      const { tag } = target.dataset;
      this.#filter.add(tag);
      this.createFilter();
    });

    document.querySelector('.filter').addEventListener('click', (e) => {
      const { target } = e;

      if (target.matches('.clear')) {
        this.#filter.clear();
        this.createFilter();
        return;
      }

      if (!target.matches('.filter-item span:last-child')) {
        return;
      }

      const { tag } = target.closest('.filter-item').dataset;
      this.#filter.delete(tag);
      this.createFilter();
    });
  }

  createFilter() {
    if (this.#filter.size) {
      document.querySelector('.filter').classList.add('show');
    } else {
      document.querySelector('.filter').classList.remove('show');
      this.render();
      return;
    }

    const filterList = [...this.#filter].map(tag => {
      const filter = createElement('div', 'filter-item');
      filter.dataset.tag = tag;
      const filterName = createElement('span');
      filterName.textContent = tag;
      const filterClose = createElement('span');
      filter.append(filterName, filterClose);
      return filter;
    })

    const container = document.createDocumentFragment();
    container.append(...filterList);

    const filterbox = document.querySelector('.filterbox');
    
    filterbox.innerHTML = '';
    filterbox.appendChild(container);
    this.render();
  }

  createElement(list, root) {
    this.#people = list.map((data) => new Person(data));
    this.#root = root;
    return this;
  }

  render() {
    const container = document.createDocumentFragment();

    const $elements = this.#people
      .filter(person => person.filter([...this.#filter]))
      .map(person => person.createPerson());

    container.append(...$elements);

    const root = document.querySelector(this.#root);
    root.innerHTML = '';
    root.append(container);
  }
}

export default new Container();