'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, Clock, RefreshCw } from 'lucide-react'

interface DeploymentStatusProps {
  status: 'idle' | 'deploying' | 'success' | 'error'
  lastDeployed?: string
}

export default function DeploymentStatus({ status, lastDeployed }: DeploymentStatusProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (status !== 'idle') {
      setIsVisible(true)
      const timer = setTimeout(() => setIsVisible(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [status])

  const getStatusConfig = () => {
    switch (status) {
      case 'deploying':
        return {
          icon: RefreshCw,
          text: 'Deploying...',
          color: 'text-blue-500',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200'
        }
      case 'success':
        return {
          icon: CheckCircle,
          text: 'Deployed Successfully',
          color: 'text-green-500',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200'
        }
      case 'error':
        return {
          icon: XCircle,
          text: 'Deployment Failed',
          color: 'text-red-500',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200'
        }
      default:
        return null
    }
  }

  const config = getStatusConfig()
  if (!config || !isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`fixed top-4 right-4 z-50 p-4 rounded-lg border ${config.bgColor} ${config.borderColor} shadow-lg`}
    >
      <div className="flex items-center space-x-3">
        <config.icon className={`w-5 h-5 ${config.color} ${status === 'deploying' ? 'animate-spin' : ''}`} />
        <div>
          <p className={`font-medium ${config.color}`}>{config.text}</p>
          {lastDeployed && (
            <p className="text-sm text-gray-600">
              Last deployed: {new Date(lastDeployed).toLocaleString()}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  )
}
