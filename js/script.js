async function loadJSONData(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jsonData = await response.json(); // Parses the JSON string into a JS object
        return jsonData;
    } catch (error) {
        console.error('Error fetching or parsing JSON:', error);
    }
}


// Parent div that will contain number of posts
const parent = document.querySelector(".someonePost")

// Function to append new Post inside someonePost aka parent
function appendNewPost(myTextValue, user) {
    // it count existing children to determine the next number 
    const nextIndex = parent.children.length + 1;

    // create new post element
    const newPost = document.createElement('div');

    // Assign the incremental class(post 1, post 2, etc)
    newPost.classList.add(`post${nextIndex}`);

    newPost.innerHTML = `<div class="profilePicBox">
                        <div class="profilePicture m-2 cursor-pointer">
                            <img src="${user.profilePic}" alt="">
                        </div>
                    </div>
                    <div class="postBox mt-1 min-w-0 mr-4">
                        <div class="topSection flex justify-between">
                            <div class="personalInfo gap-px">
                                <div class="someoneName font-semibold">${user.name}</div>
                                <div class="bluetick flex items-center">
                                    <img class="filter-(--filter-custom-teal)!" src="svg/bluetick.svg" alt="">
                                </div>
                                <div class="username text-sm text-neutral-500">${user.handle}</div>
                                <div class="text-neutral-500">
                                    <img class="invert-50 w-4!" src="./svg/dot-svgrepo-com.svg" alt="">
                                </div>
                                <div class="uploadedTime text-sm text-neutral-500">${user.uploadedTime}</div>
                            </div>
    
                            <div class="moreIcons flex gap-2">
                                <div class="grokIcon ">
                                    <img src="svg/grok.svg" alt="grok">
                                </div>
                                <div class="horizontalDots">
                                    <img class="w-5!" src="./svg/horizontalDots.svg" alt="...">
                                </div>
                            </div>
                        </div>
                        <div class="middleSection wrap-break-word whitespace-pre-wrap">${myTextValue}</div>
                        <div class="bottomSection flex justify-between text-sm text-neutral-500 my-2.5">
                            <div class="replyButton gap-1">
                                <img src="svg/reply.svg" alt="">
                                <span>${user.reply}</span>
                            </div>
                            <div class="repostButton">
                                <img src="svg/repost.svg" alt="">
                                <span>${user.view}</span>
                            </div>
                            <div class="likeButton">
                                <img src="svg/like.svg" alt="">
                                <span>${user.like}</span>
                            </div>
                            <div class="viewButton">
                                <img src="svg/view.svg" alt="">
                                <span>${user.view}</span>
                            </div>
                            <div class="extras flex gap-2.5">
                                <img src="svg/bookmark.svg" alt="">
                                <img src="svg/share.svg" alt="">
                            </div>
                        </div>
                    </div>`

    // Append to the parent
    parent.appendChild(newPost);
}

const textarea = document.getElementById('textpost');
const postButton = document.getElementById('post-btn');

// Textarea that grows dynamically on typing multiple lines
document.addEventListener('DOMContentLoaded', function () {

    textarea.addEventListener('click', () => {
        document.querySelector(".whoCanReply").classList.remove('hidden');
    }

    )

    textarea.addEventListener('input', function () {
        // 1. Reset height to 'auto' so it can shrink when deleting text
        this.style.height = 'auto';

        // 2. Set the height to match the internal scroll content
        // We use scrollHeight to see how much space the text actually takes
        this.style.height = (this.scrollHeight) + 'px';

        // If textarea is empty then postbutton is disabled and if it has text then enabled
        if (this.value.trim().length > 0) {
            postButton.classList.replace('brightness-50', 'brightness-100');
            postButton.disabled = false;
        } else {
            postButton.classList.replace('brightness-100', 'brightness-50');
            postButton.disabled = true;
        }
    });
});



// Adding event listener to post button
postButton.addEventListener('click', async () => {
    // Store the text content in a variable
    const myTextValue = textarea.value;
    console.log(myTextValue);

    // Calling loadJSONData() to get name username, views, etc
    let user = await loadJSONData('user/userinfo.json');
    appendNewPost(myTextValue, user);
}
)

document.getElementById('featureBtn').addEventListener('click', function() {
    var message = document.getElementById('unavailableMessage');
    message.style.display = 'block'; // Show the message
});
