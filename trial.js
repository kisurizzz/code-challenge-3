// Your code here

const BASE_URL = "http://localhost:3000/films";

$(document).ready(()=>{
    fetchMovies()
    $('#buy-ticket').on('click', ()=>{buyTicket()})
})

function fetchMovies(){

    fetch(BASE_URL)
        .then((response) => response.json())
        .then( (output) => {
            let i = 0;
            output.forEach(
                (film) => {
                    if (i === 0){
                        showMovie(film)
                    }
                    let item = $(`<li class="film item">${film.title}</li>`)
                    item.on("click", ()=>{showMovie(film)})
                    $('#films').append(item)
                    i++;
                }
            )
        })
}

function showMovie(movie){
    $('#title').html(movie.title);
    $('#runtime').html(`${movie.title} minutes`);
    $('#film-info').html(`${movie.description}`);
    $('#showtime').html(`${movie.showtime}`);
    $('#ticket-num').html(`${movie.capacity - movie.tickets_sold}`);
    $('#poster').attr("src",movie.poster);
}

function buyTicket(){
    const ticketHolder = $('#ticket-num');
    let tickets = ticketHolder.text();
    tickets = parseInt(tickets);

    if(tickets > 0){
        tickets--;
        ticketHolder.html(tickets);
    }else{
        alert("This movie has no tickets left");
    }


}





// Your code here
document.addEventListener('DOMContentLoaded', function(){
function moviesArray(){
    fetch(" http://localhost:3000/films")
    .then(res=>res.json())
    .then(moviesArray=>{
        displayMovieTitles(moviesArray)
        dispalyMovieOne(moviesArray[0])
    })
}
moviesArray()

function displayMovieTitles(moviesarray){
    let ul=document.getElementById("films")
    ul.innerHTML=""  
    moviesarray.map(movie=>{
        let li=document.createElement("li")
        let btn =document.createElement("button")
        btn.textContent= "DELETE" 
        btn.addEventListener("click",()=>handleDelete(movie))
        btn.className="btn" 
        li.className="film item"
        li.addEventListener("click",()=>handleClick(movie))
        li.textContent=`${movie.title}`
        li.append(btn)
        ul.appendChild(li)
    })
    
}

function dispalyMovieOne(data){  
    let h1=document.getElementById("title")
    h1.textContent=data.title
    let div=document.getElementById("runtime")
    div.textContent=`${data.runtime }  minutes`
    let p=document.getElementById("film-info")
    p.textContent=data.description
    let span=document.getElementById("showtime")
    span.textContent=data.showtime
    let span2=document.getElementById("ticket-num")
    span2.textContent=data.capacity-data.tickets_sold
    let img=document.getElementById("poster")
    img.src=data.poster
    let btn = document.getElementById("buy-ticket");
    btn.removeEventListener("click", handleTicket);
    btn.addEventListener("click", () => handleTicket(span2,data));

}

function handleClick(data){
    // console.log(movie)
    let h1=document.getElementById("title")
    h1.textContent=data.title
    let div=document.getElementById("runtime")
    div.textContent=`${data.runtime }  minutes`
    let p=document.getElementById("film-info")
    p.textContent=data.description
    let span=document.getElementById("showtime")
    span.textContent=data.showtime
    let span2=document.getElementById("ticket-num")
    span2.textContent=data.capacity-data.tickets_sold
    let img=document.getElementById("poster")
    img.src=data.poster
    let btn = document.getElementById("buy-ticket");
    btn.removeEventListener("click", handleTicket);
    btn.addEventListener("click", () => handleTicket(span2, data));

}

function handleTicket(span2, data) {
    // console.log(data.tickets_sold)
    let count = parseInt(span2.textContent);
    if (count > 0) {
      count -= 1;
      span2.textContent = count;
    }
    console.log(data.id)
    // fetch(` http://localhost:3000/films/${data.id}`,{
    //     method:"PATCH",
    //     headers:{
    //         "Content-Type": "application/json"  
    //     },
    //     body: JSON.stringify({
    //         tickets_sold: data.tickets_sold + 1 
    //       }),
    // }
    // )
    // .then(res=>res.json())
    // .then(updated=>console.log(updated))
  }

  function handleDelete(movie){
    fetch(` http://localhost:3000/films/${movie.id}`,{
        method:"DELETE"
    })
    .then(res=>res.json)
  }
})
















// Your code here

const BASE_URL = "http://localhost:3000/films";

$(document).ready(()=>{
    fetchMovies()
    $('#buy-ticket').on('click', ()=>{buyTicket()})
})

function fetchMovies(){

    fetch(BASE_URL)
        .then((response) => response.json())
        .then( (output) => {
            let i = 0;
            output.forEach(
                (film) => {
                    if (i === 0){
                        showMovie(film)
                    }
                    let item = $(`<li class="film item">${film.title}</li>`)
                    item.on("click", ()=>{showMovie(film)})
                    $('#films').append(item)
                    i++;
                }
            )
        })
}

function showMovie(movie){
    $('#title').html(movie.title);
    $('#runtime').html(`${movie.title} minutes`);
    $('#film-info').html(`${movie.description}`);
    $('#showtime').html(`${movie.showtime}`);
    $('#ticket-num').html(`${movie.capacity - movie.tickets_sold}`);
    $('#poster').attr("src",movie.poster);
}

function buyTicket(){
    const ticketHolder = $('#ticket-num');
    let tickets = ticketHolder.text();
    tickets = parseInt(tickets);

    if(tickets > 0){
        tickets--;
        ticketHolder.html(tickets);
    }else{
        alert("This movie has no tickets left");
    }


}