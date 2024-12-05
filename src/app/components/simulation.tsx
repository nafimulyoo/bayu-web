"use client";

import { useState, useMemo, useEffect, Children } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

import Grid from "./grid";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, Table as TableIcon, ChartLine, Play, Pause } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Timestamp } from "firebase/firestore";

export default function Simulation({ children, simulationState, setSimulationState, simulationData, setSimulationData }: any) {
  const [ batteryStatus, setBatteryStatus ] = useState("Charging");
  const [ windSpeed, setWindSpeed ] = useState(0);
  const [ windEnergy, setWindEnergy ] = useState(0);
  const [ batteryPercentage, setBatteryPercentage ] = useState(0);
  
  const [dataType, setDataType] = useState("battery/voltage");
  const [dataTime, setDataTime] = useState("1");
  const [isChartView, setIsChartView] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState(simulationData);
  const [isPaused, setIsPaused] = useState(false);
  
  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const updateShownData = (data: any, dataType:any, dataTime: any, isPaused: any) => {
    if (isPaused || !data) {
      return; // Safeguard to prevent errors or pause updates
    }
    
    let selectedData = [];
    if (dataType.includes("battery")) {
      selectedData = data.battery;
    } else if (dataType.includes("load")) {
      selectedData = data.load;
    } else if (dataType.includes("mppt")) {
      selectedData = data.mppt;
    }

    var newFilteredDataByTimestamp
    if (selectedData) {
        newFilteredDataByTimestamp = selectedData.filter((data: any) => {
        return data.timestamp >= Date.now() - parseFloat(dataTime) * 60 * 1000;
      });
    }
    else {
      newFilteredDataByTimestamp = selectedData
    }
  
    const dataKey: any = dataType.includes("voltage")
      ? "voltage"
      : dataType.includes("current")
      ? "current"
      : dataType.includes("power")
      ? "power"
      : dataType.includes("status")
      ? "batteryPercentage"
      : null;

    
    var newFilteredData;

    if (newFilteredDataByTimestamp) {
      newFilteredData = newFilteredDataByTimestamp.map((data: any) => ({
        timestamp: data.timestamp,
        time: new Date(data.timestamp).toLocaleTimeString(),
        value: data[dataKey],
      }));
    }
    else {
      newFilteredData = newFilteredDataByTimestamp
    }
    setFilteredData(newFilteredData);
  };


  
  // Toggle between chart and table view
  const toggleView = () => {
    setIsChartView((prev) => !prev);
  };


  const intervalTimeout = 1000;
  const batteryCapacity = 34;


  const { generator, mppt, battery, load_1, load_2, load_3, blower, simulationSpeed, time, turbineEfficiency, mpptMultiplier, loadResistance } = simulationState;


  const generateSimulationData = (simulationState: any) => {
    const { generator, mppt, battery, load_1, load_2, load_3, blower, simulationSpeed, time, turbineEfficiency, mpptMultiplier, loadResistance } = simulationState;

    const [ r1, r2 , r3 ] = loadResistance
    const trueTimeout = intervalTimeout * (simulationSpeed * 2 /100 )
    const currentSimulationTime = time + trueTimeout/1000;
    setSimulationState(
      {
       ...simulationState,
        time: currentSimulationTime,
      }
    )

    const K1 = generator;
    const K2 = battery;
    const K3 = load_2;
    const K4 = load_3;
    const K5 = load_1;

    var batteryStatus = "";
  if (K1 && K2 && !(K3 || K4 || K5)) {
    batteryStatus = "Charging";
  } 
  else if ((!K1 && K2) && (K3 || K4 || K5)) {
    batteryStatus = "Discharging";
  } 
  else if ((K1 && K2) && (K3 || K4 || K5)) {
    batteryStatus = "Neutral";
  } 
  else if ((K1 && !K2) && (K3 || K4 || K5)) {
    batteryStatus = "Direct Power";
  } 
  else {
    batteryStatus = "Idle";
  }

    const timestamp = Date.now();
    const newWindSpeed = Math.round((100*(blower * 0.1 + Math.random() * 0.2)))/100;
    const newWindEnergy = 0.5 * 1.225 * 0.5 * Math.PI * Math.pow(0.5, 2) * Math.pow(newWindSpeed, 3);
    var generatedPower = (turbineEfficiency/100) * 0.5 * 1.225 * 0.5 * Math.PI * Math.pow(0.5, 2) * Math.pow(newWindSpeed, 3); 
    const batteryResistance = 0.02;

    const calculatedBackBlower = newWindSpeed * 10;
    const turbineVoltage = (0.0005875 * calculatedBackBlower ** 2 + 0.0825 * calculatedBackBlower) + Math.random() * 0.1;
    const batteryVoltage = simulationData.battery[simulationData.battery.length - 1].voltage;

    if (mppt === true) {
      generatedPower = generatedPower * (1 + (mpptMultiplier/200));
      
    }
    const newSimulationData = simulationData;

    const mpptData = {
      voltage: turbineVoltage,
      current: generatedPower / turbineVoltage,
      power: generatedPower,
      timestamp: timestamp
    };

    const batteryData = {
      batteryPercentage: 100 * ((batteryVoltage - 10.5) / (12.7 - 10.5)),
      voltage: batteryVoltage,
      current: 0,
      power: 0,
      timestamp: timestamp,
    };


    const loadData = {
      voltage: 0,
      current: 0,
      power: 0,
      timestamp: timestamp
    };


    if (batteryStatus === "Charging") {
      batteryData.power = generatedPower;
      batteryData.current = generatedPower / batteryVoltage;

      const beforeCapacity = (batteryData.batteryPercentage/100) * batteryCapacity;
      const afterCapacity = beforeCapacity + batteryData.current * trueTimeout/(1000*3600);

      if (afterCapacity < batteryCapacity) {
        batteryData.batteryPercentage = 100 * (afterCapacity / batteryCapacity);
        batteryData.voltage = 10.5 + (batteryData.batteryPercentage/100) * (12.7-10.5);
      }
      else {
        batteryData.batteryPercentage = 100;
        batteryData.voltage = 12.7;
      }
    }

    if (batteryStatus === "Discharging") {
      var paralelResistance = 0;
      // parallel resistance
      if (load_1 === true) {
        paralelResistance += 1/r1;
      }
      if (load_2 === true) {
        paralelResistance += 1/r2;
      }
      if (load_3 === true) {
        paralelResistance += 1/r3;
      }
      var totalResistance = (1/paralelResistance) + batteryResistance;
      batteryData.voltage = batteryData.voltage 
      batteryData.current = batteryData.voltage / totalResistance;
      batteryData.power = batteryData.voltage * batteryData.current;

      if (load_1 === true) {
        loadData.voltage = batteryData.voltage;
        loadData.current = batteryData.voltage / 10;
        loadData.power = loadData.voltage * loadData.current;
      }


      const beforeCapacity = (batteryData.batteryPercentage/100) * batteryCapacity;
      const afterCapacity = beforeCapacity - (batteryData.current )*trueTimeout/(1000*3600);

      if (afterCapacity > 0) {
        batteryData.batteryPercentage = 100 * (afterCapacity / batteryCapacity);
        batteryData.voltage = 10.5 + (batteryData.batteryPercentage/100) * (12.7-10.5);
      }
      else {
        batteryData.batteryPercentage = 0;
        batteryData.voltage = 10.5;
      }
    }

    if (batteryStatus === "Neutral") {
      var paralelResistance = 0;
      var totalResistance = 0;

      if (load_1 === true) {
        paralelResistance += 1/r1;
      }
      if (load_2 === true) {
        paralelResistance += 1/r2;
      }
      if (load_3 === true) {
        paralelResistance += 1/r3;
      }

      var totalResistance = (1/paralelResistance) + batteryResistance;
      batteryData.voltage = batteryData.voltage 
      batteryData.current = batteryData.voltage / totalResistance;
      batteryData.power = batteryData.voltage * batteryData.current;

      if (load_1 === true) {
        loadData.voltage = batteryData.voltage;
        loadData.current = batteryData.voltage / 10;
        loadData.power = loadData.voltage * loadData.current;
      }

      const beforeCapacity = (batteryData.batteryPercentage/100) * batteryCapacity;
      const afterCapacity = beforeCapacity - (batteryData.current - (generatedPower / batteryVoltage))*trueTimeout/(1000*3600);

      if (afterCapacity < 0) {
        batteryData.batteryPercentage = 0;
        batteryData.voltage = 10.5;
      }
      
      else if (afterCapacity > batteryCapacity) {
        batteryData.batteryPercentage = 100;
        batteryData.voltage = 12.7;
      }

      else {
        batteryData.batteryPercentage = 100 * (afterCapacity / batteryCapacity);
        batteryData.voltage = 10.5 + (batteryData.batteryPercentage/100) * (12.7-10.5);
      }
    }
    
    if (batteryStatus === "Direct Power") {
   
      var paralelResistance = 0;
      var totalResistance = 0;

      if (load_1 === true) {
        paralelResistance += 1/r1;
      }
      if (load_2 === true) {
        paralelResistance += 1/r2;
      }
      if (load_3 === true) {
        paralelResistance += 1/r3;
      }

      var totalResistance = (1/paralelResistance);

      if (load_1 === true) {
        loadData.voltage = mpptData.voltage;
        loadData.current = mpptData.voltage / 10;
        loadData.power = loadData.voltage * loadData.current;
      }

    }
      
    

    newSimulationData.mppt.push(mpptData);
    newSimulationData.battery.push(batteryData);
    newSimulationData.load.push(loadData);

    setWindEnergy(newWindEnergy);
    setWindSpeed(newWindSpeed);
    setSimulationData(newSimulationData);
    setBatteryPercentage(batteryData.batteryPercentage);
    setData(newSimulationData);
  };

  useEffect(() => {

    updateShownData(simulationData, dataType, dataTime, isPaused);
    
    if (simulationSpeed > 0) {
      const intervalId = setInterval(async () => {
        updateShownData(simulationData, dataType, dataTime, isPaused);
        generateSimulationData(simulationState);
      }, intervalTimeout/( simulationSpeed * 2 /100 )); 
      return () => clearInterval(intervalId);
    }
    
  }, [dataTime, dataType, isPaused, simulationState]); 

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
  }, [simulationState]);

  const components = [
    { key: "generator", label: "Generator" },
    { key: "mppt", label: "MPPT" },
    { key: "battery", label: "Battery" },
    { key: "load_1", label: "Load 1" },
    { key: "load_2", label: "Load 2" },
    { key: "load_3", label: "Load 3" },
  ];
  
  const handleBlowerSpeedChange = (newSpeed: number[]) => {
    setSimulationState(
      (prevState: any) => ({
       ...prevState,
        blower: newSpeed[0],
      })
    )
  };

  const handleSimulationSpeedChange = (newSpeed: number[]) => {
    const newSimulationSpeed = newSpeed[0]
    setSimulationState(
      (prevState: any) => ({
       ...prevState,
        simulationSpeed: newSimulationSpeed,
      })
    )
  };

  const handleTurbineEfficiencyChange = (newEfficiency: number[]) => {
    setSimulationState(
      (prevState: any) => ({
       ...prevState,
        turbineEfficiency: newEfficiency[0],
      })
    )
  };

  const handleMpptMultiplierChange = (newMultiplier: number[]) => {
    setSimulationState(
      (prevState: any) => ({
       ...prevState,
        mpptMultiplier: newMultiplier[0]
      })
    )
  };

  const toggleComponent = (key: string) => {
    setSimulationState((prevState: any) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const fillBattery = () => {
    setBatteryPercentage(100);
    const newSimulationData = simulationData;
    
    const batteryData = {
      batteryPercentage: 100,
      voltage: 12.7,
      current: 0,
      power: 0,
      timestamp: Date.now()
    }

    newSimulationData.battery.push(batteryData);
    setSimulationData(newSimulationData)
  }

  const emptyBattery = () => {
    setBatteryPercentage(0);
    const newSimulationData = simulationData;
    
    const batteryData = {
      batteryPercentage: 0,
      voltage: 10.5,
      current: 0,
      power: 0,
      timestamp: Date.now()
    }

    newSimulationData.battery.push(batteryData);
    setSimulationData(newSimulationData)
  }

  const resetData = () => {
    setSimulationData({
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
    })
    setSimulationState(
      (prevState: any) => ({
       ...prevState,
        time: 0,
      })
    )
  }

  const resetSettings = () => {
    setSimulationState(
      (prevState: any) => ({
       ...prevState,
       generator: false,
       mppt: false,
       battery: false,
       load_1: false,
       load_2: false,
       load_3: false,
       blower: 0,
       simulationSpeed: 50,
       turbineEfficiency: 50,
       mpptMultiplier: 50,
       loadResistance: [10, 15, 20]
      })
    )
  }

  return (
    <div>
        <Card className="flex flex-row mt-6">
        <div className="h-[100px] rounded-r-none flex-grow">
        <CardHeader>
          <CardTitle className="font-normal">Simulation Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold -mt-4 text-primary">{secondsToHMS(time)}</div>
        </CardContent>
      </div>
      <div>

      <Separator orientation="vertical" />
      </div>

  <div className="h-[100px] rounded-r-none flex-grow">
        <CardHeader>
        <CardTitle className="flex justify-between">
        <span className="font-normal" >Simulation Speed</span>
        <span className="font-normal">{ (simulationSpeed/50).toFixed(2) }x</span>
        </CardTitle>
        </CardHeader>
        <CardContent>
        <div className="space-y-4">
      <Slider
              id="simulation-speed"
              min={0}
              max={100}
              step={12.5}
              value={[simulationSpeed]} 
              onValueChange={handleSimulationSpeedChange}
            />
      </div>
        </CardContent>
      </div>
      <div>

      <Separator orientation="vertical" />
      </div>
  <div className="h-[100px] flex-grow">
  <CardHeader>
        <CardTitle className="flex justify-between">
        <span className="font-normal" >Turbine Efficiency</span>
        <span className="font-normal">{ turbineEfficiency }%</span>
        </CardTitle>
        </CardHeader>
        <CardContent>
        <div className="space-y-4">
      <Slider
              id="simulation-speed"
              min={0}
              max={100}
              step={1}
              value={[turbineEfficiency]} 
              onValueChange={handleTurbineEfficiencyChange}
            />
      </div>
        </CardContent>
      </div>
      <div>

      <Separator orientation="vertical" />
      </div>
      <div className="h-[100px] flex-grow">
      <CardHeader>
        <CardTitle className="flex justify-between">
        <span className="font-normal" >MPPT Multiplier</span>
        <span className="font-normal">{ (1 + (mpptMultiplier/200)).toFixed(2) }x</span>
        </CardTitle>
        </CardHeader>
        <CardContent>
        <div className="space-y-4">
      <Slider
              id="simulation-speed"
              min={0}
              max={100}
              step={10}
              value={[mpptMultiplier]} 
              onValueChange={handleMpptMultiplierChange}
            />
      </div>
        </CardContent>
      </div>
      <div>

      <Separator orientation="vertical" />
      </div>
  <div className="h-[100px]">
        <CardContent className="grid grid-cols-2 gap-2">
          <div className="mt-2">

          <Button variant="outline" className="flex items-center w-full" onClick={fillBattery}>
            Fill Battery
          </Button>
          <Button variant="outline" className="flex items-center w-full mt-2" onClick={emptyBattery}>
            Empty Battery
          </Button>
          </div>
          <div className="mt-2">
          <Button variant="outline" className="flex items-center w-full" onClick={resetSettings}>
            Reset Settings
          </Button>
          <Button variant="outline" className="flex items-center w-full mt-2" onClick={resetData}>
            Reset Simulation
          </Button>
          </div>
        </CardContent>
        </div>
      </Card>
      
<div className="grid gap-4 md:grid-cols-6 h-screen mt-4">
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
              checked={simulationState[key]} // Bind switch checked state to the current state
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
        <span className="font-normal">{ blower }%</span>
        </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
      <Slider
              id="blower-speed"
              min={0}
              max={100}
              step={10}
              value={[blower]} 
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
          <div className="text-xl font-bold -mt-4 text-primary">{batteryPercentage.toFixed(3)} %</div>
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
          <div className="text-xl font-bold -mt-4 text-primary">{windEnergy.toFixed(2)} W</div>
        </CardContent>
        </div>
      </Card>
      
      <Card className="h-[420px] mt-4">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <p>System Data</p>
          <div className="flex">

          <Button onClick={toggleView} variant="outline" className="flex items-center gap-2 px-3 -mt-2 mr-2">
            {isChartView ? <TableIcon /> : <ChartLine />}
            <span>{isChartView ? "View Table" : "View Chart"}</span>
          </Button>
          <Button variant="outline" className="flex items-center -mt-2 mr-2 px-2">
            <Download />
          </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center">
          <div className="mr-2">
            <Select onValueChange={setDataType} defaultValue={dataType}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Select data type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="battery/status"><span className="font-medium">Battery</span> Status</SelectItem>
                <SelectItem value="battery/voltage"><span className="font-medium">Battery</span> Voltage</SelectItem>
                <SelectItem value="battery/current"><span className="font-medium">Battery</span> Current</SelectItem>
                <SelectItem value="battery/power"><span className="font-medium">Battery</span> Power</SelectItem>
                <SelectItem value="load/voltage"><span className="font-medium">Load</span> Voltage</SelectItem>
                <SelectItem value="load/current"><span className="font-medium">Load</span> Current</SelectItem>
                <SelectItem value="load/power"><span className="font-medium">Load</span> Power</SelectItem>
                <SelectItem value="mppt/voltage"><span className="font-medium">MPPT</span> Voltage</SelectItem>
                <SelectItem value="mppt/current"><span className="font-medium">MPPT</span> Current</SelectItem>
                <SelectItem value="mppt/power"><span className="font-medium">MPPT</span> Power</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mr-2">
            <Select onValueChange={setDataTime} defaultValue={dataTime}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select data type" />
              </SelectTrigger>
              <SelectContent>
              <SelectItem value="0.5">30 Seconds</SelectItem>
              <SelectItem value="1">1 Minute</SelectItem>
                <SelectItem value="5">5 Minutes</SelectItem>
                <SelectItem value="10">10 Minutes</SelectItem>
                <SelectItem value="15">15 Minutes</SelectItem>
                <SelectItem value="30">30 Minutes</SelectItem>
                <SelectItem value="60">60 Minutes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={togglePause} variant="default" className="flex items-center gap-2 px-2">
              <span>{isPaused ? <Play/> : <Pause/>}</span>
            </Button>
        </div>
        <div className="h-[280px]">
          {isChartView ? (
            <ResponsiveContainer className="-ml-8" width="100%" height="100%">
              <LineChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" 
                stroke="#8884d8" isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="overflow-auto">
              <ScrollArea className="h-64">
                <Table className="min-w-full border-collapse border border-gray-300">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="border border-gray-300 px-4 py-2">Time</TableHead>
                      {dataType.includes("voltage") && (
                        <TableHead className="border border-gray-300 px-4 py-2">Voltage</TableHead>
                      )}
                        {dataType.includes("current") && (
                            <TableHead className="border border-gray-300 px-4 py-2">Current</TableHead>
                        )}
                        {dataType.includes("power") && (
                            <TableHead className="border border-gray-300 px-4 py-2">Power</TableHead>
                        )}
                        {dataType.includes("status") && (
                            <TableHead className="border border-gray-300 px-4 py-2">Battery Percentage</TableHead>
                        )}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(filteredData.sort((a: any, b: any) => b.timestamp - a.timestamp)).map((row: any, index) => (
                      <TableRow key={index}>
                        <TableCell className="border border-gray-300 px-4 py-2">{row.time}</TableCell>
                        <TableCell className="border border-gray-300 px-4 py-2">{row.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  </div>
</div>
</div>

  );
}


function secondsToHMS(seconds: any) {
  // Calculate hours, minutes, and seconds
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60)

  // Pad with leading zeros and format as HH:MM:SS
  return [hours, minutes, secs]
      .map(unit => String(unit).padStart(2, '0')) // Pad with leading zeros
      .join(':'); // Join with colon
}
