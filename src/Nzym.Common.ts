/**
 * Things that are common througout all modules.
 * Such as basic math functions.
 */
Nzym.Common = {
    ID: 0,
    RAD_TO_DEG: 180 / Math.PI,
    DEG_TO_RAD: Math.PI / 180,
    getID() {
        return this.ID++;
    },
    pick(array: any[]) {
        return array[Math.floor(Math.random() * array.length)];
    },
    choose(...args: any[]) {
        return this.pick(args);
    },
    picko(object: any) {
        const values = [];
        for (const prop in object) {
            values.push(object[prop]);
        }
        return this.pick(values);
    },
    toString(object: any) {
        const values = [];
        for (const prop in object) {
            const value = object[prop];
            if (typeof value === 'number' ||  typeof value === 'string') {
                values.push(`${prop}: ${value}`);
            }
        }
        return values.join('\n');
    },
    range(min: number, max: number = 0) {
        return min + Math.random() * (max - min);
    },
    radtodeg(radians: number) {
        return radians * this.RAD_TO_DEG;
    },
    degtorad(degrees: number) {
        return degrees * this.DEG_TO_RAD;
    },
    hypot(a: number, b: number) {
        return Math.sqrt(a * a + b * b);
    },
    clamp(value: number, min: number, max: number) {
        return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max));
    },
    getFilenameFromPath(path: string) {
        return path.split('\\').pop().split('/').pop();
    },
    angleBetween(x1: number, y1: number, x2: number, y2: number) {
        return Math.atan2(y2 - y1, x2 - x1);
    },
    distanceBetween(x1: number, y1: number, x2: number, y2: number) {
        return this.hypot(x2 - x1, y2 - y1);
    },
    rectIntersects(rectA: NzymRect, rectB: NzymRect): boolean {
        return rectA.x <= rectB.x + rectB.w && rectA.x + rectA.w >= rectB.x
            && rectA.y <= rectB.y + rectB.h && rectA.y + rectA.h >= rectB.y;
    },
    rectContainsPoint(rect: NzymRect, point: NzymPoint): boolean {
        return point.x >= rect.x && point.x < rect.x + rect.w
            && point.y >= rect.y && point.y < rect.y + rect.h;
    }
};