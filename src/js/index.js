import http from "./httpService.js";

const loadBtn = document.getElementById("load-data");
const searchBox = document.getElementById("search-bar");
const tableData = document.querySelector(".transactions");
const tableBody = document.querySelector(".tBody");
const chevrons = document.querySelectorAll(".chevron-icon");
const searchInput = document.getElementById("search-field");

let refValue = ""
let typeValue = ""
const searchByRef = () => {
    const searchValue = Number(searchInput.value);
    if ((typeof searchValue === "number") & (searchValue !== 0)) {
        clearData();
				refValue = searchValue;
				searchAndSort(refValue,typeValue)
    } else {
        clearData();
        getData();
    }
		console.log(refValue);
	};

searchInput.addEventListener("keyup", searchByRef);


for (const chevron of chevrons) {
    let flag = true;
    chevron.addEventListener("click", (e) => {
        e.target.style.transition = "all 0.2s ease-in";
        e.target.classList.toggle("rotate");

        if (flag) {
            flag = false;
						typeValue="desc"
            console.log(flag);
            searchAndSort(refValue, typeValue);
        } else if (!flag) {
					flag = true;
					typeValue="asc"
					searchAndSort(refValue, typeValue);
        }
    });
}

const hideLoadBtn = () => {
    loadBtn.classList.add("hidden");
};

const showSearchBar = () => {
    searchBox.classList.add("search-box");
    searchBox.classList.remove("hidden");
};

const showTableData = () => {
    tableData.classList.remove("hidden");
};

const tableTr = (dataArray) => {
    const dateFormat = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    };
    for (const data of dataArray) {
        const date = new Date(data.date).toLocaleDateString("fa-IR");
        const time = new Date(data.date).toLocaleTimeString(
            "fa-IR",
            dateFormat
        );

        tableBody.innerHTML += `
				<tr>
			      <td class="">${data.id}</td>
			      <td class="${data.type === "افزایش اعتبار" ? "deposit" : "withdraw"}">${
            data.type
        }</td>
			      <td class="transactions-price">${data.price}</td>
			      <td class="">${data.refId}</td>
			      <td class="">${date} ساعت ${time}</td>
			  </tr>`;
    }
};

const clearData = () => {
    tableBody.innerHTML = "";
};

const searchAndSort = async (refId = "", type) => {
		try {
				const { data } = await http.get(
						`/transactions?${
								refId === 0 ? "" : `refId_like=${refId}`
						}&_sort=price&_order=${type}`
				);
				clearData();
				tableTr(data);
		} catch (e) {
				console.log(e.message);
		}
};

const getData = async () => {
    try {
        const { data } = await http.get("/transactions");
        tableTr(data);
        hideLoadBtn();
        showSearchBar();
        showTableData();
    } catch (e) {
        console.log(e.message);
    }
};

loadBtn.addEventListener("click", getData);


