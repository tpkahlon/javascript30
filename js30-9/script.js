const inputs = [...document.querySelectorAll("input")];
let last;
let current;
let range = [];
let shift = false;

const wasShiftKeyPressed = () =>
  document.addEventListener(
    "keydown",
    e => (shift = e.shiftKey ? true : false)
  );

const resetChecks = () => inputs.map(input => (input.checked = false));

const checks = () => {
  inputs.map((input, i) => {
    input.addEventListener("change", e => {
      if (e.target.checked && shift && range.length === 1) {
        current = i;
        range.push(current);
        range.sort();
        filter().map(input => (input.checked = true));
        range = [];
        shift = false;
      }
      if (e.target.checked && !shift) {
        last = i;
        range.pop();
        range.push(last);
        range.sort();
      }
    });
  });
};

const filter = () => inputs.filter((input, i) => i > range[0] && i < range[1]);

wasShiftKeyPressed();
resetChecks();
checks();
