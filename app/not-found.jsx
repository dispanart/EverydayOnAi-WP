import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export const metadata = { title: '404 — Page Not Found — EverydayOnAI' };

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <p className="text-8xl font-black text-blue-600 mb-4">404</p>
          <h1 className="text-2xl font-extrabold text-slate-900 mb-3">Page Not Found</h1>
          <p className="text-slate-500 mb-8 leading-relaxed">
            The article or page you're looking for doesn't exist or may have been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm">
              ← Back to Home
            </Link>
            <Link href="/search" className="border border-slate-200 hover:border-blue-400 text-slate-600 hover:text-blue-600 font-semibold px-6 py-3 rounded-xl transition-colors text-sm">
              Search Articles
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
