import { searchPosts, getDisplayDate, formatDisplayDate } from '@/lib/wordpress';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { Search, RefreshCw, Calendar } from 'lucide-react';

export async function generateMetadata({ searchParams }) {
  const q = searchParams?.q || '';
  return {
    title: q ? `"${q}" — Search — EverydayOnAI` : 'Search — EverydayOnAI',
  };
}

function stripHtml(html) {
  return html?.replace(/<[^>]*>/g, '').trim() || '';
}

export default async function SearchPage({ searchParams }) {
  const query = searchParams?.q?.trim() || '';
  const posts = query ? await searchPosts(query, 12) : [];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 border-b border-slate-100 py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Search size={32} className="text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
              {query ? `Results for "${query}"` : 'Search Articles'}
            </h1>
            {query && (
              <p className="text-slate-500">{posts.length} article{posts.length !== 1 ? 's' : ''} found</p>
            )}
            {/* Search form */}
            <form action="/search" method="GET" className="mt-6 flex gap-2 max-w-xl mx-auto">
              <input
                name="q"
                defaultValue={query}
                placeholder="Search articles..."
                className="flex-1 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-blue-500 bg-white shadow-sm"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-3 rounded-xl transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {!query && (
            <p className="text-center text-slate-400 py-16">Enter a keyword to search articles.</p>
          )}
          {query && posts.length === 0 && (
            <div className="text-center py-16 text-slate-400">
              <p className="text-lg font-medium mb-2">No results found for "{query}"</p>
              <p className="text-sm">Try a different keyword.</p>
              <Link href="/" className="mt-4 inline-block text-blue-600 hover:underline text-sm">← Back to Home</Link>
            </div>
          )}
          {posts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => {
                const { date: displayDate, isUpdated } = getDisplayDate(post);
                const category = post.categories?.nodes?.[0];
                return (
                  <Link key={post.id} href={`/${post.slug}`} className="group block bg-white rounded-2xl border border-slate-100 overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-200">
                    <div className="relative aspect-video bg-slate-100 overflow-hidden">
                      {post.featuredImage?.node?.sourceUrl ? (
                        <Image src={post.featuredImage.node.sourceUrl} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="400px" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-50 to-slate-100" />
                      )}
                    </div>
                    <div className="p-5">
                      {category && (
                        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">{category.name}</span>
                      )}
                      <h2 className="font-bold text-slate-900 leading-snug mt-1 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">{post.title}</h2>
                      <p className="text-slate-500 text-sm line-clamp-2 mb-3">{stripHtml(post.excerpt).slice(0, 100)}...</p>
                      <span className={`text-xs flex items-center gap-1 ${isUpdated ? 'text-green-600' : 'text-slate-400'}`}>
                        {isUpdated ? <RefreshCw size={10} /> : <Calendar size={10} />}
                        {isUpdated ? 'Updated ' : ''}{formatDisplayDate(displayDate)}
                      </span>
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
