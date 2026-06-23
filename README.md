# react-keyboards

 A simple yet powerful mechanical keyboard component for react with multiple key sounds 

![React Keyboards Preview](./assets/preview-keychron-c3.png)

## Installation

Install the package via npm, yarn, or pnpm:

```bash
npm install react-keyboards
# or
yarn add react-keyboards
# or
pnpm add react-keyboards
```

## Usage

Simply import the `Keyboard` component. Styling and styles are injected automatically!

```tsx
import { Keyboard } from 'react-keyboards';

function App() {
  return (
    <div style={{ width: '100%', maxWidth: '900px' }}>
      <Keyboard 
        variant="keychron-c3" 
        accent="purple" 
        soundPack="topre" 
        soundEnabled={true} 
      />
    </div>
  );
}

export default App;
```

## Props Reference

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"keychron-c3"` | `"keychron-c3"` | The structural layout variant of the keyboard. |
| `accent` | `"teal" \| "pink" \| "orange" \| "purple" \| "blue" \| "red"` | `"red"` | The highlight color accent applied to special keys (Esc, Enter, Spacebar, active pressed keys). |
| `soundPack` | `"cherry-blue" \| "cherry-brown" \| "cherry-red" \| "cherry-black" \| "topre" \| "creams" \| "none"` | `"cherry-blue"` | The mechanical switch sound profile to trigger on keypress. Use `"none"` to mute switch sound. |
| `soundEnabled` | `boolean` | `true` | Globally toggles sound output. |
| `className` | `string` | `undefined` | Optional custom CSS class name added to the wrapper element. |

## Switch Sound Pack Profiles

- `cherry-blue`: Cherry MX Blue - Clicky and tactile.
- `cherry-brown`: Cherry MX Brown - Tactile, quiet, and subtle.
- `cherry-red`: Cherry MX Red - Linear, light, and smooth.
- `cherry-black`: Cherry MX Black - Linear, heavier spring profile.
- `topre`: Topre - Thocky, tactile, premium feel.
- `creams`: NovelKeys Creams - Linear and buttery-smooth.
- `none`: Silent - No sound output.

## Future Plans

* **Apple Magic Keyboard**: A chiclet-style ultra-thin layout with membrane-like acoustics.

## License

MIT License. See [LICENSE](./LICENSE) for details.
