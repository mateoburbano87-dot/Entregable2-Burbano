// Carrusel de marcas: controla el desplazamiento de logos con botones y resize
//

const track = document.getElementById("brandsTrack");
const prev = document.getElementById("brandsPrev");
const next = document.getElementById("brandsNext");

if (track && prev && next) {
	let index = 0;
	const step = 1;

	// Actualiza la posición del carrusel según el tamaño real de los elementos
	function updateCarousel() {
		if (track.children.length === 0) return;

		// Obtenemos dimensiones reales del primer elemento y el gap del contenedor
		const firstItem = track.children[0];
		const itemStyle = window.getComputedStyle(track);
		const gap = parseFloat(itemStyle.gap) || 0;
		const itemRealWidth = firstItem.offsetWidth + gap;

		const total = track.children.length;
		const width = track.clientWidth;
		
		// Calculamos cuántos elementos caben considerando su ancho real
		const visible = Math.floor(width / itemRealWidth);
		const maxIndex = Math.max(0, total - visible);

		if (index > maxIndex) {
			index = 0;
		}

		// Desplazamos usando el ancho real (item + gap)
		track.scrollTo({ left: index * itemRealWidth, behavior: "smooth" });
	}

	next.addEventListener("click", () => {
		index += step;
		updateCarousel();
	});

	prev.addEventListener("click", () => {
		index -= step;
		if (index < 0) {
			index = 0;
		}
		updateCarousel();
	});

	window.addEventListener("resize", updateCarousel);
}


