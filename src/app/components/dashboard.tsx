"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import Grid  from "./grid"

// Placeholder data for the chart
const batteryData = [
  { time: '00:00', voltage: 12.1 },
  { time: '04:00', voltage: 12.3 },
  { time: '08:00', voltage: 12.6 },
  { time: '12:00', voltage: 12.8 },
  { time: '16:00', voltage: 12.5 },
  { time: '20:00', voltage: 12.2 },
]

export default function Dashboard({state}: any) {
  // Placeholder data - in a real application, this would come from your backend
  const batteryPercentage = 75
  const batteryVoltage = 12.6
  const batteryStatus = "Charging"
  const windSpeed = 15.2

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Battery Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold">State of Charge:</span>
                <span>{batteryPercentage}%</span>
              </div>
              <Progress value={batteryPercentage} className="w-full" />
              <div className="flex justify-between">
                <span className="font-semibold">Voltage:</span>
                <span className="text-2xl font-bold text-blue-600">{batteryVoltage}V</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Status:</span>
                <span className="text-xl font-bold text-green-600">{batteryStatus}</span>
              </div>
            </div>
            <div className="h-48 md:h-auto">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={batteryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis domain={[12, 13]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="voltage" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Wind Speed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{windSpeed} m/s</div>
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
    </div>
  )
}

