async function getData(key) {
    switch (key){
        case 'A': return 'Alpha';
        case 'BB': return '{{B1}} and {{B2}}';
        case 'C': return '{{C1}}, {{C2}}, {{EE}}';
        case 'DD': return 'Delta';
        case 'EE': return '{{F1}} and {{F2}}';
    }
    await new Promise(r => { setTimeout(r, 1000); });
    return `x${key}`;
}

async function replace(input, callback) {
    const regExpBracketsGlobal = /{+[A-Z0-9]+}+/g;
    const symbolRegExpFor = /{(([A-Z0-9]+)*)}/;
    let stuck = [];
    let collectionOfBrackets = input.match(regExpBracketsGlobal);
    collectionOfBrackets.forEach((elem) => {
        const letters = elem.match(symbolRegExpFor);
        stuck.push(callback(letters[1]));
    });
    const strInput = Promise.all(stuck).then((result) => {
        let str = input;
        result.forEach((elem, i) => {
            str = str.replace(collectionOfBrackets[i], elem);
        });
        return str;
    });
    return await strInput;
}

async function mustache(input, callback) {
    // TODO: FINISH THIS FUNCTION
    let result = input;
    while(result.indexOf('{') !== -1) {
        result = await replace(result, callback);
    }
    return await result;
}

async function run() {
    let startTime = Date.now();
    let result = await mustache(`A:{{A}}, Y:{{Y}}, B:{{BB}}, Z:{{Z}} C:{{C}} D:{{DD}}.`, getData);
    let answeredCorrectly = (result === 'A:Alpha, Y:xY, B:xB1 and xB2, Z:xZ C:xC1, xC2, xF1 and xF2 D:Delta.');
    let duration = Date.now() - startTime;

    console.log({duration,result,answeredCorrectly});
}

run();
