/**
 * Events handler.
 */
Nzym.Events = {
    on(object: any, eventName: string, callbackFn: Function) {
        if (object.events) {
            object.events[eventName] = object.events[eventName] || [];
            object.events[eventName].push(callbackFn);
        }
        else {
            Nzym.Common.LogError(`Property 'events' does not exists on given 'object'.`);
        }
    },
    off(object: any, eventName: string, callbackFn: Function) {
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
                Nzym.Common.LogInfo(`There are no callbacks on the events['eventName'] of 'object'.`);
            }
        }
        else {
            Nzym.Common.LogError(`Property 'events' does not exists on given 'object'.`);
        }
    },
    trigger(object: any, eventNames: string | string[], events: any) {
        if (object.events) {
            if (!(eventNames instanceof Array)) {
                eventNames = [eventNames];
            }
            for (const eventName of eventNames) {
                const callbacks = object.events[eventName];
                if (callbacks instanceof Array) {
                    for (const callback of callbacks) {
                        callback.call(object, events);
                    }
                }
            }
        }
    }
};