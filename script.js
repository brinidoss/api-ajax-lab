const postContainer = document.querySelector('.post-container');

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

fetch('https://www.reddit.com/r/aww/.json').then((response) => {
    return response.json();
}).then((data) => {
    const posts = data.data.children;
    console.log(posts);
    posts.forEach((post) => {
        createPost(post);
    })
});

