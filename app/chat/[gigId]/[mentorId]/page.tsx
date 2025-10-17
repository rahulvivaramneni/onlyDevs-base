import Chat from "../../../../src/pages/Chat";

export default function ChatPage({
  params,
}: {
  params: { gigId: string; mentorId: string };
}) {
  return <Chat params={params} />;
}
