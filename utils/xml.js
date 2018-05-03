/**
 * make a block string xml
 * @param  {String} blockText
 * @param  {Array} args      [description]
 * @return {[type]}           [description]
 */
const makeBlockXml = (blockText, args) => {
    // 无参数时
    if(!args.length) {
        return blockText;
    }
    let index = 0;
    // 剔除空白字符
    return blockText.replace(/>(.*)<\/field>/g, () => {
        return `>${args[index++]}<\/field>`;
    });
}

const makeCategoryXml = (category={}, categoryText) => {
    if(!categoryText) {
        return '';
    }
    const blocks = category.blocks || [];
    const blocksText = categoryText.blocks;
    // category xml
    let blocksXml = blocks.map(block => {
        let type = block.type;
        let blockText = blocksText.find(text => text.includes('type="' + type.replace(/\(.*$/, '') + '"'));
        if (blockText) {
            let args = /\(/g.test(type)?type.replace(/.*\(|\)/g, '').replace(/\s/g, ''):'';
            return makeBlockXml(blockText, args.split(','));
        }
    });
    let openLabel = categoryText.open;
    let closeLabel = categoryText.close;
    if(category.isLocked || blocks.length === 0) {
        // 定制属性 - 加锁条件
        openLabel = openLabel.replace(/>/, ' lock="true">');
    }
    return openLabel + blocksXml.join('') + closeLabel;
}

/*
[
  {
    id: 'category', // 块的type
    isLocked: true, // 是否加锁
    blocks:[ // 该分类下呈现的块
      {
        type:"meos_move(1,200)",  // 无参数时 meos_move || meos_move()
      },
      {
        type:"meos_move(1,200)",
        otherAttr: ''
      }
    ]
  }
]
 */
// category 顺序由 IDE 决定
const makeToolboxXml = (arrayJson=[], category) => {
    let excludes = ['top', 'myBlocks'];
    if (category) {
        const categories = category._categories; // ["motion", "looks", "sound", "events"]
        const categoriesText = category.categoriesText;
        const newCategoriesXml = [];
        for (let i = 0, cname  = null; cname = categories[i]; i++) {
            if(excludes.includes(cname)) {
                continue;
            }
            let cate_ = arrayJson.find(cate => cate.id.toLowerCase() === cname);
            if (cate_) {
                newCategoriesXml.push(makeCategoryXml(cate_, categoriesText[i]));
            }else {
                newCategoriesXml.push(makeCategoryXml({}, categoriesText[i]));
            }
        }
        return `<xml style="display: none;">${newCategoriesXml.join('')}</xml>`;
    }
}

export {
    makeToolboxXml as default,
    makeCategoryXml,
    makeBlockXml
}
