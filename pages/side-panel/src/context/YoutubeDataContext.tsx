import React, { createContext, useState, useContext, ReactNode } from 'react';
import { fetchVideoDetails, fetchTranscript } from '../services/youtubeService';

// Define the shape of the context state
interface YouTubeDataState {
  videoLink: string;
  videoTitle: string;
  transcript: string;
  isDataFetched: boolean;
  setVideoLink: (link: string) => void;
}

// Create the initial state of the context
const initialState: YouTubeDataState = {
  videoLink: '',
  videoTitle: '',
  transcript: '',
  isDataFetched: false,
  setVideoLink: () => {},
};

// Create the context
const YouTubeDataContext = createContext<YouTubeDataState>(initialState);

// Create the provider component
export const YouTubeDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [videoLink, setVideoLink] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [transcript, setTranscript] = useState('');
  const [isDataFetched, setIsDataFetched] = useState(false);

  // Function to update video link and fetch data
  const handleSetVideoLink = async (link: string) => {
    console.log('Setting video link:', link); // Debug log
    setVideoLink(link);
    setIsDataFetched(false);

    try {
      const title = await fetchVideoDetails(link);
      console.log('got title');
      const transcriptText = await fetchTranscript(link);
      console.log('got transcript');
      setVideoTitle(title);
      setTranscript(transcriptText);
      setIsDataFetched(true);
    } catch (error) {
      console.error('Error fetching YouTube data:', error);
      setIsDataFetched(false);
    }
  };

  return (
    <YouTubeDataContext.Provider
      value={{
        videoLink,
        videoTitle,
        transcript,
        isDataFetched,
        setVideoLink: handleSetVideoLink,
      }}>
      {children}
    </YouTubeDataContext.Provider>
  );
};

// Hook to use the YouTube data context
export const useYouTubeData = () => useContext(YouTubeDataContext);
