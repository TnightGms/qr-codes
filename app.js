const textoQR = document.getElementById('textoQR');
const colorQR = document.getElementById('colorQR');
const colorFondo = document.getElementById('colorFondo');
const btnGenerar = document.getElementById('btnGenerar');
const cajaImagen = document.getElementById('cajaImagen');
const imagenQR = document.getElementById('imagenQR');
const btnDescargar = document.getElementById('btnDescargar');

let urlActual = "";

btnGenerar.addEventListener('click', () => {
    let texto = textoQR.value.trim();
    if (!texto) {
        textoQR.style.boxShadow = "0 0 10px red";
        setTimeout(() => textoQR.style.boxShadow = "inset 0 2px 5px rgba(0,0,0,0.1)", 1000);
        return;
    }

    btnGenerar.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Generando...';

    // Limpiamos los colores (quitamos el # porque la API no lo lee)
    let colorQRLimpio = colorQR.value.substring(1);
    let colorFondoLimpio = colorFondo.value.substring(1);

    // Creamos la URL de la API con los colores
    urlActual = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(texto)}&color=${colorQRLimpio}&bgcolor=${colorFondoLimpio}`;
    
    imagenQR.src = urlActual;

    imagenQR.onload = () => {
        cajaImagen.style.display = "flex";
        btnGenerar.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> Generar Nuevo QR';
    }
});

// Función para descargar la imagen
btnDescargar.addEventListener('click', () => {
    fetch(urlActual)
        .then(response => response.blob())
        .then(blob => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = "QR-tnightgms.png";
            link.click();
        })
        .catch(() => alert("Error al descargar la imagen"));
});
