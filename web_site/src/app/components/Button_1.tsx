import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { LoaderCustombg } from './ui/LoaderCustombg';

interface ButtonGet {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
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

  return (
    <Button
      onClick={() => {
        setIsPending(true);
        onClick && onClick();
      }}
      className={className}
    >
      {isPending ? <LoaderCustombg /> : title }
    </Button>
  );
}