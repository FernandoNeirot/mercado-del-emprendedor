import { getAdminStorage } from '@/shared/configs/firebase-admin';
import sharp from 'sharp';

export interface OptimizeAndUploadOptions {
  folder: string;
  fileName?: string;
  /** Si no se pasa fileName, se usa para generar el nombre (ej. nombre del archivo subido). */
  originalFileName?: string;
  quality?: number;
}

export interface OptimizeAndUploadResult {
  url: string;
  fileName: string;
  path: string;
}

function generateFileName(originalName?: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 9);
  const extension = 'webp';

  if (originalName) {
    const nameWithoutExt = originalName.replace(/\.[^/.]+$/, '');
    return `${nameWithoutExt}-${timestamp}-${random}.${extension}`;
  }

  return `image-${timestamp}-${random}.${extension}`;
}

/**
 * Optimiza una imagen (convierte a WebP) y la sube a Firebase Storage.
 * Solo para uso en servidor (API routes, server actions).
 */
export async function optimizeAndUploadImage(
  imageBuffer: Buffer,
  options: OptimizeAndUploadOptions
): Promise<OptimizeAndUploadResult> {
  const { folder, fileName: optionFileName, originalFileName, quality = 80 } = options;

  if (quality < 0 || quality > 100) {
    throw new Error('La calidad debe estar entre 0 y 100');
  }

  const webpBuffer = await sharp(imageBuffer)
    .webp({ quality })
    .toBuffer();

  const finalFileName = optionFileName ?? generateFileName(originalFileName);
  const adminStorage = getAdminStorage();
  const bucket = adminStorage.bucket();
  const fileRef = bucket.file(`${folder}/${finalFileName}`);

  await fileRef.save(webpBuffer, {
    contentType: 'image/webp',
    metadata: {
      cacheControl: 'public, max-age=31536000',
    },
  });

  await fileRef.makePublic();
  const url = `https://storage.googleapis.com/${bucket.name}/${folder}/${finalFileName}`;

  return {
    url,
    fileName: finalFileName,
    path: `${folder}/${finalFileName}`,
  };
}
