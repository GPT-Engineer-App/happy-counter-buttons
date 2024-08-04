import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Plus, Minus } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  const [count, setCount] = useState(0);
  const [shake, setShake] = useState(false);
  const [progress, setProgress] = useState(0);
  const [buttonsAtTop, setButtonsAtTop] = useState(false);
  const [buttonsSpread, setButtonsSpread] = useState(false);

  useEffect(() => {
    setButtonsAtTop(count >= 20);
    setButtonsSpread(count >= 21);
  }, [count]);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 300);
  };

  const increment = () => {
    setCount(prev => prev + 1);
    triggerShake();
  };

  const decrement = () => {
    setCount(prev => Math.max(0, prev - 1));
    triggerShake();
  };

  useEffect(() => {
    if (count > 5) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 1;
        });
      }, 50);
      return () => clearInterval(interval);
    } else {
      setProgress(0);
    }
  }, [count]);

  const shakeAnimation = {
    shake: {
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.3 }
    }
  };

  const renderButtons = () => (
    <div className={`flex items-center ${buttonsSpread ? 'justify-between w-full' : 'justify-center space-x-4'} mb-4`}>
      <Button onClick={decrement} variant="outline" size="icon">
        <Minus className="h-4 w-4" />
      </Button>
      <span className="text-2xl font-bold">{count}</span>
      <Button onClick={increment} variant="outline" size="icon">
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {buttonsAtTop && (
        <div className="w-full bg-white shadow-md p-4">
          {renderButtons()}
        </div>
      )}
      <div className="flex-grow flex items-center justify-center">
        <motion.div
          className={`text-center ${buttonsSpread ? 'w-full px-4' : ''}`}
          animate={shake ? "shake" : ""}
          variants={shakeAnimation}
        >
          <h1 className="text-4xl font-bold mb-4">Counter App</h1>
          {!buttonsAtTop && renderButtons()}
          {count > 5 && (
            <div className="w-64 mx-auto">
              <Progress value={progress} className="w-full" />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
