"use client"

import { useState, useMemo, useEffect, Children } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

import Grid from "./grid"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import DataControl from "@/components/dataControl";
export default function Control({ children, state, setState }: any) {
  const [ batteryPercentage, setBatteryPercentage ] = useState(75);
  const [ batteryStatus, setBatteryStatus ] = useState("Charging");
  const [ windSpeed, setWindSpeed ] = useState("15.2");
  const { generator, mppt, battery, load_1, load_2, load_3, blower } = state;

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

    const calculatedWindSpeed = (blower * 0.1 + Math.random() * 0.5).toFixed(2);
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
        <span>Blower Speed</span>
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
          <div className="text-xl font-bold -mt-4 text-primary">{batteryPercentage} %</div>
        </CardContent>
      </div>
      <div>

      <Separator orientation="vertical" />
      </div>
  <div className="h-[100px] flex-grow">
        <CardHeader>
          <CardTitle className="font-normal rounded-none">Wind Speed</CardTitle>
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
          <CardTitle className="font-normal">Wind Power</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold -mt-4 text-primary">20.1 W</div>
        </CardContent>
        </div>
      </Card>
      <DataControl/>
  </div>
</div>

  );
}