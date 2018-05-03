export default {
/**
     * scroll to the bottom
     * @param  {Object} ele document node
     */
    toBottom (ele) {
        ele.scrollTop = ele.scrollHeight;
    },
    // add <script src=${script} id=${id}></script>
    async loadExternalScript(script, id) {
        return new Promise((res, rej) => {
            let elem = document.getElementById(id);
            if (elem) {
                res(elem);
                return;
            }
            elem = document.createElement('script');
            elem.id = id;
            elem.src = script;
            document.body.appendChild(elem);
            elem.onload = () => {
                res(elem);
            };
            elem.onerror = err => {
                rej(err);
            };
        });
    },
}