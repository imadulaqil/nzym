/**
 * Things that are common througout all modules.
 */
Nzym.Common = {
    ID: 0,
    RAD_TO_DEG: 180 / Math.PI,
    DEG_TO_RAD: Math.PI / 180,
    getID: function () {
        return this.ID++;
    },
    pick: function (array) {
        return array[Math.floor(Math.random() * array.length)];
    },
    choose: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.pick(args);
    },
    picko: function (object) {
        var values = [];
        for (var prop in object) {
            values.push(object[prop]);
        }
        return this.pick(values);
    },
    toString: function (object) {
        var values = [];
        for (var prop in object) {
            var value = object[prop];
            if (typeof value === 'number' || typeof value === 'string') {
                values.push(prop + ": " + value);
            }
        }
        return values.join('\n');
    },
    range: function (min, max) {
        if (max === void 0) { max = 0; }
        return min + Math.random() * (max - min);
    },
    radtodeg: function (radians) {
        return radians * this.RAD_TO_DEG;
    },
    degtorad: function (degrees) {
        return degrees * this.DEG_TO_RAD;
    }
};
