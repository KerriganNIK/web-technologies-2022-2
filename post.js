const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const postId = urlParams.get('id');

function createElement(post) {
    const { id, title, body } = post;
    return `
        <div>
            <div><b>Post id:</b> ${id}</div>
            <div><b>Post title:</b> ${title}</div>
            <div><b>Post body:</b> ${body}</div>
        </div>
    `;
}

function displayComments(comments) {
    const commentsHTML = comments.map(comment => `
        <div>
            <div><b>Comment Id:</b> ${comment.id}</div>
            <div><b>Comment name:</b> ${comment.name}</div>
            <div><b>Comment email:</b> ${comment.email}</div>
            <div><b>Comment body:</b> ${comment.body}</div>
            <br>
        </div>
    `).join('');

    document.querySelector('.comments').innerHTML = commentsHTML;
}

async function getPostData() {
    let responsePost;
    let post;

    try {
        responsePost = await fetch('https://jsonplaceholder.typicode.com/posts/' + postId);
        post = await responsePost.json();
    } catch (e) {
        console.log(e);
        return;
    }

    const element = createElement(post);
    document.querySelector('.post').innerHTML = element;

    let responseComments;
    let comments;

    try {
        responseComments = await fetch('https://jsonplaceholder.typicode.com/posts/' + post.id + '/comments');
        comments = await responseComments.json();
    } catch (e) {
        console.log(e);
        return;
    }

    displayComments(comments);
}

getPostData();
