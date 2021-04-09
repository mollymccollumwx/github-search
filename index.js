const btnRepos = document.getElementById("btn-repos");
const btnCommits = document.getElementById("btn-commits");
const btnPulls = document.getElementById("btn-pulls");
const githubInfo = document.getElementById("github-info");
const githubRepos = document.getElementById("github-repos");
const errorMessage = document.getElementById("error-message");

// async function to preform GET request to Github API to collect ALL repos from inputted user
async function getRepos() {

  const usernameInput = document.getElementById("input-username").value;

  clearSearch();

  const url = "https://api.github.com/users/" + usernameInput + "/repos";

  const response = await fetch(url);
  if(response.status >=200 && response.status <=299){

    var result = await response.json();
    // console.log(result)

  } else {
    console.log(response.status);
    const responseMessage = document.createElement("h5");
    responseMessage.textContent =
      "Username or repository not found. Please try again!";
    errorMessage.appendChild(responseMessage);
  }
  
   // executes for each element in the array and appends it to the page
   result.forEach((repo) => {
    const link = document.createElement("a");
    link.href = repo.html_url;
    link.textContent = repo.name;
    githubRepos.appendChild(link);
    githubRepos.appendChild(document.createElement("br"));
  });

 
}

// async function to preform a GET request to the Github API to collect the commits from a particular repo based on user input
async function getCommits() {

  const usernameInput = document.getElementById("input-username").value;
  const repoInput = document.getElementById("input-repo").value;

  clearSearch();

  url =
    "https://api.github.com/repos/" +
    usernameInput +
    "/" +
    repoInput +
    "/commits";

    const response = await fetch(url);
    if(response.status >=200 && response.status <=299){
  
      var result = await response.json();
      // console.log(result)
  
    } else {
      console.log(response.status);
      const responseMessage = document.createElement("h5");
      responseMessage.textContent =
        "Username or repository not found. Please try again!";
      errorMessage.appendChild(responseMessage);
    }

  result.forEach((repo) => {
    // console.log(repo.commit.message);
    const img = document.createElement("img");
    img.src = repo.author.avatar_url;
    const link = document.createElement("a");
    link.href = repo.commit.html_url;
    link.textContent = repo.commit.message;
    const resultDiv = document.createElement("div");
    resultDiv.appendChild(img);
    resultDiv.appendChild(link).classList.add("ps-3");
    githubInfo.append(resultDiv);
    githubInfo.appendChild(document.createElement("br"));
  });
}
// async function to preform a GET request to the Github API to collect the pull requests from a particular repo based on user input
async function getPulls() {

  const usernameInput = document.getElementById("input-username").value;
  const repoInput = document.getElementById("input-repo").value;

  clearSearch();

  const url =
    "https://api.github.com/repos/" +
    usernameInput +
    "/" +
    repoInput +
    "/pulls";

    const response = await fetch(url);
    if(response.status >=200 && response.status <=299){
  
      var result = await response.json();
      // console.log(result)
  
    } else {
      console.log(response.status);
      const responseMessage = document.createElement("h5");
      responseMessage.textContent =
        "Username or repository not found. Please try again!";
      errorMessage.appendChild(responseMessage);
    }

  // console.log(result);

  if (result.length === 0) {
    // console.log("no pull requests found");
    const nullMessage = document.createElement("h5");
    nullMessage.textContent =
      "No pull requests found for the repository: " + repoInput;
    errorMessage.appendChild(nullMessage);
  }

  result.forEach((pull) => {
    const link = document.createElement("a");
    link.href = pull.html_url;
    link.textContent = pull.title;
    githubInfo.appendChild(link);
    githubInfo.appendChild(document.createElement("br"));
  });
}

// function to clear the prior results or messages if there are any
function clearSearch() {
  while (githubRepos.firstChild) githubRepos.removeChild(githubRepos.firstChild);
  while (githubInfo.firstChild) githubInfo.removeChild(githubInfo.firstChild);
  while (errorMessage.firstChild) errorMessage.removeChild(errorMessage.firstChild);
}

