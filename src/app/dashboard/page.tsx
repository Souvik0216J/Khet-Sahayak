// 'use client'

// import React, { useState, useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import axios from 'axios'
// import dynamic from 'next/dynamic'
// import {
//   Activity, AlertTriangle, Leaf, Bug, Thermometer, Settings,
//   Navigation, Camera, Droplets, MapPin, Cloud, Sun, Clock,
//   Bell, User, LogOut, Key, Mail, Calendar, Shield, Edit3,
//   ChevronDown, ChevronUp, Loader2
// } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
// import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
// import { Badge } from '@/components/ui/badge'
// import { Progress } from '@/components/ui/progress'
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { Separator } from '@/components/ui/separator'
// import Map from '@/components/Map'
// import { Sidebar } from '@/components/Sidebar'

// // --- TYPES ---
// interface User {
//   id: string
//   email: string
//   name: string
//   farmName: string
//   roverId: string
//   photoURL?: string
//   date?: string
//   lastLogin?: string
// }

// interface MapMarker {
//   id: number
//   lat: number
//   lng: number
//   plant: string
//   health: string
//   pestDetected: boolean
//   moisture: number
//   type: 'crop' | 'rover'
// }

// // --- HELPER FUNCTIONS ---
// const formatMemberSince = (dateString: string | undefined): string => {
//   if (!dateString) return "N/A"

//   try {
//     const [datePart] = dateString.split(', ')
//     const [day, month, year] = datePart.split('/')
//     const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))

//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//     })
//   } catch (error) {
//     return "N/A"
//   }
// }

// // --- MAIN DASHBOARD COMPONENT ---
// const Dashboard = () => {
//   const router = useRouter()

//   // --- STATE MANAGEMENT ---
//   const [user, setUser] = useState<User | null>(null)
//   const [isLoading, setIsLoading] = useState(true)

//   // Profile & Dialog States
//   const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false)
//   const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)
//   const [profileLoading, setProfileLoading] = useState(false)

//   // Form States
//   const [passwordData, setPasswordData] = useState({
//     currentPassword: '', newPassword: '', confirmPassword: ''
//   })
//   const [profileData, setProfileData] = useState({
//     name: '', farmName: '',
//   })

//   // Static Dashboard Data
//   const [roverStatus] = useState('active')
//   const [weatherAlert] = useState('Heavy rain expected tomorrow')
//   const [currentTemp] = useState(24)
//   const [roverStats] = useState({ battery: 85, signalStrength: 78, totalScanned: 145, pestsDetected: 7 })
//   const [roverLocation] = useState({ lat: 22.5726, lng: 88.3639 })
//   const [weatherData] = useState({ temperature: 24, humidity: 75, windSpeed: 12, forecast: 'Partly Cloudy' })
//   const [cropData] = useState([
//     { id: 1, plant: 'Tomato', health: 'Healthy', pestDetected: false, pestType: null, remedy: null, moisture: 65, growthStage: 'Flowering', daysToHarvest: 45, timestamp: '2 hours ago', location: { lat: 22.5726, lng: 88.3639 } },
//     { id: 2, plant: 'Rice', health: 'Pest Alert', pestDetected: true, pestType: 'Brown Planthopper', remedy: 'Apply neem oil spray twice a week', moisture: 80, growthStage: 'Tillering', daysToHarvest: 90, timestamp: '4 hours ago', location: { lat: 22.5730, lng: 88.3645 } },
//     { id: 3, plant: 'Wheat', health: 'Low Moisture', pestDetected: false, pestType: null, remedy: null, moisture: 35, growthStage: 'Grain Filling', daysToHarvest: 30, timestamp: '6 hours ago', location: { lat: 22.5720, lng: 88.3630 } }
//   ])

//   // Map data
//   const mapMarkers: MapMarker[] = [
//     {
//       id: 0,
//       lat: roverLocation.lat,
//       lng: roverLocation.lng,
//       plant: 'Rover',
//       health: 'Active',
//       pestDetected: false,
//       moisture: 0,
//       type: 'rover'
//     },
//     ...cropData.map(crop => ({
//       id: crop.id,
//       lat: crop.location.lat,
//       lng: crop.location.lng,
//       plant: crop.plant,
//       health: crop.health,
//       pestDetected: crop.pestDetected,
//       moisture: crop.moisture,
//       type: 'crop' as const
//     }))
//   ]

//   // --- DATA FETCHING & SIDE EFFECTS ---
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get('/api/users/me')
//         if (res.data.success) {
//           setUser(res.data.user)
//         } else {
//           router.push('/signin') 
//         }
//       } catch (err) {
//         router.push('/signin')    
//       } finally {
//         setIsLoading(false)
//       }
//     }
//     fetchUser()
//   }, [router])


//   useEffect(() => {
//     if (user) {
//       setProfileData({
//         name: user.name || '',
//         farmName: user.farmName || '',
//       })
//     }
//   }, [user])

//   // --- EVENT HANDLERS ---
//   const logout = async () => {
//     try {
//       await axios.get("/api/users/logout")
//       router.push("/")
//     } catch (error: any) {
//       console.error("Logout failed:", error.message)
//       alert("Logout failed. Please try again.")
//     }
//   }

