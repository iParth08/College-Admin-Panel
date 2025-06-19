"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarSearch,
  CheckCircle2,
  Download,
  Eye,
  Search,
  XCircle,
} from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/context/UserContext";

export default function ClubsPage() {
  const { user } = useUser();
  const userId = user?.id;

  const [clubs, setClubs] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedClub, setSelectedClub] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [adminMessage, setAdminMessage] = useState("");
  const [pendingAction, setPendingAction] = useState<{
    action: "approve" | "reject" | "review";
    clubId: string;
  } | null>(null);

  useEffect(() => {
    console.log(userId);
    if (!userId) return;
    const fetchClubs = async () => {
      try {
        const response = await axios.post("/api/club/allClubsOverview/", {
          userId,
        });

        if (response.status === 200) setClubs(response.data || []);
        else toast(response.data.message);
      } catch (error) {
        console.error("Error fetching clubs:", error);
      }
    };

    fetchClubs();
  }, [userId]);

  // Filter clubs based on search term and status
  const filteredClubs = clubs.filter((club) => {
    const matchesSearch =
      club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.president.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || club.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleViewClub = (club: any) => {
    setSelectedClub(club);
    setIsDialogOpen(true);
  };

  const handleApproveClub = async (clubId: string, adminMessage: string) => {
    // In a real app, this would call an API to approve the club
    console.log(`Approving club ${clubId}`);
    try {
      const response = await axios.post(`/api/club/reviewClubApplication/`, {
        clubId,
        userId,
        status: "accepted",
        adminMessage,
      });
      if (response.status === 200) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
      setClubs((prev) =>
        prev.map((club) =>
          club.id === clubId
            ? { ...club, status: "accepted", adminMessage }
            : club
        )
      );
      setSelectedClub((prev: any) => ({
        ...prev,
        status: "accepted",
        adminMessage,
      }));
    } catch (err) {
      console.error("Failed to approve club:", err);
    } finally {
      setIsMessageDialogOpen(false);
    }
  };

  const handleRejectClub = async (clubId: string, adminMessage: string) => {
    // In a real app, this would call an API to reject the club
    console.log(`Rejecting club ${clubId}`);
    try {
      const response = await axios.post(`/api/club/reviewClubApplication/`, {
        clubId,
        userId,
        status: "rejected",
        adminMessage,
      });
      if (response.status === 200) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
      setClubs((prev) =>
        prev.map((club) =>
          club.id === clubId
            ? { ...club, status: "rejected", adminMessage }
            : club
        )
      );
      setSelectedClub((prev: any) => ({
        ...prev,
        status: "rejected",
        adminMessage,
      }));
    } catch (err) {
      console.error("Failed to reject club:", err);
    } finally {
      setIsMessageDialogOpen(false);
    }
  };

  const handleReviewClub = async (clubId: string, adminMessage: string) => {
    // In a real app, this would call an API to reject the club
    console.log(`Review club ${clubId}`);
    try {
      const response = await axios.post(`/api/club/reviewClubApplication/`, {
        clubId,
        userId,
        status: "review",
        adminMessage,
      });

      if (response.status === 200) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
      setClubs((prev) =>
        prev.map((club) =>
          club.id === clubId
            ? { ...club, status: "review", adminMessage }
            : club
        )
      );
      setSelectedClub((prev: any) => ({
        ...prev,
        status: "review",
        adminMessage,
      }));
    } catch (err) {
      console.error("Failed to review club:", err);
    } finally {
      setIsMessageDialogOpen(false);
    }
  };

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
                  <SelectItem value="review">Review</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
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
                        variant={
                          club.status === "accepted" ? "default" : "outline"
                        }
                        className={
                          club.status === "accepted"
                            ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100"
                            : club.status === "review"
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-100"
                            : club.status === "rejected"
                            ? "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-100"
                            : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-100"
                        }
                      >
                        {club.status === "accepted"
                          ? "Accepted"
                          : club.status === "review"
                          ? "Under Review"
                          : club.status === "rejected"
                          ? "Rejected"
                          : "Pending"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(club.submittedDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewClub(club)}
                      >
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
            <DialogDescription>
              Review complete information about this club application.
            </DialogDescription>
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
                        variant={
                          selectedClub.status === "accepted"
                            ? "default"
                            : "outline"
                        }
                        className={
                          selectedClub.status === "accepted"
                            ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100"
                            : selectedClub.status === "review"
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-100"
                            : selectedClub.status === "rejected"
                            ? "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-100"
                            : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-100"
                        }
                      >
                        {selectedClub.status === "accepted"
                          ? "Accepted"
                          : selectedClub.status === "review"
                          ? "Under Review"
                          : selectedClub.status === "rejected"
                          ? "Rejected"
                          : "Pending"}
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <div className="font-medium">Admin Message:</div>
                    <div
                      className={
                        selectedClub.status === "accepted"
                          ? "bg-green-100 text-green-800 col-span-3 p-2"
                          : selectedClub.status === "review"
                          ? "bg-blue-100 text-blue-800 col-span-3 p-2"
                          : selectedClub.status === "rejected"
                          ? "bg-red-100 text-red-800 col-span-3 p-2"
                          : "bg-yellow-100 text-yellow-800 col-span-3 p-2"
                      }
                    >
                      {selectedClub.adminMessage}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <div className="font-medium">Submitted:</div>
                    <div className="col-span-3">
                      {new Date(
                        selectedClub.submittedDate
                      ).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="font-medium">Description:</div>
                    <div className="col-span-3 max-h-[180px] overflow-y-auto">
                      {selectedClub.description}
                    </div>
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
                        <h4 className="font-medium">Club Certificate</h4>
                        <p className="text-sm text-muted-foreground">
                          PDF Document
                        </p>
                      </div>
                      <Link
                        href={selectedClub.documents.clubCertificate}
                        target="_blank"
                      >
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                      </Link>
                    </div>
                    <div className="flex items-center justify-between rounded-md border p-4">
                      <div>
                        <h4 className="font-medium">Activity Plan</h4>
                        <p className="text-sm text-muted-foreground">
                          PDF Document
                        </p>
                      </div>
                      <Link
                        href={selectedClub.documents.activityPlans}
                        target="_blank"
                      >
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                      </Link>
                    </div>
                    <div className="flex items-center justify-between rounded-md border p-4">
                      <div>
                        <h4 className="font-medium">Budget Proposal</h4>
                        <p className="text-sm text-muted-foreground">
                          Excel Sheet
                        </p>
                      </div>
                      <Link
                        href={selectedClub.documents.budgetProposal}
                        target="_blank"
                      >
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {selectedClub.status === "review" ? (
                <div className="flex justify-end space-x-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setPendingAction({
                        action: "reject",
                        clubId: selectedClub.id,
                      });
                      setIsMessageDialogOpen(true);
                    }}
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                  <Button
                    onClick={() => {
                      setPendingAction({
                        action: "approve",
                        clubId: selectedClub.id,
                      });
                      setIsMessageDialogOpen(true);
                    }}
                  >
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                </div>
              ) : (
                <div className="flex justify-end space-x-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setPendingAction({
                        action: "review",
                        clubId: selectedClub.id,
                      });
                      setIsMessageDialogOpen(true);
                    }}
                  >
                    <CalendarSearch className="mr-2 h-4 w-4" />
                    Review
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Confirm{" "}
              {pendingAction &&
                pendingAction?.action.charAt(0).toUpperCase() +
                  pendingAction?.action.slice(1)}{" "}
              Action
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-2">
            <p>Please provide a message for the club admins:</p>
            <Textarea
              placeholder="Write your message here..."
              value={adminMessage}
              onChange={(e) => setAdminMessage(e.target.value)}
            />
          </div>

          <DialogFooter className="pt-4">
            <Button
              variant="outline"
              onClick={() => setIsMessageDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (!pendingAction) return;

                const { action, clubId } = pendingAction;

                if (action === "approve") {
                  handleApproveClub(clubId, adminMessage);
                } else if (action === "reject") {
                  handleRejectClub(clubId, adminMessage);
                } else if (action === "review") {
                  handleReviewClub(clubId, adminMessage);
                }

                setIsMessageDialogOpen(false);
                setAdminMessage("");
                setPendingAction(null);
              }}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
