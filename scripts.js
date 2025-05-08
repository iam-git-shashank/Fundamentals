document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll("#buttons-container button");

    let currentInput = "";
    let memory = 0;

    const operators = {
        '×': '*',
        '÷': '/',
        '+': '+',
        '-': '-'
    };

    function updateDisplay(value) {
        display.textContent = value || "0";
    }

    function appendValue(value) {
        if (value in operators && currentInput === "") return;
        currentInput += value;
        updateDisplay(currentInput);
    }

    function clearAll() {
        currentInput = "";
        updateDisplay("0");
    }

    function backspace() {
        currentInput = currentInput.slice(0, -1);
        updateDisplay(currentInput);
    }

    function calculate() {
        try {
            const result = eval(currentInput.replace(/[×÷]/g, m => operators[m]));
            currentInput = result.toString();
            updateDisplay(currentInput);
        } catch {
            updateDisplay("Error");
            currentInput = "";
        }
    }

    function memoryAdd() {
        try {
            memory += parseFloat(eval(currentInput.replace(/[×÷]/g, m => operators[m])));
        } catch {}
    }

    function memorySubtract() {
        try {
            memory -= parseFloat(eval(currentInput.replace(/[×÷]/g, m => operators[m])));
        } catch {}
    }

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const value = button.textContent;
            switch (value) {
                case "AC": clearAll(); break;
                case "←": backspace(); break;
                case "=": calculate(); break;
                case "M+": memoryAdd(); break;
                case "M-": memorySubtract(); break;
                default: appendValue(value); break;
            }
        });
    });

    document.addEventListener("keydown", (e) => {
        if (e.key.match(/[0-9]/)) {
            appendValue(e.key);
        } else if (["+", "-", "*", "/"].includes(e.key)) {
            appendValue(e.key);
        } else if (e.key === "Enter") {
            e.preventDefault();
            calculate();
        } else if (e.key === "Backspace") {
            backspace();
        } else if (e.key === "Escape") {
            clearAll();
        } else if (e.key === ".") {
            appendValue(".");
        }
    });

    updateDisplay("0");
});
