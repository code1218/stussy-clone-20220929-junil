class ProductListReqParams {
    static #instance = null;

    constructor(page, category, searchValue) {
        this.page = page;
        this.category = category;
        this.searchValue = searchValue;
    }

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new ProductListReqParams(1, "ALL", "");
        }
        return this.#instance;
    }

    getPage() {return this.page;}
    setPage(page) {this.page = page;}
    getCategory() {return this.category;}
    setCategory(category) {this.category = category;}
    getSearchValue() {return this.searchValue;}
    setSearchValue(searchValue) {this.searchValue = searchValue;}

    getObject() {
        return {
            page: this.page,
            category: this.category,
            searchValue: this.searchValue
        };
    }
}

class ProductApi {

    productDataRequest() {
        let responseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "/api/admin/products",
            data: ProductListReqParams.getInstance().getObject(),
            dataType: "json",
            success: (response) => {
                responseData = response.data;
            },
            error: (error) => {
                console.log(error);
            }
        });

        return responseData;
    }

    productDataUpdateRequest(formData) {
        $.ajax({
            async: false,
            type: "post",
            url: "/api/admin/product/modification",
            enctype: "multipart/form-data",
            contentType: false,
            processData: false,
            data: formData,
            dataType: "json",
            success: (response) => {
                alert("상품 수정 완료");
                location.reload();
            },
            error: (error) => {
                alert("상품 등록 실패");
                console.log(error);
            }
        });
    }
}

class ProductListService {
    static #instance = null;

    constructor() {
        this.productApi = new ProductApi();
        this.topOptionService = new TopOptionService();
        this.loadProductList();
    }

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new ProductListService();
        }
        return this.#instance;
    }

    loadProductList() {
        const responseData = this.productApi.productDataRequest();
        if(this.isSuccessRequestStatus(responseData)) {
            if(responseData.length > 0) {
                this.topOptionService.loadPageMovement(responseData[0].productTotalCount);
                ElementService.getInstance().createProductMst(responseData);
            }
        }
    }

    isSuccessRequestStatus(responseData) {
        return responseData != null;
    }

    updatePoduct(productRepository) {
        this.productApi.productDataUpdateRequest(productRepository.updateFormData);
    }
}

class TopOptionService {
    constructor() {
        this.pageMovement = new PageMovement();
    }

    loadPageMovement(productTotalCount) {
        this.pageMovement.createMoveButtons(productTotalCount);
        this.pageMovement.addEvent();
    }

    addOptioinsEvent() {
        const categorySelectInput = document.querySelector(".category-select .product-input");
        const searchInput = document.querySelector(".product-search .product-input");
        const searchButton = document.querySelector(".search-button"); 

        const productListReqParams = ProductListReqParams.getInstance();

        categorySelectInput.onchange = () => {
            productListReqParams.setPage(1);
            productListReqParams.setCategory(categorySelectInput.value);
            ProductListService.getInstance().loadProductList();
        }

        searchButton.onclick = () => {
            productListReqParams.setPage(1);
            productListReqParams.setCategory(categorySelectInput.value);
            productListReqParams.setSearchValue(searchInput.value);
            ProductListService.getInstance().loadProductList();
        }
        
        searchInput.onkeyup = () => {
            if(window.event.keyCode == 13) {
                searchButton.click();
            }
        }
    }

}

class PageMovement {
    pageButtons = document.querySelector(".page-buttons");

    getEndPageNumber(productTotalCount) {
        return (productTotalCount % 10 == 0) ? productTotalCount / 10 : Math.floor(productTotalCount / 10) + 1;
    }

    createMoveButtons(productTotalCount) {
        let nowPage = ProductListReqParams.getInstance().getPage();

        this.pageButtons.innerHTML = "";

        this.createPreButton(nowPage);
        this.createNumberButton(nowPage, productTotalCount);
        this.createPostButton(nowPage, productTotalCount);
    }

    createNumberButton(nowPage, productTotalCount) {
        let startIndex = nowPage % 5 == 0 ? nowPage - 4 : nowPage - (nowPage % 5) + 1;
        let endIndex = startIndex + 4 <= this.getEndPageNumber(productTotalCount) ? startIndex + 4 : this.getEndPageNumber(productTotalCount);

        for(let i = startIndex; i <= endIndex; i++) {
            if(i == this.nowPage) {
                this.pageButtons.innerHTML += `<a href="javascript:void(0)" class="a-selected"><li>${i}</li></a>`;
            }else {
                this.pageButtons.innerHTML += `<a href="javascript:void(0)"><li>${i}</li></a>`;
            }
        }
    }

    createPreButton(nowPage) {
        if(nowPage != 1){
            this.pageButtons.innerHTML = `<a href="javascript:void(0)"><li>&#60;</li></a>`;
        }
    }

