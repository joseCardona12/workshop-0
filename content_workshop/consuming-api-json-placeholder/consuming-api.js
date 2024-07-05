
const displayError = (error) =>{ // Function for show error with the function fetchPost
    const $messageError = document.getElementById("error-message"); // Obtain html element for show error
    $messageError.textContent = `Error: ${error.message}` // Change content text of element 
}

const displayPosts = (posts) =>{ // Function for show post
    const $postList = document.getElementById("post-list"); // Obtain html elment  list
    $postList.innerHTML = ``; // Change the content list
    posts.forEach(post => { // Iterate the post for obtain post
        const $itemList = document.createElement("LI"); // Create html element li, two span
        const $spanItemTitle = document.createElement("SPAN");
        const $spanItemContent = document.createElement("SPAN");

        $spanItemTitle.textContent = `Title: ` // Change content text of html element first span
        $spanItemContent.textContent = `${post.title}` // Change content text of html elelment second spna

        $itemList.appendChild($spanItemTitle); // Inject html element create from javascript to html
        $itemList.appendChild($spanItemContent);
        $postList.appendChild($itemList);
        
    });
}
const fetchPost = async() =>{ // Function for use fetch for obtain post
    try{ // Error control
        const response = await fetch("https://sonplaceholder.typicode.com/posts"); // Await the response of the petition
        if(!response.ok){ // Condition for response and throw error
            throw new Error("Network response was not ok", response.statusText);
        }
        return response.json(); // Return response in json

    }catch(error){ // 
        displayError(error); // Is executed fucntion display Error
    }
}


document.addEventListener("DOMContentLoaded", async()=>{ // At the moment dom content load execute function async
    const postFetch = await fetchPost(); // Obtain response in json and save on variable
    if(postFetch){ // Condition true exists
        const $buttonLoadPosts = document.getElementById("fetch-posts"); // Obtain html element 
        $buttonLoadPosts.addEventListener("click", ()=>{ // Add event to button load posts
            displayPosts(postFetch);
        })
    }
})
