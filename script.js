var btns = document.querySelectorAll(".continue-btn");
const slides = ["shipping", "billing", "payment", "tnxMessage"];

btns.forEach(function (btn) {
    btn.addEventListener("click", continueHandler);
});

function continueHandler() {
    const active = document.querySelector(".slide:not(.hidden)");

    var input = active.querySelectorAll(".req-input");

    for (let i = 0; i < input.length; i++) {
        if (input[i].value === "") {
            input[i].classList.add("input-notif");
        }
    }
    var error = document.querySelector(".input-notif");
    if (error === null) {
        showNextSlide();
    } else {
        var tooltip = error.closest(".input-tooltip");
        tooltip.querySelector(".tooltip").classList.remove("tooltip-hidden");
        tooltip.querySelector(".tooltip-square").classList.remove("tooltip-hidden")
    }

}

function showNextSlide() {
    const active = document.querySelector(".slide:not(.hidden)");
    const slideName = active.dataset.slide;
    const nextSlideName = slides[slides.indexOf(slideName) + 1];
    const nextSlide = document.querySelector("." + nextSlideName);
    nextSlide.classList.remove("hidden");
    active.classList.add("hidden");
}

var sameAs = document.querySelector(".slide-title-btn");

sameAs.addEventListener("click", a);

function a() {
    var billingInputs = document.querySelectorAll("[data-paste]");

    billingInputs.forEach(function (input) {
        var pasteWord = input.dataset.paste;
        var shippingInput = document.querySelector("[data-copy='" + pasteWord + "']");
        if (shippingInput) {
            input.value = shippingInput.value;
        }
    })


}


var loc = document.querySelector(".locationIcon");
loc.addEventListener("click", getLocation);

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
}

function showPosition(position) {
    var xml = new XMLHttpRequest();
    xml.open("get", `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=8e318e690e8343a4b85380909e7186d5&language=en`, true);
    xml.send();
    xml.onload = function () {
        if (xml.readyState === 4 && xml.status === 200) {
            var res = JSON.parse(xml.response)
            var city = document.querySelector("[name = shippingCity]");
            city.value = res.results[0].components.city;
        }
    }
}

window.onload = function () {
    var xml = new XMLHttpRequest();
    xml.open("get", 'countries.json', true);
    xml.onload = function () {
        if (xml.readyState === 4 && xml.status === 200) {
            var sel = document.querySelectorAll("[name = shippingCountry], [name = billingCountry]")
            var res = JSON.parse(xml.response);
            for (var key in res) {
                var country = res[key];
                var option = document.createElement("option");
                option.value = country;
                option.textContent = country;
                sel[0].append(option);
            }
            sel[1].innerHTML = sel[0].innerHTML;
        }
    };
    xml.send();
};