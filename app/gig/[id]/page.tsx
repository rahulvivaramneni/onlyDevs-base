import GigDetail from "../../../src/pages/GigDetail";

export default function GigDetailPage({ params }: { params: { id: string } }) {
  return <GigDetail params={params} />;
}
