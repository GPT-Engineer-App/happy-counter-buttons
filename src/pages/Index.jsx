import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Index = () => {
  const [count, setCount] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);

  useEffect(() => {
    if (count % 5 === 0 && count !== 0) {
      setShowMessage(true);
      const timer = setTimeout(() => setShowMessage(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [count]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Counter App</h1>
        <AnimatePresence>
          {showMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-green-600 font-bold mb-4"
            >
              Congratulations! You've reached a multiple of 5!
            </motion.div>
          )}
        </AnimatePresence>
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
