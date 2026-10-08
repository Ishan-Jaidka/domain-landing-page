const linksContainer = document.getElementById("links");
const status = document.getElementById("directory-status");
status.hidden = false;

function createCard(entry, index) {
  // Only web destinations belong in this directory.
  const url = new URL(entry.url);
  if (!["https:", "http:"].includes(url.protocol) || typeof entry.name !== "string" || !entry.name.trim()) {
    throw new Error("Each entry needs a name and an HTTP(S) URL.");
  }

  const item = document.createElement("li");
  const card = document.createElement("a");
  card.className = "link-card";
  card.href = url.href;

  const top = document.createElement("span");
  top.className = "card-top";
  top.setAttribute("aria-hidden", "true");
  const number = document.createElement("span");
  number.className = "card-number";
  number.textContent = String(index + 1).padStart(2, "0");
  // Static decorative icon; entry text is always inserted with textContent.
  top.innerHTML = '<svg class="card-arrow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 18 18 6M6 6h12v12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  top.prepend(number);

  const title = document.createElement("h3");
  title.className = "card-title";
  title.textContent = entry.name;
  card.append(top, title);

  if (typeof entry.description === "string" && entry.description.trim()) {
    const description = document.createElement("p");
    description.className = "card-description";
    description.textContent = entry.description;
    card.append(description);
  }

  const domain = document.createElement("span");
  domain.className = "card-domain";
  domain.textContent = url.host;
  card.append(domain);
  item.append(card);
  return item;
}

async function loadDirectory() {
  try {
    const response = await fetch("links.json");
    if (!response.ok) throw new Error(`Directory request failed: ${response.status}`);
    const entries = await response.json();
    if (!Array.isArray(entries)) throw new Error("links.json must contain an array.");
    const cards = entries.map(createCard);
    linksContainer.replaceChildren(...cards);
    status.textContent = cards.length ? "" : "More projects to come. Check back soon.";
    status.hidden = cards.length > 0;
  } catch (error) {
    status.textContent = "The directory couldn't load. Please refresh to try again.";
    console.error("Error loading directory:", error);
  }
}

loadDirectory();
