# CircuitBazzar Prototype - Electronics E-Commerce

A premium, fully animated prototype e-commerce website for **CircuitBazzar** (`circuitbazzar.com`), selling genuine electronics components, development boards, sensors, ICs, robotics kits, and maker gear.

## Brand Identity & Strict Palette
- **Main Dark Background:** Black `#0B0B0A`
- **Primary Accent:** Olive Green `#6B7A2A`, Dark Olive `#4A5520`, Light Olive `#A3B04B`
- **Call-to-Action & Price Highlights:** Yellow `#F5C400`
- **Light Sections & Cards:** Beige `#EDE3CF`, Warm Off-White `#F7F2E7`
- **Text on Dark:** White `#FFFFFF`
- **Logo:** Slot at `/public/logo.png` (integrated in Welcome Screen, Sticky Header, and Footer)

## Typography
- **Headings:** Sora & Space Grotesk
- **Body:** Inter & DM Sans
- **Technical Badges & Specs:** JetBrains Mono

---

## Image Sourcing & How to Swap Images

All images are configured in a single central registry:
📁 `src/data/images.js`

### Current Photo Sources
All product shots, category banners, kits, and workbench backgrounds are real, high-resolution photographs from Unsplash with optimized queries (`?auto=format&fit=crop&w=...&q=80`):
1. **Arduino & Dev Boards:** Unsplash `photo-1553406830-ef2513450d76`
2. **ESP32 & Microcontroller ICs:** Unsplash `photo-1518770660439-4636190af475` & `photo-1597733336794-12d05021d510`
3. **Raspberry Pi 4 Model B:** Unsplash `photo-1607604276583-eef5d076aa5f`
4. **Ultrasonic & Sensor Modules:** Unsplash `photo-1563770660941-20978e870e26`
5. **Relay Modules & Capacitors:** Unsplash `photo-1580982327559-c1202864eb05`
6. **Soldering Station:** Unsplash `photo-1581092335397-9583fe92d232`
7. **Digital Multimeter:** Unsplash `photo-1581092580497-e0d23cbdf1dc`
8. **Breadboards & Jumper Wires:** Unsplash `photo-1629654297299-c8506221ca97`
9. **Resistors Kit:** Unsplash `photo-1588508065123-287b28e013da`
10. **Robotics Motors & Servos:** Unsplash `photo-1562408590-e32931084e23`
11. **LiPo Batteries:** Unsplash `photo-1619725002198-6a689b72f41d`
12. **OLED Displays:** Unsplash `photo-1526374965328-7f61d4dc18c5`
13. **Maker Workbench & Labs:** Unsplash `photo-1581092160607-ee22621dd758`, `photo-1581092795360-fd1ca04f0952`

### How to Replace with Your Own Local Product Photos
1. Place your `.jpg` or `.png` images into `public/images/` (e.g. `public/images/arduino-uno.jpg`).
2. Open `src/data/images.js`.
3. Change the path to `/images/your-file-name.jpg`:
   ```javascript
   arduinoUno: {
     main: '/images/arduino-uno.jpg',
     gallery: [
       '/images/arduino-uno-front.jpg',
       '/images/arduino-uno-top.jpg',
       '/images/arduino-uno-pinout.jpg',
       '/images/arduino-uno-box.jpg'
     ],
     alt: "Original Arduino Uno R3"
   }
   ```
4. The image component automatically handles lazy loading, skeleton shimmers, aspect ratio constraints, and fallback to `/public/images/fallback.jpg` if any link breaks.

---

## Key Features & User Experience
1. **Welcome Screen:** Animated circuit trace SVG in olive & yellow connecting to chip, countdown 0-100%, curtain split reveal (saved in `sessionStorage` with instant Skip button).
2. **Sticky Header:** Category dropdown, typing placeholder search, cart count badge, desktop mega menu, full-screen mobile slide menu.
3. **Desktop Custom Cursor:** Interactive yellow dot expanding when hovering interactive elements.
4. **Hero Section:** Word-by-word reveal, live count-up stats, interactive mouse-parallax electronics composition.
5. **Marquee Strip:** Infinite animated ticker on olive banner.
6. **Shop by Category:** Grid on desktop, smooth horizontal scroll-snap on mobile.
7. **Pinned "How It Works" Scroll:** 4 interactive steps with active image switches.
8. **Featured Products:** Dual-image hover crossfade, interactive quantity stepper, wishlist heart pop, mono SKU tags.
9. **Deals of the Day:** Live countdown timer and stock-left progress bar.
10. **Student & Project Kits:** Rich multi-item cards with feature checklists.
11. **Bulk / B2B Quote Section:** Custom RFQ form with instant quotation dialog.
12. **Full Product Listing View:** Filter by Category, Price, Brand, Stock status, plus sorting.
13. **Product Detail View:** Multi-image gallery with zoom lens, full datasheet specs table, "Frequently Bought Together" bundle selector.
14. **Cart Drawer:** Slide-in drawer with live free shipping threshold progress bar and interactive items stepper.
15. **Mobile First Responsive:** Sticky bottom mobile nav (Home, Categories, Search, Cart, Account), horizontal card rows with hidden scrollbars and scroll snap.

## Running the Application
```bash
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.
