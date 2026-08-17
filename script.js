const button = document.querySelector(".btn");
const input = document.querySelector("input");
const output = document.querySelector(".output");
const logo = document.createElement("div");
const logoImage = document.createElement("img");
const logoTitle = document.createElement("span");
const tempOutput = document.createElement("div");
const tempC = document.createElement("span");
const feelslikeC = document.createElement("span");
const humidity = document.createElement("span");
const erroMsg = document.querySelector(".error-msg");
const dateTime = document.createElement("div");
const date = document.createElement("span");
const time = document.createElement("span");


async function callApi() {
  const inputValue = input.value;
  try {
    const api = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=0c80b2b56f1943ada19100744230103&q=${inputValue}&aqi=no`,
    );
    const result = await api.json();
    output.style.display = "inline-flex";
    tempOutput.setAttribute("class", "temp-output-container");
    logoImage.setAttribute("class", "logo-image");
    logo.setAttribute("class", "logo-container");
    logoTitle.setAttribute("class", "logo-title");
    dateTime.setAttribute("class", "date-time");
    date.setAttribute("class", "date");
    time.setAttribute("class", "time");

    const op = result.current.condition.text;
    switch (op) {
      case "Partly Cloudy":
        logoImage.src = "./animated/cloudy-day-1.svg";
        break;
      case "Patchy rain nearby":
        logoImage.src = "./animated/rainy-1.svg";
        break;
      case "Moderate or heavy rain shower":
        logoImage.src = "./animated/thunder.svg";
        break;
      case "Sunny":
        logoImage.src = "./animated/day.svg";
        break;
      case "Light rain shower":
        logoImage.src = "./animated/rainy-6.svg";
        break;
      default :
        logoImage.src = "./animated/cloudy-day-1.svg";
        break;
    }



    logoTitle.innerHTML = result.location.country;

    const dateString = result.location.localtime.slice(0, 11);
    const dateObj = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const longDate = dateObj.toLocaleDateString('en-US', options);
    date.innerHTML=longDate
    time.innerHTML= result.location.localtime.slice(11)

    tempC.innerHTML = `Temparature   ${result.current.temp_c}<sup>o</sup> C`;
    feelslikeC.innerHTML = `Feels Like  ${result.current.feelslike_c}<sup>o</sup> C`;
    humidity.innerHTML = `Humidity  ${result.current.humidity}<sup>o</sup> C`;
    erroMsg.style.display = "none";
    input.value = "";
  } catch (error) {
    output.style.display = "none";
    erroMsg.style.display = "inline";
    erroMsg.innerHTML = "No location found";
    input.value = "";
  }


  dateTime.appendChild(time)
  logo.appendChild(dateTime)
  dateTime.appendChild(date);
  logo.appendChild(dateTime);
  logo.appendChild(logoImage);
  tempOutput.appendChild(tempC);
  tempOutput.appendChild(feelslikeC);
  tempOutput.appendChild(humidity);
  logo.appendChild(logoTitle);
  output.appendChild(logo);
  output.appendChild(tempOutput);
}

button.addEventListener("click", callApi);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") callApi();
});
