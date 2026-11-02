import { useState } from "react";
import {
  ArrowLeftRight,
  Building2,
  Check,
  FileText,
  Globe,
  Plus,
  ShieldCheck,
  SlidersHorizontal,
  UserRound,
  X,
} from "lucide-react";
import "./channelConfig.css";
import { initialDocuments, channels, channelTabs } from "../data/portalData.js";

const iconByName = { UserRound, Building2, Globe };
const initialChannels = channels.map((channel) => ({
  ...channel,
  icon: iconByName[channel.icon] || Building2,
}));
const tabIcons = {
  "KYC Documents": FileText,
  "Risk Scoring": ShieldCheck,
  "Transaction Limits": ArrowLeftRight,
};
const tabs = channelTabs.map((name) => ({ name, icon: tabIcons[name] }));

export default function ChannelConfig() {
  const [activeChannel, setActiveChannel] = useState(initialChannels[0].name);
  const [activeTab, setActiveTab] = useState(tabs[0].name);
  const [documents, setDocuments] = useState(initialDocuments);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [showChannelModal, setShowChannelModal] = useState(false);
  const [newDocument, setNewDocument] = useState("");
  const [newMandatory, setNewMandatory] = useState(false);
  const [newChannel, setNewChannel] = useState("");
  const channelData = documents[activeChannel];

  function updateDocument(id, changes) {
    setDocuments((current) => ({
      ...current,
      [activeChannel]: {
        ...current[activeChannel],
        "KYC Documents": current[activeChannel]["KYC Documents"].map((doc) =>
          doc.id === id ? { ...doc, ...changes } : doc
        ),
      },
    }));
  }

  function addDocument(event) {
    event.preventDefault();
    const name = newDocument.trim();
    if (!name) return;
    const nextId = Math.max(0, ...Object.values(documents).flatMap((data) => [
      ...data["KYC Documents"].map((doc) => doc.id),
      ...data["Risk Scoring"].map((item) => item.id),
    ])) + 1;
    setDocuments((current) => ({
      ...current,
      [activeChannel]: {
        ...current[activeChannel],
        "KYC Documents": [...current[activeChannel]["KYC Documents"], {
          id: nextId, name, mandatory: newMandatory, enabled: true, months: 12,
        }],
      },
    }));
    setNewDocument("");
    setNewMandatory(false);
    setShowDocumentModal(false);
  }

  function addChannel(event) {
    event.preventDefault();
    const name = newChannel.trim();
    if (!name || Object.keys(documents).some((item) => item.toLowerCase() === name.toLowerCase())) return;
    setDocuments((current) => ({
      ...current,
      [name]: {
        "KYC Documents": [],
        "Risk Scoring": [],
        "Transaction Limits": {
          Daily_Limit: "$0",
          Monthly_Limit: "$0",
          Single_Transaction_Limit: "$0",
        },
      },
    }));
    setActiveChannel(name);
    setNewChannel("");
    setShowChannelModal(false);
  }

  return (
    <main className="channel-config">
      <header className="channel-heading">
        <div>
          <span className="channel-eyebrow">RULE ENGINE / CONFIGURATION</span>
          <h1>Channel Configuration</h1>
          <p>Manage onboarding, risk scoring, and transaction limits for each customer channel.</p>
        </div>
        <button className="cw-primary-button" type="button" onClick={() => setShowChannelModal(true)}>
          <Plus size={16} /> Add channel
        </button>
      </header>

      <div className="channel-layout">
        <aside className="channel-list-card">
          <div className="channel-list-heading">
            <div><h2>Channels</h2><span>{Object.keys(documents).length} configured</span></div>
            <SlidersHorizontal size={17} aria-hidden="true" />
          </div>
          <nav className="channel-list" aria-label="Customer channels">
            {Object.keys(documents).map((name) => {
              const channel = initialChannels.find((item) => item.name === name);
              const Icon = channel?.icon || Building2;
              const selected = name === activeChannel;
              return (
                <button key={name} type="button" className={`channel-choice${selected ? " is-active" : ""}`} onClick={() => setActiveChannel(name)} aria-current={selected ? "page" : undefined}>
                  <span className="channel-choice-icon"><Icon size={18} /></span>
                  <span className="channel-choice-copy"><strong>{name}</strong><small>{documents[name]["KYC Documents"].length} identity documents</small></span>
                  {selected && <span className="channel-choice-indicator" />}
                </button>
              );
            })}
          </nav>
          <div className="channel-aside-note"><ShieldCheck size={17} /><span>Settings apply to new onboarding and transactions.</span></div>
        </aside>

        <section className="channel-detail-card">
          <div className="channel-detail-heading">
            <div>
              <span className="channel-eyebrow">CHANNEL PROFILE</span>
              <h2>{activeChannel}</h2>
              <p>Configure the controls used for this customer segment.</p>
            </div>
            <span className="channel-status"><span /> Active</span>
          </div>

          <div className="channel-tabs" role="tablist" aria-label="Channel settings">
            {tabs.map(({ name, icon: Icon }) => (
              <button key={name} type="button" role="tab" aria-selected={activeTab === name} className={`channel-tab${activeTab === name ? " is-active" : ""}`} onClick={() => setActiveTab(name)}>
                <Icon size={16} />{name}
                {name === "KYC Documents" && <span>{channelData["KYC Documents"].length}</span>}
              </button>
            ))}
          </div>

          {activeTab === "KYC Documents" && (
            <div className="channel-tab-content">
              <div className="config-section-heading">
                <div><h3>Identity documents</h3><p>Choose which documents are collected during onboarding.</p></div>
                <button className="cw-secondary-button" type="button" onClick={() => setShowDocumentModal(true)}><Plus size={15} /> Add document</button>
              </div>
              <div className="config-table-wrap">
                <table className="config-table">
                  <thead><tr><th>DOCUMENT</th><th>REQUIREMENT</th><th>RENEWAL</th><th>STATUS</th><th aria-label="Actions" /></tr></thead>
                  <tbody>
                    {channelData["KYC Documents"].map((document) => (
                      <tr key={document.id} className={!document.enabled ? "is-disabled" : ""}>
                        <td><div className="document-name"><span className="document-icon"><FileText size={17} /></span><strong>{document.name}</strong></div></td>
                        <td><button className={`requirement-pill${document.mandatory ? " is-required" : ""}`} type="button" onClick={() => updateDocument(document.id, { mandatory: !document.mandatory })}>{document.mandatory ? "Mandatory" : "Optional"}</button></td>
                        <td>{document.months} months</td>
                        <td><span className={`document-status${document.enabled ? " is-enabled" : ""}`}><i />{document.enabled ? "Enabled" : "Disabled"}</span></td>
                        <td><button className={`switch${document.enabled ? " is-on" : ""}`} type="button" role="switch" aria-checked={document.enabled} aria-label={`${document.enabled ? "Disable" : "Enable"} ${document.name}`} onClick={() => updateDocument(document.id, { enabled: !document.enabled })}><span /></button></td>
                      </tr>
                    ))}
                    {channelData["KYC Documents"].length === 0 && <tr><td className="config-empty" colSpan="5">No identity documents configured for this channel.</td></tr>}
                  </tbody>
                </table>
              </div>
              <div className="config-footnote"><Check size={15} /> Changes are applied to new onboarding sessions.</div>
            </div>
          )}

          {activeTab === "Risk Scoring" && (
            <div className="channel-tab-content">
              <div className="config-section-heading"><div><h3>Risk factors</h3><p>Points added to a customer’s risk score when a factor applies.</p></div><span className="risk-total">{channelData["Risk Scoring"].reduce((total, item) => total + item.points, 0)} max points</span></div>
              <div className="risk-list">
                {channelData["Risk Scoring"].map((item) => <article className="risk-row" key={item.id}><span className="risk-icon"><ShieldCheck size={17} /></span><div className="risk-copy"><strong>{item.key.replaceAll("_", " ")}</strong><small>Customer risk factor</small></div><span className="risk-points">+{item.points}<small> pts</small></span></article>)}
                {channelData["Risk Scoring"].length === 0 && <div className="config-empty">No risk factors configured for this channel.</div>}
              </div>
            </div>
          )}

          {activeTab === "Transaction Limits" && (
            <div className="channel-tab-content">
              <div className="config-section-heading"><div><h3>Transaction thresholds</h3><p>Maximum transaction values configured for this channel.</p></div></div>
              <div className="limit-grid">
                {Object.entries(channelData["Transaction Limits"]).map(([key, value]) => <article className="limit-card" key={key}><span className="limit-icon"><ArrowLeftRight size={17} /></span><span className="limit-label">{key.replaceAll("_", " ")}</span><strong>{value}</strong><small>Per customer</small></article>)}
              </div>
            </div>
          )}
        </section>
      </div>

      {(showDocumentModal || showChannelModal) && (
        <div className="config-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) { setShowDocumentModal(false); setShowChannelModal(false); } }}>
          <section className="config-modal" role="dialog" aria-modal="true" aria-labelledby="config-modal-title">
            <header><div><span className="channel-eyebrow">CHANNEL CONFIGURATION</span><h2 id="config-modal-title">{showDocumentModal ? "Add identity document" : "Add customer channel"}</h2></div><button type="button" className="modal-close" aria-label="Close" onClick={() => { setShowDocumentModal(false); setShowChannelModal(false); }}><X size={19} /></button></header>
            <form onSubmit={showDocumentModal ? addDocument : addChannel}>
              <label>{showDocumentModal ? "Document name" : "Channel name"}<input autoFocus value={showDocumentModal ? newDocument : newChannel} onChange={(event) => showDocumentModal ? setNewDocument(event.target.value) : setNewChannel(event.target.value)} placeholder={showDocumentModal ? "e.g. Proof of address" : "e.g. Mobile app"} required /></label>
              {showDocumentModal && <label className="modal-checkbox"><input type="checkbox" checked={newMandatory} onChange={(event) => setNewMandatory(event.target.checked)} /> Require this document during onboarding</label>}
              <div className="config-modal-actions"><button type="button" className="cw-secondary-button" onClick={() => { setShowDocumentModal(false); setShowChannelModal(false); }}>Cancel</button><button type="submit" className="cw-primary-button"><Plus size={15} />{showDocumentModal ? "Add document" : "Add channel"}</button></div>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}
