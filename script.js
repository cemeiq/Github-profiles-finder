const APIURL = "https://api.github.com/users/";
const form = document.querySelector(".user-form");
const search = document.querySelector(".search");
const main = document.querySelector(".main-class");

//getRepos("cemeiq");

async function getUser(username) {
  try {
    const { data } = await axios(APIURL + username);

    getUserCard(data);
    getRepos(username);
  } catch (err) {
    if (err.response.status === 404) {
      createErrorCard("No user Found");
    }
  }
}

async function getRepos(username) {
  try {
    const { data } = await axios(APIURL + username + "/repos?sort=created");

    createReposCard(data);
  } catch (err) {
    if (err.response.status === 404) {
      createErrorCard("Problem fetching repos");
    }
  }
}

function createReposCard(repos_list) {
  const repos = document.querySelector(".repos");
  repos_list.slice(1, 6).forEach(function (item) {
    const repo_linkEl = document.createElement("a");
    repo_linkEl.classList.add("repo");
    repo_linkEl.href = item.html_url;
    repo_linkEl.innerText = item.name;
    repos.appendChild(repo_linkEl);
  });
}

function getUserCard(user_id) {
  const card = ` <div class="card">
  <img
    src= ${user_id.avatar_url}
    alt=""
    class="profile-picture"
  />
  <div class="user-info">
    <h2>${user_id.name}</h2>
    <p>
     ${user_id.bio}
    </p>

    <ul>
      <li><strong>${user_id.followers}</strong> Followers</li>
      <li><strong>${user_id.following}</strong> Following</li>
      <li><strong>${user_id.public_repos}</strong> Repos</li>
    </ul>

    <div class="repos">
      
    </div>
   
  </div>
</div>`;
  main.innerHTML = card;
}

function createErrorCard(msg) {
  const card = ` <div class="card">
    
    <h1>${msg}</h1>
  </div>`;
  main.innerHTML = card;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user_id = search.value;

  if (user_id) {
    getUser(user_id);
  } else {
    console.log("User not found");
  }
});
