
let page = 1;

window.onload = () => {
    getList();
}

function getList() {
    $.ajax({
        async: false,
        type: "get",
        url: "/api/admin/products",
        data: {
            pageNumber: page,
            category: "",
            searchText: ""
        },
        dataType: "json",
        success: (response) => {
            console.log(response);
            addProducts(response.data);
        },
        error: (error) => {
            console.log(error);
        }
    });
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