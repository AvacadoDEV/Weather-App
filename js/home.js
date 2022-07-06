const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".weather-section .cities");
const apiKey = "e17908fae4393bcf1872e2f586b85864";
let closeBtn = document.getElementsByClassName("closebtn")[0];
const btn = document.getElementsByClassName("reset")[0];

let cityName = '';


form.addEventListener("submit", e => {
    e.preventDefault();
    let inputVal = input.value;

    const listItems = list.querySelectorAll(".weather-section .city");
    const listItemsArray = Array.from(listItems);
    // console.log(list);

    if (listItemsArray.length > 0) {
        const filteredArray = listItemsArray.filter(el => {
            let content = "";
            //bangalore, In
            if (inputVal.includes(",")) {
                //bangalore, Innnn->invalid country code, so we keep only the first part of inputVal
                if (inputVal.split(",")[1].length > 2) {
                    inputVal = inputVal.split(",")[0];
                    content = el
                        .querySelector(".city-name span")
                        .textContent.toLowerCase();
                } else {
                    content = el.querySelector(".city-name").dataset.name.toLowerCase();
                }
            } else {
                //bangalore
                content = el.querySelector(".city-name span").textContent.toLowerCase();
            }
            return content == inputVal.toLowerCase();
        });

        // check if there's already a city
        if (filteredArray.length > 0) {
            msg.textContent = `You already know the weather for ${filteredArray[0].querySelector(".city-name span").textContent
                } ...otherwise be more specific by providing the country code as well 😉`;
            form.reset();
            input.focus();
            return;
        }
    }

    //weather-section
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const { main, name, sys, weather } = data;
            const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]
                }.svg`;

            const li = document.createElement("li");
            cityName = name;
            li.classList.add("city");
            li.setAttribute('id', name.value);
            const markup = `
            <button class="closebtn" onclick="removelist(cityName)"> </button>
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
        <figure>
          <img class="city-icon" src="${icon}" alt="${weather[0]["description"]
                }">
          <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
      `;
            li.innerHTML = markup;
            list.appendChild(li);

        })
        .catch(() => {
            msg.textContent = "Please search for a valid city 😩";
        });

    msg.textContent = "";
    form.reset();
    input.focus();

    if (list.childElementCount > 1) {
        btn.style.visibility = 'visible';
    }

    else {
        btn.style.visibility = 'hidden';
    }

});

function removelist(name,cityName) {
    let item = document.getElementById(name.value);
    item.remove(cityName);
}

btn.addEventListener('click', () => {
    list.innerHTML = '';
});













