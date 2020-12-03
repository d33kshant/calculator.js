function getHistory() {
    return document.getElementById("history-value").innerText;
}

function setHistory(value) {
    document.getElementById("history-value").innerText = value;
}

function getOutput() {
    return document.getElementById("output-value").innerText;
}

function setOutput(value) {
    if (value.length <= 14) {
        document.getElementById("output-value").innerText = Number(value).toLocaleString("en");
    }
}

function getNumber(value) {
    return Number(value.replace(/,/g, ""));
}

var calculated = false;

var opretors = document.getElementsByClassName("operator");
for (var i = 0; i < opretors.length; i++) {
    opretors[i].addEventListener('click', function () {
        var output = getNumber(getOutput()).toString();
        var history = getHistory();
        switch (this.id) {
            case "clear":
                setHistory("");
                setOutput("");
                break;
            case "backspace":
                if (output.length > 0) {
                    output = output.substring(0, output.length - 1);
                    setOutput(output);
                }
                break;
            case "invert":
                var invert = -getNumber(getOutput());
                setOutput(invert.toString());
                break;
            case "power":
                setHistory(output + "**");
                setOutput("");
                break;
            case "equal":
                history += output;
                var result = eval(history);
                if (result != "Infinity") {
                    setOutput(result.toString());
                    setHistory("");
                    calculated = true;
                } else {
                    alert("Result is too large!");
                }
                break;
            default:
                setHistory(history + output + this.id);
                setOutput("0");
        }
    })
}

var numbers = document.getElementsByClassName("number");
for (var i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener('click', function () {

        if (!calculated) {
            var output = getNumber(getOutput());
            output += this.id;
            setOutput(output);
        } else {
            setOutput(this.id);
            calculated = false;
        }
    })
}