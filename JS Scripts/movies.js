/* Movie Page Functionality
1. Should show information about the movie like its name, photo, plot, etc (these are must, rest you can add if you want).
*/
//getting movie from localStorage
let movie = localStorage.getItem("movie");

let cont = document.querySelector('#cards');

//function for fetching movie details
let fetchAPI = async function(value) {

    let resp = await fetch(`http://www.omdbapi.com/?i=${movie}&apikey=d9aadd18`);
    let r = await resp.json();

    renderCards(r);
}


//function for creating movie details card
function createMovieDetailsCard(response) {
    let card = document.createElement('div');

    card.innerHTML = `    <div class="movie-container">

<div class="movie-poster">
    <img src="${response.Poster}" alt="Movie Poster">
</div>
<div class="movie-details">
    <div class="details-header">
        <div class="dh-ls">
            <h2>${response.Title}</h2>
        </div>
        
    </div>
    <span class="italics-text"><i>2022 • ${response.Country} • Rating - <span style="font-size: 18px; font-weight: 600;">${response?.Ratings[0]?.Value}</span>/10 </i></span>
    <ul class="details-ul">
        <li><strong>Actors: </strong>${response.Actors}</li>
        <li><strong>Director: </strong>${response.Director}</li>
        <li><strong>Writers: </strong>${response.Writer}</li>
    </ul>
    <ul class="details-ul">
        <li><strong>Genre: </strong>${response.Genre}</li>
        <li><strong>Release Date: </strong>${response.Released}</li>
        <li><strong>Box Office: </strong>${response.BoxOffice}</li>
        <li><strong>Movie Runtime: </strong>${response.Runtime}</li>
    </ul>
    <p style="font-size: 14px; margin-top:10px;">${response.Plot}</p>
    <p style="font-size: 15px; font-style: italic; color: #222; margin-top: 10px;">
        <i class="fa-solid fa-award" aria-hidden="true"></i>
        &thinsp; ${response.Awards}
    </p>
</div> 
</div>`
    return card;
}


//function for rendering Movie details card
function renderCards(response) {

    let card = createMovieDetailsCard(response);

    cont.innerHTML = '';
    cont.append(card);
}


//function calling for fetching movie details
fetchAPI(movie);