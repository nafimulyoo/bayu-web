import React, { useState, useEffect } from "react";
import { rtdb } from "@/lib/firebase/firebase";
import { ref, get, onValue, query, orderByChild, startAt } from "firebase/database";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, Table as TableIcon, ChartLine, Play, Pause } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AreaChart, Area } from 'recharts';

export default function DataControl() {
  const [dataType, setDataType] = useState("battery/voltage");
  const [dataTime, setDataTime] = useState("1");
  const [batteryData, setBatteryData] = useState([]);
  const [loadData, setLoadData] = useState([]);
  const [systemData, setSystemData]: any = useState([]);
  const [isChartView, setIsChartView] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [isPaused, setIsPaused] = useState(false); // New state for pause functionality

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  useEffect(() => {
    if (isPaused || !systemData || !Array.isArray(systemData.batteryData) || !Array.isArray(systemData.loadData)) {
      return; // Safeguard to prevent errors or pause updates
    }
  
    let selectedData = [];
    if (dataType.includes("battery")) {
      selectedData = systemData.batteryData;
    } else if (dataType.includes("load")) {
      selectedData = systemData.loadData;
    }
  
    const newFilteredDataByTimestamp = selectedData.filter((data: any) => {
      return data.timestamp >= Date.now() - parseFloat(dataTime) * 60 * 1000;
    });
  
    const dataKey: any = dataType.includes("voltage")
      ? "voltage"
      : dataType.includes("current")
      ? "current"
      : dataType.includes("power")
      ? "power"
      : dataType.includes("status")
      ? "batteryPercentage"
      : null;
  
    const newFilteredData = newFilteredDataByTimestamp.map((data: any) => ({
      timestamp: data.timestamp,
      time: new Date(data.timestamp).toLocaleTimeString(),
      value: data[dataKey],
    }));
  
    setFilteredData(newFilteredData);
  }, [systemData, dataType, dataTime]);
  
    
  const batteryRef = ref(rtdb, "realtime/data/battery");
  const loadRef = ref(rtdb, "realtime/data/load");

  // Toggle between chart and table view
  const toggleView = () => {
    setIsChartView((prev) => !prev);
  };

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
          batteryData.push({
            timestamp: childSnapshot.key,
            voltage: data.voltage,
            current: data.current,
            power: data.voltage * data.current,
            batteryPercentage: Math.min(((data.voltage / 12) * 100), 100)
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
            batteryPercentage: Math.min(((data.voltage / 12) * 100), 100)
          });
        });
      }
  
      setBatteryData(batteryData);
      setLoadData(loadData);
    //   console.log(batteryData);
        // console.log(loadData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  // Listen for real-time updates in Firebase
  const listenForUpdates = () => {
    onValue(batteryRef, (snapshot) => {
      const currentTimestamp = Date.now();
      const timeAgo = currentTimestamp - 60 * 60 * 1000; // 24 hours in milliseconds
      const updatedBatteryData: any = [];
  
      snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val();
        const timestamp = data.timestamp;
        if (timestamp >= timeAgo) {
          updatedBatteryData.push({
            timestamp: data.timestamp,
            voltage: data.voltage,
            current: data.current,
            power: data.voltage * data.current,
            batteryPercentage: (data.voltage / 12) * 100,
          });
        }
      });
    //   console.log(updatedBatteryData);
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

  // Map the data to be used for chart or table view
  useEffect(() => {
    const newSystemData: any = {
        batteryData: batteryData,
        loadData: loadData,
    }

    setSystemData(newSystemData);
  }, [batteryData, loadData]);

  return (
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
                <SelectItem value="battery/status">Battery Status</SelectItem>
                <SelectItem value="battery/voltage">Battery Voltage</SelectItem>
                <SelectItem value="battery/current">Battery Current</SelectItem>
                <SelectItem value="battery/power">Battery Power</SelectItem>
                <SelectItem value="load/voltage">Load Voltage</SelectItem>
                <SelectItem value="load/current">Load Current</SelectItem>
                <SelectItem value="load/power">Load Power</SelectItem>
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
  );
}
