import React, { useState, useEffect } from "react";
import AnimatedRoutes from "./routes/AnimatedRoutes/AnimatedRoutes"
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading time for branding effect
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="bg-[#020617] min-h-screen text-slate-200 selection:bg-indigo-500/30">
      <AnimatedRoutes />
    </div>
  )
}

export default App