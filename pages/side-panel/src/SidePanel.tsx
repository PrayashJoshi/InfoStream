import '@src/SidePanel.css';
import { useStorage, withErrorBoundary, withSuspense } from '@extension/shared';
import { exampleThemeStorage } from '@extension/storage';
import type { ComponentPropsWithoutRef } from 'react';

// Import InfoStream Components
import StatusBar from '@src/components/StatusBar';
import YouTubeSection from '@src/components/YoutubeSection';
import ChatDisplay from '@src/components/ChatDisplay';
import UserInput from '@src/components/UserInput';
import { YouTubeDataProvider } from './context/YoutubeDataContext';

const SidePanel = () => {
  const theme = useStorage(exampleThemeStorage);
  const isLight = theme === 'light';

  return (
    <div className={`side-panel-container ${isLight ? 'bg-slate-50' : 'bg-gray-800'}`}>
      {/* Status Bar Section */}
      <YouTubeDataProvider>
        <StatusBar />

        {/* YouTube Title and Transcript Section */}
        <YouTubeSection />

        {/* Chat Display Area */}
        <ChatDisplay />
      </YouTubeDataProvider>
    </div>
  );
};

// Error Boundary and Suspense Wrapping for Fault Tolerance
export default withErrorBoundary(withSuspense(SidePanel, <div> Loading ... </div>), <div> Error Occurred </div>);
