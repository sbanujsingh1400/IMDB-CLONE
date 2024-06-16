/*
/*  Watchlist  PAGE FUNCTIONALITIES
1. Display a list of all the favourite movies.
2. Make this list persistent (should have the same number of movies before and after closing the browser/refreshing the browser).
3. Remove from favourites button: Each movie should have remove from favourites button, clicking on which should remove that movie from the list.
*/


// variable declaration for  html element, local storage array
let container = document.querySelector('#cards');
let arr = localStorage.getItem("bookmarkArray")?.split(',');


//function for loading watchlists card
function loadCards() {
    arr?.forEach((i) => {
        fetchResp(i)
    })
}

// function for fetching watchlist movies details
let fetchResp = async function(value) {

    if (value == '') return;
    let resp = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=d9aadd18&t=${value}`);
    let r = await resp.json();

    renderCards(r);


}



//function for creating movie card
function createWatchlistCards(response) {
    let card = document.createElement('div');
    card.className = 'card  p-2 m-2'
    card.style = 'width: 18rem;';
    card.innerHTML = `     <img src="${response.Poster}" alt="Image Not Available" style='background:url(./images/imdb)' class="card-img-top" alt="...">
        <h5 class="card-title">${response.Title}</h5>
        <div class="card-body d-flex justify-content-between align-items-center">
          
          <p class="card-text">${response.Year}</p>
          
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 30 30">
          <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
      </svg></div>
          </div>`

    return card;
}


//function for rendering cards/ deleting bookmarked movies
function renderCards(response) {

    let card = createWatchlistCards(response);



    card.childNodes[5].childNodes[3].addEventListener("click", (e) => {


        arr = arr.filter(bookmark => bookmark !== card.childNodes[3].textContent);
        localStorage.setItem("bookmarkArray", arr);


        container.innerHTML = '';
        loadCards();
        alert(card.childNodes[3].textContent + " Removed from Bookmark");

    })

    container.append(card);
}


// function calling
loadCards();