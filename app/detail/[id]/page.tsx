import { redirect } from "next/navigation";

export default async function LegacyDetailRedirect({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  redirect(`/places/${id}`);
}
