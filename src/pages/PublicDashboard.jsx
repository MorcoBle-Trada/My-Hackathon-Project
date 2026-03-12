import React from "react";
import { Link } from "react-router-dom";
import { users } from "../users"; 

const PublicDashboard = () => {
  const UserProfileCard = ({ user }) => (
    <Link to={`/StudentProfile/${user.id}`}>
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 flex flex-col space-y-6 hover:border-blue-500 transition-all cursor-pointer">
        <div className="flex items-start gap-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h2 className="text-lg font-semibold text-white">{user.name}</h2>
            <p className="text-xs text-gray-400">{user.role}</p>
          </div>
        </div>

        <div className="bg-[#121212] p-3 rounded-lg border border-[#2a2a2a] space-y-2">
          {user.bio.map((item, idx) => (
            <div key={idx}>
              <p className="text-xs text-gray-500">{item.label}</p>
              <p className="text-sm text-white">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );

  return (
    <div className="p-6 bg-[#121212] min-h-screen">
      <h1 className="text-white text-2xl font-bold mb-6">
        Our Students Profiles
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <UserProfileCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default PublicDashboard;