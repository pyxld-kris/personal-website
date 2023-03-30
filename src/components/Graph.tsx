import * as React from "react";

import useVisualGraph from "../hooks/useVisualGraph";

const Graph: React.FunctionComponent<{
  knowledgeGraph: any;
  predicateConnections: any;
  startingNode: any;
}> = ({ knowledgeGraph, predicateConnections, startingNode, openingStatement }) => {
  const {
    graphContainer,
    visualGraphElements,
    setVisualGraphElements,
    addGraphConnection,
    displayGraphBasedOnEdgeRelations
  } = useVisualGraph(knowledgeGraph, startingNode, predicateConnections, openingStatement);

  return <div className="graph" ref={graphContainer} />;
};

export default Graph;
