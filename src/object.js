export default {
    // 深度合并两个object
    combineObject(obj1, obj2) {
        let obj = {}
        for (let k of Reflect.ownKeys(obj1)) {
            obj[k] = obj1[k]
        }

        for (let k of Reflect.ownKeys(obj2)) {
            let v1 = obj[k]
            let v2 = obj2[k]
            if (typeof (v1) == "object") {
                if (typeof (v2) == "object") {
                    obj[k] = this.combineObject(v1, v2);
                    continue;
                }
            }
            obj[k] = v2;
        }
        return obj;
    },

    isInMblock5Env() {
        return (typeof MbApi !== 'undefined' && window.MbApi.middlewares);
    }
};