/** @format */
const formEl = document.querySelector('.search-input');
const appId = "822102b8";
const keys = "2fc5376e24aa5390dff1e7cefbeb136b";
const query = formEl.search.value; 
const url = `https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=${appId}&app_key=${keys}&what=${query}`; 

async function searchJob() {
	try {
		const response = await fetch(url);
		console.log(url);
		const {results} = await response.json();
		const jobs = results;
		console.log(jobs);
		renderJobs(jobs);
	} catch (error) {
		console.log(error);
	}
}


function renderJobs(jobs){
	const jobContainer = document.querySelector('.jobs-container');
	jobContainer.innerHTML = '';
	let displayHtml = '';
	
	
	
  jobs.forEach((job) =>{
	
	const companyName = job.company;
	const companyLogo = companyName.display_name.slice(0,1);
	console.log(companyLogo);
	const desc = job.description.slice(0, 120);
	
	displayHtml+= `<a href="#">
                        <div class="job-item">
                            <div class="company-name">
                                <span class="cmpy-logo">${companyLogo}</span>
                                <span class="name">${companyName.display_name}</span>
                            </div>
                            <div class="job-title">
                                <span>Title:</span>
                                ${job.title}</div>
                            <div class="job-desc">
                                ${desc}...
                                
                            </div>
                            <div class="job-others-details">
                                <div class="details-info">
                                    <p class="job-contract items" >
                                        <i class="fas fa-briefcase"></i>
                                        <span class="job-contract">Full time</span>
                                    </p>
                                   <p class="items">
                                    <i class="fas fa-map-marker-alt"></i>

                                    <span class="location">Location</span>
                                   </p>
                                    <p class="price items">
                                        <i class="fas fa-dollar-sign"></i>

                                        <span>Price Range:</span>
                                        <span class="min-price">$899</span> -
                                        <span class="max-price">$900</span>
                                    </p>
                                </div>
                                <div class="bookmark-job">
                                    <i class="fas fa-bookmark"></i>
                                </div>
                            </div>
                        </div>
                    </a>`
  });
  jobContainer.innerHTML = displayHtml;
}


formEl.addEventListener('submit', function(e){
	e.preventDefault();
	const search = formEl.search.value;
	console.log(search);
	searchJob();
})