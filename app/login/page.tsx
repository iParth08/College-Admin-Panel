"use client"

import { redirect } from "next/navigation"

export default function LoginPage() {
  // Redirect to home page which now has the login form
  redirect("/")
}
