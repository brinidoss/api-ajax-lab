const postContainer = document.querySelector('.post-container');
const subredditForm = document.querySelector('.subreddit-form');

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
    console.log(postImage);

    //add link
    const postLink = document.createElement('a');
    const linkLink = post.data.url;
    postLink.classList.add('link');
    postLink.innerText = 'Click here to see the original post!';
    postLink.setAttribute('href', linkLink);
    postLink.setAttribute('target', 'blank');
    postCard.appendChild(postLink);
}

function changeSubreddit (subreddit) {
    fetch(`https://www.reddit.com/r/${subreddit}/.json`).then((response) => {
        return response.json();
    }).then((data) => {
        const posts = data.data.children;
        posts.forEach((post) => {
            createPost(post);
    })
});
}

fetch('https://www.reddit.com/r/aww/.json').then((response) => {
    return response.json();
}).then((data) => {
    const posts = data.data.children;
    posts.forEach((post) => {
        createPost(post);
    })
});

//change the subreddit
subredditForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(subredditForm);
    const newSubreddit = formData.get('subreddit');
    console.log(newSubreddit);
    changeSubreddit(newSubreddit);
})
