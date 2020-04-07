var wrapper = document.getElementById('wrapper');
var form = document.getElementById('filter-form');
var buttonMore = document.getElementById('button_download_more');
var nextPage = '';

function requestCharacters(url, success) {
    get(url).then(function (data) {
        var arrayOfCharacters = data.results.map(function (character) {
            var c = new Champion(character.name, 200, 150);
            c.setImage(character.image);
            return c;
        });

        if (data.info.next.length !== 0) {
            console.log('Show more');
            buttonMore.style.display = 'flex';
            nextPage = data.info.next;
        } else {
            buttonMore.style.display = 'none';
        }

        success(arrayOfCharacters);
    });
}


var downloadData = function (url) {
    requestCharacters(
        url,
        function (arrayOfCharacters) {
            arrayOfCharacters.forEach(function (champ) {
                champ.render(wrapper);
            });
        }
    );
};

var downloadBySearch = function (name) {
    let params = serialize({
        name: name,
        gender: 'male'
    });

    downloadData('https://rickandmortyapi.com/api/character/?' + params)
};

form.elements.characterName.addEventListener(
    'input',
    debounce(function () {
        downloadBySearch(this.value)
    }, 200)
);

var downloadMore = function () {
    downloadData(nextPage);
};

buttonMore.addEventListener('click', downloadMore);
