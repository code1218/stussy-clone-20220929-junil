const categorySelectInput = document.querySelector(".category-select .product-input");
const searchInput = document.querySelector(".product-search .product-input");
const searchButton = document.querySelector(".search-button"); 

let imgMstArray = new Array();

let page = 1;
let category = "ALL";
let searchText = "";


window.onload = () => {
    getList();
}

function getList() {
    $.ajax({
        async: false,
        type: "get",
        url: "/api/admin/products",
        data: {
            "pageNumber": page,
            "category": category,
            "searchText": searchText
        },
        dataType: "json",
        success: (response) => {
            console.log(response);
            if(response.data.length != 0) {
                loadPageNumberButtons(response.data[0].productTotalCount);
                addProducts(response.data);
            }else {
                alert("등록된 상품이 없습니다.");
                location.reload();
            }
        },
        error: (error) => {
            console.log(error);
        }
    });
}

categorySelectInput.onchange = () => {
    page = 1;
    category = categorySelectInput.value;
    getList();
}

searchInput.onkeyup = () => {
    if(window.event.keyCode == 13) {
        searchButton.click();
    }
}

searchButton.onclick = () => {
    page = 1;
    category = categorySelectInput.value;
    searchText = searchInput.value;
    getList();
}

function loadPageNumberButtons(productTotalCount) {
    const pageButtons = document.querySelector(".page-buttons");

    pageButtons.innerHTML = "";

    let maxPage = (productTotalCount % 10 == 0) ? productTotalCount / 10 : Math.floor(productTotalCount / 10) + 1;
    let minPage = 1;

    let startIndex = page % 5 == 0 ? page - 4 : page - (page % 5) + 1;
    let endIndex = startIndex + 4 <= maxPage ? startIndex + 4 : maxPage;

    console.log(`
    totalCount = ${productTotalCount}
    maxPage = ${maxPage}
    startIndex = ${startIndex}
    endIndex = ${endIndex}
    `);

    if(page != 1){
        pageButtons.innerHTML = `<a href="javascript:void(0)"><li>&#60;</li></a>`;
    }
    for(let i = startIndex; i <= endIndex; i++) {
        if(i == page) {
            pageButtons.innerHTML += `<a href="javascript:void(0)" class="a-selected"><li>${i}</li></a>`;
        }else {
            pageButtons.innerHTML += `<a href="javascript:void(0)"><li>${i}</li></a>`;
        }
        
    }
    if(page != maxPage){
        pageButtons.innerHTML += `<a href="javascript:void(0)"><li>&#62;</li></a>`;
    }

    const pageNumbers = pageButtons.querySelectorAll("li");

    for(let i = 0; i < pageNumbers.length; i++) {
        pageNumbers[i].onclick = () => {
            let pageNumberText = pageNumbers[i].textContent;

            if(pageNumberText == "<") {
                --page;
            }else if(pageNumberText == ">") {
                ++page;
            }else {
                page = pageNumberText;
            }

            getList();
        }
    }

}   


function addProducts(productList) {
    const listBody = document.querySelector(".list-body");

    listBody.innerHTML = "";

    productList.forEach((product) => {
        
        listBody.innerHTML += `
        <tr>
            <td class="product-id">${product.id}</td>
            <td>${product.category}</td>
            <td>${product.name}</td>
            <td>${product.price}<span>원</span></td>
            <td>${product.color}</td>
            <td>${product.size}</td>
            <td><button type="button" class="list-button detail-button"><i class="fa-regular fa-file-lines"></i></button></td>
            <td><button type="button" class="list-button delete-button"><i class="fa-regular fa-trash-can"></i></button></td>
        </tr>
        <tr class="product-detail detail-invisible">
            <td colspan="8">
                <table class="product-info">
                    <tr>
                        <td><input type="text" class="product-input" value="${product.price}" placeholder="가격"></td>
                        <td><input type="text" class="product-input" value="${product.color}" placeholder="색상"></td>
                        <td><input type="text" class="product-input" value="${product.size}" placeholder="사이즈"></td>
                    </tr>
                    <tr>
                        <td colspan="3">
                            <textarea class="product-input" placeholder="간략 설명">${product.infoSimple}</textarea>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3">
                            <textarea class="product-input" placeholder="상세 설명">${product.infoDetail}</textarea>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3">
                            <textarea class="product-input" placeholder="기타 설명">${product.infoOption}</textarea>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3">
                            <textarea class="product-input" placeholder="관리 방법">${product.infoManagement}</textarea>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3">
                            <textarea class="product-input" placeholder="배송 설명">${product.infoShipping}</textarea>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3">
                            <form enctype="multipart/form-data">
                                <div class="product-img-inputs">
                                    <label>상품 이미지</label>
                                    <button type="button" class="add-button">추가</button>
                                    <input type="file" class="file-input product-invisible" name="file" multiple>
                                </div>
                            </form>
                            <div class="product-images">
        `;
        let imgDtlArray = new Array();
        product.productImgFiles.forEach(imgFile => {
            imgDtlArray.push(imgFile);
            listBody.innerHTML += `
            <div class="img-box">
                <i class="fa-solid fa-xmark"></i>
                <img class="product-img" src="/image/product/${imgFile.temp_name}">
            </div>
            `;
        });

        imgMstArray.push();                        
        listBody.innerHTML += `
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3">
                            <button type="button" class="black-button update-button">수정하기</button>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        `;

    });

    const detailButtons = document.querySelectorAll(".detail-button");
    const productDetails = document.querySelectorAll(".product-detail");

    detailButtons.forEach((detailButton, index) => {
        detailButton.onclick = () => {
            productDetails.forEach((productDetail, index2) => {
                if(index2 != index){
                    productDetail.classList.add("detail-invisible");
                }
            })

            productDetails[index].classList.toggle("detail-invisible");
        }
    });

}