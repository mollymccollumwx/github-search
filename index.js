const githubInfo = document.getElementById("github-info");
const githubRepos = document.getElementById("github-repos");
const errorMessage = document.getElementById("error-message");



// async function to preform GET request to Github API to collect ALL repos from inputted user
const getRepos = async () => {
  const usernameInput = document.getElementById("input-username").value;

  clearSearch();

  const url = "https://api.github.com/users/" + usernameInput + "/repos";

  const response = await fetch(url);
  // handles errors
  if (response.status >= 200 && response.status <= 299) {
    var result = await response.json();
    // executes for each element in the array and appends it to the page
    result.forEach((repo) => {
      const link = document.createElement("a");
      link.href = repo.html_url;
      link.textContent = repo.name;
      githubRepos.appendChild(link);
      githubRepos.appendChild(document.createElement("br"));
    });
  } else {
    printError();
  }
}

// async function to preform a GET request to the Github API to collect the commits from a particular repo based on user input
const getCommits = async () => {
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

  if (response.status >= 200 && response.status <= 299) {
    var result = await response.json();

    result.forEach((repo) => {
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
  } else {
    printError();
  }
}
// async function to preform a GET request to the Github API to collect the pull requests from a particular repo based on user input
const getPulls = async () => {
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
  if (response.status >= 200 && response.status <= 299) {
    var result = await response.json();
    console.log(result);

    if (result.length === 0) {
      const nullMessage = document.createElement("h5");
      nullMessage.textContent =
        "No pull requests found for the repository: " + repoInput;
      errorMessage.appendChild(nullMessage);
    }

    result.forEach((pull) => {
      const img = document.createElement("img");
      img.src = pull.user.avatar_url;
      const link = document.createElement("a");
      link.href = pull.html_url;
      link.textContent = pull.title;
      const resultDiv = document.createElement("div");
      resultDiv.appendChild(img);
      resultDiv.appendChild(link).classList.add("ps-3");
      githubInfo.appendChild(resultDiv);
      githubInfo.appendChild(document.createElement("br"));
    });
  } else {
    printError();
  }
}

// function to clear the prior results or messages if there are any
const clearSearch = () => {
  while (githubRepos.firstChild)
    githubRepos.removeChild(githubRepos.firstChild);
  while (githubInfo.firstChild) githubInfo.removeChild(githubInfo.firstChild);
  while (errorMessage.firstChild)
    errorMessage.removeChild(errorMessage.firstChild);
}

// shows an error message to the user if something goes wrong with the API call - bad input from the user
const printError = () => {
  const responseMessage = document.createElement("h5");
  responseMessage.textContent =
    "Username or repository not found. Please try again!";
  errorMessage.appendChild(responseMessage);
}





