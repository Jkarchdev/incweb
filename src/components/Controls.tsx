import type { AppState, Teammate } from '../App'
import './Controls.css'

interface ControlsProps {
    state: AppState
    updateState: (updates: Partial<AppState>) => void
}

const Controls = ({ state, updateState }: ControlsProps) => {
    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (event) => {
                updateState({ logoUrl: event.target?.result as string })
            }
            reader.readAsDataURL(file)
        }
    }

    const handleTeammateImageUpload = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (event) => {
                const newTeammates = state.teammates.map(t =>
                    t.id === id ? { ...t, imageUrl: event.target?.result as string } : t
                )
                updateState({ teammates: newTeammates })
            }
            reader.readAsDataURL(file)
        }
    }

    const updateTeammate = (id: number, field: keyof Teammate, value: string) => {
        const newTeammates = state.teammates.map(t =>
            t.id === id ? { ...t, [field]: value } : t
        )
        updateState({ teammates: newTeammates })
    }

    const handleTeammateCountChange = (count: number) => {
        const currentTeammates = state.teammates
        if (count > currentTeammates.length) {
            const newTeammates = [
                ...currentTeammates,
                ...Array.from({ length: count - currentTeammates.length }, (_, i) => ({
                    id: currentTeammates.length + i,
                    name: `Team Member ${currentTeammates.length + i + 1}`,
                    role: `Role ${currentTeammates.length + i + 1}`,
                    imageUrl: ''
                }))
            ]
            updateState({ teammates: newTeammates })
        } else {
            updateState({ teammates: currentTeammates.slice(0, count) })
        }
    }

    const handleCustomColorChange = (value: string) => {
        // Validate hex color
        if (/^#[0-9A-Fa-f]{6}$/.test(value) || value === '') {
            updateState({ customColor: value })
        }
    }

    return (
        <div className="controls-content">
            <section className="control-section">
                <h3>A) Logo/Wordmark</h3>
                <div className="file-upload">
                    <label htmlFor="logo-upload" className="upload-button">
                        {state.logoUrl ? '✓ Logo Uploaded' : '📁 Upload Logo'}
                    </label>
                    <input
                        id="logo-upload"
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={handleLogoUpload}
                    />
                </div>
            </section>

            <section className="control-section">
                <h3>B) Main Text</h3>
                <textarea
                    value={state.mainText}
                    onChange={(e) => updateState({ mainText: e.target.value })}
                    rows={5}
                    placeholder="Enter your value proposition..."
                />
            </section>

            <section className="control-section">
                <h3>C) Team Cards</h3>
                <div className="teammate-count">
                    <label>Teammate Count:</label>
                    <select
                        value={state.teammates.length}
                        onChange={(e) => handleTeammateCountChange(Number(e.target.value))}
                    >
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                    </select>
                </div>

                <div className="teammates-list">
                    {state.teammates.map((teammate) => (
                        <div key={teammate.id} className="teammate-control">
                            <h4>Teammate {teammate.id + 1}</h4>
                            <div className="file-upload">
                                <label htmlFor={`teammate-${teammate.id}`} className="upload-button small">
                                    {teammate.imageUrl ? '✓ Image' : '📷 Upload'}
                                </label>
                                <input
                                    id={`teammate-${teammate.id}`}
                                    type="file"
                                    accept="image/png,image/jpeg,image/webp"
                                    onChange={(e) => handleTeammateImageUpload(teammate.id, e)}
                                />
                            </div>
                            <input
                                type="text"
                                placeholder="Name"
                                value={teammate.name}
                                onChange={(e) => updateTeammate(teammate.id, 'name', e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Role"
                                value={teammate.role}
                                onChange={(e) => updateTeammate(teammate.id, 'role', e.target.value)}
                            />
                        </div>
                    ))}
                </div>
            </section>

            <section className="control-section">
                <h3>D) Links</h3>
                <label>Instagram URL:</label>
                <input
                    type="url"
                    value={state.instagramUrl}
                    onChange={(e) => updateState({ instagramUrl: e.target.value })}
                    placeholder="https://instagram.com/yourpage"
                />
                <label>Contact Email:</label>
                <input
                    type="email"
                    value={state.contactEmail}
                    onChange={(e) => updateState({ contactEmail: e.target.value })}
                    placeholder="hello@incubator.com"
                />
            </section>

            <section className="control-section">
                <h3>E) Style Options</h3>
                <label>Background Style:</label>
                <select
                    value={state.backgroundStyle}
                    onChange={(e) => updateState({ backgroundStyle: e.target.value })}
                >
                    <option value="solid">Solid</option>
                    <option value="gradient">Gradient</option>
                    <option value="dots">Dots</option>
                    <option value="grid">Grid</option>
                    <option value="waves">Waves</option>
                    <option value="noise">Noise</option>
                </select>

                <label>Palette:</label>
                <select
                    value={state.palette}
                    onChange={(e) => updateState({ palette: e.target.value })}
                >
                    <option value="ocean">Ocean</option>
                    <option value="sunset">Sunset</option>
                    <option value="forest">Forest</option>
                    <option value="grape">Grape</option>
                    <option value="slate">Slate</option>
                    <option value="sand">Sand</option>
                </select>

                <label>Custom Primary Color (hex):</label>
                <div className="color-input-group">
                    <input
                        type="text"
                        value={state.customColor}
                        onChange={(e) => handleCustomColorChange(e.target.value)}
                        placeholder="#3b82f6"
                        maxLength={7}
                    />
                    {state.customColor && (
                        <div
                            className="color-preview"
                            style={{ backgroundColor: state.customColor }}
                        />
                    )}
                </div>
            </section>
        </div>
    )
}

export default Controls
