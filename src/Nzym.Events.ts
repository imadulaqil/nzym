/**
 * Events handler.
 */

Nzym.Events = {
    on(object: { events: NzymEventsHandler }, eventName: string, callbackFn: Function) {
        if (object.events) {
            object.events[eventName] = object.events[eventName] || [];
            object.events[eventName].push(callbackFn);
        }
        else {
            Nzym.Log.error(`Property 'events' does not exists on given 'object'.`);
        }
    },
    off(object: { events: NzymEventsHandler }, eventName: string, callbackFn: Function) {
        if (object.events) {
            const callbacks = object.events[eventName];
            const newCallbacks = [];
            if (callbacks instanceof Array) {
                for (const callback of callbacks) {
                    if (callback !== callbackFn) {
                        newCallbacks.push(callback);
                    }
                }
                object.events[eventName] = newCallbacks;
            }
            else {
                Nzym.Log.info(`There are no callbacks on the events['eventName'] of 'object'.`);
            }
        }
        else {
            Nzym.Log.error(`Property 'events' does not exists on given 'object'.`);
        }
    },
    trigger(object: { events: NzymEventsHandler }, eventNames: string | string[], events?: any) {
        if (object.events) {
            if (!(eventNames instanceof Array)) {
                eventNames = [eventNames];
            }
            for (const eventName of eventNames) {
                const callbacks = object.events[eventName];
                if (callbacks instanceof Array) {
                    for (const callback of callbacks) {
                        callback.call(object, events || { name: eventName, source: object });
                    }
                }
            }
        }
    }
};