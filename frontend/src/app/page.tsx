'use strict'
'use client'

import { useState } from "react";

export default function Home() {
  const [content,setContent] = useState<String>('')
  function changeHandler(){
    console.log(content)
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <input type="text" onChange={changeHandler}/>
    </div>
  );
}
