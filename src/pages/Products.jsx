import './Product.css';
import React,{useState} from 'react';
import { products, productChannels } from "../data/portalData.js";
const initialProducts = products;
const channelNmaes = productChannels;

export default function Products() {
  const [products, setProducts] = useState(initialProducts);
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [form, setForm] = useState({
    name: "",
    service: "",
  });

  function handleAddProduct(event) {
    event.preventDefault();

    const newProduct = {
      id: `PRD-${Date.now().toString().slice(-4)}`,
      name: form.name,
      service: form.service,
      status: "DRAFT",
      channels: [],
      completion: 0,
    };

    setProducts((current) => [...current, newProduct]);
    setForm({ name: "", service: "" });
    setShowForm(false);
  }

  function toggleChannel(productId, channel) {
    setProducts((current) =>
      current.map((product) => {
        if (product.id !== productId) return product;

        const exists = product.channels.includes(channel);

        return {
          ...product,
          channels: exists
            ? product.channels.filter((item) => item !== channel)
            : [...product.channels, channel],
        };
      })
    );
  }




    return (
        <div className="page-content">
            <h4>Products</h4>
            <p>Every product carries its own AUSTRAC designated service and parameter set, loaded alongside channel and rule config.</p>

        
            {showForm && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h3 className="modal-title">New Product</h3>
                        <form className="productname" onSubmit={handleAddProduct}>
                            <label>
                                Product Name
                                <input
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    placeholder="e.g. Prepaid Travel Cards"
                                    required
                                />
                            </label>
                            <label>
                                Designated Service (AML/CTF Act s6)
                                <input
                                    value={form.service}
                                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                                    placeholder="e.g. Table 1, item 50"
                                    required
                                />
                            </label>
                            <label>
                                Product Owner
                                <input
                                    value={form.owner}
                                    onChange={(e) => setForm({ ...form, owner: e.target.value })}
                                    placeholder="e.g. AML/CTF Compliance Officer"
                                    required
                                />
                            </label>
                            <div className="form-info">
                                <span className="info-icon">ⓘ</span>
                                <p>New products start in <strong>DRAFT</strong>. All 10 Universal Parameter Template categories must have at least one parameter before moving to <strong>ACTIVE</strong>.</p>
                            </div>
                            <div className="modal-actions">
                                <button type="submit" className="primary-button">Create Product</button>
                                <button type="button" className="secondary-button" onClick={() => setShowForm(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <section className="Table-Card">
                <div className="card-header">
                    <span className="card-title">Product Registry</span>
                    <button className="primary-button" onClick={() => setShowForm(true)}>+ New Product</button>
                </div>
                <table className="Table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Designated service</th>
                            <th>Status</th>
                            <th>Channels</th>
                            <th>Template complete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>
                                        <div className="product-name">{product.name}</div>
                                        <div className="product-id">{product.id}</div>
                                    </td>
                                <td className="service-cell">{product.services}</td>
                                <td>
                                    <span className={`status-badge ${product.status.toLowerCase()}`}>{product.status}</span>
                                </td>
                                <td>
                                    {product.channels.map((channel) => (
                                        <span
                                            key={channel}
                                            className={`tag ${
                                                product.channels.includes(channel)
                                                    ? "active"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                toggleChannel(product.id, channel)
                                            }>
                                            {channel}
                                        </span>
                                    ))}
                                </td>
                                <td>
                                    <div className="progress-wrap">
                                        <div className="progress-bar">
                                            <div className="progress-fill" style={{width:`${(product.Template_completed/10)*100}%`}} />
                                        </div>
                                        <span className="progress-text">{product.Template_completed}/10</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
                
                <section className='product Matrix'>
                    <div className='Card Tittle'>
                        Product × channel capability matrix
                    </div>
                     <div className="table Scroll">
                        <table className="matrix">
                            <thead>
                                <tr>
                                    <th>Product\Channel</th>
                                    {channelNmaes.map((channel) => (
                                        <th key={channel}>{channel}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        {channelNmaes.map((channel) => (
                                            <td key={`${product.id}-${channel}`}>
                                                <span
                                                    className={`tag ${
                                                        product.channels.includes(channel)
                                                            ? "active"
                                                            : "inactive"
                                                    }`}>
                                                    {product.channels.includes(
                                                        channel
                                                    )
                                                        ? "✓"
                                                        : "✗"}
                                                </span>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                     </div>
                </section>
           
        </div>
    );
}
