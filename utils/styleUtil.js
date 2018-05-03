
class StyleUtil {
    constructor() {
        var style = document.createElement("style");
        style.appendChild(document.createTextNode(""));
        document.head.appendChild(style);
        this.style = style;
    }

    addRule(selector, style) {
        this.style.sheet.addRule(selector, style);
    }

    removeRule(selector) {
        this.style.sheet.deleteRule(selector);
    }

    clear() {
        this.style.children.clear();
    }
}

export default new StyleUtil();