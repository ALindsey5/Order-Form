window.onload = function() {
    const myFirstName = document.getElementById("first_name");
    const myLastName = document.getElementById("last_name");
    const myEmail = document.getElementById("email");
    const myPhone = document.getElementById("phone");
    const myAddress = document.getElementById("shipping_address");
    const myProduct = document.getElementById("product");
    const myQuantity = document.getElementById("quantity");
    const myPayTypes = document.getElementsByName("payment_type");
    const myCardNum = document.getElementById("card_number");
    const myOrderDate = document.getElementById("order_date");
    const myButton = document.getElementById("order_button");
    const myOutput = document.getElementById("output");

    function getTotalCost() {
        const thisProduct = myProduct.options[myProduct.selectedIndex];
        const thisPrice = parseFloat(thisProduct.getAttribute("data-price"));
        const thisQuantity = parseInt(myQuantity.value);
        const thisCost = thisPrice * thisQuantity;
        return thisCost;
    }

    function getReceipt() {
        let thisName = myFirstName.value + " " + myLastName.value;
        let thisEmail = "<a href=mailto:" + myEmail.value + "'>" + myEmail.value + "</a>";
        let thisPhone = "<a href='tel:" + myPhone.value + "'>" + myPhone.value + "</a>";
        let thisAddress = myAddress.value.replaceAll("\n", "<br>");
        let thisProduct = myProduct.options[myProduct.selectedIndex].innerHTML;
        let thisQuantity = myQuantity.value;
        let thisTotal = getTotalCost();
        let tempPayType = document.querySelector('input[name="payment_type"]:checked');
        let thisPayType = tempPayType.value;
        let thisCardNum = myCardNum.value;
        let thisOrderDate = myOrderDate.value;

        let thisOutput = `<h2>Order Received on ${thisOrderDate}</h2>
        <h2>Shipping Information</h2>
        <p>${thisName}<br>${thisEmail} - ${thisPhone}<br>${thisAddress}
        <hr><h2>Product Information</h2>
        <p>${thisProduct}<br>Quantity: ${thisQuantity}<br>
        Total: $${thisTotal}</p>
        <h2>Payment Information</h2>
        <p>Card Type: ${thisPayType} - ${thisCardNum}</p>`;

        return thisOutput;
    }

    // Validation Functions
    function validateName(name) {
        const regex = /^[A-Za-z]+$/;
        return name && regex.test(name) ? "" : "Please enter a valid name (letters only).";
    }

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return email && regex.test(email) ? "" : "Please enter a valid email address.";
    }

    function validatePhone(phone) {
        const regex = /^[0-9]{10}$/; // Assuming a 10-digit phone number
        return phone && regex.test(phone) ? "" : "Please enter a valid 10-digit phone number.";
    }

    function validateAddress(address) {
        return address ? "" : "Please enter a valid shipping address.";
    }

    function validateProduct(product) {
        return product.selectedIndex > 0 ? "" : "Please select a product.";
    }

    function validateQuantity(quantity) {
        const qty = parseInt(quantity);
        return qty > 0 ? "" : "Please enter a valid quantity (greater than zero).";
    }

    function validatePaymentType() {
        let selected = document.querySelector('input[name="payment_type"]:checked');
        return selected ? "" : "Please select a payment method.";
    }

    function validateCardNumber(cardNum) {
        const regex = /^[0-9]{16}$/; // Assuming a 16-digit card number
        return cardNum && regex.test(cardNum) ? "" : "Please enter a valid 16-digit card number.";
    }

    function validateOrderDate(orderDate) {
        return orderDate ? "" : "Please select a valid order date.";
    }

    // Display error and update styles
    function showError(field, message) {
        if (field) {
        field.style.borderColor = message ? "red" : "";
        }
        return message;
    }

    function checkOut() {
        myOutput.innerHTML = "";
        let isValid = true;
        let errorString = "";

        errorString += showError(myFirstName, validateName(myFirstName.value)) + "<br>";
        errorString += showError(myLastName, validateName(myLastName.value)) + "<br>";
        errorString += showError(myEmail, validateEmail(myEmail.value)) + "<br>";
        errorString += showError(myPhone, validatePhone(myPhone.value)) + "<br>";
        errorString += showError(myAddress, validateAddress(myAddress.value)) + "<br>";
        errorString += showError(myProduct, validateProduct(myProduct)) + "<br>";
        errorString += showError(myQuantity, validateQuantity(myQuantity.value)) + "<br>";
        errorString += showError(myCardNum, validateCardNumber(myCardNum.value)) + "<br>";
        errorString += showError(myOrderDate, validateOrderDate(myOrderDate.value)) + "<br>";
        errorString += showError(document.querySelector('input[name="payment_type"]:checked'), validatePaymentType()) + "<br>";

        if (errorString.trim()) {
            myOutput.innerHTML = `<h3>Please fix the following errors:</h3>${errorString}`;
            isValid = false;
        }

        if (isValid) {
            myOutput.innerHTML = getReceipt();
        }
    }

    // Real-time validation
    myFirstName.addEventListener("input", () => showError(myFirstName, validateName(myFirstName.value)));
    myLastName.addEventListener("input", () => showError(myLastName, validateName(myLastName.value)));
    myEmail.addEventListener("input", () => showError(myEmail, validateEmail(myEmail.value)));
    myPhone.addEventListener("input", () => showError(myPhone, validatePhone(myPhone.value)));
    myAddress.addEventListener("input", () => showError(myAddress, validateAddress(myAddress.value)));
    myProduct.addEventListener("change", () => showError(myProduct, validateProduct(myProduct)));
    myQuantity.addEventListener("input", () => showError(myQuantity, validateQuantity(myQuantity.value)));
    myCardNum.addEventListener("input", () => showError(myCardNum, validateCardNumber(myCardNum.value)));
    myOrderDate.addEventListener("change", () => showError(myOrderDate, validateOrderDate(myOrderDate.value)));
    myPayTypes.forEach(payType => payType.addEventListener("change", () => showError(payType, validatePaymentType())));

    myButton.onclick = checkOut;
};
