
"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "./ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog"
import Image from "next/image"
import { BrainCircuit, Lightbulb, Route, ScrollText, MessageSquareHeart, Headset, Book, WandSparkles, Zap, Users } from "lucide-react"
import BayuIcon from "./bayu-icon";


export default function Landing() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImage, setSelectedImage]: any = useState(null)
  const handleImageClick = (src: any) => {
    setSelectedImage(src)
    setIsModalOpen(true)
  }
  const handleModalClose = () => {
    if (isModalOpen) {
        setIsModalOpen(false)
        setSelectedImage(null)
    }
  }
  return (
    <div className="flex flex-col min-h-dvh">
      <section className="w-full pt-12 md:pt-24 lg:pt-32">
        <div className="container grid gap-10 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6 mx-12">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl">
              Elevate Your Developer Career with<BayuIcon className="mb-4 h-16 w-24 text-primary inline-block" />CodeNav
            </h1>
            <div>
                <p className="max-w-[600px] text-foreground md:text-2xl font-semibold -mt-6">Powered by AI <BrainCircuit className="ml-1 inline-block pb-1 h-12" /> </p>
            </div>
            <p className="max-w-[600px] text-muted-foreground md:text-lg">
                CodeNav is a career development app designed to help developers advance their careers through personalized and AI-driven solutions. It streamlines the learning process, enhances skill acquisition, and provides tailored guidance to ensure developers achieve their career goals efficiently and effectively.
            </p>
            <Link
              href="/home"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Get Started
            </Link>
          </div>
          <Image
            src="/home/header.jpg"
            width={640}
            height={640}
            alt="Hero Image"
            className="mx-auto overflow-hidden rounded-xl object-cover aspect-video"
          />
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container space-y-12 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="mb-4 inline-block rounded-lg bg-muted  px-3 py-1 text-sm">Key Features</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mt-4">Discover the Power of Our AI Solution <WandSparkles className="h-12 w-12 inline-block ml-2 mb-1"/></h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our innovative AI-driven platform offers a wide range of features to help developers achieve their career goals. Explore the key capabilities that set us apart.
              </p>
            </div>
          </div>
          <div className="mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:max-w-5xl">
            <div className="grid gap-4">
              <Link href="/learn/roadmap/generator" className="rounded-lg bg-muted p-6  transition-colors hover:bg-muted/60 hover:shadow-sm">
                <Route className="mb-4 h-8 w-8 text-primary" />
                <h3 className="text-xl font-semibold">Learning Roadmap</h3>
                <p className="text-muted-foreground">
                    Our AI creates a personalized learning roadmap tailored to your career goals and interests. ensuring efficient skill development.
                </p>
              </Link>
              <Link href="/learn/course" className="rounded-lg bg-muted p-6  transition-colors hover:bg-muted/60 hover:shadow-sm">
                <Book className="mb-4 h-8 w-8 text-primary" />
                <h3 className="text-xl font-semibold">Learning Courses</h3>
                <p className="text-muted-foreground">
                    Access a variety of courses designed to enhance your skills and knowledge, all recommended by our intelligent AI system.
                </p>
              </Link>
            </div>

            <div className="grid gap-4">
              <Link href="/learn/interest-finder" className="rounded-lg bg-muted p-6  transition-colors hover:bg-muted/60 hover:shadow-sm">
              <MessageSquareHeart className="mb-4 h-8 w-8 text-primary" />
                <h3 className="text-xl font-semibold">Interest Finder</h3>
                <p className="text-muted-foreground">
                Discover your professional interests with our AI-powered interest finder, guiding you towards the most suitable career path.
                </p>
              </Link>
              <Link href="/learn/course" className="rounded-lg bg-muted p-6  transition-colors hover:bg-muted/60 hover:shadow-sm">
                <Lightbulb className="mb-4 h-8 w-8 text-primary" />
                <h3 className="text-xl font-semibold">Learning Assistant</h3>
                <p className="text-muted-foreground">
                Get instant assistance with our AI-powered chatbot, providing answers, resources, and guidance to support your learning journey.
                </p>
              </Link>
            </div>
            <div className="grid gap-4">
              <Link href="/jobs/clinic/interview" className="rounded-lg bg-muted p-6  transition-colors hover:bg-muted/60 hover:shadow-sm">
                <Headset className="mb-4 h-8 w-8 text-primary" />
                <h3 className="text-xl font-semibold">Interview Trainer</h3>
                <p className="text-muted-foreground">
                Prepare for job interviews with our AI-driven interview trainer, offering realistic practice sessions and feedback.
                </p>
              </Link>
              <Link href="/jobs/clinic/cv" className="rounded-lg bg-muted p-6  transition-colors hover:bg-muted/60 hover:shadow-sm">
              <ScrollText className="mb-4 h-8 w-8 text-primary" />
                <h3 className="text-xl font-semibold">CV Helper</h3>
                <p className="text-muted-foreground">
                Optimize your resume with our AI-powered CV Helper, providing suggestions and improvements to help you stand out to employers.
                </p>
              </Link>
            </div>
          </div>
        </div>
      <div className="container relative">
          <section className="mx-auto flex max-w-[980px] flex-col items-center pt-20">
            <span className="max-w-[750px] text-center text-lg font-light text-foreground italic">
            {"\"We design our application with the utmost dedication to our users' needs. Our goal is to provide personalized, AI-driven solutions that empower developers to achieve their career aspirations efficiently and effectively. Your success is our mission.\""}
            </span>
          </section>
        </div>
      </section>
      <section className="w-full md:py-12 lg:py-20 bg-muted">
        <div className="container space-y-12 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="mb-4 inline-block rounded-lg bg-background px-3 py-1 text-sm">Testimonials</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Customers Say <Users className="h-12 w-12 inline-block ml-2 mb-1"/></h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hear from our satisfied customers and learn how our solution has transformed their career.
              </p>
              <p className="text-muted-foreground text-center flex flex-col text-xs">
                Disclaimer: The following testimonials are not real and are for illustrative purposes only.
            </p>
            </div>
          </div>
          <div className="mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:max-w-5xl">
            <Card className="p-6 space-y-4">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>DA</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-lg font-semibold">Dandy Arif</h4>
                  <p className="text-muted-foreground">Developer Lead, Madura Tech</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                {"\"CodeNav has been a vital tool in my career development. The personalized learning roadmap has helped me acquire new skills efficiently, and the AI learning assistant is always available to answer my questions. Highly recommended\""}
              </p>
              
            </Card>
            <Card className="p-6 space-y-4">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>KF</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-lg font-semibold">Kemal Fathurrahman</h4>
                  <p className="text-muted-foreground">AI Engineer, EdgyHub Inc.</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                {"\"I've used several career development tools, but none compare to CodeNav. The AI interview trainer helped me prepare for my recent job change, and the CV Helper provided invaluable feedback on my resume. CodeNav truly sets itself apart with its AI-driven approach.\""}
              </p>
            </Card>
            <Card className="p-6 space-y-4">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-lg font-semibold">Ilham Hazetra</h4>
                  <p className="text-muted-foreground">CTO, Stark Industries</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                {"\"Using CodeNav has been a game-changer for my career. The AI-powered chatbot provides instant support, and the learning courses are perfectly tailored to my needs. The platform's security and scalability also give me confidence in its long-term value.\""}
              </p>
            </Card>
            
          </div>

        </div>
      </section>
      <section className="w-full py-4 md:py-16 lg:py-24">
        <div className="container space-y-12 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="mb-4 inline-block rounded-lg bg-muted px-3 py-1 text-sm">Screenshots</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">See Our Solution in Action<Zap className="h-12 w-12 inline-block ml-2 mb-1"/></h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Check out these screenshots to get a glimpse of our innovative product in use.
              </p>
            </div>
          </div>
          <div className="mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:max-w-5xl">
            <div
              className="relative cursor-pointer"
              onClick={() => handleImageClick("/home/roadmap-generator.png")}
            >
              <Image
                src="/home/roadmap-generator.png"
                width={640}
                height={360}
                alt="Learning Roadmap"
                className="rounded-lg object-cover"
              />
              <div className="absolute bottom-4 left-4 rounded-lg bg-background/70 px-3 py-1 text-sm text-card-foreground">
                Learning Roadmap
              </div>
            </div>
            <div
              className="relative cursor-pointer"
              onClick={() => handleImageClick("/home/interest-finder.png")}
            >
              <Image
                src="/home/interest-finder.png"
                width={640}
                height={360}
                alt="Interest Finder"
                className="rounded-lg object-cover"
              />
              <div className="absolute bottom-4 left-4 rounded-lg bg-background/70 px-3 py-1 text-sm text-card-foreground">
                Interest Finder
              </div>
            </div>
            <div
              className="relative cursor-pointer"
              onClick={() => handleImageClick("/home/interview-review.png")}
            >
              <Image
                src="/home/interview-review.png"
                width={640}
                height={360}
                alt="Interview Trainer"
                className="rounded-lg object-cover"
              />
              <div className="absolute bottom-4 left-4 rounded-lg bg-background/70 px-3 py-1 text-sm text-card-foreground">
                Interview Trainer
              </div>
            </div>
            <div
              className="relative cursor-pointer"
              onClick={() => handleImageClick("/home/course.png")}
            >
              <Image
                src="/home/course.png"
                width={640}
                height={360}
                alt="Learning Courses"
                className="rounded-lg object-cover"
              />
              <div className="absolute bottom-4 left-4 rounded-lg bg-background/70 px-3 py-1 text-sm text-card-foreground">
                Learning Courses
              </div>
            </div>
            <div
              className="relative cursor-pointer"
              onClick={() => handleImageClick("/home/learning-assist.png")}
            >
              <Image
                src="/home/learning-assist.png"
                width={640}
                height={360}
                alt="Learning Assistant"
                className="rounded-lg object-cover"
              />
              <div className="absolute bottom-4 left-4 rounded-lg bg-background/70 px-3 py-1 text-sm text-card-foreground">
                Learning Assistant
              </div>
            </div>
            <div
              className="relative cursor-pointer"
              onClick={() => handleImageClick("/home/cv-feedback.png")}
            >
              <Image
                src="/home/cv-feedback.png"
                width={640}
                height={360}
                alt="CV Helper"
                className="rounded-lg object-cover"
              />
              <div className="absolute bottom-4 left-4 rounded-lg bg-background/70 px-3 py-1 text-sm text-card-foreground">
                CV Helper
              </div>
            </div>
          </div>
        </div>
      </section>
      {isModalOpen && (
        <Dialog open={isModalOpen} onOpenChange={handleModalClose}>
          <DialogContent className="p-0">
            <DialogTitle></DialogTitle> 
            <Image
              src={selectedImage}
              width={800}
              height={600}
              alt="Zoomed Screenshot"
              className="object-contain w-full h-full"
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
