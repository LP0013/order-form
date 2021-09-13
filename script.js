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