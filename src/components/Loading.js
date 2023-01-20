import { useEffect, useState } from "react";

export default function Loading() {
  const [dots, setDots] = useState("");
  // let dots=''
  function addDot() {
    setDots((current) => {
      current += ".";
      if(current.length>4){
        current= ''
      }
      return current
    });
  }
  useEffect(() => {
    setTimeout(addDot, 200);
  }, [dots]);
  return <h2 className="loading">Loading{dots}</h2>;
}
