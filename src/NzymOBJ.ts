/**
 * Object manager.
 */
class NzymOBJ {

    list = [];
    tags: string[] = [];

    autoClear = true;
    autoUpdate = true;
    autoRender = true;

    constructor(public engine: NzymEngine, options: NzymOBJOptions = {}) {
        if (options.autoClear === false) this.autoClear = false;
        if (options.autoUpdate === false) this.autoUpdate = false;
        if (options.autoRender === false) this.autoRender = false;
    }

    init() {
        Nzym.Events.on(this.engine.Scene, 'beforestart', () => {
            if (this.autoClear) {
                this.clearAll();
            }
        });
    }

    addTag(...tags: string[]) {
        for (const tag of tags) {
            this.list.push([]);
            this.tags.push(tag);
        }
    }

    removeTag(...tags: string[]) {
        for (const tag of tags) {
            const i = this.getTagIndex(tag);
            if (i > -1) {
                this.list[i].length = 0;
                this.list.splice(i, 1);
                this.tags.splice(i, 1);
            }
        }
    }

    addTagByObject(tagObject: { [key: string]: string }) {
        const values: string[] = [];
        for (const key in tagObject) {
            values.push(tagObject[key]);
        }
        this.addTag(...values);
    }

    getTagIndex(tag: string) {
        return this.tags.indexOf(tag);
    }

    getList(tag: string) {
        return this.list[this.getTagIndex(tag)];
    }

    getListSorted(tag: string) {
        const sortedList = [];
        for (const n of this.getList(tag)) {
            if (n.render) {
                sortedList.push(n);
            }
        }
        sortedList.sort((a, b) => b.depth - a.depth);
    }

    /**
     * Returns single array that contains all instances from all lists sorted by depth
     */
    getListSortedAll(conditionFn: (n: any) => boolean = () => false) {
        const sortedList = [];
        for (const list of this.list) {
            for (const n of list) {
                if (conditionFn(n)) {
                    sortedList.push(n);
                }
            }
        }
        sortedList.sort((a, b) => b.depth - a.depth);
        return sortedList;
    }

    /**
     * Get a list or concatenated list of multiple tags.
     */
    take(...tags: string[]) {
        let list = [];
        for (const tag of tags) {
            list = list.concat(this.getList(tag) || []);
        }
        return list;
    }

    takeAll() {
        const allList = [];
        for (const list of this.list) {
            for (const n of list) {
                allList.push(n);
            }
        }
        return allList;
    }

    count(tag: string) {
        return this.getList(tag).length;
    }

    countAll() {
        let count = 0;
        for (const list of this.list) {
            count += list.length;
        }
        return count;
    }

    push(tag: string, instance: object) {
        const list = this.getList(tag);
        if (list) {
            list.push(instance);
        }
        else {
            this.engine.Log.error(`'OBJ.push' Tag not found: ${tag}, failed to push instance`);
            return null;
        }
        return instance;
    }

    /**
     * Remove one or more instance from list tagged `tag` that met specified condition.
     * Specifiy condition in `conditionFn`, condition met means if it's returns true.
     * @param tag {string} tag to check
     * @param conditionFn {Function} takes instance to check
     * @returns list of removed instances
     */
    remove(tag: string, conditionFn: (instance: any, index?: number) => boolean) {
        const removedList = [];
        const list = this.getList(tag);
        for (let i = list.length - 1; i >= 0; i--) {
            if (conditionFn(list[i], i)) {
                removedList.push(list.splice(i, 1)[0]);
            }
        }
        return removedList;
    }

    removeById(tag: string, id: number) {
        return this.remove(tag, (n) => n.id === id);
    }

    clear(tag: string) {
        const list = this.getList(tag);
        if (list) {
            list.length = 0;
        }
    }

    clearAll() {
        for (const list of this.list) {
            list.length = 0;
        }
    }

    update(tag: string) {
        const list = this.getList(tag);
        if (list) {
            for (const n of list) {
                if (n.update) {
                    n.update();
                }
            }
        }
        else {
            this.engine.Log.error(`'OBJ.update' Tag not found: ${tag}, failed to update`);
        }
    }

    /**
     * Render list of tag sorted by `depth` value on each instance
     * @param tag 
     */
    render(tag: string) {
        const list = this.getList(tag);
        if (list) {
            const sortedList = [];
            for (const n of list) {
                if (n.render) {
                    sortedList.push(n);
                }
            }
            sortedList.sort((a, b) => b.depth - a.depth);
            for (const n of sortedList) {
                n.render();
            }
        }
        else {
            this.engine.Log.error(`'OBJ.render' Tag not found: ${tag}, failed to render`);
        }
    }

    renderUnsorted(tag: string) {
        const list = this.getList(tag);
        if (list) {
            for (const n of list) {
                if (n.render) {
                    n.render();
                }
            }
        }
        else {
            this.engine.Log.error(`'OBJ.renderUnsorted' Tag not found: ${tag}, failed to renderUnsorted`);
        }
    }

    updateAll() {
        for (const list of this.list) {
            for (const n of list) {
                if (n.update) {
                    n.update();
                }
            }
        }
    }

    renderAll() {
        const sortedList = [];
        for (const list of this.list) {
            for (const n of list) {
                if (n.render) {
                    sortedList.push(n);
                }
            }
        }
        sortedList.sort((a, b) => b.depth - a.depth);
        for (const n of sortedList) {
            n.render();
        }
    }

    renderAllUnsorted() {
        for (const list of this.list) {
            for (const n of list) {
                if (n.render) {
                    n.render();
                }
            }
        }
    }
}