"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileUp, MessageSquare, Copy, ArrowRight, Check, CreditCard, Plus, Shield, FileJson, Heart } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { BackToTop } from "@/components/back-to-top"
import { ContactForm } from "@/components/contact-form"
import Image from "next/image"

export default function LandingPage() {
  const [openQuestion, setOpenQuestion] = useState(null)

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index)
  }

  const scrollToSection = (e, sectionId) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const faqItems = [
    {
      question: "What file types are supported?",
      answer:
        "Minutes Lite supports .vtt and .txt transcript files from Zoom, Google Meet, Microsoft Teams, and other meeting platforms. We're constantly adding support for more file formats.",
    },
    {
      question: "How secure is my data?",
      answer:
        "Your data is encrypted in transit and at rest. We don't store your transcripts or summaries after processing unless you explicitly choose to save them. All data is automatically deleted after 24 hours.",
    },
    {
      question: "How is pricing calculated?",
      answer:
        "Pricing is simple: $1 gives you 10 minutes of audio transcript processing. You only pay for what you use, with no subscriptions or hidden fees. The length is calculated based on the duration of the original meeting.",
    },
    {
      question: "Can I integrate with other tools?",
      answer:
        "Yes, Minutes Lite allows you to export your summaries in formats that are compatible with popular tools like Notion, Jira, and more. We're working on direct integrations for the future.",
    },
    {
      question: "Is there a limit to transcript length?",
      answer:
        "We support transcripts up to 2 hours in length. For longer meetings, we recommend breaking them into segments for better summarization quality.",
    },
  ]

  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-50">
      <BackToTop />
      <main className="flex-1 w-full">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/images/minutes.png" alt="Minutes Lite Logo" width={32} height={32} className="object-contain" />
              <span className="font-bold inline-block">Minutes Lite</span>
            </Link>
            <nav className="flex items-center gap-4">
              <Button asChild variant="ghost" className="relative group overflow-hidden">
                <Link href="#pricing" className="transition-colors" onClick={(e) => scrollToSection(e, 'pricing')}>
                  Pricing
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 ease-in-out"></span>
                </Link>
              </Button>
              <Button asChild variant="ghost" className="relative group overflow-hidden">
                <Link href="#faq" className="transition-colors" onClick={(e) => scrollToSection(e, 'faq')}>
                  FAQ
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 ease-in-out"></span>
                </Link>
              </Button>
              <Button asChild>
                <Link href="/summarizer">Try It Free</Link>
              </Button>
            </nav>
          </div>
        </div>

        <section className="min-h-[calc(100vh-8rem)] flex items-center py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="space-y-6 lg:pr-8">
                <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-2">
                  Meeting Productivity Tool
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                  Stop Wasting <span className="text-primary">15 Minutes</span> After Every Meeting
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl">
                  Upload your transcript and our AI will instantly generate a concise TL;DR, key decisions, and
                  actionable items.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Button size="lg" className="h-12 px-8 shadow-lg" asChild>
                    <Link href="/summarizer">Try It Free</Link>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="secondary" 
                    className="h-12 px-8 font-medium transition-all duration-300 hover:scale-105 hover:shadow-md hover:bg-secondary/90" 
                    asChild
                  >
                    <Link href="#how-it-works" onClick={(e) => scrollToSection(e, 'how-it-works')}>See How It Works</Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                  <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-xs font-medium text-slate-500">Meeting Summary</div>
                    <div className="w-16"></div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-slate-500 mb-2">TL;DR</h3>
                        <p className="text-sm">
                          Team agreed to launch new feature on Oct 15. Marketing campaign starts Oct 1.
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-slate-500 mb-2">Key Decisions</h3>
                        <ul className="text-sm space-y-1">
                          <li className="flex items-start gap-2">
                            <div className="rounded-full bg-green-500/10 text-green-600 p-0.5 mt-0.5">
                              <Check className="h-3 w-3" />
                            </div>
                            <span>Push launch date to October 15th</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="rounded-full bg-green-500/10 text-green-600 p-0.5 mt-0.5">
                              <Check className="h-3 w-3" />
                            </div>
                            <span>Increase QA testing resources</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-slate-500 mb-2">Action Items</h3>
                        <div className="text-sm">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-[10px] text-blue-700">
                              S
                            </div>
                            <span>Update project timeline</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center text-[10px] text-purple-700">
                              M
                            </div>
                            <span>Allocate QA resources</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-3">
                Simple Process
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                How It <span className="text-primary">Works</span>
              </h2>
              <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                Three simple steps to transform your meeting transcripts into actionable insights
              </p>
            </div>

            <div className="relative max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                {/* Step 1 */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl transform group-hover:scale-105 transition-transform duration-300 blur-xl opacity-70" />
                  <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 transition-all duration-300 group-hover:shadow-xl border border-slate-100 dark:border-slate-700 h-full flex flex-col">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl mr-4">
                        1
                      </div>
                      <h3 className="font-bold text-xl">Upload</h3>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-700/20 rounded-xl mb-4 flex-1">
                      <div className="flex items-center justify-center h-24">
                        <FileUp className="h-12 w-12 text-primary/60" />
                      </div>
                    </div>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Drag & drop your transcript (.vtt or .txt) from any meeting platform
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative group mt-8 md:mt-16 lg:mt-0">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl transform group-hover:scale-105 transition-transform duration-300 blur-xl opacity-70" />
                  <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 transition-all duration-300 group-hover:shadow-xl border border-slate-100 dark:border-slate-700 h-full flex flex-col">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl mr-4">
                        2
                      </div>
                      <h3 className="font-bold text-xl">Process</h3>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-700/20 rounded-xl mb-4 flex-1">
                      <div className="flex items-center justify-center h-24">
                        <MessageSquare className="h-12 w-12 text-primary/60" />
                      </div>
                    </div>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      AI generates TL;DR summary, key decisions, and actionable tasks
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative group mt-8 md:mt-32 lg:mt-0">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl transform group-hover:scale-105 transition-transform duration-300 blur-xl opacity-70" />
                  <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 transition-all duration-300 group-hover:shadow-xl border border-slate-100 dark:border-slate-700 h-full flex flex-col">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl mr-4">
                        3
                      </div>
                      <h3 className="font-bold text-xl">Export</h3>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-700/20 rounded-xl mb-4 flex-1">
                      <div className="flex items-center justify-center h-24">
                        <Copy className="h-12 w-12 text-primary/60" />
                      </div>
                    </div>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Copy, save, or send to Notion, Jira, or other productivity tools
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-3">
                What We Offer
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                Powerful <span className="text-primary">Features</span>
              </h2>
              <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                Simple, powerful, and affordable tools to transform your meetings
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/10 to-transparent rounded-2xl transform group-hover:scale-105 transition-transform duration-300 blur-xl opacity-70"></div>
                <div className="relative overflow-hidden bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 transition-all duration-300 group-hover:shadow-xl border border-slate-100 dark:border-slate-700 h-full">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
                  <div className="relative">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                      <Check className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">No Hassle</h3>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                      No logins. No integrations. Just upload your transcript and get instant results.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group relative mt-12 md:mt-0">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/10 to-transparent rounded-2xl transform group-hover:scale-105 transition-transform duration-300 blur-xl opacity-70"></div>
                <div className="relative overflow-hidden bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 transition-all duration-300 group-hover:shadow-xl border border-slate-100 dark:border-slate-700 h-full">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
                  <div className="relative">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                      <ArrowRight className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Export Options</h3>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                      Flexible export formats including Markdown and JSON for seamless integration with your workflow.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group relative mt-12 md:mt-0">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/10 to-transparent rounded-2xl transform group-hover:scale-105 transition-transform duration-300 blur-xl opacity-70"></div>
                <div className="relative overflow-hidden bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 transition-all duration-300 group-hover:shadow-xl border border-slate-100 dark:border-slate-700 h-full">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
                  <div className="relative">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                      <CreditCard className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Simple Pricing</h3>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                      Pay-as-you-go: $1 = 10 minutes of audio. No subscriptions or hidden fees.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-3">
                Pricing
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                Simple, <span className="text-primary">Transparent</span> Pricing
              </h2>
              <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                Only pay for what you use — no subscriptions, no hidden fees.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl transform hover:scale-[1.01] transition-transform duration-300 blur-xl opacity-70"></div>
                <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                  <div className="p-8 md:p-10 text-center">
                    <div className="flex flex-col items-center justify-center mb-6">
                      <div className="text-4xl md:text-5xl font-bold mb-2">
                        <span className="text-primary">$1</span> ={" "}
                        <span className="text-slate-700 dark:text-slate-200">10 minutes</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-lg">
                        Upload your .vtt or .txt file and pay per processed minute.
                      </p>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-700/20 rounded-xl p-6 mb-8">
                      <ul className="space-y-3 text-left">
                        <li className="flex items-start gap-3">
                          <div className="rounded-full bg-green-500/10 text-green-600 p-1 mt-0.5">
                            <Check className="h-4 w-4" />
                          </div>
                          <span className="text-slate-700 dark:text-slate-300">
                            TL;DR, decisions, and action items included
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="rounded-full bg-green-500/10 text-green-600 p-1 mt-0.5">
                            <Check className="h-4 w-4" />
                          </div>
                          <span className="text-slate-700 dark:text-slate-300">Markdown and JSON output</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="rounded-full bg-green-500/10 text-green-600 p-1 mt-0.5">
                            <Check className="h-4 w-4" />
                          </div>
                          <span className="text-slate-700 dark:text-slate-300">Secure file handling via Supabase</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="rounded-full bg-green-500/10 text-green-600 p-1 mt-0.5">
                            <Check className="h-4 w-4" />
                          </div>
                          <span className="text-slate-700 dark:text-slate-300">No subscription required</span>
                        </li>
                      </ul>
                    </div>

                    <Button size="lg" className="w-full h-12 text-base font-medium shadow-lg cursor-pointer">
                      Buy Credits
                    </Button>

                    <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <CreditCard className="h-4 w-4" />
                        <span>1 credit = 1 minute of transcript</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FileJson className="h-4 w-4" />
                        <span>Unused credits never expire</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Shield className="h-4 w-4" />
                        <span>Stripe-secured payments</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="container mx-auto space-y-6 py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-3">
              Got Questions?
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
              Everything you need to know about Minutes Lite
            </p>
          </div>
          <div className="mx-auto max-w-3xl space-y-3">
            {faqItems.map((item, index) => (
              <div key={index} className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full flex items-center justify-between p-5 text-left bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 transition-colors cursor-pointer"
                >
                  <span className="font-medium text-lg">{item.question}</span>
                  <Plus
                    className={cn(
                      "h-5 w-5 flex-shrink-0 transition-transform duration-300",
                      openQuestion === index && "rotate-45",
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-500 ease-in-out bg-white dark:bg-slate-800",
                    openQuestion === index 
                      ? "max-h-[500px] opacity-100 translate-y-0" 
                      : "max-h-0 opacity-0 -translate-y-2",
                  )}
                >
                  <div className="p-5 text-slate-600 dark:text-slate-300">{item.answer}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
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
