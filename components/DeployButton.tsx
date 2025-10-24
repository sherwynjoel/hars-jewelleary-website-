'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Rocket, CheckCircle, XCircle, Loader } from 'lucide-react'
import toast from 'react-hot-toast'

export default function DeployButton() {
  const [isDeploying, setIsDeploying] = useState(false)
  const [deployStatus, setDeployStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleDeploy = async () => {
    setIsDeploying(true)
    setDeployStatus('idle')

    try {
      const response = await fetch('/api/admin/auto-deploy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action: 'deploy' })
      })

      const data = await response.json()

      if (response.ok) {
        setDeployStatus('success')
        toast.success('Deployment triggered successfully!')
      } else {
        setDeployStatus('error')
        toast.error(data.error || 'Deployment failed')
      }
    } catch (error) {
      setDeployStatus('error')
      toast.error('Failed to trigger deployment')
    } finally {
      setIsDeploying(false)
    }
  }

  const getButtonContent = () => {
    if (isDeploying) {
      return (
        <>
          <Loader className="w-4 h-4 animate-spin" />
          <span>Deploying...</span>
        </>
      )
    }

    if (deployStatus === 'success') {
      return (
        <>
          <CheckCircle className="w-4 h-4" />
          <span>Deployed!</span>
        </>
      )
    }

    if (deployStatus === 'error') {
      return (
        <>
          <XCircle className="w-4 h-4" />
          <span>Deploy Failed</span>
        </>
      )
    }

    return (
      <>
        <Rocket className="w-4 h-4" />
        <span>Deploy to Production</span>
      </>
    )
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleDeploy}
      disabled={isDeploying}
      className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
        deployStatus === 'success'
          ? 'bg-green-500 text-white'
          : deployStatus === 'error'
          ? 'bg-red-500 text-white'
          : isDeploying
          ? 'bg-blue-500 text-white'
          : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {getButtonContent()}
    </motion.button>
  )
}
