export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="animate-spin rounded-full h-14 w-14 border-4 loading-spinner"></div>
      <span className="ml-4 text-lg text-text-muted">Analyzing resume...</span>
    </div>
  );
}