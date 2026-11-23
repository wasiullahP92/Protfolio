import React, { useState, useEffect } from 'react';
import {
  Mail,
  Trash2,
  CheckCircle,
  X
} from 'lucide-react';
import { api } from '../../utils/api';

export default function MessagesManagement() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filterUnread, setFilterUnread] = useState(false);
  const [notification, setNotification] = useState(null);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await api.getMessages();
      if (res.success && Array.isArray(res.data)) {
        setMessages(res.data);
      }
    } catch (err) {
      setNotification({ type: 'error', message: 'Failed to fetch messages' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleToggleRead = async (msg) => {
    try {
      const newStatus = !msg.isRead;
      const res = await api.markMessageRead(msg._id, newStatus);
      if (res.success) {
        setMessages(
          messages.map((m) => (m._id === msg._id ? { ...m, isRead: newStatus } : m))
        );
      }
    } catch (err) {
      setNotification({ type: 'error', message: 'Failed to update message status' });
    }
  };

  const handleOpenReader = async (msg) => {
    setSelectedMessage(msg);
    if (!msg.isRead) {
      await handleToggleRead(msg);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    try {
      const res = await api.deleteMessage(id);
      if (res.success) {
        setMessages(messages.filter((m) => m._id !== id));
        setSelectedMessage(null);
        setNotification({ type: 'success', message: 'Message deleted' });
      }
    } catch (err) {
      setNotification({ type: 'error', message: 'Failed to delete message' });
    }
  };

  const filteredMessages = filterUnread ? messages.filter((m) => !m.isRead) : messages;

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in pb-16">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Client Inquiries & Messages</h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time messages submitted via your portfolio's public contact form.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterUnread(!filterUnread)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition ${
              filterUnread
                ? 'bg-accent-electric text-black font-bold'
                : 'bg-dark-850 text-slate-300 border border-slate-800'
            }`}
          >
            {filterUnread ? 'Show All Messages' : 'Show Unread Only'}
          </button>
        </div>
      </div>

      {/* Messages List */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
        <div className="divide-y divide-slate-800/80">
          {filteredMessages.map((msg) => (
            <div
              key={msg._id}
              className={`p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition cursor-pointer hover:bg-dark-850/60 ${
                msg.isRead ? 'opacity-80' : 'bg-accent-violet/5'
              }`}
              onClick={() => handleOpenReader(msg)}
            >
              <div className="flex items-start gap-3.5 flex-1 min-w-0">
                <div
                  className={`w-3 h-3 rounded-full mt-1.5 shrink-0 ${
                    msg.isRead ? 'bg-slate-700' : 'bg-accent-electric shadow-glow-cyan'
                  }`}
                  title={msg.isRead ? 'Read' : 'Unread'}
                />

                <div className="space-y-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-white text-sm">{msg.name}</span>
                    <span className="text-xs font-mono text-slate-400">{msg.email}</span>
                  </div>
                  <p className="text-xs font-semibold text-accent-purple truncate">{msg.subject}</p>
                  <p className="text-xs text-slate-300 line-clamp-1">{msg.message}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end sm:self-center" onClick={(e) => e.stopPropagation()}>
                <span className="text-[11px] font-mono text-slate-500">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </span>

                <button
                  onClick={() => handleToggleRead(msg)}
                  className="p-1.5 rounded-lg bg-dark-850 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800"
                  title={msg.isRead ? 'Mark as Unread' : 'Mark as Read'}
                >
                  <CheckCircle className={`w-3.5 h-3.5 ${msg.isRead ? 'text-slate-500' : 'text-emerald-400'}`} />
                </button>

                <button
                  onClick={() => handleDelete(msg._id)}
                  className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30"
                  title="Delete Message"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

          {filteredMessages.length === 0 && !loading && (
            <div className="p-10 text-center text-xs text-slate-500">
              No messages found.
            </div>
          )}
        </div>
      </div>

      {/* Reader Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-dark-900 border border-slate-800 p-6 sm:p-7 rounded-2xl max-w-lg w-full space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">{selectedMessage.subject}</h3>
                <p className="text-xs text-slate-400">
                  From: <strong className="text-white">{selectedMessage.name}</strong> ({selectedMessage.email})
                </p>
              </div>
              <button onClick={() => setSelectedMessage(null)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-dark-850 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed max-h-60 overflow-y-auto whitespace-pre-wrap">
                {selectedMessage.message}
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] font-mono text-slate-500">
                  Received on {new Date(selectedMessage.createdAt).toLocaleString()}
                </span>

                <div className="flex gap-2">
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-accent-violet hover:bg-accent-purple shadow-glow-purple transition"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Reply via Email</span>
                  </a>
                  <button
                    onClick={() => handleDelete(selectedMessage._id)}
                    className="px-3 py-2 rounded-xl text-xs font-medium text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
