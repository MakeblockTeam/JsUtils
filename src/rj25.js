import string from './string';

const isString = string.isString;

export default {
    formatFaceData (code) {
        if (!isString(code)) {
            return code
        }

        var reg = /new unsigned char\[16\]{.+?}/g;
        return code.replace(reg, function (item) {
            var data = item.substring(22, item.length - 1);
            var result = [];
            for (var i = 0; i + 8 <= data.length; i += 8) {
                var tmpD = data.substring(i, i + 8);
                tmpD = parseInt(tmpD, 2);
                result.push(tmpD);
            }
            return 'new unsigned char[16]{' + result.join(',') + '}';
        });
    },

    formatColorData (code) {
        if (!isString(code)) {
            return code
        }

        var reg = /#[0-9A-f]+/g;
        return code.replace(reg, (item) => {
            item = item.replace('#', '0x');
            let r = Number(item) >> 16;
            let g = Number(item) >> 8 & 0xff;
            let b = Number(item) & 0xff;
            return [r, g, b].join(',');
        });
    },

    formatPowerData (code) {
        if (!isString(code)) {
            return code
        }

        var reg = /[0-9]+%/g;
        return code.replace(reg, (item) => {
            item = item.replace('%', '');
            return Number(item) / 100 * 255;
        });
    }
}