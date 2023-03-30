import * as React from "react";
import ReactMarkdown from "react-markdown";

import { useWindowSize } from "@react-hook/window-size";

import SlidingPanel from "react-sliding-side-panel";
import "react-sliding-side-panel/lib/index.css";


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
      <div>
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
      </div>
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
          onClick={() => {
	  	setOpenPanel(false)
        }}>
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

export default SlidePanelContainer;
