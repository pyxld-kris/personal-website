const displayConfigs = {
  Intro: {
    startingNode: "Kris Gano",
    predicateConnections: [
      "number 1 connects",
      "number 2 connects",
      "number 3 connects",
      "number 4 connects",
      "number 5 connects"
    ],
    statements: [
      ["Kris Gano", "number 1 connects", "2"],
      ["2", "number 2 connects", "3"],
      ["3", "number 3 connects", "4"],
      ["4", "number 4 connects", "5"],
      ["5", "number 5 connects", "6"]
    ]
  },
  "Website Visitor": {
    startingNode: "Kris Gano",
    predicateConnections: ["contributed to", "with the role of"],
    statements: [
      // Dev Launchers
      [
        "Kris Gano",
        "contributed to",
        "Dev Launchers",
        "with the role of",
        "Developer"
      ],
      [
        "Kris Gano",
        "contributed to",
        "Dev Launchers",
        "with the role of",
        "President"
      ],
      [
        "Kris Gano",
        "contributed to",
        "Dev Launchers",
        "with the role of",
        "Chairman"
      ],
      [
        "Kris Gano",
        "contributed to",
        "Dev Launchers",
        "with the role of",
        "Founder"
      ],
      [
        "Kris Gano",
        "contributed to",
        "Dev Launchers",
        "with the role of",
        "Mentor"
      ],
      [
        "Kris Gano",
        "contributed to",
        "Dev Launchers",
        "with the role of",
        "Brand Identity Designer"
      ],

      // Krafties
      [
        "Kris Gano",
        "contributed to",
        "Krafties",
        "with the role of",
        "Game Developer"
      ],
      [
        "Kris Gano",
        "contributed to",
        "Krafties",
        "with the role of",
        "Game Designer"
      ],
      ["Kris Gano", "contributed to", "Krafties", "with the role of", "Artist"],
      [
        "Kris Gano",
        "contributed to",
        "Krafties",
        "with the role of",
        "Developer"
      ],
      [
        "Kris Gano",
        "contributed to",
        "Krafties",
        "with the role of",
        "Texture Artist"
      ],
      [
        "Kris Gano",
        "contributed to",
        "Krafties",
        "with the role of",
        "Character Designer"
      ],
      [
        "Kris Gano",
        "contributed to",
        "Krafties",
        "with the role of",
        "3D Modeler"
      ],

      // Pyxld
      ["Kris Gano", "contributed to", "Pyxld", "with the role of", "Founder"],
      [
        "Kris Gano",
        "contributed to",
        "Pyxld",
        "with the role of",
        "Community Builder"
      ],
      [
        "Kris Gano",
        "contributed to",
        "Pyxld",
        "with the role of",
        "Game Developer"
      ],

      // BLANK Humanity
      [
        "Kris Gano",
        "contributed to",
        "BLANK Humanity",
        "with the role of",
        "Blockchain Developer"
      ],
      [
        "Kris Gano",
        "contributed to",
        "BLANK Humanity",
        "with the role of",
        "Visionary"
      ],

      // Heartstrings
      [
        "Kris Gano",
        "contributed to",
        "Heartstrings",
        "with the role of",
        "Founder"
      ],

      // Contractor
      [
        "Kris Gano",
        "contributed to",
        "Technical Consulting",
        "with the role of",
        "Programmer"
      ],

      /*** Corporate Structures ***/
      ["Dev Launchers", "is structured as", "Nonprofit"],
      ["Krafties", "is structured as", "Corporation"],
      ["Pyxld", "is structured as", "Benefit Corporation"],

      /*** Skills ***/
      ["Kris Gano", "has the skills of", "Founder"],
      ["Kris Gano", "has the skills of", "Developer"],
      ["Kris Gano", "has the skills of", "Blockchain Developer"],
      ["Kris Gano", "has the skills of", "3D Modeler"],
      ["Kris Gano", "has the skills of", "Texture Artist"],
      ["Kris Gano", "has the skills of", "Community Builder"],
      ["Kris Gano", "has the skills of", "Game Developer"],
      ["Kris Gano", "has the skills of", "Game Designer"],
      ["Kris Gano", "has the skills of", "Indie Game Dev"],
      ["Kris Gano", "has the skills of", "President"],
      ["Kris Gano", "has the skills of", "Chairman"],
      ["Kris Gano", "has the skills of", "Brand Identity Designer"]
    ]
  },
  Startup: {
    startingNode: "Kris Gano",
    predicateConnections: ["contributed to", "with the role of"],
    statements: [
      // Dev Launchers
      [
        "Kris Gano",
        "contributed to",
        "Winky",
        "with the role of",
        "Developloler"
      ],
      ["Kris Gano", "contributed to", "DPinky", "with the role of", "lululul"]
    ]
  },
  "Technical Recruiter": {
    startingNode: "Kris Gano",
    predicateConnections: ["has the skills of"],
    statements: [
      /*** Skills ***/
      ["Kris Gano", "has the skills of", "Founder"],
      ["Kris Gano", "has the skills of", "Developer"],
      ["Kris Gano", "has the skills of", "Blockchain Developer"],
      ["Kris Gano", "has the skills of", "3D Modeler"],
      ["Kris Gano", "has the skills of", "Texture Artist"],
      ["Kris Gano", "has the skills of", "Community Builder"],
      ["Kris Gano", "has the skills of", "Game Developer"],
      ["Kris Gano", "has the skills of", "Game Designer"],
      ["Kris Gano", "has the skills of", "Indie Game Dev"],
      ["Kris Gano", "has the skills of", "President"],
      ["Kris Gano", "has the skills of", "Chairman"],
      ["Kris Gano", "has the skills of", "Brand Identity Designer"]
    ]
  },
  "Seeking A Career In Tech": {
    startingNode: "Kris Gano",
    predicateConnections: ["contributed to", "with the role of"],
    statements: []
  },
  Student: {
    startingNode: "Kris Gano",
    predicateConnections: ["contributed to", "with the role of"],
    statements: []
  },
  "Sequence Test": {
    startingNode: "1",
    predicateConnections: [
      "number 1 connects",
      "number 2 connects",
      "number 3 connects",
      "number 4 connects",
      "number 5 connects"
    ],
    statements: [
      ["1", "number 1 connects", "2"],
      ["2", "number 2 connects", "3"],
      ["3", "number 3 connects", "4"],
      ["4", "number 4 connects", "5"],
      ["5", "number 5 connects", "6"]
    ]
  }
};

export default displayConfigs;
