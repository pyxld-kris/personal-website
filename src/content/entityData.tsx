import KraftiesLogoImage from "../images/KraftiesLogo.png";

const EXTRA_SMALL_SIZE = 120;
const SMALL_SIZE = 220;
const MEDIUM_SIZE = 300;
const LARGE_SIZE = 400;
const EXTRA_LARGE_SIZE = 500;
const BASE_CONFIG = {
  layer: 2,
  fontSize: 50,
  color: "white"
  //background: "white",
  //backgroundOpacity: 0
};
const EXTRA_SMALL_CONFIG = {
  ...BASE_CONFIG,
  fontSize: 30,
  width: 400,
  height: 400,
  shrinkWidth: EXTRA_SMALL_SIZE,
  shrinkHeight: EXTRA_SMALL_SIZE
};
const SMALL_CONFIG = {
  ...BASE_CONFIG,
  fontSize: 30,
  width: 400,
  height: 400,
  shrinkWidth: SMALL_SIZE,
  shrinkHeight: SMALL_SIZE
};
const MEDIUM_CONFIG = {
  ...BASE_CONFIG,
  fontSize: 40,
  width: 400,
  height: 400,
  shrinkWidth: MEDIUM_SIZE,
  shrinkHeight: MEDIUM_SIZE
};
const LARGE_CONFIG = {
  ...BASE_CONFIG,
  fontSize: 50,
  width: 400,
  height: 400,
  shrinkWidth: LARGE_SIZE,
  shrinkHeight: LARGE_SIZE
};
const EXTRA_LARGE_CONFIG = {
  ...BASE_CONFIG,
  fontSize: 50,
  width: 400,
  height: 400,
  shrinkWidth: EXTRA_LARGE_SIZE,
  shrinkHeight: EXTRA_LARGE_SIZE
};
const entityData = {
  "Kris Gano": {
    layer: 0,
    width: 600,
    height: 600,
    shrinkWidth: 300,
    shrinkHeight: 300,
    degree: 11,
    background: "default",
    color: "white",
    borderWidth: 3,
    borderColor: "white",
    backgroundImage: "https://avatars.githubusercontent.com/u/46331884?v=4",
    backgroundWidth: "100%",
    backgroundHeight: "100%",
    position: { x: 600, y: 600 }
  },
  //////////////
  Krafties: {
    ...LARGE_CONFIG,
    layer: 1,
    background: "#327de4",
    color: "white",
    backgroundImage: KraftiesLogoImage,
    backgroundWidth: "100%",
    backgroundHeight: "52%",
    borderWidth: 3,
    borderColor: "white"
  },
  "Dev Launchers": {
    ...EXTRA_LARGE_CONFIG,
    layer: 1,
    background: "#111111",
    color: "white",
    backgroundImage:
      "data:image/png;base64,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",
    backgroundWidth: "70%",
    backgroundHeight: "70%",
    borderWidth: 3,
    borderColor: "white"
  },
  Pyxld: {
    ...MEDIUM_CONFIG,
    layer: 1,
    background: "white",
    color: "white",
    backgroundImage:
      "https://cdn.discordapp.com/icons/695791200052969482/08d5c36c4e9fcb63c873b0f6b847f851.jpg",
    backgroundWidth: "100%",
    backgroundHeight: "100%",
    borderWidth: 3,
    borderColor: "white"
  },
  "BLANK Humanity": {
    ...EXTRA_SMALL_CONFIG,
    layer: 1,
    background: "white",
    color: "white",
    backgroundImage:
      "https://pbs.twimg.com/profile_images/1506404227207286785/_pnNXw1K_400x400.jpg",
    backgroundWidth: "90%",
    backgroundHeight: "100%",
    borderWidth: 3,
    borderColor: "white"
  },
  Heartstrings: {
    ...EXTRA_SMALL_CONFIG,
    layer: 1,
    background: "white",
    color: "white",
    backgroundImage:
      "https://media-exp1.licdn.com/dms/image/C4E0BAQEThPwmXsDNbQ/company-logo_200_200/0/1549563199417?e=1672876800&v=beta&t=aaR2hb5tAT7Znla4FjD9W0otJ96J2AHhQJGNrzN9Fxs",
    backgroundWidth: "100%",
    backgroundHeight: "100%",
    borderWidth: 3,
    borderColor: "white"
  },
  "Technical Consulting": {
    ...SMALL_CONFIG,
    layer: 1,
    background: "white",
    color: "white",
    backgroundImage:
      "https://media-exp1.licdn.com/dms/image/C4D0BAQGvup0lbefHSQ/company-logo_200_200/0/1538686576218?e=1672876800&v=beta&t=2Dx8LMLJBnkbvWRAOA9N6JfhebC0kEk7I03K2oLHpcA",
    backgroundWidth: "100%",
    backgroundHeight: "100%",
    borderWidth: 3,
    borderColor: "white"
  },
  //////////////
  "Game Developer": {
    ...LARGE_CONFIG,
    backgroundOpacity: 0
  },
  "Game Designer": {
    ...LARGE_CONFIG,
    backgroundOpacity: 0
  },
  Developer: {
    ...LARGE_CONFIG,
    backgroundOpacity: 0
  },
  Programmer: {
    ...SMALL_CONFIG,
    backgroundOpacity: 0
  },
  Artist: {
    ...SMALL_CONFIG,
    backgroundOpacity: 0
  },
  "3D Modeler": {
    ...SMALL_CONFIG,
    backgroundOpacity: 0
  },
  "Texture Artist": {
    ...SMALL_CONFIG,
    backgroundOpacity: 0
  },
  "Character Designer": {
    ...SMALL_CONFIG,
    backgroundOpacity: 0
  },
  "Indie Game Dev": {
    ...LARGE_CONFIG,
    backgroundOpacity: 0
  },
  President: {
    ...LARGE_CONFIG,
    backgroundOpacity: 0
  },
  Mentor: {
    ...SMALL_CONFIG,
    backgroundOpacity: 0
  },
  Chairman: {
    ...LARGE_CONFIG,
    backgroundOpacity: 0
  },
  Founder: {
    ...LARGE_CONFIG,
    backgroundOpacity: 0
  },
  "Brand Identity Designer": {
    ...SMALL_CONFIG,
    backgroundOpacity: 0
  },
  "Community Builder": {
    ...LARGE_CONFIG,
    backgroundOpacity: 0
  },
  "Blockchain Developer": {
    ...LARGE_CONFIG,
    backgroundOpacity: 0
  },
  Visionary: {
    ...SMALL_CONFIG,
    backgroundOpacity: 0
  }
};

export default entityData;
