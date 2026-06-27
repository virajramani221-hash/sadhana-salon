export default function JournalPostPage({ params }: { params: { slug: string } }) {
  return (
    <div className="pt-32 min-h-screen text-center font-display text-h2">
      Journal Post: {params.slug}
    </div>
  );
}
