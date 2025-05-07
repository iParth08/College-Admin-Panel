"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  AlertCircle,
  Download,
  MoreHorizontal,
  Plus,
  Search,
  Shield,
  ShieldAlert,
  Trash2,
  UserPlus,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for admins
const mockAdmins = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Super Admin",
    department: "IT",
    lastActive: "2023-05-15T10:30:00",
    status: "active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Admin",
    department: "Student Affairs",
    lastActive: "2023-05-16T09:45:00",
    status: "active",
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    role: "Moderator",
    department: "Academic Affairs",
    lastActive: "2023-05-14T14:20:00",
    status: "active",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "Admin",
    department: "Student Affairs",
    lastActive: "2023-05-17T11:10:00",
    status: "inactive",
  },
  {
    id: 5,
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    role: "Moderator",
    department: "IT",
    lastActive: "2023-05-13T16:05:00",
    status: "active",
  },
]

export default function AdminsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddAdminDialogOpen, setIsAddAdminDialogOpen] = useState(false)
  const [newAdminEmail, setNewAdminEmail] = useState("")
  const [newAdminRole, setNewAdminRole] = useState("Admin")

  // Filter admins based on search term
  const filteredAdmins = mockAdmins.filter((admin) => {
    return (
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.department.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  const handleAddAdmin = () => {
    // In a real app, this would call an API to add a new admin
    console.log(`Adding new admin with email ${newAdminEmail} and role ${newAdminRole}`)
    setIsAddAdminDialogOpen(false)
    setNewAdminEmail("")
    setNewAdminRole("Admin")
  }

  const handleRemoveAdmin = (adminId: number) => {
    // In a real app, this would call an API to remove an admin
    console.log(`Removing admin ${adminId}`)
  }

  const handleChangeRole = (adminId: number, newRole: string) => {
    // In a real app, this would call an API to change an admin's role
    console.log(`Changing admin ${adminId} role to ${newRole}`)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Admin Management</CardTitle>
              <CardDescription>Manage administrators and their permissions</CardDescription>
            </div>
            <Button onClick={() => setIsAddAdminDialogOpen(true)}>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Admin
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search admins..."
                className="pl-8 md:w-[300px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
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
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAdmins.map((admin) => (
                  <TableRow key={admin.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`/placeholder.svg?text=${admin.name.charAt(0)}`} alt={admin.name} />
                          <AvatarFallback>{admin.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{admin.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{admin.email}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {admin.role === "Super Admin" ? (
                          <ShieldAlert className="h-4 w-4 text-red-500" />
                        ) : admin.role === "Admin" ? (
                          <Shield className="h-4 w-4 text-amber-500" />
                        ) : (
                          <Shield className="h-4 w-4 text-blue-500" />
                        )}
                        {admin.role}
                      </div>
                    </TableCell>
                    <TableCell>{admin.department}</TableCell>
                    <TableCell>
                      {new Date(admin.lastActive).toLocaleString(undefined, {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={admin.status === "active" ? "default" : "outline"}
                        className={
                          admin.status === "active"
                            ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-100"
                        }
                      >
                        {admin.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => handleChangeRole(admin.id, "Admin")}
                            disabled={admin.role === "Admin"}
                          >
                            <Shield className="mr-2 h-4 w-4 text-amber-500" />
                            Make Admin
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleChangeRole(admin.id, "Moderator")}
                            disabled={admin.role === "Moderator"}
                          >
                            <Shield className="mr-2 h-4 w-4 text-blue-500" />
                            Make Moderator
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleRemoveAdmin(admin.id)}
                            disabled={admin.role === "Super Admin"}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remove Admin
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Admin Dialog */}
      <Dialog open={isAddAdminDialogOpen} onOpenChange={setIsAddAdminDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Admin</DialogTitle>
            <DialogDescription>Assign admin privileges to an existing verified user.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email">User Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="user@example.com"
                value={newAdminEmail}
                onChange={(e) => setNewAdminEmail(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                The user must already be registered and verified in the system.
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Admin Role</Label>
              <Select value={newAdminRole} onValueChange={setNewAdminRole}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Moderator">Moderator</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2 rounded-md bg-muted p-2 text-xs">
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
                <span>Admins can manage all aspects of the platform. Moderators can only manage content.</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddAdminDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddAdmin} disabled={!newAdminEmail}>
              <Plus className="mr-2 h-4 w-4" />
              Add Admin
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
