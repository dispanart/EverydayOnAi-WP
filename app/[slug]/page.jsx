import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, User, ArrowLeft, Tag } from 'lucide-react';
import { SITE } from '@/config/site';
import {
  getPostBySlug,
  getAllPostSlugs,
  getDisplayDate,
  formatDisplayDate,
  stripHtml,
} from '@/lib/wordpress';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ReadingProgressBar } from '@/components/article/ReadingProgressBar';
import ShareBar from '@/components/article/ShareBar';

export const revalidate = 60;

// Pre-generate known post pages at build time
export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

// Dynamic metadata for SEO
export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: 'Not Found' };

  const description = stripHtml(post.excerpt).slice(0, 160);
  const img = post.featuredImage?.node?.sourceUrl;

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.modifiedGmt,
      authors: post.author?.node?.name ? [post.author.node.name] : [],
      images: img ? [{ url: img, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: img ? [img] : [],
    },
    alternates: {
      canonical: `${SITE.url}/${params.slug}`,
    },
  };
}

// Estimated reading time (avg 200 words/min)
function readingTime(content) {
  const words = content?.replace(/<[^>]*>/g, '').split(/\s+/).length ?? 0;
  return Math.max(1, Math.ceil(words / 200));
}

export default async function PostPage({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const { date: displayDate, isUpdated } = getDisplayDate(post);
  const dateStr = formatDisplayDate(displayDate);
  const categories = post.categories?.nodes ?? [];
  const primaryCategory = categories[0];
  const tags = post.tags?.nodes ?? [];
  const img = post.featuredImage?.node;
  const author = post.author?.node;
  const mins = readingTime(post.content);
  const canonicalUrl = `${SITE.url}/${post.slug}`;

  // JSON-LD structured data for Google
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: stripHtml(post.excerpt).slice(0, 160),
    image: img?.sourceUrl ? [img.sourceUrl] : [],
    datePublished: post.date,
    dateModified: post.modifiedGmt || post.date,
    author: {
      '@type': 'Person',
      name: author?.name ?? SITE.name,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
  };

  return (
    <>
      <Header />

      {/* Reading progress bar (client component) */}
      <ReadingProgressBar />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-white">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">

          {/* ── Breadcrumb ── */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-slate-400 mb-8 flex-wrap">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            {primaryCategory && (
              <>
                <span aria-hidden="true">/</span>
                <Link
                  href={`/category/${primaryCategory.slug}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {primaryCategory.name}
                </Link>
              </>
            )}
            <span aria-hidden="true">/</span>
            <span className="text-slate-600 line-clamp-1">{post.title}</span>
          </nav>

          {/* ── Category badge ── */}
          {primaryCategory && (
            <Link
              href={`/category/${primaryCategory.slug}`}
              className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700
                         text-xs font-bold uppercase tracking-widest rounded-full mb-4
                         hover:bg-blue-200 transition-colors"
            >
              {primaryCategory.name}
            </Link>
          )}

          {/* ── Title ── */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900
                        leading-tight tracking-tight mb-6">
            {post.title}
          </h1>

          {/* ── Meta bar: author + date + reading time ── */}
          <div className="flex flex-wrap items-center gap-4 py-5 mb-6
                         border-t border-b border-slate-100">

            {/* Author */}
            <div className="flex items-center gap-2.5">
              {author?.avatar?.url ? (
                <Image
                  src={author.avatar.url}
                  alt={author.name}
                  width={36}
                  height={36}
                  className="rounded-full ring-2 ring-slate-100"
                  unoptimized
                />
              ) : (
                <span className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <User size={15} className="text-blue-600" />
                </span>
              )}
              <div>
                <p className="text-sm font-semibold text-slate-800 leading-none">
                  {author?.name ?? 'Editorial Team'}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">Author</p>
              </div>
            </div>

            <div className="w-px h-8 bg-slate-200 hidden sm:block" aria-hidden="true" />

            {/* Date — Updated or Published */}
            <div
              className={`flex items-center gap-1.5 text-sm ${
                isUpdated ? 'text-green-600 font-semibold' : 'text-slate-500'
              }`}
            >
              <Calendar size={14} />
              {isUpdated ? `Updated ${dateStr}` : dateStr}
            </div>

            <div className="w-px h-8 bg-slate-200 hidden sm:block" aria-hidden="true" />

            {/* Reading time */}
            <div className="flex items-center gap-1.5 text-sm text-slate-500">
              <Clock size={14} />
              {mins} min read
            </div>
          </div>

          {/* ── Featured Image ── */}
          {img?.sourceUrl && (
            <div className="relative aspect-video rounded-2xl overflow-hidden mb-10
                           shadow-lg shadow-slate-200/60">
              <Image
                src={img.sourceUrl}
                alt={img.altText || post.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>
          )}

          {/* ── Article content ── */}
          <div
            className="article-prose"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* ── Tags ── */}
          {tags.length > 0 && (
            <div className="mt-10 pt-8 border-t border-slate-100">
              <div className="flex items-center flex-wrap gap-2">
                <Tag size={14} className="text-slate-400 flex-shrink-0" />
                {tags.map((tag) => (
                  <Link
                    key={tag.slug}
                    href={`/tag/${tag.slug}`}
                    className="px-3 py-1 bg-slate-100 hover:bg-blue-100 text-slate-600
                               hover:text-blue-700 text-xs font-medium rounded-full
                               transition-colors"
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* ── Share ── */}
          <ShareBar url={canonicalUrl} title={post.title} />

          {/* ── Back link ── */}
          <Link
            href={primaryCategory ? `/category/${primaryCategory.slug}` : '/'}
            className="inline-flex items-center gap-2 text-sm font-semibold
                       text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft size={14} />
            Back to {primaryCategory?.name ?? 'Home'}
          </Link>

        </article>
      </main>

      <Footer />
    </>
  );
}
