const locationDropdown = document.getElementById("locations");
const futureAurorasSection = document.getElementById("futureAuroras");
const bestChanceSection = document.getElementById("bestChance");

const auroraInfoContainer = document.createElement("div");
auroraInfoContainer.id = "aurora-info";
document.body.appendChild(auroraInfoContainer);

const chanceOfAuroraElement = document.createElement("ul");
chanceOfAuroraElement.id = "chance-of-aurora";
auroraInfoContainer.appendChild(chanceOfAuroraElement);

const currentProbability = document.createElement("p");
currentProbability.id = "current-probability";
chanceOfAuroraElement.appendChild(currentProbability);

const bestChance = document.createElement("p");
bestChance.id = "best-chance";
auroraInfoContainer.appendChild(bestChance);

futureAurorasSection.after(chanceOfAuroraElement);
bestChanceSection.after(bestChance);

fetch("https://api.auroras.live/v1/?type=locations")
  .then((response) => response.json())
  .then((data) => {
    locationDropdown.addEventListener("change", () => {
      const selectedLocation =
        locationDropdown.options[locationDropdown.selectedIndex].text;
      let locationData;
      for (const location in data) {
        if (data[location].description === selectedLocation) {
          locationData = data[location];
          break;
        }
      }
      if (locationData) {
        const lat = locationData.lat;
        const long = locationData.long;
        fetch(
          `https://api.auroras.live/v1/?type=all&lat=${lat}&long=${long}&forecast`
        )
          .then((response) => {
            return response.json();
          })
          .then((forecastData) => {
            chanceOfAuroraElement
              .querySelectorAll("li")
              .forEach((child) => child.remove());
            for (i = 0; i < forecastData.threeday.values[0].length; i++) {
              const newLi = document.createElement("li");
              newLi.innerText = `At time ${forecastData.threeday.values[0][i].start} the KP value is ${forecastData.threeday.values[0][i].value}`;
              currentProbability.innerText = `Right now there is ${forecastData.probability.value}% chance to see the aurora at ${selectedLocation}`;
              chanceOfAuroraElement.appendChild(newLi);
            }
            bestChance.innerText = `The best chance to see the aurora right now is at Latitude ${forecastData.probability.highest.lat} Longitude ${forecastData.probability.highest.long}, where the chance is ${forecastData.probability.highest.value}%`;
          })
          .catch((error) => {
            console.error("Received error from API");
            console.error(error);
          });
      }
    });
  });
