let getArgs = f => {
    let r = f
        .toString()
        .replace(/[\r\n\s]+/g, ' ')
        .match(/\((.*?)\)/)[1]
        .split(/\s*,\s*/)
        .filter(arg=>arg !== '')
    return r
}

class Type {
    constructor(name, option) {
        this.name = name?name:''
        this.option = option?option:[]
    }

    toString() {
        return this.name
    }

    parse(strVal) {
        return strVal
    }

    setOption(...vals) {
        this.option = vals
        return this
    }
}

class PrimaryType extends Type {
    constructor(name, option) {
        super(name, option)
    }

    toString() {
        return this.name
    }

    parse(strVal) {
        if(this.name == 'Number')
            return Number(strVal)
        if(this.name == 'Boolean')
            return Boolean(strVal)
        if(this.name == 'String')
            return strVal
        else return eval(strVal)
    }
}

PrimaryType.boolean_t = ()=>new PrimaryType('Boolean', ['true', 'false'])
PrimaryType.number_t = ()=>new PrimaryType('Number')
PrimaryType.string_t = ()=>new PrimaryType('String')
PrimaryType.any_t = ()=>new PrimaryType('Any')

class OrType extends Type {
    constructor(...types) {
        super()
        this.types = new Set(types)
    }

    or(type) {
        this
            .types
            .add(type)
        return this
    }

    toString() {
        Array
            .from(this.types)
            .map(t => t.toString())
            .join('|')
    }

    static create() {
        return new OrType()
    }
}

class AndType extends Type {
    constructor(...types) {
        super()
        this.types = new Set(types)
    }

    and(type) {
        this
            .types
            .add(type)
        return this
    }

    toString() {
        Array
            .from(this.types)
            .map(t => t.toString())
            .join('&')
    }

    static create() {
        return new AndType()
    }
}

class FuncType extends Type {
    constructor() {
        super()
        this.retType = PrimaryType.string_t()
        this.arguments = []
    }

    arg(name, type) {
        let nameType = this
            .arguments.find(arg=>arg.name === name)
        if(type){
            nameType.type = type
            return this
        }
        return nameType.type
    }

    ret(type) {
        this.retType = type
        return this
    }

    static fromFn(func, name) {
        let r = new FuncType()
        r.name = name;
        let args = getArgs(func)
        for (let arg of args) {
            r
                .arguments
                .push({name: arg, type: PrimaryType.string_t()})
        }
        return r
    }
}

class Signature {
    constructor(cls) {
        this.cls = cls
        this.name = cls.name
        this.methods = []
    }

    method(name) {
        let method = this
            .methods
            .find(m => m.name === name)
        if (!method) {
            method = new FuncType()
            method.name = name
            this.methods.push(method)
        }
        return method
    }

    static getAllMethodNamePairs(cls) {
        let methodNamePairs = []
        let keys = Reflect.ownKeys(cls.prototype)
        keys
            .map(k => {
                if(k === 'constructor') return null;
                let dsc = Object.getOwnPropertyDescriptor(cls.prototype, k)
                if(dsc.value) {
                    if(typeof(dsc.value) !== 'function') return null;
                    return [dsc.value, k];
                } else if(dsc.get) {
                    return [dsc.get, k];
                }
            })
            .filter(m=>m)
            .forEach((k) => methodNamePairs.push(k))
            
        return methodNamePairs;
    }

    static fromClass(cls) {
        let r = new Signature(cls)
        let methodNamePairs = Signature.getAllMethodNamePairs(cls)
        r.methods = methodNamePairs.map(mn => FuncType.fromFn(mn[0], mn[1]))
        cls.signature = r
        return r
    }
}

// window.PrimaryType = PrimaryType
// window.FuncType = FuncType
window.__Signature = Signature


export {PrimaryType, FuncType, Signature}