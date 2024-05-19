function generateUsername(name) {
  const reversedName = name.toLowerCase().split("").reverse().join("");
  const randomNumber = Math.floor(Math.random() * 1000);
  return reversedName + randomNumber;
}

function updateHeader(name, bio, username) {
  document.getElementById("studentName").innerText = name;
  document.getElementById("studentBio").innerText = bio;
  document.getElementById("studentUsername").innerText = username;
}

function handleSubmit(event) {
  event.preventDefault();

  const nameInput = document.getElementById("name");
  const bioInput = document.getElementById("bio");
  const formError = document.getElementById("error");

  const name = nameInput.value.trim();
  const bio = bioInput.value.trim();

  if (!name || !bio) {
    formError.textContent = "Please enter both name and bio.";

    return;
  }

  const username = generateUsername(name);

  updateHeader(name, bio, username);

  nameInput.value = "";
  bioInput.value = "";
}

const formContainer = document.getElementById("formContainer");

const form = document.createElement("form");
form.addEventListener("submit", handleSubmit);

const nameLabel = document.createElement("label");
nameLabel.textContent = "Name:";
form.appendChild(nameLabel);

const nameInput = document.createElement("input");
nameInput.setAttribute("type", "text");
nameInput.setAttribute("id", "name");
form.appendChild(nameInput);

const bioLabel = document.createElement("label");
bioLabel.textContent = "Bio:";
form.appendChild(bioLabel);

const bioInput = document.createElement("textarea");
bioInput.setAttribute("id", "bio");
form.appendChild(bioInput);

const formError = document.createElement("div");
formError.setAttribute("id", "error");
form.appendChild(formError);

const submitButton = document.createElement("button");
submitButton.setAttribute("type", "submit");
submitButton.setAttribute("class", "form-submit");
submitButton.textContent = "Submit";
form.appendChild(submitButton);

formContainer.appendChild(form);
