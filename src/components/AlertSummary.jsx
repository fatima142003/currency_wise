import { alertSummary } from "../data/portalData.js";

export default function AlertSummary() {
  return (
    <section className="alert-summary">
      {alertSummary.map((item) => (
        <div className="summary-card" key={item.title}>
          <div className="summary-heading">
            <span className={`status-dot ${item.color}`}></span>
            <span>{item.title}</span>
          </div>

          <h2>{item.count}</h2>

          <p className={item.color}>{item.label}</p>
        </div>
      ))}
    </section>
  );
}