//   const updateUserProfile = async (updateData: Partial<User>) => {
//     console.log("Updating profile with:", updateData)
//     setUser(prevUser => ({ ...prevUser!, ...updateData }))
//     alert('Profile updated successfully! (Mock)')
//     return { success: true }
//   }

//   const handlePasswordChange = (e: React.FormEvent) => {
//     e.preventDefault()
//     if (passwordData.newPassword !== passwordData.confirmPassword) {
//       alert('New passwords do not match')
//       return
//     }
//     alert('Password changed successfully (Mock)')
//     setIsChangePasswordOpen(false)
//     setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
//   }

//   const handleProfileUpdate = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setProfileLoading(true)
//     try {
//       const result = await updateUserProfile({
//         name: profileData.name,
//         farmName: profileData.farmName,
//       })
//       if (result.success) {
//         setIsEditProfileOpen(false)
//       } else {
//         throw new Error("Update failed")
//       }
//     } catch (error) {
//       alert('Failed to update profile.')
//     } finally {
//       setProfileLoading(false)
//     }
//   }

//   // --- RENDER LOGIC ---
//   if (isLoading || !user) {
//     return (
//       <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-slate-950">
//         <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
//       <div className="flex h-screen">
//         {/* Sidebar */}
//         <Sidebar
//           user={user}
//           logout={logout}
//           setIsEditProfileOpen={setIsEditProfileOpen}
//           setIsChangePasswordOpen={setIsChangePasswordOpen}
//         />

//         {/* Main content */}
//         <main className="flex-1 p-6 overflow-y-auto bg-gray-50 dark:bg-slate-900">
//           {/* Header */}
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-50 mb-2">Farm Dashboard</h1>
//             <p className="text-gray-600 dark:text-slate-400">Real-time monitoring and control of your autonomous farming rover</p>
//           </div>

//           {/* Weather Alert */}
//           {weatherAlert && (
//             <Alert className="mb-6 border-orange-200 bg-orange-50 dark:border-orange-900/50 dark:bg-orange-950/60">
//               <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
//               <AlertTitle className="text-orange-800 dark:text-orange-300">Weather Alert</AlertTitle>
//               <AlertDescription className="text-orange-700 dark:text-orange-400">
//                 {weatherAlert} - Rover operations may be affected
//               </AlertDescription>
//             </Alert>
//           )}

//           {/* Stats Overview */}
//           <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Rover Status</CardTitle>
//                 <Activity className={`h-4 w-4 ${roverStatus === 'active' ? 'text-green-600' : 'text-red-600'}`} />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">
//                   <Badge variant={roverStatus === 'active' ? 'default' : 'destructive'} className={roverStatus === 'active' ? 'bg-green-600' : ''}>
//                     {roverStatus === 'active' ? 'Active' : 'Offline'}
//                   </Badge>
//                 </div>
//                 <p className="text-xs text-gray-600 dark:text-slate-400 mt-1">
//                   Battery: {roverStats.battery}%
//                 </p>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Plants Scanned</CardTitle>
//                 <Leaf className="h-4 w-4 text-green-600" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{roverStats.totalScanned}</div>
//                 <p className="text-xs text-green-600 mt-1">+12 today</p>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Pests Detected</CardTitle>
//                 <Bug className="h-4 w-4 text-red-600" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{roverStats.pestsDetected}</div>
//                 <p className="text-xs text-red-600 mt-1">3 new alerts</p>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Current Temp</CardTitle>
//                 <Thermometer className="h-4 w-4 text-orange-600" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{currentTemp}°C</div>
//                 <p className="text-xs text-gray-600 dark:text-slate-400 mt-1">Humidity: 75%</p>
//               </CardContent>
//             </Card>
//           </section>

