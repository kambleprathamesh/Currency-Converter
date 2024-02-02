let baseUrl =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
let Selects = document.querySelectorAll(".country-options select");
let btn = document.querySelector("#btn");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg=document.querySelector(".result");

for (let Option of Selects) {
  for (code in countryList) {
    let handle = document.createElement("option");
    handle.innerText = code;
    handle.value = code;

    if (Option.name === "from" && code === "USD") {
      handle.selected = "selected";
    } else if (Option.name === "to" && code === "INR") {
      handle.selected = "selected";
    }
    Option.append(handle);
  }
  Option.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
}

function updateFlag(element) {
  console.log(element);
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSource = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSource;
}

btn.addEventListener("click", async (e) => {
  e.preventDefault();
  let amount = document.querySelector(".enter-amount-screen input");
  let amtValue = amount.value;
  if (amtValue == "" || amtValue < 1) {
    amtValue = 1;
    amount.value = 1;
  }
  // console.group(fromCurr.value,toCurr.value)
  const URL = `${baseUrl}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[toCurr.value.toLowerCase()];
  let finalAmount = amount.value * rate;
  console.log(finalAmount);
  msg.innerText=`${amtValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
});
