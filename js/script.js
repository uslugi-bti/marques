document.addEventListener("DOMContentLoaded", function () {
    function testWebP(callback) {
        var webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2);
        };
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
    testWebP(function (support) {
        if (support == true) {
            document.querySelector('body').classList.add('webp');
        } else {
            document.querySelector('body').classList.add('no-webp');
        }
    });

    const body = document.querySelector("body");
    const header = document.querySelector(".header");
    const headerList = document.querySelector(".header__list");
    const headerMenu = document.querySelector(".header__menu");

    function colorHeader() {
        if (window.scrollY > 80) {
            header.classList.add("active");
        } else {
            header.classList.remove("active");
        }
    }
    colorHeader();
    window.addEventListener("resize", colorHeader);
    window.addEventListener("scroll", colorHeader);

    function hideHeaderMenu() {
        if (headerList.scrollTop > 10) {
            headerMenu.classList.add("hide");
        } else {
            headerMenu.classList.remove("hide");
        }
    }
    hideHeaderMenu();
    headerList.addEventListener("scroll", hideHeaderMenu);
    window.addEventListener("resize", hideHeaderMenu);

    headerMenu.addEventListener("click", function () {
        body.classList.toggle("header-lock");
        headerList.classList.toggle("active");
        headerMenu.classList.toggle("active");
    });

    const galleryItems = document.querySelectorAll(".gallery__item");
    const galleryPopup = document.querySelector(".popup-gallery");
    const galleryPopupClose = document.querySelector(".popup-gallery__body span#close");
    const galleryPopupImg = document.querySelector(".popup-gallery__img");
    const galleryPopupPrev = document.querySelector(".popup-gallery__body span#prev");
    const galleryPopupNext = document.querySelector(".popup-gallery__body span#next");

    let currentIndex = 0;

    function showImage(index) {
        const img = galleryItems[index].querySelector("img");
        const imgSource = galleryItems[index].querySelector("source");

        galleryPopupImg.querySelector("img").src = img.src;
    }

    for (let i = 0; i < galleryItems.length; i++) {
        galleryItems[i].addEventListener("click", function () {
            currentIndex = i;
            body.classList.add("lock");
            galleryPopup.classList.add("open");
            showImage(currentIndex);
        });
    }

    galleryPopupClose.addEventListener("click", function () {
        body.classList.remove("lock");
        galleryPopup.classList.remove("open");
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            body.classList.remove("lock");
            galleryPopup.classList.remove("open");
        } else if (event.key === "ArrowRight") {
            currentIndex = (currentIndex + 1) % galleryItems.length;
            showImage(currentIndex);
        } else if (event.key === "ArrowLeft") {
            currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            showImage(currentIndex);
        }
    });

    galleryPopupNext.addEventListener("click", function () {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        showImage(currentIndex);
    });

    galleryPopupPrev.addEventListener("click", function () {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        showImage(currentIndex);
    });

    const technicalItem = document.querySelectorAll(".technical__item");
    const technicalItemHead = document.querySelectorAll(".technical-item__head");

    for (let i = 0; i < technicalItem.length; i++) {
        technicalItemHead[i].addEventListener("click", function () {
            if (technicalItem[i].classList.contains("active")) {
                technicalItem[i].classList.remove("active");
            } else {
                for (let j = 0; j < technicalItem.length; j++) {
                    technicalItem[j].classList.remove("active");
                }
                technicalItem[i].classList.add("active");
            }
        });
    }

    const input = document.querySelector("#number");
    const iti = window.intlTelInput(input, {
        initialCountry: "es",
        separateDialCode: true,
        utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@25.3.1/build/js/utils.js"
    });

    function resizeWidth() {
        const width = document.querySelector(".iti").clientWidth;
        if (document.querySelector(".iti__dropdown-content")) {
            document.querySelector(".iti__dropdown-content").style.width = width + "px";
        }
    }

    resizeWidth();
    window.addEventListener("resize", resizeWidth);

    const feedbacksSwiper = new Swiper('.feedbacks__slider', {
        slidesPerView: 1,
        spaceBetween: 20,
        autoHeight: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            }
        }
    });

});