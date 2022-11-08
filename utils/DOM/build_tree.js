const is_object = (obj) => {
    if (typeof obj !== "object") return false;
    if (obj === null) return false;
    if (typeof obj === 'function') return false;
    if (obj instanceof Array) return false;
    return true;
}

const dom_element_parser = (element_structure) => {
    if (!is_object(element_structure)) throw "Parameter not an object"

    let current_item = element_structure,
        current_dom_element = null,
        current_children = null,
        current_children_fragment = null;
    let is_text_node = current_item.tag === "text";

    // create Element or Node (text Node)
    if (!is_text_node) {
        current_dom_element = document.createElement(current_item.tag);
    } else {
        current_dom_element = document.createTextNode(current_item.text)
    }

    // add attributes
    if (!is_text_node) {
        // jump to next if text node has attributes
        for (let prop in current_item.attributes) {
            current_dom_element.setAttribute(prop, current_item.attributes[prop]);
        }
    }

    if (!is_text_node && current_item.children && current_item.children.length) {
        current_children = current_item.children;
        current_children_fragment = dom_child_elements_parser(current_children);
        current_dom_element.appendChild(current_children_fragment);
    }

    return current_dom_element;
}

const dom_child_elements_parser = (element_collection) => {
    if (!(element_collection instanceof Array)) throw "Parameter not a collection"

    let current_dom_fragment = document.createDocumentFragment(),
        current_dom_element;

    if (element_collection.length) {
        for (let i = 0; i < element_collection.length; i++) {
            current_dom_element = dom_element_parser(element_collection[i]);
            current_dom_fragment.appendChild(current_dom_element)
        }
    }

    return current_dom_fragment;
}
