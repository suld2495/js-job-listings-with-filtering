import Tag from "./Tag.js";
import { createElement } from "./utils/Element.js";

const VALUE = { new: 'NEW!', featured: 'FEATURED' }

export default class Person {
    #tagList = [];
    #data;
    #element = null;

    constructor(data) {
        this.#data = data;
    }

    get tagList() {
        return [this.#data.role, this.#data.level, ...this.#data.languages, ...this.#data.tools];
    }

    createTags() {
        const tags = createElement('div', 'tags');
        this.#tagList = this.tagList.map(v => new Tag(v));
        tags.append(...this.#tagList.map(t => t.render()));
        return tags;
    }

    createThumnail() {
        const thumnail = createElement('div', 'thumnail');
        const img = createElement('img');
        img.src = this.#data.logo;
        thumnail.append(img);
        return thumnail;
    }

    createProfile() {
        const data = this.#data;
        const profile = createElement('div', 'profile');

        const top = createElement('div', 'top');
        const work = createElement('span', 'work', data.company);
        const tags = createElement('div', 'profile-tags');
        const tagElements = ['new', 'featured']
            .filter(attr => data[attr])
            .map(attr => createElement('tag', 'profile-tag', VALUE[attr]));
        tags.append(...tagElements);
        top.append(work, tags);

        const job = createElement('div', 'job', data.position);

        const bottom = createElement('div', 'bottom');
        const date = createElement('span', 'date', data.postedAt);
        const workTime = createElement('span', 'work-time', data.contract);
        const location = createElement('span', 'location', data.location);
        bottom.append(date, workTime, location)

        profile.append(top, job, bottom);
        return profile;
    }

    createPerson() {
        if (this.#element) return this.#element;

        const person = createElement('div', this.#data.featured ? ['person', 'featured'] : 'person');
        
        const thumnail = this.createThumnail();
        const profile = this.createProfile();
        const tags = this.createTags();

        const left = createElement('div', 'left');
        left.append(thumnail, profile);
        person.append(left, tags);

        this.#element = person;
        return person;
    }

    filter(checkList) {
        if (!checkList.length) return true;
        
        return !(checkList.some((tag) => !this.tagList.includes(tag)));
    }
}