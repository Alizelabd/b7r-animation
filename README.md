## Animate On Scroll

A lightweight, flexible, and powerful React animation library for creating performant scroll-based and text animations using GSAP and ScrollTrigger.

*Build beautiful, professional entry animations with ease.*

---

### 🚀 Features

* **Variety of Animation Variants**: Fade, slide (from top/bottom/left/right), pop, scale, rotate, flip, and zoom effects.
* **Text Animations**: Split text into chars, words, or lines with staggered animations.
* **Staggered Animations**: Control animation timing via `stagger` prop for fluid motion.
* **Context-Based Architecture**: Provider pattern for flexible animation registration.
* **Customizable Duration & Triggers**: Fine-tune animation timing, scroll positions, and easing.
* **Scrub Support**: Create scroll-linked animations that follow scroll position.
* **Debug Mode**: Visual markers to help fine-tune scroll trigger positions.
* **Custom Animations**: Create your own animation presets easily.
* **Zero Extra Dependencies**: Only requires GSAP and @gsap/react.

---

### 📦 Installation

This component isn't published to npm. To include it in your project:

1. **Copy** the animation components into your codebase.
2. **Install peer dependencies**:

```bash
npm install gsap @gsap/react
# or using Yarn
yarn add gsap @gsap/react
```

*Requires React 18+ and GSAP 3+.*

---

### 🔧 Usage

#### Basic Example

Wrap your content with `<AnimateOnScroll>` and use `<AnimationItem>` for individual elements:

```jsx
import { AnimateOnScroll } from './components/animation/AnimateOnScroll'
import { AnimationItem } from './components/animation/AnimationItem'

function Features() {
  return (
    <AnimateOnScroll>
      <AnimationItem variant="fromTop">
        <h2>Fast Performance</h2>
      </AnimationItem>
      <AnimationItem variant="pop" stagger={0.2}>
        <p>Lightweight and optimized.</p>
      </AnimationItem>
      <AnimationItem variant="fromBottom" duration={1}>
        <button>Learn More</button>
      </AnimationItem>
    </AnimateOnScroll>
  )
}
```

#### Text Animation Example

Use `<AnimateText>` to split and animate text:

```jsx
import { AnimateOnScroll } from './components/animation/AnimateOnScroll'
import { AnimateText } from './components/animation/AnimateText'

function Hero() {
  return (
    <AnimateOnScroll>
      <AnimateText
        type="chars"
        variant="fromBottom"
        stagger={0.02}
        as="h1"
      >
        Welcome to Our Site
      </AnimateText>

      <AnimateText
        type="words"
        variant="fade"
        stagger={0.1}
      >
        Building amazing experiences
      </AnimateText>
    </AnimateOnScroll>
  )
}
```

#### Custom Animation Example

Create custom animations using the `custom` prop:

```jsx
<AnimationItem
  custom={{
    from: { opacity: 0, scale: 0.5, rotate: -180 },
    to: { opacity: 1, scale: 1, rotate: 0 }
  }}
  duration={1.5}
>
  <div>Custom Animation</div>
</AnimationItem>
```

---

### 📋 API Reference

#### `<AnimateOnScroll>`

The main provider component that handles scroll-based animation registration.

| Prop        | Type                    | Default            | Description                                                          |
| ----------- | ----------------------- | ------------------ | -------------------------------------------------------------------- |
| `children`  | `ReactNode`             | **required**       | Elements to be animated on scroll.                                   |
| `as`        | `React.ElementType`     | `'div'`            | HTML element or component type to render.                            |
| `className` | `string`                | `""`               | Custom container CSS classes.                                        |
| `config`    | `Partial<AnimationConfig>` | See below       | Configuration object for default animation settings.                 |
| `disabled`  | `boolean`               | `false`            | Disable all animations within this provider.                         |
| `debug`     | `boolean`               | `false`            | Show ScrollTrigger markers for debugging.                            |
| `once`      | `boolean`               | `true`             | Animate only once (true) or on every scroll (false).                 |
| `scrub`     | `boolean \| number`     | `false`            | Link animation progress to scroll position. Number sets smoothness.  |

**Default Config Object:**
```typescript
{
  duration: 0.8,      // Animation duration in seconds
  start: 'top 85%',   // When animation starts
  end: 'bottom 60%',  // When animation ends (for scrub)
  ease: 'power3.out'  // Easing function
}
```

