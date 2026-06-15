import { notFound } from "next/navigation";
import { journeyTerms, getJourneyTerm } from "@/lib/journey";
import { JourneyDetail } from "@/components/journey/JourneyDetail";

export function generateStaticParams() {
  return journeyTerms.map((tm) => ({ term: tm.id }));
}

export default function JourneyTermPage({ params }: { params: { term: string } }) {
  const term = getJourneyTerm(params.term);
  if (!term) return notFound();
  return <JourneyDetail term={term} />;
}
