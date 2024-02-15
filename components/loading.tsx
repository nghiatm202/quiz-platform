const Loading = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-50 bg-secondary">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
};

export default Loading;
