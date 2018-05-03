let goog = {};
goog.dom = {};
goog.object = {};
goog.math = {};

goog.dom.DIRECT_ATTRIBUTE_MAP_ = {
    'cellpadding': 'cellPadding',
    'cellspacing': 'cellSpacing',
    'colspan': 'colSpan',
    'frameborder': 'frameBorder',
    'height': 'height',
    'maxlength': 'maxLength',
    'nonce': 'nonce',
    'role': 'role',
    'rowspan': 'rowSpan',
    'type': 'type',
    'usemap': 'useMap',
    'valign': 'vAlign',
    'width': 'width'
};

goog.dom.createDom = function(tagName, opt_attributes, var_args) {
    return goog.dom.createDom_(document, arguments);
};

goog.dom.createDom_ = function(doc, args) {
    var tagName = String(args[0]);
    var attributes = args[1];

    if (attributes && (attributes.name || attributes.type)) {
        var tagNameArr = ['<', tagName];
        if (attributes.name) {
            tagNameArr.push(' name="', goog.string.htmlEscape(attributes.name), '"');
        }
        if (attributes.type) {
            tagNameArr.push(' type="', goog.string.htmlEscape(attributes.type), '"');
            var clone = {};
            goog.object.extend(clone, attributes);
            delete clone['type'];
            attributes = clone;
        }
        tagNameArr.push('>');
        tagName = tagNameArr.join('');
    }

    var element = doc.createElement(tagName);

    if (attributes) {
        if (goog.isString(attributes)) {
            element.className = attributes;
        } else if (goog.isArray(attributes)) {
            element.className = attributes.join(' ');
        } else {
            goog.dom.setProperties(element, attributes);
        }
    }

    if (args.length > 2) {
        goog.dom.append_(doc, element, args, 2);
    }

    return element;
};

goog.dom.append_ = function(doc, parent, args, startIndex) {
    function childHandler(child) {
        // TODO(user): More coercion, ala MochiKit?
        if (child) {
            parent.appendChild(
                goog.isString(child) ? doc.createTextNode(child) : child);
        }
    }

    for (var i = startIndex; i < args.length; i++) {
        var arg = args[i];
        // TODO(attila): Fix isArrayLike to return false for a text node.
        if (goog.isArrayLike(arg) && !goog.dom.isNodeLike(arg)) {
            // If the argument is a node list, not a real array, use a clone,
            // because forEach can't be used to mutate a NodeList.
            goog.array.forEach(
                goog.dom.isNodeList(arg) ? goog.array.toArray(arg) : arg,
                childHandler);
        } else {
            childHandler(arg);
        }
    }
};

goog.dom.setProperties = function(element, properties) {
    goog.object.forEach(properties, function(val, key) {
        if (val && val.implementsGoogStringTypedString) {
            val = val.getTypedStringValue();
        }
        if (key == 'style') {
            element.style.cssText = val;
        } else if (key == 'class') {
            element.className = val;
        } else if (key == 'for') {
            element.htmlFor = val;
        } else if (goog.dom.DIRECT_ATTRIBUTE_MAP_.hasOwnProperty(key)) {
            element.setAttribute(goog.dom.DIRECT_ATTRIBUTE_MAP_[key], val);
        } else if (
            goog.string.startsWith(key, 'aria-') ||
            goog.string.startsWith(key, 'data-')) {
            element.setAttribute(key, val);
        } else {
            element[key] = val;
        }
    });
};

goog.object.extend = function(target, var_args) {
    var key, source;
    for (var i = 1; i < arguments.length; i++) {
        source = arguments[i];
        for (key in source) {
            target[key] = source[key];
        }

        for (var j = 0; j < goog.object.PROTOTYPE_FIELDS_.length; j++) {
            key = goog.object.PROTOTYPE_FIELDS_[j];
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }
};

goog.object.PROTOTYPE_FIELDS_ = [
    'constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable',
    'toLocaleString', 'toString', 'valueOf'
];

goog.object.forEach = function(obj, f, opt_obj) {
    for (var key in obj) {
        f.call( /** @type {?} */ (opt_obj), obj[key], key, obj);
    }
};

goog.isString = function(val) {
    return typeof val == 'string';
};

goog.isArray = function(val) {
    return goog.typeOf(val) == 'array';
};

goog.typeOf = function(value) {
  var s = typeof value;
  if (s == 'object') {
    if (value) {
      if (value instanceof Array) {
        return 'array';
      } else if (value instanceof Object) {
        return s;
      }
      var className = Object.prototype.toString.call((value));
      if (className == '[object Window]') {
        return 'object';
      }
      if ((className == '[object Array]' ||
           typeof value.length == 'number' &&
               typeof value.splice != 'undefined' &&
               typeof value.propertyIsEnumerable != 'undefined' &&
               !value.propertyIsEnumerable('splice')

               )) {
        return 'array';
      }
      if ((className == '[object Function]' ||
           typeof value.call != 'undefined' &&
               typeof value.propertyIsEnumerable != 'undefined' &&
               !value.propertyIsEnumerable('call'))) {
        return 'function';
      }

    } else {
      return 'null';
    }

  } else if (s == 'function' && typeof value.call == 'undefined') {
    return 'object';
  }
  return s;
};

goog.isArrayLike = function(val) {
    var type = goog.typeOf(val);
    return type == 'array' || type == 'object' && typeof val.length == 'number';
};

goog.isNumber = function(val) {
  return typeof val == 'number';
};

goog.math.Coordinate = function(opt_x, opt_y) {
  this.x = goog.isDef(opt_x) ? opt_x : 0;
  this.y = goog.isDef(opt_y) ? opt_y : 0;
};

goog.math.Coordinate.sum = function(a, b) {
  return new goog.math.Coordinate(a.x + b.x, a.y + b.y);
};

goog.math.Coordinate.difference = function(a, b) {
  return new goog.math.Coordinate(a.x - b.x, a.y - b.y);
};

goog.math.Coordinate.prototype.scale = function(sx, opt_sy) {
  var sy = goog.isNumber(opt_sy) ? opt_sy : sx;
  this.x *= sx;
  this.y *= sy;
  return this;
};

goog.isDef = function(val) {
  return val !== void 0;
};


export default goog;
