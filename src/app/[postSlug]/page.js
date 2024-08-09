import React from "react";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import BlogHero from "@/components/BlogHero";
import { loadBlogPost } from "@/helpers/file-helpers";
import COMPONENT_MAP from "@/helpers/mdx-components";

import styles from "./postSlug.module.css";

export async function generateMetadata({ params }) {
  const blogPostData = await loadBlogPost(params.postSlug);

  if (!blogPostData) {
    return null;
  }

  const { title, abstract } = blogPostData.frontmatter;

  return {
    title,
    description: abstract,
  };
}

async function BlogPost({ params }) {
  const blogPostData = await loadBlogPost(params.postSlug);

  if (!blogPostData) {
    notFound();
  }

  const { title, publishedOn } = blogPostData.frontmatter;

  return (
    <article className={styles.wrapper}>
      <BlogHero title={title} publishedOn={publishedOn} />
      <div className={styles.page}>
        <MDXRemote source={blogPostData.content} components={COMPONENT_MAP} />
      </div>
    </article>
  );
}

export default BlogPost;
