"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface HomepageCard {
  _id: string
  name: string
  backgroundUrl?: string
  position: "center" | "bottom-left" | "bottom-right"
  isActive: boolean
  createdAt: string
}

export default function HomepageCardsPage() {
  const [cards, setCards] = useState<HomepageCard[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [uploadingCardId, setUploadingCardId] = useState<string | null>(null)
  const [selectedFiles, setSelectedFiles] = useState<Record<string, File | null>>({})
  const [inputKeys, setInputKeys] = useState<Record<string, number>>({})

  const fetchCards = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/admin/homepage-cards")
      const data = await response.json()

      if (data.success) {
        setCards(data.data)
      }
    } catch (error) {
      console.error("[v0] Error fetching homepage cards:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCards()
  }, [fetchCards])

  const uploadGif = async (file: File) => {
    const formData = new FormData()
    formData.append("file", file)

    const uploadResponse = await fetch("/api/admin/homepage-cards/upload", {
      method: "POST",
      body: formData,
    })

    const uploadData = await uploadResponse.json()

    if (!uploadData.success) {
      throw new Error(uploadData.message || "Failed to upload image")
    }

    return uploadData.url as string
  }

  const handleGifReplace = async (cardId: string, file: File) => {
    try {
      setUploadingCardId(cardId)
      setError(null)
      const url = await uploadGif(file)
      const response = await fetch(`/api/admin/homepage-cards/${cardId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ backgroundUrl: url }),
      })
      const data = await response.json()

      if (data.success) {
        setCards(cards.map((card) => (card._id === cardId ? data.data : card)))
        setSelectedFiles((prev) => ({ ...prev, [cardId]: null }))
        setInputKeys((prev) => ({ ...prev, [cardId]: (prev[cardId] || 0) + 1 }))
        setSuccess("GIF updated successfully")
        setTimeout(() => setSuccess(null), 3000)
      } else {
        setError(data.message || "Failed to update GIF")
      }
    } catch (error: any) {
      console.error("[v0] Error updating GIF:", error)
      setError(error.message || "Failed to update GIF. Please try again.")
    } finally {
      setUploadingCardId(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-[#8B5A3C]/10 animate-pulse mx-auto mb-4" />
          <p className="text-[#8B5A3C]">Loading homepage cards...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}
      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
          {success}
        </div>
      )}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#8B5A3C]">Homepage Cards</h1>
          <p className="text-[#8B5A3C]/60 mt-1">Update background GIFs for the existing homepage cards</p>
        </div>
      </div>

      <div className="space-y-3">
        {cards.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-[#D9CFC7]">
            <p className="text-[#8B5A3C]/60">No cards found. Please seed the existing cards in the database.</p>
          </div>
        ) : (
          cards.map((card) => (
            <div key={card._id} className="bg-white rounded-lg border border-[#D9CFC7] p-4 transition-all hover:shadow-md">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-md border border-[#EED9C4] bg-[#F9F7F4] flex items-center justify-center text-xs text-[#8B5A3C]/70 overflow-hidden">
                    {card.backgroundUrl && /\.(gif)(\?|#|$)/i.test(card.backgroundUrl) ? (
                      <img src={card.backgroundUrl} alt={`${card.name} GIF`} className="w-full h-full object-cover" />
                    ) : (
                      "GIF"
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-[#6D4530]">{card.name}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          card.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {card.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <p className="text-sm text-[#8B5A3C]/70">Position: {card.position}</p>
                    <p className="text-xs text-[#B8A396]">{new Date(card.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 md:items-end">
                  <Input
                    key={inputKeys[card._id] || 0}
                    type="file"
                    accept="image/gif"
                    className="border-[#D9CFC7] text-[#6D4530]"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null
                      setSelectedFiles((prev) => ({ ...prev, [card._id]: file }))
                    }}
                    disabled={uploadingCardId === card._id}
                  />
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      onClick={() => {
                        const file = selectedFiles[card._id]
                        if (file) {
                          handleGifReplace(card._id, file)
                        }
                      }}
                      disabled={!selectedFiles[card._id] || uploadingCardId === card._id}
                      className="bg-[#6D4530] hover:bg-[#4E3222] text-white"
                    >
                      {uploadingCardId === card._id ? "Uploading..." : "Upload"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setSelectedFiles((prev) => ({ ...prev, [card._id]: null }))
                        setInputKeys((prev) => ({ ...prev, [card._id]: (prev[card._id] || 0) + 1 }))
                      }}
                      disabled={!selectedFiles[card._id] || uploadingCardId === card._id}
                      className="border-[#D9CFC7] text-[#6D4530]"
                    >
                      Cancel
                    </Button>
                  </div>
                  <p className="text-xs text-[#8B5A3C]/70">
                    {selectedFiles[card._id] ? "Ready to upload." : "Select a GIF to upload."}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
