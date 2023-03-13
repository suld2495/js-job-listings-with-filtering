export default class Tag {
    #name;
    #element;

    constructor(name) {
        this.#name = name;
        this.#element = this.createElement();
    }

    onClick() {

    }

    get name() {
        return this.#name; 
    }

    createElement() {
        const tag = document.createElement('span');
        tag.textContent = this.#name;
        tag.classList.add('tag');
        return tag;
    }

    render() {
        this.#element = this.createElement();
        return this.#element;
    }
}