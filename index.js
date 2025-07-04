const appContainer = document.createElement("div");
document.body.appendChild(appContainer);

let state = {
  numberBank: [],
  oddNumbers: [],
  evenNumbers: []
};

function setState(newState) {
  const numberBank = newState.numberBank ?? state.numberBank;
  const oddNumbers = newState.oddNumbers ?? state.oddNumbers;
  const evenNumbers = newState.evenNumbers ?? state.evenNumbers;

  state = { ...state, numberBank, oddNumbers, evenNumbers, ...newState };
  render();
}


function InputForm() {
  const form = document.createElement("form");
  const input = document.createElement("input");
  input.type = "number";
  input.placeholder = "Input number";

  const button = document.createElement("button");
  button.type = "submit";
  button.textContent = "Submit";

  form.appendChild(input);
  form.appendChild(button);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const num = parseInt(input.value, 10);
    if (!isNaN(num)) {
      setState({ numberBank: [...state.numberBank, num] });
    }
    input.value = "";
    input.focus();
  });

  return form;
}

function NumberList(title, numbers) {
  const container = document.createElement("div");

  const heading = document.createElement("h3");
  heading.textContent = title;

  const ul = document.createElement("ul");
  numbers.forEach(num => {
    const li = document.createElement("li");
    li.textContent = num;
    ul.appendChild(li);
  });

  container.appendChild(heading);
  container.appendChild(ul);
  return container;
}

function SortButtons() {
  const container = document.createElement("div");

  const sortAsc = document.createElement("button");
  sortAsc.textContent = "Sort Ascending";
  sortAsc.addEventListener("click", () => {
    const sorted = [...state.numberBank].sort((a, b) => a - b);
    setState({ numberBank: sorted });
  });

  const sortDesc = document.createElement("button");
  sortDesc.textContent = "Sort Descending";
  sortDesc.addEventListener("click", () => {
    const sorted = [...state.numberBank].sort((a, b) => b - a);
    setState({ numberBank: sorted });
  });

 const sortOne = document.createElement("button");
  sortOne.textContent = "Sort 1";
  sortOne.addEventListener("click", () => {
    const [first, ...rest] = state.numberBank;
    if (first !== undefined) {
      const odd = first % 2 !== 0 ? [...state.oddNumbers, first] : state.oddNumbers;
      const even = first % 2 === 0 ? [...state.evenNumbers, first] : state.evenNumbers;
      setState({ numberBank: rest, oddNumbers: odd, evenNumbers: even });
    }
  });

  const sortAll = document.createElement("button");
  sortAll.textContent = "Sort All";
  sortAll.addEventListener("click", () => {
    const odd = [...state.oddNumbers, ...state.numberBank.filter(n => n % 2 !== 0)];
    const even = [...state.evenNumbers, ...state.numberBank.filter(n => n % 2 === 0)];
    setState({ numberBank: [], oddNumbers: odd, evenNumbers: even });
  });

  container.append(sortAsc, sortDesc, sortOne, sortAll);
  return container;

}

function render() {
  appContainer.innerHTML = "";
  appContainer.appendChild(InputForm());
  appContainer.appendChild(SortButtons());

  
  appContainer.appendChild(NumberList("Number Bank", state.numberBank));
  appContainer.appendChild(NumberList("Odd Numbers", state.oddNumbers));
  appContainer.appendChild(NumberList("Even Numbers", state.evenNumbers));
}
render();
