import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useLanguage } from "../contexts/LanguageContext";
import { toast } from "sonner";
import { Bell, Check, Trash2 } from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: "alert" | "update" | "system";
}

const NotificationsPage: React.FC = () => {
  const { translations } = useLanguage();
  const [filter, setFilter] = useState<"all" | "unread">("all");

  // Mock notifications data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Price Alert",
      message: "Maize prices have increased by 15% in your region",
      timestamp: "2 hours ago",
      read: false,
      type: "alert"
    },
    {
      id: "2",
      title: "System Update",
      message: "New features have been added to the marketplace",
      timestamp: "1 day ago",
      read: true,
      type: "system"
    },
    {
      id: "3",
      title: "Weather Alert",
      message: "Heavy rainfall expected in your area tomorrow",
      timestamp: "3 hours ago",
      read: false,
      type: "alert"
    }
  ]);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
    toast.success("Marked as read");
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
    toast.success("Notification deleted");
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
    toast.success("All notifications marked as read");
  };

  const filteredNotifications = filter === "all" 
    ? notifications 
    : notifications.filter(notif => !notif.read);

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-base font-semibold text-gray-900">{translations.notifications}</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setFilter(filter === "all" ? "unread" : "all")}
            className="flex items-center gap-2 text-xs px-3 h-8"
          >
            <Bell className="w-4 h-4" />
            {filter === "all" ? "Show Unread" : "Show All"}
          </Button>
          <Button
            variant="outline"
            onClick={markAllAsRead}
            className="flex items-center gap-2 text-xs px-3 h-8"
          >
            <Check className="w-4 h-4" />
            Mark All Read
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        {filteredNotifications.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-gray-500 text-sm">
              No notifications to display
            </CardContent>
          </Card>
        ) : (
          filteredNotifications.map(notification => (
            <Card key={notification.id} className={notification.read ? "opacity-75" : ""}>
              <CardContent className="p-3">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-medium text-gray-900">{notification.title}</h3>
                      {!notification.read && (
                        <span className="px-2 py-0.5 text-xs bg-shamba-green text-white rounded-full">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600">{notification.message}</p>
                    <p className="text-xs text-gray-500">{notification.timestamp}</p>
                  </div>
                  <div className="flex gap-2">
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                        className="text-shamba-green h-7 w-7"
                      >
                        <Check className="w-3 h-3" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteNotification(notification.id)}
                      className="text-red-500 h-7 w-7"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationsPage; 