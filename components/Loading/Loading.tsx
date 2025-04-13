'use client'
import React from 'react'
import dynamic from 'next/dynamic'

const GridLoader = dynamic(
    () => import('react-spinners').then((mod) => mod.GridLoader),
    { 
      ssr: false,
      loading: () => <div style={{ minHeight: '20rem' }} />
    }
  )

const Loading = () => {
    return (
        <div style={{ display: 'flex', minHeight: '20rem' }}>
            <GridLoader
                cssOverride={{ margin: 'auto' }}
                color={'var(--icons-color)'}
                size={20}
                aria-label='Loading Spinner'
                data-testid='loader'
            />
        </div>
    )
}

export default Loading
