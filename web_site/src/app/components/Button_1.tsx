import React, { useState } from 'react';
import { Button } from './ui/button';
import { useTransition } from 'react';
import { LoaderCustombg } from './ui/LoaderCustombg';

const Button_1: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...rest }) => {

    const [isPending, startTransition] = useTransition();
    const [isLoading, setIsLoading] = useState(false);
  
    const handleClick: React.MouseEventHandler<HTMLButtonElement> = async () => {
      setIsLoading(true);
      await startTransition(() => {
        setIsLoading(false);
      });
    };
  
    return (
      <Button onClick={handleClick} {...rest}>
        {isLoading ? <LoaderCustombg /> : children}
      </Button>
    );
};

export default Button_1;