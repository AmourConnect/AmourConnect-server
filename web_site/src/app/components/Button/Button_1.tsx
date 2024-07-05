"use client";
import React, { useState, useEffect } from 'react';
import { Button } from '@/app/components/ui/button';
import { LoaderCustombg } from '@/app/components/ui/LoaderCustombg';

interface ButtonGet {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  title?: string;
  className?: string;
}

export const Button_1Loading = ({ onClick, title, className }: ButtonGet) => {
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (isPending) {
      const timer = setTimeout(() => {
        setIsPending(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isPending]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (isPending) {
      return;
    }
    setIsPending(true);
    onClick && onClick(e);
  };

  return (
    <Button
      onClick={handleClick}
      className={className}
    >
      {isPending ? <LoaderCustombg /> : title }
    </Button>
  );
};