"use client"

import React, { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const NetworkUsageGraph = ({ data: clientData, title }) => {
    const [selectedPeriod, setSelectedPeriod] = useState("Today");

    // Format data based on selected period
    const formattedData = useMemo(() => {
        // Find the earliest and latest timestamps
        const timestamps = clientData.flatMap(client => 
            client.data.map(d => new Date(d.timestamp))
        );
        const minTime = Math.min(...timestamps.map(t => t.getTime()));
        const maxTime = Math.max(...timestamps.map(t => t.getTime()));

        // Create a map to store aggregated bandwidth usage
        const timeMap = new Map();

        if (selectedPeriod === "Today") {
            // Group data by hour for today's view
            clientData.forEach(client => {
                client.data.forEach(dataPoint => {
                    const date = new Date(dataPoint.timestamp);
                    const hour = date.getHours();
                    const hourKey = `${hour.toString().padStart(2, '0')}:00`;
                    
                    const currentTotal = timeMap.get(hourKey) || 0;
                    timeMap.set(hourKey, currentTotal + dataPoint.bandwidth);
                });
            });

            // Fill in missing hours with 0
            return Array.from({ length: 24 }, (_, i) => {
                const hourKey = `${i.toString().padStart(2, '0')}:00`;
                return {
                    time: hourKey,
                    usage: timeMap.get(hourKey) || 0
                };
            });
        } else {
            // Group data by day for week view
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            clientData.forEach(client => {
                client.data.forEach(dataPoint => {
                    const date = new Date(dataPoint.timestamp);
                    const dayName = days[date.getDay()];
                    
                    const currentTotal = timeMap.get(dayName) || 0;
                    timeMap.set(dayName, currentTotal + dataPoint.bandwidth);
                });
            });

            // Create array with all days
            return days.map(day => ({
                time: day,
                usage: timeMap.get(day) || 0
            }));
        }
    }, [clientData, selectedPeriod]);

    // Calculate max usage for Y-axis domain
    const maxUsage = useMemo(() => {
        const max = Math.max(...formattedData.map(d => d.usage));
        return Math.ceil(max / 10) * 10; // Round up to nearest 10
    }, [formattedData]);

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
                                domain={[0, maxUsage]}
                                ticks={Array.from({ length: 6 }, (_, i) => (maxUsage / 5) * i)}
                            />
                            <Tooltip 
                                contentStyle={{ 
                                    backgroundColor: '#292E30',
                                    border: '1px solid #4682B6',
                                    color: 'white'
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="usage"
                                stroke="#60A5FA"
                                fillOpacity={1}
                                fill="url(#networkGradient)"
                                name="Bandwidth Usage (Mbps)"
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