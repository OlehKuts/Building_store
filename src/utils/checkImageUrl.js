export const checkImage = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true); // Image loaded successfully
    img.onerror = () => resolve(false); // URL is broken or not an image
    img.src = url;
  });
}