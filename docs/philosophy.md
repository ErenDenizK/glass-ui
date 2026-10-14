# Glass UI Design Philosophy

> The principles and thinking behind Glass UI.
>
> **Archived 14 October 2026.** These are the principles the project was built
> on, kept as written. Several were not upheld, and that gap is the useful part
> of the document rather than something to tidy away:
>
> - **#4 Performance** — "max 4 concurrent glass elements" was never enforced
>   anywhere. The blur cap it rests on also turns out to target the lesser
>   variable; see the amendment in [`decisions.md`](./decisions.md) §5.
> - **#5 Accessibility over aesthetics** — "WCAG AA contrast (4.5:1 minimum)"
>   is checked by nothing. `ColorToken.text` is defined for all six colours and
>   read by nothing, so `Button` hardcodes `text-white` for every variant. A
>   keyboard focus ring was invisible in shipped output for nine months.
> - **#6 Mobile first** — the responsive strategy was never built and has been
>   formally withdrawn.
> - **#7 Escape hatches** — this one *was* eventually honoured, but only after
>   the September 2026 rewrite onto cascade layers. Before that, inline styles
>   outranked every consumer class and silently broke the promise.
>
> See [`STATUS.md`](./STATUS.md) for the measured account.

---

## 🎯 Core Belief

**Glass effects should be purposeful, not decorative.**

We don't use glassmorphism because it looks cool (though it does). We use it because:
- **Depth:** Creates visual hierarchy without heavy shadows
- **Focus:** Blurs background, keeps attention on content
- **Context:** Shows what's behind without distraction
- **Modern:** Feels premium, lightweight, futuristic

---

## 💡 Design Principles

### 1. **User Control Over Magic**

❌ **Bad:** "AI decides best glass effect for you!"
✅ **Good:** "Choose preset or customize every parameter"

**Why:**
- Developers know their use case best
- Magic breaks when edge cases appear
- Explicitness = maintainability

**Implementation:**
```tsx
// Preset (easy)
<GlassContainer preset="button" />

// Custom (full control)
<GlassContainer 
  blur="md" 
  opacity={0.25} 
  borderGlow 
/>
```

---

### 2. **Glass is Optional, System is Core**

**The name is "glass-ui" but glass effects are OPTIONAL.**
```tsx
// Solid button (no glass)
<Button glass={false} color="primary">
  Click Me
</Button>
```

**Why:**
- Some contexts don't need glass
- User preference (accessibility)
- Performance constraints
- Flexibility > forcing aesthetic

The system provides:
- Color system
- Animations
- Layout primitives
- Typography

Glass is **one layer** on top, not the foundation.

---

### 3. **Progressive Enhancement**

**Start solid, add glass when beneficial.**
```
Level 0: Solid background (works everywhere)
Level 1: Semi-transparent background
Level 2: backdrop-filter blur (modern browsers)
Level 3: Border glow, gradients
Level 4: Interactive glow, animations
```

**Implementation:**
- Fallback to solid on old browsers
- Reduced effects on low-end devices
- Respect `prefers-reduced-motion`
- Graceful degradation

---

### 4. **Performance is Non-Negotiable**

**Beautiful but slow = not shipped.**

**Hard Rules:**
- Blur max 20px (exponential cost after)
- Max 4 concurrent glass elements
- 60fps minimum on mid-range devices
- Battery-conscious on mobile

**Philosophy:**
- Constraints breed creativity
- "Can we?" vs "Should we?"
- Measure first, optimize second
- Delete before adding complexity

---

### 5. **Accessibility Over Aesthetics**

**If we can't make it accessible, we don't ship it.**

**Non-Negotiables:**
- WCAG AA contrast (4.5:1 minimum)
- Keyboard navigation always works
- Screen readers get semantic HTML
- Text never on pure glass (always solid underneath)

**Example:**
```tsx
// ❌ BAD - text on glass
<GlassContainer>
  <p>Hard to read</p>
</GlassContainer>

// ✅ GOOD - text on solid, container is glass
<GlassContainer>
  <div className="bg-white/90 p-4">
    <p>Easy to read</p>
  </div>
</GlassContainer>
```

---

### 6. **Mobile First, Desktop Enhanced**

**Design for mobile, enhance for desktop.**

Mobile constraints:
- Weaker GPU → Lower blur
- Touch interaction → No hover glow
- Smaller screen → Fewer glass elements
- Battery life → Shorter animations

Desktop enhancements:
- Higher blur values
- Mouse-tracking glow
- More simultaneous effects
- Faster animations

**Implementation:**
```typescript
blur: { 
  mobile: '8px',    // Conservative
  desktop: '12px'   // Enhanced
}
```

---

