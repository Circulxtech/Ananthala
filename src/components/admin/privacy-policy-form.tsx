"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/ui/spinner"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { X, Plus, Pencil, Trash2, FileText, Eye, ChevronDown, ChevronUp, Shield } from "lucide-react"

interface Section {
  heading: string
  description: string
}

interface PrivacyPolicy {
  _id?: string
  title: string
  content: string
  sections: Section[]
  lastUpdated?: Date
  createdAt?: Date
}

type ViewMode = "list" | "create" | "edit" | "preview"

export function PrivacyPolicyForm() {
  const [policy, setPolicy] = useState<PrivacyPolicy | null>(null)
  const [formData, setFormData] = useState<PrivacyPolicy>({
    title: "Privacy Policy",
    content: "",
    sections: [],
  })
  const [viewMode, setViewMode] = useState<ViewMode>("list")
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
  const [newSection, setNewSection] = useState({ heading: "", description: "" })
  const [expandedSections, setExpandedSections] = useState<number[]>([])

  useEffect(() => {
    fetchPrivacyPolicy()
  }, [])

  const fetchPrivacyPolicy = async () => {
    try {
      setIsFetching(true)
      const response = await fetch("/api/admin/privacy-policy")
      const data = await response.json()

      if (data.success && data.privacyPolicy) {
        setPolicy(data.privacyPolicy)
        setFormData({
          _id: data.privacyPolicy._id,
          title: data.privacyPolicy.title || "Privacy Policy",
          content: data.privacyPolicy.content || "",
          sections: data.privacyPolicy.sections || [],
          lastUpdated: data.privacyPolicy.lastUpdated,
          createdAt: data.privacyPolicy.createdAt,
        })
      } else {
        setPolicy(null)
      }
    } catch (error) {
      console.error("Error fetching privacy policy:", error)
      toast.error("Failed to load privacy policy")
    } finally {
      setIsFetching(false)
    }
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, title: e.target.value })
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, content: e.target.value })
  }

  const handleSectionHeadingChange = (index: number, value: string) => {
    const updatedSections = [...formData.sections]
    updatedSections[index].heading = value
    setFormData({ ...formData, sections: updatedSections })
  }

  const handleSectionDescriptionChange = (index: number, value: string) => {
    const updatedSections = [...formData.sections]
    updatedSections[index].description = value
    setFormData({ ...formData, sections: updatedSections })
  }

  const handleAddSection = () => {
    if (newSection.heading.trim() && newSection.description.trim()) {
      setFormData({
        ...formData,
        sections: [...formData.sections, { ...newSection }],
      })
      setNewSection({ heading: "", description: "" })
      toast.success("Section added")
    } else {
      toast.error("Please fill in both heading and description")
    }
  }

  const handleRemoveSection = (index: number) => {
    const updatedSections = formData.sections.filter((_, i) => i !== index)
    setFormData({ ...formData, sections: updatedSections })
    toast.success("Section removed")
  }

  const toggleSectionExpand = (index: number) => {
    setExpandedSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim()) {
      toast.error("Title is required")
      return
    }

    if (!formData.content.trim()) {
      toast.error("Content is required")
      return
    }

    try {
      setIsLoading(true)
      const response = await fetch("/api/admin/privacy-policy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          content: formData.content,
          sections: formData.sections,
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast.success("Privacy policy created successfully!")
        setPolicy(data.privacyPolicy)
        setViewMode("list")
        await fetchPrivacyPolicy()
      } else {
        toast.error(data.message || "Failed to create privacy policy")
      }
    } catch (error) {
      console.error("Error creating privacy policy:", error)
      toast.error("Failed to create privacy policy")
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim()) {
      toast.error("Title is required")
      return
    }

    if (!formData.content.trim()) {
      toast.error("Content is required")
      return
    }

    try {
      setIsLoading(true)
      const response = await fetch("/api/admin/privacy-policy", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: formData._id,
          title: formData.title,
          content: formData.content,
          sections: formData.sections,
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast.success("Privacy policy updated successfully!")
        setPolicy(data.privacyPolicy)
        setViewMode("list")
        await fetchPrivacyPolicy()
      } else {
        toast.error(data.message || "Failed to update privacy policy")
      }
    } catch (error) {
      console.error("Error updating privacy policy:", error)
      toast.error("Failed to update privacy policy")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!policy?._id) return

    try {
      setIsDeleting(true)
      const response = await fetch(`/api/admin/privacy-policy?id=${policy._id}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (data.success) {
        toast.success("Privacy policy deleted successfully!")
        setPolicy(null)
        setFormData({
          title: "Privacy Policy",
          content: "",
          sections: [],
        })
        setViewMode("list")
      } else {
        toast.error(data.message || "Failed to delete privacy policy")
      }
    } catch (error) {
      console.error("Error deleting privacy policy:", error)
      toast.error("Failed to delete privacy policy")
    } finally {
      setIsDeleting(false)
    }
  }

  const startCreate = () => {
    setFormData({
      title: "Privacy Policy",
      content: "",
      sections: [],
    })
    setNewSection({ heading: "", description: "" })
    setViewMode("create")
  }

  const startEdit = () => {
    if (policy) {
      setFormData({
        _id: policy._id,
        title: policy.title,
        content: policy.content,
        sections: policy.sections || [],
        lastUpdated: policy.lastUpdated,
        createdAt: policy.createdAt,
      })
      setNewSection({ heading: "", description: "" })
      setViewMode("edit")
    }
  }

  const cancelForm = () => {
    setViewMode("list")
    if (policy) {
      setFormData({
        _id: policy._id,
        title: policy.title,
        content: policy.content,
        sections: policy.sections || [],
        lastUpdated: policy.lastUpdated,
        createdAt: policy.createdAt,
      })
    }
  }

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return "N/A"
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (isFetching) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <Spinner className="h-8 w-8 text-[#8B5A3C]" />
        <p className="text-[#8B5A3C]/70">Loading privacy policy...</p>
      </div>
    )
  }

  // Preview Mode
  if (viewMode === "preview" && policy) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#6D4530]">Policy Preview</h2>
          <Button
            variant="outline"
            onClick={() => setViewMode("list")}
            className="border-[#D9CFC7] text-[#6D4530] hover:bg-[#F5F1ED]"
          >
            Back to List
          </Button>
        </div>

        <Card className="border-[#E5D5C5] bg-gradient-to-br from-white to-[#FDFCFB]">
          <CardContent className="p-8">
            <div className="prose prose-brown max-w-none">
              <h1 className="text-3xl font-bold text-[#6D4530] mb-6">{policy.title}</h1>
              <p className="text-sm text-[#8B5A3C]/60 mb-8">
                Last Updated: {formatDate(policy.lastUpdated)}
              </p>
              <div className="text-[#6D4530] leading-relaxed whitespace-pre-wrap mb-8">
                {policy.content}
              </div>

              {policy.sections && policy.sections.length > 0 && (
                <div className="space-y-8 mt-8">
                  {policy.sections.map((section, index) => (
                    <div key={index} className="border-l-4 border-[#8B5A3C]/30 pl-6">
                      <h2 className="text-xl font-semibold text-[#6D4530] mb-3">
                        {index + 1}. {section.heading}
                      </h2>
                      <p className="text-[#6D4530]/80 leading-relaxed whitespace-pre-wrap">
                        {section.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Create/Edit Form
  if (viewMode === "create" || viewMode === "edit") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#6D4530]">
              {viewMode === "create" ? "Create Privacy Policy" : "Edit Privacy Policy"}
            </h2>
            <p className="text-[#8B5A3C]/70 mt-1">
              {viewMode === "create"
                ? "Fill in the details to create your privacy policy"
                : "Update your existing privacy policy"}
            </p>
          </div>
          <Button
            variant="outline"
            onClick={cancelForm}
            className="border-[#D9CFC7] text-[#6D4530] hover:bg-[#F5F1ED]"
          >
            Cancel
          </Button>
        </div>

        <form onSubmit={viewMode === "create" ? handleCreate : handleUpdate} className="space-y-6">
          <Card className="border-[#E5D5C5] bg-white shadow-sm">
            <CardHeader className="border-b border-[#E5D5C5] bg-gradient-to-r from-[#F9F7F5] to-white">
              <CardTitle className="text-lg text-[#6D4530] flex items-center gap-2">
                <FileText className="h-5 w-5 text-[#8B5A3C]" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#6D4530]">
                  Policy Title <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  value={formData.title}
                  onChange={handleTitleChange}
                  placeholder="Enter policy title"
                  className="border-[#D9CFC7] text-[#6D4530] placeholder:text-[#B8A396] focus:border-[#8B5A3C] focus:ring-[#8B5A3C]/20"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#6D4530]">
                  Main Content / Introduction <span className="text-red-500">*</span>
                </label>
                <Textarea
                  value={formData.content}
                  onChange={handleContentChange}
                  placeholder="Enter the main privacy policy content. This is typically the introduction that explains the purpose of your privacy policy..."
                  className="min-h-40 border-[#D9CFC7] text-[#6D4530] placeholder:text-[#B8A396] focus:border-[#8B5A3C] focus:ring-[#8B5A3C]/20"
                />
                <p className="text-xs text-[#8B5A3C]/60">
                  This is the main introduction/summary of your privacy policy
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#E5D5C5] bg-white shadow-sm">
            <CardHeader className="border-b border-[#E5D5C5] bg-gradient-to-r from-[#F9F7F5] to-white">
              <CardTitle className="text-lg text-[#6D4530] flex items-center gap-2">
                <Shield className="h-5 w-5 text-[#8B5A3C]" />
                Policy Sections
              </CardTitle>
              <CardDescription className="text-[#8B5A3C]/60">
                Add detailed sections to your privacy policy (e.g., Information We Collect, How We Use Your Information)
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {formData.sections.length > 0 && (
                <div className="space-y-3">
                  {formData.sections.map((section, index) => (
                    <div
                      key={index}
                      className="group p-4 bg-gradient-to-r from-[#F9F7F5] to-[#FDFCFB] rounded-lg border border-[#E5D5C5] hover:border-[#D9CFC7] transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-[#8B5A3C]/10 text-[#8B5A3C] border-[#8B5A3C]/30">
                              Section {index + 1}
                            </Badge>
                            <button
                              type="button"
                              onClick={() => toggleSectionExpand(index)}
                              className="text-[#8B5A3C]/60 hover:text-[#8B5A3C] transition-colors"
                            >
                              {expandedSections.includes(index) ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                          <Input
                            type="text"
                            value={section.heading}
                            onChange={(e) => handleSectionHeadingChange(index, e.target.value)}
                            placeholder="Section heading"
                            className="border-[#D9CFC7] text-[#6D4530] placeholder:text-[#B8A396] font-medium focus:border-[#8B5A3C]"
                          />
                          {(expandedSections.includes(index) || !section.description) && (
                            <Textarea
                              value={section.description}
                              onChange={(e) => handleSectionDescriptionChange(index, e.target.value)}
                              placeholder="Section description"
                              className="min-h-24 border-[#D9CFC7] text-[#6D4530] placeholder:text-[#B8A396] focus:border-[#8B5A3C]"
                            />
                          )}
                          {!expandedSections.includes(index) && section.description && (
                            <p className="text-sm text-[#6D4530]/70 line-clamp-2">
                              {section.description}
                            </p>
                          )}
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveSection(index)}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="p-4 bg-[#F5F1ED] rounded-lg border-2 border-dashed border-[#D9CFC7] space-y-3">
                <h4 className="font-medium text-[#6D4530] flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add New Section
                </h4>
                <Input
                  type="text"
                  value={newSection.heading}
                  onChange={(e) => setNewSection({ ...newSection, heading: e.target.value })}
                  placeholder="Section heading (e.g., Information We Collect)"
                  className="border-[#D9CFC7] text-[#6D4530] placeholder:text-[#B8A396] bg-white focus:border-[#8B5A3C]"
                />
                <Textarea
                  value={newSection.description}
                  onChange={(e) => setNewSection({ ...newSection, description: e.target.value })}
                  placeholder="Section description (e.g., We collect personal information that you provide to us...)"
                  className="min-h-24 border-[#D9CFC7] text-[#6D4530] placeholder:text-[#B8A396] bg-white focus:border-[#8B5A3C]"
                />
                <Button
                  type="button"
                  onClick={handleAddSection}
                  variant="outline"
                  className="w-full border-[#8B5A3C] text-[#8B5A3C] hover:bg-[#8B5A3C] hover:text-white transition-colors"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Section
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={cancelForm}
              className="flex-1 border-[#D9CFC7] text-[#6D4530] hover:bg-[#F5F1ED]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-[#8B5A3C] hover:bg-[#6D4530] text-white transition-colors"
            >
              {isLoading ? (
                <>
                  <Spinner className="mr-2 h-4 w-4" />
                  {viewMode === "create" ? "Creating..." : "Updating..."}
                </>
              ) : viewMode === "create" ? (
                "Create Privacy Policy"
              ) : (
                "Update Privacy Policy"
              )}
            </Button>
          </div>
        </form>
      </div>
    )
  }

  // List View (Default)
  return (
    <div className="space-y-6">
      {!policy ? (
        // No Policy Exists - Show Create Button
        <Card className="border-[#E5D5C5] bg-gradient-to-br from-white to-[#FDFCFB]">
          <CardContent className="p-12 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full bg-[#F5F1ED] flex items-center justify-center mb-6">
              <Shield className="h-10 w-10 text-[#8B5A3C]" />
            </div>
            <h3 className="text-xl font-semibold text-[#6D4530] mb-2">No Privacy Policy Found</h3>
            <p className="text-[#8B5A3C]/70 mb-6 max-w-md">
              Create a privacy policy to inform your users about how you collect, use, and protect their personal information.
            </p>
            <Button
              onClick={startCreate}
              className="bg-[#8B5A3C] hover:bg-[#6D4530] text-white px-8"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Privacy Policy
            </Button>
          </CardContent>
        </Card>
      ) : (
        // Policy Exists - Show Table
        <>
          <Card className="border-[#E5D5C5] bg-white shadow-sm overflow-hidden">
            <CardHeader className="border-b border-[#E5D5C5] bg-gradient-to-r from-[#F9F7F5] to-white">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg text-[#6D4530] flex items-center gap-2">
                    <FileText className="h-5 w-5 text-[#8B5A3C]" />
                    Current Privacy Policy
                  </CardTitle>
                  <CardDescription className="text-[#8B5A3C]/60 mt-1">
                    Only one privacy policy can exist at a time. Delete the current one to create a new policy.
                  </CardDescription>
                </div>
                <Badge className="bg-green-100 text-green-700 border-green-200">Active</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#F9F7F5]/50 hover:bg-[#F9F7F5]/50">
                    <TableHead className="text-[#6D4530] font-semibold">Title</TableHead>
                    <TableHead className="text-[#6D4530] font-semibold">Sections</TableHead>
                    <TableHead className="text-[#6D4530] font-semibold">Created</TableHead>
                    <TableHead className="text-[#6D4530] font-semibold">Last Updated</TableHead>
                    <TableHead className="text-[#6D4530] font-semibold text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="hover:bg-[#F9F7F5]/30">
                    <TableCell className="font-medium text-[#6D4530]">{policy.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-[#8B5A3C]/10 text-[#8B5A3C] border-[#8B5A3C]/30">
                        {policy.sections?.length || 0} sections
                      </Badge>
                    </TableCell>
                    <TableCell className="text-[#6D4530]/70">{formatDate(policy.createdAt)}</TableCell>
                    <TableCell className="text-[#6D4530]/70">{formatDate(policy.lastUpdated)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setViewMode("preview")}
                          className="text-[#8B5A3C] hover:text-[#6D4530] hover:bg-[#F5F1ED]"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={startEdit}
                          className="text-[#8B5A3C] hover:text-[#6D4530] hover:bg-[#F5F1ED]"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="border-[#E5D5C5]">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-[#6D4530]">Delete Privacy Policy</AlertDialogTitle>
                              <AlertDialogDescription className="text-[#8B5A3C]/70">
                                Are you sure you want to delete this privacy policy? This action cannot be undone.
                                Your public privacy policy page will become empty.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="border-[#D9CFC7] text-[#6D4530] hover:bg-[#F5F1ED]">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="bg-red-500 hover:bg-red-600 text-white"
                              >
                                {isDeleting ? (
                                  <>
                                    <Spinner className="mr-2 h-4 w-4" />
                                    Deleting...
                                  </>
                                ) : (
                                  "Delete"
                                )}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Content Preview Card */}
          <Card className="border-[#E5D5C5] bg-white shadow-sm">
            <CardHeader className="border-b border-[#E5D5C5]">
              <CardTitle className="text-md text-[#6D4530]">Content Preview</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-[#6D4530]/80 leading-relaxed line-clamp-4 whitespace-pre-wrap">
                {policy.content}
              </div>
              {policy.content && policy.content.length > 300 && (
                <Button
                  variant="link"
                  onClick={() => setViewMode("preview")}
                  className="text-[#8B5A3C] hover:text-[#6D4530] p-0 h-auto mt-2"
                >
                  Read full policy
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Sections Summary */}
          {policy.sections && policy.sections.length > 0 && (
            <Card className="border-[#E5D5C5] bg-white shadow-sm">
              <CardHeader className="border-b border-[#E5D5C5]">
                <CardTitle className="text-md text-[#6D4530]">Policy Sections</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#F9F7F5]/50 hover:bg-[#F9F7F5]/50">
                      <TableHead className="text-[#6D4530] font-semibold w-12">#</TableHead>
                      <TableHead className="text-[#6D4530] font-semibold">Section Heading</TableHead>
                      <TableHead className="text-[#6D4530] font-semibold">Description Preview</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {policy.sections.map((section, index) => (
                      <TableRow key={index} className="hover:bg-[#F9F7F5]/30">
                        <TableCell className="text-[#8B5A3C] font-medium">{index + 1}</TableCell>
                        <TableCell className="font-medium text-[#6D4530]">{section.heading}</TableCell>
                        <TableCell className="text-[#6D4530]/70 max-w-md">
                          <p className="line-clamp-2">{section.description}</p>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  )
}
