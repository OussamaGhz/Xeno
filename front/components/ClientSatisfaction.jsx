"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { User } from "lucide-react";

const ClientSatisfaction = ({ percentage = 80, rating = "Excellent" }) => {
    return (
        <Card className="w-full bg-[#292E30] text-white border-2 border-[#4682B6] rounded-lg mb-3">
            <div className="text-center w-full mx-auto border-2 rounded-b-2xl rounded-t-none border-t-0 border-[#4682B6] px-6 sm:px-12">
                <span className="text-base sm:text-lg font-bold text-white mb-4">
                    Client Satisfaction
                </span>
            </div>
            <CardContent className="flex flex-col items-center py-6 sm:py-8">
                <div className="w-32 h-32 sm:w-48 sm:h-48 relative">
                    <CircularProgressbar
                        value={percentage}
                        text={`${percentage}%`}
                        styles={buildStyles({
                            rotation: 0.75,
                            strokeLinecap: "round",
                            textSize: "16px",
                            pathTransitionDuration: 0.5,
                            pathColor: "#4682B6",
                            textColor: "#4682B6",
                            trailColor: "#ffffff20",
                        })}
                    />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-4">
                        <div className="flex flex-col items-center">
                            <User size={24} className="text-[#4682B6] mb-1" />
                            <span className="text-[#4682B6]">{rating}</span>
                        </div>
                    </div>
                </div>
                <p className="text-center text-gray-300 mt-4 sm:mt-8 max-w-md px-4">
                    It is the percentage of time during the week when the ratio
                    of requested to allocated bandwidth is close to 1.
                </p>
            </CardContent>
        </Card>
    );
};

export default ClientSatisfaction;
