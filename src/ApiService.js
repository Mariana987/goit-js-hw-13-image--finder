
const API_KEY = '23171615-fcdc729843fe7af43a640cf8d';
const BASE_URL = 'https://pixabay.com/api'


export default class ApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1
    }


    fetchImage() {
        const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;

        return fetch(url)
            .then(response => response.json())
            .then(data => {
                this.incrementPage();

                return data.hits
            });

    }
    incrementPage() {
        this.page += 1;
    }
    resetPage() {
        this.page = 1
    }
    get query() {
        return this.searchQuery
    }
    set query(newQuery) {
        this.searchQuery = newQuery
    }


}


















//  async fetchImage() {
//     const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
//     const response = await fetch(url);
//     const hits = await response.json();
//     this.incrementPage();
//     console.log(hits.totalHits)
//     return hits


// }