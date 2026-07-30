interface Props {
  children?: React.ReactNode;
}

export function ErrorMessage({
  children,
}: Props) {
  if (!children) return null;

  return (
    <p className="text-xs font-medium text-destructive">
      {children}
    </p>
  );
}