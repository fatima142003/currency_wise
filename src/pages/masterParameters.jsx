import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import { masterParameters, parameters } from "../data/portalData";
import "./MasterParameters.css";

const tabs = ["All", "OTC", "WHSL", "ONL", "GLOBAL", "REM", "BUL"];
const savedParametersKey = "masterParameters";

function readParameters() {
  try {
    const saved = JSON.parse(localStorage.getItem(savedParametersKey) || "[]");
    return [...(Array.isArray(parameters) ? parameters : []), ...(Array.isArray(saved) ? saved : [])];
  } catch {
    return Array.isArray(parameters) ? parameters : [];
  }
}

export default function MasterParameters() {
  const navigate = useNavigate();
  const [masterParameterList] = useState(readParameters);
  const [activeTab, setActiveTab] = useState("All");
  const [applyFilter, setApplyFilter] = useState("All Apply Type");
  const [typeFilter, setTypeFilter] = useState("All Type");
  const [search, setSearch] = useState("");

  const filteredParameters = useMemo(() => {
    const query = search.trim().toLowerCase();
    return masterParameterList.filter((parameter) => {
      const matchesTab = activeTab === "All" ||
        parameter.category?.toLowerCase().includes(activeTab.toLowerCase()) ||
        parameter.code?.toLowerCase().startsWith(`${activeTab}-`);
      const matchesApply = applyFilter === "All Apply Type" ||
        parameter.appliesTo?.toLowerCase() === applyFilter.toLowerCase();
      const matchesType = typeFilter === "All Type" || parameter.type === typeFilter;
      const matchesSearch = !query ||
        [parameter.code, parameter.name, parameter.description]
          .some((value) => value?.toLowerCase().includes(query));
      return matchesTab && matchesApply && matchesType && matchesSearch;
    });
  }, [masterParameterList, activeTab, applyFilter, typeFilter, search]);

  return (
    <main className="master-parameter-page">
      <header className="master-parameter-heading">
        <div>
          <h1>{masterParameters.heading}</h1>
          <p>{masterParameters.description}</p>
        </div>
        <button className="Add-paramter" type="button" onClick={() => navigate("/master-parameters/new")}>
          <Plus size={15} /> New Parameters
        </button>
      </header>

      <section className="Master-parameter-card" aria-label="Master parameters">
        <div className="master-parameter-toolbar">
          <div className="master-parameter-tabs" role="tablist" aria-label="Parameter category">
            {tabs.map((tab) => (
              <button key={tab} type="button" role="tab" aria-selected={activeTab === tab}
                className={`orders-tab${activeTab === tab ? " selected" : ""}`}
                onClick={() => setActiveTab(tab)}>
                {tab}{" "}<span className="orders-count">
                  {tab === "All" ? masterParameterList.length : masterParameterList.filter((parameter) =>
                    parameter.category?.toLowerCase().includes(tab.toLowerCase()) ||
                    parameter.code?.toLowerCase().startsWith(`${tab}-`)).length}
                </span>
              </button>
            ))}
          </div>
          <label className="master-parameter-search">
            <Search size={15} aria-hidden="true" />
            <input type="search" value={search} onChange={(event) => setSearch(event.target.value)}
              placeholder="Search parameters" aria-label="Search parameters" />
          </label>
          <select value={applyFilter} onChange={(event) => setApplyFilter(event.target.value)} aria-label="Filter by apply type">
            <option>All Apply Type</option><option>Customer Onboarding</option><option>Transaction</option><option>Not Set</option>
          </select>
          <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)} aria-label="Filter by type">
            <option>All Type</option><option>Boolean</option><option>Integer</option><option>Decimal</option>
            <option>Enum</option><option>List</option><option>String</option><option>Date</option>
          </select>
        </div>
        <div className="master-parameter-table-wrap">
          <table className="master-parameter-table">
            <thead><tr><th>Parameters</th><th>Apply To</th><th>Type</th><th>Default</th><th>Change</th><th>Approved By</th><th>Status</th></tr></thead>
            <tbody>
              {filteredParameters.length ? filteredParameters.map((parameter, index) => (
                <tr key={parameter.id ?? parameter.code ?? index}>
                  <td><strong>{parameter.name || parameter.code || "—"}</strong><small>{parameter.code}</small></td>
                  <td>{parameter.appliesTo || "—"}</td><td>{parameter.type || "—"}</td>
                  <td>{String(parameter.defaultValue ?? "—")}</td><td>{parameter.governance || "—"}</td>
                  <td>{parameter.approvedBy || "—"}</td><td>{parameter.active === false ? "Inactive" : "Active"}</td>
                </tr>
              )) : <tr><td className="master-parameter-empty" colSpan="7">No parameters found.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
