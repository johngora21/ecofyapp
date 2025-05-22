import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Switch } from "../components/ui/switch";
import { useLanguage } from "../contexts/LanguageContext";
import { toast } from "sonner";
import { MessageCircle } from "lucide-react";

const SettingsPage: React.FC = () => {
  const { translations } = useLanguage();
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "",
    location: "",
    avatar: "https://i.pravatar.cc/100?img=3"
  });
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [editProfile, setEditProfile] = useState(profile);
  const [password, setPassword] = useState({
    old: "",
    new: "",
    confirm: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    inApp: true
  });
  const [notifLoading, setNotifLoading] = useState(false);

  // Handlers
  const handleEditProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditProfile({ ...editProfile, [e.target.name]: e.target.value });
  };
  const handleEditAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEditProfile({ ...editProfile, avatar: URL.createObjectURL(e.target.files[0]) });
    }
  };
  const handleProfileSave = () => {
    setProfileLoading(true);
    setTimeout(() => {
      setProfile(editProfile);
      setProfileLoading(false);
      setProfileModal(false);
      toast.success("Profile updated");
    }, 1000);
  };
  const handlePasswordSave = () => {
    setPasswordLoading(true);
    setTimeout(() => {
      setPasswordLoading(false);
      toast.success("Password changed");
      setPassword({ old: "", new: "", confirm: "" });
      setPasswordModal(false);
    }, 1000);
  };
  const handleNotifSave = () => {
    setNotifLoading(true);
    setTimeout(() => {
      setNotifLoading(false);
      toast.success("Notification preferences updated");
    }, 1000);
  };

  // Chat button handler
  const handleChatClick = () => {
    toast("Chat feature coming soon!");
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <h1 className="text-base font-semibold text-gray-900 mb-2">Settings</h1>

      {/* Profile Info (display mode) */}
      <Card className="border border-gray-100 shadow-none">
        <CardContent className="p-4 flex items-center gap-4">
          <img
            src={profile.avatar}
            alt="Avatar"
            className="w-12 h-12 rounded-full border border-gray-100 object-cover"
          />
          <div className="flex-1 grid grid-cols-1 gap-1">
            <div className="text-sm font-medium text-gray-900">{profile.name}</div>
            <div className="text-xs text-gray-600">{profile.email}</div>
            <div className="text-xs text-gray-600">{profile.phone || <span className="italic text-gray-400">No phone</span>}</div>
            <div className="text-xs text-gray-600">{profile.location || <span className="italic text-gray-400">No location</span>}</div>
          </div>
          <Button
            size="sm"
            className="ml-auto h-8 px-3 text-xs font-normal"
            onClick={() => { setEditProfile(profile); setProfileModal(true); }}
          >
            Edit Profile
          </Button>
        </CardContent>
      </Card>

      {/* Edit Profile Modal */}
      {profileModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-2 z-50">
          <Card className="w-full max-w-md border border-gray-100 shadow-lg">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-3">
                <span className="text-base font-semibold text-gray-900">Edit Profile</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-xs"
                  onClick={() => setProfileModal(false)}
                  type="button"
                >
                  ×
                </Button>
              </div>
              <div className="flex flex-col items-center gap-3 mb-2">
                <label htmlFor="edit-avatar-upload" className="cursor-pointer">
                  <img
                    src={editProfile.avatar}
                    alt="Avatar"
                    className="w-14 h-14 rounded-full border border-gray-100 object-cover"
                  />
                  <input
                    id="edit-avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleEditAvatarChange}
                  />
                </label>
              </div>
              <div className="flex flex-col gap-2">
                <Input
                  name="name"
                  value={editProfile.name}
                  onChange={handleEditProfileChange}
                  className="text-sm h-8 px-2"
                  placeholder="Name"
                />
                <Input
                  name="email"
                  value={editProfile.email}
                  onChange={handleEditProfileChange}
                  className="text-sm h-8 px-2"
                  placeholder="Email"
                  type="email"
                />
                <Input
                  name="phone"
                  value={editProfile.phone}
                  onChange={handleEditProfileChange}
                  className="text-sm h-8 px-2"
                  placeholder="Phone Number"
                  type="tel"
                />
                <Input
                  name="location"
                  value={editProfile.location}
                  onChange={handleEditProfileChange}
                  className="text-sm h-8 px-2"
                  placeholder="Location"
                />
                <Button
                  size="sm"
                  className="h-8 px-3 text-xs font-normal mt-2 self-end"
                  onClick={handleProfileSave}
                  disabled={profileLoading}
                >
                  {profileLoading ? "Saving..." : "Save"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Change Password Button */}
      <Card className="border border-gray-100 shadow-none">
        <CardContent className="p-4 flex items-center">
          <span className="text-sm font-medium text-gray-900">Change Password</span>
          <Button
            size="sm"
            className="ml-auto h-8 px-3 text-xs font-normal"
            onClick={() => setPasswordModal(true)}
          >
            Change Password
          </Button>
        </CardContent>
      </Card>

      {/* Change Password Modal */}
      {passwordModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-2 z-50">
          <Card className="w-full max-w-md border border-gray-100 shadow-lg">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-3">
                <span className="text-base font-semibold text-gray-900">Change Password</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-xs"
                  onClick={() => setPasswordModal(false)}
                  type="button"
                >
                  ×
                </Button>
              </div>
              <div className="flex flex-col gap-2">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="old"
                  value={password.old}
                  onChange={e => setPassword({ ...password, old: e.target.value })}
                  className="text-sm h-8 px-2"
                  placeholder="Old Password"
                />
                <Input
                  type={showPassword ? "text" : "password"}
                  name="new"
                  value={password.new}
                  onChange={e => setPassword({ ...password, new: e.target.value })}
                  className="text-sm h-8 px-2"
                  placeholder="New Password"
                />
                <Input
                  type={showPassword ? "text" : "password"}
                  name="confirm"
                  value={password.confirm}
                  onChange={e => setPassword({ ...password, confirm: e.target.value })}
                  className="text-sm h-8 px-2"
                  placeholder="Confirm New Password"
                />
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={() => setShowPassword(v => !v)}
                    id="show-password"
                  />
                  <label htmlFor="show-password" className="text-xs text-gray-700">Show Passwords</label>
                </div>
                <Button
                  size="sm"
                  className="h-8 px-3 text-xs font-normal mt-1 self-end"
                  onClick={handlePasswordSave}
                  disabled={passwordLoading}
                >
                  {passwordLoading ? "Saving..." : "Save"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Notification Preferences */}
      <Card className="border border-gray-100 shadow-none">
        <CardContent className="p-4 flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-900 mb-1">Notification Preferences</span>
          <div className="flex items-center gap-2">
            <Switch
              checked={notifications.email}
              onCheckedChange={v => setNotifications(n => ({ ...n, email: v }))}
              className="scale-90"
              id="email-notif"
            />
            <label htmlFor="email-notif" className="text-xs text-gray-700">Email Notifications</label>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              checked={notifications.inApp}
              onCheckedChange={v => setNotifications(n => ({ ...n, inApp: v }))}
              className="scale-90"
              id="inapp-notif"
            />
            <label htmlFor="inapp-notif" className="text-xs text-gray-700">In-App Notifications</label>
          </div>
          <Button
            size="sm"
            className="h-8 px-3 text-xs font-normal mt-1 self-end"
            onClick={handleNotifSave}
            disabled={notifLoading}
          >
            {notifLoading ? "Saving..." : "Save"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage; 