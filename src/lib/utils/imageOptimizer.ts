/**
 * Optimiza una imagen convirtiéndola a WebP con compresión
 * @param file - Archivo de imagen original
 * @param quality - Calidad de compresión (0-1, default 0.8)
 * @param maxWidth - Ancho máximo en píxeles (default 1920)
 * @returns Promise<Blob> - Imagen optimizada como Blob WebP
 */
export async function optimizeImage(
  file: File,
  quality: number = 0.8,
  maxWidth: number = 1920
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      reject(new Error('No se pudo obtener el contexto del canvas'));
      return;
    }

    img.onload = () => {
      // Calcular dimensiones manteniendo aspect ratio
      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;

      // Dibujar imagen redimensionada
      ctx.drawImage(img, 0, 0, width, height);

      // Convertir a WebP
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('No se pudo convertir la imagen a WebP'));
          }
        },
        'image/webp',
        quality
      );
    };

    img.onerror = () => {
      reject(new Error('Error al cargar la imagen'));
    };

    // Cargar imagen desde el archivo
    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };
    reader.onerror = () => {
      reject(new Error('Error al leer el archivo'));
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Crea una URL de preview local para un archivo (antes de subirlo)
 * @param file - Archivo de imagen
 * @returns string - URL local para preview
 */
export function createPreviewUrl(file: File): string {
  return URL.createObjectURL(file);
}

/**
 * Limpia URLs de preview para liberar memoria
 * @param url - URL a limpiar
 */
export function revokePreviewUrl(url: string): void {
  URL.revokeObjectURL(url);
}
