(() => {
	const transition = document.querySelector('.page-transition');
	if (!transition) return;

	const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	const navigationDelay = reducedMotion ? 50 : 1500;

	window.addEventListener('load', () => {
		transition.classList.remove('page-transition--active');
	}, { once: true });

	document.addEventListener('click', (event) => {
		const link = event.target.closest('a[href]');
		if (!link || event.defaultPrevented || event.button !== 0) return;
		if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
		if (link.target && link.target !== '_self') return;
		if (link.hasAttribute('download')) return;

		const destination = new URL(link.href, window.location.href);
		if (destination.origin !== window.location.origin) return;
		if (destination.pathname === window.location.pathname) return;

		event.preventDefault();
		transition.classList.add('page-transition--active');
		window.setTimeout(() => {
			window.location.assign(destination.href);
		}, navigationDelay);
	});
})();
