import { useState } from 'react';
import FileUpload from './components/fileupload';
import Dashboard from './components/dashboard';
import { GithubIcon } from './components/icons'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';


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
        <SignedIn>
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Score-X
            </h1>
            <UserButton />
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
        </SignedIn>
        <SignedOut>
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Score-X
            </h1>
            <SignInButton mode="modal">
              <button className='border border-slate-300 bg-white text-slate-900 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer'>
                Sign In
              </button>
            </SignInButton>
          </header>
          <div className='flex flex-col items-center justify-center h-96'>
            <p className="text-lg text-slate-700 mb-4 text-center">
              Score-X is a powerful tool for analyzing and scoring resumes.
              <br />
              Please sign in to upload and analyze your resumes.
            </p>
          </div>
        </SignedOut>
      </div>
    </div>

  );
}

export default App;
