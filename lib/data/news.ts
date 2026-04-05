import fs from "fs";
import matter from "gray-matter";
import { marked } from "marked";
import path from "path";

const newsDir = path.join(process.cwd(), "lib/data/news-posts");

export type NewsPost = {
  slug: string;
  title: string;
  date: string;
  tag: string;
  excerpt: string;
  image: string;
  content: string; // rendered HTML
};

export type NewsPostMeta = Omit<NewsPost, "content">;

function readPost(slug: string): NewsPost {
  const filePath = path.join(newsDir, `${slug}.md`);
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

export function getAllNewsPosts(): NewsPostMeta[] {
  const files = fs.readdirSync(newsDir).filter((f) => f.endsWith(".md"));
  return files
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const { data } = matter(
        fs.readFileSync(path.join(newsDir, file), "utf-8"),
      );
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

export function getNewsPost(slug: string): NewsPost {
  return readPost(slug);
}

export function getAllNewsSlugs(): string[] {
  return fs
    .readdirSync(newsDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}
