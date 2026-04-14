'use client'

import { useState } from 'react'
import Image from 'next/image'
// import Header from '@/components/Header'

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
    styles: 'bg-green-100 text-green-700',
    dot: 'bg-green-600',
  },
  pending: {
    label: 'Pending Approval',
    styles: 'bg-purple-100 text-purple-700',
    dot: 'bg-purple-600',
  },
  rejected: {
    label: 'Rejected',
    styles: 'bg-red-100 text-red-700',
    dot: 'bg-red-600',
  },
  active: {
    label: 'Active',
    styles: 'bg-purple-100 text-purple-700',
    dot: 'bg-purple-600',
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
    <div className="w-full min-h-screen bg-[#fcf8fe]">

      {/* <Header /> */}

      <main className="w-full">
        
        <div className="max-w-[1440px] mx-auto px-6 flex flex-col gap-16 items-center">

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
                <Image src="/review.png" alt="" width={28} height={30} className="mb-4" />
                <p className="text-xs uppercase text-[#50434e]">In Review</p>
                <h2 className="text-3xl font-bold text-[#872f89]">
                  2 Devices
                </h2>
                <p className="text-sm text-[#50434e] mt-2">
                  Estimated completion: <b>5 hours</b>
                </p>
              </div>

              <div className="relative bg-[#872f89] rounded-2xl p-6 text-white overflow-hidden">
           <Image src="/container.png" alt="" width={160} height={160} className="absolute -bottom-10 -right-10 opacity-40"/>

                <p className="text-xs uppercase">Quick Action</p>
                <h3 className="text-xl font-bold mt-1">Register New Asset</h3>

                <button className="mt-4 flex items-center gap-2 bg-white text-[#872f89] px-4 py-2 rounded-xl font-bold">
                  <Image src="/add.png" alt="" width={20} height={20} />
                  Start Enrollment
                </button>
              </div>
            </div>

            <div className="flex-1 bg-white/70 rounded-2xl shadow p-0">

              <div className="p-6 ">
                <h2 className="text-xl font-bold">Hardware Inventory</h2>
              </div>

              {/* Updated Header: all columns are flex-1 for equal space */}
              <div className="flex bg-[#f6f2f87f] text-xs uppercase font-bold text-[#50434e]">
                <div className="flex-1 p-4">Asset Identity</div>
                <div className="flex-1 p-4 text-center">Submission</div>
                <div className="flex-1 p-4 text-center">Approval</div>
                <div className="flex-1 p-4 text-center">Action</div>
              </div>

              {/* Rows */}
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

                    {/* Updated Submission Column */}
                    <div className="flex-1 text-center text-sm">
                      {device.submissionDate}
                    </div>

                    {/* Updated Approval Column */}
                    <div className="flex-1 flex justify-center">
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-xl ${status.styles}`}>
                        <div className={`w-2 h-2 rounded-full ${status.dot}`} />
                        <span className="text-xs font-bold">
                          {status.label}
                        </span>
                      </div>
                    </div>

                    {/* Updated Action Column */}
                    <div className="flex-1 flex justify-center">
                      {device.status === 'active' ? (
                        <div className="flex gap-2">
                          <button className="p-2 bg-gray-100 rounded">
                            <Image src="/setting.png" alt="" width={20} height={20} />
                          </button>
                          <button className="p-2 bg-gray-100 rounded">
                            <Image src="/delete.png" alt="" width={20} height={20} />
                          </button>
                        </div>
                      ) : (
                        <button className="text-xs font-bold text-[#872f89]">
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