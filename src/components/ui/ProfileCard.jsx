import React from "react";
const ProfileCard = ()  => {
  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-8">
      <div className="flex items-start gap-6">
        <div className="relative">
          <div className="w-48 h-48 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-blue-300 flex items-center justify-center">
            <img
              src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop"
              alt="Maria Fernanda"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-[#1a1a1a]"></div>
        </div>

        <div className="flex-1 pt-4">
          <h2 className="text-3xl font-semibold mb-1">Maria Fernanda</h2>
          <p className="text-sm text-gray-400 mb-4">Premium User</p>
        </div>
      </div>
    </div>
  );
}


export default ProfileCard