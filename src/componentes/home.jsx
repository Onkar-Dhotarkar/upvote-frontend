import React, { useEffect, useState } from 'react';
import Form from './form';
import FormList from './formlist';
import { MessageSquare, Users, TrendingUp, Rocket, ArrowRight, Star } from 'lucide-react';
import { fetchFeedbacks, createFeedback, voteFeedback, updateFeedback, deleteFeedback, API_URL } from '../api';
import Toast from './toast';

const Home = () => {
  const [showFormSection, setShowFormSection] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [dbStatus, setDbStatus] = useState('');

  const pushToast = (type, title, message) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const closeToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  // ✅ Use correct local API for health check
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        // Health check using local backend
        const healthRes = await fetch(`${API_URL}/health`);
        if (healthRes.ok) {
          const health = await healthRes.json();
          if (mounted) setDbStatus(health.database || 'local');
        }

        const data = await fetchFeedbacks();
        if (mounted) setFeedbacks(data);
      } catch (e) {
        if (mounted) setError('Failed to load feedback.');
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const handleSubmitFeedback = async ({ title, message, category, id }) => {
    try {
      if (id) {
        const updated = await updateFeedback(id, { title, message, category });
        setFeedbacks((prev) => prev.map((f) => (f.id === id ? updated : f)));
        setEditing(null);
        pushToast('success', 'Feedback updated');
      } else {
        const created = await createFeedback({ title, message, category });
        setFeedbacks((prev) => [created, ...prev]);
        pushToast('success', 'Feedback created');
      }
    } catch (e) {
      setError(id ? 'Failed to update feedback.' : 'Failed to submit feedback.');
      pushToast('error', 'Action failed', e?.message || 'Please try again');
    }
  };

  const handleVote = async (id, delta) => {
    try {
      const updated = await voteFeedback(id, delta);
      setFeedbacks((prev) => prev.map((f) => (f.id === id ? updated : f)));
      pushToast('success', delta > 0 ? 'Upvoted' : 'Downvoted');
    } catch (e) {
      setError('Failed to register vote.');
      pushToast('error', 'Vote failed');
    }
  };

  const handleEdit = (feedback) => {
    setEditing(feedback);
    setShowFormSection(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this feedback?')) return;
    try {
      await deleteFeedback(id);
      setFeedbacks((prev) => prev.filter((f) => f.id !== id));
      setError('');
      pushToast('success', 'Feedback deleted');
    } catch (e) {
      setError('Failed to delete feedback.');
      pushToast('error', 'Delete failed');
    }
  };

  const features = [
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Share Feedback",
      description: "Submit your ideas and suggestions to help us improve"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community Driven",
      description: "Vote on features that matter most to the community"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Track Progress",
      description: "See which suggestions are being implemented"
    }
  ];

  const stats = [
    { value: "500+", label: "Active Users" },
    { value: "1.2k+", label: "Feedback Submitted" },
    { value: "89%", label: "Implementation Rate" },
    { value: "24h", label: "Response Time" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Toast toasts={toasts} onClose={closeToast} />

      {!showFormSection ? (
        <div className="relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50"></div>
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>

          {/* Main Content */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
            <div className="text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full px-4 py-2 mb-8 shadow-sm">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium text-slate-700">
                  Trusted by 500+ teams worldwide
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 mb-6 tracking-tight">
                Share Your
                <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Voice
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl lg:text-2xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                Shape the future of our product. Submit ideas, vote on feedback, and watch your suggestions come to life.
              </p>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                <button
                  onClick={() => setShowFormSection(true)}
                  className="group bg-gradient-to-br from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-3"
                >
                  <Rocket className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                  Get Started Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-2xl mx-auto mb-20">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Features */}
              <div id="features" className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto animate-fade">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white/60 backdrop-blur-sm border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group hover:border-indigo-200"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">{feature.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div id="feedback" className="py-20 px-4 sm:px-6 lg:px-8 animate-fade">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <button
                onClick={() => setShowFormSection(false)}
                className="inline-flex items-center gap-2 text-slate-600 hover:text-indigo-600 font-medium mb-8 transition-colors duration-200 group"
              >
                <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform duration-200" />
                Back to Home
              </button>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                Community Feedback Portal
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Share your ideas and vote on features. Together, we build better products.
              </p>
            </div>

            {/* Database Status */}
            <div className="mb-4 text-center">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Using Local MongoDB ({dbStatus || 'Connected'})
              </span>
            </div>

            {/* Error / Loading */}
            {error && (
              <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
            )}

            {/* Form and List */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              <div className="sticky top-24">
                <Form onSubmit={handleSubmitFeedback} initialData={editing} onCancel={() => setEditing(null)} />
              </div>
              <div>
                {loading ? (
                  <div className="text-slate-600">Loading feedback...</div>
                ) : (
                  <FormList feedbacks={feedbacks} onVote={handleVote} onEdit={handleEdit} onDelete={handleDelete} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
