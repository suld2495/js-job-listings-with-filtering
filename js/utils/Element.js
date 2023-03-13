export const createElement = (elementName, classList, text = '') => {
    const element = document.createElement(elementName);

    if (Array.isArray(classList)) {
        element.classList.add(...classList);
    } else {
        element.classList.add(classList);
    }

    element.textContent = text;
    
    return element;
}