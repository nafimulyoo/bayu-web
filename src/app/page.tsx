"use client"

import Image from "next/image";
import { signOutUser } from "@/lib/firebase/authService";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Control from "./components/control"
import Module from "./components/module"
import Simulation from "./components/simulation"
import { AppFooter } from "@/components/app-footer";
import { useEffect } from "react";
import Grid from "./components/grid";
import { rtdb } from "@/lib/firebase/firebase";
import { ref, get, onValue, set, push } from "firebase/database";


export default function Home() {
  const [activeTab, setActiveTab] = useState("control")
  const [state, setState]: any = useState(null); // Initial state is null until fetched
  const stateRef = ref(rtdb, "realtime/state"); // Adjust the path as needed
  const [ simulationState, setSimulationState ] = useState({
    generator: false,
    mppt: false,
    battery: false,
    load_1: false,
    load_2: false,
    load_3: false,
    blower: 0,
    time: 0,
    simulationSpeed: 50,
    turbineEfficiency: 50,
    mpptMultiplier: 50,
    loadResistance: [10, 15, 20]
  });

  
  const [ simulationData, setSimulationData ] = useState({
    battery: [
      {
        batteryPercentage: 50,
        voltage:  10.5 + (50/100) * (12.7-10.5),
        current: 0,
        timestamp: 0,
      }
      ],
    load: [
      {
        voltage: 0,
        current: 0,
        timestamp: 0
      }
    ],
    mppt : [
      {
        voltage: 0,
        current: 0,
        timestamp: 0
      }
    ]
  });

  console.log("simulationState", simulationState)

  let debounceTimeout: any;
  const debounceUpdate = (updatedState: any, delay = 100) => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => updateStateInDatabase(updatedState), delay);
};
  // Fetch initial data from Firebase
  useEffect(() => {
    const fetchInitialState = async () => {
      console.log("Fetching initial state...");
      try {
        const snapshot = await get(stateRef);
        console.log("Snapshot:", snapshot);
        if (snapshot.exists()) {
          console.log("Initial state fetched:", snapshot.val());
          setState(snapshot.val()); 
          setSimulationState(
            (prevState: any) => ({
              ...prevState,
              generator: snapshot.val().generator,
              mppt: snapshot.val().mppt,
              battery: snapshot.val().battery,
              load_1: snapshot.val().load_1,
              load_2: snapshot.val().load_2,
              load_3: snapshot.val().load_3,
              blower: snapshot.val().blower,
            })
          );
        } else {
          console.log("No data available");
          // Set default state if no data exists in Firebase
          setState({
            generator: false,
            mppt: false,
            battery: false,
            load_1: false,
            load_2: false,
            load_3: false,
            blower: 0,
          });


            
        }
      } catch (error) {
        console.error("Error fetching initial state:", error);
      }
    };

    fetchInitialState();
  }, []);

  // Sync RTDB changes in real-time
  useEffect(() => {
    const unsubscribe = onValue(stateRef, (snapshot) => {
      const updatedState = snapshot.val();
      // Update only if state from Firebase differs from local state
      if (JSON.stringify(updatedState) !== JSON.stringify(state)) {
        console.log("Updating state from Firebase...");
        setState(updatedState);
        setSimulationState(
          (prevState: any) => ({
            ...prevState,
            generator: updatedState.generator,
            mppt: updatedState.mppt,
            battery: updatedState.battery,
            load_1: updatedState.load_1,
            load_2: updatedState.load_2,
            load_3: updatedState.load_3,
            blower: updatedState.blower,
          })
        );
      }
    });
  
    return () => unsubscribe();
  }, []); // Ensure no feedback loop
  

const updateStateInDatabase = (updatedState: any) => {
  const serializableState = { ...updatedState }; // Ensure state is serializable
  console.log(serializableState)
  set(stateRef, serializableState)
    .then(() => console.log("State updated in RTDB"))
    .catch((error) => console.error("Error updating state in RTDB:", error));
};

const setStateAndSync = (updateFnOrState: any) => {
  if (typeof updateFnOrState === "function") {
    
    setState((prevState: any) => {
      const newState = updateFnOrState(prevState);
      debounceUpdate(newState); // Use debounce to prevent frequent updates
      return newState;
    });
    setSimulationState((prevState: any) => {
      const newState = updateFnOrState(prevState);
      debounceUpdate(newState); // Use debounce to prevent frequent updates
      return newState;
    });
  } else {
    setState(updateFnOrState);
    setSimulationState(updateFnOrState);
    debounceUpdate(updateFnOrState); // Use debounce to prevent frequent updates
  }
};

  const router = useRouter();
  async function handleSignOut() {
    try {
      await signOutUser();
      router.push("/signin");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  if (!state) {
    return <div>Loading...</div>;
  }
  return (
    <main className="container mx-auto p-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-center">
        <TabsList className="grid w-1/2 grid-cols-3 h-12 ">
          <TabsTrigger className="h-9 text-md" value="control">Control Mode</TabsTrigger>
          <TabsTrigger className="h-9 text-md" value="simulation">Simulation Mode</TabsTrigger>
          <TabsTrigger className="h-9 text-md" value="module">Tutorial</TabsTrigger>
        </TabsList>
        </div>
        <TabsContent value="control">
          <Control state={state} setState={setStateAndSync}>
              <Grid state={state} setState={setStateAndSync}/>
          </Control>
        </TabsContent>
        <TabsContent value="module">
          <Module/>
        </TabsContent>
        <TabsContent value="simulation">
          <Simulation simulationState={simulationState} setSimulationState={setStateAndSync} simulationData={simulationData} setSimulationData={setSimulationData}>
            <Grid state={simulationState}/>
          </Simulation>
        </TabsContent>
      </Tabs>
      <Button
      onClick={handleSignOut}
      variant="outline"
      className="w-full justify-center h-10 mt-5"
    >Keluar</Button>
    
        <AppFooter />
    </main>
  )
}




