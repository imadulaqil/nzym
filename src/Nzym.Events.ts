/**
 * Events handler.
 */

type ObjectWithNzymEventsHandler = {
    events: NzymEventsHandler
};

Nzym.Events = {
    on(object: ObjectWithNzymEventsHandler, eventName: string, callbackFn: Function) {
        if (object.events) {
            object.events[eventName] = object.events[eventName] || [];
            object.events[eventName].push(callbackFn);
        }
        else {
            Nzym.Log.error(`Property 'events' does not exists on given 'object'.`);
        }
    },
    off(object: ObjectWithNzymEventsHandler, eventName: string, callbackFn: Function) {
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
    trigger(object: ObjectWithNzymEventsHandler, eventNames: string | string[], events: any) {
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