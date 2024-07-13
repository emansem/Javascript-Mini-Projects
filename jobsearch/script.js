/** @format */

const appId = "822102b8";
const keys = "2fc5376e24aa5390dff1e7cefbeb136b";
const query = "cashier"; 
const url = `https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=${appId}&app_key=${keys}&what=${query}`; 

async function searchJob() {
	try {
		const response = await fetch(url);
		const data = await response.json();
		console.log(data);
	} catch (error) {
		console.log(error);
	}
}

searchJob();
