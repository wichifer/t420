interface LoadingStateProps {
  message?: string;
}

export default function LoadingState({
  message = "Cargando...",
}: LoadingStateProps) {
  return (
    <div className="p-4 text-muted-foreground">
      {message}
    </div>
  );
}