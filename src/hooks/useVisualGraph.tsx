import React from "react";
import useKnowledgeGraph, {
  findSourceNodesWithEdgeLabel,
  findTargetNodesWithEdgeLabel
} from "./useKnowledgeGraph";
//import KnowledgeGraph from "./KnowledgeGraph";

import cytoscape from "cytoscape";
import cola from "cytoscape-cola";
import { displayInfoSidePanel } from "../components/SlidePanelContainer";
import entityData from "../content/entityData";
import entityDescriptions from "../content/entityDescriptions";

import style from "./visualGraphStyle";

let timeouts = [];
export default function useVisualGraph(
  knowledgeGraph,
  startingNode,
  predicateConnections,
  openingStatement
) {
  const [elements, setElements] = React.useState([]);

  const graphContainer = React.useRef<HTMLDivElement>(null);
  const graph = React.useRef<cytoscape.Core>();
  const layout = React.useRef<cytoscape.Layouts>();

  // Timer management
  //const [timeouts, setTimeouts] = React.useState([]);
  const removeTimeout = (timeout) => {
    clearTimeout(timeout);
    let tempTimeouts = timeouts;
    tempTimeouts.splice(timeouts.indexOf(timeout), 1);
    //setTimeouts(tempTimeouts);
    timeouts = tempTimeouts;
  };
  const addTimeout = (func, delayLength) => {
    let timeout = setTimeout(() => {
      func();
      removeTimeout(timeout);
    }, delayLength);
    //setTimeouts([...timeouts, timeout]);
    timeouts = [...timeouts, timeout];
  };
  const removeAllTimeouts = () => {
    // alert(timeouts.length);
    timeouts.forEach((timeout) => {
      console.log(timeout);
      clearTimeout(timeout);
    });
    //setTimeouts([]);
    timeouts = [];
  };

  const addGraphConnection = (
    nodeLabel: string,
    connectedNodeLabel: string,
    isOnlyEdge: boolean,
    size: number,
    extraData?: any
  ) => {
    extraData = extraData ? extraData : {};
    if (entityData[connectedNodeLabel]) {
      extraData = { ...extraData, ...entityData[connectedNodeLabel] };
    }
    if (extraData) {
      extraData.width = extraData.width ? extraData.width : size;
      extraData.height = extraData.height ? extraData.height : size;
    }
    console.log(connectedNodeLabel);
    const nodeId = !isOnlyEdge
      ? connectedNodeLabel
      : `${nodeLabel}_-_${connectedNodeLabel}-node`;
    elements.push({
      data: {
        id: nodeId,
        label: extraData.backgroundImage ? "" : connectedNodeLabel,
        generation: 0,
        size: size,
        ...extraData
      },
      locked: false, // when locked a node's position is immutable (default false)
      selectable: false, // whether the selection state is mutable (default true)
      grabbable: false, // whether the node can be grabbed and moved by the user
      pannable: false, // whether dragging the node causes panning instead of grabbing
      position: extraData.position
    });
    if (nodeLabel) {
      elements.push({
        data: {
          id: `${nodeLabel}-${connectedNodeLabel}-edge`,
          source: nodeLabel,
          target: nodeId,
          generation: 0,
          weight: 1,
          ...extraData
        },
        locked: false, // when locked a node's position is immutable (default false)
        selectable: false, // whether the selection state is mutable (default true)
        grabbable: false, // whether the node can be grabbed and moved by the user
        pannable: false // whether dragging the node causes panning instead of grabbing
      });
    }
  };

  const [previousNodes, setPreviousNodes] = React.useState([]);
  const [edgeLabels, setEdgeLabels] = React.useState([]);
  const [edgeDepth, setEdgeDepth] = React.useState(-1);
  const displayGraphBasedOnEdgeRelations = (nodeKey, edgeLabelsArray) => {
    //alert("display");
    elements.push({
      data: {
        generation: 0,
        layer: 0,
        id: nodeKey,
        label: entityData[nodeKey]
          ? entityData[nodeKey].backgroundImage
            ? ""
            : nodeKey
          : nodeKey,
        ...entityData[nodeKey]
      }
    });
    let newElements = structuredClone(elements);
    setElements(newElements);
    //setGeneration(0);

    //let previousNodes = [nodeKey]; // Sets nodes at each iteration
    addTimeout(() => {
      setPreviousNodes([nodeKey]);
      setEdgeLabels(edgeLabelsArray);
      setEdgeDepth(0);
    }, 2000);
  };

  React.useEffect(() => {
    // alert(
    //   previousNodes.length +
    //     ", " +
    //     edgeLabels.length +
    //     " - " +
    //     (baseKnowledgeGraph ? "yes" : "no")
    // );
    if (
      previousNodes.length &&
      edgeLabels.length &&
      edgeDepth < edgeLabels.length &&
      knowledgeGraph
    ) {
      let nodesThisLevel = [];
      addTimeout(() => {
        const edgeLabel = edgeLabels[edgeDepth];
        previousNodes.forEach((previousNode) => {
          //alert(previousNode);
          const currentNodes = findTargetNodesWithEdgeLabel(
            knowledgeGraph,
            previousNode,
            edgeLabel
          );
          for (let i = 0; i < currentNodes.length; i++) {
            const currentNode = currentNodes[i];
            console.log(
              "PREVIOUS NODE",
              previousNode,
              "CURRENT NODE",
              currentNode
            );
            // edgeDepth >= 1
            addGraphConnection(previousNode, currentNode, false, 200, {
              layer: edgeDepth
              //backgroundImage: KraftiesLogoImage,
              // backgroundWidth: "100%",
              // backgroundHeight: "52%",
              // borderWidth: 3,
              // borderColor: "black"
            });
          }

          nodesThisLevel = [...nodesThisLevel, ...currentNodes];
        });

        const newElements = structuredClone(elements);
        setElements(newElements);

        if (edgeDepth >= edgeLabels.length - 1) {
          addTimeout(() => {
            graph.current.nodes().forEach((node) => {
              if (node.data().shrinkWidth) {
                console.log("shrink");
                node.animate({
                  style: {
                    width: node.data().shrinkWidth,
                    height: node.data().shrinkHeight
                  },
                  duration: 100
                });
              }
            });
          }, 1000);

          addTimeout(() => {
            //cy.$("#j").shift({ x: 10, y: 20 });
            graph.current.nodes().forEach((node) => {
              // if (node.id() === "Kris Gano") {
              //   let targetSize = node.style().width + (4 - Math.random() * 8);
              //   node.animate({
              //     style: {
              //       width: targetSize,
              //       height: targetSize
              //     },
              //     duration: 5000
              //   });
              // }
              animateDriftAway(node);
            });
          }, 1000);

          addTimeout(() => {
            if (knowledgeGraph.hasNode("Kris Gano"))
              displayInfoSidePanel("Kris Gano");
          }, 1000);

          setPreviousNodes([]);
          setEdgeLabels([]);
          setEdgeDepth(-1);
        } else {
          setEdgeDepth(edgeDepth + 1);
          setPreviousNodes(nodesThisLevel);
        }
      }, 1000);
    }
  }, [
    previousNodes,
    edgeLabels,
    edgeDepth,
    knowledgeGraph,
    predicateConnections,
    startingNode
  ]);

  /////////////////////////////////

  const initNewCytoscapeGraph = () => {
    try {
      // if (!graph.current) {
      cytoscape.use(cola);
      graph.current = cytoscape({
        elements,
        style,
        maxZoom: 1,
        minZoom: 0.1,
        wheelSensitivity: 0.2,
        container: graphContainer.current
        //autolock: true
      });
      graph.current.autoungrabify(false);
      graph.current.autounselectify(false);

      graph.current.on("tap", "node", function (evt) {
        const nodeKey = evt.target.id();
        displayInfoSidePanel(nodeKey);
      });

      graph.current.on("grabon", "node", (e) => {
        e.preventDefault();
        //e.stopImmediatePropagation();
        e.stopPropagation();
        return false;
      });

      graph.current.nodes().ungrabify();

      //graph.current = graph.current;
      graph.current.on("add", "node", (e) => {
        graph.current.fit();
      });
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    if (knowledgeGraph?.size) {
      if (graph.current) {
        //alert("clearing");
        //initNewCytoscapeGraph();
        removeAllTimeouts();
        layout?.current?.stop();
        graph?.current?.stop(true, true);
        graph?.current?.nodes().stop();
        graph?.current?.remove(graph?.current?.elements());
        //setTimeout(() => {
        //graph?.current?.destroy();
        setTimeout(() => {
          setElements([]);
        }, 100);
        //}, 100);
        return;
      }

      //////////////////////////////////
      // if (!graphContainer.current) {
      //   return;
      // }

      /*
      return () => {
        graph.current && graph.current.destroy();
      };
      */
      initNewCytoscapeGraph();

      /////////////////////////////////////
    }
  }, [knowledgeGraph]);

  React.useEffect(() => {
    if (elements?.length === 0 && graph?.current?.elements().length === 0) {
      initNewCytoscapeGraph();
    }
  }, [elements]);

  React.useEffect(() => {
    if (!graph.current) {
      initNewCytoscapeGraph();
    }

    if (graph?.current?.elements().length === 0) {
      // Display graph based on edge relationships
      displayGraphBasedOnEdgeRelations(startingNode, predicateConnections);

      addTimeout(() => {
        if (knowledgeGraph.hasNode(startingNode)) {
          addGraphConnection(startingNode, openingStatement, false, 800, {
            position: { x: 1600, y: 300 },
            fontSize: 100,
            layer: 1,
            background: "default",
            color: "white",
            backgroundWidth: "100%",
            backgroundHeight: "100%",
            backgroundOpacity: 0
          });

          let newElements = structuredClone(elements);
          setElements(newElements);
        }
      }, 1000);
    }
  }, [elements]);

  React.useEffect(() => {
    if (graph.current) {
      if (layout.current) {
        layout.current.stop();
      }

      graph.current.add(elements);
      layout.current = graph.current.elements().makeLayout({
        name: "cose",
        fit: true,
        // Ideal edge (non nested) length
        idealEdgeLength: function (edge) {
          return 0.01;
        },

        // Divisor to compute edge forces
        edgeElasticity: function (edge) {
          if (edge.data().layer === 1) return 2;
          else return 5;
        },

        // Node repulsion (non overlapping) multiplier
        nodeRepulsion: function (node) {
          if (node.data().layer === 1) return 1;
          else return 1;
        },

        // Node repulsion (overlapping) multiplier
        nodeOverlap: 1000,

        // Nesting factor (multiplier) to compute ideal edge length for nested edges
        nestingFactor: 10,

        animate: true,

        // Easing of the animation for animate:'end'
        animationEasing: true,

        // The duration of the animation for animate:'end'
        animationDuration: 100,

        // Gravity force (constant)
        gravity: 5,

        // Cooling factor (how the temperature is reduced between consecutive iterations
        coolingFactor: 0.992,

        // Lower temperature threshold (below this point the layout will end)
        minTemp: 0.01
      });
      layout.current.run();
    }
  }, [elements]);

  const animateDriftAway = (node) => {
    const originalPosition = structuredClone(node.position());
    node.animate({
      position: {
        x: node.position().x + (25 - Math.random() * 50),
        y: node.position().y + (25 - Math.random() * 50)
      },
      duration: 2500,
      complete: () => {
        animateDriftToward(node, originalPosition);
      }
    });
  };
  const animateDriftToward = (node, position) => {
    node.animate({
      position: {
        x: position.x,
        y: position.y
      },
      duration: 2500,
      complete: () => {
        animateDriftAway(node);
      }
    });
  };

  React.useEffect(() => {}, []);
  /////////////////////////////////

  return {
    graphContainer,
    visualGraphElements: elements,
    setVisualGraphElements: setElements,
    addGraphConnection,
    displayGraphBasedOnEdgeRelations
  };
}
