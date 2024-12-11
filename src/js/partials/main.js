document.addEventListener("DOMContentLoaded", () => {
	/* Карусель с автопроигрыванием */
	const slides = document.querySelectorAll(".carousel__slide");
	const slidesContent = document.querySelectorAll(".carousel__content-item");
	const clearStateClasses = (el) => {
		el.classList.remove("active", "next", "last");
	};

	slides.forEach((slide, index) => {
		slide.addEventListener("click", (e) => {
			slidesContent.forEach(el => el.classList.remove("active"));
			e.currentTarget.style.transform = "translate3d(80px, -80px, 0)";
			e.currentTarget.style.zIndex = "1";
			e.currentTarget.classList.remove("active");

			/* Поменять рубашки у карточек */
			e.currentTarget.classList.add("last");

			if (slides[index + 1]) {
				clearStateClasses(slides[index + 1]);
				slides[index + 1].classList.add("active");
				slides[index + 1].style.transform = "translate3d(0, 0, 0)";
				slides[index + 1].style.zIndex = "3";
				slidesContent[index + 1].classList.add("active");
			} else {
				clearStateClasses(slides[0]);
				slides[0].classList.add("active");
				slides[0].style.transform = "translate3d(0, 0, 0)";
				slides[0].style.zIndex = "3";
				slidesContent[0].classList.add("active");
			}

			const activeSlide = document.querySelector(".carousel__slide.active");

			if (activeSlide.nextElementSibling) {
				clearStateClasses(activeSlide.nextElementSibling);
				activeSlide.nextElementSibling.classList.add("next");
				activeSlide.nextElementSibling.style.transform = "translate3d(40px, -40px, 0)";
				activeSlide.nextElementSibling.style.zIndex = "2";
			} else {
				clearStateClasses(slides[0]);
				slides[0].classList.add("next");
				slides[0].style.transform = "translate3d(40px, -40px, 0)";
				slides[0].style.zIndex = "2";
			}
		});
	});

	/* Якори */
	const anchors = document.querySelectorAll('.anchor');

	if (anchors && anchors.length > 0) {
		anchors.forEach(anchor => {
			anchor.addEventListener('click', function (e) {
				//e.preventDefault();

				if (window.location.hash) {
					document.querySelector(window.location.hash).scrollIntoView({
						behavior: 'smooth'
					});
				}
			});
		});
	}

	/* Анимация главного заголовка и картинки */
	const hero = document.querySelector(".hero");
	const heroTitle = document.querySelector(".hero__title--main");

	/* Разделить строку на символы */
	if (heroTitle) {
		const splitText = new SplitType(".hero__title", {
			types: "chars"
		});
	}

	if (hero) {
		const chars = hero.querySelectorAll(".hero__title .char");
		const heroBg = hero.querySelector(".hero__bg");

		/* Анимация появления символов */
		const heroObserver = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					if (chars) {
						chars.forEach((el, index) => {
							setTimeout(() => {
								el.style.transform = 'translateY(0)';
							}, 50 * index);
						});
					}

					heroBg.classList.add("show");
				} else {
					if (chars) {
						chars.forEach((el, index) => {
							setTimeout(() => {
								el.style.transform = 'translateY(calc(100% + 30px))';
							}, 50 * index);
						});
					}

					heroBg.classList.remove("show");
				}
			});
		});

		heroObserver.observe(hero);
	}

	/* Анимация прорисовки картинки */
	const simpleVerticalBlock = document.querySelector(".simple--vertical");

	if (simpleVerticalBlock) {
		const simpleVerticalBlockBg = simpleVerticalBlock.querySelector(".simple__bg");

		/* Анимация появления символов */
		const heroObserver = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					simpleVerticalBlockBg.classList.add("show");
				} else {
					simpleVerticalBlockBg.classList.remove("show");
				}
			});
		});

		heroObserver.observe(simpleVerticalBlock);
	}

	const simpleHorizontalBlock = document.querySelector(".simple--horizontal");

	if (simpleHorizontalBlock) {
		const simpleHorizontalBlockBg = simpleHorizontalBlock.querySelector(".simple__bg");

		/* Анимация появления символов */
		const heroObserver = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					simpleHorizontalBlockBg.classList.add("show");
				} else {
					simpleHorizontalBlockBg.classList.remove("show");
				}
			});
		});

		heroObserver.observe(simpleHorizontalBlock);
	}

	/* Количество символов после запятой */
	const getNumberLengthAfterComma = x => (x.toString().includes(',') ? x.toString().split('.').pop().length : 0);

	const getNumbers = () => {
		const odometerElems = document.querySelectorAll('.odometer-value');
		const regex = /[0-9]*[.,]?[0-9]+/g;
		let nums = [];

		odometerElems.forEach(el => {
			nums.push(el.innerHTML.trim().match(regex));
		});

		return nums.flat(1);
	};

	const odometerElems = document.querySelectorAll(".odometer-value");
	let od = [];
	const numbers = getNumbers();

	const initOdometer = () => {
		odometerElems.forEach((el, i) => {
			const odometerNumber = numbers[i];
			let iterator = getNumberLengthAfterComma(odometerNumber);
			let digitsLength = '';
			for (let i = 0; i < iterator; i++) {
				digitsLength += 'd';
			}

			od[i] = new Odometer({
				el: el,
				format: getNumberLengthAfterComma(odometerNumber) === 0 ? 'd' : `(ddd),${digitsLength}`,
				theme: 'default',
				value: odometerNumber.replace(/[0-9]*[.,]?[0-9]+/, '0')
			});

			od[i].update(odometerNumber);
		});
	}

	/* Анимация наполнения счетчиков */
	const sectionStatistics = document.querySelector(".counter");
	if (sectionStatistics) {
		const counterItems = sectionStatistics.querySelectorAll(".counter__item-top p");

		const sectionObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						counterItems.forEach(el => {
							el.style.transform = 'translateY(0)';
						});

						initOdometer();
					} else {
						counterItems.forEach(el => {
							el.style.transform = 'translateY(80px)';
						});

						odometerElems.forEach((el, i) => {
							od[i].update(0);
						});
					}
				})
			}
		);

		sectionObserver.observe(sectionStatistics);

		initOdometer();
	}

	/* Анимация наполнения счетчиков */
	const circle = document.querySelector(".circle");
	if (circle) {
		const circleItems = circle.querySelectorAll(".circle__item");

		const sectionObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						circleItems.forEach((el, i) => {
							setTimeout(() => {
								el.classList.remove("hidden");
							}, 250 * i);
						});
					} else {
						circleItems.forEach(el => {
							el.classList.add("hidden");
						});
					}
				})
			}
		);

		sectionObserver.observe(circle);
	}

	/* Скролл к началу */
	const buttonUp = document.querySelector(".footer__up");

	const initButtonUp = () => {
		if (buttonUp) {
			window.addEventListener("scroll", buttonUpHandler);

			buttonUp.addEventListener("click", () => {
				document.querySelector("body").scrollIntoView({
					behavior: 'smooth'
				});
			});
		}
	}

	const buttonUpHandler = () => {
		scroll = window.pageYOffset;

		if (scroll > 300) {
			buttonUp.classList.add("footer__up--visible");
		} else {
			buttonUp.classList.remove("footer__up--visible");
		}
	}

	initButtonUp();
});
