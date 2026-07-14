import { writeFile, mkdir } from "fs/promises";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "images", "uploads");

export async function saveUploadedImage(file: File): Promise<string> {
  await mkdir(UPLOAD_DIR, { recursive: true });

  const extension = path.extname(file.name) || ".jpg";
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${extension}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  await writeFile(path.join(UPLOAD_DIR, filename), buffer);

  return `/images/uploads/${filename}`;
}
