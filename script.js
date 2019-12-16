// Mengambil Film
function getMovies(keyword) {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Ketika Ajax Siap
            let movies = JSON.parse(xhr.response);
            showMovies(movies.Search);
        }
    }

    xhr.open('get', 'http://www.omdbapi.com/?apikey=af9e70fd&s=' + keyword);
    xhr.send();
}

// Menampilkan Film
function showMovies(movies) {
    if (!movies) {
        movieList.innerHTML = '<p class="alert alert-danger">not found</p>';
        return;
    }
    let cards = '';
    movies.forEach(function (movie) {
        cards += `<div class="col-4 my-3">
        <div class="card">
            <img src="${movie.Poster}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${movie.Title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${movie.Year}</h6>
                <a href="detail.php?id=${movie.imdbID}" class="btn btn-primary">Show Detail</a>
            </div>
        </div>
    </div>`;
    });
    movieList.innerHTML = cards;
}

let movieList = document.querySelector('.movie-list');
let inputKeyword = document.querySelector('.input-keyword');
let buttonSearch = document.querySelector('.button-search');

//Ketika halaman dibuka
getMovies('Doraemon');

//Ketika film dicari
buttonSearch.addEventListener('click', function () {
    getMovies(inputKeyword.value);
});