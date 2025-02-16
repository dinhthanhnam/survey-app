"use client";
import React from "react";
import Header from "./components/Header";
import Body from "./components/Body";

export default function SurveyPage() {
  return (
    <div className="min-h-screen bg-custom-wave bg-cover bg-repeat flex items-center justify-center p-4 sm:pt-8 sm:pb-8">
      <div className="w-full sm:w-[90%] md:w-[80%] lg:w-3/5 mx-auto bg-white shadow-lg rounded-lg p-4 sm:p-6 md:p-8 max-h-screen overflow-y-auto pb-32">
        <Header />
        <Body />
      </div>
    </div>
  );
}
