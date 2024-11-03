const bill_total = document.querySelector("#bill-total");
const tip_slider = document.querySelector("#tip");
const tip_percentage = document.querySelector("#tip-percentage");
const tip_amount = document.querySelector("#tip-amount");
const total_amount = document.querySelector("#total");
const currency_select = document.querySelector("#currency");

// Event listeners for input changes
bill_total.addEventListener("change", calculateTip);
tip_slider.addEventListener("input", calculateTip);
currency_select.addEventListener("change", calculateTip);

function calculateTip() {
    // Validate the bill total input
    if (isNaN(bill_total.value) || bill_total.value.trim() === "") {
        alert("ENTER A VALID INPUT NUMBER");
        bill_total.value = ""; // Optionally clear the invalid input
        return;
    }

    // Check if the bill total is a negative number or zero
    if (parseFloat(bill_total.value) <= 0) {
        alert("Bill total must be a positive number.");
        bill_total.value = ""; // Optionally clear the invalid input
        return;
    }

    // Parse and format the bill total value
    let bill = parseFloat(bill_total.value);
    bill_total.value = bill.toFixed(2);

    // Get the tip percentage from the slider
    let tip = parseFloat(tip_slider.value);
    tip_percentage.value = `${tip}%`;

    // Calculate the tip amount in the original currency
    let total_tip = parseFloat(((tip * bill) / 100).toFixed(2));

    // Get the selected currency and its exchange rate
    const selectedCurrency = currency_select.options[currency_select.selectedIndex];
    const conversionRate = parseFloat(selectedCurrency.getAttribute("data-rate"));
    const currencySymbol = selectedCurrency.value.split(" ")[1];

    // Calculate the converted tip and total amounts
    let converted_tip = (total_tip * conversionRate).toFixed(2);
    let converted_total = ((bill + total_tip) * conversionRate).toFixed(2);

    // Display the converted amounts with the appropriate currency symbol
    tip_amount.value = `${currencySymbol} ${converted_tip}`;
    total_amount.value = `${currencySymbol} ${converted_total}`;
}
