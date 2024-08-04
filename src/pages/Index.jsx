import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Index = () => {
  const [count, setCount] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [shake, setShake] = useState(false);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 300);
  };

  const increment = () => {
    setCount(prev => prev + 1);
    triggerShake();
  };

  const decrement = () => {
    setCount(prev => prev - 1);
    triggerShake();
  };

  useEffect(() => {
    if (count % 5 === 0 && count !== 0) {
      setShowMessage(true);
      const timer = setTimeout(() => setShowMessage(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [count]);

  const shakeAnimation = {
    shake: {
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <motion.div
        className="text-center"
        animate={shake ? "shake" : ""}
        variants={shakeAnimation}
      >
        <AnimatePresence>
          {showMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4 inline-block"
            >
              Congratulations! You've reached a multiple of 5!
            </motion.div>
          )}
        </AnimatePresence>
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
      </motion.div>
    </div>
  );
};

export default Index;
