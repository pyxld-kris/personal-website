const COLORS = {
  red: "#ff0000",
  purple: "#43447a",
  black: "#000000",
  white: "#ffffff"
};

const nodeStyles = [
  {
    selector: "node",
    style: {
      "transition-property": "background-color border-color",
      "transition-duration": "0.3s",
      "transition-timing-function": "ease-in-sine",
      "text-halign": "center",
      "text-valign": "center"
    }
  },
  {
    selector: "[background]",
    style: {
      "background-color": "data(background)"
    }
  },
  {
    selector: "[label]",
    style: {
      label: "data(label)"
    }
  },
  {
    selector: "[width]",
    style: {
      width: "data(width)"
    }
  },
  {
    selector: "[height]",
    style: {
      height: "data(height)"
    }
  },
  {
    selector: "[color]",
    style: {
      color: "data(color)"
    }
  },
  {
    selector: "[borderWidth]",
    style: {
      "border-width": "data(borderWidth)"
    }
  },
  {
    selector: "[borderColor]",
    style: {
      "border-color": "data(borderColor)"
    }
  },
  {
    selector: "[backgroundImage]",
    style: {
      "background-image": "data(backgroundImage)"
    }
  },
  {
    selector: "[backgroundWidth]",
    style: {
      "background-width": "data(backgroundWidth)"
    }
  },
  {
    selector: "[backgroundHeight]",
    style: {
      "background-height": "data(backgroundHeight)"
    }
  },
  {
    selector: "[backgroundOpacity]",
    style: {
      "background-opacity": "data(backgroundOpacity)"
    }
  },
  {
    selector: "[fontSize]",
    style: {
      "font-size": "data(fontSize)"
    }
  }
];
const edgeStyles = [
  {
    selector: "edge",
    style: {
      width: "5",
      "curve-style": "bezier",
      "target-arrow-shape": "triangle",
      "target-arrow-color": COLORS.white,
      "line-color": COLORS.white,
      events: "no",
      opacity: ".5",
      "background-color": "#ffffff",
      "edge-scale": ".05",
      "arrow-scale": "2"
    }
  }
];

export default [...nodeStyles, ...edgeStyles];
