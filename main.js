const today = new Date()
const oneWeek = new Date (today.getTime() - 7 * 24 * 60 * 60 * 1000)
const twentyFourHours = new Date (today.getTime() + 24 * 60 * 60 * 1000)

// console.log(oneWeek)
// console.log(twentyFourHours)

// API base link https://publicapis.io/auroras-live-science-api
const historicalUrl = `http://auroraslive.io/api/v1/historical?start=${oneWeek}&end=${twentyFourHours}`;
const forecastUrl = "http://auroraslive.io/api/v1/forecast"

async function getData() {
    const proxy = "https://api.allorigins.win/get?url=";
    const target = encodeURIComponent(forecastUrl);
    const url = `${proxy}${target}`;
        try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const actualData = JSON.parse(data.contents); 
        console.log(actualData);
        } catch (error) {
        console.error("Error:", error.message);
        }
  }
  
  getData();