### 7. **Convention Over Configuration (With Escape Hatches)**

**Smart defaults, easy overrides.**
```tsx
// Convention: preset does 90% of work
<GlassContainer preset="modal">
  Content
</GlassContainer>

// Escape hatch: full control when needed
<GlassContainer
  blur={{ mobile: '4px', desktop: '16px' }}
  opacity={{ mobile: 0.7, desktop: 0.5 }}
  borderGlow={{ 
    color: 'primary',
    opacity: 0.3
  }}
>
  Custom
</GlassContainer>
```

---

### 8. **Documentation is UI**

**If it's not documented, it doesn't exist.**

Every component needs:
1. **Quick example** - Copy-paste and go
2. **Props table** - What it accepts
3. **Common patterns** - Real use cases
4. **Accessibility notes** - How to use properly
5. **Performance tips** - When to avoid

---

### 9. **Community Over Perfection**

**Ship fast, iterate with users.**

**v1.0 Philosophy:**
- Solve 80% of use cases perfectly
- Leave 20% for v2 (informed by real usage)
- Community feedback > our assumptions
- Open issues > hidden complexity

**What We Won't Do:**
- Predict every edge case upfront
- Build features no one asked for
- Optimize prematurely
- Gatekeep contributions

---

### 10. **Steal Like An Artist**

**We're inspired by the best, not copying them.**

**Learning From:**
- **Apple (iOS/macOS):** Subtle glass, accessibility
- **Microsoft (Fluent):** Acrylic material, depth
- **Material Design 3:** Motion curves, color science
- **Tailwind CSS:** Token system, utility patterns

**Our Unique Value:**
- React-first (not framework-agnostic compromise)
- Performance obsession (hard limits)
- Context-aware presets (not just primitives)
- Open-source, no vendor lock-in

---

## 🚫 Anti-Patterns We Avoid

### **1. Glass Everywhere**
❌ Every element is glass
✅ Glass highlights key UI elements

### **2. Blur Wars**
❌ Competing with heavy blur
✅ Maximum 3-4 glass elements visible

### **3. Magic Numbers**
❌ `blur(17px)` - why 17?
✅ `blur('md')` - semantic token

### **4. Framework Lock-in**
❌ "Only works with X"
✅ "Best in React, portable core"

### **5. Ignoring Performance**
❌ "It's pretty, ship it"
✅ "60fps or rewrite it"

---

## 🎨 Visual Language

### **Material Metaphor**

**Glass UI is digital glass:**
- Frosted, not transparent
- Reflects light (glow effects)
- Has depth (layering)
- Feels tangible (animations)

### **Color Philosophy**

**Bold, joyful, accessible.**

- **Primary:** Electric blue (energy)
- **Success:** Vibrant green (growth)
- **Danger:** Bold red (urgency)
- **Warning:** Warm orange (caution)
- **Accent:** Playful purple (creativity)
- **Neutral:** Cool gray (calm)

HSL-based for semantic meaning and easy manipulation.

---

## 🧭 Decision Framework

**When in doubt, ask:**

1. **Is it accessible?** (If no → don't ship)
2. **Is it performant?** (If no → optimize or cut)
3. **Does it solve a real problem?** (If no → defer to v2)
4. **Can a beginner use it?** (If no → simplify)
5. **Would I use this in production?** (If no → why are we building it?)

---

## 🌟 Success Metrics

**We're successful when:**

1. Developers ship glass UI in **< 5 minutes**
2. Apps stay **60fps** with our components
3. No accessibility complaints
4. Users say **"it just works"**
5. Other libraries reference our approach

**Not measured by:**
- Lines of code (less is more)
- Feature count (focus over breadth)
- GitHub stars (nice-to-have)

---

## 📚 Influences & Inspirations

### **Design Systems:**
- Apple Human Interface Guidelines
- Material Design 3
- Microsoft Fluent Design

### **Component Libraries:**
- shadcn/ui (composition patterns)
- Radix UI (accessibility primitives)
- Chakra UI (DX focus)

### **Technical:**
- Tailwind CSS (token system)
- Framer Motion (animation API)
- TypeScript (type safety culture)

---

## 🔮 Future Vision

**v1.0:** Foundation
- Core glass system
- Essential components (Button, Card, Input)
- Mobile-optimized
- Well-documented

**v2.0:** Expansion
- More components (Modal, Dropdown, etc.)
- Advanced effects (iridescent, mesh gradients)
- Theme builder
- Performance monitoring tools

**v3.0+:** Ecosystem
- Vue/Svelte wrappers
- Figma plugin
- CLI tool
- Community themes

---

**Philosophy Owner:** Mert (Product Lead)

**Living Document:** Updated as we learn from users

**Last Updated:** December 13, 2025