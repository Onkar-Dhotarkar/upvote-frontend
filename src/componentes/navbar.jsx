import React from "react";
import { ArrowUp, Home, Zap, MessageSquare } from "lucide-react";

const Navbar = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 w-full fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Left Section - Logo + Title */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={scrollToTop}>
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-200">
              <ArrowUp className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 tracking-tight">
                Upvote
              </h1>
              <p className="text-xs text-slate-500 hidden sm:block">Community Feedback</p>
            </div>
          </div>

          {/* Center Section - Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            <button onClick={scrollToTop} className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-all duration-200 group">
              <Home size={18} className="group-hover:text-indigo-500" />
              Home
            </button>
            <button onClick={() => scrollToSection('features')} className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-all duration-200 group">
              <Zap size={18} className="group-hover:text-indigo-500" />
              Features
            </button>
            
          </div>

          {/* Right Section - Mobile Menu Button Only */}
          <div className="flex items-center">
            {/* Mobile Menu Button */}
            <button className="md:hidden flex flex-col gap-1 w-6 h-6">
              <span className="w-full h-0.5 bg-slate-600 rounded"></span>
              <span className="w-full h-0.5 bg-slate-600 rounded"></span>
              <span className="w-full h-0.5 bg-slate-600 rounded"></span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
          <div className="md:hidden mt-4 pt-4 border-t border-slate-200">
          <div className="flex items-center justify-around">
            <button onClick={scrollToTop} className="flex flex-col items-center gap-1 text-slate-600 hover:text-indigo-600 transition-colors duration-200">
              <Home size={18} />
              <span className="text-xs">Home</span>
            </button>
            <button onClick={() => scrollToSection('features')} className="flex flex-col items-center gap-1 text-slate-600 hover:text-indigo-600 transition-colors duration-200">
              <Zap size={18} />
              <span className="text-xs">Features</span>
            </button>
            
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;