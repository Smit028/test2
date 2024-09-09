import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const handleLogin = () => {
    const clientId = 'YOUR_CLIENT_ID';
    const redirectUri = 'http://localhost:3000/callback'; // Your app's redirect URI
    const scope = 'user_profile,user_media';
    const instagramAuthUrl = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`;
    router.push(instagramAuthUrl);
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition"
      >
        Login with Instagram
      </button>
    </div>
  );
}
