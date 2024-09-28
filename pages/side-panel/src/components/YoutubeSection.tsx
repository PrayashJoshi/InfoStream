// src/components/YouTubeSection.tsx
import React, { useEffect } from 'react';
import { useYouTubeData } from '../context/YoutubeDataContext';
import '../SidePanel.css'; // Ensure you import the CSS file

const YouTubeSection: React.FC = () => {
  const { videoLink, videoTitle, transcript, isDataFetched, setVideoLink } = useYouTubeData();

  useEffect(() => {
    if (!videoLink) {
      // Initial state, prompt user for a link if not present
    }
  }, [videoLink]);

  // Validate if the input link is a YouTube link
  const validateYouTubeLink = (link: string) => {
    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    console.log('checking regex');
    return regex.test(link);
  };

  // Handle the link input and validate it
  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const link = e.target.value;
    if (validateYouTubeLink(link)) {
      setVideoLink(link);
      console.log('validated');
    }
  };

  return (
    <div className="youtube-section-container">
      {!videoLink && (
        <div className="user-input-container flex items-center p-1 mt-2">
          <input
            type="text"
            placeholder="Paste your YouTube link..."
            onChange={handleLinkChange}
            className="flex-grow p-2 pl-4 text-white bg-[#282828] placeholder-gray-400 rounded-l-full rounded-r-full outline-none"
          />
        </div>
      )}
      {/* Show video title */}
      <div className="youtube-title">{videoLink ? videoTitle : ''}</div>

      {/* Show transcript container only when data is fetched */}
      {isDataFetched && (
        <div className="youtube-transcript-container fade-in">
          <p className="youtube-transcript-text">{transcript}</p>
        </div>
      )}
    </div>
  );
};

export default YouTubeSection;
