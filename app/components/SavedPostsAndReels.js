import { useEffect, useState } from 'react';

const SavedPostsAndReels = ({ accessToken }) => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInstagramMedia = async () => {
      try {
        const response = await fetch(
          `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${accessToken}`
        );
        const data = await response.json();

        if (response.ok) {
          setMedia(data.data);
        } else {
          throw new Error(data.error.message);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInstagramMedia();
  }, [accessToken]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {media.map((item) => (
        <div key={item.id} className="border border-gray-200 p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
          {item.media_type === 'VIDEO' ? (
            <video controls className="w-full h-48 rounded-md mb-4" src={item.media_url} alt="Instagram video" />
          ) : (
            <img className="w-full h-48 object-cover rounded-md mb-4" src={item.media_url} alt="Instagram post" />
          )}
          <p className="text-sm text-gray-700 mb-2">{item.caption || 'No caption available'}</p>
          <a href={item.permalink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
            View on Instagram
          </a>
        </div>
      ))}
    </div>
  );
};

export default SavedPostsAndReels;
