export default {
    checkDisableComm () {
        let target = window.Mscratch.instance.extensions.getEditingTarget();
        let diableComm = false;
        if (target) {
            diableComm = target.deviceId != null && !target.config.enableComm;
        }
        return diableComm;
    },
}