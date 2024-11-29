"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Module() {
  const [activeModule, setActiveModule] = useState("charging")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tutorial Modules</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeModule} onValueChange={setActiveModule} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="charging">Charging</TabsTrigger>
            <TabsTrigger value="discharging">Discharging</TabsTrigger>
          </TabsList>
          <TabsContent value="charging">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Charging Module</h3>
              <p>
                This module explains the process of charging the battery in a wind power generation system.
              </p>
              <ol className="list-decimal list-inside space-y-2">
                <li>Wind turbine generates electricity</li>
                <li>Power is regulated through the MPPT (Maximum Power Point Tracking) controller</li>
                <li>Regulated power charges the battery</li>
                <li>Battery management system monitors the charging process</li>
                <li>Charging stops when the battery reaches full capacity</li>
              </ol>
              <p>
                The charging process is crucial for storing excess energy generated during high wind periods for use
                during low wind periods or peak demand times.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="discharging">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Discharging Module</h3>
              <p>
                This module explains the process of discharging the battery to power loads in a wind power generation system.
              </p>
              <ol className="list-decimal list-inside space-y-2">
                <li>Battery supplies power to the inverter</li>
                <li>Inverter converts DC power to AC power</li>
                <li>AC power is distributed to various loads</li>
                <li>Battery management system monitors the discharging process</li>
                <li>System switches to grid power if battery level is too low</li>
              </ol>
              <p>
                The discharging process ensures a stable power supply even when wind generation is low or during peak
                demand periods, maximizing the efficiency of the wind power system.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

