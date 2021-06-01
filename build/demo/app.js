var currentEngineName = '';
var getCurrentSelection = function () {
    return document.getElementById('example-select');
};
var updateButtons = function () {
    var prevEngineName = '-';
    var nextEngineName = '-';
    var startPrevButton = document.getElementById('start-prev-button');
    var startNextButton = document.getElementById('start-next-button');
    var options = getCurrentSelection().options;
    for (var i = 0; i < options.length; i++) {
        if (options[i].selected) {
            if (i > 0) {
                prevEngineName = options[i - 1].innerHTML;
            }
            if (i < options.length - 1) {
                nextEngineName = options[i + 1].innerHTML;
            }
        }
    }
    startPrevButton.innerHTML = "Start Previous (" + prevEngineName + ")";
    startNextButton.innerHTML = "Start Next (" + nextEngineName + ")";
};
var callEngineMethod = function (methodName) {
    var engineName = getCurrentSelection().value;
    if (engineName !== currentEngineName && window['Engine']) {
        if (window['Engine'].stop instanceof Function) {
            window['Engine'].stop();
        }
    }
    currentEngineName = engineName;
    var engine = Nzym.Example[currentEngineName];
    engine.makeGlobalAliases();
    engine[methodName]();
    updateButtons();
};
var startPrev = function () {
    var options = getCurrentSelection().options;
    for (var i = 1; i < options.length; i++) {
        if (options[i].selected) {
            options[i].selected = false;
            options[i - 1].selected = true;
            callEngineMethod('start');
            break;
        }
    }
};
var startNext = function () {
    var options = getCurrentSelection().options;
    for (var i = 0; i < options.length - 1; i++) {
        if (options[i].selected) {
            options[i].selected = false;
            options[i + 1].selected = true;
            callEngineMethod('start');
            break;
        }
    }
};
window.onload = function () {
    updateButtons();
};
