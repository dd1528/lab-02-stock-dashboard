// ===============================
// STOCK PORTFOLIO DASHBOARD LOGIC
// ===============================

// Data comes from /data/users.js and /data/stocks-complete.js
// Those files define arrays like `users` and `stocks`

let currentUser = null;

// 1️⃣ Display all users in the sidebar
function loadUsers() {
  const userList = document.querySelector(".user-list");
  userList.innerHTML = "";

  users.forEach((user) => {
    const li = document.createElement("li");
    li.textContent = `${user.firstName} ${user.lastName}`;
    li.addEventListener("click", () => selectUser(user));
    userList.appendChild(li);
  });
}

// 2️⃣ When a user is clicked, show their info and portfolio
function selectUser(user) {
  currentUser = user;

  // Fill the form fields
  document.getElementById("userID").value = user.id;
  document.getElementById("firstname").value = user.firstName;
  document.getElementById("lastname").value = user.lastName;
  document.getElementById("address").value = user.address;
  document.getElementById("city").value = user.city;
  document.getElementById("email").value = user.email;

  showPortfolio(user.portfolio);
}

// 3️⃣ Show user's stock holdings
function showPortfolio(portfolio) {
  const portfolioContainer = document.querySelector(".portfolio-list");
  portfolioContainer.innerHTML = `
    <h3>Symbol</h3>
    <h3># Shares</h3>
    <h3>Actions</h3>
  `;

  portfolio.forEach((item) => {
    const stock = stocks.find((s) => s.symbol === item.symbol);
    const row = document.createElement("div");
    row.classList.add("portfolio-row");

    const symbol = document.createElement("p");
    symbol.textContent = item.symbol;

    const shares = document.createElement("p");
    shares.textContent = item.shares;

    const btnView = document.createElement("button");
    btnView.textContent = "View";
    btnView.addEventListener("click", () => showStockDetails(stock));

    row.appendChild(symbol);
    row.appendChild(shares);
    row.appendChild(btnView);
    portfolioContainer.appendChild(row);
  });
}

// 4️⃣ Display selected stock details
function showStockDetails(stock) {
  if (!stock) return;

  document.getElementById("logo").src = stock.logo;
  document.getElementById("stockName").textContent = stock.name;
  document.getElementById("stockSector").textContent = stock.sector;
  document.getElementById("stockIndustry").textContent = stock.industry;
  document.getElementById("stockAddress").textContent = stock.address;
}

// 5️⃣ Save changes to user info
document.getElementById("btnSave").addEventListener("click", (e) => {
  e.preventDefault();
  if (!currentUser) return alert("Select a user first!");

  currentUser.firstName = document.getElementById("firstname").value;
  currentUser.lastName = document.getElementById("lastname").value;
  currentUser.address = document.getElementById("address").value;
  currentUser.city = document.getElementById("city").value;
  currentUser.email = document.getElementById("email").value;

  alert("User information saved!");
  loadUsers();
});

// 6️⃣ Delete the selected user
document.getElementById("btnDelete").addEventListener("click", (e) => {
  e.preventDefault();
  if (!currentUser) return alert("No user selected!");

  const index = users.findIndex((u) => u.id === currentUser.id);
  if (index !== -1) {
    users.splice(index, 1);
    alert("User deleted!");
  }

  // Clear the UI
  document.querySelector(".portfolio-list").innerHTML = "";
  document.getElementById("userEntry").reset;
  currentUser = null;
  loadUsers();
});

// 7️⃣ Initialize page
window.onload = loadUsers;
