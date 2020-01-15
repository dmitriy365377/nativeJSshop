class BeerAPI {
    async getBeerList(){
        const url = "https://api.punkapi.com/v2/beers?page=2&per_page=80";
        const response = await fetch(url);
        const infoBeer = await response.json();
        return {
            infoBeer
        }
    } 
} 

 