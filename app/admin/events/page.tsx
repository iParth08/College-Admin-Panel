"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Download, Eye, MapPin, Search, Users, XCircle } from "lucide-react"

// Mock data for events
const mockEvents = [
  {
    id: 1,
    title: "Tech Conference 2023",
    organizer: "Coding Club",
    date: "2023-06-15",
    time: "10:00 AM - 4:00 PM",
    location: "Main Auditorium",
    attendees: 120,
    status: "upcoming",
    description: "Annual technology conference featuring workshops, talks, and networking opportunities.",
  },
  {
    id: 2,
    title: "Debate Competition",
    organizer: "Debate Society",
    date: "2023-06-20",
    time: "2:00 PM - 6:00 PM",
    location: "Conference Hall B",
    attendees: 80,
    status: "upcoming",
    description: "Inter-college debate competition on current social and political issues.",
  },
  {
    id: 3,
    title: "Photography Exhibition",
    organizer: "Photography Club",
    date: "2023-06-25",
    time: "11:00 AM - 7:00 PM",
    location: "Art Gallery",
    attendees: 200,
    status: "upcoming",
    description: "Exhibition showcasing the best photographs taken by club members throughout the year.",
  },
  {
    id: 4,
    title: "Chess Tournament",
    organizer: "Chess Club",
    date: "2023-06-18",
    time: "9:00 AM - 5:00 PM",
    location: "Student Center",
    attendees: 50,
    status: "upcoming",
    description: "Annual chess tournament open to all students with prizes for winners.",
  },
  {
    id: 5,
    title: "Environmental Awareness Workshop",
    organizer: "Environmental Club",
    date: "2023-06-22",
    time: "3:00 PM - 5:00 PM",
    location: "Lecture Hall 3",
    attendees: 75,
    status: "upcoming",
    description: "Workshop on environmental conservation and sustainable practices.",
  },
  {
    id: 6,
    title: "Music Concert",
    organizer: "Music Club",
    date: "2023-06-30",
    time: "6:00 PM - 9:00 PM",
    location: "Open Air Theater",
    attendees: 300,
    status: "upcoming",
    description: "End of semester concert featuring performances by student bands and solo artists.",
  },
]

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Filter events based on search term
  const filteredEvents = mockEvents.filter((event) => {
    return (
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  const handleViewEvent = (event: any) => {
    setSelectedEvent(event)
    setIsDialogOpen(true)
  }

  const handleDeactivateEvent = (eventId: number) => {
    // In a real app, this would call an API to deactivate the event
    console.log(`Deactivating event ${eventId}`)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Events & Workshops</CardTitle>
          <CardDescription>Monitor and manage upcoming events and workshops</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search events..."
                  className="pl-8 md:w-[300px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select defaultValue="upcoming">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Events</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="past">Past</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
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
                  <TableHead>Event Title</TableHead>
                  <TableHead>Organizer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Attendees</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvents.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.title}</TableCell>
                    <TableCell>{event.organizer}</TableCell>
                    <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                    <TableCell>{event.location}</TableCell>
                    <TableCell>{event.attendees}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100"
                      >
                        Upcoming
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleViewEvent(event)}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View event details</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Event Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Event Details</DialogTitle>
            <DialogDescription>View complete information about this event.</DialogDescription>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">{selectedEvent.title}</h3>
                <p className="text-sm text-muted-foreground">{selectedEvent.description}</p>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{new Date(selectedEvent.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedEvent.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedEvent.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedEvent.attendees} Attendees</span>
                </div>
              </div>

              <div className="rounded-md border p-4">
                <h4 className="mb-2 font-medium">Organizer Information</h4>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium">Club:</p>
                    <p className="text-sm">{selectedEvent.organizer}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Contact:</p>
                    <p className="text-sm">{selectedEvent.organizer.toLowerCase().replace(/\s+/g, "")}@example.com</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => handleDeactivateEvent(selectedEvent.id)}>
                  <XCircle className="mr-2 h-4 w-4" />
                  Deactivate Event
                </Button>
                <Button>
                  <Eye className="mr-2 h-4 w-4" />
                  View Attendees
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
