type ContainerProps = {
  children: React.ReactNode;
};

export function PageContainer({ children }: ContainerProps) {
  return (
    <div className="text-slate-900 min-h-screen mt-10 py-8">
      <div className="max-w-5xl mx-auto px-8">{children}</div>
    </div>
  );
}
