export default function TeamMemberPage({ params }: { params: { slug: string } }) {
  return (
    <div className="pt-32 min-h-screen text-center font-display text-h2">
      Team Member: {params.slug}
    </div>
  );
}
