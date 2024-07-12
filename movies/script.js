/** @format */
const options = {
	method: "GET",
	headers: {
		accept: "application/json",
		Authorization:
			"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NTBkYWU3MTcwOTVkMjYzZWY0NjU2ZjQ2ZjhlNGE4NyIsIm5iZiI6MTcyMDYxMTIxMC45OTE3OTEsInN1YiI6IjY2OGU3MDRmOTQyZTRhNGY4MzQyNGZlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tA0ZiRS-TlfaMfFge5Dp9w6r9xS4E4AhSEoBQ8AQxJg",
	},
};
const pagination = document.querySelector(".pagination");
const urlDetails = `https://api.themoviedb.org/3/movie/`;
const url = `https://api.themoviedb.org/3/movie/popular`;
const keyword = "spiderman";
const searchApi = `https://api.themoviedb.org/3/search/movie`;
const movieDeatils = document.querySelector(".movie-details");

const moviesCards = document.querySelector(".movie-grid");
const pageSeach = window.location.pathname;
console.log(pageSeach);

let currentpage = 1;

async function getMovies() {
	try {
		const response = await fetch(url, options);
		const data = await response.json();
		const movies = data.results.slice(0, 10);

		moviesCards.innerHTML = "loading Movies.....";
		let displayMovies = "";
		if (!response.ok) {
			throw " Something went wrong";
		} else {
			movies.forEach((movie) => {
				displayMovies += ` <div class="movie-card">
                    <a href="/movies/details.html?id=${movie.id}">
                        <div class="movie-poster">
                            <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="Movie Poster">
                        </div>
                        <div class="movie-info">
                            <h3>${movie.title}</h3>
                            <p>Company: Example Studios</p>
                            <p>Rating: ${movie.vote_average}</p>
                        </div>
                    </a>
                </div>`;
			});
			console.log(displayMovies);
			setTimeout(function () {
				moviesCards.innerHTML = displayMovies;
			}, 2000);
		}
	} catch (error) {
		console.log(error);
	}
}

// this the details on the page.
// const searchParam = new URLSearchParams(window.location.search);
// const id = searchParam.get("id");
// console.log(id);

async function displayDetails() {
	try {
		const searchParam = new URLSearchParams(window.location.search);
		const id = searchParam.get("id");
		const response = await fetch(`${urlDetails}${id}`, options);
		const data = await response.json();
		const productionComp = data.production_companies;
		const prodCompany = productionComp.map((name) => name.name).join();
		const genre = data.genres;
		const genres = genre.map((name) => name.name).join();
		document.getElementById("movieTitle").innerHTML = `${data.title}`;
		console.log(data);
		movieDeatils.innerHTML = `
            <div class = 'movie-poster' >
     <img src="https://image.tmdb.org/t/p/w300${data.poster_path}" alt="Movie Poster">
            </div>
            <div class="movie-info">
                
                <a href="${data.homepage}"><h2>${data.title}</h2></a>
                <p>Company: ${prodCompany}</p>
                <p>Budget: ${data.budget}</p>
                <p>Revenue: ${data.revenue}</p>
                <p>Year: ${data.release_date}</p>
                <p class ='genre' >Genre: ${genres}</p>
                <p>Duration: ${data.runtime} mins</p>
                <p>Description: ${data.overview}.</p>
            </div>
        
        `;
	} catch (error) {
		console.error("Error fetching data:", error);
		// Handle the error in a way appropriate for your application
	}
}

// search movies anddisplay on the page.

async function searchMovies(page = 1) {
	try {
		const searchQry = new URLSearchParams(window.location.search);
		const query = searchQry.get("query");

		const apiKey = "650dae717095d263ef4656f46f8e4a87";
		const baseUrl = "https://api.themoviedb.org/3/search/movie";

		const url = `${baseUrl}?api_key=${apiKey}&query=${query}&page=${page}`;
		const response = await fetch(url);
		const data = await response.json();
		const result = data.results;

		moviesCards.innerHTML = "Searching 	Please wait.....";
		document.getElementById(
			"searchResult"
		).innerHTML = `Search Results for "${query}"`;

		if (result.length === 0) {
			moviesCards.innerHTML = "No Data Found";
		} else {
			if (!response.ok) {
				throw " Something went wrong";
			} else {
				dispplaySearchMovies(result);
				paginationDisplay(result, data.page, data.total_pages);
			}
		}
	} catch (error) {
		console.log(error);
		moviesCards.innerHTML = error;
	}
}

function dispplaySearchMovies(result) {
	moviesCards.innerHTML = "";
	let displayMovies = "";
	result.forEach((movie) => {
		displayMovies += ` <div class="movie-card">
			<a href="/movies/details.html?id=${movie.id}">
				<div class="movie-poster">
					<img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="Movie Poster">
				</div>
				<div class="movie-info">
					<h3>${movie.title}</h3>
					<p>Company: Example Studios</p>
					<p>Rating: ${movie.vote_average}</p>
				</div>
			</a>
		</div>`;
	});

	moviesCards.innerHTML = displayMovies;
}

function paginationDisplay(result, page, total) {
	pagination.innerHTML = "";
	if (result.length >= 20) {
		pagination.style.display = "block";
	}
	const prev = document.createElement("button");
	prev.innerHTML = "Prev";
	prev.disabled = page === 1;


	prev.addEventListener("click", function (e) {
		if (currentpage > 1) {
			currentpage--;
			searchMovies(currentpage);
		}
	});
	const next = document.createElement("button");
	next.innerHTML = "next";
	next.disabled = page === total;
	
	next.addEventListener("click", function (e) {
		if (currentpage < total) {
			currentpage++;
			searchMovies(currentpage);
		}
	});
	pagination.appendChild(prev);
	pagination.appendChild(next);

	console.log(result, page, total);
}

switch (pageSeach) {
	case "/movies/":
	case "/movies/index.html":
		getMovies();

		break;
	case "/movies/details.html":
		displayDetails();
		break;
	case "/movies/seach.html":
		searchMovies();
		break;
	default:
		break;
}
