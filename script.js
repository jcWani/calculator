class Calculator {
  _operation;
  constructor(prevOutput, curOutput) {
    this.prevOutput = prevOutput;
    this.curOutput = curOutput;
    this.clear();
  }

  clear() {
    this.curOutput = "";
    this.prevOutput = "";
    this._operation = "";
  }

  delete() {
    this.curOutput = this.curOutput.toString().slice(0, -1);
  }

  getNumValue(value) {
    if (value === "." && this.curOutput.includes(".")) return;
    this.curOutput += value;
  }

  selectOperator(operator) {
    if (!this.curOutput) return;
    if (this.prevOutput) this.calculate();

    this._operation = operator;
    this.prevOutput = this.curOutput;
    this.curOutput = "";
  }

  calculate() {
    let result;
    const prev = +this.prevOutput;
    const cur = +this.curOutput;

    if (this._operation === "+") result = prev + cur;
    if (this._operation === "-") result = prev - cur;
    if (this._operation === "*") result = prev * cur;
    if (this._operation === "/") result = prev / cur;

    if (result || result === 0) this.curOutput = `${result}`;
    this._operation = "";
    this.prevOutput = "";
  }

  updateDisplay() {
    curOutputTextEl.textContent = this.curOutput;

    if (this._operation) prevOutputTextEl.textContent = `${this.prevOutput} ${this._operation}`;
    else prevOutputTextEl.textContent = `${this.prevOutput}`;
  }
}

const curOutputTextEl = document.querySelector(".output-curr");
const prevOutputTextEl = document.querySelector(".output-prev");
const inputBtns = document.querySelectorAll("button");
const equalsBtn = document.querySelector(".equal-sign");
const clearBtn = document.querySelector(".clear");
const delBtn = document.querySelector(".del");

const calculator = new Calculator(prevOutputTextEl, curOutputTextEl);

// Event Listeners
inputBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    // Number buttons
    if (btn.classList.length === 0) {
      calculator.getNumValue(btn.value);
      calculator.updateDisplay();
    }

    // Operator buttons
    if (btn.classList.contains("operator")) {
      calculator.selectOperator(btn.value);
      calculator.updateDisplay();
    }

    // Equal button
    if (btn.classList.contains("equal-sign")) {
      calculator.calculate();
      calculator.updateDisplay();
    }

    // Delete button
    if (btn.classList.contains("del")) {
      calculator.delete();
      calculator.updateDisplay();
    }

    // Clear button
    if (btn.classList.contains("clear")) {
      calculator.clear();
      calculator.updateDisplay();
    }
  });
});
