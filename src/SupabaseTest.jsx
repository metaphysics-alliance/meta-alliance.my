import { useState } from 'react'
import { supabase } from './lib/supabase'

export default function SupabaseTest() {
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    setResult('Testing connection...')
    
    try {
      // Test 1: Check if supabase client is initialized
      if (!supabase) {
        setResult('❌ Supabase client not initialized!')
        return
      }
      
      setResult('✅ Supabase client initialized\nTesting insert...')
      
      // Test 2: Try inserting a record
      const testCaseId = `TEST-${Date.now()}`
      const { data, error } = await supabase
        .from('contact_enquiries')
        .insert([
          {
            case_id: testCaseId,
            full_name: 'Test User',
            email: 'test@example.com',
            topic: 'Sales',
            message: 'Test message',
            consent_given: true,
          }
        ])
        .select()

      if (error) {
        setResult(`❌ INSERT FAILED\n\nError: ${error.message}\nCode: ${error.code}\nDetails: ${JSON.stringify(error.details, null, 2)}`)
      } else {
        setResult(`✅ INSERT SUCCESSFUL!\n\nData:\n${JSON.stringify(data, null, 2)}`)
        
        // Clean up
        await supabase.from('contact_enquiries').delete().eq('case_id', testCaseId)
      }
    } catch (err) {
      setResult(`❌ ERROR: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Supabase Connection Test</h1>
      <button 
        onClick={testConnection} 
        disabled={loading}
        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
      >
        Test Contact Form Insert
      </button>
      <pre style={{ 
        marginTop: '20px', 
        padding: '20px', 
        background: '#f5f5f5', 
        borderRadius: '5px',
        whiteSpace: 'pre-wrap'
      }}>
        {result || 'Click button to test...'}
      </pre>
    </div>
  )
}