//           {/* Rover Control & Live Map */}
//           <section className="grid lg:grid-cols-3 gap-6">
//             <Card className="lg:col-span-1">
//               <CardHeader>
//                 <CardTitle className="flex items-center">
//                   <Settings className="w-5 h-5 mr-2" />
//                   Rover Control
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="space-y-2">
//                   <div className="flex justify-between items-center">
//                     <span className="text-sm">Battery Level</span>
//                     <span className="text-sm font-medium">{roverStats.battery}%</span>
//                   </div>
//                   <Progress value={roverStats.battery} className="h-2" />
//                 </div>
//                 <div className="space-y-2">
//                   <div className="flex justify-between items-center">
//                     <span className="text-sm">Signal Strength</span>
//                     <span className="text-sm font-medium">{roverStats.signalStrength}%</span>
//                   </div>
//                   <Progress value={roverStats.signalStrength} className="h-2" />
//                 </div>
//                 <div className="pt-4 space-y-2">
//                   <Button className="w-full" variant="outline"><Navigation className="w-4 h-4 mr-2" />Manual Control</Button>
//                   <Button className="w-full" variant="outline"><Camera className="w-4 h-4 mr-2" />Capture Image</Button>
//                   <Button className="w-full" variant="outline"><Droplets className="w-4 h-4 mr-2" />Deploy Soil Sensor</Button>
//                 </div>
//                 <div className="pt-4 border-t dark:border-slate-800">
//                   <h4 className="font-medium mb-2">Current Location</h4>
//                   <p className="text-sm text-gray-600 dark:text-slate-400">Lat: {roverLocation.lat.toFixed(4)}</p>
//                   <p className="text-sm text-gray-600 dark:text-slate-400">Lng: {roverLocation.lng.toFixed(4)}</p>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* INTERACTIVE MAP CARD */}
//             <Card className="lg:col-span-2">
//               <CardHeader>
//                 <CardTitle className="flex items-center">
//                   <MapPin className="w-5 h-5 mr-2" />
//                   Live Field Map
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-64 rounded-lg overflow-hidden border dark:border-slate-700">
//                   <Map
//                     center={[roverLocation.lat, roverLocation.lng]}
//                     zoom={16}
//                     markers={mapMarkers}
//                     className="w-full h-full"
//                   />
//                 </div>
//                 <div className="mt-4 flex items-center justify-between text-sm">
//                   <div className="flex items-center space-x-4">
//                     <div className="flex items-center">
//                       <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
//                       <span>Rover</span>
//                     </div>
//                     <div className="flex items-center">
//                       <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
//                       <span>Healthy</span>
//                     </div>
//                     <div className="flex items-center">
//                       <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
//                       <span>Low Moisture</span>
//                     </div>
//                     <div className="flex items-center">
//                       <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
//                       <span>Pest Alert</span>
//                     </div>
//                   </div>
//                   <Button variant="outline" size="sm">
//                     <Navigation className="w-3 h-3 mr-1" />
//                     Center on Rover
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </section>

//           {/* Weather and Recent Scans Section */}
//           <section className="grid lg:grid-cols-2 gap-6 mt-6">
//             <Card>
//               <CardHeader><CardTitle className="flex items-center"><Cloud className="w-5 h-5 mr-2" />Weather Conditions</CardTitle></CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="text-center">
//                     <Sun className="w-8 h-8 mx-auto text-yellow-500 mb-2" />
//                     <p className="text-2xl font-bold">{weatherData.temperature}°C</p>
//                     <p className="text-sm text-gray-600 dark:text-slate-400">Temperature</p>
//                   </div>
//                   <div className="text-center">
//                     <Droplets className="w-8 h-8 mx-auto text-blue-500 mb-2" />
//                     <p className="text-2xl font-bold">{weatherData.humidity}%</p>
//                     <p className="text-sm text-gray-600 dark:text-slate-400">Humidity</p>
//                   </div>
//                 </div>
//                 <div className="mt-4 pt-4 border-t dark:border-slate-800">
//                   <div className="flex items-center justify-between"><span className="text-sm">Wind Speed</span><span className="text-sm font-medium">{weatherData.windSpeed} km/h</span></div>
//                   <div className="flex items-center justify-between mt-2"><span className="text-sm">Forecast</span><span className="text-sm font-medium">{weatherData.forecast}</span></div>
//                 </div>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader><CardTitle className="flex items-center"><Activity className="w-5 h-5 mr-2" />Recent Scans</CardTitle></CardHeader>
//               <CardContent>
//                 <div className="space-y-3">
//                   {cropData.slice(0, 3).map((crop) => (
//                     <div key={crop.id} className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 dark:bg-slate-800/50 dark:hover:bg-slate-800 rounded-lg">
//                       <div className="flex items-center space-x-3">
//                         <div className={`w-3 h-3 rounded-full flex-shrink-0 ${crop.pestDetected ? 'bg-red-500' : crop.health === 'Low Moisture' ? 'bg-orange-500' : 'bg-green-500'}`}></div>
//                         <div>
//                           <p className="font-medium text-sm">{crop.plant}</p>
//                           <p className="text-xs text-gray-600 dark:text-slate-400">{crop.timestamp}</p>
//                         </div>
//                       </div>
//                       <Badge variant={crop.pestDetected ? 'destructive' : 'default'} className={!crop.pestDetected && crop.health === 'Healthy' ? 'bg-green-600' : crop.health === 'Low Moisture' ? 'bg-orange-500' : ''}>{crop.health}</Badge>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </section>

