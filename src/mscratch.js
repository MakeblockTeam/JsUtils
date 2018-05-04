
const LOCAL_IMAGE_IDENTIFY = 'u';
export default {
    checkDisableComm () {
        let target = window.Mscratch.instance.extensions.getEditingTarget();
        let diableComm = false;
        if (target) {
            diableComm = target.deviceId != null && !target.config.enableComm;
        }
        return diableComm;
    },
    projectValidate(json) {
        const obj =
            typeof json === 'object'
                ? Object.assign({}, json.ide || json)
                : JSON.parse(json);
        return Array.isArray(obj.targets) && obj.meta;
    },
    
    isLocalImage(assetId) {
        let preId = assetId.split('_')[0];
        if (preId.toLowerCase() === LOCAL_IMAGE_IDENTIFY) {
            return true;
        }
        return false;
    },
    matrix2hexStr (matrix) {
        let result = [],temp = [];
        let data = matrix.split('');

        for (var j = 0,len = data.length; j < len; j += 8) {
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
    }
}