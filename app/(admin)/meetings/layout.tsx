export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* Authentication will be scaffolded here in Week 05 */}
      <main>{children}</main>
    </div>
  );
}