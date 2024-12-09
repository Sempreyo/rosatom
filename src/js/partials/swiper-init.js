document.addEventListener("DOMContentLoaded", () => {
	const solutionsCarousel = document.querySelectorAll(".solutions__slider");

	if (solutionsCarousel.length > 0) {
		solutionsCarousel.forEach(elem => {
			const solutionsCarouselNext = elem.nextElementSibling.querySelector(".swiper-btn-next");
			const solutionsCarouselPrev = elem.nextElementSibling.querySelector(".swiper-btn-prev");

			const slider = new Swiper(elem, {
				slidesPerView: 1,
				spaceBetween: 10,
				loop: true,
				autoHeight: true,
				navigation: {
					nextEl: solutionsCarouselNext,
					prevEl: solutionsCarouselPrev,
				},
				pagination: {
					el: ".solutions__pagination",
					bulletActiveClass: "swiper-pagination__bullet--active",
					clickable: true,
					renderBullet: function (index, className) {
						let bulletTpl = "";

						switch (index) {
							case 0:
								bulletTpl = `<span class="swiper-pagination__bullet ${className}"><svg><use xlink:href="./images/sprite.svg#solutions1"></use></svg></span>`;
								break;
							case 1:
								bulletTpl = `<span class="swiper-pagination__bullet ${className}"><svg><use xlink:href="./images/sprite.svg#solutions2"></use></svg></span>`;
								break;
							case 2:
								bulletTpl = `<span class="swiper-pagination__bullet ${className}"><svg><use xlink:href="./images/sprite.svg#solutions3"></use></svg></span>`;
								break;
							case 3:
								bulletTpl = `<span class="swiper-pagination__bullet ${className}"><svg><use xlink:href="./images/sprite.svg#solutions4"></use></svg></span>`;
								break;
							case 4:
								bulletTpl = `<span class="swiper-pagination__bullet ${className}"><svg><use xlink:href="./images/sprite.svg#solutions5"></use></svg></span>`;
								break;
						}
						return bulletTpl;
					}
				}
			});
		});
	}
});
