const getApiData = async () => {
  try {
    let response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (response.status === 200) {
      return await response.json();
    }
  } catch (error) {
    console.log(error);
  }
};

let tableHeaders = ["", "ID", "Name", "Username", "Email", "City"];

const generateTableHead = () => {
  let tableHead = document.querySelector("#table thead");
  let row = tableHead.insertRow();

  tableHeaders.forEach((headerText) => {
    let th = document.createElement("th");
    textNode = document.createTextNode(headerText);
    th.appendChild(textNode);
    row.appendChild(th);
  });
};

const generateTable = async () => {
  let data = await getApiData();
  let tableBody = document.querySelector("#table tbody");

  data.forEach((user) => {
    let row = tableBody.insertRow();
    let keys = Object.keys(user);
    let checkboxKey = document.createElement("input");
    checkboxKey.type = "checkbox";
    checkboxKey.addEventListener("click", GetSelected);
    let checkboxCell = row.insertCell();
    checkboxCell.appendChild(checkboxKey);

    keys.forEach((key) => {
      let text = "";

      if (
        key == "id" ||
        key == "name" ||
        key == "username" ||
        key == "address" ||
        key == "email"
      ) {
        if (key == "address") {
          text = document.createTextNode(user[key].city);
        } else {
          text = document.createTextNode(user[key]);
        }
        let cell = row.insertCell();
        cell.appendChild(text);
      } else {
        return;
      }
    });
  });
};

const GetSelected = () => {
  let table = document.getElementById("table");
  const checkboxes = table.getElementsByTagName("input");

  Array.from(checkboxes).forEach((checkbox) => {
    if (checkbox.checked) {
      checkbox.parentNode.parentNode.classList.add("checked");
    } else {
      checkbox.parentNode.parentNode.classList.remove("checked");
      checkbox.parentNode.parentNode.removeAttribute("class");
    }
  });
};

const renderUsers = () => {
  generateTableHead();
  generateTable();
};

renderUsers();
