export default {
    hexToStr(data) {
        const arr = [];
        for (let i = 0; i < data.length - 1; i += 2) {
            const numStr_16 = data[i] + data[i + 1];
            const num_16 = parseInt(numStr_16, 16);
            let numStr_2 = num_16.toString(2)
            while (numStr_2.length < 8) {
                numStr_2 = '0' + numStr_2
            }
            arr.push(numStr_2);
        }
        return arr.join('');
    },
    isNumberString(str) {
        const numberReg = /^\'(-?\d*)(\.\d+)?\'$/;
        const spaceReg = /^\'\s*\'$/;
        return numberReg.test(str) || spaceReg.test(str);
    },
    isNumberStringForC(str) {
        const numberReg = /^\"(-?\d*)(\.\d+)?\"$/;
        const spaceReg = /^\"\s*\"$/;
        return numberReg.test(str) || spaceReg.test(str);
    },
    /**
     * limit value
     * @param  {Number} value
     * @param  {Array} range  (optional) limit value range, such as [-255, 255], [0, 3000], default is [-255, 255]
     * @return {Number} newSpeed the result value in limit.
     */
    limitValue(value, range) {
        var newValue = value;
        range = range || [-255, 255];
        if (value < range[0]) {
            newValue = range[0];
        }

        if (value > range[1]) {
            newValue = range[1];
        }
        return newValue;
    },

    hexToRgb(hex) {
        let validHexColorReg = /^#(?:[0-9a-f]{3}){1,2}$/i;
        if (!validHexColorReg.test(hex)) {
            throw Error(`${hex} is not a valid hex color`);
        }
        let r = parseInt(hex.substr(1, 2), 16),
            g = parseInt(hex.substr(3, 2), 16),
            b = parseInt(hex.substr(5, 2), 16);
        return [r, g, b];
    },
    /**
     * [ascii2Str description]
     * @param  {String|Array} ascList ascii string or array
     * @return {String}
     */
    


    handleMathExpression(expStr, isText) {
        let result = expStr;
        let isNumber = true;
        let str = expStr.replace(/\'/g, '');
        if (isText) {
            let excludeChar = ['.', '+', '-', '*', '/', '^', '%'];
            //排除数字运算
            for (let l of str) {
                let ascii = l.charCodeAt();
                // exclude char: 0 ~ 9 . - + * / ^ %
                if ((ascii < 48 || ascii > 57) && !excludeChar.includes(l)) {
                    isNumber = false;
                    break;
                }
            }
            if (isNumber && str.length >= 1) {
                //正则处理类似 eval 报错的情形：'00.2 + 00.12'
                str = str.replace(/(\d+(\.\d+)?)/g, val => Number(val));
                try {
                    result = eval(str);
                } catch (e) {
                    result = str;
                }
            }
        }
        return result;
    },
    ascii2ToStr(ascList) {
        let arr;
        if (ascList instanceof Array) {
            arr = ascList;
        } else if (typeof ascList === 'string') {
            arr = ascList.split(',');
        }
        let b = '';
        for (let val of arr) {
            b += String.fromCharCode(val);
        }
        return b;
    },

}