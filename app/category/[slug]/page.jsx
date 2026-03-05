import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Layers, RefreshCw, Calendar } from 'lucide-react';
import {
  getPostsByCategory,
  getAllCategories,
  getCategoryBySlug,
  getDisplayDate,
  formatShortDate,
  stripHtml,
} from '@/lib/wordpress';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const revalidate = 60;

// Build all known category pages at build time
export async function generateStaticParams() {
  const cats = await getAllCategories();
  return cats.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const cat = await getCategoryBySlug(params.slug);
  const name = cat?.name ?? params.slug.replace(/-/g, ' ');
  return {
    title: name,
    description: cat?.description || `Browse all articles about ${name} on EverydayOnAI.`,
    openGraph: { title: `${name} — EverydayOnAI`, type: 'website' },
  };
}

export default async function CategoryPage({ params }) {
  const [category, posts] = await Promise.all([
    getCategoryBySlug(params.slug),
    getPostsByCategory(params.slug, 24),
  ]);

  // 404 if no category found and no posts
  if (!category && !posts.length) notFound();

  const displayName = category?.name ?? params.slug.replace(/-/g, ' ');
  const subcategories = category?.children?.nodes?.filter((c) => (c.count ?? 0) > 0) ?? [];
  const parentCat = category?.parent?.node;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">

        {/* ── Category hero header ── */}
        <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 border-b border-slate-100 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-slate-400 mb-5">
              <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
              {parentCat && (
                <>
                  <ChevronRight size={13} aria-hidden="true" />
                  <Link href={`/category/${parentCat.slug}`} className="hover:text-blue-600 transition-colors">
                    {parentCat.name}
                  </Link>
                </>
              )}
              <ChevronRight size={13} aria-hidden="true" />
              <span className="text-slate-700 font-semibold">{displayName}</span>
            </nav>

            <div className="flex items-center gap-3 mb-2">
              <span className="w-1 h-8 bg-blue-600 rounded-full block" aria-hidden="true" />
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight capitalize">
                {displayName}
              </h1>
            </div>

            {category?.description && (
              <p className="text-slate-500 mt-3 ml-4 max-w-2xl leading-relaxed">
                {category.description}
              </p>
            )}
            <p className="text-slate-400 text-sm ml-4 mt-1">
              {posts.length} article{posts.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          {/* ── Subcategories ── */}
          {subcategories.length > 0 && (
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <Layers size={15} className="text-blue-600" />
                <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide">
                  Sub-categories
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {subcategories.map((sub) => (
                  <Link
                    key={sub.slug}
                    href={`/category/${sub.slug}`}
                    className="flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200
                               hover:border-blue-400 hover:bg-blue-50 text-slate-700 hover:text-blue-700
                               text-sm font-medium rounded-full transition-all"
                  >
                    {sub.name}
                    <span className="text-xs text-slate-400">({sub.count})</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* ── Posts grid ── */}
          {posts.length === 0 ? (
            <div className="text-center py-20 text-slate-400">
              <p className="text-lg font-medium">No articles yet in this category.</p>
              <Link href="/" className="mt-4 inline-block text-blue-600 hover:underline text-sm">
                ← Back to Home
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => {
                const { date, isUpdated } = getDisplayDate(post);
                const img = post.featuredImage?.node;
                const category = post.categories?.nodes?.[0];

                return (
                  <Link
                    key={post.id}
                    href={`/${post.slug}`}
                    className="group block bg-white rounded-2xl border border-slate-100
                               overflow-hidden card-hover"
                  >
                    <div className="relative aspect-video bg-slate-100 overflow-hidden">
                      {img?.sourceUrl ? (
                        <Image
                          src={img.sourceUrl}
                          alt={img.altText || post.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-50 to-slate-100
                                       flex items-center justify-center">
                          <span className="text-blue-200 font-black text-3xl select-none">AI</span>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h2 className="font-bold text-slate-900 leading-snug mb-2 line-clamp-2
                                    group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-3">
                        {stripHtml(post.excerpt).slice(0, 120)}...
                      </p>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs flex items-center gap-1 ${
                          isUpdated ? 'text-green-600 font-medium' : 'text-slate-400'
                        }`}>
                          {isUpdated ? <RefreshCw size={10} /> : <Calendar size={10} />}
                          {isUpdated ? `Updated ` : ''}{formatShortDate(date)}
                        </span>
                        {post.author?.node?.name && (
                          <span className="text-xs text-slate-400">{post.author.node.name}</span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
