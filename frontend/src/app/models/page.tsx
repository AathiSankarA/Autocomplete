'use client'

import axios from "axios";
import { useEffect, useState } from "react"

export default function Models() {
  const [models, setModels] = useState<{ "category": string, "instances": string[] }[]>([])
  const [config, setConfig] = useState<{
    "instance": string, "config": {
      "HIDDEN_SIZE": number,
      "VOCAB_SIZE": number,
      "N_LAYERS": number,
      "P_DROPOUT": number
    }
  }[]>([])
  useEffect(() => {
    async function oneTime() {
      const result: { "category": string, "instances": string[] }[] = await axios.get("http://localhost:8000/models").then(res => res.data);
      console.log(result);
      setModels(result);
      const temp: {
        "instance": string, 
        "config": {
          "HIDDEN_SIZE": number,
          "VOCAB_SIZE": number,
          "N_LAYERS": number,
          "P_DROPOUT": number
        }
      }[] = [];
      let te;
      for (const i of result) {
        for (const j of i.instances) {
          {
            te = await axios.get(`http://localhost:8000/model/${i.category}/${j}`).then(r => r.data);
            temp.push({"instance":j,"config":te});
          }
        }
      }
      setConfig(temp);
      console.log(temp);
    }
    oneTime();
  }, [])

  return (
    <>
      <h1 className="text-4xl font-extrabold"> Available models </h1>
      <div className="justify-start w-full">
        {
          models.map((entry) => (
            <div key={entry.category}>
              <h2 className="text-2xl font-bold">{entry.category}</h2>

              <div>

                <ol>
                  {
                    entry.instances.map((instance) => (
                      <li className="font-bold" key={entry.category + instance}>{instance}
                        <div>
                          {config.filter((i) => i.instance === instance).map((j) => (
                            <div className="font-normal" key={entry.category + instance}>
                            *HIDDEN_SIZE:{j.config.HIDDEN_SIZE}<br/>
                            *N_LAYERS:{j.config.N_LAYERS}<br/>
                            *P_DROPOUT:{j.config.P_DROPOUT}<br/>
                            *VOCAB_SIZE:{j.config.VOCAB_SIZE}<br/>
                            </div>
                          ))}
                        </div>
                      </li>
                    ))
                  }
                </ol>
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}
