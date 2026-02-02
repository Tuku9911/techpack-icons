# techpack-icons

React SVG icon set with Light and Bold variants generated from the original SVG files.

## Install

```bash
npm install techpack-icons
# эсвэл
yarn add techpack-icons
```

## Usage

```tsx
import { UserLight, UserBold } from "techpack-icons";

export function Example() {
  return (
    <div>
      <UserLight className="w-6 h-6 text-blue-500" />
      <UserBold className="w-6 h-6 text-red-500" />
    </div>
  );
}
```

All icons:
- Use `fill="currentColor"` so you can control color with `className` (e.g. Tailwind `text-*`).
- Accept `className` and other `SVG` props.

