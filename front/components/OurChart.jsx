"use client"

import React, { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";

const NetworkUsageGraph = ({ data: initialData, title }) => {
    const [selectedPeriod, setSelectedPeriod] = useState("Today");

    // Format data based on selected period
    const formattedData = useMemo(() => {
        if (selectedPeriod === "Today") {
            return Array.from({ length: 24 }, (_, i) => ({
                time: `${i.toString().padStart(2, '0')}:00`,
                usage: 5 + Math.sin(i * 0.5) * 2 + Math.random() * 1.5,
            }));
        } else {
            // Week view - 7 days
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            return Array.from({ length: 7 }, (_, i) => ({
                time: days[i],
                usage: 5 + Math.sin(i * 0.5) * 2 + Math.random() * 1.5,
            }));
        }
    }, [selectedPeriod]);

    // Time period buttons component
    const TimePeriodButtons = ({ value, onChange }) => (
        <div className="flex gap-2">
            {["Today", "Week"].map((option) => (
                <button
                    key={option}
                    onClick={() => onChange(option)}
                    className={`px-4 py-1 rounded-lg transition-colors ${
                        value === option
                            ? "bg-[#4682B6] text-white"
                            : "bg-transparent text-white border border-[#4682B6]"
                    }`}
                >
                    {option}
                </button>
            ))}
        </div>
    );

    return (
        <Card className="w-full bg-[#292E30] text-white border-2 border-[#4682B6] rounded-lg mb-3">
            <div className="text-center w-fit mx-auto border-2 rounded-b-2xl rounded-t-none border-t-0 border-[#4682B6] px-12">
                <span className="text-lg text-white mb-4">
                    {title}
                </span>
            </div>
            <CardContent>
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={formattedData}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient
                                    id="networkGradient"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="#60A5FA"
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="#60A5FA"
                                        stopOpacity={0.2}
                                    />
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="time"
                                stroke="#6B7280"
                                tick={{ fill: "#6B7280" }}
                                interval={selectedPeriod === "Today" ? 3 : 0}
                            />
                            <YAxis
                                stroke="#6B7280"
                                tick={{ fill: "#6B7280" }}
                                domain={[0, 10]}
                                ticks={[0, 2, 4, 6, 8, 10]}
                            />
                            <Area
                                type="monotone"
                                dataKey="usage"
                                stroke="#60A5FA"
                                fillOpacity={1}
                                fill="url(#networkGradient)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-2 mt-4">
                    <TimePeriodButtons 
                        value={selectedPeriod} 
                        onChange={setSelectedPeriod} 
                    />
                </div>
            </CardContent>
        </Card>
    );
};

export default NetworkUsageGraph;