export default async function Task({
  params,
}: {
  params: Promise<{ taskId: string }>;
}) {
  const { taskId } = await params;
  return (
    <div>
      <h1>Task Page</h1>
      <span>Featuring task number {taskId}</span>
    </div>
  );
}
