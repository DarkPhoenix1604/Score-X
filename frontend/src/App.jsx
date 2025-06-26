import { useState } from 'react';
import FileUpload from './components/fileupload';
import Dashboard from './components/dashboard';
import {GithubIcon} from './components/icons'


function App() {
  const [analysisData, setAnalysisData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleReset = () => {
    setAnalysisData(null);
    setError('');
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
              ScoreX
            </h1>
            <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-800 transition-colors">
                <GithubIcon />
            </a>
        </header>

        <main>
          {!analysisData ? (
            <FileUpload
              setAnalysisData={setAnalysisData}
              setIsLoading={setIsLoading}
              setError={setError}
              isLoading={isLoading}
            />
          ) : (
            <Dashboard 
              data={analysisData}
              onReset={handleReset}
            />
          )}
          {error && !isLoading && (
             <div className="mt-6 text-center text-red-500 bg-red-100 p-4 rounded-lg">
                <p><strong>Analysis Failed:</strong> {error}</p>
             </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
