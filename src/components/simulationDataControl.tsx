"use client"

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, Table as TableIcon, ChartLine, Play, Pause } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SimulationDataControl({ simulationData }: any) {
  const [dataType, setDataType] = useState("battery/voltage");
  const [dataTime, setDataTime] = useState("1");
  const [isChartView, setIsChartView] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState(simulationData);
  const [isPaused, setIsPaused] = useState(false); // New state for pause functionality

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  useEffect(() => {
    setData(simulationData);
  }, [simulationData]);

  useEffect(() => {
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
    
    console.log(selectedData)

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
    console.log("filteredData", newFilteredData)
    setFilteredData(newFilteredData);
  }, [data, dataType, dataTime]);

  
  // Toggle between chart and table view
  const toggleView = () => {
    setIsChartView((prev) => !prev);
  };

  
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
  );
}
