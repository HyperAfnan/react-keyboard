import { Keyboard } from './components/keyboard/Keyboard';
import { SettingsPanel } from './components/settings/SettingsPanel';
import { useKeyboardStore } from './store/keyboardStore';

function App() {
  const toggleSettings = useKeyboardStore((s) => s.toggleSettings);
  const settingsOpen = useKeyboardStore((s) => s.settingsOpen);
  const soundEnabled = useKeyboardStore((s) => s.soundEnabled);
  const toggleSound = useKeyboardStore((s) => s.toggleSound);
  const accent = useKeyboardStore((s) => s.accent);

  return (
    <div
      className={`accent-${accent}`}
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at 50% 30%, #1a1a22 0%, #0a0a0c 70%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 600,
          height: 200,
          background: 'var(--accent)',
          opacity: 0.04,
          borderRadius: '50%',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: 900,
          marginBottom: 32,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 22, lineHeight: 1 }}>⌨</span>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>
              MechBoard
            </div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 400 }}>
              On-screen mechanical keyboard
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={toggleSound}
            aria-label={soundEnabled ? 'Mute sound' : 'Enable sound'}
            title={soundEnabled ? 'Mute sound' : 'Enable sound'}
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 10,
              color: soundEnabled ? '#fff' : 'rgba(255,255,255,0.3)',
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: 16,
              transition: 'all 150ms ease',
            }}
          >
            {soundEnabled ? '🔊' : '🔇'}
          </button>

          <button
            onClick={toggleSettings}
            aria-label="Open settings"
            aria-expanded={settingsOpen}
            style={{
              background: settingsOpen ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 10,
              color: settingsOpen ? '#fff' : 'rgba(255,255,255,0.6)',
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: 16,
              transition: 'all 150ms ease',
            }}
          >
            ⚙
          </button>
        </div>
      </div>

      <div
        style={{
          width: '100%',
          maxWidth: 900,
          overflowX: 'auto',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Keyboard />
      </div>

      <div
        style={{
          marginTop: 24,
          fontSize: 12,
          color: 'rgba(255,255,255,0.2)',
          textAlign: 'center',
          letterSpacing: '0.03em',
        }}
      >
        Type on your physical keyboard — or click the keys above
      </div>

      <SettingsPanel />
    </div>
  );
}

export default App;
