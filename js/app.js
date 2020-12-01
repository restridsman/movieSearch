$(document).ready(()=>{
    $('#searchForm').on('submit', (e)=>{
        let searchText = $('#searchText').val(); 
        getMovies(searchText); 
        e.preventDefault();
    });
});


async function getMovies(searchText){
    try{
        let response = await fetch('http://www.omdbapi.com/?i=tt3896198&apikey=d9d3d620&s=' + searchText)
        let movies =  await response.json();
        console.log(movies);
        let output = "";

             for (let movie of movies.Search) {
                 output += `
                     <div class="col-md-3">
                         <div class="well text-center">
                          <img src="${movie.Poster}">
                          <h5>${movie.Title}</h5>
                          <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                         </div>
                     </div>
                     `;
             }
            $('#movies').html(output);

    }catch(error) {
        console.log(error);
    }
}

function movieSelected(id){
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}
  

async function getMovie(){
    let movieId = sessionStorage.getItem('movieId');
    try{
        let response = await fetch('http://www.omdbapi.com/?apikey=d9d3d620&i=' + movieId);
        let movie = await response.json();
        // console.log(movie);
        let output =`
          <div class="row">
            <div class="col-md-4">
              <img src="${movie.Poster}" class="thumbnail">
            </div>
            <div class="col-md-8">
              <h2>${movie.Title}</h2>
              <ul class="list-group">
                <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                <li class="list-group-item"><strong>Runtime:</strong> ${movie.Runtime}</li>
                <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating} /10 </li>
                <li class="list-group-item"><strong>Awards:</strong> ${movie.Awards}</li>
                <hr>
                <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
                <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                <li class="list-group-item"><strong>Language:</strong> ${movie.Language}</li>
                <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
              </ul>
            </div>
          </div>
          <div class="row">
            <div class="well">
              <h3>Plot</h3>
              ${movie.Plot}
              <hr>
              <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
             
            </div>
          </div>
        `;
  
        $('#movie').html(output);
      
    }catch(error) {
        console.log(error);
    }
}


