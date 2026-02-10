export interface UploadImageOptions {
  folder?: string;
  fileName?: string;
  quality?: number;
}

export interface UploadImageResult {
  url: string;
  fileName: string;
  path: string;
}

export async function uploadAndOptimizeImage(
  file: File,
  options: UploadImageOptions = {}
): Promise<UploadImageResult> {
  const { folder = "images", fileName, quality = 80 } = options;

  try {
    const formData = new FormData();
    formData.append("image", file);

    const url = new URL(
      "/api/images",
      typeof window !== "undefined" ? window.location.origin : ""
    );
    if (folder) url.searchParams.set("folder", folder);
    if (quality) url.searchParams.set("quality", quality.toString());
    if (fileName) url.searchParams.set("fileName", fileName);

    const response = await fetch(url.toString(), {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ error: "Error desconocido" }));
      throw new Error(
        errorData.error || `Error ${response.status}: ${response.statusText}`
      );
    }

    const result = await response.json();

    if (!result.success || !result.data) {
      throw new Error(result.error || "Error al procesar la imagen");
    }

    return result.data;
  } catch (error) {
    console.error("[uploadAndOptimizeImage] Error:", error);
    throw new Error(
      `Error al optimizar y subir imagen: ${error instanceof Error ? error.message : "Error desconocido"}`
    );
  }
}
