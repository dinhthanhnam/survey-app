"use client";
import React from "react";
import Header from "./components/Header";
import Body from "./components/Body";

export default function SurveyPage() {
  return (
    <div className="min-h-screen bg-custom-wave bg-cover bg-repeat flex justify-center items-center p-4">
      <div className="w-full sm:w-3/4 lg:w-1/2 bg-white shadow-lg rounded-lg p-4 sm:p-8 max-h-[90vh] overflow-y-auto absolute md:static">
        <Header />
        <Body />
      </div>
    </div>
  );
}
