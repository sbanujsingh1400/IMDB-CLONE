/*  HOME PAGE FUNCTIONALITIES
1.Search any movie from the API and display the search results on the frontend (as I type the search results should update, just like Google does for suggestions).
2.Each search result of the movie should have a favourite button, clicking on which the movie should be added to “My favourite movies” (a list).
3.On clicking any particular search result (any movie), open a new page with more information about that movie (movie page)
*/




//static valiable declaration
let key = 'd9aadd18';
let url = `http://www.omdbapi.com/?i=tt3896198&apikey=${key}&s=`;
let bookmarkArray = [];
let addBookmarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0,0,256,256"><g fill="#fcc419" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.33333,5.33333)"><path d="M37,43l-13,-6l-13,6v-34c0,-2.2 1.8,-4 4,-4h18c2.2,0 4,1.8 4,4z"></path></g></g></svg>`;
let removeBookmarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 30 30"><path d="M23,27l-8-7l-8,7V5c0-1.105,0.895-2,2-2h12c1.105,0,2,0.895,2,2V27z"></path></svg>`

//required html elements
let cont = document.querySelector('#cards');
let input = document.querySelector('#searchBar input')


// input  event for searching movies dynamically 
input.addEventListener('input', (e) => {

    if (loadingAnimation()) {
        fetchResponse(input.value);
    }
})


//function for UI response Loading animation
function loadingAnimation() {
    if (input.value.length > 2) {
        cont.innerHTML = ''
        let loading = `<div class="spinner-border text-primary" role="status">
    <span class="visually-hidden">Loading...</span>`

        cont.innerHTML = loading;
        return true;
    } else if (input.value.length != 0) {
        cont.innerHTML = 'Enter more Than two characters to search for movies'
        cont.style = "color:white;";
    } else {
        cont.innerHTML = '';
    }
    return false;
}



// function for triggering fetch api 
let fetchResponse = async function(value) {

    let resp = await fetch(url + `${value}`);
    let r = await resp.json();

    cont.innerHTML = "";
    if (r.Response == 'True') {
        r.Search.forEach(e => {
            renderCards(e);
        });
    } else {
        cont.innerHTML = `<h2 style="color:white;">No Movie Found<h2>`;
    }


}

//function for creating card UI
function createCard(response) {
    let card = document.createElement('div');
    card.id = response.imdbID;
    card.className = 'card  p-2 m-2'
    card.style = 'width: 18rem;';
    card.innerHTML = ` <img src="${response.Poster}" alt="Image Not Available" style='background:url(./images/imdb)' class="card-img-top" alt="...">
        <h5 class="card-title">${response.Title}</h5>
        <div class="card-body d-flex justify-content-between align-items-center">
          
          <p class="card-text">${response.Year}</p>
          
         <div id='svg'> <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 30 30">
          <path d="M23,27l-8-7l-8,7V5c0-1.105,0.895-2,2-2h12c1.105,0,2,0.895,2,2V27z"></path>
      </svg></div>
          </div>`;
    return card;
}


//function for bookmark/watchlist addition logic and validation
function addBookmark(card, response) {

    //validation and ui changes for movie bookmark/watchlist 
    if (bookmarkArray.includes(card.childNodes[3].textContent)) {
        let svgDiv = card.querySelector('#svg');
        svgDiv.innerHTML = addBookmarkSvg;
    }

    card.childNodes[1].addEventListener("click", (e) => {
        localStorage.setItem("movie", response.imdbID);
        window.location.href = window.location.href.replace(window.location.href.split('/')[window.location.href.split('/').length-1],'Movie.html')
    })
    card.childNodes[3].addEventListener("click", (e) => {
        localStorage.setItem("movie", response.imdbID);
        window.location.href = window.location.href.replace(window.location.href.split('/')[window.location.href.split('/').length-1],'Movie.html')
    })

    //add bookmark click event
    card.childNodes[5].childNodes[3].addEventListener("click", (e) => {

        if (!bookmarkArray.includes(card.childNodes[3].textContent)) {

            bookmarkArray.push(card.childNodes[3].textContent);
            console.log(card.childNodes[3].textContent);
            localStorage.setItem("bookmarkArray", bookmarkArray);
            let svgDiv = document.querySelector(`#${response.imdbID} #svg`);
            svgDiv.innerHTML = addBookmarkSvg;
            alert(card.childNodes[3].textContent + "Added to Bookmark");
        } else {
            bookmarkArray = bookmarkArray.filter(bookmark => bookmark !== card.childNodes[3].textContent);
            localStorage.setItem("bookmarkArray", bookmarkArray);
            let svgDiv = document.querySelector(`#${response.imdbID} #svg`);
            svgDiv.innerHTML = removeBookmarkSvg;
            alert(card.childNodes[3].textContent + "Removed from Bookmark");
        }
    })

    return card;
}


//function for rendering card 
function renderCards(response) {

    let card = createCard(response);
    card = addBookmark(card, response);
    cont.append(card);
}