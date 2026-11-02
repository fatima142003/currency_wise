
import { NavLink } from "react-router-dom";
import "./sliderbar.css";
import { navigation, portal } from "../data/portalData.js";

function SliderBar() {
  const menuSections = navigation;

  return (
    <aside className="side-bar">
      {/* Logo */}
      <div className="hero-slider">
        <div className="logo">🛡️</div>

        <div className="name">
          <h2>
            {portal.name.split(" ")[0]} <span>{portal.name.split(" ").slice(1).join(" ")}</span>
          </h2>
        </div>
      </div>

     

      {/* Main navigation */}
      <nav className="sidebar-navigation">
        {/* Dashboard */}
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <span className="menu-icon">▦</span>
          <span className="menu-text">Dashboard</span>
        </NavLink>

        {menuSections.map((section) => (
          <div className="menu-section" key={section.title}>
            <p className="section-title">{section.title}</p>

            {section.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  isActive ? "menu-item active" : "menu-item"
                }
              >
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-text">{item.label}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

     

    
    </aside>
  );
}

export default SliderBar;
