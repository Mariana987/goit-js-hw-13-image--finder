import { alert, error } from '../node_modules/@pnotify/core/dist/PNotify.js';
import imageCard from './image.hbs';
import ApiService from './ApiService.js';

const searchForm = document.querySelector('[id = "search-form"]');
const btnLoadMore = document.querySelector('.load_more')
const containerImages = document.querySelector('.gallery');


const apiService = new ApiService();

searchForm.addEventListener('submit', onSearch);
btnLoadMore.addEventListener('click', onLoadMore);
btnLoadMore.addEventListener('click', onSrollPage);
hideButton()

function onSearch(e) {
    e.preventDefault();
    const form = e.currentTarget;
    clearImagesContainer();
    apiService.query = form.elements.query.value;
    if (apiService.query === '') {
        hideButton()
        return error('Input is empty! Please enter what you search.');
    }
    fetchAndMarkUp()
    showButton()
}


function onLoadMore(hits) {
    fetchAndMarkUp()

    return
}

function fetchAndMarkUp() {
    apiService.fetchImage().then(countHits).then(appendImageMarkup)

}

function appendImageMarkup(hits) {
    containerImages.insertAdjacentHTML('beforeend', imageCard(hits))
    return
}

function clearImagesContainer() {
    containerImages.innerHTML = '';
    apiService.resetPage();

};

function onSrollPage() {
    apiService.fetchImage().then(hits => {
        appendImageMarkup(hits);
        containerImages.scrollIntoView({ behavior: 'smooth', block: 'end' });
    })


};

function hideButton() {
    btnLoadMore.classList.add("is-hidden");
};

function showButton() {
    btnLoadMore.classList.remove("is-hidden");
};

function countHits(arr) {

    if (arr.length === 0) {

        alert('Nothing founded! Please enter the correct name')
        hideButton()
    }
    return arr
}