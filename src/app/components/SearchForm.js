"use client"

import { useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

export default function SearchForm({ onSearch }) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    (<form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for books..."
        className="flex-grow" />
      <Button type="submit">Search</Button>
    </form>)
  );
}

