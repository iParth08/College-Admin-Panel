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
import { CheckCircle2, Download, Eye, Search, XCircle } from "lucide-react"

// Mock data for clubs
const mockClubs = [
  {
    id: 1,
    name: "Coding Club",
    president: "John Doe",
    email: "coding@example.com",
    members: 25,
    status: "pending",
    submittedDate: "2023-05-10",
    description: "A club for coding enthusiasts to collaborate on projects and learn new technologies.",
    category: "Technology",
  },
  {
    id: 2,
    name: "Debate Society",
    president: "Jane Smith",
    email: "debate@example.com",
    members: 30,
    status: "approved",
    submittedDate: "2023-05-08",
    description: "A platform for students to develop public speaking and critical thinking skills through debates.",
    category: "Academic",
  },
  {
    id: 3,
    name: "Photography Club",
    president: "Robert Johnson",
    email: "photo@example.com",
    members: 20,
    status: "pending",
    submittedDate: "2023-05-12",
    description: "A community for photography enthusiasts to share their work and learn new techniques.",
    category: "Arts",
  },
  {
    id: 4,
    name: "Chess Club",
    president: "Emily Davis",
    email: "chess@example.com",
    members: 15,
    status: "approved",
    submittedDate: "2023-05-05",
    description: "A club for chess players of all levels to play and improve their skills.",
    category: "Games",
  },
  {
    id: 5,
    name: "Environmental Club",
    president: "Michael Wilson",
    email: "environment@example.com",
    members: 35,
    status: "pending",
    submittedDate: "2023-05-15",
    description: "A group dedicated to promoting environmental awareness and sustainability on campus.",
    category: "Social",
  },
  {
    id: 6,
    name: "Music Club",
    president: "Sarah Brown",
    email: "music@example.com",
    members: 40,
    status: "approved",
    submittedDate: "2023-05-03",
    description: "A club for music lovers to perform, collaborate, and share their passion for music.",
    category: "Arts",
  },
]

export default function ClubsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedClub, setSelectedClub] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Filter clubs based on search term and status
  const filteredClubs = mockClubs.filter((club) => {
    const matchesSearch =
      club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.president.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.category.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || club.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleViewClub = (club: any) => {
    setSelectedClub(club)
    setIsDialogOpen(true)
  }

  const handleApproveClub = (clubId: number) => {
    // In a real app, this would call an API to approve the club
    console.log(`Approving club ${clubId}`)
  }

  const handleRejectClub = (clubId: number) => {
    // In a real app, this would call an API to reject the club
    console.log(`Rejecting club ${clubId}`)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Club Applications</CardTitle>
          <CardDescription>Review and manage club applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search clubs..."
                  className="pl-8 md:w-[300px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Clubs</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
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
                  <TableHead>Club Name</TableHead>
                  <TableHead>President</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Members</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClubs.map((club) => (
                  <TableRow key={club.id}>
                    <TableCell className="font-medium">{club.name}</TableCell>
                    <TableCell>{club.president}</TableCell>
                    <TableCell>{club.category}</TableCell>
                    <TableCell>{club.members}</TableCell>
                    <TableCell>
                      <Badge
                        variant={club.status === "approved" ? "default" : "outline"}
                        className={
                          club.status === "approved"
                            ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100"
                            : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-100"
                        }
                      >
                        {club.status === "approved" ? "Approved" : "Pending"}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(club.submittedDate).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleViewClub(club)}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View club details</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Club Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Club Details</DialogTitle>
            <DialogDescription>Review complete information about this club application.</DialogDescription>
          </DialogHeader>
          {selectedClub && (
            <div className="space-y-4">
              <Tabs defaultValue="details">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="members">Members</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="space-y-4 pt-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <div className="font-medium">Club Name:</div>
                    <div className="col-span-3">{selectedClub.name}</div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <div className="font-medium">President:</div>
                    <div className="col-span-3">{selectedClub.president}</div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <div className="font-medium">Email:</div>
                    <div className="col-span-3">{selectedClub.email}</div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <div className="font-medium">Category:</div>
                    <div className="col-span-3">{selectedClub.category}</div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <div className="font-medium">Members:</div>
                    <div className="col-span-3">{selectedClub.members}</div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <div className="font-medium">Status:</div>
                    <div className="col-span-3">
                      <Badge
                        variant={selectedClub.status === "approved" ? "default" : "outline"}
                        className={
                          selectedClub.status === "approved"
                            ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100"
                            : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-100"
                        }
                      >
                        {selectedClub.status === "approved" ? "Approved" : "Pending"}
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <div className="font-medium">Submitted:</div>
                    <div className="col-span-3">{new Date(selectedClub.submittedDate).toLocaleDateString()}</div>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="font-medium">Description:</div>
                    <div className="col-span-3">{selectedClub.description}</div>
                  </div>
                </TabsContent>
                <TabsContent value="members" className="pt-4">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Department</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>{selectedClub.president}</TableCell>
                          <TableCell>President</TableCell>
                          <TableCell>Computer Science</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Alex Johnson</TableCell>
                          <TableCell>Vice President</TableCell>
                          <TableCell>Electrical Engineering</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Maria Garcia</TableCell>
                          <TableCell>Secretary</TableCell>
                          <TableCell>Business Administration</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>David Lee</TableCell>
                          <TableCell>Treasurer</TableCell>
                          <TableCell>Finance</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
                <TabsContent value="documents" className="space-y-4 pt-4">
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between rounded-md border p-4">
                      <div>
                        <h4 className="font-medium">Club Constitution</h4>
                        <p className="text-sm text-muted-foreground">PDF Document</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                    </div>
                    <div className="flex items-center justify-between rounded-md border p-4">
                      <div>
                        <h4 className="font-medium">Activity Plan</h4>
                        <p className="text-sm text-muted-foreground">PDF Document</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                    </div>
                    <div className="flex items-center justify-between rounded-md border p-4">
                      <div>
                        <h4 className="font-medium">Budget Proposal</h4>
                        <p className="text-sm text-muted-foreground">Excel Spreadsheet</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {selectedClub.status === "pending" && (
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => handleRejectClub(selectedClub.id)}>
                    <XCircle className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                  <Button onClick={() => handleApproveClub(selectedClub.id)}>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
