import React, { useState } from "react";

const categories = [
  { value: '', label: 'Select category' },
  { value: 'UI', label: '🎨 UI' },
  { value: 'Performance', label: '⚡ Performance' },
  { value: 'Features', label: '🧩 Features' },
  { value: 'Bug', label: '🐞 Bug' },
  { value: 'Other', label: '💡 Other' },
];

const Form = ({ onSubmit, initialData, onCancel }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [message, setMessage] = useState(initialData?.message || '');
  const [category, setCategory] = useState(initialData?.category || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onSubmit === 'function') {
      onSubmit({ title, message, category, id: initialData?.id });
    }
    if (!initialData) {
      setTitle('');
      setMessage('');
      setCategory('');
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8 w-full">
      {initialData && (
        <div className="mb-6 p-3 rounded-lg border border-amber-200 bg-amber-50 text-amber-800 text-sm flex items-center justify-between">
          <span>
          You are editing an existing feedback. Make your changes below and click "Save Changes".
          </span>
          {typeof initialData.votes === 'number' && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white text-amber-700 border border-amber-200">
              <span className="font-semibold">Votes:</span> {initialData.votes}
            </span>
          )}
        </div>
      )}
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md">
          <span className="text-white text-lg">✍️</span>
        </div>
        <h2 className="text-2xl font-semibold text-slate-800">
          {initialData ? 'Edit Feedback' : 'Share Your Feedback'}
        </h2>
        <p className="text-slate-500 mt-2">{initialData ? 'Update your suggestion' : 'Help us improve your experience'}</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <input
            type="text"
            placeholder=" "
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-slate-300 bg-white text-slate-800 rounded-lg px-4 py-3 peer focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-200"
            required
          />
          <label className="absolute left-4 top-3 text-slate-500 pointer-events-none peer-focus:text-indigo-600 peer-focus:top-[-10px] peer-focus:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-base transition-all duration-200 bg-white px-1">
            Feedback Title
          </label>
        </div>

        <div className="relative">
          <textarea
            rows="4"
            placeholder=" "
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border border-slate-300 bg-white text-slate-800 rounded-lg px-4 py-3 peer resize-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-200"
            required
          ></textarea>
          <label className="absolute left-4 top-3 text-slate-500 pointer-events-none peer-focus:text-indigo-600 peer-focus:top-[-10px] peer-focus:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-base transition-all duration-200 bg-white px-1">
            Your Feedback
          </label>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Category
          </label>
          <select
            className="w-full border border-slate-300 bg-white text-slate-800 rounded-lg px-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-200 appearance-none"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex gap-3">
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            {initialData ? 'Save Changes' : 'Submit Feedback'}
          </button>
          {initialData && (
            <button
              type="button"
              onClick={onCancel}
              className="w-full py-3 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition-all duration-200"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Form;