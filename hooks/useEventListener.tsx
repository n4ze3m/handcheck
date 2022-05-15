import React from "react";

export const useEventListener = (
    target: EventTarget, 
    event: string, 
    listener: EventListenerOrEventListenerObject, 
    trigger = true
): void => {
    React.useEffect(() => {
        const t = target || window
        t.addEventListener(event, listener);
        trigger && t.dispatchEvent(new Event(event));
        return () => t.removeEventListener(event, listener);
    });
};