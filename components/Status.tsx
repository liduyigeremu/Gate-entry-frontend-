'use client'

import { useState } from 'react'
import Image from 'next/image'
import { CalendarClock, CirclePlus, Settings, Trash2 } from 'lucide-react'

interface DeviceData {
  id: string
  name: string
  serialNumber: string
  submissionDate: string
  status: 'approved' | 'pending' | 'rejected' | 'active'
}
const statusConfig = {
  approved: {
    label: 'Approved',
    styles: 'bg-[#D3EE76] text-[#171E00]',
    dot: 'bg-[#495B00]',
  },
  pending: {
    label: 'Pending Approval',
    styles: 'bg-[#FDCBF6] text-[#795277]',
    dot: 'bg-[#795277]',
  },
  rejected: {
    label: 'Rejected',
    styles: 'bg-[#DD5B5B] text-[#50434E]',
    dot: 'bg-[#8D0A0A]',
  },
  active: {
    label: 'Active',
    styles: 'bg-[#FFD6F8] text-[#37003B]',
    dot: 'bg-[#872F89]',
  },
}
const Status = () => {
  const [devices] = useState<DeviceData[]>([
    { id: '1', name: 'MacBook Pro M3', serialNumber: 'AP-8829-XQ', submissionDate: 'Mar 12, 2026', status: 'approved' },
    { id: '2', name: 'MacBook Pro M3', serialNumber: 'AP-8829-XQ', submissionDate: 'Mar 12, 2026', status: 'pending' },
    { id: '3', name: 'MacBook Pro M3', serialNumber: 'AP-8829-XQ', submissionDate: 'Mar 12, 2026', status: 'rejected' },
    { id: '4', name: 'MacBook Pro M3', serialNumber: 'AP-8829-XQ', submissionDate: 'Mar 12, 2026', status: 'active' },
  ])

  const getActionText = (status: string) =>
    status === 'rejected' ? 'Edit Info' : 'View Details'

  return (
    <div className="w-full min-h-screen bg-priamry-bg">


      <main className="w-full">
        
        <div className="max-w-360 mx-auto px-6 flex flex-col gap-16 items-center">

          <section className="w-full text-left">
            <h1 className="text-3xl md:text-5xl font-bold text-[#1c1b1f]">
              Registration Tracker
            </h1>
            <p className="text-sm md:text-lg text-[#50434e] mt-2">
              Monitor your devices and approval workflows in real-time.
            </p>
          </section>

          <section className="w-full flex flex-col lg:flex-row gap-8">

            <div className="w-full lg:w-1/3 flex flex-col gap-6">

                <div className="bg-white rounded-2xl shadow p-8">                
                          <div className="flex items-center justify-center w-5 h-5 mr-1 text-primary">
                            <CalendarClock className="size-full stroke-2" />
                            </div>
               
                <p className="text-xs uppercase text-[#50434e]">In Review</p>
                <h2 className="text-3xl font-bold text-primary">
                  2 Devices
                </h2>
                <p className="text-sm text-[#50434e] mt-2">
                  Estimated completion: <b>5 hours</b>
                </p>
              </div>

              <div className="relative bg-primary rounded-2xl p-6 text-white overflow-hidden">
           <Image src="/container.png" alt="" width={160} height={160} className="absolute -bottom-10 -right-10 opacity-40"/>

                <p className="text-xs uppercase">Quick Action</p>
                <h3 className="text-xl font-bold mt-1">Register New Asset</h3>

                <button className="mt-4 flex items-center gap-2 bg-white text-primary px-4 py-2 rounded-3xl font-bold">
                           <div className="flex items-center justify-center w-5 h-5 mr-1 text-primary">
                            <CirclePlus className="size-full stroke-2" />
                            </div>  Start Enrollment
                </button>
              </div>
            </div>

            <div className="flex-1 bg-white/70 rounded-2xl shadow p-0">

              <div className="p-6 ">
                <h2 className="text-xl font-bold">Hardware Inventory</h2>
              </div>

              <div className="flex bg-[#f6f2f87f] text-xs uppercase font-bold text-[#50434e]">
                <div className="flex-1 p-4">Asset Identity</div>
                <div className="flex-1 p-4 text-center">Submission</div>
                <div className="flex-1 p-4 text-center">Approval</div>
                <div className="flex-1 p-4 text-center">Action</div>
              </div>

              {devices.map((device, i) => {
                const status = statusConfig[device.status]

                return (
                  <div key={device.id}
                    className={`flex items-center ${i ? 'border-t border-gray-100/30' : '' }`}>

                    <div className="flex-1 flex items-center gap-4 p-6">
                      <div className="bg-[#fdcbf64c] p-3 rounded">
                        <Image src="/laptop.png" alt="" width={40} height={40} />
                      </div>

                      <div>
                        <h4 className="font-bold">{device.name}</h4>
                        <p className="text-xs text-[#50434e]">
                          SN: {device.serialNumber}
                        </p>
                      </div>
                    </div>

                    <div className="flex-1 text-center text-sm">
                      {device.submissionDate}
                    </div>

                    <div className="flex-1 flex justify-center">
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-xl ${status.styles}`}>
                        <div className={`w-2 h-2 rounded-full ${status.dot}`} />
                        <span className="text-xs font-bold">
                          {status.label}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1 flex justify-center">
                      {device.status === 'active' ? (
                        <div className="flex gap-2">
                          <button className="p-2 bg-gray-100 rounded-full flex items-center justify-center">
                       <Settings className="w-5 h-5 stroke-2" />
                         </button>
                          <button className="p-2 bg-gray-100 rounded-full flex items-center justify-center">
                       <Trash2 className="w-5 h-5 stroke-2" />
                         </button>
                        </div>
                      ) : (
                        <button className="text-xs font-bold text-primary">
                          {getActionText(device.status)}
                        </button>
                      )}
                    </div>

                  </div>
                )
              })}
            </div>

          </section>
        </div>
      </main>
    </div>
  )
}

export default Status