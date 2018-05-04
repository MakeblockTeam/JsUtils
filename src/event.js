export default {
    /**
     * @param {array/element} elements DOM元素，可以传入数组
     * @param {array/string} events 事件类型，可以传入数组或字符串
     * @param {function} hanlder 事件回调
     */
    bindEvents(elements, events, hanlder) {
        elements = elements.length > 1 ? elements : [elements];
        events = Array.isArray(events) ? events : events.split(' ');
        for (let i = 0; i < elements.length; i++) {
            for (let j = 0; j < events.length; j++) {
                elements[i].addEventListener(events[j], hanlder);
            }
        }
    },

    /**
     * @param {array/element} elements DOM元素，可以传入数组
     * @param {array/string} events 事件类型，可以传入数组或字符串
     * @param {function} hanlder 事件回调
     */
    unbindEvents(elements, events, hanlder) {
        elements = elements.length > 1 ? elements : [elements];
        events = Array.isArray(events) ? events : events.split(' ');
        for (let i = 0; i < elements.length; i++) {
            for (let j = 0; j < events.length; j++) {
                elements[i].removeEventListener(events[j], hanlder);
            }
        }
    },
}