## Animate On Scroll

A lightweight, customizable React component for creating performant scroll-based animations using GSAP and ScrollTrigger.

*Read versatile, easy-to-use entry animations for your React apps.*

---

### 🚀 Features

* **Variety of Animation Variants**: Fade, slide (from top/bottom/left/right), pop, rotate, skew, flip, bounce, and zoom effects.
* **Staggered Animations**: Control enter timing via `stagger` prop for fluid motion.
* **Customizable Duration & Start Trigger**: Fine-tune animation timing and scroll positions.
* **Dependency Watch**: Re-initialize on prop/state changes seamlessly.
* **Zero Dependencies (besides GSAP and @gsap/react)**: Keep your bundle size small.

---

### 📦 Installation

This component isn’t published to npm. To include it in your project:

1. **Copy** the `src/components/animate-on-scroll` directory into your codebase.
2. **Install peer dependencies**:

```bash
npm install gsap @gsap/react
# or using Yarn
yarn add gsap @gsap/react
```

*Requires React 18+ and GSAP 3.*

---

### 🔧 Usage

1. **Wrap** your list or container elements with `<AnimateOnScroll>`.
2. **Annotate** each child with `<AnimationItem>` specifying `sort` (order) and optional `variant`.

```jsx
import { AnimateOnScroll, AnimationItem } from '@components/animate-on-scroll'

function Features() {
  return (
    <AnimateOnScroll duration={0.5} stagger={0.2} start="top 80%">
      <AnimationItem sort={1} variant="fromTop">
        <h2>Fast Performance</h2>
      </AnimationItem>
      <AnimationItem sort={2} variant="pop">
        <p>Lightweight and optimized.</p>
      </AnimationItem>
      <AnimationItem sort={3} variant="bounce">
        <button>Learn More</button>
      </AnimationItem>
    </AnimateOnScroll>
  )
}
```

---

### 📋 API Reference

#### `<AnimateOnScroll>`

| Prop        | Type         | Default      | Description                                                          |
| ----------- | ------------ | ------------ | -------------------------------------------------------------------- |
| `children`  | `ReactNode`  | **required** | Items wrapped for scroll animation.                                  |
| `className` | `string`     | `""`         | Custom container CSS classes.                                        |
| `duration`  | `number`     | `0.4`        | Animation duration in seconds.                                       |
| `stagger`   | `number`     | `0.2`        | Delay (in seconds) between each item's animation start.              |
| `start`     | `string`     | `'top 90%'`  | ScrollTrigger start position (e.g., `'top 90%'`, `'center bottom'`). |
| `watch`     | `Array<any>` | `[]`         | Dependencies to re-trigger animations when changed.                  |

#### `<AnimationItem>`

| Prop        | Type        | Default      | Description                           |
| ----------- | ----------- | ------------ | ------------------------------------- |
| `sort`      | `number`    | **required** | Defines animation order.              |
| `variant`   | `Variant`   | `"fade"`     | Animation style (see variants below). |
| `className` | `string`    | `""`         | Additional CSS classes on the item.   |
| `children`  | `ReactNode` | **required** | Content to animate.                   |

**Variants**: `fade`, `fromTop`, `fromBottom`, `fromLeft`, `fromRight`, `pop`, `rotateIn`, `skewIn`, `flip`, `bounce`, `zoomOut`.

---

### 🔗 Documentation

Full docs, demos, and API examples are available at the component website:

> [https://b7r-animation-docs.vercel.app/](https://b7r-animation-docs.vercel.app/)

---

### 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to:

1. Fork the repo.
2. Create a feature branch (`git checkout -b feature/new-animation`).
3. Commit your changes (`git commit -m 'Add new animation variant'`).
4. Push to the branch (`git push origin feature/new-animation`).
5. Open a pull request.

---

### 📜 License

MIT © \[Alizelabd]