#### `<AnimationItem>`

Individual animated element within an `AnimateOnScroll` provider.

| Prop          | Type                    | Default      | Description                                   |
| ------------- | ----------------------- | ------------ | --------------------------------------------- |
| `children`    | `ReactNode`             | **required** | Content to animate.                           |
| `as`          | `React.ElementType`     | `'div'`      | HTML element or component type to render.     |
| `className`   | `string`                | `""`         | Additional CSS classes.                       |
| `variant`     | `AnimationVariant`      | `'fade'`     | Animation preset (see variants below).        |
| `duration`    | `number`                | `0.8`        | Animation duration in seconds.                |
| `ease`        | `string`                | `'power3.out'` | GSAP easing function.                       |
| `stagger`     | `number`                | `0`          | Delay between animating child elements.       |
| `splitTarget` | `string`                | -            | CSS selector for elements to animate separately. |
| `custom`      | `CustomAnimation`       | -            | Custom animation object (overrides variant).  |

#### `<AnimateText>`

Specialized component for animating text with splitting.

| Prop        | Type                | Default        | Description                                      |
| ----------- | ------------------- | -------------- | ------------------------------------------------ |
| `children`  | `string`            | **required**   | Text content to animate.                         |
| `as`        | `React.ElementType` | `'div'`        | HTML element to render.                          |
| `className` | `string`            | `""`           | Additional CSS classes.                          |
| `type`      | `'chars' \| 'words' \| 'lines'` | `'chars'` | How to split the text.              |
| `variant`   | `AnimationVariant`  | `'fromBottom'` | Animation preset.                                |
| `stagger`   | `number`            | Auto           | Delay between each split element (0.02 for chars, 0.08 for words). |
| `duration`  | `number`            | `0.8`          | Animation duration in seconds.                   |
| `ease`      | `string`            | `'power3.out'` | GSAP easing function.                            |

---

### 🎨 Animation Variants

Available preset animations:

| Variant        | Effect                                    |
| -------------- | ----------------------------------------- |
| `fade`         | Fade in from transparent to opaque        |
| `fromTop`      | Slide in from top with fade               |
| `fromBottom`   | Slide in from bottom with fade            |
| `fromLeft`     | Slide in from left with fade              |
| `fromRight`    | Slide in from right with fade             |
| `pop`          | Scale up from 0.8 with fade               |
| `scaleUp`      | Scale up from 0.5 with fade               |
| `scaleDown`    | Scale down from 1.5 with fade             |
| `rotateIn`     | Rotate from -90° with fade                |
| `flipX`        | Flip around Y axis with fade              |
| `flipY`        | Flip around X axis with fade              |
| `zoomOut`      | Zoom out from 1.1 scale with fade         |

---

### 🛠️ Adding Custom Animation Presets

You can easily add new animation presets by editing `animationPresets.ts`:

```typescript
export const presets: Record<string, CustomAnimation> = {
  // ... existing presets

  myCustom: {
    from: { opacity: 0, scale: 0, rotate: 360 },
    to: { opacity: 1, scale: 1, rotate: 0 }
  },

  slideAndSpin: {
    from: { x: -100, rotate: -180, opacity: 0 },
    to: { x: 0, rotate: 0, opacity: 1 }
  }
}
```

Then use them:

```jsx
<AnimationItem variant="myCustom">
  <div>Custom preset!</div>
</AnimationItem>
```

---

### 💡 Advanced Examples

#### Scrub Animation (follows scroll)

```jsx
<AnimateOnScroll scrub={1} once={false}>
  <AnimationItem variant="fromLeft">
    <div>Follows your scroll</div>
  </AnimationItem>
</AnimateOnScroll>
```

#### Complex Staggered Grid

```jsx
<AnimateOnScroll config={{ start: 'top 70%' }}>
  <div className="grid grid-cols-3 gap-4">
    {items.map((item, i) => (
      <AnimationItem
        key={i}
        variant="pop"
        stagger={i * 0.1}
        duration={0.6}
      >
        <Card>{item}</Card>
      </AnimationItem>
    ))}
  </div>
</AnimateOnScroll>
```

#### Data Attributes for Inline Configuration

You can also use data attributes directly on HTML elements:

```jsx
<AnimationItem as="div" data-variant="fromTop" data-duration="1.5" data-ease="elastic.out">
  <h1>Bouncy Header</h1>
</AnimationItem>
```

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
