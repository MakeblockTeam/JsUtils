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
            arr.push(numStr_2)
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
    ascii2Str(ascList) {
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
    /**
     * transform int to ascii
     * @param  {Array} bytes int array
     * @return {String} str string
     */
    bytesToString: function (bytes) {
        var str = '';
        for (var i = 0; i < bytes.length; i++) {
            str += String.fromCharCode(bytes[i]);
        }
        return str;
    },
    /**
     * Float to bytes.
     * 现将float转成整形，再将整形转成字节表示
     * @param  {float} float number
     * @return {bytes}
     */
    float32ToBytes: function (value) {
        // TOFIX: hack
        if (value == 0) {
            return [0, 0, 0, 0];
        }
        var bytesInt = 0;
        switch (value) {
            case Number.POSITIVE_INFINITY:
                bytesInt = 0x7f800000;
                break;
            case Number.NEGATIVE_INFINITY:
                bytesInt = 0xff800000;
                break;
            case +0.0:
                bytesInt = 0x40000000;
                break;
            case -0.0:
                bytesInt = 0xc0000000;
                break;
            default:
                // if (Number.isNaN(value)) { bytesInt = 0x7FC00000; break; }
                if (value <= -0.0) {
                    bytesInt = 0x80000000;
                    value = -value;
                }

                var exponent = Math.floor(Math.log(value) / Math.log(2));
                var significand =
                    (value / Math.pow(2, exponent) * 0x00800000) | 0;

                exponent += 127;
                if (exponent >= 0xff) {
                    exponent = 0xff;
                    significand = 0;
                } else if (exponent < 0) exponent = 0;

                bytesInt = bytesInt | (exponent << 23);
                bytesInt = bytesInt | (significand & ~(-1 << 23));
                break;
        }
        var bytesArray = this.bigIntToBytes(bytesInt);
        return bytesArray;
    },


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


}