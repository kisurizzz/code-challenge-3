






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
            li.setAttribute('data-movie-id', movie.id);
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
        let tktNum=document.getElementById("ticket-num")
        tktNum.textContent=data.capacity-data.tickets_sold
        let img=document.getElementById("poster")
        img.src=data.poster
        let btn = document.getElementById("buy-ticket");
        btn.removeEventListener("click", handleTicket);
        btn.addEventListener('click', () => handleTicket(tktNum,data))
    }




    function handleClick(data){
        let h1 = document.getElementById('title')
        h1.textContent = data.title
        let div = document.getElementById('runtime')
        div.textContent = `${data.runtime} minutes`
        let p = document.getElementById("film-info")
        p.textContent = data.description
        let span = document.getElementById("showtime")
        span.textContent = data.showtime
        let tktNum = document.getElementById("ticket-num")
        tktNum.textContent = data.capacity-data.tickets_sold
        let img = document.getElementById("poster")
        img.src = data.poster
        let btn = document.getElementById("buy-ticket");
        btn.removeEventListener("click", handleTicket);
        btn.addEventListener('click', () => handleTicket(tktNum,data))
    }


    function handleTicket(tktNum, data) {
  let count = parseInt(tktNum.textContent);
  if (count > 0) {
    count -= 1;

    // Update tickets_sold on the server
    fetch(baseURL + `/${data.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tickets_sold: count + data.tickets_sold })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error updating ticket count: ${response.statusText}`);
      }
      console.log('Ticket count updated successfully!');
      tktNum.textContent = count;
    })
    .catch(error => {
      console.error('Error updating ticket count:', error);
      // Handle error gracefully
      alert('Failed to update ticket count. Please try again.');
    });
  } else {
    // Display message when tickets are sold out
    alert('Sorry, this movie is sold out!');
  }

}

function handleDelete(movie) {
    // 1. Confirmation before deletion (optional)
    if (confirm(`Are you sure you want to delete ${movie.title}?`)) {
  
      // 2. Remove movie element from DOM
      const movieItem = document.querySelector(`#films li[data-movie-id="${movie.id}"]`); // Target specific movie element
      if (movieItem) {
        movieItem.remove();
      } else {
        console.error('Movie element not found in DOM!');
      }
  
      // 3. Send DELETE request to server
      fetch(baseURL + `/${movie.id}`, {
        method: 'DELETE'
      })
      .then(response => {
        if (response.ok) {
          console.log('Movie deleted successfully!');
        } else {
          throw new Error(`Error deleting movie: ${response.statusText}`);
        }
      })
      .catch(error => {
        console.error('Error deleting movie:', error);
        // Handle error gracefully (e.g., display error message to user)
      });
    }
  }


})








