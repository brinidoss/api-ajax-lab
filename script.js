const postContainer = document.querySelector('.posts');

function createPost() {
    const postCard = document.createElement('div');

}

fetch('https://www.reddit.com/r/aww/.json').then((response) => {
    return response.json();
}).then((data) => {
    data.data.children
})

