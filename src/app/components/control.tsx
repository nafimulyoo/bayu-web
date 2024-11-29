"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import Grid from "./grid"

// Placeholder data for the chart
const systemData = [
  { time: '00:00', voltage: 12.1, current: 5.2, power: 62.92 },
  { time: '04:00', voltage: 12.3, current: 5.5, power: 67.65 },
  { time: '08:00', voltage: 12.6, current: 6.0, power: 75.60 },
  { time: '12:00', voltage: 12.8, current: 6.2, power: 79.36 },
  { time: '16:00', voltage: 12.5, current: 5.8, power: 72.50 },
  { time: '20:00', voltage: 12.2, current: 5.4, power: 65.88 },
]
export default function Control({ state, setState }: any) {
  const [dataType, setDataType] = useState("voltage");
  const components = [
    { key: "generator", label: "Generator" },
    { key: "mppt", label: "MPPT" },
    { key: "battery", label: "Battery" },
    { key: "load_1", label: "Load 1" },
    { key: "load_2", label: "Load 2" },
    { key: "load_3", label: "Load 3" },
  ];

  const toggleComponent = (key: string) => {
    setState((prevState: any) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>System Controls</CardTitle>
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
      <Card>
        <CardHeader>
          <CardTitle>Circuit Diagram</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-square flex items-center justify-center">
            <Grid state={state} />
          </div>
        </CardContent>
      </Card>
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>System Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Select onValueChange={setDataType} defaultValue={dataType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select data type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="voltage">Voltage</SelectItem>
                <SelectItem value="current">Current</SelectItem>
                <SelectItem value="power">Power</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={systemData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey={dataType}
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
