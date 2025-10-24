import { NextRequest, NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

export async function POST(request: NextRequest) {
  try {
    // Verify webhook secret (optional but recommended)
    const secret = request.headers.get('x-webhook-secret')
    const expectedSecret = process.env.WEBHOOK_SECRET
    
    if (secret !== expectedSecret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('🚀 Webhook triggered - starting deployment...')

    // Run deployment script
    const { stdout, stderr } = await execAsync('bash deploy.sh')
    
    console.log('Deployment output:', stdout)
    if (stderr) console.error('Deployment errors:', stderr)

    return NextResponse.json({ 
      message: 'Deployment triggered successfully',
      output: stdout 
    })
  } catch (error) {
    console.error('Deployment failed:', error)
    return NextResponse.json({ 
      error: 'Deployment failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
