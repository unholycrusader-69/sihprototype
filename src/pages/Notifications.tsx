import React, { useState } from 'react';
import { Bell, CheckCircle, Clock, Filter, AlertTriangle } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
  category: string;
}

export function Notifications() {
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Emergency Maintenance Scheduled',
      message: 'Track maintenance on Line 1 between Aluva and Kalamassery stations from 10 PM to 4 AM tomorrow.',
      timestamp: new Date(Date.now() - 300000),
      read: false,
      priority: 'high',
      category: 'Maintenance'
    },
    {
      id: '2',
      title: 'New Safety Guidelines Published',
      message: 'Updated safety protocols for platform operations are now available in the document library.',
      timestamp: new Date(Date.now() - 1800000),
      read: false,
      priority: 'medium',
      category: 'Safety'
    },
    {
      id: '3',
      title: 'Staff Meeting Reminder',
      message: 'Monthly departmental meeting scheduled for Friday 2 PM in Conference Hall A.',
      timestamp: new Date(Date.now() - 3600000),
      read: true,
      priority: 'low',
      category: 'HR'
    },
    {
      id: '4',
      title: 'Document Conversion Complete',
      message: 'Your uploaded maintenance report has been successfully processed and is ready for review.',
      timestamp: new Date(Date.now() - 7200000),
      read: true,
      priority: 'low',
      category: 'System'
    }
  ]);

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'medium':
        return <Clock className="w-5 h-5 text-[#FFD500]" />;
      default:
        return <Bell className="w-5 h-5 text-[#00BFA6]" />;
    }
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.read;
    if (filter === 'high') return notif.priority === 'high';
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-[#0D1B2A]">Notifications</h1>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="px-4 py-2 text-[#00BFA6] hover:bg-[#00BFA6]/10 rounded-lg transition-colors duration-200 text-sm font-medium"
            >
              Mark all as read
            </button>
          )}
        </div>
        <p className="text-gray-600">Stay updated with important announcements and system updates</p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
        <div className="flex items-center space-x-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <div className="flex space-x-2">
            {[
              { id: 'all', label: 'All Notifications' },
              { id: 'unread', label: `Unread (${unreadCount})` },
              { id: 'high', label: 'High Priority' }
            ].map(filterOption => (
              <button
                key={filterOption.id}
                onClick={() => setFilter(filterOption.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  filter === filterOption.id
                    ? 'bg-[#00BFA6] text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {filterOption.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl ${
              !notification.read ? 'border-l-4 border-[#00BFA6]' : ''
            }`}
          >
            <div className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  {getPriorityIcon(notification.priority)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={`font-semibold ${
                      !notification.read ? 'text-[#0D1B2A]' : 'text-gray-700'
                    }`}>
                      {notification.title}
                      {!notification.read && (
                        <span className="ml-2 w-2 h-2 bg-[#00BFA6] rounded-full inline-block"></span>
                      )}
                    </h3>
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                      {notification.category}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{notification.message}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{notification.timestamp.toLocaleString()}</span>
                    </span>
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="flex items-center space-x-1 px-3 py-1 text-[#00BFA6] hover:bg-[#00BFA6]/10 rounded-lg transition-colors duration-200 text-sm"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Mark as read</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredNotifications.length === 0 && (
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No notifications</h3>
          <p className="text-gray-500">You're all caught up!</p>
        </div>
      )}
    </div>
  );
}