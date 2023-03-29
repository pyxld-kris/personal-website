import * as React from "react";
import ReactMarkdown from "react-markdown";
import { useWindowSize } from "@react-hook/window-size";

import DisplaySelector from "../components/DisplaySelector";
import SlidingPanel from "react-sliding-side-panel";
import "react-sliding-side-panel/lib/index.css";

import Graph from "../components/Graph";

import useKnowledgeGraph from "../hooks/useKnowledgeGraph";

import displayConfigs from "../content/displayConfigs";
import entityDescriptions from "../content/entityDescriptions";

export let openSidePanel, displayInfoSidePanel;

function SlidePanelContainer({ knowledgeGraph }) {
  const [openPanel, setOpenPanel] = React.useState(false);
  const [panelContent, setPanelContent] = React.useState("");
  const [panelRelatedSection, setPanelRelatedSection] = React.useState("");

  const [windowWidth, windowHeight] = useWindowSize();

  // React.useEffect(() => {
  //   alert(knowledgeGraph?.reduceEdges);
  // }, [knowledgeGraph]);

  displayInfoSidePanel = (nodeKey) => {
    let description = entityDescriptions[nodeKey] || "# " + nodeKey;

    let relatedSection = (
      <>
        <hr />
        <h4>Related</h4>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginBottom: "5rem"
          }}
        >
          {knowledgeGraph
            ?.reduceEdges(
              nodeKey,
              (acc, _, attributes, source, target) => {
                if (acc.indexOf(source) === -1) acc.push(source);
                if (acc.indexOf(target) === -1) acc.push(target);
                return acc;
              },
              []
            )
            .map((neighbor) => {
              return (
                <button
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "blue",
                    cursor: "pointer",
                    padding: ".5rem",
                    textDecoration: "underline"
                  }}
                  onClick={() => {
                    displayInfoSidePanel(neighbor, knowledgeGraph);
                  }}
                >
                  {neighbor}
                </button>
              );
            })}
        </div>
      </>
    );

    if (description) openSidePanel(true, description, relatedSection);
  };

  React.useEffect(() => {
    openSidePanel = (bool, content, relatedSection) => {
      setPanelContent(content);
      setPanelRelatedSection(relatedSection);
      setOpenPanel(bool);
    };
  }, []);

  return (
    <div
      className="panel-container"
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "transparent",
        zIndex: 101,
        pointerEvents: "none"
        //overflow: "hidden"
      }}
    >
      <SlidingPanel
        type={"right"}
        isOpen={openPanel}
        size={windowWidth > windowHeight ? 30 : 90}
        backdropClicked={() => setOpenPanel(false)}
        panelClassName="additional-class"
        noBackdrop={false}
      >
        <button
          style={{ position: "absolute", left: 0, top: 0, border: "none" }}
          onClick={() => setOpenPanel(false)}
        >
          X
        </button>
        <div
          style={{
            pointerEvents: "all",
            width: "calc(100%-1rem)",
            height: "100%",
            //position: "absolute",
            //left: 0,
            //display: "flex",
            //flexDirection: "column",
            //alignItems: "flex-start",
            //justifyContent: "flex-start",
            overflow: "auto",
            padding: "1rem"
          }}
        >
          <ReactMarkdown parserOptions={{ commonmark: true }}>
            {panelContent?.replaceAll("\n", "  \n")}
          </ReactMarkdown>
          {panelRelatedSection}
        </div>
      </SlidingPanel>
    </div>
  );
}

const DisplayedGraph: React.FunctionComponent<{}> = ({}) => {
  const displayConfig = displayConfigs["Intro"];

  const [filters, setFilters] = React.useState(["Intro"]);
  const [statements, setStatements] = React.useState([]);
  const [predicateConnections, setPredicateConnections] = React.useState([]);
  const [startingNode, setStartingNode] = React.useState();

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
      />
    </div>
  );
};

export default DisplayedGraph;
