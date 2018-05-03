const LOCAL_IMAGE_IDENTIFY = 'u';

export default {
    isLocalImage(assetId) {
        let preId = assetId.split('_')[0];
        if (preId.toLowerCase() === LOCAL_IMAGE_IDENTIFY) {
            return true;
        }
        return false;
    }
}