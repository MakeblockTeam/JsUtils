export default {
    getMMDDHHMM(date) {
        var mm = date.getMonth() + 1; // getMonth() is zero-based
        var dd = date.getDate();
        var HH = date.getHours();
        var MM = date.getMinutes();

        return [
            (mm > 9 ? '' : '0') + mm,
            (dd > 9 ? '' : '0') + dd,
            (HH > 9 ? '' : '0') + HH,
            (MM > 9 ? '' : '0') + MM
        ].join('');
    },
}