"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const initialSystemData = [
  { time: '00:00', voltage: 12.1, current: 5.2, power: 62.92 },
  { time: '04:00', voltage: 12.3, current: 5.5, power: 67.65 },
  { time: '08:00', voltage: 12.6, current: 6.0, power: 75.60 },
  { time: '12:00', voltage: 12.8, current: 6.2, power: 79.36 },
  { time: '16:00', voltage: 12.5, current: 5.8, power: 72.50 },
  { time: '20:00', voltage: 12.2, current: 5.4, power: 65.88 },
]

export default function Simulation({state, data}: any) {
  const [windSpeed, setWindSpeed] = useState(10)
  const [systemData, setSystemData] = useState(initialSystemData)
  const components = [
    "Generator",
    "MPPT",
    "Battery",
    "Load 1",
    "Load 2",
    "Load 3",
  ]

  const handleWindSpeedChange = (newSpeed: number[]) => {
    setWindSpeed(newSpeed[0])
    // In a real application, this would trigger a recalculation of the system data
    // For this example, we'll just scale the power values based on the wind speed
    const scaleFactor = newSpeed[0] / 10
    const newSystemData = initialSystemData.map(data => ({
      ...data,
      power: +(data.power * scaleFactor).toFixed(2),
      current: +((data.power * scaleFactor) / data.voltage).toFixed(2)
    }))
    setSystemData(newSystemData)
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>System Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {components.map((component) => (
              <div key={component} className="flex items-center justify-between">
                <Label htmlFor={component}>{component}</Label>
                <Switch id={component} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Wind Speed Simulation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="wind-speed">Wind Speed: {windSpeed} m/s</Label>
            </div>
            <Slider
              id="wind-speed"
              min={0}
              max={30}
              step={0.1}
              value={[windSpeed]}
              onValueChange={handleWindSpeedChange}
            />
          </div>
        </CardContent>
      </Card>
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>System Data Simulation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={systemData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="voltage" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line yAxisId="left" type="monotone" dataKey="current" stroke="#82ca9d" activeDot={{ r: 8 }} />
                <Line yAxisId="right" type="monotone" dataKey="power" stroke="#ffc658" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
        </CardContent>
      </Card>
    </div>
  )
}

