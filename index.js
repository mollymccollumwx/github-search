const btnRepos = document.getElementById("btn-repos");
const btnCommits = document.getElementById("btn-commits");
const btnPulls = document.getElementById("btn-pulls");


const githubInfo = document.getElementById("github-info");

btnRepos.addEventListener("click", getRepos);
btnCommits.addEventListener("click", getCommits);
btnPulls.addEventListener("click", getPulls);

async function getRepos() {
  const usernameInput = document.getElementById("input-username").value;

  clearSearch();

  const url = "https://api.github.com/users/" + usernameInput + "/repos";
  const response = await fetch(url);
  const result = await response.json();

  const githubColumn = document.getElementById("github-column");
  githubColumn.classList.remove("text-left");
  githubColumn.classList.add("text-center");

  result.forEach((repo) => {
    

    const link = document.createElement("a");
    link.href = repo.html_url;
    link.textContent = repo.name;
    githubInfo.appendChild(link);
    githubInfo.appendChild(document.createElement("br"));
  });
}

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
  const result = await response.json();

  result.forEach((repo) => {
    console.log(repo.commit.message);
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

  const result = await response.json();

  console.log(result);


//   BUG: if statement is executing twice 

  if (result === undefined || result.length === 0) {
    console.log("no pull requests found");
    const nullMessage = document.createElement("h2");
    nullMessage.textContent =
      "No pull requests found for the repository: " + repoInput;
    githubInfo.appendChild(nullMessage);
  }

  result.forEach((pull) => {
    const link = document.createElement("a");
    link.href = pull.html_url;
    link.textContent = pull.title;
    githubInfo.appendChild(link);
    githubInfo.appendChild(document.createElement("br"));
  });
}

function clearSearch() {
  while (githubInfo.firstChild) githubInfo.removeChild(githubInfo.firstChild);
}
