import React from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import SampleTurboModule from './specs/NativeSampleModule';

function App(): React.JSX.Element {
  const [value, setValue] = React.useState('');
  const [reversedValue, setReversedValue] = React.useState('');

  const onPress = () => {
    const revString = SampleTurboModule.reverseString(value);
    setReversedValue(revString);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>
          Welcome to C++ Turbo Native Module Example
        </Text>
        <Text>Write down here he text you want to revert</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Write your text here"
          onChangeText={setValue}
          value={value}
        />
        <Button title="Reverse" onPress={onPress} />
        <Text>Reversed text: {reversedValue}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  },
  textInput: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
});

export default App;

// // Import necessary modules and components from the Expo and React Native libraries
// import {
//   StyleSheet,
//   Text,
//   View,
//   SafeAreaView,
//   TouchableOpacity,
//   useWindowDimensions,
//   ScrollView,
//   Animated,
//   Platform,
// } from "react-native";
// import React, { useEffect, useReducer, useRef, useState } from "react";
// import { Score_Select } from "./src/components/ScoreSelect";
// import reducer_function from "./src/store/Dispatch";
// import ScoreDisplay from "./src/components/ScoreDisplay";
// import Icon from "react-native-vector-icons/Feather";
// import { CENSFeatures } from "./src/audio/FeaturesCENS";
// import FontAwesome from "react-native-vector-icons/FontAwesome";
// import { ExpoMicProcessor } from "./src/audio/ExpoMicProcessor";
// import ScoreFollowerTest from "./src/components/ScoreFollowerTest";
// import {
//   initNativeAudio,
//   initWebAudio,
//   stopLiveAudio,
// } from "./src/utils/liveMicUtils";
// import { useThemeAnimations } from "./src/utils/themeUtils";
// import LoginScreen from "./src/components/LoginScreen";
// import PerformanceStats from "./src/components/PerformanceStats";
// import { getCurrentUser, logoutUser } from "./src/utils/accountUtils";
//
// // Define the main application component
// export default function App() {
//   ////////////////////////////////////////////////////////////////////////////////////
//   // Main state - holds position in the piece, playback rate, etc.
//   ////////////////////////////////////////////////////////////////////////////////////
//   // useReducer returns a state - which is an object initialized to be useReducer's second argument
//   // - and a function (here called "dispatch") which is the only way to update the state.
//   // The reducer_function takes in two arguments ("state" and "action") and returns an object -
//   // when the dispatch function is called, it takes one argument, calls the reducer_function
//   // with the current state as the state and the dispatch function's argument as the action,
//   // and updates the state to be the output of the reducer_function.
//
//   const [state, dispatch] = useReducer(
//     reducer_function, // The reducer function is found in /store/Dispatch.ts
//     {
//       playing: false, // Whether the audio is playing
//       score: "", // The score name we are currently on (followed with .musicxml)
//       accompanimentSound: null, // The accompaniment sound (no applicable in evalautor project but here just in case )
//       tempo: null, // The tempo of the current score  (extracted from musicxml file using helper function "extractTempo()")
//       scores: [], // The list of scores to choose from
//       referenceAudioUri: null as string | null, // Reference to score's top voice audio uri (first instrument)
//       estimatedBeat: null as number | null, // Beat value we think the soloist is at
//       estimatedPitch: null as number | null,
//       bottomAudioUri: null as string | null, // Playback audio uri (for when there is two instruments - ref audio uri to bottom one, only applicable in Companion Project)
//       beatsPerMeasure: 0, // Numerator of time signature used to compute values for the tempo by measure graph (TempoGraph.tsx)
//       loadingPerformance: false, // Boolean indicator to let other components know if we are currently loading a performance or not to enable or disable certain functions
//     },
//   );
//
//   const [chroma, setChroma] = useState<number[]>(new Array(12).fill(0)); // Initialize the chroma state as an array of 12 zeros (used to capture chroma vector at each chunk of audio).
//   const [started, setStarted] = useState(false); // State used to determine user toggled the live microphone option or not
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track if user is logged in
//   const [showStats, setShowStats] = useState(false); // State to toggle statistics view
//   const [currentUser, setCurrentUser] = useState<string | null>(null); // State to store current username
//
//   const processor = useRef(new ExpoMicProcessor()).current; // Create a stable ExpoMicProcessor instance
//   const SAMPLE_RATE = 44100; // Define sample rate for ChromaMaker
//   const N_FFT = 4096; // Define chunk size for ChromaMaker
//   const chromaMaker = useRef(new CENSFeatures(SAMPLE_RATE, N_FFT)).current; // Create a stable ChromaMaker instance
//
//   // Initialize mic to capture live audio when "started" state changes (on mic icon click)
//   useEffect(() => {
//     if (started) {
//       if (Platform.OS === "web") {
//         initWebAudio(setChroma, chromaMaker).catch(console.error); // Web version of live mic
//       } else {
//         initNativeAudio(setChroma, processor, chromaMaker).catch(console.error); // Mobile version of live mic
//       }
//     }
//     return () => {
//       stopLiveAudio(processor); // Stop and clean up live microphone on unmount
//     };
//   }, [started]);
//
//   const {
//     theme, // Variable used to determine the colors of the following styles
//
//     // Dynmaic styles based on "theme"
//     containerBackgroundColor,
//     textColor,
//     invertTextColor,
//     sidebarBackgroundColor,
//     mainContentBackgroundColor,
//     buttonBackgroundColor,
//     borderBottomColor,
//
//     toggleTheme, // Function used to switch themes
//   } = useThemeAnimations(); // Helper function useThemeAnimations() used to obtain dynamic styles (containerBackgroundColor, textColor, etc...) based on theme variable
//
//   const { width, height } = useWindowDimensions(); // Get device's width
//   const isSmallScreen = width < 960; // Boolean used for dynmaic display (row or column)
//
//   // Check if user is logged in on mount
//   useEffect(() => {
//     const checkLoginStatus = async () => {
//       const user = await getCurrentUser();
//       if (user) {
//         setIsLoggedIn(true);
//         setCurrentUser(user.username);
//       }
//     };
//     checkLoginStatus();
//   }, []);
//
//   const handleLogin = async () => {
//     const user = await getCurrentUser();
//     if (user) {
//       setIsLoggedIn(true);
//       setCurrentUser(user.username);
//     }
//   };
//
//   const handleLogout = async () => {
//     await logoutUser();
//     setIsLoggedIn(false);
//     setCurrentUser(null);
//     setShowStats(false);
//     dispatch({ type: "start/stop" }); // Stop any playing audio
//   };
//
//   // Show login screen if not logged in
//   if (!isLoggedIn) {
//     return <LoginScreen onLogin={handleLogin} />;
//   }
//
//   // Show statistics view if toggled
//   if (showStats) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <View style={[styles.menu_bar, { height: 60 }]}>
//           <Text style={[styles.logoText, { fontSize: 24 }]}>
//             Statistics - {currentUser}
//           </Text>
//           <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
//             <TouchableOpacity onPress={() => setShowStats(false)}>
//               <Icon name="x" size={30} color="white" />
//             </TouchableOpacity>
//             <TouchableOpacity onPress={handleLogout}>
//               <Icon name="log-out" size={30} color="white" />
//             </TouchableOpacity>
//           </View>
//         </View>
//         <PerformanceStats />
//       </SafeAreaView>
//     );
//   }
//
//   ////////////////////////////////////////////////////////////////////////////////
//   // Render the component's UI
//   ////////////////////////////////////////////////////////////////////////////////
//   return (
//     // BG Color for iphone padding - no padding if on landscape mode (top and bottom)
//     <SafeAreaView
//       style={[
//         styles.container,
//         { backgroundColor: width < height ? "#2C3E50" : "" },
//       ]}
//     >
//       {/* Account for top padding on Iphone */}
//       <SafeAreaView>
//         {/* Header with image */}
//         <Animated.View
//           style={[
//             styles.menu_bar,
//             { backgroundColor: "#2C3E50", height: isSmallScreen ? 40 : 80 },
//             { position: "relative", top: 0 },
//           ]}
//         >
//           <Text
//             style={[styles.logoText, { fontSize: isSmallScreen ? 18 : 32 }]}
//           >
//             Evaluator - {currentUser}
//           </Text>
//           <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
//             {/* Statistics button */}
//             <TouchableOpacity onPress={() => setShowStats(true)}>
//               <Icon
//                 name="bar-chart-2"
//                 size={isSmallScreen ? 15 : 30}
//                 color="white"
//               />
//             </TouchableOpacity>
//             {/* Logout button */}
//             <TouchableOpacity onPress={handleLogout}>
//               <Icon
//                 name="log-out"
//                 size={isSmallScreen ? 15 : 30}
//                 color="white"
//               />
//             </TouchableOpacity>
//             {/* Light & Dark Mode is disabled for now - due to not looking too good after adding more stuff */}
//             <TouchableOpacity
//               disabled={true}
//               onPress={() => setStarted(!started)}
//             >
//               <FontAwesome
//                 name={started ? "microphone" : "microphone-slash"}
//                 size={isSmallScreen ? 15 : 30}
//                 color="grey"
//               />
//             </TouchableOpacity>
//             {/* Live mic is work in progress with online dtw - also disabled */}
//             <TouchableOpacity disabled={true} onPress={toggleTheme}>
//               <Icon
//                 name={theme === "light" ? "sun" : "moon"}
//                 size={isSmallScreen ? 15 : 30}
//                 color="grey"
//               />
//             </TouchableOpacity>
//           </View>
//         </Animated.View>
//       </SafeAreaView>
//
//       {/* Provides safe area insets for mobile devices */}
//       <Animated.View
//         style={[
//           styles.container,
//           { backgroundColor: containerBackgroundColor },
//         ]}
//       >
//         {/* Scroll View used for device scroll for content going over the frame */}
//         <ScrollView
//           contentContainerStyle={
//             isSmallScreen ? { flexGrow: 1 } : { height: "100%" }
//           }
//         >
//           {/* Container used for 1:3 ratio display */}
//           <View
//             style={[
//               styles.contentWrapper,
//               isSmallScreen
//                 ? styles.contentWrapperColumn
//                 : styles.contentWrapperRow,
//             ]}
//           >
//             {/* Sidebar for inputs and buttons (takes up little width) */}
//             <Animated.View
//               style={[
//                 styles.sidebar,
//                 { backgroundColor: sidebarBackgroundColor },
//                 isSmallScreen ? styles.sidebarColumn : {},
//               ]}
//             >
//               {/* UI of rendering the list of scores for the user to select - show when not in play mode */}
//               <Score_Select
//                 state={state}
//                 dispatch={dispatch}
//                 textStyle={textColor}
//                 borderStyle={borderBottomColor}
//                 button_text_style={invertTextColor}
//                 button_format={[
//                   styles.button,
//                   { backgroundColor: buttonBackgroundColor },
//                 ]}
//               />
//
//               {/* Start button to play performance */}
//               <ScoreFollowerTest
//                 score={state.score}
//                 dispatch={dispatch}
//                 bpm={state.tempo}
//                 state={state}
//               />
//             </Animated.View>
//
//             {/* Scroll View used for horizontal scolling */}
//             <ScrollView
//               horizontal={false}
//               showsHorizontalScrollIndicator={false}
//               contentContainerStyle={{ flexGrow: 1 }} // Ensure the content fills the container
//             >
//               {/* Actual score sheet display (takes up remaining width after sidebar) */}
//               <Animated.View
//                 style={[
//                   styles.mainContent,
//                   { backgroundColor: mainContentBackgroundColor },
//                   isSmallScreen ? styles.mainContentColumn : {},
//                 ]}
//               >
//                 <ScoreDisplay state={state} dispatch={dispatch} />
//               </Animated.View>
//             </ScrollView>
//           </View>
//         </ScrollView>
//       </Animated.View>
//     </SafeAreaView>
//   );
// }
//
// // Define styles for the components using StyleSheet
// const styles = StyleSheet.create({
//   // Main container for entire content
//   container: {
//     flex: 1,
//     backgroundColor: "#F5F5F5",
//   },
//   // Header container
//   menu_bar: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     backgroundColor: "#2C3E50",
//     padding: 10,
//     borderBottomWidth: 2,
//     borderBottomColor: "#1A252F",
//     height: 80,
//     position: "absolute", // make header stick on top even after scroll
//     top: 0,
//     width: "100%",
//     zIndex: 99,
//   },
//   // Image for header
//   logo: {
//     width: 200,
//     resizeMode: "contain",
//   },
//   // Container displaying sidebar and main content (row form)
//   contentWrapper: {
//     flexDirection: "row",
//     gap: 10,
//     flex: 1,
//     padding: 20,
//     marginTop: 10, // account for fixed header
//   },
//   // Container displaying sidebar and main content (row form)
//   contentWrapperRow: {
//     flexDirection: "row",
//   },
//   contentWrapperColumn: {
//     flexDirection: "column",
//   },
//   // Side bar container for buttons and inputs (column display)
//   sidebar: {
//     width: "25%",
//     backgroundColor: "#ECF0F1",
//     padding: 25,
//     borderRadius: 10,
//     gap: 6,
//     // Shadow style found online
//     shadowColor: "#000000",
//     shadowOffset: {
//       width: 0,
//       height: 3,
//     },
//     shadowOpacity: 0.17,
//     shadowRadius: 3.05,
//     elevation: 4,
//   },
//   sidebarColumn: {
//     width: "100%", // Full width on smaller screens
//   },
//   // Container displaying score sheet
//   mainContent: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//     padding: 15,
//     borderRadius: 10,
//     // Shadow style found online
//     shadowColor: "#000000",
//     shadowOffset: {
//       width: 0,
//       height: 3,
//     },
//     shadowOpacity: 0.17,
//     shadowRadius: 3.05,
//     elevation: 4,
//   },
//   mainContentColumn: {
//     width: "100%", // Full width on smaller screens
//   },
//   // Primary button styles
//   button: {
//     padding: 10,
//     borderRadius: 8,
//     alignItems: "center",
//     marginVertical: 5,
//     // Shadow style found online
//     shadowColor: "#000000",
//     shadowOffset: {
//       width: 0,
//       height: 3,
//     },
//     shadowOpacity: 0.17,
//     shadowRadius: 3.05,
//     elevation: 4,
//   },
//   // Primary button text
//   button_text: {
//     textAlign: "center",
//     fontSize: 14,
//     color: "#FFFFFF",
//     fontWeight: "bold",
//   },
//   logoText: {
//     color: "white",
//     fontWeight: "bold",
//     textTransform: "uppercase",
//   },
// });
