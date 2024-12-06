"use client"

import { useState, useMemo, useEffect, Children } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { rtdb } from "@/lib/firebase/firebase";
import { ref, get, onValue, query, orderByChild, startAt } from "firebase/database";
import Grid from "./grid"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import DataControl from "@/components/dataControl";
export default function Control({ children, state, setState }: any) {
  const [ batteryPercentage, setBatteryPercentage ] = useState(50);
  const [ batteryStatus, setBatteryStatus ] = useState("Charging");
  const [ windSpeed, setWindSpeed ] = useState(0);
  const { generator, mppt, battery, load_1, load_2, load_3, blower } = state;
  interface BatteryData {
    timestamp: string;
    voltage: number;
    current: number;
    power: number;
    batteryPercentage: number;
  }

  interface LoadData {
    timestamp: string;
    voltage: number;
    current: number;
    power: number;
  }

  const [batteryData, setBatteryData] = useState<BatteryData[]>([
    {
      timestamp: 0,
      voltage: 0,
      current: 0,
      power: 0,
      batteryPercentage: 0,
    },
  ]);
  const [loadData, setLoadData] = useState<LoadData[]>([
    {
      timestamp: 0,
      voltage: 0,
      current: 0,
      power: 0,
    },
  ]);

  const batteryRef = ref(rtdb, "realtime/data/battery");
  const loadRef = ref(rtdb, "realtime/data/load");
  
  const fetchData = async () => {
    const currentTimestamp = Date.now();
    const timeAgo = currentTimestamp -  60 * 60 * 1000; // 24 hours in milliseconds
  
    try {
      // Query battery data based on the last 24 hours
      const batteryQuery = query(batteryRef, orderByChild("timestamp"), startAt(timeAgo));
      const batterySnapshot = await get(batteryQuery);
      const batteryData: any = [];
      if (batterySnapshot.exists()) {
        batterySnapshot.forEach((childSnapshot) => {
          const data = childSnapshot.val();
          let newBatteryPercentage = ((data.voltage-9) / (10-9)) * 100
          if (newBatteryPercentage > 100) {
            newBatteryPercentage = 100;
          }
          if (newBatteryPercentage < 0) {
            newBatteryPercentage = 0;
          }
          console.log(newBatteryPercentage)

          batteryData.push({
            timestamp: childSnapshot.key,
            voltage: data.voltage,
            current: data.current,
            power: data.voltage * data.current,
            batteryPercentage: newBatteryPercentage,
          });
        });
      }
  
      // Query load data based on the last 24 hours
      const loadQuery = query(loadRef, orderByChild("timestamp"), startAt(timeAgo));
      const loadSnapshot = await get(loadQuery);
      const loadData: any = [];
      if (loadSnapshot.exists()) {
        loadSnapshot.forEach((childSnapshot) => {
          const data = childSnapshot.val();
          loadData.push({
            timestamp: data.timestamp,
            voltage: data.voltage,
            current: data.current,
            power: data.voltage * data.current,
          });
        });
      }
  
      setBatteryData(batteryData);
      setLoadData(loadData);
      setBatteryPercentage(batteryData[batteryData.length - 1].batteryPercentage);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  // Handle battery status based on the battery percentage
  

  // Listen for real-time updates in Firebase
  const listenForUpdates = () => {
    onValue(batteryRef, (snapshot) => {
      const currentTimestamp = Date.now();
      const timeAgo = currentTimestamp - 60 * 60 * 1000; // 24 hours in milliseconds
      const updatedBatteryData: any = [];

  
      snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val();
        
        let newBatteryPercentage = ((data.voltage-9) / (10-9)) * 100
        if (newBatteryPercentage > 100) {
          newBatteryPercentage = 100;
        }
        if (newBatteryPercentage < 0) {
          newBatteryPercentage = 0;
        }
        console.log(newBatteryPercentage)
        const timestamp = data.timestamp;
        if (timestamp >= timeAgo) {
          updatedBatteryData.push({
            timestamp: data.timestamp,
            voltage: data.voltage,
            current: data.current,
            power: data.voltage * data.current,
            batteryPercentage: newBatteryPercentage,
          });
        }
      });
      setBatteryData(updatedBatteryData);
    });
  
    onValue(loadRef, (snapshot) => {
      const currentTimestamp = Date.now();
      const timeAgo = currentTimestamp -  60 * 60 * 1000; // 24 hours in milliseconds
      const updatedLoadData: any = [];
  
      snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val();
        const timestamp = data.timestamp;
        if (timestamp >= timeAgo) {
          updatedLoadData.push({
            timestamp: data.timestamp,
            voltage: data.voltage,
            current: data.current,
            power: data.voltage * data.current,
          });
        }
      });
      setLoadData(updatedLoadData);
    });
  };
  

  // Update the system data based on data type and selected time window
  useEffect(() => {
    fetchData(); // Fetch data based on the selected time window
    listenForUpdates(); // Start listening for updates
  }, []); // Re-run whenever the dataTime changes


  useEffect(() => {
      const K1 = generator;
      const K2 = battery;
      const K3 = load_2;
      const K4 = load_3;
      const K5 = load_1;

    if (K1 && K2 && !(K3 || K4 || K5)) {
      setBatteryStatus("Charging");
    }
    else if ((!K1 && K2) && (K3 || K4 || K5)) {
      setBatteryStatus("Discharging");
    }
    else if ((K1 && K2) && (K3 || K4 || K5)) {
      setBatteryStatus("Neutral");
    }
    else if ((K1 && !K2) && (K3 || K4 || K5)) {
      setBatteryStatus("Direct Power");
    }
    else {
      setBatteryStatus("Idle");
    }

    const calculatedWindSpeed = Math.round((blower * 0.1 + Math.random() * 0.5 ) * 100)/100
    setWindSpeed(calculatedWindSpeed);
  }, [state])

  const components = [
    { key: "generator", label: "Generator" },
    { key: "mppt", label: "MPPT" },
    { key: "battery", label: "Battery" },
    { key: "load_1", label: "Load 1" },
    { key: "load_2", label: "Load 2" },
    { key: "load_3", label: "Load 3" },
  ];



  
  const handleBlowerSpeedChange = (newSpeed: number[]) => {
    setState((prevState: any) => ({
      ...prevState,
      blower: newSpeed[0],
    }));
  };

  const toggleComponent = (key: string) => {
    setState((prevState: any) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  return (
    <div>


<div className="grid gap-4 md:grid-cols-6 h-screen mt-6">
  {/* System Controls */}
  <div className="md:col-span-1 ">
  <Card className="h-[100px]">
    <CardHeader>
    <CardTitle className="flex justify-between">
        Status
        </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="font-bold text-2xl -mt-4 text-primary">
        {batteryStatus}
      </p>
    </CardContent>
  </Card>
  <Card className=" h-[310px] mt-4">
    <CardHeader>
      <CardTitle>Grid Controls</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {components.map(({ key, label }) => (
          <div key={key} className="flex items-center justify-between">
            <Label htmlFor={key}>{label}</Label>
            <Switch
              id={key}
              checked={state[key]} // Bind switch checked state to the current state
              onCheckedChange={() => toggleComponent(key)} // Update the state on toggle
            />
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
  <Card className="h-[100px] mt-4">
    <CardHeader>
    <CardTitle className="flex justify-between">
        <span>Blower Speed**</span>
        <span className="font-normal">{state.blower}%</span>
        </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
      <Slider
              id="blower-speed"
              min={0}
              max={100}
              step={10}
              value={[state.blower]} 
              onValueChange={handleBlowerSpeedChange}
            />
      </div>
    </CardContent>
  </Card>
  </div>


  {/* Circuit Diagram */}
  <Card className="md:col-span-3 h-[540px]">
    <CardHeader>
      <CardTitle>Grid Diagram</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex items-center justify-center">
        {children}
      </div>
    </CardContent>
  </Card>


  {/* System Data */}
  <div className="md:col-span-2">

  <Card className="flex flex-row">
  <div className="h-[100px] rounded-r-none flex-grow">
        <CardHeader>
          <CardTitle className="font-normal">Battery</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold -mt-4 text-primary">{batteryData[batteryData.length - 1].batteryPercentage.toFixed(2) ? batteryData[batteryData.length - 1].batteryPercentage.toFixed(2) : "50"} %</div>
        </CardContent>
      </div>
      <div>

      <Separator orientation="vertical" />
      </div>
  <div className="h-[100px] flex-grow">
        <CardHeader>
          <CardTitle className="font-normal rounded-none">Wind Speed*</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold -mt-4 text-primary">{windSpeed} m/s</div>
        </CardContent>
      </div>
      <div>

      <Separator orientation="vertical" />
      </div>
  <div className="h-[100px] flex-grow">
        <CardHeader>
          <CardTitle className="font-normal">Wind Power*</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold -mt-4 text-primary">{(0.5 * 1.225 * 0.5 * Math.PI * Math.pow(0.5, 2) * Math.pow(windSpeed, 3)).toFixed(2)} W</div>
        </CardContent>
        </div>
      </Card>
      <DataControl batteryData={batteryData} loadData={loadData}/>
  </div>
</div>
  <div>
    *Wind Speed and Wind Power are simulated values and do not represent real-time data.
  </div>
  <div>
    **Blower Speed control is a simulated value and does not represent real-time data.
  </div>
</div>
  );
}
