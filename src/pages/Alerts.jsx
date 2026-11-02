import React, { useMemo, useState } from 'react';
import './alerts.css';

import { alerts, alertFilters } from "../data/portalData.js";

const initialAlerts = alerts;
const filters = alertFilters;

export default function Alerts() {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filteredAlerts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return alerts.filter((item) => {
      const matchesFilter = activeFilter === "All" || item.outcome === activeFilter;
      const matchesSearch = !query || [item.id, item.rule, item.ruleCode, item.channel, item.product, item.customer, item.outcome, item.caseId ?? ""]
        .some((value) => String(value).toLowerCase().includes(query));
      return matchesFilter && matchesSearch;
    });
  }, [alerts, activeFilter, search]);

  const countFor = (status) =>
    status === "All" ? alerts.length : alerts.filter((item) => item.outcome === status).length;

  const handleOpenCase = (item) => {
    if (item.caseId) {
      window.alert(`Opening ${item.caseId}`);
    } else {
      const newCaseId = `CASE-${1000 + alerts.length + 1}`;
      setAlerts((current) =>
        current.map((a) => a.id === item.id ? { ...a, caseId: newCaseId } : a)
      );
    }
  };

  return (
    <div className="page-content">
      <h4>Alerts</h4>
      <p>View and manage AML alerts across all channels.</p>

      <section className="alerts-panel">
        <div className="alerts-toolbar">
          <div className="filter-tabs">
            {filters.map((filter) => (
              <button
                key={filter}
                className={`filter-tab ${activeFilter === filter ? "selected" : ""}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter !== "All" && (
                  <span className={`filter-dot ${filter.toLowerCase()}`}></span>
                )}
                {filter}
                <span className="filter-count">{countFor(filter)}</span>
              </button>
            ))}
          </div>

          <div className="alert-search">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Search alert, rule or customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button className="clear-search" onClick={() => setSearch("")}>×</button>
            )}
          </div>
        </div>

        <div className="table-scroll">
          <table className="alerts-table">
            <thead>
              <tr>
                <th>ALERT</th>
                <th>RULE TRIGGERED</th>
                <th>CHANNEL</th>
                <th>PRODUCT</th>
                <th>CUSTOMER</th>
                <th>OUTCOME</th>
                <th>RAISED</th>
                <th>CASE</th>
              </tr>
            </thead>
            <tbody>
              {filteredAlerts.map((item) => (
                <tr key={item.id}>
                  <td className="alert-id">{item.id}</td>
                  <td>
                    <div className="rule-name">{item.rule}</div>
                    <small className="rule-code">{item.ruleCode}</small>
                  </td>
                  <td>
                    <span className={`channel-badge ${item.channel.toLowerCase().replaceAll(" ", "-")}`}>
                      {item.channel}
                    </span>
                  </td>
                  <td><span className="product-badge">◈ {item.product}</span></td>
                  <td>{item.customer}</td>
                  <td>
                    <span className={`outcome-badge ${item.outcome.toLowerCase()}`}>
                      <span className="outcome-dot"></span>
                      {item.outcome}
                    </span>
                  </td>
                  <td className="raised-date">{item.raised}</td>
                  <td>
                    <button className="case-button" onClick={() => handleOpenCase(item)}>
                      {item.caseId ? `View ${item.caseId}` : "Open Case"}
                    </button>
                  </td>
                </tr>
              ))}
              {filteredAlerts.length === 0 && (
                <tr>
                  <td colSpan="8" className="empty-state">No alerts found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="table-footer">
          Showing {filteredAlerts.length} of {alerts.length} alerts
        </div>
      </section>
    </div>
  );
}
