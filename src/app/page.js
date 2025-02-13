"use client";
import React from "react";
import Header from "./components/Header";
import Body from "./components/Body";

export default function SurveyPage() {
  return (
    
    <div className="min-h-screen bg-custom-wave bg-cover bg-repeat ">
      <div className="w-1/2 mx-auto bg-white shadow-lg rounded-lg p-8 mt-10 fixed fixed left-1/2 transform -translate-x-1/2">
        <Header />
        <Body />
      </div>
    </div>
  );
}
