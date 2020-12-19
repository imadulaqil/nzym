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
    }
};