class ImportApi {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new ImportApi();
        }
        return this.#instance;
    }
    IMP = null;

    importPayParams = {
        pg: "kakaopay",
        pay_method: "card",
        merchant_uid: "product-" + new Date().getTime(),
        name: "노르웨이 회전 의자",
        amount: 1,
        buyer_email: "gildong@gmail.com",
        buyer_name: "홍길동",
        buyer_tel: "010-4242-4242",
        buyer_addr: "서울특별시 강남구 신사동",
        buyer_postcode: "01181"
    };

    impInfo = {
        impUid: null,
        restApiKey: null,
        restApiSecret: null
    }
    

    constructor() {
        this.IMP = window.IMP;
        this.impInfo.impUid = "imp14519436";
        this.impInfo.restApiKey = "8825270399377631";
        this.impInfo.restApiSecret = "fc2d4ec544d07189a27525485451bb30e570c62e8707046c20304c4dd3420fd8efacd697ba11ef5f";

        this.IMP.init(this.impInfo.impUid);
    }

    requestPay() {
        this.IMP.request_pay(this.importPayParams, this.responsePay);
    }

    

    requestImpAccessToken() {
        const accessToken = null;

        

        return accessToken;
    }

    requestPayDetails() {
        
    }

    responsePay(resp) {
        if(resp.success) {
            alert("결제 성공!");
            $.ajax({
                async: false,
                type: "post",
                url: "https://api.iamport.kr/users/getToken",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Content-Type", "application/json");
                },
                data: JSON.stringify({
                    imp_key: "8825270399377631",
                    imp_secret: "fc2d4ec544d07189a27525485451bb30e570c62e8707046c20304c4dd3420fd8efacd697ba11ef5f"
                }),
                dataType: "json",
                success: (response) => {
                    console.log(response);
                    accessToken = response;
                },
                error: (error) => {
                    console.log(error);
                }
            });
        }else {
            alert("결제 실패!");
        }
    }

}

class Order {

    constructor() {
        this.addPaymentButtonEvent();
    }

    addPaymentButtonEvent() {
        const paymentButton = document.querySelector(".payment-button");
        paymentButton.onclick = () => {
            ImportApi.getInstance().requestPay();
        }
    }
}

window.onload = () => {
    AddressApi.getInstance().addAddressButtonEvent();
    new Order();
}