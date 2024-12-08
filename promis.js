const click = document.querySelector(".click");
const main = document.querySelector(".main");

function delay(ms) {
    return new Promise((resolve, reject) => {
        if (ms < 0) {
            reject('Invalid time delay');
        } else {
            setTimeout(() => {
                resolve();
            }, ms);
        }
    });
}

function fetchData() {
    //we are checking time out so using reject 
    const timeout = new Promise((reject) => setTimeout(() => reject("Operation timed out."), 5000));
    const fetchPromise = fetch("https://dummyjson.com/posts")
        .then(response => response.json())
        .then(data => data.posts.map(post => post.title))
        .catch(error => Promise.reject("Operation timed out." + error.message));
    // this take the two arrys and return promis which is come 1st among timeout and fetch pomis
    return Promise.race([fetchPromise, timeout]);
}

click.addEventListener('click', function() {
    const newSection = document.createElement("section");
    const bmsg = document.createElement("div");
    bmsg.className = "bmsg";
    newSection.className = "dissection";
    
    newSection.appendChild(bmsg);
    main.appendChild(newSection);
    bmsg.innerHTML = "Loading...";

    delay(5000)
        .then(() => {
            return fetchData();  
        })
        .then(postTitles => {
            const change = document.createElement("div");
            change.className = "display";
            
            postTitles.forEach(title => {
                const li = document.createElement("li");
                li.innerHTML = title;
                change.appendChild(li);
            });
            
            bmsg.replaceWith(change);  
        })
        .catch(error => {
            bmsg.innerHTML = error;  
        });
});