//           {/* Detailed Crop Analysis section */}
//           <section className="mt-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Crop Analysis Details</CardTitle>
//                 <CardDescription>Comprehensive analysis of detected plants and recommendations</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid gap-6">
//                   {cropData.map((crop) => (
//                     <div key={crop.id} className="border dark:border-slate-800 rounded-lg p-4 bg-white dark:bg-slate-900 shadow-sm">
//                       <div className="flex flex-col sm:flex-row items-start justify-between mb-4 gap-2">
//                         <div className="flex items-center space-x-3">
//                           <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0"><Leaf className="w-8 h-8 text-green-600" /></div>
//                           <div>
//                             <h3 className="font-semibold text-lg">{crop.plant}</h3>
//                             <p className="text-sm text-gray-600 dark:text-slate-400">Growth Stage: {crop.growthStage}</p>
//                             <p className="text-xs text-gray-500 dark:text-slate-500">{crop.timestamp}</p>
//                           </div>
//                         </div>
//                         <Badge variant={crop.pestDetected ? 'destructive' : crop.health === 'Low Moisture' ? 'secondary' : 'default'} className="mt-2 sm:mt-0">{crop.health}</Badge>
//                       </div>
//                       <div className="grid md:grid-cols-3 gap-4">
//                         <div className="space-y-2">
//                           <div className="flex items-center text-sm"><Droplets className="w-4 h-4 mr-2 text-blue-500" />Soil Moisture</div>
//                           <Progress value={crop.moisture} className="h-2" />
//                           <p className="text-xs text-gray-600 dark:text-slate-400">{crop.moisture}%</p>
//                         </div>
//                         <div className="space-y-2">
//                           <div className="flex items-center text-sm"><Clock className="w-4 h-4 mr-2 text-orange-500" />Days to Harvest</div>
//                           <div className="text-xl font-bold">{crop.daysToHarvest}</div>
//                           <p className="text-xs text-gray-600 dark:text-slate-400">Based on weather forecast</p>
//                         </div>
//                         <div className="space-y-2">
//                           <div className="flex items-center text-sm"><MapPin className="w-4 h-4 mr-2 text-purple-500" />Location</div>
//                           <p className="text-xs text-gray-600 dark:text-slate-400">{crop.location.lat.toFixed(4)}, {crop.location.lng.toFixed(4)}</p>
//                           <Button size="sm" variant="outline" className="text-xs h-8"><Bell className="w-3 h-3 mr-1" />Set Alert</Button>
//                         </div>
//                       </div>
//                       {crop.pestDetected && (
//                         <Alert className="mt-4 border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-950/60">
//                           <Bug className="h-4 w-4 text-red-600 dark:text-red-400" />
//                           <AlertTitle className="text-red-800 dark:text-red-300">Pest Alert: {crop.pestType}</AlertTitle>
//                           <AlertDescription className="text-red-700 dark:text-red-400">Recommendation: {crop.remedy}</AlertDescription>
//                         </Alert>
//                       )}
//                       {crop.health === 'Low Moisture' && (
//                         <Alert className="mt-4 border-orange-200 bg-orange-50 dark:border-orange-900/50 dark:bg-orange-950/60">
//                           <Droplets className="h-4 w-4 text-orange-600 dark:text-orange-400" />
//                           <AlertTitle className="text-orange-800 dark:text-orange-300">Low Soil Moisture</AlertTitle>
//                           <AlertDescription className="text-orange-700 dark:text-orange-400">Irrigation recommended - Estimated water needed: 2.5L per plant</AlertDescription>
//                         </Alert>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </section>
//         </main>
//       </div>

//       {/* --- DIALOGS --- */}
//       <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Edit Profile</DialogTitle>
//             <DialogDescription>
//               Make changes to your profile here. Click save when you're done.
//             </DialogDescription>
//           </DialogHeader>
//           <form id="edit-profile-form" onSubmit={handleProfileUpdate} className="grid gap-4 py-4">
//             <div className="space-y-2">
//               <Label htmlFor="name">Display Name</Label>
//               <Input id="name" value={profileData.name} onChange={(e) => setProfileData({ ...profileData, name: e.target.value })} />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="farmName">Farm Name</Label>
//               <Input id="farmName" value={profileData.farmName} onChange={(e) => setProfileData({ ...profileData, farmName: e.target.value })} />
//             </div>
//           </form>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setIsEditProfileOpen(false)}>Cancel</Button>
//             <Button type="submit" form="edit-profile-form" disabled={profileLoading}>
//               {profileLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Save Changes'}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       <Dialog open={isChangePasswordOpen} onOpenChange={setIsChangePasswordOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Change Password</DialogTitle>
//           </DialogHeader>
//           <form id="change-password-form" onSubmit={handlePasswordChange} className="grid gap-4 py-4">
//             <div className="space-y-2">
//               <Label htmlFor="currentPassword">Current Password</Label>
//               <Input id="currentPassword" type="password" value={passwordData.currentPassword} onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })} />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="newPassword">New Password</Label>
//               <Input id="newPassword" type="password" value={passwordData.newPassword} onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })} />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="confirmPassword">Confirm New Password</Label>
//               <Input id="confirmPassword" type="password" value={passwordData.confirmPassword} onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })} />
//             </div>
//           </form>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setIsChangePasswordOpen(false)}>Cancel</Button>
//             <Button type="submit" form="change-password-form">Save Changes</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }

// export default Dashboard

'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Activity, AlertTriangle, Leaf, Bug, Thermometer, Settings, Navigation, Camera, Droplets, MapPin, Cloud, Sun, Clock, Bell, User, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Map from '@/components/Map'
import { Sidebar } from '@/components/Sidebar'

// Firebase imports
import { initializeApp } from 'firebase/app'
import { getFirestore, doc, onSnapshot, collection, query, orderBy, limit } from 'firebase/firestore'

