
document.addEventListener('DOMContentLoaded', function (){


    let baseURL = "http://localhost:3000/films/";
    let ulFilms = document.getElementById("films");
    let btnBuyTkt = document.getElementById("buy-ticket")
    let movieImg = document.getElementById("poster");
    let h1Title = document.getElementById("title")
    let idRuntime = document.getElementById("runtime")
    let idFilmInfo = document.getElementById("film-info")
    let idShowtime = document.getElementById("showtime")
    let idTicketnum = document.getElementById("ticket-num")
    

    // --- Function to fetch and display movie list ---
    function moviesListArray(){
        fetch(baseURL, {
            method: 'Get',
            header: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify()
        })
        .then(res => res.json())
        .then(data => { 
            ulFilms.innerHTML = "";
            for(values of data){
                 addMovie(values);
            }
            }
        )
        .catch(e => console.log(e.message));
    }
    moviesListArray();
    
    
    
    // --- Function to add a movie element to the list ---
    function addMovie(movies){
        
        let remainingTks = movies.capacity - movies.tickets_sold;
    
        movieTitle = movies.title
        movieId = movies.id
        let liFilm = document.createElement("li");
        if(remainingTks <= 0)
        {  liFilm.className = "sold-out"
        }
    
        ulFilms.appendChild(liFilm);
    
        let movieSpan = document.createElement("span");
        movieSpan.innerText = movieTitle;
        liFilm.appendChild(movieSpan);
    
        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete"
        liFilm.appendChild(deleteBtn); 
    
        deleteBtn.addEventListener('click', () => {
            handleDelete(movies)
        })
        movieSpan.addEventListener('click', () => {
            updateDom(movies);
        })
        if(movies.id === "1"){
            updateDom(movies);
        }
    }
    

    // --- Function to update movie details and button state ---
    function updateDom(movies){
        let remainingTks = movies.capacity - movies.tickets_sold;
        let movieId = movies.id;
        let availabiity;
    
        if(remainingTks > 0){
            availabiity = "Buy Ticket"
        }else{
            availabiity = "Sold out"
        }
    
        movieImg.src = movies.poster; 
        movieImg.alt = movies.title; 
        h1Title.innerText = movies.title;
        idRuntime.innerText = movies.runtime + " minutes";
        idFilmInfo.innerText = movies.description;
        idShowtime.innerText = movies.showtime;
        idTicketnum.innerText = remainingTks;
    
        btnBuyTkt.onclick = () => {  // Event listener for buy ticket button
            if(remainingTks > 0)
            { 
                 handleBuyTkts(movies)
                 
            }else{
                console.log("You cannot buy tickets")
            }
        };
        btnBuyTkt.dataset.movieId = movies.id;
        let button = document.querySelector(`[data-movie-id="${movieId}"]`);
        button.innerText = availabiity;
        btnBuyTkt.disabled = remainingTks <= 0;
    }
    
    
    
    // --- Function to handle ticket purchase
    function handleBuyTkts(movies){
        movies.tickets_sold++
        let ticketsSold = movies.tickets_sold;
        let requestHeaders = {
            "Content-Type": "application/json"
        }
        let requestBody = {
            "tickets_sold": ticketsSold
        }
        fetch(baseURL+movies.id,{
            method: "PATCH",
            headers: requestHeaders,    
            body: JSON.stringify(requestBody)
        })
        .then (res => res.json())
        .then (data => {
            updateDom(data);
    
            let numberOfTickets = (data.capacity - data.tickets_sold)
    
            if(!numberOfTickets > 0)
            { moviesListArray()
            }
    
            let  RequestBodyTickets =  {
                "film_id": data.id,
                "number_of_tickets": numberOfTickets
             }
    
            fetch("http://localhost:3000/tickets",{
                method: "POST",
                headers: requestHeaders,    
                body: JSON.stringify(RequestBodyTickets)
            })
            .then (res => res.json())
            .then(data => data)
            // .catch (e => console.log(e.message));
    
        })
        // .catch (e => console.log(e.message));
    }
    function handleDelete(movie){
        let requestHeaders = {
            "Content-Type": "application/json"
        }
        let requestBody = {
            "id": movie.id
        }
        fetch(baseURL+movie.id, {
            method: "DELETE",
            headers: requestHeaders,    
            body: JSON.stringify(requestBody)
        })
        .then (res => res.json())
        .then (data => moviesListArray())
        // .catch (e => console.log(e.message));
    }
    })






