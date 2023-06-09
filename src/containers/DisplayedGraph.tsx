import * as React from "react";

import DisplaySelector from "../components/DisplaySelector";
import SlidePanelContainer from "../components/SlidePanelContainer";

import Graph from "../components/Graph";

import { openSidePanel } from "../components/SlidePanelContainer";
import useKnowledgeGraph from "../hooks/useKnowledgeGraph";

import displayConfigs from "../content/displayConfigs";

const DisplayedGraph: React.FunctionComponent<{}> = ({}) => {
  const displayConfig = Object.values(displayConfigs)[0];
console.log(displayConfig);
console.log(Object.keys(displayConfigs)[0]);
  const [filters, setFilters] = React.useState([Object.keys(displayConfigs)[0]]);
  const [statements, setStatements] = React.useState([]);
  const [predicateConnections, setPredicateConnections] = React.useState([]);
  const [startingNode, setStartingNode] = React.useState();
  const [openingStatement, setOpeningStatement] = React.useState([]);

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     setFilters(["Website Visitor"]);
  //   }, 1000);
  // }, []);

  React.useEffect(() => {
    let filter = filters[0];
    let displayConfig = displayConfigs[filter];
    setPredicateConnections(displayConfig.predicateConnections);
    setStartingNode(displayConfig.startingNode);
    setStatements(displayConfig.statements);
    setOpeningStatement(displayConfig.openingStatement);
    //alert("done");
  }, [filters]);

  let knowledgeGraph = useKnowledgeGraph(statements);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <SlidePanelContainer knowledgeGraph={knowledgeGraph} />
      <div className="container">
        <div className="stars"></div>
        <div className="twinkling"></div>
        {[...Array(30)].map(() => {
          console.log("making it");
          return (
            <div className="circle-container">
              <div className="circle"></div>
            </div>
          );
        })}
      </div>
      <DisplaySelector
        options={Object.keys(displayConfigs)}
        setSelections={setFilters}
      />
      <Graph
        key={"graph-container"}
        openSidePanel={openSidePanel}
        // elements={elements.filter(
        //   (element) => element.data.generation === generation
        // )}
        knowledgeGraph={knowledgeGraph}
        predicateConnections={predicateConnections}
        startingNode={startingNode}
	openingStatement={openingStatement}
      />
    </div>
  );
};

export default DisplayedGraph;
