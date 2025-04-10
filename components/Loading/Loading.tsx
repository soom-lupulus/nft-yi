import React from 'react'
import { GridLoader } from 'react-spinners'

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
