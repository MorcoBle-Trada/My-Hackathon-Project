import { Youtube, Instagram } from 'lucide-react';

const SocialMedia = () => {
  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-8">
      <h3 className="text-xl font-semibold mb-6">Social Media</h3>

      <div className="flex items-center gap-4">
        <a
          href="#"
          className="w-10 h-10 bg-red-600 hover:bg-red-700 rounded-lg flex items-center justify-center transition-colors"
          aria-label="YouTube"
        >
          <Youtube className="w-5 h-5 text-white fill-white" />
        </a>

        <a
          href="#"
          className="w-10 h-10 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 hover:opacity-90 rounded-lg flex items-center justify-center transition-opacity"
          aria-label="Instagram"
        >
          <Instagram className="w-5 h-5 text-white" />
        </a>

        <a
          href="#"
          className="w-10 h-10 bg-white hover:bg-gray-100 rounded-lg flex items-center justify-center transition-colors"
          aria-label="TikTok"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
          </svg>
        </a>
      </div>
    </div>
  );
}


export default SocialMedia