// Global Vaiables
let pName = document.getElementById("name");
let pPrice = document.getElementById("price");
let pTaxes = document.getElementById("taxes");
let pAds = document.getElementById("ads");
let pDiscount = document.getElementById("discount");
let pTotal = document.getElementById("total");
let pCount = document.getElementById("count");
let pCategory = document.getElementById("category");
let createBtn = document.getElementById("create");
let table = document.getElementById("table-body");
let deleteAll = document.getElementById("delete-all");
let productUpdateId; // To Choose Product Which Update It
let allProducts = []; //All Products
let searchMood = "searchByName";

//Check Data In Locaol Storage
const checkOnLocalStorage = () => {
  if (localStorage.length) {
    localStorage.getItem("products");
    allProducts = JSON.parse(localStorage.getItem("products"));
    // Creat Delete All Eleament
    showProducts();
  } else {
    allProducts = [];
    deleteAll.style.display = "none";
  }
};
// localStorage.clear();
// Get Total Price
const getTotal = () => {
  if (pPrice.value) {
    let result = +pPrice.value + +pTaxes.value + +pAds.value - +pDiscount.value;
    pTotal.textContent = result;
    pTotal.style.background = "green";
  } else {
    pTotal.textContent = "";
    pTotal.style.background = "red";
  }
};

// Creat New Product
const creatProduct = () => {
  let newProduct = {
    name: pName.value,
    price: +pPrice.value,
    taxes: +pTaxes.value,
    ads: +pAds.value,
    discount: +pDiscount.value,
    count: +pCount.value,
    category: pCategory.value,
  };
  if (createBtn.innerText === "Create") {
    if (pName.value && pPrice.value && pCategory.value) {
      if (+pCount.value > 1) {
        for (let i = 0; i < +pCount.value; i++) {
          allProducts.push(newProduct);
        }
      } else {
        allProducts.push(newProduct);
      }
      localStorage.setItem("products", JSON.stringify(allProducts));
      cleraInputs();
      showProducts();
    }
  } else {
    pCount.style.display = "block";
    allProducts[productUpdateId] = newProduct;
    createBtn.textContent = "Create";
    localStorage.setItem("products", JSON.stringify(allProducts));
    cleraInputs();
    showProducts();
  }
};

// Clear Inputs After Creat Product
const cleraInputs = () => {
  pName.value = "";
  pPrice.value = "";
  pTaxes.value = "";
  pAds.value = "";
  pDiscount.value = "";
  pTotal.textContent = "";
  pTotal.style.background = "red";
  pCount.value = "";
  pCategory.value = "";
};

//Show Products in table
const showProducts = () => {
  let content = "";
  allProducts.map((product, i) => {
    content += `<tr class="text-center">
        <th scope="row">${i}</th>
        <td class="productName">${product.name}</td>
        <td>${product.price}</td>
        <td>${product.taxes}</td>
        <td>${product.ads}</td>
        <td>${product.discount}</td>
        <td class="productCategory">${product.category}</td>
        <td><button onclick="updateProduct(${i})" class="fw-bold btn btn-warning btn-sm w-100" id="update">update</button></td>
        <td><button onclick="deleteProduct(${i})" class="fw-bold btn btn-danger btn-sm w-100" id="delete">delete</button></td>
      </tr>`;
  });
  table.innerHTML = content;
  let deleteAllBtn = `<button onclick="deleteAllProducts()" class="fw-bold btn btn-danger w-100">Delete All (${allProducts.length})</button>`;
  deleteAll.innerHTML = deleteAllBtn;
  if (allProducts.length) {
    deleteAll.style.display = "block";
  } else {
    deleteAll.style.display = "none";
  }
};

// Delete Product
const deleteProduct = (productID) => {
  allProducts.splice(productID, 1);
  localStorage.setItem("products", JSON.stringify(allProducts));
  checkOnLocalStorage();
};

// Delete All Product
const deleteAllProducts = () => {
  localStorage.clear();
  allProducts.splice(0);
  checkOnLocalStorage();
  showProducts();
};

// update Product
const updateProduct = (productID) => {
  pName.value = allProducts[productID].name;
  pPrice.value = allProducts[productID].price;
  pTaxes.value = allProducts[productID].taxes;
  pAds.value = allProducts[productID].ads;
  pDiscount.value = allProducts[productID].discount;
  pCategory.value = allProducts[productID].category;
  createBtn.textContent = "Update";
  productUpdateId = productID;
  pCount.style.display = "none";
  scroll((top = 0), (behavior = "smoth"));
};

// Search
// const searchByName = () => {
//   let producstName = document.getElementsByClassName("productName");
//   let search = document.getElementById("search");
//   search.placeholder = "Search By Name";
//   Array.from(producstName).forEach((item) => {
//     if (search.value != "") {
//       if (item.textContent.includes(search.value)) {
//         console.log(item.textContent.includes(search.value.toLowerCase()));
//         item.parentElement.style.visibility = "inherit";
//         console.log(item.textContent);
//         console.log(search.value);
//       } else {
//         item.parentElement.style.visibility = "collapse";
//       }
//     } else {
//       item.parentElement.style.visibility = "inherit";
//     }
//   });
//   console.log("Name", producstName);
//   console.log("Search", search);
// };

// const searchByCategory = () => {
//   let productCategory = document.getElementsByClassName("productCategory");
//   let search = document.getElementById("search");
//   search.placeholder = "Search By Category";
//   Array.from(productCategory).forEach((item) => {
//     if (search.value != "") {
//       if (item.textContent.includes(search.value.toLowerCase())) {
//         console.log(item.textContent.includes(search.value));
//         item.parentElement.style.visibility = "inherit";
//       } else {
//         item.parentElement.style.visibility = "collapse";
//       }
//     } else {
//       item.parentElement.style.visibility = "inherit";
//     }
//   });
// };

const searchByType = (searchType) => {
  if (searchType === "searchByName") {
    let search = document.getElementById("search");
    search.placeholder = "Search By Name";
  } else {
    let search = document.getElementById("search");
    search.placeholder = "Search By Category";
    searchMood = "searchByCategory";
  }
};

const search = (searchValue) => {
  if (searchMood === "searchByName") {
    console.log(searchValue);
    let producstName = document.getElementsByClassName("productName");
    search.placeholder = "Search By Name";
    Array.from(producstName).forEach((item) => {
      if (searchValue != "") {
        if (
          item.textContent.toLowerCase().includes(searchValue.toLowerCase())
        ) {
          item.parentElement.style.visibility = "inherit";
        } else {
          item.parentElement.style.visibility = "collapse";
        }
      } else {
        item.parentElement.style.visibility = "inherit";
      }
    });
  } else {
    let productCategory = document.getElementsByClassName("productCategory");
    let search = document.getElementById("search");
    search.placeholder = "Search By Category";
    Array.from(productCategory).forEach((item) => {
      if (searchValue != "") {
        if (
          item.textContent.toLowerCase().includes(searchValue.toLowerCase())
        ) {
          item.parentElement.style.visibility = "inherit";
        } else {
          item.parentElement.style.visibility = "collapse";
        }
      } else {
        item.parentElement.style.visibility = "inherit";
      }
    });
  }
};

checkOnLocalStorage();
