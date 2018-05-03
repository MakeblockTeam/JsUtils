import utf8 from 'utf8';
export default {
    utf8,
    // Uint8Array to Base64
    uint8ArrayToBase64 (uint8) {
        if (uint8 instanceof Uint8Array) {
            return window.btoa(uint8);
        }
        return '';
    },

    // Base64 to Uint8Array
    base64ToUint8Array (base64) {
        if (typeof base64 === 'string') {
            return new Uint8Array(window.atob(base64).split(','));
        }
    },

    base64ToArrayBuffer (base64) {
        var binary_string = window.atob(base64);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    },

    textToBase64 (text) {
        return window.btoa(window.unescape(window.encodeURIComponent(text)));
    },

    base64ToText(text) {
        return window.decodeURIComponent(window.escape(window.atob(text)));
    },
     /**
         * Convert ArrayBuffer from array of int
         * @param  {ArrayBuffer} buffer the source arraybuffer
         * @return {[int]}        int array as the result;
         * @private
         */
    arrayFromArrayBuffer: function(buffer) {
            var dataView = new Uint8Array(buffer);
            var result = [];
            for (var i = 0; i < dataView.length; i++) {
                result.push(dataView[i]);
        }
        return result;
    },

    /**
     * n个byte转成int值
     * @param  {Array} bytes 传入的bytes数组
     * @return {Number}          返回的int数值
     */
    bytesToInt(bytes) {
        var val = 0;
        for (var i = bytes.length - 1; i >= 0; i--) {
            val += bytes[bytes.length - i - 1] << (i * 8);
        }
        return val;
    },

    /**
     * 整形转换成字节数组
     * @param  {number} value 整形
     * @return {array}  array数组
     */
    bigIntToBytes: function(value) {
        var bytesArray = [];
        var b1 = value & 0xff;
        var b2 = (value >> 8) & 0xff;
        var b3 = (value >> 16) & 0xff;
        var b4 = (value >> 24) & 0xff;
        bytesArray.push(b1);
        bytesArray.push(b2);
        bytesArray.push(b3);
        bytesArray.push(b4);
        return bytesArray;
    },
    /**
         * [hexBuf return hex string representation of an ArrayBuffer]
         * @param  {[buf]} buf  [the input buf]
         * @return {[string]}     [the hex string representation]
         */
        hexBuf(buf) {
            var view = new Uint8Array(buf);
            var hex = '0x';
            var byte = '';
    
            for (var i = 0; i < view.length; i++) {
                byte = view[i].toString(16);
                if (byte.length < 2) {
                    byte = '0' + byte;
                }
                hex += byte;
            }
    
            return hex;
        },
        /**
         * [bufferEqual return if two ArrayBuffer is deep equal]
         * @param  {[type]} buf1 [the first buf]
         * @param  {[type]} buf2 [the second buf]
         * @return {[type]}      [return true if two ArrayBuffer is equal, false if not.]
         */
    bufferEqual(buf1, buf2) {
        if (!(buf1 instanceof ArrayBuffer) || !(buf2 instanceof ArrayBuffer)) {
            return false;
        }

        if (buf1.byteLength !== buf2.byteLength) {
            return false;
        }

        var view1 = new Uint8Array(buf1);
        var view2 = new Uint8Array(buf2);

        for (var i = 0; i < view1.length; i++) {
            if (view1[i] !== view2[i]) {
                return false;
            }
        }

        return true;
    },
     /**
         * [copyBuffer copy the bytes in src to desc from 'start' index]
         * @param  {[ArrayBuffer]} src   [the source buffer]
         * @param  {[ArrayBuffer]} des   [the destination buffer]
         * @param  {[type]} start [if specified, will copy from start index of desc]
         * @return {[ArrayBuffer]}       [the desc array buffer]
         */
        copyBuffer(src, des, start) {
            if (src === des) {
                return des;
            }
    
            var idx = start || 0;
    
            var srcView = new Int8Array(src);
            var desView = new Int8Array(des);
    
            for (var i = 0; i < srcView.length; i++) {
                if (idx + i >= desView.length) {
                    break;
                }
                desView[idx + i] = srcView[i];
            }
    
            return des;
        },
        longToBytes(value) {
            var bytes = [];
            var i = 4;
            do {
                bytes[--i] = value & 255;
                value = value >> 8;
            } while (i);
            return bytes;
        },
        intArrayToHexArray(data) {
            var temp = [];
            for (var i = 0; i < data.length; i++) {
                if (data[i] !== null) {
                    var item = parseInt(data[i]).toString(16);
                    if (item.length === 1) {
                        item = '0' + item;
                    }
                    temp.push(item);
                }
            }
            return temp;
        },
        /**
         * Convert array of int to ArrayBuffer.
         * @param  {[int]} data array of int
         * @return {ArrayBuffer}      result array buffer
         * @private
         */
    arrayBufferFromArray(data) {
        var buffer = new ArrayBuffer(data.length);
        var result = new Int8Array(buffer);
        for (var i = 0; i < data.length; i++) {
            result[i] = data[i];
        }
        return buffer;
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
}