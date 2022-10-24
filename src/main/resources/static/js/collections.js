class CollectionReqParam {
    static #instance = null;
    #page = 0;

    constructor() {
        this.page = 1
    }

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new CollectionReqParam();
        }
        return this.#instance;
    }

    getPage() {return this.#page;}
    setPage(page) {this.#page = page;}

    getObject() {
        return {
            page: this.page
        }
    }
}

class CollectionsApi {

    static #instance = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new CollectionsApi();
        }
        return this.#instance;
    }
    
    getCollections(collectionReqParam) {
        const uri = location.href;
        const category = uri.substring(uri.lastIndexOf("/") + 1);
        let responseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "/api/collections/" + category,
            data: collectionReqParam,
            dataType: "json",
            success: (response) => {
                responseData = response.data;
                console.log(responseData);
            },
            error: (error) => {
                console.log(error);
            }
        });

        return responseData;
    }
}

class CollectionsService {
    static #instance = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new CollectionsService();
        }
        return this.#instance;
    }

    loadCollections() {
        const responseData = CollectionsApi.getInstance().getCollections(CollectionReqParam.getInstance().getObject());

        const collectionProducts = document.querySelector(".collection-products");
        responseData.forEach(collection => {
            collectionProducts.innerHTML += `
                <li class="collection-product">
                    <div class="product-img">
                        <img src="/image/product/${collection.imgName}">
                    </div>
                    <div class="product-name">${collection.name}</div>
                    <div class="product-price">${collection.price}원</div>
                </li>
            `;
        });
    }

    addScrollEvent() {
        
    }
}

window.onload = () => {
    CollectionsService.getInstance().loadCollections();
}