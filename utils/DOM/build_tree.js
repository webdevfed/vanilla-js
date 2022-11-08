    const build_dom_tree =  (build_tree) => {
        let current_fragment = document.createDocumentFragment();
        let current_item;
        let current_element;
        let current_children;
        let is_text_node = false;
        for (let i = 0; i < build_tree.length; i++) {
            current_item = build_tree[i];
            is_text_node = current_item.tag === "text" ? true : false;

            // create element
            if (!is_text_node) {
                current_element = document.createElement(current_item.tag);
            } else {
                current_element = document.createTextNode(current_item.text)
            }

            // add attributes

            for (let prop in current_item.attributes) {
                current_element.setAttribute(prop, current_item.attributes[prop]);
            }

            // build children
            if (current_item.children && current_item.children.length) {
                current_children = build_dom_tree(current_item.children);
                current_element.appendChild(current_children);
            }
            current_fragment.append(current_element);
        }

        return current_fragment; // retuns fragment
    }
