const url = 'http://localhost:3000/beers/'
document.addEventListener("DOMContentLoaded", () => {
  fetchFirstBeer()
  fetchBeers()
  addReviews()
})


let beerName = document.getElementById('beer-name')
let beerImage = document.getElementById('beer-image')
let beerDescription = document.getElementById('beer-description')
let beerReviews = document.getElementById('review-list')
let firstElementChild = beerReviews.firstElementChild
let lastElementChild = beerReviews.lastElementChild
let beerList = document.getElementById('beer-list')
let reviewForm = document.getElementById('review-form')
let review = document.getElementById('review')



function fetchFirstBeer() {
    fetch(url + 1)
    .then((res) => res.json())
    .then((data) => displayBeer(data))

}

function displayBeer(beer){
    
    beerName.innerHTML = beer.name
    beerImage.src = beer.image_url
    beerDescription.innerHTML = beer.description    
    lastElementChild.innerHTML = beer.reviews
  
}

function fetchBeers(){
    fetch(url)
    .then((res) => res.json())
    .then((data) => renderBeers(data))
}

function renderBeers(beer) {

    beerList.innerText = ""
      beer.forEach(beer => {
        
        const li = document.createElement('li')
        beerList.appendChild(li)
        li.innerHTML = beer.name
        
        li.addEventListener('click', () => {
        
            displayBeer(beer)
      })
       
        
      }) 
    
      
}

function addReviews(){  
      
  
  reviewForm.addEventListener('submit', (e) =>{                                         
  e.preventDefault()
  
      const newReview = {                                                         
      method: 'PATCH',
     body: JSON.stringify({
      review: review.value,                                                          

      
    }),
    headers: {
      'Content-Type': 'application/json'
  
    }
    }
    fetch('http://localhost:3000/beers/', newReview)
    .then((res) => res.json())                                                   
    .then((beer) => {   
      
      firstElementChild.innerHTML = review.value
       
})
 
  })
  reviewForm.reset()
                                                                  

  
}
