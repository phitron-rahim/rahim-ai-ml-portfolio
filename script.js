const username = "phitron-rahim";
const container = document.getElementById("github-projects");
const count = document.getElementById("repo-count");
const error = document.getElementById("github-error");

function languageLabel(language) {
  return language ? language : "GitHub Repository";
}

function repoCard(repo) {
  const description = repo.description || "Public project repository. Visit GitHub to explore the implementation.";
  const card = document.createElement("article");
  card.className = "project-card";
  card.innerHTML = `
    <div class="tag">${languageLabel(repo.language)}</div>
    <h3>${repo.name}</h3>
    <p>${description}</p>
    <a href="${repo.html_url}" target="_blank" rel="noopener">View on GitHub →</a>
  `;
  return card;
}

async function loadRepos() {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`
    );
    if (!response.ok) throw new Error("GitHub API request failed");
    const repos = await response.json();

    container.innerHTML = "";
    count.textContent = `${repos.length} public repositories`;

    repos.forEach(repo => container.appendChild(repoCard(repo)));
  } catch (e) {
    container.innerHTML = "";
    count.textContent = "GitHub";
    error.classList.remove("hidden");
  }
}

loadRepos();
