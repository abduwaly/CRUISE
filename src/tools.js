
export function $id(eleId) {
    return document.getElementById(eleId);
}

export function $class(className) {
    return document.getElementsByClassName(className);
}

export function $create(tag, className) {
    const el = document.createElement(tag);
    el.className = className;
    return el;
}

export function $show(ele) {
    ele.style.display = 'block';
}

export function $hide(ele) {
    ele.style.display = 'none';
}