export default {
     getAllFieldsObjectOfBlock(block) {
        let allFields = {};
        if(!block) {
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
    
    setBlocksPropsWithFilter (filter, blocks) {
        if(Array.isArray(blocks) && typeof filter === 'function') {
            blocks.forEach(b => filter(b));
        }
    }
}