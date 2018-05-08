const LOCAL_IMAGE_IDENTIFY = 'u';
export default {
    checkDisableComm() {
        let target = window.Mscratch.instance.extensions.getEditingTarget();
        let diableComm = false;
        if (target) {
            diableComm = target.deviceId != null && !target.config.enableComm;
        }
        return diableComm;
    },
    projectValidate(json) {
        const obj =
            typeof json === 'object' ?
            Object.assign({}, json.ide || json) :
            JSON.parse(json);
        return Array.isArray(obj.targets) && obj.meta;
    },

    isLocalImage(assetId) {
        let preId = assetId.split('_')[0];
        if (preId.toLowerCase() === LOCAL_IMAGE_IDENTIFY) {
            return true;
        }
        return false;
    },
    matrix2hexStr(matrix) {
        let result = [],
            temp = [];
        let data = matrix.split('');

        for (var j = 0, len = data.length; j < len; j += 8) {
            temp.push(data.slice(j, j + 8));
        }

        for (let item of temp) {
            let itemStr = item.join('');
            let hexStr = parseInt(itemStr, 2).toString(16);
            if (parseInt(itemStr, 2) < 16) {
                hexStr = `0${hexStr}`;
            }
            result.push(hexStr);
        }

        result = result.join('');
        return result;
    },

    makeBlockXml(blockText, args) {
        if (!args.length) {
            return blockText;
        }
        let index = 0;
        // 剔除空白字符
        return blockText.replace(/>(.*)<\/field>/g, () => {
            return `>${args[index++]}<\/field>`;
        });
    },

    makeCategoryXml(category = {}, categoryText) {
        if (!categoryText) {
            return '';
        }
        const blocks = category.blocks || [];
        const blocksText = categoryText.blocks;
        // category xml
        let blocksXml = blocks.map(block => {
            let type = block.type;
            let blockText = blocksText.find(text => text.includes('type="' + type.replace(/\(.*$/, '') + '"'));
            if (blockText) {
                let args = /\(/g.test(type) ? type.replace(/.*\(|\)/g, '').replace(/\s/g, '') : '';
                return makeBlockXml(blockText, args.split(','));
            }
        });
        let openLabel = categoryText.open;
        let closeLabel = categoryText.close;
        if (category.isLocked || blocks.length === 0) {
            // 定制属性 - 加锁条件
            openLabel = openLabel.replace(/>/, ' lock="true">');
        }
        return openLabel + blocksXml.join('') + closeLabel;
    },

    makeToolboxXml(arrayJson = [], category) {
        let excludes = ['top', 'myBlocks'];
        if (category) {
            const categories = category._categories; // ["motion", "looks", "sound", "events"]
            const categoriesText = category.categoriesText;
            const newCategoriesXml = [];
            for (let i = 0, cname = null; cname = categories[i]; i++) {
                if (excludes.includes(cname)) {
                    continue;
                }
                let cate_ = arrayJson.find(cate => cate.id.toLowerCase() === cname);
                if (cate_) {
                    newCategoriesXml.push(makeCategoryXml(cate_, categoriesText[i]));
                } else {
                    newCategoriesXml.push(makeCategoryXml({}, categoriesText[i]));
                }
            }
            return `<xml style="display: none;">${newCategoriesXml.join('')}</xml>`;
        }
    },

    getAllFieldsObjectOfBlock(block) {
        let allFields = {};
        if (!block) {
            return allFields;
        }
        for (let i = 0, input; input = block.inputList[i]; i++) {
            for (let j = 0, field; field = input.fieldRow[j]; j++) {
                let name = field.name
                if (name) {
                    allFields[name] = block.getFieldValue(name);
                }
            }
        }
        return allFields;
    },

    setBlocksPropsWithFilter(filter, blocks) {
        if (Array.isArray(blocks) && typeof filter === 'function') {
            blocks.forEach(b => filter(b));
        }
    },
    args2color(...args) {
        if (args.length == 3) { //(1~255, 255, 255)
            let r = Number.parseInt(args[0])
            let g = Number.parseInt(args[1])
            let b = Number.parseInt(args[2])
            if (isNaN(r)) r = 0
            if (isNaN(g)) g = 0
            if (isNaN(b)) b = 0
            return (r % 255).toString(16).padStart(2, '0') + (g % 255).toString(16).padStart(2, '0') + (b % 255).toString(16).padStart(2, '0')
        } else if (args.length >= 1) {
            if (args[0].startsWith('#')) {
                return args[0].slice(1).toLowerCase()
            } else {
                const color2code = {
                    red: 'ff0000',
                    green: '00ff00',
                    blue: '0000ff',
                    orange: 'FFA500',
                    yellow: 'ffff00',
                    cyan: '00ffff',
                    purple: '800080',
                    black: '000000',
                    grey: '808080',
                    white: 'ffffff'
                }
                let strCol = color2code[args[0].toLowerCase()]
                if (strCol === undefined) strCol = '000000'
                return strCol
            }
        }
        return '000000'
    },

    getCodeTypeLabel(codeType) {
        let codeTypeMap = {
            'arduinoc': 'Arduino C'
        }
        if (codeType) {
            codeType = codeType.toLowerCase();
        } else {
            codeType = 'block';
        }
        return codeTypeMap[codeType] || codeType;
    },
}