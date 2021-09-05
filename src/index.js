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

function onSearch(e) {
    e.preventDefault();
    const form = e.currentTarget;
    clearImagesContainer();
    apiService.query = form.elements.query.value;
    if (apiService.query === '') {
        return error('Input is empty! Please enter what you search.');
    }

    apiService.fetchImage().then(appendImageMarkup)
        .catch(error => console.log(error));

}


function onLoadMore(hits) {
    apiService.fetchImage().then(appendImageMarkup);

    return
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


}




// function checkLengthArr(hits) {
//     if (hits.length > 11) {

//         btnLoadMore.style.visibility = 'visible';
//     } else {
//         btnLoadMore.style.visibility = 'hidden';
//         return;
//     }
// }

 // if (length === 0) {
    //     return error('Nothing founded! Please enter the correct name.')
    // } // if (length === 0) {
    //     return error('Nothing founded! Please enter the correct name.')
    // }




