






document.addEventListener('DOMContentLoaded', function (){
    const baseURL =  'http://localhost:3000/films'

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
            displayMovieTitles(data)
            displayFirstMovie(data[0])
        })
    }

    moviesListArray()

    function displayMovieTitles(movieListing){
        let ul = document.getElementById('films')
        ul.innerHTML = ''
        movieListing.map(movie => {
            let li = document.createElement('li')
            let btn = document.createElement('Button')
            btn.textContent = 'Remove'
            btn.addEventListener('click', () => handleDelete(movie))
            btn.className = 'btn'
            li.className = 'film-item'
            li.addEventListener('click', () => handleClick(movie))
            li.textContent = `${movie.title}`
            li.append(btn)
            ul.appendChild(li)
        })
    }

    function displayFirstMovie(data){
        let h1 = document.getElementById('title')
        h1.textContent = data.title
        let div = document.getElementById('runtime')
        div.textContent = `${data.runtime} minutes`
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
        btn.addEventListener('click', () => handleTicket(span2,data))
    }




})








