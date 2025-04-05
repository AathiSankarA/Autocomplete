'use client'

import { ModelsMenu } from "@/components/modelmenu"
import { Textarea } from "@/components/ui/textarea"
import { ChangeEvent, useEffect, useState } from "react"

export default function Try() {
  const [text, setText] = useState<string>("");
  const [connection, setConnection] = useState<WebSocket | null>(null);
  const [autocomplete, setAutocomplete] = useState<string>("");
  const [model , setModel] = useState<string>("")
  
  useEffect(() => {
    const wsConn = new WebSocket("ws://localhost:8000/" + model);
    wsConn.onmessage = onMessage;
    setConnection(wsConn);

    return () => {
      wsConn.close();
    };
  }, [model]);

  function onMessage(event: MessageEvent) {
    const data = event.data;
    if (data.substr(0) == "[")
      {setAutocomplete(data.slice(text.length+1));}
    else
      {setAutocomplete(data.slice(text.length));}
  }

  function handleOnInput(e: ChangeEvent<HTMLTextAreaElement>) {
    setText(e.target.value);
    if (connection?.readyState === WebSocket.OPEN) {
      connection.send(e.target.value);
    }
  }

  return (
    <>
      <div>
        <ModelsMenu setModel={setModel} />
        <br />
        <Textarea
          value={text}
          onInput={handleOnInput}
        />
        {autocomplete}
      </div>
    </>
  );
}
