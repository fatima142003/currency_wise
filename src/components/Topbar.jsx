import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Bell,
  Check,
  ChevronDown,
  LogOut,
  Search,
  Settings,
  UserRound,
  X,
} from "lucide-react";
import "./topbar.css";
import { pageNames, notifications } from "../data/portalData.js";

const initialNotifications = notifications;

export default function Topbar() {
  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState(null);
  const [notifications, setNotifications] = useState(initialNotifications);
  const actionsRef = useRef(null);
  const location = useLocation();
  const unreadCount = notifications.filter((notification) => !notification.read).length;
  const routeName = location.pathname.split("/").filter(Boolean).pop();
  const pageTitle = pageNames[location.pathname] ||
    routeName?.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ") ||
    "Dashboard";

  useEffect(() => {
    if (!openMenu) return undefined;

    function closeOnOutsideClick(event) {
      if (!actionsRef.current?.contains(event.target)) setOpenMenu(null);
    }

    function closeOnEscape(event) {
      if (event.key === "Escape") setOpenMenu(null);
    }

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [openMenu]);

  function markAllAsRead() {
    setNotifications((current) => current.map((notification) => ({ ...notification, read: true })));
  }

  return (
    <header className="topbar">
      <div className="topbar-page">
        <h1>{pageTitle}</h1>
        <nav className="topbar-breadcrumb" aria-label="Breadcrumb">
          <Link to="/dashboard">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{pageTitle}</span>
        </nav>
      </div>

      <form className="topbar-search" role="search" onSubmit={(event) => event.preventDefault()}>
        <Search className="search-icon" size={18} aria-hidden="true" />
        <input
          type="search"
          aria-label="Search anything"
          placeholder="Search anything..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        {search && (
          <button className="search-clear" type="button" aria-label="Clear search" onClick={() => setSearch("")}>
            <X size={16} aria-hidden="true" />
          </button>
        )}
      </form>

      <div className="topbar-actions" ref={actionsRef}>
        <div className="topbar-menu-anchor">
          <button
            className="notification-button"
            type="button"
            aria-label={`Notifications, ${unreadCount} unread`}
            aria-expanded={openMenu === "notifications"}
            aria-controls="notification-menu"
            onClick={() => setOpenMenu((current) => current === "notifications" ? null : "notifications")}
          >
            <Bell size={20} aria-hidden="true" />
            {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
          </button>
          {openMenu === "notifications" && (
            <section className="topbar-dropdown notification-dropdown" id="notification-menu" aria-labelledby="notification-heading">
              <div className="notification-heading">
                <div>
                  <h2 id="notification-heading">Notifications</h2>
                  <span>{unreadCount} unread</span>
                </div>
                <button className="mark-read-button" type="button" onClick={markAllAsRead} disabled={unreadCount === 0}>
                  <Check size={15} aria-hidden="true" />
                  Mark all as read
                </button>
              </div>
              <ul className="notification-list">
                {notifications.map((notification) => (
                  <li className={`notification-item${notification.read ? " is-read" : ""}`} key={notification.id}>
                    <span className="notification-status" aria-hidden="true" />
                    <div className="notification-copy">
                      <strong>{notification.title}</strong>
                      <p>{notification.description}</p>
                      <time>{notification.time}</time>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <span className="topbar-divider" aria-hidden="true" />

        <div className="topbar-menu-anchor profile-anchor">
          <button
            className="profile-button"
            type="button"
            aria-label="System Admin profile menu"
            aria-expanded={openMenu === "profile"}
            aria-controls="profile-menu"
            onClick={() => setOpenMenu((current) => current === "profile" ? null : "profile")}
          >
            <span className="profile-avatar" aria-hidden="true">SA</span>
            <span className="profile-details">
              <strong>System Admin</strong>
              <span>Administrator</span>
            </span>
            <ChevronDown className="profile-chevron" size={16} aria-hidden="true" />
          </button>
          {openMenu === "profile" && (
            <div className="topbar-dropdown profile-dropdown" id="profile-menu">
              <button type="button" onClick={() => setOpenMenu(null)}><UserRound size={17} aria-hidden="true" />Profile</button>
              <button type="button" onClick={() => setOpenMenu(null)}><Settings size={17} aria-hidden="true" />Settings</button>
              <span className="profile-menu-divider" />
              <button type="button" onClick={() => setOpenMenu(null)}><LogOut size={17} aria-hidden="true" />Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
