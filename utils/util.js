

/* global ArrayBuffer, Int8Array, Uint8Array, navigator, location */
export default {


    projectValidate(json) {
        const obj =
            typeof json === 'object'
                ? Object.assign({}, json.ide || json)
                : JSON.parse(json);
        return Array.isArray(obj.targets) && obj.meta;
    },
    //
    
    // 深度合并两个object
    combineObject(obj1, obj2) {
        let obj = {}
        for(let k of Reflect.ownKeys(obj1)){
            obj[k] = obj1[k]
        }

        for(let k of Reflect.ownKeys(obj2)){
            let v1 = obj[k]
            let v2 = obj2[k]
            if(typeof(v1) == "object"){
                if(typeof(v2) == "object"){
                    obj[k] = this.combineObject(v1, v2);
                    continue;
                }
            }
            obj[k] = v2;
        }
        return obj;
    },
    args2color(...args){
        if(args.length == 3){ //(1~255, 255, 255)
            let r = Number.parseInt(args[0])
            let g = Number.parseInt(args[1])
            let b = Number.parseInt(args[2])
            if(isNaN(r)) r = 0
            if(isNaN(g)) g = 0
            if(isNaN(b)) b = 0
            return (r%255).toString(16).padStart(2,'0')+(g%255).toString(16).padStart(2,'0')+(b%255).toString(16).padStart(2,'0')
        } else if(args.length >= 1){
            if(args[0].startsWith('#')){
                return args[0].slice(1).toLowerCase()
            } else {
                const color2code = {
                    red:'ff0000',
                    green:'00ff00',
                    blue:'0000ff',
                    orange:'FFA500',
                    yellow:'ffff00',
                    cyan:'00ffff',
                    purple:'800080',
                    black:'000000',
                    grey:'808080',
                    white:'ffffff'
                }
                let strCol = color2code[args[0].toLowerCase()]
                if(strCol === undefined) strCol = '000000'
                return strCol
            }
        }
        return '000000'
    }

};