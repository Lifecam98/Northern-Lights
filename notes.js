const dropdown = document.getElementById('locations');
const pastAurorasSection = document.getElementById('pastAuroras');
const futureAurorasSection = document.getElementById('futureAuroras')

// Generere elementene hvor dataen skal vises
const nordlysInfoContainer = document.createElement('div');
nordlysInfoContainer.id = 'nordlys-info';
document.body.appendChild(nordlysInfoContainer);

const harVertNordlysElement = document.createElement('p');
harVertNordlysElement.id = 'har-vert-nordlys';
nordlysInfoContainer.appendChild(harVertNordlysElement);

const erSjangsForNordlysElement = document.createElement('p');
erSjangsForNordlysElement.id = 'er-sjangs-for-nordlys';
nordlysInfoContainer.appendChild(erSjangsForNordlysElement);

pastAurorasSection.after(harVertNordlysElement);
futureAurorasSection.after(erSjangsForNordlysElement);


fetch('https://api.auroras.live/v1/?type=locations')
.then(response => response.json())
.then(data => {
    dropdown.addEventListener('change', () => {
    const valgtSted = dropdown.options[dropdown.selectedIndex].text;
    console.log(valgtSted)
    let stedData;
    for (const sted in data) {
        if (data[sted].description === valgtSted) {
            stedData = data[sted];
            console.log(stedData)
            break;
        }
}
    if (stedData) {
        const lat = stedData.lat;
        const long = stedData.long;
        console.log(lat);
        fetch(`https://api.auroras.live/v1/?type=all&lat=${lat}&long=${long}&forecast`)
        .then(response => {
            console.log('Fikk response fra API');
            return response.json();
            })
            .then(forecastData => {
            console.log('Fikk forecastData');
            console.log(forecastData)
            const harVertNordlys = forecastData.has_aurora_last_7_days;
            const erSjangsForNordlys = forecastData.threeday.dates.join('\n');
            harVertNordlysElement.innerText = `${harVertNordlys}`;
            erSjangsForNordlysElement.innerText = `${erSjangsForNordlys}`;
            })
            .catch(error => {
            console.error('Fikk feil fra API');
            console.error(error);
            });
        }
    });
});
