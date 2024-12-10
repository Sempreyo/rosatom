document.addEventListener("DOMContentLoaded", () => {
	const newsCarousel = document.querySelectorAll(".news__slider");

	if (newsCarousel.length > 0) {
		newsCarousel.forEach(elem => {
			const newsCarouselNext = elem.previousElementSibling.querySelector(".news__navigation .swiper-btn-next");
			const newsCarouselPrev = elem.previousElementSibling.querySelector(".news__navigation .swiper-btn-prev");

			const slider = new Swiper(elem, {
				slidesPerView: 1,
				spaceBetween: 10,
				navigation: {
					nextEl: newsCarouselNext,
					prevEl: newsCarouselPrev,
				},
				breakpoints: {
					576: {
						slidesPerView: 2
					},
					768: {
						slidesPerView: 3,
						spaceBetween: 20
					},
					992: {
						slidesPerView: 4,
						spaceBetween: 26
					},
				}
			});
		});
	}
});
