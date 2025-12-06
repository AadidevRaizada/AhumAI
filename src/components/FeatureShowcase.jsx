import * as React from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import DarkVeil from './DarkVeil';
import TrueFocus from './TrueFocus';

export function FeatureShowcase({
    eyebrow = "Discover",
    title,
    description,
    stats = ["1 reference", "30s setup", "Share‑ready"],
    steps = [
        {
            id: "step-1",
            title: "Drop a reference",
            text:
                "Upload a single image. We read it like a brief and extract palette, texture and cues.",
        },
        {
            id: "step-2",
            title: "Pick the vibe",
            text:
                "Switch between mockup, screen, or abstract views and tune the mood instantly.",
        },
        {
            id: "step-3",
            title: "Export & share",
            text:
                "Get a moodboard ready for your team with consistent visuals and notes.",
        },
    ],
    tabs,
    defaultTab,
    panelMinHeight = 720,
    className,
    showBackground = true,
    websiteUrl = "#",
    useTrueFocus = false,
}) {
    const initial = defaultTab ?? (tabs[0]?.value ?? "tab-0");

    return (
        <section className={cn("w-full relative overflow-hidden bg-transparent text-white", className)}>
            {/* DarkVeil Background - only if showBackground is true */}
            {showBackground && (
                <div className="absolute inset-0 z-0">
                    <DarkVeil />
                </div>
            )}

            <div className="container relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-12 md:py-20 lg:gap-14">
                {/* Left column */}
                <div className="md:col-span-6">
                    <Badge variant="outline" className="mb-6 text-white border-white/20">
                        {eyebrow}
                    </Badge>

                    {useTrueFocus ? (
                        <div className="text-4xl font-bold sm:text-5xl md:text-6xl">
                            <TrueFocus
                                sentence={title}
                                manualMode={false}
                                blurAmount={3}
                                borderColor="#22d3ee"
                                animationDuration={1.5}
                                pauseBetweenAnimations={1}
                            />
                        </div>
                    ) : (
                        <h2 className="text-balance text-4xl font-bold leading-[0.95] sm:text-5xl md:text-6xl text-white">
                            {title}
                        </h2>
                    )}

                    {description ? (
                        <p className="mt-6 max-w-xl text-gray-300">{description}</p>
                    ) : null}

                    {/* Stats chips */}
                    {stats.length > 0 && (
                        <div className="mt-6 flex flex-wrap gap-2">
                            {stats.map((s, i) => (
                                <Badge
                                    key={i}
                                    variant="secondary"
                                    className="bg-white/10 text-white hover:bg-white/20"
                                >
                                    {s}
                                </Badge>
                            ))}
                        </div>
                    )}

                    {/* Steps (Accordion) */}
                    <div className="mt-10 max-w-xl">
                        <Accordion type="single" collapsible className="w-full">
                            {steps.map((step) => (
                                <AccordionItem key={step.id} value={step.id} className="border-white/10">
                                    <AccordionTrigger className="text-left text-base font-medium text-white hover:no-underline hover:text-nebula-cyan">
                                        {step.title}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-sm text-gray-400">
                                        {step.text}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>

                        {/* CTAs */}
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Button asChild size="lg" className="bg-white text-black hover:bg-gray-200">
                                <a href={websiteUrl} target="_blank" rel="noopener noreferrer">
                                    Website
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Right column (unchanged) */}
                <div className="md:col-span-6">
                    <Card
                        className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm p-0 shadow-2xl"
                        style={{ height: panelMinHeight, minHeight: panelMinHeight }}
                    >
                        <Tabs defaultValue={initial} className="relative h-full w-full">
                            {/* Absolute-fill media container */}
                            <div className="relative h-full w-full">
                                {tabs.map((t, idx) => (
                                    <TabsContent
                                        key={t.value}
                                        value={t.value}
                                        className={cn(
                                            "absolute inset-0 m-0 h-full w-full",
                                            "data-[state=inactive]:hidden"
                                        )}
                                    >
                                        <img
                                            src={t.src}
                                            alt={t.alt ?? t.label}
                                            className="h-full w-full object-contain p-4"
                                            loading={idx === 0 ? "eager" : "lazy"}
                                        />
                                    </TabsContent>
                                ))}
                            </div>

                            {/* Tab controls (pill) */}
                            <div className="pointer-events-auto absolute inset-x-0 bottom-4 z-10 flex w-full justify-center">
                                <TabsList className="flex gap-2 rounded-xl border border-white/10 bg-black/60 p-1 backdrop-blur supports-[backdrop-filter]:bg-black/50">
                                    {tabs.map((t) => (
                                        <TabsTrigger
                                            key={t.value}
                                            value={t.value}
                                            className="rounded-lg px-4 py-2 text-gray-400 data-[state=active]:bg-white/20 data-[state=active]:text-white"
                                        >
                                            {t.label}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                            </div>
                        </Tabs>
                    </Card>
                </div>
            </div>
        </section>
    );
}
