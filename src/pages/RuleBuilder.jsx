import { ruleBuilder } from "../data/portalData.js";
function RuleBuilder() {
    return <div className="page-content"><h4>{ruleBuilder.heading}</h4><p>{ruleBuilder.description}</p></div>;
}
export default RuleBuilder;
