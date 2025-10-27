/**
 * Process an image file by resizing and converting to WebP format
 * @param {File} file - The image file to process
 * @param {number} maxWidth - Maximum width for the image (default: 800px)
 * @returns {Promise<File>} A promise that resolves with the processed image file
 */
export const processImage = async (file, maxWidth = 800) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                // Calculate new dimensions
                let width = img.width;
                let height = img.height;
                if (width > maxWidth) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                }

                // Create canvas
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                // Convert to WebP
                canvas.toBlob((blob) => {
                    if (blob) {
                        // Create a new File object with .webp extension
                        const processedFile = new File(
                            [blob],
                            file.name.replace(/\.[^/.]+$/, '') + '.webp',
                            { type: 'image/webp' }
                        );
                        resolve(processedFile);
                    } else {
                        reject(new Error('Failed to convert image'));
                    }
                }, 'image/webp', 0.8); // 0.8 is the quality parameter (80%)
            };
            img.onerror = reject;
        };
        reader.onerror = reject;
    });
};