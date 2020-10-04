function isOpenBracket(smbl, bracketsConfig) {
    for (const bracketRule of bracketsConfig) {
        if (smbl === bracketRule[0]) {
            return true;
        }
    }
    return false;
}

function isCloseBracket(smbl, bracketsConfig) {
    for (const bracketRule of bracketsConfig) {
        if (smbl === bracketRule[1]) {
            return true;
        }
    }
    return false;
}

function isTraceEmpty(trace) {
    return trace.length === 0;
}

function isClosingLastOpened(trace, bracketsConfig, smbl) {
    for (const bracketRule of bracketsConfig) {
        if (trace[trace.length - 1] === bracketRule[0] && smbl === bracketRule[1]) {
            return true;
        }
    }
    return false;
}

function isIncorrectSequence(trace, closeBracket, openBracket) {
    return isTraceEmpty(trace) && closeBracket && !openBracket;
}

module.exports = function check(str, bracketsConfig) {
    let trace = [];
    for (const smbl of str) {
        let closeBracket = isCloseBracket(smbl, bracketsConfig);
        let openBracket = isOpenBracket(smbl, bracketsConfig);
        if (isIncorrectSequence(trace, closeBracket, openBracket)){
            return false;
        }
        if (closeBracket && isClosingLastOpened(trace, bracketsConfig, smbl)) {
            trace.pop();
        } else if (openBracket) {
            trace.push(smbl);
        }
    }
    return isTraceEmpty(trace);
}
