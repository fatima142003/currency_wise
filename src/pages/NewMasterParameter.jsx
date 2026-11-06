import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { ParameterCategoryList } from "../data/portalData";
import "./NewMasterParameter.css";

const types = [
  ["Boolean", "Yes / No", "True or false"],
  ["Integer", "Whole number", "Counts, days, months"],
  ["Decimal", "Number", "Amounts and percentages"],
  ["Enum", "One of a list", "Pick one option"],
  ["List", "Several of a list", "Pick multiple options"],
  ["String", "Text", "Free text"],
  ["Date", "Date", "A calendar date"],
];

const blankParameter = {
  category: "",
  section: "",
  code: "",
  name: "",
  description: "",
  appliesTo: "Transaction",
  type: "Boolean",
  defaultValue: "True",
  governance: "Modifiable",
  approvedBy: "",
  sourceReference: "",
  active: true,
};

export default function NewMasterParameter() {
  const navigate = useNavigate();
  const [parameter, setParameter] = useState(blankParameter);

  function change(field, value) {
    setParameter({ ...parameter, [field]: value });
  }

  function save(event) {
    event.preventDefault();

    if (!parameter.category || !parameter.code.trim() || !parameter.name.trim()) {
      return;
    }

    let savedParameters = [];
    try {
      savedParameters = JSON.parse(localStorage.getItem("masterParameters") || "[]");
      if (!Array.isArray(savedParameters)) savedParameters = [];
    } catch {
      savedParameters = [];
    }

    savedParameters.push({ ...parameter, id: String(Date.now()) });
    localStorage.setItem("masterParameters", JSON.stringify(savedParameters));
    navigate("/master-parameters");
  }

  return (
    <main className="new-master-parameter-page">
      <div className="new-master-parameter-titlebar">
        <div>
          <button className="new-master-back" type="button" onClick={() => navigate("/master-parameters")}>
            <ArrowLeft size={14} /> All master parameters
          </button>
          <h1>New master parameter</h1>
        </div>
        <button className="new-master-create" type="submit" form="parameter-form">
          <Check size={14} /> Create parameter
        </button>
      </div>

      <form id="parameter-form" onSubmit={save}>
        <div className="new-master-layout">
          <div className="new-master-main">
            <section className="new-master-card">
              <header><h2>What it is</h2><p>Where the parameter lives and what it controls</p></header>
              <div className="new-master-fields">
                <label>Category
                  <select required value={parameter.category} onChange={(e) => change("category", e.target.value)}>
                    <option value="">Choose...</option>
                    {ParameterCategoryList.map((item) => <option key={item.code} value={item.code}>{item.category}</option>)}
                  </select>
                </label>
                <label>Section (optional)
                  <input value={parameter.section} onChange={(e) => change("section", e.target.value)} placeholder="e.g. CDD & Onboarding" />
                </label>
                <label className="new-master-full">Code
                  <input required value={parameter.code} onChange={(e) => change("code", e.target.value.toUpperCase().replace(/\s+/g, "_"))} placeholder="OTC_IND_VERIFY_ELECTRONIC_ENABLED" />
                  <small>Unique key used by rules and tenants.</small>
                </label>
                <label className="new-master-full">Name
                  <input required value={parameter.name} onChange={(e) => change("name", e.target.value)} placeholder="Allow electronic identity verification" />
                </label>
                <label className="new-master-full">Description (optional)
                  <textarea rows="2" value={parameter.description} onChange={(e) => change("description", e.target.value)} placeholder="What the parameter controls" />
                </label>
                <fieldset className="new-master-full">
                  <legend>Applies to</legend>
                  <div className="new-master-choice-row">
                    {["Customer onboarding", "Transaction"].map((item) => (
                      <button key={item} type="button" className={`new-master-choice${parameter.appliesTo === item ? " selected" : ""}`} onClick={() => change("appliesTo", item)}>
                        <strong>{item}</strong>
                        <small>{item === "Transaction" ? "Checked on each order or transaction" : "Checked when a customer is onboarded"}</small>
                      </button>
                    ))}
                  </div>
                </fieldset>
              </div>
            </section>

            <section className="new-master-card">
              <header><h2>Value</h2><p>Choose the kind of value this parameter uses</p></header>
              <div className="new-master-fields">
                <fieldset className="new-master-full">
                  <legend>Type</legend>
                  <div className="new-master-type-grid">
                    {types.map(([value, title, help]) => (
                      <button key={value} type="button" className={`new-master-type${parameter.type === value ? " selected" : ""}`} onClick={() => change("type", value)}>
                        <strong>{title}</strong><small>{help}</small><span>{value.toUpperCase()}</span>
                      </button>
                    ))}
                  </div>
                </fieldset>
                <label className="new-master-default">Default value
                  {parameter.type === "Boolean" ? (
                    <span className="new-master-toggle-group">
                      {["True", "False"].map((value) => <button key={value} type="button" className={parameter.defaultValue === value ? "selected" : ""} onClick={() => change("defaultValue", value)}>{value}</button>)}
                    </span>
                  ) : (
                    <input type={parameter.type === "Integer" || parameter.type === "Decimal" ? "number" : "text"} value={parameter.defaultValue} onChange={(e) => change("defaultValue", e.target.value)} />
                  )}
                </label>
              </div>
            </section>

            <section className="new-master-card">
              <header><h2>Governance</h2><p>Who may change this parameter</p></header>
              <div className="new-master-fields">
                <fieldset className="new-master-full">
                  <div className="new-master-choice-row">
                    {["Modifiable", "Fixed by law"].map((item) => (
                      <button key={item} type="button" className={`new-master-choice${parameter.governance === item ? " selected" : ""}`} onClick={() => change("governance", item)}>
                        <strong>{item}</strong><small>{item === "Modifiable" ? "Tenants can change this value." : "Tenants cannot change this value."}</small>
                      </button>
                    ))}
                  </div>
                </fieldset>
                <label>Approved by (optional)
                  <input value={parameter.approvedBy} onChange={(e) => change("approvedBy", e.target.value)} placeholder="CO, SM, Act §43" />
                </label>
                <label>Source reference (optional)
                  <input value={parameter.sourceReference} onChange={(e) => change("sourceReference", e.target.value)} placeholder="Controls Manual §3.1" />
                </label>
                <label className="new-master-active new-master-full">
                  <span><strong>Active</strong><small>Inactive parameters cannot be used.</small></span>
                  <input type="checkbox" checked={parameter.active} onChange={(e) => change("active", e.target.checked)} />
                </label>
              </div>
            </section>
          </div>

          <aside className="new-master-card new-master-preview">
            <header><h2>Preview</h2><p>How this appears in the catalogue</p></header>
            <div className="new-master-preview-body">
              <strong>{parameter.name || "Parameter name"}</strong>
              <small className="new-master-code-preview">{parameter.code || "CODE"}</small>
              <div className="new-master-badges"><span>{parameter.type}</span><span>{parameter.appliesTo}</span><span>{parameter.governance}</span></div>
              <div className="new-master-default-preview"><small>DEFAULT</small><strong>{parameter.defaultValue || "—"}</strong></div>
              <p>Tenants will start with this default value.</p>
            </div>
          </aside>
        </div>
      </form>
    </main>
  );
}
