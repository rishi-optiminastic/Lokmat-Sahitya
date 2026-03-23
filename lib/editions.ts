import fs from "node:fs";
import path from "node:path";
import { sahityaAsset } from "./sahitya-assets";

const BASE = path.join(process.cwd(), "public", "sahitya-assets");

export type EditionImage = { src: string; title: string };

export type EditionBook = { src: string; title: string };

/**
 * One awardee: optional portrait (`photo.jpg`) + optional book cover(s) from `book/`.
 * `photoSrc` is empty when the folder only has book images (no separate portrait).
 */
export type EditionAwardee = {
  author: string;
  /** Author portrait URL, or "" when only book assets exist in the folder. */
  photoSrc: string;
  books: EditionBook[];
};

function normalizeName(value: string): string {
  return value
    .toLowerCase()
    .replace(/\.[^.]+$/, "")
    .replace(/[_-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function humanizeFilenameTitle(filename: string): string {
  return filename.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
}

/** Title from awardee folder names like `Prasad_Nikte` or `Dr_Milind_Kulkarni`. */
function folderNameToTitle(folder: string): string {
  return folder.replace(/_/g, " ");
}

/** Resolve `book` / `books` folder (any common casing). */
function resolveBookDir(entPath: string): string | null {
  for (const name of ["book", "Book", "BOOK", "books", "Books", "BOOKS"] as const) {
    const p = path.join(entPath, name);
    try {
      if (fs.existsSync(p) && fs.statSync(p).isDirectory()) return p;
    } catch {
      /* ignore */
    }
  }
  try {
    for (const ent of fs.readdirSync(entPath, { withFileTypes: true })) {
      if (!ent.isDirectory()) continue;
      const lower = ent.name.toLowerCase();
      if (lower === "book" || lower === "books") {
        return path.join(entPath, ent.name);
      }
    }
  } catch {
    /* ignore */
  }
  return null;
}

function listImages(subdir: string): EditionImage[] {
  const full = path.join(BASE, subdir);
  if (!fs.existsSync(full)) return [];

  const results: EditionImage[] = [];

  for (const ent of fs.readdirSync(full, { withFileTypes: true })) {
    if (ent.name.startsWith(".") || ent.name === "Thumbs.db") continue;

    const entPath = path.join(full, ent.name);

    if (
      ent.isFile() &&
      /\.(jpe?g|png|webp)$/i.test(ent.name)
    ) {
      results.push({
        src: sahityaAsset(subdir, ent.name),
        title: humanizeFilenameTitle(ent.name),
      });
      continue;
    }

    if (ent.isDirectory()) {
      const photoNames = [
        "photo.jpg",
        "photo.jpeg",
        "photo.JPG",
        "photo.JPEG",
      ] as const;
      for (const photoName of photoNames) {
        const photoPath = path.join(entPath, photoName);
        if (fs.existsSync(photoPath)) {
          results.push({
            src: sahityaAsset(subdir, ent.name, photoName),
            title: folderNameToTitle(ent.name),
          });
          break;
        }
      }
    }
  }

  return results.sort((a, b) =>
    a.title.localeCompare(b.title, undefined, { sensitivity: "base" }),
  );
}

export function getAwardeesByYear(year: number) {
  return listImages(`${year} Awardees and Books`);
}

/**
 * Structured awardees for edition pages: folder layout yields author + book covers;
 * flat files become a single image with no separate book assets.
 */
export function getEditionAwardeesDetailed(year: number): EditionAwardee[] {
  const subdir = `${year} Awardees and Books`;
  const full = path.join(BASE, subdir);
  if (!fs.existsSync(full)) return [];

  const entries = fs.readdirSync(full, { withFileTypes: true });
  const results: EditionAwardee[] = [];
  const authorKeys = new Set<string>();
  const bookTitleKeys = new Set<string>();
  const rootFiles: string[] = [];

  for (const ent of entries) {
    if (ent.name.startsWith(".") || ent.name === "Thumbs.db") continue;
    const entPath = path.join(full, ent.name);

    if (ent.isFile() && /\.(jpe?g|png|webp)$/i.test(ent.name)) {
      rootFiles.push(ent.name);
      continue;
    }

    if (ent.isDirectory()) {
      const photoNames = [
        "photo.jpg",
        "photo.jpeg",
        "photo.JPG",
        "photo.JPEG",
      ] as const;
      let photoName: string | null = null;
      for (const pn of photoNames) {
        if (fs.existsSync(path.join(entPath, pn))) {
          photoName = pn;
          break;
        }
      }

      const author = folderNameToTitle(ent.name);
      const authorKey = normalizeName(author);
      const bookDir = resolveBookDir(entPath);
      const books: EditionBook[] = [];
      if (bookDir) {
        const bookSegment = path.basename(bookDir);
        for (const bf of fs.readdirSync(bookDir)) {
          if (bf.startsWith(".") || bf === "Thumbs.db") continue;
          if (!/\.(jpe?g|png|webp)$/i.test(bf)) continue;
          books.push({
            src: sahityaAsset(subdir, ent.name, bookSegment, bf),
            title: humanizeFilenameTitle(bf),
          });
          bookTitleKeys.add(normalizeName(bf));
        }
        books.sort((a, b) =>
          a.title.localeCompare(b.title, undefined, { sensitivity: "base" }),
        );
      }

      if (!photoName && books.length === 0) continue;

      results.push({
        author,
        photoSrc: photoName
          ? sahityaAsset(subdir, ent.name, photoName)
          : "",
        books,
      });
      authorKeys.add(authorKey);
    }
  }

  // Include root-level image awardees only when they are not duplicates of
  // folder-based authors and not book-cover files mirrored at root.
  for (const fileName of rootFiles) {
    const fileKey = normalizeName(fileName);
    if (authorKeys.has(fileKey) || bookTitleKeys.has(fileKey)) continue;

    results.push({
      author: humanizeFilenameTitle(fileName),
      photoSrc: sahityaAsset(subdir, fileName),
      books: [],
    });
  }

  return results.sort((a, b) =>
    a.author.localeCompare(b.author, undefined, { sensitivity: "base" }),
  );
}

export function getJuryByYear(year: number) {
  return listImages(`${year} jury`);
}

export function getPhotoFeature() {
  return listImages("photo feature");
}
