"use client"

import Image from "next/image";
import { signOutUser } from "@/lib/firebase/authService";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Dashboard from "./components/dashboard"
import Control from "./components/control"
import Module from "./components/module"
import Simulation from "./components/simulation"
import { AppFooter } from "@/components/app-footer";
import { useEffect } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [state, setState] = useState(
    {
      generator: false,
      mppt: false,
      battery: false,
      load_1: false,
      load_2: false,
      load_3: false,
      blower: 0,
    }
  )

// console log each time state changes
  useEffect(() => 
    console.log(state),
    [state]
  )

  const [data, setData] = useState(0)

  const router = useRouter();
  async function handleSignOut() {
    try {
      await signOutUser();
      router.push("/signin");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }
  return (
    <main className="container mx-auto p-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-center">
        <TabsList className="grid w-1/2 grid-cols-4 h-12 ">
          <TabsTrigger className="h-9 text-md active:bg-primary" value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger className="h-9 text-md" value="control">Kontrol & Data</TabsTrigger>
          <TabsTrigger className="h-9 text-md" value="simulation">Simulasi</TabsTrigger>
          <TabsTrigger className="h-9 text-md" value="module">Panduan</TabsTrigger>
        </TabsList>
        </div>
        <TabsContent value="dashboard">
          <Dashboard state={state} data={data}/>
        </TabsContent>
        <TabsContent value="control">
          <Control state={state} setState={setState} data={data}/>
        </TabsContent>
        <TabsContent value="module">
          <Module/>
        </TabsContent>
        <TabsContent value="simulation">
          <Simulation state={state} data={data}/>
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




