import Map from 'es6-map'
import Set from 'es6-set'

if (!window.Map) {
    window.Map = Map
}

if (!window.Set) {
    window.Set = Set
}

// https://tc39.github.io/ecma262/#sec-array.prototype.find
if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
        value: function (predicate) {
            // 1. Let O be ? ToObject(this value).
            if (this == null) {
                throw new TypeError('"this" is null or not defined')
            }

            var o = Object(this)

            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0

            // 3. If IsCallable(predicate) is false, throw a TypeError exception.
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function')
            }

            // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
            var thisArg = arguments[1]

            // 5. Let k be 0.
            var k = 0

            // 6. Repeat, while k < len
            while (k < len) {
                // a. Let Pk be ! ToString(k).
                // b. Let kValue be ? Get(O, Pk).
                // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
                // d. If testResult is true, return kValue.
                var kValue = o[k]
                if (predicate.call(thisArg, kValue, k, o)) {
                    return kValue
                }
                // e. Increase k by 1.
                k++
            }

            // 7. Return undefined.
            return undefined
        }
    })
}

// object.prototype assign
if (typeof window.Object.assign != 'function') { // 这里必须window, webpack里的Object非window.Object
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(window.Object, 'assign', {
        value: function assign(target) { // .length of function is 2
            'use strict'
            if (target == null) { // TypeError if undefined or null
                throw new TypeError('Cannot convert undefined or null to object')
            }

            var to = window.Object(target)

            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index]

                if (nextSource != null) { // Skip over if undefined or null
                    for (var nextKey in nextSource) {
                        // Avoid bugs when hasOwnProperty is shadowed
                        if (window.Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey]
                        }
                    }
                }
            }
            return to
        },
        writable: true,
        configurable: true
    })
}

// Array.prototype.includes
if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, 'includes', {
        value: function (searchElement, fromIndex) {

            // 1. Let O be ? ToObject(this value).
            if (this == null) {
                throw new TypeError('"this" is null or not defined')
            }

            var o = Object(this)

            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0

            // 3. If len is 0, return false.
            if (len === 0) {
                return false
            }

            // 4. Let n be ? ToInteger(fromIndex).
            //    (If fromIndex is undefined, this step produces the value 0.)
            var n = fromIndex | 0

            // 5. If n ≥ 0, then
            //  a. Let k be n.
            // 6. Else n < 0,
            //  a. Let k be len + n.
            //  b. If k < 0, let k be 0.
            var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0)

            // 7. Repeat, while k < len
            while (k < len) {
                // a. Let elementK be the result of ? Get(O, ! ToString(k)).
                // b. If SameValueZero(searchElement, elementK) is true, return true.
                // c. Increase k by 1.
                // NOTE: === provides the correct "SameValueZero" comparison needed here.
                if (o[k] === searchElement) {
                    return true
                }
                k++
            }

            // 8. Return false
            return false
        }
    })
}

// String.prototype.includes
if (!String.prototype.includes) {
    String.prototype.includes = function (search, start) {
        'use strict'
        if (typeof start !== 'number') {
            start = 0
        }

        if (start + search.length > this.length) {
            return false
        } else {
            return this.indexOf(search, start) !== -1
        }
    }
}

// String.prototype.startsWith
if (!String.prototype.startsWith) {
    (function () {
        'use strict'; // needed to support `apply`/`call` with `undefined`/`null`
        var defineProperty = (function () {
            // IE 8 only supports `Object.defineProperty` on DOM elements
            try {
                var object = {}
                var $defineProperty = Object.defineProperty
                var result = $defineProperty(object, object, object) && $defineProperty
            } catch (error) {
                // TODO: handle error
            }
            return result
        }())
        var toString = {}.toString
        var startsWith = function (search) {
            if (this == null) {
                throw TypeError()
            }
            var string = String(this)
            if (search && toString.call(search) == '[object RegExp]') {
                throw TypeError()
            }
            var stringLength = string.length
            var searchString = String(search)
            var searchLength = searchString.length
            var position = arguments.length > 1 ? arguments[1] : undefined
            // `ToInteger`
            var pos = position ? Number(position) : 0
            if (pos != pos) { // better `isNaN`
                pos = 0
            }
            var start = Math.min(Math.max(pos, 0), stringLength)
            // Avoid the `indexOf` call if no match is possible
            if (searchLength + start > stringLength) {
                return false
            }
            var index = -1
            while (++index < searchLength) {
                if (string.charCodeAt(start + index) != searchString.charCodeAt(index)) {
                    return false
                }
            }
            return true
        }
        if (defineProperty) {
            defineProperty(String.prototype, 'startsWith', {
                'value': startsWith,
                'configurable': true,
                'writable': true
            })
        } else {
            String.prototype.startsWith = startsWith
        }
    }())
}

// Array.prototype.fill
if (!Array.prototype.fill) {
    Object.defineProperty(Array.prototype, 'fill', {
        value: function (value) {

            // Steps 1-2.
            if (this == null) {
                throw new TypeError('this is null or not defined')
            }

            var O = Object(this)

            // Steps 3-5.
            var len = O.length >>> 0

            // Steps 6-7.
            var start = arguments[1]
            var relativeStart = start >> 0

            // Step 8.
            var k = relativeStart < 0 ?
                Math.max(len + relativeStart, 0) :
                Math.min(relativeStart, len)

            // Steps 9-10.
            var end = arguments[2]
            var relativeEnd = end === undefined ?
                len : end >> 0

            // Step 11.
            var final = relativeEnd < 0 ?
                Math.max(len + relativeEnd, 0) :
                Math.min(relativeEnd, len)

            // Step 12.
            while (k < final) {
                O[k] = value
                k++
            }

            // Step 13.
            return O
        }
    })
}
