// Hash map - score name -> score's csv file (expo implementation using require)
export const csvAssetMap: Record<string, any> = {
  air_on_the_g_string: require("../../assets/air_on_the_g_string/baseline/aotgs_solo_100bpm.csv"),
  schumann_melodyVLCduet: require("../../assets/schumann_melodyVLCduet/baseline/schumann_melody_4sec.csv"),
  ode_to_joy: require("../../assets/ode_to_joy/baseline/ode_to_joy_300bpm.csv"),
};
