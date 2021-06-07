const postContainer = document.querySelector('.post-container');
const subredditForm = document.querySelector('.subreddit-form');
const numForm = document.querySelector('.number-of-posts');

//creating cards and adding the api data to them
function createPost(post) {
    //create the container
    const postCard = document.createElement('div');
    postCard.classList.add('card');
    postContainer.appendChild(postCard);

    //add title
    const postTitle = document.createElement('h3');
    postTitle.innerText = post.data.title;
    postCard.appendChild(postTitle);

    //add image
    const postImage = document.createElement('img');
    const imageLink = post.data.thumbnail;
    postImage.classList.add('image');
    postImage.setAttribute('src', imageLink);  
    postImage.setAttribute('alt', 'image not available');
    postCard.appendChild(postImage);
    //console.log(postImage);

    //add link
    const postLink = document.createElement('a');
    const linkLink = post.data.url;
    postLink.classList.add('link');
    postLink.innerText = 'Click here to see the original post!';
    postLink.setAttribute('href', linkLink);
    postLink.setAttribute('target', 'blank');
    postCard.appendChild(postLink);
}

//fetch default aww subreddit api
function displayDefaultSubreddit () {
fetch('https://www.reddit.com/r/aww/.json').then((response) => {
    return response.json();
}).then((data) => {
    const posts = data.data.children;
    posts.forEach((post) => {
        createPost(post);
    })
});
}

//fetch different api
function changeSubreddit (subreddit) {
    removePosts();
    
    fetch(`https://www.reddit.com/r/${subreddit}/.json`).then((response) => {
        return response.json();
    }).then((data) => {
        const posts = data.data.children;
        posts.forEach((post) => {
            createPost(post);
        })
    });
}

//remove old posts upon changing the api
function removePosts () {
    while (postContainer.firstChild) {
        postContainer.removeChild(postContainer.firstChild);
    }
}

//load the default aww subreddit
window.addEventListener('load', (event) => {
    displayDefaultSubreddit();
});

//change the subreddit
subredditForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(subredditForm);
    const newSubreddit = formData.get('subreddit');
    console.log(newSubreddit);
    changeSubreddit(newSubreddit);
})

function displayX () {
    const formData = new FormData(numForm);
    const desiredNum = parseInt(formData.get('desired-num'));
    console.log(desiredNum);
    console.log(typeof desiredNum);
    
    fetch(`https://www.reddit.com/r/aww/.json`).then((response) => {
        return response.json();
    }).then((data) => {
        const posts = data.data.children;
        posts.slice(0, desiredNum).forEach((post, ) => {
                createPost(post); 
           })
    });
}

numForm.addEventListener('submit', (event) => {
    event.preventDefault();
    removePosts();
    displayX();
})