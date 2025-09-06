import {
  ChevronDown, ChevronUp, Edit3, Key, LogOut, Mail, Leaf, Calendar, Shield
} from "lucide-react"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"

// Utility functions (replace with your own if you already have them)
function formatMemberSince(date: string) {
  return new Date(date).toLocaleDateString()
}
function formatLastLogin(date: string) {
  return new Date(date).toLocaleString()
}

// ---- Define props types ----
type User = {
  name: string
  email: string
  farmName: string
  roverId?: string
  date?: string
  lastLogin?: string
}

type SidebarProps = {
  user: User
  logout: () => void
  setIsEditProfileOpen: (value: boolean) => void
  setIsChangePasswordOpen: (value: boolean) => void
}

// ---- Component ----
export function Sidebar({
  user,
  logout,
  setIsEditProfileOpen,
  setIsChangePasswordOpen
}: SidebarProps) {
  const [isProfileExpanded, setIsProfileExpanded] = useState(false)

  const initials = user?.name ? user.name.charAt(0).toUpperCase() : "U"

  return (
    <aside className="w-72 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 flex flex-col h-screen overflow-y-auto">
      {/* Profile */}
      <div className="px-4 py-6">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 flex items-center justify-center rounded-full bg-indigo-600 text-white font-bold">
            {initials}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-50">{user.name}</h2>
              {user.roverId && (
                <Badge variant="secondary" className="text-xs">Rover: {user.roverId}</Badge>
              )}
            </div>
            <p className="text-sm text-gray-600 dark:text-slate-400">{user.farmName}</p>
          </div>
        </div>

        {/* Status */}
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600 dark:text-slate-400">
          <div className="text-center">
            <div className="font-semibold text-gray-900 dark:text-slate-50">1</div>
            <div className="text-xs">Rover</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-green-600">Online</div>
            <div className="text-xs">Status</div>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2 w-full justify-between">
              <span>Account</span>
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-72">
            <DropdownMenuLabel>Account Details</DropdownMenuLabel>
            <div className="px-2 py-2 space-y-2">
              <div className="flex items-center space-x-3 p-2 bg-gray-50 dark:bg-slate-800/50 rounded-lg">
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-indigo-600 text-white font-semibold">
                  {initials}
                </div>
                <div>
                  <div className="font-medium text-sm">{user.name}</div>
                  <div className="text-xs text-gray-600 dark:text-slate-400">{user.email}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-gray-500 dark:text-slate-400" />
                <span className="text-gray-600 dark:text-slate-300">{user.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Leaf className="h-4 w-4 text-gray-500 dark:text-slate-400" />
                <span className="text-gray-600 dark:text-slate-300">{user.farmName}</span>
              </div>
              {user.date && (
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="h-4 w-4 text-gray-500 dark:text-slate-400" />
                  <span className="text-gray-600 dark:text-slate-300">
                    Member since {formatMemberSince(user.date)}
                  </span>
                </div>
              )}
              {user.lastLogin && (
                <div className="flex items-center space-x-2 text-sm">
                  <Shield className="h-4 w-4 text-gray-500 dark:text-slate-400" />
                  <span className="text-gray-600 dark:text-slate-300">
                    Last login: {formatLastLogin(user.lastLogin)}
                  </span>
                </div>
              )}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => setIsEditProfileOpen(true)}>
              <Edit3 className="mr-2 h-4 w-4" />
              Edit Profile
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setIsChangePasswordOpen(true)}>
              <Key className="mr-2 h-4 w-4" />
              Change Password
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={logout}
              className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-900/50"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Expandable details */}
        <div className="mt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsProfileExpanded(!isProfileExpanded)}
            className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 dark:text-slate-400 dark:hover:text-slate-50"
          >
            <span className="text-sm">{isProfileExpanded ? "Hide" : "Show"} detailed info</span>
            {isProfileExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </Button>

          {isProfileExpanded && (
            <div className="mt-3 grid grid-cols-1 gap-4 p-4 bg-gray-100 dark:bg-slate-800/50 rounded-lg border dark:border-slate-800">
              <div>
                <div className="text-xs text-gray-500 dark:text-slate-400 uppercase tracking-wide">Email</div>
                <div className="text-sm font-medium text-gray-800 dark:text-slate-200">{user.email}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 dark:text-slate-400 uppercase tracking-wide">Farm Name</div>
                <div className="text-sm font-medium text-gray-800 dark:text-slate-200">{user.farmName}</div>
              </div>
              {user.date && (
                <div>
                  <div className="text-xs text-gray-500 dark:text-slate-400 uppercase tracking-wide">Member Since</div>
                  <div className="text-sm font-medium text-gray-800 dark:text-slate-200">{formatMemberSince(user.date)}</div>
                </div>
              )}
              {user.lastLogin && (
                <div>
                  <div className="text-xs text-gray-500 dark:text-slate-400 uppercase tracking-wide">Last Login</div>
                  <div className="text-sm font-medium text-gray-800 dark:text-slate-200">{formatLastLogin(user.lastLogin)}</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-6 flex-1 px-4 space-y-2">
        <Button variant="ghost" className="w-full justify-start">Home</Button>
        <Button variant="ghost" className="w-full justify-start">Community</Button>
      </nav>
    </aside>
  )
}
