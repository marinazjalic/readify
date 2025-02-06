"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function WantToReadButton() {
  const [wantToRead, setWantToRead] = useState(false)

  return (
    (<Button
      onClick={() => setWantToRead(!wantToRead)}
      variant={wantToRead ? "default" : "outline"}
      className="w-full rounded-full bg-forest-green hover:bg-forest-green-dark text-white">
      {wantToRead ? "Added to List" : "Want to Read"}
    </Button>)
  );
}

