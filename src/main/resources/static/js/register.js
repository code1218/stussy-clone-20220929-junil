const registerButton = document.querySelector(".login-button");

registerButton.onclick = () => {
    const registerInputs = document.querySelectorAll(".login-input");

    let registerInfo = {
        lastName: registerInputs[0].value,
        firstName: registerInputs[1].value,
        email: registerInputs[2].value,
        password: registerInputs[3].value
    }

    $.ajax({
        async: false,
        type: "post",
        url: "/api/account/register",
        contentType: "application/json",
        data: JSON.stringify(registerInfo),
        dataType: "json",
        success: (response) => {
            location.replace("/account/login"); 
        },
        error: (error) => {
            console.log(error);
            validationError(error.responseJSON.data);
        }
    });
}

function validationError(error) {
    const accountErrors = document.querySelector(".account-errors");
    const accountErrorList = accountErrors.querySelector("ul");

    const errorValues = Object.values(error);

    accountErrorList.innerHTML = "";

    errorValues.forEach((value) => {
        accountErrorList.innerHTML += `
            <li>${value}</li>
        `;
    });

    accountErrors.classList.remove("errors-invisible");
}