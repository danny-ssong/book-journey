export default function Paper({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`w-full rounded-lg bg-white p-6 shadow-lg ${className || ""}`}
      {...props}
    >
      {children}
    </div>
  );
}
