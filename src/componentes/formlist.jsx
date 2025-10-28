import React, { useState } from "react";
import { FaArrowUp, FaArrowDown, FaSearch, FaFilter, FaEdit, FaTrash } from "react-icons/fa";

const categories = [
  { value: "UI", emoji: "🎨", color: "bg-purple-100 text-purple-800" },
  { value: "Performance", emoji: "⚡", color: "bg-blue-100 text-blue-800" },
  { value: "Features", emoji: "🧩", color: "bg-green-100 text-green-800" },
  { value: "Bug", emoji: "🐞", color: "bg-red-100 text-red-800" },
  { value: "Other", emoji: "💡", color: "bg-gray-100 text-gray-800" },
];

const seedFeedbacks = [
  {
    id: 1,
    title: "Improve loading time",
    message: "The website takes a bit long to load on mobile devices.",
    category: "Performance",
    votes: 12,
    date: "2025-10-09T10:45",
  },
  {
    id: 2,
    title: "Add dark mode option",
    message: "Would love a dark mode feature for late-night browsing.",
    category: "UI",
    votes: 25,
    date: "2025-10-09T14:30",
  },
  {
    id: 3,
    title: "Fix login bug",
    message: "Login button sometimes doesn't respond.",
    category: "Bug",
    votes: 7,
    date: "2025-10-09T09:00",
  },
];

const formatDate = (iso) => {
  const d = new Date(iso);
  return d.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
};

const FormList = ({ feedbacks = [], onVote, onEdit, onDelete }) => {
  const [sortOrder, setSortOrder] = useState("highest");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFeedbacks = feedbacks
    .filter(
      (f) =>
        (selectedCategory === "All" || f.category === selectedCategory) &&
        (f.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          f.message.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) =>
      sortOrder === "highest" ? b.votes - a.votes : a.votes - b.votes
    );

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8 mx-auto mt-8 max-w-4xl w-full">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 sm:mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-800 mb-2">
            Community Feedback
          </h2>
          <p className="text-slate-500">
            {filteredFeedbacks.length} suggestion{filteredFeedbacks.length !== 1 ? 's' : ''} found
          </p>
        </div>
        
        <div className="flex flex-col gap-3 w-full lg:w-auto">
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search feedback..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-slate-300 bg-white text-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 focus:outline-none transition-all duration-200 w-full sm:w-64"
            />
          </div>
          
          <div className="flex gap-2 flex-col sm:flex-row w-full sm:w-auto">
            <select
              className="border border-slate-300 bg-white text-slate-800 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 focus:outline-none transition-all duration-200 appearance-none w-full sm:w-auto"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.emoji} {cat.value}
                </option>
              ))}
            </select>
            
            <button
              onClick={() =>
                setSortOrder(sortOrder === "highest" ? "lowest" : "highest")
              }
              className="px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition-all duration-200 flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <FaFilter className="text-sm" />
              {sortOrder === "highest" ? "Most Votes" : "Least Votes"}
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredFeedbacks.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🗒️</span>
            </div>
            <h3 className="text-lg font-medium text-slate-700 mb-2">No feedback found</h3>
            <p className="text-slate-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
        
        {filteredFeedbacks.map((feedback) => {
          const cat = categories.find((c) => c.value === feedback.category);
          return (
            <div
              key={feedback.id}
              className="p-6 bg-white border border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-sm transition-all duration-200 group"
            >
              <div className="flex gap-4">
                <div className="flex flex-col items-center pt-1">
                  <button
                    className="text-slate-400 hover:text-indigo-500 p-2 rounded-lg hover:bg-indigo-50 transition-colors duration-200"
                    aria-label="Upvote"
                    onClick={() => onVote && onVote(feedback.id, +1)}
                  >
                    <FaArrowUp />
                  </button>
                  <p className="font-semibold text-slate-700 text-lg my-1">{feedback.votes}</p>
                  <button
                    className="text-slate-400 hover:text-slate-500 p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
                    aria-label="Downvote"
                    onClick={() => onVote && onVote(feedback.id, -1)}
                  >
                    <FaArrowDown />
                  </button>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <h3 className="text-lg font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors duration-200">
                      {feedback.title}
                    </h3>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${cat?.color}`}>
                      {cat?.emoji} {cat?.value}
                    </span>
                  </div>
                  
                  <p className="text-slate-600 mb-4 leading-relaxed">
                    {feedback.message}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span>{formatDate(feedback.date)}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEdit && onEdit(feedback)}
                        className="px-3 py-1.5 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200 flex items-center gap-1"
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        onClick={() => onDelete && onDelete(feedback.id)}
                        className="px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 flex items-center gap-1"
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FormList;