// --- FIREBASE CONFIG ---
const firebaseConfig = {
    // Add your Firebase config here
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// --- TYPES ---
interface User {
    id: string
    email: string
    name: string
    farmName: string
    roverId: string
    photoURL?: string
    date?: string
    lastLogin?: string
}

interface RoverData {
    roverId: string
    temperature: number
    humidity: number
    battery: number
    status: 'active' | 'inactive' | 'maintenance'
    location: {
        lat: number
        lng: number
    }
    timestamp: Date
    totalScanned: number
    pestsDetected: number
}

interface CropData {
    id: string
    plantName: string
    health: 'Healthy' | 'Pest Alert' | 'Low Moisture' | 'Disease Detected'
    pestDetected: boolean
    pestType?: string
    remedy?: string
    moisture: number
    growthStage: string
    daysToHarvest: number
    timestamp: string
    location: {
        lat: number
        lng: number
    }
}

interface WeatherData {
    temperature: number
    humidity: number
    windSpeed: number
    forecast: string
    alerts?: string[]
}

interface MapMarker {
    id: number | string
    lat: number
    lng: number
    plant: string
    health: string
    pestDetected: boolean
    moisture: number
    type: 'crop' | 'rover'
}

// --- HELPER FUNCTIONS ---
const formatMemberSince = (dateString: string | undefined): string => {
    if (!dateString) return "N/A"

    try {
        const [datePart] = dateString.split(', ')
        const [day, month, year] = datePart.split('/')
        const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))

        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })
    } catch (error) {
        return "N/A"
    }
}

// Weather API function
const fetchWeatherData = async (lat: number, lng: number): Promise<WeatherData | null> => {
    try {
        const API_KEY = 'ABC1234' // Your OpenWeatherMap API key
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
        )

        if (!response.ok) throw new Error('Weather fetch failed')

        const data = await response.json()

        // Also fetch alerts
        const alertResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
        )

        let alerts: string[] = []
        if (alertResponse.ok) {
            const alertData = await alertResponse.json()
            alerts = alertData.alerts?.map((alert: any) => alert.description) || []
        }

        return {
            temperature: Math.round(data.main.temp),
            humidity: data.main.humidity,
            windSpeed: Math.round(data.wind?.speed * 3.6 || 0), // Convert m/s to km/h
            forecast: data.weather[0].description,
            alerts
        }
    } catch (error) {
        console.error('Error fetching weather data:', error)
        return null
    }
}

