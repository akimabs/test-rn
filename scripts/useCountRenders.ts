import { useRef } from "react";

export const useCountRenders = (component: string) => {
  const renders = useRef(0);
  console.log(`${component} renders: `, renders.current++);
};