    createPostButton(nowPage, productTotalCount) {
        let maxPage = this.getEndPageNumber(productTotalCount);
        if(nowPage != maxPage){
            this.pageButtons.innerHTML += `<a href="javascript:void(0)"><li>&#62;</li></a>`;
        }
    }

    addEvent() {
        const pageNumbers = this.pageButtons.querySelectorAll("li");
        const productListReqParams = ProductListReqParams.getInstance();

        for(let i = 0; i < pageNumbers.length; i++) {
            pageNumbers[i].onclick = () => {
                let pageNumberText = pageNumbers[i].textContent;

                if(pageNumberText == "<") {
                    productListReqParams.setPage(productListReqParams.getPage() - 1);
                }else if(pageNumberText == ">") {
                    productListReqParams.setPage(productListReqParams.getPage() + 1);
                }else {
                    productListReqParams.setPage(pageNumberText);
                }

                ProductListService.getInstance().loadProductList();
            }
        }
    }
}

class ElementService {
    static #instance = null;
    #productDtl = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new ElementService();
        }
        return this.#instance;
    }

    createProductMst(responseData) {
        const listBody = document.querySelector(".list-body");

        listBody.innerHTML = "";

        responseData.forEach((product) => {
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
                
            </tr>
            `;
        });

        this.addProductMstEvent(responseData);
    }

    addProductMstEvent(responseData) {
        const detailButtons = document.querySelectorAll(".detail-button");
        const productDetails = document.querySelectorAll(".product-detail");

        detailButtons.forEach((detailButton, index) => {
            detailButton.onclick = () => {
                this.#productDtl = responseData[index];

                if(productDetails[index].classList.contains("detail-invisible")) {
                    let confirmationOfModification = false;
                    let changeFlag = false;

                    productDetails.forEach((productDetail, index2) => {
                        if(!productDetail.classList.contains("detail-invisible") && index2 != index){
                            confirmationOfModification = true;
                        }
                    });

                    productDetails.forEach((productDetail, index2) => {
                        if(!productDetail.classList.contains("detail-invisible") && index2 != index){
                            changeFlag = confirm("수정을 취소하시겠습니까?");
                            if(changeFlag) {
                                productDetail.classList.add("detail-invisible");
                                productDetail.innerHTML = "";
                                this.createProductDtl(productDetails[index]);
                                productDetails[index].classList.remove("detail-invisible");
                            }
                        }else {
                            if(confirmationOfModification && changeFlag) {
                                this.createProductDtl(productDetails[index]);
                                productDetails[index].classList.remove("detail-invisible");
                            }else if(!confirmationOfModification) {
                                this.createProductDtl(productDetails[index]);
                                productDetails[index].classList.remove("detail-invisible");
                            }
                        }
                    });
                    
                }else{
                    if(confirm("수정을 취소하시겠습니까?")){
                        productDetails[index].classList.add("detail-invisible");
                        productDetails[index].innerHTML = "";
                    }
                }            
            }
        });
    }

    createProductDtl(productDetail) {
        // productImgList = productDataList[index].productImgFiles;
    
        productDetail.innerHTML = `
        <td colspan="8">
            <table class="product-info">
                <tr>
                    <td><input type="text" class="product-input" value="${this.#productDtl.price}" placeholder="가격"></td>
                    <td><input type="text" class="product-input" value="${this.#productDtl.color}" placeholder="색상"></td>
                    <td><input type="text" class="product-input" value="${this.#productDtl.size}" placeholder="사이즈"></td>
                </tr>
                <tr>
                    <td colspan="3">
                        <textarea class="product-input" placeholder="간략 설명">${this.#productDtl.infoSimple}</textarea>
                    </td>
                </tr>
                <tr>
                    <td colspan="3">
                        <textarea class="product-input" placeholder="상세 설명">${this.#productDtl.infoDetail}</textarea>
                    </td>
                </tr>
                <tr>
                    <td colspan="3">
                        <textarea class="product-input" placeholder="기타 설명">${this.#productDtl.infoOption}</textarea>
                    </td>
                </tr>
                <tr>
                    <td colspan="3">
                        <textarea class="product-input" placeholder="관리 방법">${this.#productDtl.infoManagement}</textarea>
                    </td>
                </tr>
                <tr>
                    <td colspan="3">
                        <textarea class="product-input" placeholder="배송 설명">${this.#productDtl.infoShipping}</textarea>
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
        `;

        const productRepository = new ProductRepository(this.#productDtl);
        const productImgFileService = new ProductImgFileService(productRepository);
        this.createProductDtlImgs(productRepository);
        productImgFileService.addImageFileEvent();
        this.addUpdateButtonEvent(productRepository);
        
    }

    createProductDtlImgs(productRepository) {
        
        const productImages = document.querySelector(".product-images");
        productImages.innerHTML = "";

        productRepository.oldImgList.forEach(img => {
            productImages.innerHTML += `
                <div class="img-box">
                    <i class="fa-solid fa-xmark pre-delete"></i>
                    <img class="product-img" src="/image/product/${img.temp_name}">
                </div>
            `;
        });
    
        productRepository.newImgSrcList.forEach((img) => {
            productImages.innerHTML += `
                <div class="img-box">
                    <i class="fa-solid fa-xmark post-delete"></i>
                    <img class="product-img" src="${img}">
                </div>
            `;
        });

        this.addProductImgDeleteEvent(productRepository);
    }

    addProductImgDeleteEvent(productRepository) {
        const preDeleteButton = document.querySelectorAll(".pre-delete");
        preDeleteButton.forEach((xbutton, index) => {
            xbutton.onclick = () => {
                if(confirm("상품 이미지를 지우시겠습니까?")) {
                    productRepository.oldImgDeleteList.push(productRepository.oldImgList[index]);
                    productRepository.oldImgList.splice(index, 1);
                    this.createProductDtlImgs(productRepository);
                }
            };
        })

        const postDeleteButton = document.querySelectorAll(".post-delete");
        postDeleteButton.forEach((xbutton, index) => {
            xbutton.onclick = () => {
                if(confirm("상품 이미지를 지우시겠습니까?")) {
                    productRepository.newImgList.splice(index, 1);
                    productRepository.newImgSrcList.splice(index, 1);
                    this.createProductDtlImgs(productRepository);
                }
            };
        })
    }

    addUpdateButtonEvent(productRepository) {
        const updateButton = document.querySelector(".update-button");

        updateButton.onclick = () => {
            productRepository.toUpdateFormData(this.#productDtl.id);
            ProductListService.getInstance().updatePoduct(productRepository);
        }
    }
}

class ProductRepository {
    oldImgList;
    oldImgDeleteList;
    newImgList;
    newImgSrcList;
    updateFormData;

    constructor(productDtl) {
        this.oldImgList = productDtl.productImgFiles;
        this.oldImgDeleteList = new Array();
        this.newImgList = new Array();
        this.newImgSrcList = new Array();
        this.updateFormData = new FormData();
    }

    toUpdateFormData(productId) {
        const productInputs = document.querySelectorAll(".product-info .product-input");
        console.log(productInputs);

        this.updateFormData.append("id", productId);
        this.updateFormData.append("price", productInputs[0].value);
        this.updateFormData.append("color", productInputs[1].value);
        this.updateFormData.append("size", productInputs[2].value);
        this.updateFormData.append("infoSimple", productInputs[3].value);
        this.updateFormData.append("infoDetail", productInputs[4].value);
        this.updateFormData.append("infoOption", productInputs[5].value);
        this.updateFormData.append("infoManagement", productInputs[6].value);
        this.updateFormData.append("infoShipping", productInputs[7].value);

        this.oldImgDeleteList.forEach(deleteImgFile => {
            this.updateFormData.append("deleteImgFiles", deleteImgFile.temp_name);
        });

        this.newImgList.forEach(newImgFile => {
            this.updateFormData.append("files", newImgFile);
        });
    }
    
}

class ProductImgFileService {

    productRepository = null;

    constructor(productRepository) {
        this.productRepository = productRepository;
    }

    addImageFileEvent() {
        const fileAddButton = document.querySelector(".add-button");
        const fileInput = document.querySelector(".file-input");
    
        fileAddButton.onclick = () => {
            fileInput.click();
        }
    
        fileInput.onchange = () => {
            const formData = new FormData(document.querySelector("form"));
            let changeFlge = false;
    
            formData.forEach((value) => {
                if(value.size != 0) {
                    this.productRepository.newImgList.push(value);
                    changeFlge = true;
                }
            });

            console.log("newImgList: " + this.productRepository.newImgList.length);
            
            if(changeFlge){
                this.getImageFiles();
                fileInput.value = null;
            }
        }
    }

    getImageFiles() {
        const newImgeList = this.productRepository.newImgList;

        while(this.productRepository.newImgSrcList.length != 0) {
            this.productRepository.newImgSrcList.pop();
        }
    
        newImgeList.forEach((file, i) => {
            const reader = new FileReader();
        
            reader.onload = (e) => {
                console.log("이미지 파일 하나를 리스트에 추가합니다.")
                
                this.productRepository.newImgSrcList.push(e.target.result);
                if(i == newImgeList.length - 1) {
                    console.log("마지막 인덱스일 때만 실행")
                    ElementService.getInstance().createProductDtlImgs(this.productRepository);
                }
            }
    
            setTimeout(() => {reader.readAsDataURL(file);}, i * 100);
        });
        
    }
}


window.onload = () => {
    new ProductListService();
}