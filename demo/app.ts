
let currentEngineName = '';

const getCurrentSelection = (): HTMLSelectElement => {
    return document.getElementById('example-select') as HTMLSelectElement;
};

const updateButtons = () => {
    let prevEngineName = '-';
    let nextEngineName = '-';
    const startPrevButton = document.getElementById('start-prev-button');
    const startNextButton = document.getElementById('start-next-button');
    const options = getCurrentSelection().options;
    for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
            if (i > 0) {
                prevEngineName = options[i - 1].innerHTML;
            }
            if (i < options.length - 1) {
                nextEngineName = options[i + 1].innerHTML;
            }
        }
    }
    startPrevButton.innerHTML = `Start Previous (${prevEngineName})`;
    startNextButton.innerHTML = `Start Next (${nextEngineName})`;
};

const callEngineMethod = (methodName: string) => {
    const engineName = getCurrentSelection().value;
    if (engineName !== currentEngineName && window['Engine']) {
        if (window['Engine'].stop instanceof Function) {
            window['Engine'].stop();
        }
    }

    currentEngineName = engineName;

    const engine = Example[currentEngineName];
    engine.makeGlobalAliases();
    engine[methodName]();

    updateButtons();
};

const startPrev = () => {
    const options = getCurrentSelection().options;
    for (let i = 1; i < options.length; i++) {
        if (options[i].selected) {
            options[i].selected = false;
            options[i - 1].selected = true;
            callEngineMethod('start');
            break;
        }
    }
};

const startNext = () => {
    const options = getCurrentSelection().options;
    for (let i = 0; i < options.length - 1; i++) {
        if (options[i].selected) {
            options[i].selected = false;
            options[i + 1].selected = true;
            callEngineMethod('start');
            break;
        }
    }
};

window.onload = () => {
    updateButtons();
};