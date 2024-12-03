export const baseColors = {
  white: "white",
  failure: "#ED4B9E",
  failure33: "#ED4B9E33",
  primary: "#1bf696", // buttons, primary text
  primary0f: "#1FC7D40f",
  primary3D: "#1FC7D43D",
  primaryBright: "#53DEE9",
  primaryDark: "#0098A1",
  success: "#31D0AA",
  success19: "#31D0AA19",
  warning: "#FFB237",
  warning2D: "#ED4B9E2D",
  warning33: "#ED4B9E33",
};

export const additionalColors = {
  binance: "#F0B90B",
  overlay: "#452a7a",
  gold: "#FFC700",
  silver: "#B2B2B2",
  bronze: "#E7974D",
  yellow: "#D67E0A",
};

// same as darkColors
export const lightColors = {
  ...baseColors,
  ...additionalColors,
  secondary: "#1bf696", // "favorite" text
  secondary80: "#7364ff80",
  background: "#000000",
  backgroundDisabled: "#3c3742",
  backgroundAlt: "#08060B", // header
  backgroundAlt2: "rgba(39, 38, 44, 0.7)",
  backgroundHover: "rgba(0, 0, 0, 0.04)",
  backgroundTapped: "rgba(0, 0, 0, 0.08)",
  card: "#27262C",
  cardBorder: "#383241",
  contrast: "#FFFFFF",
  dropdown: "#1E1D20",
  dropdownDeep: "#100C18",
  invertedContrast: "#FFFFFF", // button text
  input: "#000000", // swap input
  inputSecondary: "#262130",
  primaryDark: "#0098A1",
  tertiary: "#353547",
  tertiary20: "#E2EDEE",
  text: "#F4EEFF",
  text99: "#F4EEFF99",
  textDisabled: "#666171",
  textSubtle: "#d5d9ff",
  disabled: "#524B63",
  primary10: "#13393C",
  primary20: "#094D53",
  primary60: "#48D0DB",
  positive10: "#0C3A32",
  positive20: "#035345",
  positive60: "#3DDBB5",
  destructive10: "#551146",
  destructive20: "#7B194D",
  destructive60: "#FB7EC1",
  destructive: "#ED4B9E",
  gradientPrimary: "linear-gradient(228.54deg, #1FC7D4 -13.69%, #9A6AFF 91.33%)",
  gradientBubblegum: "linear-gradient(139.73deg, #0c0e25 0%, #050611 100%)", // discover ecosystem
  gradientInverseBubblegum: "linear-gradient(139.73deg, #3D2A54 0%, #313D5C 100%)",
  gradientCardHeader: "linear-gradient(166.77deg, #3B4155 0%, #3A3045 100%)",
  gradientBlue: "linear-gradient(180deg, #00707F 0%, #19778C 100%)",
  gradientViolet: "linear-gradient(180deg, #6C4999 0%, #6D4DB2 100%)",
  gradientVioletAlt: "linear-gradient(180deg, #434575 0%, #66578D 100%)",
  gradientGold: "linear-gradient(180deg, #FFD800 0%, #FDAB32 100%)",
  gradientBold: "linear-gradient(#53DEE9, #9A6AFF)",
};

// update lightColors when making changes
export const darkColors = {
  ...baseColors,
  ...additionalColors,
  secondary: "#1bf696", // "favorite" text
  secondary80: "#7364ff80",
  background: "#000000",
  backgroundDisabled: "#3c3742",
  backgroundAlt: "#08060B", // header
  backgroundAlt2: "rgba(39, 38, 44, 0.7)",
  backgroundHover: "rgba(0, 0, 0, 0.04)",
  backgroundTapped: "rgba(0, 0, 0, 0.08)",
  card: "#27262C",
  cardBorder: "#383241",
  contrast: "#FFFFFF",
  dropdown: "#1E1D20",
  dropdownDeep: "#100C18",
  invertedContrast: "#FFFFFF", // button text
  input: "#000000", // swap input
  inputSecondary: "#262130",
  primaryDark: "#0098A1",
  tertiary: "#353547",
  tertiary20: "#E2EDEE",
  text: "#F4EEFF",
  text99: "#F4EEFF99",
  textDisabled: "#666171",
  textSubtle: "#d5d9ff",
  disabled: "#524B63",
  primary10: "#13393C",
  primary20: "#094D53",
  primary60: "#48D0DB",
  positive10: "#0C3A32",
  positive20: "#035345",
  positive60: "#3DDBB5",
  destructive10: "#551146",
  destructive20: "#7B194D",
  destructive60: "#FB7EC1",
  destructive: "#ED4B9E",
  gradientPrimary: "linear-gradient(228.54deg, #1FC7D4 -13.69%, #9A6AFF 91.33%)",
  gradientBubblegum: "linear-gradient(139.73deg, #0c0e25 0%, #050611 100%)", // discover ecosystem
  gradientInverseBubblegum: "linear-gradient(139.73deg, #3D2A54 0%, #313D5C 100%)",
  gradientCardHeader: "linear-gradient(166.77deg, #3B4155 0%, #3A3045 100%)",
  gradientBlue: "linear-gradient(180deg, #00707F 0%, #19778C 100%)",
  gradientViolet: "linear-gradient(180deg, #6C4999 0%, #6D4DB2 100%)",
  gradientVioletAlt: "linear-gradient(180deg, #434575 0%, #66578D 100%)",
  gradientGold: "linear-gradient(180deg, #FFD800 0%, #FDAB32 100%)",
  gradientBold: "linear-gradient(#53DEE9, #9A6AFF)",
};
