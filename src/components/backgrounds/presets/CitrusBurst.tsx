import type { BackgroundSettings } from '../backgroundPresets'
import './CitrusBurst.css'

interface CitrusBurstProps {
    settings: BackgroundSettings
}

const CitrusBurst = ({ settings }: CitrusBurstProps) => {
    const speed = Math.max(1, 101 - settings.speed) // Invert speed so 100 is fast (1s)

    return (
        <div
            className="citrus-burst-bg"
            style={{
                '--speed': `${speed}s`,
                '--opacity': settings.intensity / 100,
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
            } as React.CSSProperties}
        />
    )
}

export default CitrusBurst
