const fileAddButton = document.querySelector(".add-button");
const fileInput = document.querySelector(".file-input");
const submitButton = document.querySelector(".submit-button");

let productImageFiles = new Array();


fileAddButton.onclick = () => {
    fileInput.click();
}

fileInput.onchange = () => {
    const formData = new FormData(document.querySelector("form"));

    formData.forEach((value) => {
        if(value.size != 0) {
            productImageFiles.push(value);
            console.log(productImageFiles);
            getImagePreview();
            fileInput.value = null;
        }
    });
}

function getImagePreview() {
    const productImages = document.querySelector(".product-images");

    productImages.innerHTML = "";

    productImageFiles.forEach(file => {
        const reader = new FileReader();
    
        reader.onload = (e) => {
            productImages.innerHTML += `
                <div class="img-box">
                    <i class="fa-solid fa-xmark"></i>
                    <img class="product-img" src="${e.target.result}">
                </div>
            `;

            const deleteButton = document.querySelectorAll(".fa-xmark");
            deleteButton.forEach((xbutton, index) => {
                xbutton.onclick = () => {
                    if(confirm("상품 이미지를 지우시겠습니까?")) {
                        productImageFiles.splice(index, 1);
                        console.log(productImageFiles);
                        getImagePreview();
                    }
                };
            })

        }

        reader.readAsDataURL(file);
    });
}