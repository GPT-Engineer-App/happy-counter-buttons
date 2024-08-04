import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";

const Index = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Counter App</h1>
        <div className="flex items-center justify-center space-x-4">
          <Button onClick={decrement} variant="outline" size="icon">
            <Minus className="h-4 w-4" />
          </Button>
          <span className="text-2xl font-bold">{count}</span>
          <Button onClick={increment} variant="outline" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
