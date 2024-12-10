document.addEventListener("DOMContentLoaded", () => {
	const newsCarousel = document.querySelectorAll(".news__slider");

	if (newsCarousel.length > 0) {
		newsCarousel.forEach(elem => {
			const newsCarouselNext = elem.previousElementSibling.querySelector(".news__navigation .swiper-btn-next");
			const newsCarouselPrev = elem.previousElementSibling.querySelector(".news__navigation .swiper-btn-prev");

			const slider = new Swiper(elem, {
				slidesPerView: 4,
				spaceBetween: 26,
				navigation: {
					nextEl: newsCarouselNext,
					prevEl: newsCarouselPrev,
				}
			});
		});
	}
});
