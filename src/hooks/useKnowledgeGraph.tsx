import React from "react";
import KnowledgeGraph from "graphology";

export default function useKnowledgeGraph(statements) {
  const [knowledgeGraph, setKnowledgeGraph] = React.useState();

  React.useEffect(() => {
    //alert("statements changed");
  }, [statements]);

  // Initialize KnowledgeGraph
  React.useEffect(() => {
    let tempKnowledgeGraph = new KnowledgeGraph();
    statements.forEach((statement) => {
      console.log(statement);
      for (let i = 0; i < statement.length - 1; i += 2) {
        const subject = statement[i];
        const predicate = statement[i + 1];
        const object = statement[i + 2];
        console.log(subject, predicate, object);
        if (!tempKnowledgeGraph.hasNode(subject)) {
          console.log("subject");
          tempKnowledgeGraph.addNode(subject, {
            size: 15,
            label: subject
            //type: "image",
            //image: "./user.svg"
          });
        }
        if (!tempKnowledgeGraph.hasNode(object)) {
          console.log("object");
          tempKnowledgeGraph.addNode(object, {
            size: 15,
            label: object
            //type: "image",
            //image: "./user.svg"
          });
        }

        if (!tempKnowledgeGraph.hasEdge(subject, object)) {
          tempKnowledgeGraph.addEdge(subject, object, {
            type: "line",
            label: predicate,
            size: 5
          });
        }
      }
    });
    setKnowledgeGraph(tempKnowledgeGraph);
  }, [statements]);

  return knowledgeGraph;
}

export const findSourceNodesWithEdgeLabel = (
  knowledgeGraph,
  nodeKey,
  edgeLabel
) => {
  return knowledgeGraph.reduceEdges(
    nodeKey,
    (acc, _, attributes, source, target) => {
      if (attributes.label === edgeLabel) {
        //acc.push(target);
        acc.push(source);
      }
      return acc;
    },
    []
  );
};

export const findTargetNodesWithEdgeLabel = (
  knowledgeGraph,
  nodeKey,
  edgeLabel
) => {
  return knowledgeGraph.reduceEdges(
    nodeKey,
    (acc, _, attributes, source, target) => {
      if (attributes.label === edgeLabel) {
        acc.push(target);
        //acc.push(source);
      }
      return acc;
    },
    []
  );
};
