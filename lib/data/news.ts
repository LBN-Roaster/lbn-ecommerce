import { defaultLocale, type Locale } from "lib/i18n";
import fs from "fs";
import matter from "gray-matter";
import { marked } from "marked";
import path from "path";

const newsBaseDir = path.join(process.cwd(), "lib/data/news-posts");

export type NewsPost = {
  slug: string;
  title: string;
  date: string;
  tag: string;
  excerpt: string;
  image: string;
  content: string;
};

export type NewsPostMeta = Omit<NewsPost, "content">;

function newsDir(locale: Locale): string {
  const dir = path.join(newsBaseDir, locale);
  if (fs.existsSync(dir)) return dir;
  return path.join(newsBaseDir, defaultLocale);
}

function readPost(slug: string, locale: Locale): NewsPost {
  const filePath = path.join(newsDir(locale), `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title,
    date: data.date,
    tag: data.tag,
    excerpt: data.excerpt,
    image: data.image,
    content: marked(content) as string,
  };
}

export function getAllNewsPosts(locale: Locale = defaultLocale): NewsPostMeta[] {
  const dir = newsDir(locale);
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  return files
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const { data } = matter(fs.readFileSync(path.join(dir, file), "utf-8"));
      return {
        slug,
        title: data.title,
        date: data.date,
        tag: data.tag,
        excerpt: data.excerpt,
        image: data.image,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getNewsPost(
  slug: string,
  locale: Locale = defaultLocale,
): NewsPost {
  return readPost(slug, locale);
}

export function getAllNewsSlugs(locale: Locale = defaultLocale): string[] {
  return fs
    .readdirSync(newsDir(locale))
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}
