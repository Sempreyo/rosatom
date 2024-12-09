document.addEventListener("DOMContentLoaded", () => {
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

	/*const hero = document.querySelector(".hero");
	if (hero) {
		/!* Разделить строку на символы *!/
		const splitText = new SplitType(".hero__title", {
			types: "chars"
		});

		/!* Анимация появления символов *!/
		const heroObserver = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const chars = document.querySelectorAll(".hero__title .char");

					chars.forEach((el, index) => {
						setTimeout(() => {
							el.style.transform = 'translateY(0)';
						}, 50 * index);
					});
				}
			});
		});

		heroObserver.observe(hero);
	}*/

	/* Скролл к началу */
	const buttonUp = document.querySelector(".button-up");

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
			buttonUp.classList.add("button-up--visible");
		} else {
			buttonUp.classList.remove("button-up--visible");
		}
	}

	initButtonUp();
});
