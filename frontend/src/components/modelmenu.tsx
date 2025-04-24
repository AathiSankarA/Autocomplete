'use client'

import {
  ChevronDown
} from "lucide-react"

import {
  Button
} from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Dispatch, SetStateAction, useEffect, useState } from "react"
import axios from "axios"

export function ModelsMenu({setModel}:{ setModel: Dispatch<SetStateAction<string>> }) {
  const [models, setModels] = useState<{ "category": string, "instances": string[] }[]>([])
  const [selected, setSelected] = useState<string>("")
  function handleOnClick(item: string) {
    console.log("Clicked");
    setSelected(item);
    setModel(item);
  }

  useEffect(() => {
    async function oneTime() {
      const result = await axios.get("http://127.0.0.1:8000/models").then(res => res.data);
      setModels(result);
    }

    oneTime()
  },[])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline"><>{selected ? selected : "Select a model"} <ChevronDown /></></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {
          models.map((category) => (
            <DropdownMenuSub key={category.category}>
              <DropdownMenuSubTrigger>
                <span>{category.category}</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {category.instances.map((model) => (<DropdownMenuItem key={category.category + "+" + model}>
                    <span onClick={() => handleOnClick(category.category + "+" + model)}>{model}</span>
                  </DropdownMenuItem>))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>)
          )
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

