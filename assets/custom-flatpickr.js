document.addEventListener("DOMContentLoaded", function () {
  // select pickup input field
  const pickupInput = document.getElementById("pickup");
  // select pickup div
  const pickupDateDiv = document.getElementById("pickupDate");
  // select dropoff div
  const dropoffDateDiv = document.getElementById("dropoffDate");
  // Function to format date to "Y-m-d H:i"
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  // Retrieve the current variant title from local storage
  setTimeout(() => {
    window.currentVariantTitle = localStorage.getItem("val");
  }, 1000);

  // Event listeners for option selector buttons
  document
    .querySelectorAll(".option-selector__btns .opt-btn")
    .forEach((item) => {
      item.addEventListener("click", (e) => {
        window.selectedPart = e.target.value;
      });
    });

  // Function to get the days to add based on the selected variant
  const getDaysToAdd = () => {
    const selectedVariantTitle =
      window.selectedPart || window.currentVariantTitle;
    switch (selectedVariantTitle) {
      case "1 Day Rent":
        return 1;
      case "2 Day Rent":
        return 2;
      case "3 Day Rent":
        return 3;
      case "4 Day Rent":
        return 4;
      case "5 Day Rent":
        return 5;
      case "6 Day Rent":
        return 6;
      case "Weekly Rent":
        return 7;
      default:
        console.error("Invalid variant title");
        return 0;
    }
  };

  // Set the current time and date by default on load
  const nowDate = new Date();
  const returnNowDate = formatDate(nowDate);
  document.querySelector("#pickupDate span").textContent = formatDate(
    new Date()
  );
  const daysToAdd = getDaysToAdd();
  const dropoffDate = new Date(nowDate.getTime() + 1 * 24 * 60 * 60 * 1000);
  const returndropoffDate = formatDate(dropoffDate);
  document.querySelector("#dropoffDate span").textContent = returndropoffDate;
  const returnDateInput = document.querySelector(
    'input[name="properties[Dropoff]"]'
  );
  const deliveryDateInput = document.querySelector(
    'input[name="properties[Pickup]"]'
  );
  deliveryDateInput.removeAttribute("disabled");
  deliveryDateInput.value = returnNowDate;
  returnDateInput.removeAttribute("disabled");
  returnDateInput.value = returndropoffDate;

  // Initialize Flatpickr for pickup
  const pickupPicker = flatpickr(pickupInput, {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
    defaultDate: new Date(),
    minDate: "today",
    time_24hr: true,
    disableMobile: true,
    onChange: (selectedDates, dateStr) => {
      document.querySelector("#pickupDate span").textContent = dateStr;

      // Get the days to add based on the selected part
      const daysToAdd = getDaysToAdd();
      const dropoffDate = new Date(
        selectedDates[0].getTime() + daysToAdd * 24 * 60 * 60 * 1000
      );
      document.querySelector("#dropoffDate span").textContent =
        formatDate(dropoffDate);
    },
  });

  // Event listener to open the pickup picker when the corresponding div is clicked
  pickupDateDiv.addEventListener("click", () => {
    pickupPicker.open();
    const flatpickrcalendar = document.querySelector(".flatpickr-calendar");
    // Remove the "open" class and any inline styles
    if (flatpickrcalendar) {
      flatpickrcalendar.classList.remove("open");
      flatpickrcalendar.removeAttribute("style");
      // console.log("Flatpickr calendar element found.");
      // Add the "open" class after a delay
      setTimeout(() => {
        flatpickrcalendar.classList.add("open");
      }, 1000);
    } else {
      console.error("Flatpickr calendar element not found.");
    }
  });

  // Add event listener to pickup date input to update return date
  pickupInput.addEventListener("change", function () {
    const pickupDateValue = this.value;
    if (pickupDateValue.trim() && !isNaN(Date.parse(pickupDateValue))) {
      const daysToAdd = getDaysToAdd();
      const returnDate = new Date(Date.parse(pickupDateValue));
      returnDate.setDate(returnDate.getDate() + daysToAdd);
      const returnDateFormatted = formatDate(returnDate);
      document.getElementById("returnedDate").innerText = returnDateFormatted;

      const returnDateInput = document.querySelector(
        'input[name="properties[Dropoff]"]'
      );
      const deliveryDateInput = document.querySelector(
        'input[name="properties[Pickup]"]'
      );
      returnDateInput.removeAttribute("disabled");
      returnDateInput.value = returnDateFormatted;
      deliveryDateInput.removeAttribute("disabled");
      deliveryDateInput.value = pickupDateValue;

      // Enable Add to Cart button
      const mySelectedDate = document.querySelector("#selectedDate").innerText;
      const myDropDate = document.querySelector(
        "#dropoffDate #returnedDate"
      ).innerText;
      const addToCartBtn = document.querySelector(
        ".product-form__submit button[type=submit]"
      );
      if (
        mySelectedDate != "Select Date & Time" &&
        myDropDate != "Dropoff Date & Time"
      ) {
        setTimeout(() => {
          addToCartBtn.disabled = false;
          // console.log("Add to Cart button enabled");
        }, 500);
      }
    } else {
      console.error("Invalid start date");
    }
  });
});
