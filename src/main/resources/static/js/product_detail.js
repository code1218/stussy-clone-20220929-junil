class ProductApi {
    static #instance = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new ProductApi();
        }
        return this.#instance;
    }

    getProduct() {
        let responseData = null;
        const uri = location.href;
        const groupId = uri.substring(uri.lastIndexOf("/") + 1);

        $.ajax({
            async: false,
            type: "get",
            url: "/api/products/" + groupId,
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
}

class ProductDetailService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new ProductDetailService();
        }
        return this.#instance;
    }

    loadProductDetail() {
        const responseData = ProductApi.getInstance().getProduct();
        console.log(responseData);
        this.getProductImg(responseData.imgNames);
        this.getProductInfo(responseData);
        this.getColorOptions(responseData.options);
        this.addColorOptionsSelectEvent(responseData.options);
    }

    getProductImg(imgNames) {
        const productImages = document.querySelector(".product-images");
        imgNames.forEach(imgName => {
            productImages.innerHTML += `
                <div class="product-image">
                    <img src="/image/product/${imgName}">
                </div>
            `;
        });
    }

    getProductInfo(responseData) {
        const productTitle = document.querySelector(".product-title");
        const productPrice = document.querySelector(".product-price");
        productTitle.textContent = responseData.name;
        productPrice.textContent = responseData.price;
    }

    getColorOptions(options) {
        const productColor = document.querySelector(".product-color");
        
        Object.keys(options).forEach(color => {
            productColor.innerHTML += `
                <option value="${color}">${color}</option>
            `;
        });
    }

    addColorOptionsSelectEvent(options) {
        const productColor = document.querySelector(".product-color");
        Object.entries(options).forEach(entry => {
            if(productColor.value == entry[0]) {
                const productSize = document.querySelector(".product-size");
                productSize.innerHTML = "";
                entry[1].forEach((size, index) => {
                    productSize.innerHTML += `
                        <input class="size-radios" type="radio" id="size-${size}" name="size-group" ${index == 0 ? "checked" : ""}>
                        <label class="size-buttons" for="size-${size}">${size}</label>
                    `;
                });
            }
        })

        productColor.onchange = () => {
            Object.entries(options).forEach(entry => {
                if(productColor.value == entry[0]) {
                    const productSize = document.querySelector(".product-size");
                    productSize.innerHTML = "";
                    entry[1].forEach((size, index) => {
                        productSize.innerHTML += `
                            <input class="size-radios" type="radio" id="size-${size}" name="size-group" ${index == 0 ? "checked" : ""}>
                            <label class="size-buttons" for="size-${size}">${size}</label>
                        `;
                    });
                }
            })
        }
    }

}

window.onload = () => {
    ProductDetailService.getInstance().loadProductDetail();
}