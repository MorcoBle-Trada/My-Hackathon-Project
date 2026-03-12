import React from 'react';
import { Hash } from 'lucide-react';

const BioDetails = ()  => {

  const leftColumn = [
    { label: "My Role", value: "Beatmaker" },
    { label: "My 3 Favorite Artists", value: "Ninho, Travis Scott, Metro Boomin" },
    { label: "The Software or Equipment I Use", value: "Ableton" },
    { label: "My City or Region", value: "California, USA" }
  ];

  const rightColumn = [
    { label: "My Experience Level", value: "Intermediate" },
    { label: "My Preferred Music Mood", value: "Melancholic" },
    { label: "Availability", value: "Available for Collaboration", highlight: true },
    { label: "Tags", value: "#Drill #Melancholic #Trap US", isTags: true }
  ];

  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-8">
      <h3 className="text-xl font-semibold mb-6">Bio & other details</h3>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {leftColumn.map((item, index) => (
            <div key={index}>
              <p className="text-xs text-gray-500 mb-1">{item.label}</p>
              <p className="text-sm text-white">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          {rightColumn.map((item, index) => (
            <div key={index}>
              <p className="text-xs text-gray-500 mb-1">{item.label}</p>
              {item.highlight ? (
                <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-md px-2 py-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <p className="text-xs text-green-400">{item.value}</p>
                </div>
              ) : item.isTags ? (
                <div className="flex items-center gap-2">
                  <div className="inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/30 rounded-md px-2 py-1">
                    <Hash className="w-3 h-3 text-blue-400" />
                    <span className="text-xs text-blue-400">Tag Generator</span>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-white">{item.value}</p>
              )}
              {item.isTags && (
                <p className="text-sm text-white mt-2">{item.value}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-[#2a2a2a]">
        <p className="text-xs text-gray-500 mb-1">Badges</p>
        <div className="inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/30 rounded-md px-2 py-1">
          <Hash className="w-3 h-3 text-blue-400" />
          <span className="text-xs text-blue-400">Tag Generator</span>
        </div>
      </div>
    </div>
  );
}


export default BioDetails