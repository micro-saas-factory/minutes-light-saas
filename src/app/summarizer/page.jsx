"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { FileUp, Copy, Save, ArrowRight, Loader2, FileText, ChevronLeft, Check, Heart, X, AlertCircle } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { ContactForm } from "@/components/contact-form"

export default function SummarizerPage() {
  const [file, setFile] = useState(null)
  const [text, setText] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [results, setResults] = useState(null)

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error("Maximum file size is 5MB")
        return
      }

      if (![".txt", ".vtt"].some((ext) => selectedFile.name.endsWith(ext))) {
        toast.error("Only .txt and .vtt files are supported")
        return
      }

      setIsUploading(true)
      setFile(selectedFile)

      // Read file content
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result
        setText(content)
        setIsUploading(false)
      }
      reader.onerror = () => {
        toast.error("Error reading file")
        setIsUploading(false)
        setFile(null)
      }
      reader.readAsText(selectedFile)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      if (droppedFile.size > 5 * 1024 * 1024) {
        toast.error("Maximum file size is 5MB")
        return
      }

      if (![".txt", ".vtt"].some((ext) => droppedFile.name.endsWith(ext))) {
        toast.error("Only .txt and .vtt files are supported")
        return
      }

      setFile(droppedFile)

      // Read file content
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result
        setText(content)
      }
      reader.readAsText(droppedFile)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDeleteFile = () => {
    toast.custom(
      (t) => (
        <div className="flex items-center gap-2 bg-white rounded-[32px] w-[320px] px-4 py-3">
          <div className="shrink-0">
            <div className="w-4 h-4 relative">
              <div className="absolute inset-0 border-2 border-t-black border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
            </div>
          </div>
          <p className="text-[13px] text-black flex-1">Delete this file?</p>
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1 text-[13px] bg-slate-100 rounded-full text-black hover:bg-slate-200 transition-colors cursor-pointer"
              onClick={() => {
                toast.dismiss(t)
                toast.error("Cancelled file deletion")
              }}
            >
              Cancel
            </button>
            <button
              className="px-3 py-1 text-[13px] text-white bg-black rounded-full hover:bg-black/90 transition-colors cursor-pointer"
              onClick={() => {
                setFile(null)
                setText("")
                // Reset file input
                const fileInput = document.getElementById("file-upload")
                if (fileInput) {
                  fileInput.value = ""
                }
                toast.dismiss(t)
                toast.success("File deleted successfully")
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ),
      { duration: 5000 }
    )
  }

  const generateSummary = () => {
    if (!text.trim()) {
      toast.error("Please upload a file or paste transcript text")
      return
    }

    setIsProcessing(true)

    // Simulate API call with timeout
    setTimeout(() => {
      // Mock results
      setResults({
        summary:
          "The team discussed the new product launch timeline and marketing strategy. They agreed to push the launch date by two weeks to allow for additional QA testing. The marketing team will prepare social media assets by next Friday.",
        decisions: [
          "Push product launch date to October 15th",
          "Increase QA testing resources by 20%",
          "Approve additional budget for social media campaign",
        ],
        actionItems: [
          { responsible: "Sarah", task: "Update project timeline", dueDate: "Sep 20" },
          { responsible: "Michael", task: "Allocate additional QA resources", dueDate: "Sep 22" },
          { responsible: "Jessica", task: "Prepare social media assets", dueDate: "Sep 30" },
        ],
      })

      setIsProcessing(false)
    }, 2000)
  }

  const copyToClipboard = () => {
    if (!results) return

    const markdownContent = `
# Meeting Summary

## TL;DR
${results.summary}

## Key Decisions
${results.decisions.map((d) => `- ${d}`).join("\n")}

## Action Items
| Responsible | Task | Due Date |
|-------------|------|----------|
${results.actionItems.map((item) => `| ${item.responsible} | ${item.task} | ${item.dueDate} |`).join("\n")}
`

    navigator.clipboard.writeText(markdownContent)
    toast.success("Summary has been copied as Markdown")
  }

  const saveToSupabase = () => {
    toast.success("Your summary has been saved successfully")
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-white">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          <Link href="/" className="inline-flex items-center space-x-2 group mb-6 hover:text-primary transition-colors -ml-2 px-2 py-1 rounded-md hover:bg-primary/5">
            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          
          <div className="max-w-6xl mx-auto">
            <div className="mb-6 text-center">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
                Transform Your <span className="text-primary">Meeting Transcripts</span>
              </h1>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Upload your transcript and our AI will instantly generate a concise TL;DR, key decisions, and actionable
                items.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Panel - Input */}
              <div className="space-y-6">
                <Card className="shadow-lg rounded-2xl overflow-hidden border-0 bg-white">
                  <CardContent className="p-0">
                    <Tabs defaultValue="upload" className="w-full">
                      <div className="px-6 pt-6">
                        <TabsList className="grid w-full grid-cols-2 mb-6 p-1 bg-slate-100 rounded-lg">
                          <TabsTrigger
                            value="upload"
                            className="rounded-md cursor-pointer data-[state=active]:bg-white data-[state=active]:shadow-sm"
                          >
                            Upload File
                          </TabsTrigger>
                          <TabsTrigger
                            value="paste"
                            className="rounded-md cursor-pointer data-[state=active]:bg-white data-[state=active]:shadow-sm"
                          >
                            Paste Text
                          </TabsTrigger>
                        </TabsList>
                      </div>

                      <TabsContent value="upload" className="space-y-4 px-6 pb-6">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.05 }}
                          transition={{ 
                            duration: 0.5,
                            ease: [0.22, 1, 0.36, 1],
                            scale: {
                              type: "spring",
                              damping: 15,
                              stiffness: 100
                            }
                          }}
                        >
                          <div
                            className={cn(
                              "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 relative",
                              "hover:border-primary/50 hover:bg-primary/5",
                              file ? "border-primary/70 bg-primary/5" : "border-slate-200",
                            )}
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onClick={() => !file && document.getElementById("file-upload")?.click()}
                          >
                            <input
                              id="file-upload"
                              type="file"
                              className="hidden"
                              accept=".txt,.vtt"
                              onChange={handleFileChange}
                            />

                            <div className="flex flex-col items-center justify-center gap-3">
                              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                                {isUploading ? (
                                  <Loader2 className="h-8 w-8 text-primary animate-spin" />
                                ) : (
                                  <FileUp className="h-8 w-8 text-primary" />
                                )}
                              </div>
                              <p className="text-sm font-medium text-slate-700">
                                {file ? file.name : "Drag & drop your file here or click to browse"}
                              </p>
                              <p className="text-xs text-slate-500">
                                {file ? `${(file.size / 1024).toFixed(1)} KB` : "Supports .txt and .vtt files (max 5MB)"}
                              </p>
                            </div>

                            {file && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-2 right-2 h-8 w-8 rounded-full hover:bg-red-50 hover:text-red-600"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleDeleteFile()
                                }}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </motion.div>
                      </TabsContent>

                      <TabsContent value="paste" className="space-y-4 px-6 pb-6">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.05 }}
                          transition={{ 
                            duration: 0.5,
                            ease: [0.22, 1, 0.36, 1],
                            scale: {
                              type: "spring",
                              damping: 15,
                              stiffness: 100
                            }
                          }}
                        >
                          <Textarea
                            placeholder="Paste your transcript text here..."
                            className="min-h-[240px] rounded-xl focus:ring-primary focus:ring-1 focus:border-0 border-0"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                          />
                        </motion.div>
                      </TabsContent>
                    </Tabs>

                    <div className="px-6 pb-6">
                      <Button
                        className={cn(
                          "w-full",
                          !isProcessing && text.trim() && "cursor-pointer"
                        )}
                        size="lg"
                        onClick={generateSummary}
                        disabled={isProcessing || !text.trim()}
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            Generate Summary
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Sample Transcript Card */}
                <Card className="shadow-md rounded-2xl overflow-hidden border border-slate-200/80">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-semibold text-slate-700">Need a sample?</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-xs cursor-pointer"
                        onClick={() => {
                          setText(
                            "John: Hi everyone, thanks for joining today's product meeting.\nSarah: Happy to be here. Let's discuss the launch timeline.\nJohn: Our original plan was to launch on October 1st, but QA needs more time.\nMichael: I agree. We should push it back by two weeks to ensure quality.\nJessica: That works for marketing. We'll need to prepare social media assets by next Friday.\nSarah: I'll update the project timeline to reflect the new October 15th launch date.\nMichael: I'll allocate 20% more resources to QA to make sure we hit that date.\nJohn: Great. And we'll need to approve additional budget for the social campaign.\nJessica: I'll have those assets ready by September 30th.\nJohn: Perfect. Let's reconvene next week to check progress.",
                          )
                        }}
                      >
                        Load Sample
                      </Button>
                    </div>
                    <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg max-h-32 overflow-y-auto">
                      <p>John: Hi everyone, thanks for joining today's product meeting.</p>
                      <p>Sarah: Happy to be here. Let's discuss the launch timeline.</p>
                      <p>John: Our original plan was to launch on October 1st, but QA needs more time.</p>
                      <p>Michael: I agree. We should push it back by two weeks to ensure quality.</p>
                      <p>...</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Panel - Output */}
              <div className={cn("space-y-6", !results && !isProcessing && "hidden lg:block lg:opacity-50")}>
                <Card
                  className={cn(
                    "shadow-lg rounded-2xl overflow-hidden border-0 bg-white h-full",
                    !results && !isProcessing && "border-dashed border-2",
                  )}
                >
                  <CardContent className="p-6">
                    {isProcessing ? (
                      <div className="flex flex-col items-center justify-center py-16">
                        <div className="relative w-20 h-20 mb-6">
                          <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping opacity-75"></div>
                          <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-primary/20">
                            <Loader2 className="h-10 w-10 animate-spin text-primary" />
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Analyzing transcript...</h3>
                        <p className="text-slate-500">This usually takes a few seconds</p>
                      </div>
                    ) : results ? (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                      >
                        <div>
                          <h3 className="text-lg font-semibold text-primary mb-3 flex items-center">
                            <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                              <FileText className="h-4 w-4 text-primary" />
                            </span>
                            Summary
                          </h3>
                          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                            <p className="text-slate-700">{results.summary}</p>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-primary mb-3 flex items-center">
                            <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                              <span className="text-primary text-sm font-bold">✓</span>
                            </span>
                            Key Decisions
                          </h3>
                          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                            <ul className="space-y-2">
                              {results.decisions.map((decision, index) => (
                                <motion.li
                                  key={index}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: index * 0.1 }}
                                  className="flex items-start gap-3"
                                >
                                  <div className="rounded-full bg-green-500/10 text-green-600 p-1 mt-0.5 flex-shrink-0">
                                    <Check className="h-3 w-3" />
                                  </div>
                                  <span className="text-slate-700">{decision}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-primary mb-3 flex items-center">
                            <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                              <span className="text-primary text-sm font-bold">→</span>
                            </span>
                            Action Items
                          </h3>
                          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr className="border-b border-slate-200">
                                  <th className="text-left py-2 px-3 text-sm font-medium text-slate-500">Responsible</th>
                                  <th className="text-left py-2 px-3 text-sm font-medium text-slate-500">Task</th>
                                  <th className="text-left py-2 px-3 text-sm font-medium text-slate-500">Due Date</th>
                                </tr>
                              </thead>
                              <tbody>
                                {results.actionItems.map((item, index) => (
                                  <motion.tr
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    className="border-b border-slate-100 last:border-0"
                                  >
                                    <td className="py-3 px-3">
                                      <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] text-primary font-medium">
                                          {item.responsible.charAt(0)}
                                        </div>
                                        <span className="text-sm text-slate-700">{item.responsible}</span>
                                      </div>
                                    </td>
                                    <td className="py-3 px-3 text-sm text-slate-700">{item.task}</td>
                                    <td className="py-3 px-3">
                                      <span className="text-xs font-medium bg-slate-200 text-slate-700 px-2 py-1 rounded-full">
                                        {item.dueDate}
                                      </span>
                                    </td>
                                  </motion.tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                          <Button
                            variant="outline"
                            className="flex-1 border-slate-200 hover:bg-slate-50 cursor-pointer"
                            onClick={copyToClipboard}
                          >
                            <Copy className="mr-2 h-4 w-4" />
                            Copy Markdown
                          </Button>
                          <Button className="flex-1 cursor-pointer" onClick={saveToSupabase}>
                            <Save className="mr-2 h-4 w-4" />
                            Save to Supabase
                          </Button>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-6">
                          <FileText className="h-10 w-10 text-slate-300" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-slate-500">Your summary will appear here</h3>
                        <p className="text-slate-400 text-center max-w-md">
                          Upload a transcript or paste text, then click Generate Summary to see the magic happen
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t py-4 md:py-0">
        <div className="container mx-auto flex flex-col items-center justify-between gap-2 md:h-16 md:flex-row">
          <div className="flex flex-col items-center gap-2 px-8 md:flex-row md:gap-2 md:px-0">
            <Heart className="h-5 w-5 text-red-500" />
            <p className="text-center text-sm leading-loose md:text-left">© {new Date().getFullYear()} Minutes Lite. Made by developers for developers</p>
          </div>
          <div className="flex items-center gap-4">
            <ContactForm />
          </div>
        </div>
      </footer>
    </div>
  )
}