// --- MAIN DASHBOARD COMPONENT ---
const Dashboard = () => {
    const router = useRouter()

    // --- STATE MANAGEMENT ---
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    // Real-time data states
    const [roverData, setRoverData] = useState<RoverData | null>(null)
    const [cropData, setCropData] = useState<CropData[]>([])
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
    const [weatherAlert, setWeatherAlert] = useState<string>('')

    // Profile & Dialog States
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false)
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)
    const [profileLoading, setProfileLoading] = useState(false)

    // Form States
    const [passwordData, setPasswordData] = useState({
        currentPassword: '', newPassword: '', confirmPassword: ''
    })
    const [profileData, setProfileData] = useState({
        name: '', farmName: '',
    })

    // --- DATA FETCHING & SIDE EFFECTS ---
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get('/api/users/me')
                if (res.data.success) {
                    setUser(res.data.user)
                } else {
                    router.push('/signin')
                }
            } catch (err) {
                router.push('/signin')
            } finally {
                setIsLoading(false)
            }
        }
        fetchUser()
    }, [router])

    // Real-time Firestore listener for rover data
    useEffect(() => {
        if (!user?.roverId) return

        const unsubscribe = onSnapshot(
            doc(db, 'rovers', user.roverId),
            (doc) => {
                if (doc.exists()) {
                    const data = doc.data()
                    setRoverData({
                        roverId: user.roverId,
                        temperature: data.temperature || 0,
                        humidity: data.humidity || 0,
                        battery: data.battery || 0,
                        status: data.status || 'inactive',
                        location: {
                            lat: data.location?.lat || 22.5726,
                            lng: data.location?.lng || 88.3639
                        },
                        timestamp: data.timestamp?.toDate() || new Date(),
                        totalScanned: data.totalScanned || 0,
                        pestsDetected: data.pestsDetected || 0
                    })
                }
            },
            (error) => {
                console.error('Error fetching rover data:', error)
            }
        )

        return () => unsubscribe()
    }, [user?.roverId])

    // Real-time Firestore listener for crop data
    useEffect(() => {
        if (!user?.roverId) return

        const cropsQuery = query(
            collection(db, 'rovers', user.roverId, 'crops'),
            orderBy('timestamp', 'desc'),
            limit(10)
        )

        const unsubscribe = onSnapshot(
            cropsQuery,
            (snapshot) => {
                const crops: CropData[] = []
                snapshot.forEach((doc) => {
                    const data = doc.data()
                    crops.push({
                        id: doc.id,
                        plantName: data.plantName || `Plant ${doc.id.slice(-2)}`,
                        health: data.health || 'Healthy',
                        pestDetected: data.pestDetected || false,
                        pestType: data.pestType,
                        remedy: data.remedy,
                        moisture: data.moisture || 0,
                        growthStage: data.growthStage || 'Growing',
                        daysToHarvest: data.daysToHarvest || 30,
                        timestamp: data.timestamp?.toDate()?.toLocaleString() || 'Unknown',
                        location: {
                            lat: data.location?.lat || (22.5726 + Math.random() * 0.001),
                            lng: data.location?.lng || (88.3639 + Math.random() * 0.001)
                        }
                    })
                })
                setCropData(crops)
            },
            (error) => {
                console.error('Error fetching crop data:', error)
            }
        )

        return () => unsubscribe()
    }, [user?.roverId])

    // Fetch weather data when rover location is available
    useEffect(() => {
        if (roverData?.location) {
            fetchWeatherData(roverData.location.lat, roverData.location.lng)
                .then(data => {
                    if (data) {
                        setWeatherData(data)
                        // Set weather alert if there are any
                        if (data.alerts && data.alerts.length > 0) {
                            setWeatherAlert(data.alerts[0])
                        }
                    }
                })
                .catch(error => console.error('Weather fetch error:', error))
        }
    }, [roverData?.location])

    useEffect(() => {
        if (user) {
            setProfileData({
                name: user.name || '',
                farmName: user.farmName || '',
            })
        }
    }, [user])

    // Create map markers from real data
    const mapMarkers: MapMarker[] = [
        ...(roverData ? [{
            id: 'rover',
            lat: roverData.location.lat,
            lng: roverData.location.lng,
            plant: 'Rover',
            health: roverData.status === 'active' ? 'Active' : 'Inactive',
            pestDetected: false,
            moisture: 0,
            type: 'rover' as const
        }] : []),
        ...cropData.map(crop => ({
            id: crop.id,
            lat: crop.location.lat,
            lng: crop.location.lng,
            plant: crop.plantName,
            health: crop.health,
            pestDetected: crop.pestDetected,
            moisture: crop.moisture,
            type: 'crop' as const
        }))
    ]

    // --- EVENT HANDLERS ---
    const logout = async () => {
        try {
            await axios.get("/api/users/logout")
            router.push("/")
        } catch (error: any) {
            console.error("Logout failed:", error.message)
            alert("Logout failed. Please try again.")
        }
    }

    const updateUserProfile = async (updateData: Partial<User>) => {
        console.log("Updating profile with:", updateData)
        setUser(prevUser => ({ ...prevUser!, ...updateData }))
        alert('Profile updated successfully!')
        return { success: true }
    }

    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault()
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert('New passwords do not match')
            return
        }
        alert('Password changed successfully')
        setIsChangePasswordOpen(false)
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
    }

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        setProfileLoading(true)
        try {
            const result = await updateUserProfile({
                name: profileData.name,
                farmName: profileData.farmName,
            })
            if (result.success) {
                setIsEditProfileOpen(false)
            } else {
                throw new Error("Update failed")
            }
        } catch (error) {
            alert('Failed to update profile.')
        } finally {
            setProfileLoading(false)
        }
    }

    // --- RENDER LOGIC ---
    if (isLoading || !user) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-slate-950">
                <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
            <div className="flex h-screen">
                {/* Sidebar */}
                <Sidebar
                    user={user}
                    logout={logout}
                    setIsEditProfileOpen={setIsEditProfileOpen}
                    setIsChangePasswordOpen={setIsChangePasswordOpen}
                />

                {/* Main content */}
                <main className="flex-1 p-6 overflow-y-auto bg-gray-50 dark:bg-slate-900">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-50 mb-2">Farm Dashboard</h1>
                        <p className="text-gray-600 dark:text-slate-400">Real-time monitoring and control of your autonomous farming rover</p>
                    </div>

                    {/* Weather Alert */}
                    {weatherAlert && (
                        <Alert className="mb-6 border-orange-200 bg-orange-50 dark:border-orange-900/50 dark:bg-orange-950/60">
                            <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                            <AlertTitle className="text-orange-800 dark:text-orange-300">Weather Alert</AlertTitle>
                            <AlertDescription className="text-orange-700 dark:text-orange-400">
                                {weatherAlert} - Rover operations may be affected
                            </AlertDescription>
                        </Alert>
                    )}

                    {/* Stats Overview */}
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Rover Status</CardTitle>
                                <Activity className={`h-4 w-4 ${roverData?.status === 'active' ? 'text-green-600' : 'text-red-600'}`} />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    <Badge variant={roverData?.status === 'active' ? 'default' : 'destructive'} className={roverData?.status === 'active' ? 'bg-green-600' : ''}>
                                        {roverData?.status === 'active' ? 'Active' : roverData?.status || 'Offline'}
                                    </Badge>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-slate-400 mt-1">
                                    Battery: {roverData?.battery || 0}%
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Plants Scanned</CardTitle>
                                <Leaf className="h-4 w-4 text-green-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{roverData?.totalScanned || 0}</div>
                                <p className="text-xs text-green-600 mt-1">+{cropData.length} recent</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Pests Detected</CardTitle>
                                <Bug className="h-4 w-4 text-red-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{roverData?.pestsDetected || 0}</div>
                                <p className="text-xs text-red-600 mt-1">{cropData.filter(c => c.pestDetected).length} active alerts</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Current Temp</CardTitle>
                                <Thermometer className="h-4 w-4 text-orange-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{weatherData?.temperature || roverData?.temperature || 0}°C</div>
                                <p className="text-xs text-gray-600 dark:text-slate-400 mt-1">Humidity: {weatherData?.humidity || roverData?.humidity || 0}%</p>
                            </CardContent>
                        </Card>
                    </section>

                    {/* Rover Control & Live Map */}
                    <section className="grid lg:grid-cols-3 gap-6">
                        <Card className="lg:col-span-1">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Settings className="w-5 h-5 mr-2" />
                                    Rover Control
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm">Battery Level</span>
                                        <span className="text-sm font-medium">{roverData?.battery || 0}%</span>
                                    </div>
                                    <Progress value={roverData?.battery || 0} className="h-2" />
                                </div>
                                <div className="pt-4 space-y-2">
                                    <Button className="w-full" variant="outline"><Navigation className="w-4 h-4 mr-2" />Manual Control</Button>
                                    <Button className="w-full" variant="outline"><Camera className="w-4 h-4 mr-2" />Capture Image</Button>
                                    <Button className="w-full" variant="outline"><Droplets className="w-4 h-4 mr-2" />Deploy Soil Sensor</Button>
                                </div>
                                <div className="pt-4 border-t dark:border-slate-800">
                                    <h4 className="font-medium mb-2">Current Location</h4>
                                    <p className="text-sm text-gray-600 dark:text-slate-400">Lat: {roverData?.location.lat.toFixed(4) || 'N/A'}</p>
                                    <p className="text-sm text-gray-600 dark:text-slate-400">Lng: {roverData?.location.lng.toFixed(4) || 'N/A'}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* INTERACTIVE MAP CARD */}
                        <Card className="lg:col-span-2">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <MapPin className="w-5 h-5 mr-2" />
                                    Live Field Map
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-64 rounded-lg overflow-hidden border dark:border-slate-700">
                                    {roverData?.location && (
                                        <Map
                                            center={[roverData.location.lat, roverData.location.lng]}
                                            zoom={16}
                                            // markers={mapMarkers}
                                            className="w-full h-full"
                                        />
                                    )}
                                </div>
                                <div className="mt-4 flex items-center justify-between text-sm">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center">
                                            <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
                                            <span>Rover</span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                                            <span>Healthy</span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                                            <span>Low Moisture</span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                                            <span>Pest Alert</span>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm">
                                        <Navigation className="w-3 h-3 mr-1" />
                                        Center on Rover
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </section>

                    {/* Weather and Recent Scans Section */}
                    <section className="grid lg:grid-cols-2 gap-6 mt-6">
                        <Card>
                            <CardHeader><CardTitle className="flex items-center"><Cloud className="w-5 h-5 mr-2" />Weather Conditions</CardTitle></CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center">
                                        <Sun className="w-8 h-8 mx-auto text-yellow-500 mb-2" />
                                        <p className="text-2xl font-bold">{weatherData?.temperature || roverData?.temperature || 0}°C</p>
                                        <p className="text-sm text-gray-600 dark:text-slate-400">Temperature</p>
                                    </div>
                                    <div className="text-center">
                                        <Droplets className="w-8 h-8 mx-auto text-blue-500 mb-2" />
                                        <p className="text-2xl font-bold">{weatherData?.humidity || roverData?.humidity || 0}%</p>
                                        <p className="text-sm text-gray-600 dark:text-slate-400">Humidity</p>
                                    </div>
                                </div>
                                <div className="mt-4 pt-4 border-t dark:border-slate-800">
                                    <div className="flex items-center justify-between"><span className="text-sm">Wind Speed</span><span className="text-sm font-medium">{weatherData?.windSpeed || 0} km/h</span></div>
                                    <div className="flex items-center justify-between mt-2"><span className="text-sm">Forecast</span><span className="text-sm font-medium">{weatherData?.forecast || 'Unknown'}</span></div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader><CardTitle className="flex items-center"><Activity className="w-5 h-5 mr-2" />Recent Scans</CardTitle></CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {cropData.slice(0, 3).map((crop) => (
                                        <div key={crop.id} className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 dark:bg-slate-800/50 dark:hover:bg-slate-800 rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <div className={`w-3 h-3 rounded-full flex-shrink-0 ${crop.pestDetected ? 'bg-red-500' : crop.health === 'Low Moisture' ? 'bg-orange-500' : 'bg-green-500'}`}></div>
                                                <div>
                                                    <p className="font-medium text-sm">{crop.plantName}</p>
                                                    <p className="text-xs text-gray-600 dark:text-slate-400">{crop.timestamp}</p>
                                                </div>
                                            </div>
                                            <Badge variant={crop.pestDetected ? 'destructive' : 'default'} className={!crop.pestDetected && crop.health === 'Healthy' ? 'bg-green-600' : crop.health === 'Low Moisture' ? 'bg-orange-500' : ''}>{crop.health}</Badge>
                                        </div>
                                    ))}
                                    {cropData.length === 0 && (
                                        <p className="text-sm text-gray-500 text-center py-4">No recent scans available</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </section>

                    {/* Detailed Crop Analysis section */}
                    <section className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Crop Analysis Details</CardTitle>
                                <CardDescription>Comprehensive analysis of detected plants and recommendations</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6">
                                    {cropData.map((crop) => (
                                        <div key={crop.id} className="border dark:border-slate-800 rounded-lg p-4 bg-white dark:bg-slate-900 shadow-sm">
                                            <div className="flex flex-col sm:flex-row items-start justify-between mb-4 gap-2">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0"><Leaf className="w-8 h-8 text-green-600" /></div>
                                                    <div>
                                                        <h3 className="font-semibold text-lg">{crop.plantName}</h3>
                                                        <p className="text-sm text-gray-600 dark:text-slate-400">Growth Stage: {crop.growthStage}</p>
                                                        <p className="text-xs text-gray-500 dark:text-slate-500">{crop.timestamp}</p>
                                                    </div>
                                                </div>
                                                <Badge variant={crop.pestDetected ? 'destructive' : crop.health === 'Low Moisture' ? 'secondary' : 'default'} className="mt-2 sm:mt-0">{crop.health}</Badge>
                                            </div>
                                            <div className="grid md:grid-cols-3 gap-4">
                                                <div className="space-y-2">
                                                    <div className="flex items-center text-sm"><Droplets className="w-4 h-4 mr-2 text-blue-500" />Soil Moisture</div>
                                                    <Progress value={crop.moisture} className="h-2" />
                                                    <p className="text-xs text-gray-600 dark:text-slate-400">{crop.moisture}%</p>
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="flex items-center text-sm"><Clock className="w-4 h-4 mr-2 text-orange-500" />Days to Harvest</div>
                                                    <div className="text-xl font-bold">{crop.daysToHarvest}</div>
                                                    <p className="text-xs text-gray-600 dark:text-slate-400">Based on weather forecast</p>
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="flex items-center text-sm"><MapPin className="w-4 h-4 mr-2 text-purple-500" />Location</div>
                                                    <p className="text-xs text-gray-600 dark:text-slate-400">{crop.location.lat.toFixed(4)}, {crop.location.lng.toFixed(4)}</p>
                                                    <Button size="sm" variant="outline" className="text-xs h-8"><Bell className="w-3 h-3 mr-1" />Set Alert</Button>
                                                </div>
                                            </div>
                                            {crop.pestDetected && (
                                                <Alert className="mt-4 border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-950/60">
                                                    <Bug className="h-4 w-4 text-red-600 dark:text-red-400" />
                                                    <AlertTitle className="text-red-800 dark:text-red-300">Pest Alert: {crop.pestType}</AlertTitle>
                                                    <AlertDescription className="text-red-700 dark:text-red-400">Recommendation: {crop.remedy}</AlertDescription>
                                                </Alert>
                                            )}
                                            {crop.health === 'Low Moisture' && (
                                                <Alert className="mt-4 border-orange-200 bg-orange-50 dark:border-orange-900/50 dark:bg-orange-950/60">
                                                    <Droplets className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                                                    <AlertTitle className="text-orange-800 dark:text-orange-300">Low Soil Moisture</AlertTitle>
                                                    <AlertDescription className="text-orange-700 dark:text-orange-400">Irrigation recommended - Estimated water needed: 2.5L per plant</AlertDescription>
                                                </Alert>
                                            )}
                                        </div>
                                    ))}
                                    {cropData.length === 0 && (
                                        <div className="text-center py-8 text-gray-500">
                                            <Leaf className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                            <p>No crop data available. Rover will start scanning soon.</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </section>
                </main>
            </div>

            {/* --- DIALOGS --- */}
            <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <form id="edit-profile-form" onSubmit={handleProfileUpdate} className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Display Name</Label>
                            <Input id="name" value={profileData.name} onChange={(e) => setProfileData({ ...profileData, name: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="farmName">Farm Name</Label>
                            <Input id="farmName" value={profileData.farmName} onChange={(e) => setProfileData({ ...profileData, farmName: e.target.value })} />
                        </div>
                    </form>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditProfileOpen(false)}>Cancel</Button>
                        <Button type="submit" form="edit-profile-form" disabled={profileLoading}>
                            {profileLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Save Changes'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isChangePasswordOpen} onOpenChange={setIsChangePasswordOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Change Password</DialogTitle>
                    </DialogHeader>
                    <form id="change-password-form" onSubmit={handlePasswordChange} className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="currentPassword">Current Password</Label>
                            <Input id="currentPassword" type="password" value={passwordData.currentPassword} onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input id="newPassword" type="password" value={passwordData.newPassword} onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                            <Input id="confirmPassword" type="password" value={passwordData.confirmPassword} onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })} />
                        </div>
                    </form>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsChangePasswordOpen(false)}>Cancel</Button>
                        <Button type="submit" form="change-password-form">Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Dashboard