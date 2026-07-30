const LoadingSpinner = ({ size = "md" }) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return (
    <div
      className={`animate-spin rounded-full border-2 border-white/30 border-t-white ${sizeClasses[size]}`}
      aria-label="Loading"
    />
  );
};

export default LoadingSpinner;
