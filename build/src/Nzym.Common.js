/**
 * Things that are common througout all modules.
 * Such as basic math functions.
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
    },
    hypot: function (a, b) {
        return Math.sqrt(a * a + b * b);
    },
    clamp: function (value, min, max) {
        return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max));
    },
    getFilenameFromPath: function (path) {
        return path.split('\\').pop().split('/').pop();
    },
    angleBetween: function (x1, y1, x2, y2) {
        return Math.atan2(y2 - y1, x2 - x1);
    },
    distanceBetween: function (x1, y1, x2, y2) {
        return this.hypot(x2 - x1, y2 - y1);
    },
    rectIntersects: function (rectA, rectB) {
        return rectA.x <= rectB.x + rectB.w && rectA.x + rectA.w >= rectB.x
            && rectA.y <= rectB.y + rectB.h && rectA.y + rectA.h >= rectB.y;
    },
    rectContainsPoint: function (rect, point) {
        return point.x >= rect.x && point.x < rect.x + rect.w
            && point.y >= rect.y && point.y < rect.y + rect.h;
    }
};
