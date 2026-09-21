import React, { useState, useEffect } from 'react';
import {
  X,
  HelpCircle,
  Mail,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Send,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Clock,
  Sparkles,
  Reply,
  Inbox,
  Plus,
  ArrowLeft,
  Check,
  User as UserIcon,
  RotateCcw,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export interface EmailMessage {
  id: string;
  sender: 'user' | 'support';
  senderName: string;
  senderEmail: string;
  timestamp: string;
  content: string;
}

export interface EmailThread {
  id: string;
  subject: string;
  category: string;
  updatedAt: string;
  status: 'Open' | 'Replied' | 'Resolved';
  messages: EmailMessage[];
}

const DEFAULT_THREADS: EmailThread[] = [
  {
    id: 'AC-EML-7821',
    subject: 'Welcome to Artisan Connect Care Desk',
    category: 'General Support',
    updatedAt: 'Today at 10:15 AM',
    status: 'Replied',
    messages: [
      {
        id: 'msg-1',
        sender: 'support',
        senderName: 'Ananya Sharma (Artisan Care Officer)',
        senderEmail: 'support@artisanconnect.org',
        timestamp: 'Today at 10:15 AM',
        content:
          'Namaste! Welcome to Artisan Connect Care Desk. Every craft on our platform is sourced directly from certified village cooperatives with zero middleman deductions. If you have any inquiries regarding order delivery, custom craft commissions, or GI certifications, simply reply to this email thread directly from the app!',
      },
    ],
  },
];

export const HelpSupportModal: React.FC = () => {
  const { isHelpOpen, setIsHelpOpen, user, showToast } = useApp();

  // Active channel/view tab
  const [activeTab, setActiveTab] = useState<'email' | 'whatsapp' | 'faq'>('email');

  // Email Threads & In-App Reply System
  const [threads, setThreads] = useState<EmailThread[]>(() => {
    const saved = localStorage.getItem('ac_support_email_threads');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_THREADS;
      }
    }
    return DEFAULT_THREADS;
  });

  const [selectedThreadId, setSelectedThreadId] = useState<string>(threads[0]?.id || 'AC-EML-7821');
  const [isComposing, setIsComposing] = useState<boolean>(false);

  // New Email state
  const [newSubject, setNewSubject] = useState('');
  const [newCategory, setNewCategory] = useState('Order & Delivery Query');
  const [newMessage, setNewMessage] = useState('');
  const [userEmailInput, setUserEmailInput] = useState(user?.email || 'user@artisanconnect.org');
  const [isSending, setIsSending] = useState(false);

  // Reply state
  const [replyText, setReplyText] = useState('');
  const [isSendingReply, setIsSendingReply] = useState(false);

  // FAQ state
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  // Sync threads to localStorage
  useEffect(() => {
    localStorage.setItem('ac_support_email_threads', JSON.stringify(threads));
  }, [threads]);

  // Keep email input updated if user context changes
  useEffect(() => {
    if (user?.email) {
      setUserEmailInput(user.email);
    }
  }, [user?.email]);

  if (!isHelpOpen) return null;

  const currentThread = threads.find((t) => t.id === selectedThreadId) || threads[0];

  const handleOpenWhatsApp = () => {
    const defaultText = encodeURIComponent(
      `Namaste Artisan Connect Team! I am contacting you from the app (${user?.name || 'Customer'}, ${userEmailInput}). I need support with my craft inquiries & orders.`
    );
    const waUrl = `https://wa.me/917845081701?text=${defaultText}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    showToast('Opening WhatsApp Chat with Artisan Desk (+91 7845081701)...');
  };

  const handleSendNewEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject.trim()) {
      showToast('Please enter an email subject');
      return;
    }
    if (!newMessage.trim()) {
      showToast('Please type your email message');
      return;
    }

    setIsSending(true);
    const threadId = `AC-EML-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setTimeout(() => {
      const userMsg: EmailMessage = {
        id: `msg-${Date.now()}`,
        sender: 'user',
        senderName: user?.name || 'You',
        senderEmail: userEmailInput,
        timestamp: `Today at ${timeStr}`,
        content: newMessage.trim(),
      };

      const newThread: EmailThread = {
        id: threadId,
        subject: newSubject.trim(),
        category: newCategory,
        updatedAt: `Today at ${timeStr}`,
        status: 'Open',
        messages: [userMsg],
      };

      setThreads((prev) => [newThread, ...prev]);
      setSelectedThreadId(threadId);
      setIsComposing(false);
      setNewSubject('');
      setNewMessage('');
      setIsSending(false);
      showToast(`Email sent to support@artisanconnect.org! Thread #${threadId}`);

      // Simulate automated confirmation & support agent follow-up reply
      setTimeout(() => {
        const supportReply: EmailMessage = {
          id: `msg-rep-${Date.now()}`,
          sender: 'support',
          senderName: 'Devika Rao (Artisan Coordinator)',
          senderEmail: 'support@artisanconnect.org',
          timestamp: 'Just now',
          content: `Namaste ${user?.name || 'Artisan Friend'}! We have received your email regarding "${newSubject.trim()}". Our regional guild liaison has registered your ticket. You can reply directly in this thread anytime and we will respond right away.`,
        };

        setThreads((prev) =>
          prev.map((t) =>
            t.id === threadId
              ? {
                  ...t,
                  status: 'Replied',
                  updatedAt: 'Just now',
                  messages: [...t.messages, supportReply],
                }
              : t
          )
        );
        showToast(`New reply from Artisan Care Desk in thread #${threadId}!`);
      }, 1400);
    }, 600);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setIsSendingReply(true);
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const replyMsg: EmailMessage = {
      id: `reply-${Date.now()}`,
      sender: 'user',
      senderName: user?.name || 'You',
      senderEmail: userEmailInput,
      timestamp: `Today at ${timeStr}`,
      content: replyText.trim(),
    };

    setTimeout(() => {
      setThreads((prev) =>
        prev.map((t) =>
          t.id === selectedThreadId
            ? {
                ...t,
                updatedAt: `Today at ${timeStr}`,
                status: 'Open',
                messages: [...t.messages, replyMsg],
              }
            : t
        )
      );
      setReplyText('');
      setIsSendingReply(false);
      showToast('Your email reply has been sent to the Artisan Support Desk!');

      // Automatic support desk response
      setTimeout(() => {
        const autoSupportAck: EmailMessage = {
          id: `support-ack-${Date.now()}`,
          sender: 'support',
          senderName: 'Artisan Connect Desk',
          senderEmail: 'support@artisanconnect.org',
          timestamp: 'Just now',
          content:
            'Thank you for your reply! Our team has updated your case record. If this involves a live shipment or custom order, tracking updates will sync to your Orders tab within 12 hours.',
        };

        setThreads((prev) =>
          prev.map((t) =>
            t.id === selectedThreadId
              ? {
                  ...t,
                  status: 'Replied',
                  updatedAt: 'Just now',
                  messages: [...t.messages, autoSupportAck],
                }
              : t
          )
        );
      }, 1600);
    }, 500);
  };

  const openNativeEmailClient = () => {
    const subject = encodeURIComponent(`[${currentThread?.id || 'Artisan Support'}] Inquiry from ${user?.name || 'User'}`);
    const body = encodeURIComponent(
      `Hello Artisan Connect Team,\n\nI am contacting you from the app regarding inquiry #${currentThread?.id || 'New'}.\n\nMy Message:\n`
    );
    window.location.href = `mailto:support@artisanconnect.org?subject=${subject}&body=${body}`;
  };

  const faqs = [
    {
      q: 'How do artisan direct payouts and fair-trade earnings work?',
      a: 'Artisan Connect guarantees 100% direct payment to verified hereditary artisans with zero platform commissions. Payouts are remitted directly via India Post or UPI within 24 to 48 hours of order delivery.',
    },
    {
      q: 'How are authentic handcrafted products verified?',
      a: 'All craftspeople undergo village guild verification. Products matching Geographical Indication (GI) standards receive certified geographical lineage verification (e.g., Thanjavur Art Plates, Channapatna Toys, Kanchipuram Silk).',
    },
    {
      q: 'What is the return & replacement policy for fragile crafts?',
      a: 'Every delicate craft item (pottery, terracotta, brassware) is shipped in double-cushioned eco-packaging with transit insurance. If damaged, we provide a 100% free replacement from the artisan or an instant full refund within 7 days.',
    },
    {
      q: 'How do artisans use the AI Smart Cataloging assistant?',
      a: 'Artisans can simply upload a craft photo. Our AI tool analyzes the design, automatically determines the cultural heritage story, fair-trade hourly wage breakdown, and generates multilingual search tags.',
    },
    {
      q: 'How can I track my shipment dispatch?',
      a: 'Visit the "My Orders" tab and select "Track Shipment". You will see real-time updates from our certified logistics partners (India Post Artisan Express, Blue Dart, and Delhivery).',
    },
  ];

  return (
    <div className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#E4E8E6] flex items-center justify-between bg-gradient-to-r from-[#F7F9F8] to-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#0B8F56]/10 text-[#0B8F56] flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-[#1E2723]">Help & Support Hub</h2>
              <p className="text-[11px] text-[#66736D]">
                Direct in-app email communications and WhatsApp support desk
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsHelpOpen(false)}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Channels (Call Helpline Removed, WhatsApp and Email Enhanced) */}
        <div className="p-4 border-b border-[#E4E8E6] bg-[#F7F9F8]">
          <span className="text-[11px] font-black uppercase tracking-wider text-[#66736D] block mb-2.5">
            Select Active Support Channel
          </span>
          <div className="grid grid-cols-2 gap-3">
            {/* WhatsApp Live Desk */}
            <div
              onClick={() => setActiveTab('whatsapp')}
              className={`p-3.5 rounded-2xl border flex items-center gap-3 transition-all cursor-pointer ${
                activeTab === 'whatsapp'
                  ? 'border-[#25D366] bg-[#25D366]/10 shadow-xs'
                  : 'border-[#E4E8E6] bg-white hover:border-[#25D366]/50'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-[#1E2723]">WhatsApp Desk</span>
                  <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
                </div>
                <p className="text-[11px] text-[#66736D] truncate">+91 7845081701 • Live</p>
              </div>
            </div>

            {/* In-App Email Support & Reply */}
            <div
              onClick={() => setActiveTab('email')}
              className={`p-3.5 rounded-2xl border flex items-center gap-3 transition-all cursor-pointer ${
                activeTab === 'email'
                  ? 'border-[#0B8F56] bg-[#E9F7F0] shadow-xs'
                  : 'border-[#E4E8E6] bg-white hover:border-[#0B8F56]/50'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-[#0B8F56] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-[#1E2723]">In-App Email Support</span>
                  {threads.length > 0 && (
                    <span className="px-1.5 py-0.2 bg-[#0B8F56] text-white text-[9px] font-bold rounded-full">
                      {threads.length}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#66736D] truncate">Direct Reply in App</p>
              </div>
            </div>
          </div>

          {/* Quick FAQ Tab Button */}
          <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-gray-200 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('faq')}
              className={`font-bold flex items-center gap-1.5 transition-colors ${
                activeTab === 'faq' ? 'text-[#0B8F56] underline' : 'text-[#66736D] hover:text-[#1E2723]'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Browse Frequently Asked Questions</span>
            </button>
            <span className="text-[10px] text-[#66736D]">Zero commission platform support</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1">
          {/* TAB 1: IN-APP EMAIL REPLY PROCESS */}
          {activeTab === 'email' && (
            <div className="space-y-4">
              {/* Email Section Header & Navigation */}
              <div className="flex items-center justify-between pb-2 border-b border-[#E4E8E6]">
                <div className="flex items-center gap-2">
                  <Inbox className="w-4 h-4 text-[#0B8F56]" />
                  <span className="text-xs font-black text-[#1E2723] uppercase tracking-wider">
                    In-App Email Conversation & Replies
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {!isComposing ? (
                    <button
                      type="button"
                      onClick={() => setIsComposing(true)}
                      className="px-3 py-1.5 bg-[#0B8F56] hover:bg-[#006B43] text-white text-xs font-bold rounded-xl flex items-center gap-1 shadow-xs transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>New Email</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsComposing(false)}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl flex items-center gap-1 transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back to Threads</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Compose New Email Form */}
              {isComposing ? (
                <div className="p-4 bg-[#F7F9F8] border border-[#E4E8E6] rounded-2xl space-y-3 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#1E2723]">
                      Compose Email to Artisan Support
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                      Verified Care Desk
                    </span>
                  </div>

                  <form onSubmit={handleSendNewEmail} className="space-y-3">
                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[11px] font-bold text-[#1E2723] mb-1">
                          From (Your Email)
                        </label>
                        <input
                          type="email"
                          required
                          value={userEmailInput}
                          onChange={(e) => setUserEmailInput(e.target.value)}
                          placeholder="your.email@example.com"
                          className="w-full px-3 py-2 bg-white border border-[#E4E8E6] rounded-xl text-xs font-medium focus:border-[#0B8F56] focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-[#1E2723] mb-1">
                          To (Official Support)
                        </label>
                        <input
                          type="text"
                          readOnly
                          value="support@artisanconnect.org"
                          className="w-full px-3 py-2 bg-gray-100 text-gray-600 border border-[#E4E8E6] rounded-xl text-xs font-medium cursor-not-allowed"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#1E2723] mb-1">
                        Category
                      </label>
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-[#E4E8E6] rounded-xl text-xs font-medium focus:border-[#0B8F56] focus:outline-hidden"
                      >
                        <option value="Order & Delivery Query">Order & Delivery Query</option>
                        <option value="Product Authenticity & GI Lineage">Product Authenticity & GI Lineage</option>
                        <option value="Custom Artisan Craft Commission">Custom Artisan Craft Commission</option>
                        <option value="Damaged Craft / Transit Claim">Damaged Craft / Transit Claim</option>
                        <option value="Artisan Studio & Listing Inquiry">Artisan Studio & Listing Inquiry</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#1E2723] mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        required
                        value={newSubject}
                        onChange={(e) => setNewSubject(e.target.value)}
                        placeholder="e.g., Update on terracotta temple diya dispatch"
                        className="w-full px-3 py-2 bg-white border border-[#E4E8E6] rounded-xl text-xs font-medium focus:border-[#0B8F56] focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#1E2723] mb-1">
                        Email Message Body
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your detailed message here. Our artisan team will reply directly within the app..."
                        className="w-full px-3 py-2 bg-white border border-[#E4E8E6] rounded-xl text-xs font-medium focus:border-[#0B8F56] focus:outline-hidden"
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="submit"
                        disabled={isSending}
                        className="flex-1 py-2.5 bg-[#0B8F56] hover:bg-[#006B43] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{isSending ? 'Sending Email...' : 'Send Email From App'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={openNativeEmailClient}
                        className="px-3 py-2.5 bg-white hover:bg-gray-50 border border-[#E4E8E6] text-[#1E2723] text-xs font-bold rounded-xl flex items-center gap-1 transition-colors"
                        title="Open in your default email client (Gmail, Outlook, Mail)"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-[#0B8F56]" />
                        <span>Open in Mail App</span>
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                /* Thread List & Interactive Email Viewer */
                <div className="space-y-4">
                  {/* Horizontal Thread Picker if multiple */}
                  {threads.length > 1 && (
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                      {threads.map((t) => {
                        const isSelected = t.id === selectedThreadId;
                        return (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => setSelectedThreadId(t.id)}
                            className={`px-3 py-2 rounded-xl text-left border shrink-0 transition-all text-xs ${
                              isSelected
                                ? 'border-[#0B8F56] bg-[#E9F7F0] font-bold text-[#006B43]'
                                : 'border-[#E4E8E6] bg-white hover:bg-gray-50 text-[#1E2723]'
                            }`}
                          >
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] uppercase font-mono">{t.id}</span>
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  t.status === 'Replied' ? 'bg-[#0B8F56]' : 'bg-amber-500'
                                }`}
                              />
                            </div>
                            <span className="block truncate max-w-[140px] text-[11px] font-medium">
                              {t.subject}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Active Email Thread Box */}
                  {currentThread && (
                    <div className="border border-[#E4E8E6] rounded-2xl overflow-hidden bg-white shadow-xs">
                      {/* Email Thread Meta Header */}
                      <div className="p-3.5 bg-[#F7F9F8] border-b border-[#E4E8E6] flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-black text-[#0B8F56] bg-[#E9F7F0] px-2 py-0.5 rounded-md">
                              {currentThread.id}
                            </span>
                            <span className="text-[10px] font-bold text-gray-500">
                              {currentThread.category}
                            </span>
                          </div>
                          <h3 className="text-sm font-black text-[#1E2723] mt-1">
                            {currentThread.subject}
                          </h3>
                        </div>

                        <div className="text-right">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            <Check className="w-3 h-3" />
                            <span>{currentThread.status}</span>
                          </span>
                          <span className="block text-[10px] text-gray-500 mt-1">
                            {currentThread.updatedAt}
                          </span>
                        </div>
                      </div>

                      {/* Conversation Messages */}
                      <div className="p-4 space-y-4 max-h-72 overflow-y-auto bg-gray-50/50">
                        {currentThread.messages.map((msg) => {
                          const isUser = msg.sender === 'user';
                          return (
                            <div
                              key={msg.id}
                              className={`p-3.5 rounded-2xl border ${
                                isUser
                                  ? 'bg-[#E9F7F0]/80 border-[#0B8F56]/20 ml-6'
                                  : 'bg-white border-[#E4E8E6] mr-6 shadow-xs'
                              }`}
                            >
                              <div className="flex items-center justify-between text-xs mb-1.5 pb-1 border-b border-gray-200/60">
                                <div className="flex items-center gap-1.5">
                                  <div
                                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                                      isUser
                                        ? 'bg-[#0B8F56] text-white'
                                        : 'bg-emerald-800 text-white'
                                    }`}
                                  >
                                    {isUser ? 'You' : 'AC'}
                                  </div>
                                  <span className="font-bold text-[#1E2723]">
                                    {msg.senderName}
                                  </span>
                                  <span className="text-[10px] text-gray-500 font-mono hidden sm:inline">
                                    &lt;{msg.senderEmail}&gt;
                                  </span>
                                </div>
                                <span className="text-[10px] text-gray-400">{msg.timestamp}</span>
                              </div>
                              <p className="text-xs text-[#1E2723] leading-relaxed whitespace-pre-wrap">
                                {msg.content}
                              </p>
                            </div>
                          );
                        })}
                      </div>

                      {/* In-App Reply Form */}
                      <div className="p-3.5 bg-white border-t border-[#E4E8E6]">
                        <form onSubmit={handleSendReply} className="space-y-2.5">
                          <div className="flex items-center justify-between text-[11px] font-bold text-[#1E2723]">
                            <div className="flex items-center gap-1.5 text-[#0B8F56]">
                              <Reply className="w-3.5 h-3.5" />
                              <span>Reply to Artisan Care Desk as {user?.name || userEmailInput}:</span>
                            </div>
                            <button
                              type="button"
                              onClick={openNativeEmailClient}
                              className="text-gray-500 hover:text-[#0B8F56] flex items-center gap-1 font-normal text-[10px]"
                            >
                              <span>Reply in Gmail / Mail</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </button>
                          </div>

                          <textarea
                            rows={3}
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Type your email response here... (Our team responds inside this thread)"
                            className="w-full px-3 py-2 bg-[#F7F9F8] border border-[#E4E8E6] rounded-xl text-xs font-medium focus:border-[#0B8F56] focus:outline-hidden"
                          />

                          <div className="flex items-center justify-between pt-1">
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() =>
                                  setReplyText(
                                    'Thank you for confirming! Please update me once the shipment is dispatched.'
                                  )
                                }
                                className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 text-[10px] rounded-lg transition-colors"
                              >
                                "Thank you, please update me"
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  setReplyText('Could you please check with the artisan workshop directly?')
                                }
                                className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 text-[10px] rounded-lg transition-colors hidden sm:block"
                              >
                                "Check with workshop"
                              </button>
                            </div>

                            <button
                              type="submit"
                              disabled={isSendingReply || !replyText.trim()}
                              className="px-4 py-2 bg-[#0B8F56] hover:bg-[#006B43] disabled:opacity-50 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors"
                            >
                              <Send className="w-3.5 h-3.5" />
                              <span>{isSendingReply ? 'Sending Reply...' : 'Send Reply'}</span>
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: WHATSAPP LIVE DESK */}
          {activeTab === 'whatsapp' && (
            <div className="p-5 bg-[#F7F9F8] border border-[#E4E8E6] rounded-2xl space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shadow-xs">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-[#1E2723]">WhatsApp Artisan Desk</h3>
                    <p className="text-[11px] text-[#25D366] font-bold">● Online • Average response: &lt; 2 minutes</p>
                  </div>
                </div>
                <span className="text-xs bg-white border border-[#25D366]/40 text-[#1E2723] font-bold px-3 py-1 rounded-full font-mono shadow-2xs inline-flex items-center gap-1.5">
                  +91 7845081701
                </span>
              </div>

              <div className="p-4 bg-white border border-[#E4E8E6] rounded-xl space-y-2">
                <span className="text-xs font-bold text-[#1E2723] block">Direct WhatsApp Services:</span>
                <ul className="text-xs text-[#66736D] space-y-1.5 list-disc pl-4">
                  <li>Direct video call verification with village artisan studios</li>
                  <li>Real-time parcel packing and dispatch photos from Tamil Nadu, Rajasthan & Odisha</li>
                  <li>Custom craft dimensions and bulk wedding/gifting orders</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleOpenWhatsApp}
                  className="flex-1 py-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Launch WhatsApp Chat Now</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText('+917845081701');
                    showToast('WhatsApp number +91 7845081701 copied to clipboard!');
                  }}
                  className="px-4 py-3 bg-white border border-[#E4E8E6] hover:bg-gray-50 text-[#1E2723] text-xs font-bold rounded-xl transition-colors"
                >
                  Copy Number
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: FAQ KNOWLEDGE BASE */}
          {activeTab === 'faq' && (
            <div className="space-y-3 animate-in fade-in duration-150">
              <span className="text-xs font-black uppercase tracking-wider text-[#1E2723] block">
                Frequently Answered Questions
              </span>
              <div className="space-y-2">
                {faqs.map((faq, idx) => {
                  const isOpen = expandedFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="border border-[#E4E8E6] rounded-2xl overflow-hidden transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => setExpandedFaq(isOpen ? null : idx)}
                        className="w-full p-3.5 flex items-center justify-between text-left bg-white hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-xs font-bold text-[#1E2723] pr-2">{faq.q}</span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-[#0B8F56] shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-3.5 pb-3.5 pt-1 text-xs text-[#66736D] bg-gray-50 leading-relaxed border-t border-[#E4E8E6]/60">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Guarantee Banner */}
          <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <span className="text-xs font-extrabold text-amber-900 block">
                Direct Guild Verification Guarantee
              </span>
              <span className="text-[11px] text-amber-800 leading-tight block">
                100% genuine handmade crafts, zero commission deductions, and insured doorstep dispatch across India.
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E4E8E6] bg-gray-50 flex items-center justify-between">
          <span className="text-[11px] text-[#66736D]">
            Support Hours: Mon - Sat • 9:00 AM - 8:00 PM IST
          </span>
          <button
            type="button"
            onClick={() => setIsHelpOpen(false)}
            className="px-4 py-2 bg-[#1E2723] hover:bg-black text-white text-xs font-bold rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
