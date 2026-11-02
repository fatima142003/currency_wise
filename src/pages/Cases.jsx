import React, { useMemo, useState } from "react";
import './cases.css';
import { cases as caseData, caseFilters } from "../data/portalData.js";

const initialCases = caseData;
const filters = caseFilters;

export default function Cases() {
  const [cases, setCases] = useState(initialCases);
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filteredCases = useMemo(() => {
    return cases.filter((item) => {
      const matchesFilter = activeFilter === "All" || item.status === activeFilter;
      const query = search.toLowerCase().trim();
      const matchesSearch =
        !query ||
        [item.id, item.rule, item.alert, item.customer, item.channel, item.outcome, item.status]
          .some((value) => value.toLowerCase().includes(query));
      return matchesFilter && matchesSearch;
    });
  }, [cases, activeFilter, search]);

  function updateCaseStatus(caseId, status) {
    setCases((current) =>
      current.map((item) => (item.id === caseId ? { ...item, status } : item))
    );
  }

 return (
    <div className="cases-page">
      <div className="cases-heading">
        <h1>Cases</h1>
        <p>
          Resolution workflow for alerts — required steps are
          driven by each rule's outcome severity, per the
          AML/CTF Rules 2025.
        </p>
      </div>

      <section className="cases-card">
        <div className="cases-toolbar">
          <div className="filter-list">
            {filters.map((filter) => {
              const count =
                filter === "All"
                  ? cases.length
                  : cases.filter((item) => item.status === filter)
                      .length;

              return (
                <button
                  key={filter}
                  className={`filter-button ${
                    activeFilter === filter ? "filter-active" : ""
                  }`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter !== "All" && (
                    <span
                      className={`filter-dot dot-${filter.startsWith("Closed") ? "closed" : filter === "Open" ? "open" : filter === "In Review" ? "review" : "pending"}`}
                    ></span>
                  )}

                  {filter}
                  <span className="filter-count">{count}</span>
                </button>
              );
            })}
          </div>

          <div className="case-search">
            <span>⌕</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search case, rule or customer..."
            />
          </div>
        </div>

        <div className="cases-table-wrap">
          <table className="cases-table">
            <thead>
              <tr>
                <th>CASE</th>
                <th>RULE</th>
                <th>CUSTOMER</th>
                <th>CHANNEL</th>
                <th>OUTCOME</th>
                <th>STATUS</th>
                <th>CHECKLIST</th>
                <th>OPENED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {filteredCases.map((item) => {
                const progress = Math.round(
                  (item.checklistdone / item.checklistTotal) * 100
                );

                return (
                  <tr key={item.id}>
                    <td>
                      <strong className="case-id">{item.id}</strong>
                    </td>

                    <td>
                      <strong className="rule-name">{item.rule}</strong>
                      <span className="alert-id">{item.alert}</span>
                    </td>

                    <td className="customer-cell">{item.customer}</td>

                    <td>
                      <span
                        className={`case-channel ${
                          item.channel === "OTC Retail"
                            ? "channel-otc"
                            : "channel-wholesale"
                        }`}
                      >
                        <span className="channel-dot"></span>
                        {item.channel}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`outcome-badge ${
                          item.outcome === "Block"
                            ? "outcome-block"
                            : "outcome-escalate"
                        }`}
                      >
                        <span className="outcome-dot"></span>
                        {item.outcome}
                      </span>
                    </td>

                    <td>
                      <span className="case-status">
                        <span className="status-dot"></span>
                        {item.status}
                      </span>
                    </td>

                    <td>
                      <div className="checklist-summary">
                        <div className="checklist-numbers">
                          <strong>
                            {item.checklistdone} / {item.checklistTotal}
                          </strong>
                          <span>{progress}%</span>
                        </div>

                        <div className="checklist-track">
                          <div
                            className="checklist-fill"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>

                        <small>{item.nextstep}</small>
                      </div>
                    </td>

                    <td className="opened-cell">{item.opened}</td>

                    <td>
                      <button
                        className="view-button"
                        onClick={() => {}}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}

              {filteredCases.length === 0 && (
                <tr>
                  <td colSpan="9" className="empty-state">
                    No cases match your search or selected status.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="cases-card-footer">
          Showing {filteredCases.length} of {cases.length} cases
        </div>
      </section>
    </div>
  );
}