import Tag from "./Tag.js";
import { createElement } from "./utils/Element.js";

export default class Person {
    #tagList = [];
    #data;

    constructor(data) {
        this.data = data;
    }

    createTags() {
        const tags = createElement('div', 'tags');
        this.#tagList = ['Frontend'].map(v => new Tag(v));
        tags.append(...this.#tagList.map(t => t.render()));
    }

    createThumnail() {
        const thumnail = createElement('div', 'thumnail');
        const img = createElement('img');
        img.src = '';

        return thumnail;
    }

    createProfile() {
        const profile = createElement('div', 'profile');

        const top = createElement('div', 'top');
        const work = createElement('span', 'work', 'Photosnap');
        const tags = createElement('div', 'profile-tags');
        const tagElements = ['new'].map(() => {
            const tag = createElement('tag', 'profile-tag', 'NEW!');
            return tag;
        });
        tags.append(...tagElements);
        top.append(work, tags);

        const job = createElement('div', 'job', 'Senior Frontend Developer');

        const bottom = createElement('div', 'bottom');
        const date = createElement('span', 'date', '1d ago');
        const workTime = createElement('span', 'work-time', 'Full Time');
        const location = createElement('span', 'location', 'USA only');
        bottom.append(date, workTime, location)

        profile.append(top, job, bottom);
        return profile;
    }

    createPerson() {
        const person = document.createElement('div');
        person.classList.add('person');
        
        const thumnail = this.createThumnail();
        const profile = this.createProfile();
        const tags = this.createTags();

        person.append(thumnail, profile, tags);

        return person;
    }
}