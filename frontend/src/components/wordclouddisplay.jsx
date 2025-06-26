export default function WordCloudDisplay({ title, fileName, wordCloudPath }) {
    // Use a placeholder if the image path is not available
    const imageUrl = wordCloudPath 
      ? `/${wordCloudPath}` 
      : 'https://placehold.co/800x400/e2e8f0/64748b?text=Word+Cloud+N/A';
    
    return (
      <div className="border border-slate-200 rounded-xl p-4 flex flex-col items-center">
        <h4 className="font-semibold text-slate-700 mb-1">{title}</h4>
        <p className="text-xs text-slate-500 mb-3 truncate w-full text-center" title={fileName}>{fileName}</p>
        <img
          src={imageUrl}
          alt={`Word cloud for ${fileName}`}
          className="rounded-lg w-full h-auto object-cover"
          // Handle image loading errors
          onError={(e) => {
            e.currentTarget.src = 'https://placehold.co/800x400/e2e8f0/64748b?text=Image+Failed+to+Load';
          }}
        />
      </div>
    );
  }
  