"use client"

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import SavedPostsAndReels from './components/SavedPostsAndReels';

export default function Callback() {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState(null);
  const { code } = router.query;

  useEffect(() => {
    if (code) {
      // Exchange the code for an access token by calling our API route
      const fetchAccessToken = async () => {
        try {
          const response = await fetch(`/api/getAccessToken?code=${code}`);
          const data = await response.json();
          setAccessToken(data.access_token);
        } catch (error) {
          console.error('Error fetching access token:', error);
        }
      };

      fetchAccessToken();
    }
  }, [code]);

  return (
    <div className="p-8">
      {accessToken ? (
        <SavedPostsAndReels accessToken={accessToken} />
      ) : (
        <p>Fetching access token...</p>
      )}
    </div>
  );
}
