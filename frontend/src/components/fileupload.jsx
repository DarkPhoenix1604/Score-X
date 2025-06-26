import { useState } from 'react';
import { analyzeFiles } from '../api/apiservice';
import { UploadIcon, FileIcon, TrashIcon } from './icons';

const FileInput = ({ label, onFileChange, multiple = false }) => (
    <div>
        <label className="block text-sm font-medium text-slate-600 mb-2">{label}</label>
        <input
            type="file"
            multiple={multiple}
            onChange={onFileChange}
            className="block w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100 transition-colors"
        />
    </div>
);

const FileList = ({ files, onRemove }) => (
    <ul className="space-y-2">
        {Array.from(files).map((file, index) => (
            <li key={index} className="flex items-center justify-between bg-slate-100 p-2 rounded-lg">
                <div className="flex items-center gap-2">
                    <FileIcon />
                    <span className="text-sm text-slate-700">{file.name}</span>
                </div>
                <button onClick={() => onRemove(index)} className="text-slate-500 hover:text-red-500 transition-colors">
                    <TrashIcon />
                </button>
            </li>
        ))}
    </ul>
);


export default function FileUpload({ setAnalysisData, setIsLoading, setError, isLoading }) {
  const [jdFile, setJdFile] = useState(null);
  const [resumeFiles, setResumeFiles] = useState([]);

  const handleJdChange = (e) => {
    if (e.target.files.length) {
      setJdFile(e.target.files[0]);
    }
  };

  const handleResumesChange = (e) => {
    if (e.target.files.length) {
      // Allow up to 10 resume files
      setResumeFiles(Array.from(e.target.files).slice(0, 10));
    }
  };
  
  const removeResume = (indexToRemove) => {
      setResumeFiles(resumeFiles.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!jdFile || resumeFiles.length < 2) {
      setError('Please upload a job description and at least two resumes.');
      return;
    }
    
    setError('');
    setIsLoading(true);

    try {
      const data = await analyzeFiles(jdFile, resumeFiles);
      setAnalysisData(data);
    } catch (err) {
      setError(err.message || 'An unknown error occurred.');
      setAnalysisData(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-slate-800">Upload Your Documents</h2>
        <p className="text-slate-500 mt-2">Provide a job description and resumes to begin the analysis.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
            <FileInput label="Job Description (1 file)" onFileChange={handleJdChange} />
            {jdFile && <p className="text-sm text-slate-600 mt-2 ml-2 flex items-center gap-2"><FileIcon/> {jdFile.name}</p>}
        </div>
         <div>
            <FileInput label="Resumes (2-10 files)" onFileChange={handleResumesChange} multiple />
            {resumeFiles.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-sm font-medium text-slate-600 mb-2">Selected Resumes:</h3>
                    <FileList files={resumeFiles} onRemove={removeResume} />
                </div>
            )}
        </div>
        <button
          type="submit"
          disabled={isLoading || !jdFile || resumeFiles.length < 2}
          className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-hover transition-all duration-300 disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Analyzing...</span>
            </>
          ) : (
             <>
                <UploadIcon />
                <span>Analyze Documents</span>
             </>
          )}
        </button>
      </form>
    </div>
  );
}
