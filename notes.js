const dropdown = document.getElementById('locations');
const futureAurorasSection = document.getElementById('futureAuroras')

// Generere elementene hvor dataen skal vises
const nordlysInfoContainer = document.createElement('div');
nordlysInfoContainer.id = 'nordlys-info';
document.body.appendChild(nordlysInfoContainer);

const erSjangsForNordlysElement = document.createElement('ul');
erSjangsForNordlysElement.id = 'er-sjangs-for-nordlys';
nordlysInfoContainer.appendChild(erSjangsForNordlysElement);

const chanceLi1 = document.createElement('li');
chanceLi1.id = 'chance-1';
erSjangsForNordlysElement.appendChild(chanceLi1);

const chanceLi2 = document.createElement('li');
chanceLi2.id = 'chance-2';
erSjangsForNordlysElement.appendChild(chanceLi2);


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
        fetch(`https://api.auroras.live/v1/?type=all&lat=${lat}&long=${long}&forecast`)
        .then(response => {
            console.log('Fikk response fra API');
            return response.json();
            })
            .then(forecastData => {
            console.log('Fikk forecastData');
            console.log(forecastData)
            // let erSjangsForNordlys = '';
            for (i = 0; i < forecastData.threeday.values[0].length; i++) {
                chanceLi1.innerText = `Date: ${forecastData.threeday.values[0][i].date}`;
                chanceLi2.innerText = `Value: ${forecastData.threeday.values[0][i].value}`;
            }
            // erSjangsForNordlysElement.innerText = `${erSjangsForNordlys}`;
            })
            .catch(error => {
            console.error('Fikk feil fra API');
            console.error(error);
            });
        }
    });
});
