"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, CheckCircle2, Download, Eye, Search, Trash2, User } from "lucide-react"

// Mock data for flagged content
const mockFlaggedContent = [
  {
    id: 1,
    type: "blog",
    title: "Campus Life Experience",
    author: "John Doe",
    flaggedBy: 3,
    flaggedDate: "2023-05-15",
    reason: "Inappropriate content",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    status: "pending",
  },
  {
    id: 2,
    type: "comment",
    title: "Re: Club Fair Announcement",
    author: "Jane Smith",
    flaggedBy: 2,
    flaggedDate: "2023-05-16",
    reason: "Harassment",
    content:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    status: "pending",
  },
  {
    id: 3,
    type: "blog",
    title: "Student Government Elections",
    author: "Robert Johnson",
    flaggedBy: 5,
    flaggedDate: "2023-05-14",
    reason: "Misinformation",
    content:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    status: "pending",
  },
  {
    id: 4,
    type: "comment",
    title: "Re: Campus Facilities",
    author: "Emily Davis",
    flaggedBy: 1,
    flaggedDate: "2023-05-17",
    reason: "Spam",
    content:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    status: "pending",
  },
  {
    id: 5,
    type: "blog",
    title: "Sports Tournament Results",
    author: "Michael Wilson",
    flaggedBy: 4,
    flaggedDate: "2023-05-13",
    reason: "Inappropriate content",
    content:
      "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
    status: "pending",
  },
  {
    id: 6,
    type: "comment",
    title: "Re: Library Hours",
    author: "Sarah Brown",
    flaggedBy: 2,
    flaggedDate: "2023-05-18",
    reason: "Harassment",
    content:
      "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.",
    status: "pending",
  },
]

export default function FlaggedContentPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedContent, setSelectedContent] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Filter content based on search term and type
  const filteredContent = mockFlaggedContent.filter((content) => {
    const matchesSearch =
      content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.reason.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = typeFilter === "all" || content.type === typeFilter

    return matchesSearch && matchesType
  })

  const handleViewContent = (content: any) => {
    setSelectedContent(content)
    setIsDialogOpen(true)
  }

  const handleDeleteContent = (contentId: number) => {
    // In a real app, this would call an API to delete the content
    console.log(`Deleting content ${contentId}`)
  }

  const handleIgnoreFlag = (contentId: number) => {
    // In a real app, this would call an API to ignore the flag
    console.log(`Ignoring flag for content ${contentId}`)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Flagged Content</CardTitle>
          <CardDescription>Review and moderate content flagged by users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search content..."
                  className="pl-8 md:w-[300px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Content</SelectItem>
                  <SelectItem value="blog">Blog Posts</SelectItem>
                  <SelectItem value="comment">Comments</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
          <div className="mt-6 rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Flagged By</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContent.map((content) => (
                  <TableRow key={content.id}>
                    <TableCell className="font-medium">{content.title}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          content.type === "blog"
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-100"
                            : "bg-purple-100 text-purple-800 hover:bg-purple-100 dark:bg-purple-900 dark:text-purple-100"
                        }
                      >
                        {content.type === "blog" ? "Blog Post" : "Comment"}
                      </Badge>
                    </TableCell>
                    <TableCell>{content.author}</TableCell>
                    <TableCell>{content.flaggedBy} users</TableCell>
                    <TableCell>{content.reason}</TableCell>
                    <TableCell>{new Date(content.flaggedDate).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleViewContent(content)}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View content</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Content Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Flagged Content</DialogTitle>
            <DialogDescription>Review the flagged content and take appropriate action.</DialogDescription>
          </DialogHeader>
          {selectedContent && (
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">{selectedContent.title}</h3>
                <Badge
                  variant="outline"
                  className={
                    selectedContent.type === "blog"
                      ? "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-100"
                      : "bg-purple-100 text-purple-800 hover:bg-purple-100 dark:bg-purple-900 dark:text-purple-100"
                  }
                >
                  {selectedContent.type === "blog" ? "Blog Post" : "Comment"}
                </Badge>
              </div>

              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Posted by {selectedContent.author}</span>
              </div>

              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <span className="text-sm">
                  Flagged by {selectedContent.flaggedBy} users for "{selectedContent.reason}"
                </span>
              </div>

              <div className="rounded-md border p-4">
                <h4 className="mb-2 font-medium">Content</h4>
                <p className="text-sm">{selectedContent.content}</p>
              </div>

              <Tabs defaultValue="flags">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="flags">Flag Reports</TabsTrigger>
                  <TabsTrigger value="history">User History</TabsTrigger>
                </TabsList>
                <TabsContent value="flags" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    {[...Array(selectedContent.flaggedBy)].map((_, i) => (
                      <div key={i} className="flex items-start gap-2 rounded-md border p-3">
                        <AlertTriangle className="mt-0.5 h-4 w-4 text-red-500" />
                        <div>
                          <p className="text-sm font-medium">User {i + 1}</p>
                          <p className="text-sm text-muted-foreground">
                            Flagged for {selectedContent.reason} on{" "}
                            {new Date(selectedContent.flaggedDate).toLocaleDateString()}
                          </p>
                          <p className="mt-1 text-sm">
                            "This content violates community guidelines because it contains{" "}
                            {selectedContent.reason.toLowerCase()}."
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="history" className="pt-4">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Content</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>{selectedContent.title}</TableCell>
                          <TableCell>{selectedContent.type}</TableCell>
                          <TableCell>{new Date(selectedContent.flaggedDate).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Badge variant="outline">Flagged</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Previous Post</TableCell>
                          <TableCell>blog</TableCell>
                          <TableCell>
                            {new Date(
                              new Date(selectedContent.flaggedDate).getTime() - 7 * 24 * 60 * 60 * 1000,
                            ).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-100 text-green-800">
                              Active
                            </Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Another Comment</TableCell>
                          <TableCell>comment</TableCell>
                          <TableCell>
                            {new Date(
                              new Date(selectedContent.flaggedDate).getTime() - 14 * 24 * 60 * 60 * 1000,
                            ).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-100 text-green-800">
                              Active
                            </Badge>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => handleIgnoreFlag(selectedContent.id)}>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Ignore Flag
                </Button>
                <Button variant="destructive" onClick={() => handleDeleteContent(selectedContent.id)}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Content
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
