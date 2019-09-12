/**
 * add handler to element
 */
function addHandler(element, type, handler) {
    if (element.addEventListener) {
        addHandler = function(element, type, handler) {
            element.addEventListener(type, handler, false);
        };
    } else if (element.attachEvent) {
        addHandler = function(element, type, handler) {
            element.attachEvent("on" + type, handler);
        };
    } else {
        addHandler = function(element, type, handler) {
            element["on" + type] = handler;
        };
    }
    return addHandler(element, type, handler);
}

/**
 * get target from event
 */
function getTarget(event) {
    event = event || window.event;
    return event.target || event.srcElement;
}

/**
 * prevent default
 */
function preventDefault(event) {
    if (event.preventDefault) {
        preventDefault = function(event) {
            event.preventDefault;
        }
    } else {
        preventDefault = function(event) {
            event.returnValue = false;
        }
    }
    return preventDefault(event);
}

