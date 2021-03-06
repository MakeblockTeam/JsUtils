export default {

    isString (value) {
        return typeof value === 'string' || value instanceof String;
    },

    /**
     * 转义字符串中出现的: &, <, >, ', "
     */
    doEscape (text) {
        let result = text.replace(/&/g, '&amp;').replace(/</g, '&lt;')
            .replace(/>/g, '&gt;').replace(/'/g, "&apos;")
            .replace(/"/g, '&quot;');
        return result;
    },

    /**
     * 还原转义过的字符为正常字符: &, <, >, ', "
     */
    unEscape (text) {
        let result = text.replace(/&amp;/g, '&').replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>').replace(/&apos;/g, "'")
            .replace(/&quot;/g, '"');
        return result;
    },

    hasEscapeChar (text) {
        let  keyChars = /[&<>'"]/;
        let result = false;
        if (keyChars.test(text)) {
            result = true;
        }
        return result;
    },
    /**
     * UUID generator
     * @param {number} len length of uuid string
     * @param {radix} radix the base of UUID char
     * @return {string} uuid
     */
    genUUID(len, radix) {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(
            ''
        );
        var uuid = [];
        var i;
        radix = radix || chars.length;

        if (len) {
            // Compact form
            for (i = 0; i < len; i++) {
                uuid[i] = chars[0 | (Math.random() * radix)];
            }
        } else {
            // rfc4122, version 4 form
            var r;

            // rfc4122 requires these characters
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';

            // Fill in random data.  At i==19 set the high bits of clock sequence as per
            // rfc4122, sec. 4.1.5
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | (Math.random() * 16);
                    uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
                }
            }
        }

        return uuid.join('');
    },
    stringToAsciiCode(string) {
        var result = [];
        var list = string.split('');
        for (var i in list) {
            result.push(list[i].charCodeAt());
        }
        return result;
    },

    // usage: stringTemplate(`${arg1}, ${arg2}`, {arg1:'val1', arg2:'val2'})
    stringTemplate(strTemplate, env) {
        const tpl = new Function("return `"+strTemplate+"`;");
        return tpl.call(env);
    },

    generateStrList (str) {
        let strList = [];
        if(Array.isArray(str)) {
            strList = [].concat(str);
        }else if(typeof str === 'string') {
            strList = [str];
        }
        return strList;
    },
    headUpperCase(letters) {
        if(typeof letters === 'string' && letters.length) {
            return letters[0].toUpperCase() + letters.substring(1);
        }
    }
}