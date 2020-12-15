/**
 * Object manager.
 */
var NzymOBJ = /** @class */ (function () {
    function NzymOBJ(engine) {
        this.engine = engine;
        this.list = [];
        this.tags = [];
        this.autoClear = true;
        this.autoUpdate = true;
        this.autoRender = true;
    }
    NzymOBJ.prototype.addTag = function () {
        var tags = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tags[_i] = arguments[_i];
        }
        for (var _a = 0, tags_1 = tags; _a < tags_1.length; _a++) {
            var tag = tags_1[_a];
            this.list.push([]);
            this.tags.push(tag);
        }
    };
    NzymOBJ.prototype.removeTag = function () {
        var tags = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tags[_i] = arguments[_i];
        }
        for (var _a = 0, tags_2 = tags; _a < tags_2.length; _a++) {
            var tag = tags_2[_a];
            var i = this.getTagIndex(tag);
            if (i > -1) {
                this.list[i].length = 0;
                this.list.splice(i, 1);
                this.tags.splice(i, 1);
            }
        }
    };
    NzymOBJ.prototype.getTagIndex = function (tag) {
        return this.tags.indexOf(tag);
    };
    NzymOBJ.prototype.getList = function (tag) {
        return this.list[this.getTagIndex(tag)];
    };
    /**
     * Get a list or concatenated list of multiple tags.
     */
    NzymOBJ.prototype.take = function () {
        var tags = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tags[_i] = arguments[_i];
        }
        var list = [];
        for (var _a = 0, tags_3 = tags; _a < tags_3.length; _a++) {
            var tag = tags_3[_a];
            list = list.concat(this.getList(tag) || []);
        }
        return list;
    };
    NzymOBJ.prototype.takeAll = function () {
        var allList = [];
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var list = _a[_i];
            for (var _b = 0, list_1 = list; _b < list_1.length; _b++) {
                var n = list_1[_b];
                allList.push(n);
            }
        }
        return allList;
    };
    NzymOBJ.prototype.count = function (tag) {
        return this.getList(tag).length;
    };
    NzymOBJ.prototype.countAll = function () {
        var count = 0;
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var list = _a[_i];
            count += list.length;
        }
        return count;
    };
    NzymOBJ.prototype.push = function (tag, instance) {
        var list = this.getList(tag);
        if (list) {
            list.push(instance);
        }
        else {
            Nzym.Common.LogError("[OBJ.push] Tag not found: " + tag + ", failed to push instance");
            return null;
        }
        return instance;
    };
    /**
     * Remove one or more instance from list tagged `tag` that met specified condition.
     * Specifiy condition in `conditionFn`, condition met means if it's returns true.
     * @param tag {string} tag to check
     * @param conditionFn {Function} takes instance to check
     * @returns list of removed instances
     */
    NzymOBJ.prototype.remove = function (tag, conditionFn) {
        var removedList = [];
        var list = this.getList(tag);
        for (var i = list.length - 1; i >= 0; i--) {
            if (conditionFn(list[i], i)) {
                removedList.push(list.splice(i, 1)[0]);
            }
        }
        return removedList;
    };
    NzymOBJ.prototype.clear = function (tag) {
        var list = this.getList(tag);
        if (list) {
            list.length = 0;
        }
    };
    NzymOBJ.prototype.clearAll = function () {
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var list = _a[_i];
            list.length = 0;
        }
    };
    NzymOBJ.prototype.update = function (tag) {
        var list = this.getList(tag);
        if (list) {
            for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
                var n = list_2[_i];
                if (n.update) {
                    n.update();
                }
            }
        }
        else {
            Nzym.Common.LogError("[OBJ.update] Tag not found: " + tag + ", failed to update");
        }
    };
    /**
     * Render list of tag sorted by `depth` value on each instance
     * @param tag
     */
    NzymOBJ.prototype.render = function (tag) {
        var list = this.getList(tag);
        if (list) {
            var sortedList = [];
            for (var _i = 0, list_3 = list; _i < list_3.length; _i++) {
                var n = list_3[_i];
                if (n.render) {
                    sortedList.push(n);
                }
            }
            sortedList.sort(function (a, b) { return b.depth - a.depth; });
            for (var _a = 0, sortedList_1 = sortedList; _a < sortedList_1.length; _a++) {
                var n = sortedList_1[_a];
                n.render();
            }
        }
        else {
            Nzym.Common.LogError("[OBJ.render] Tag not found: " + tag + ", failed to render");
        }
    };
    NzymOBJ.prototype.renderUnsorted = function (tag) {
        var list = this.getList(tag);
        if (list) {
            for (var _i = 0, list_4 = list; _i < list_4.length; _i++) {
                var n = list_4[_i];
                if (n.render) {
                    n.render();
                }
            }
        }
        else {
            Nzym.Common.LogError("[OBJ.renderUnsorted] Tag not found: " + tag + ", failed to renderUnsorted");
        }
    };
    NzymOBJ.prototype.updateAll = function () {
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var list = _a[_i];
            for (var _b = 0, list_5 = list; _b < list_5.length; _b++) {
                var n = list_5[_b];
                if (n.update) {
                    n.update();
                }
            }
        }
    };
    NzymOBJ.prototype.renderAll = function () {
        var sortedList = [];
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var list = _a[_i];
            for (var _b = 0, list_6 = list; _b < list_6.length; _b++) {
                var n = list_6[_b];
                if (n.render) {
                    sortedList.push(n);
                }
            }
        }
        sortedList.sort(function (a, b) { return b.depth - a.depth; });
        for (var _c = 0, sortedList_2 = sortedList; _c < sortedList_2.length; _c++) {
            var n = sortedList_2[_c];
            n.render();
        }
    };
    NzymOBJ.prototype.renderAllUnsorted = function () {
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var list = _a[_i];
            for (var _b = 0, list_7 = list; _b < list_7.length; _b++) {
                var n = list_7[_b];
                if (n.render) {
                    n.render();
                }
            }
        }
    };
    return NzymOBJ;
}());
