import { ArrowRight, ArrowUpRight, BellRing, Boxes, CircleCheck, Clock3, FileWarning, ShieldCheck, Waypoints } from "lucide-react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import { alerts, cases, channels, dashboardData, products } from "../data/portalData.js";

const outcomeStyle = {
  Block: "blocked",
  Escalate: "escalated",
  Review: "review",
};

const outcomeColors = {
  Block: "#d9485f",
  Escalate: "#dc9a2c",
  Review: "#4a7de0",
};

function Dashboard() {
  const openCaseCount = cases.filter((item) => item.status.toLowerCase() === "open").length;
  const reviewCount = alerts.filter((item) => item.outcome === "Review").length;
  const escalatedCount = alerts.filter((item) => item.outcome === "Escalate").length;
  const blockedCount = alerts.filter((item) => item.outcome === "Block").length;
  const outcomeTotal = Math.max(alerts.length, 1);
  const metrics = dashboardData.metrics.map((metric) => {
    if (metric.label === "Open alerts") return { ...metric, value: alerts.length, icon: FileWarning, color: "blue" };
    if (metric.label === "Active products") return { ...metric, value: products.filter((product) => product.status.toLowerCase() === "active").length, icon: Boxes, color: "violet" };
    if (metric.label === "Configured channels") return { ...metric, value: channels.length, icon: Waypoints, color: "teal" };
    return { ...metric, icon: ShieldCheck, color: "amber" };
  });

  return (
    <div className="dashboard-page">
      <section className="dashboard-welcome">
        <div>
                  <h1>{dashboardData.heading}</h1>
          <p>{dashboardData.description}</p>
        </div>
        <Link className="dashboard-primary-link" to="/alerts"><BellRing size={16} /> Review alerts <ArrowRight size={15} /></Link>
      </section>

      <section className="dashboard-metrics" aria-label="Portal overview">
        {metrics.map(({ label, value, icon: Icon, color }) => (
          <article className="dashboard-metric" key={label}>
            <span className={`metric-icon ${color}`}><Icon size={19} /></span>
            <div className="metric-copy"><span>{label}</span><strong>{value}</strong></div>
            <ArrowUpRight className="metric-trend" size={16} aria-hidden="true" />
          </article>
        ))}
      </section>

      <div className="dashboard-main-grid">
        <section className="dashboard-card dashboard-alerts-card">
          <header className="dashboard-card-heading">
            <div><h2>Recent alerts</h2><p>Latest activity across your monitoring channels</p></div>
            <Link to="/alerts" className="dashboard-text-link">View all <ArrowRight size={14} /></Link>
          </header>
          <div className="dashboard-alert-list">
            {alerts.slice(0, 5).map((alert) => (
              <article className="dashboard-alert-row" key={alert.id}>
                <span className={`alert-outcome-icon ${outcomeStyle[alert.outcome] || "review"}`}><FileWarning size={16} /></span>
                <div className="dashboard-alert-copy"><strong>{alert.rule}</strong><span>{alert.id} <i /> {alert.customer}</span></div>
                <span className={`dashboard-outcome ${outcomeStyle[alert.outcome] || "review"}`}>{alert.outcome}</span>
                <time>{alert.raised}</time>
              </article>
            ))}
            {alerts.length === 0 && <p className="dashboard-empty">No alerts have been recorded.</p>}
          </div>
        </section>

        <section className="dashboard-card dashboard-outcomes-card">
          <header className="dashboard-card-heading"><div><h2>Alert outcomes</h2><p>Distribution by decision</p></div></header>
          <div className="outcome-total"><strong>{alerts.length}</strong><span>Total alerts</span></div>
          <div className="outcome-bar" aria-label={`${blockedCount} blocked, ${escalatedCount} escalated, ${reviewCount} under review`}>
            <span className="outcome-bar-blocked" style={{ width: `${(blockedCount / outcomeTotal) * 100}%` }} />
            <span className="outcome-bar-escalated" style={{ width: `${(escalatedCount / outcomeTotal) * 100}%` }} />
            <span className="outcome-bar-review" style={{ width: `${(reviewCount / outcomeTotal) * 100}%` }} />
          </div>
          <div className="outcome-legend">
            {[{ label: "Blocked", count: blockedCount, key: "Block" }, { label: "Escalated", count: escalatedCount, key: "Escalate" }, { label: "Review", count: reviewCount, key: "Review" }].map((item) => (
              <div className="outcome-legend-row" key={item.label}><span><i style={{ background: outcomeColors[item.key] }} />{item.label}</span><strong>{item.count}</strong></div>
            ))}
          </div>
          <Link to="/alerts" className="outcome-detail-link">Open alert queue <ArrowRight size={14} /></Link>
        </section>
      </div>

      <section className="dashboard-card dashboard-channels-card">
        <header className="dashboard-card-heading">
          <div><h2>Channel monitoring</h2><p>Alert activity grouped by configured channel</p></div>
          <Link to="/channel-config" className="dashboard-text-link">Configure channels <ArrowRight size={14} /></Link>
        </header>
        <div className="channel-monitor-grid">
          {channels.map((channel) => {
            const channelAlerts = alerts.filter((alert) => alert.channel === channel.name);
            const channelCases = cases.filter((item) => item.channel === channel.name || (channel.name === "OTC Retail" && item.channel === "OTC"));
            return (
              <article className="channel-monitor-item" key={channel.name}>
                <div className="channel-monitor-icon"><Waypoints size={17} /></div>
                <div className="channel-monitor-info"><strong>{channel.name}</strong><span>{channelAlerts.length} alerts <i /> {channelCases.length} cases</span></div>
                <span className="monitor-status"><i /> Monitored</span>
              </article>
            );
          })}
        </div>
      </section>

      <footer className="dashboard-footer-note"><CircleCheck size={15} /><span>Monitoring overview is based on the portal’s local configuration data.</span><span className="dashboard-footer-spacer" /><Clock3 size={14} /><span>Demo data</span></footer>
    </div>
  );
}

export default Dashboard;
