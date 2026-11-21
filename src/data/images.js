/**
 * CircuitBazzar Curated Image Registry
 * Real, high-resolution photography from Unsplash with optimized URL parameters.
 * To replace with local product photos, drop images into /public/images/ and update paths here.
 */

const optimize = (url, width = 800) => {
  if (!url) return '/public/images/fallback.jpg';
  if (url.startsWith('/')) return url;
  return `${url}?auto=format&fit=crop&w=${width}&q=80`;
};

export const IMAGES = {
  // Brand Logo
  logo: '/logo.png',
  fallback: '/images/fallback.jpg',

  // Hero Composition
  hero: {
    mainBoard: optimize('https://images.unsplash.com/photo-1553406830-ef2513450d76', 900), // Arduino / Dev board
    sensorModule: optimize('https://images.unsplash.com/photo-1518770660439-4636190af475', 600), // Circuit macro
    chipDetail: optimize('https://images.unsplash.com/photo-1597733336794-12d05021d510', 600), // Microcontroller IC
    displayOLED: optimize('https://images.unsplash.com/photo-1563770660941-20978e870e26', 600), // Sensor module
    workbenchBg: optimize('https://images.unsplash.com/photo-1581092160607-ee22621dd758', 1600), // Maker lab
  },

  // Categories
  categories: {
    devBoards: optimize('https://images.unsplash.com/photo-1553406830-ef2513450d76', 600),
    sensors: optimize('https://images.unsplash.com/photo-1563770660941-20978e870e26', 600),
    passives: optimize('https://images.unsplash.com/photo-1580982327559-c1202864eb05', 600),
    robotics: optimize('https://images.unsplash.com/photo-1562408590-e32931084e23', 600),
    power: optimize('https://images.unsplash.com/photo-1619725002198-6a689b72f41d', 600),
    soldering: optimize('https://images.unsplash.com/photo-1581092335397-9583fe92d232', 600),
    displays: optimize('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5', 600),
    prototyping: optimize('https://images.unsplash.com/photo-1629654297299-c8506221ca97', 600),
  },

  // Pinned "How It Works" Backgrounds
  howItWorks: [
    {
      step: 1,
      title: "Discover 10,000+ Components",
      image: optimize('https://images.unsplash.com/photo-1518770660439-4636190af475', 1200),
    },
    {
      step: 2,
      title: "Direct Verified Sourcing",
      image: optimize('https://images.unsplash.com/photo-1581092162384-8987c1d64718', 1200),
    },
    {
      step: 3,
      title: "Anti-Static 24h Express Dispatch",
      image: optimize('https://images.unsplash.com/photo-1581092795360-fd1ca04f0952', 1200),
    },
    {
      step: 4,
      title: "Plug, Code & Bring Ideas To Life",
      image: optimize('https://images.unsplash.com/photo-1581092160607-ee22621dd758', 1200),
    },
  ],

  // Project Kits
  kits: {
    iot: {
      image: optimize('https://images.unsplash.com/photo-1517077304055-6e89abbf09b0', 800),
      badge: "Best Seller",
    },
    robotics: {
      image: optimize('https://images.unsplash.com/photo-1562408590-e32931084e23', 800),
      badge: "Competition Ready",
    },
    arduinoStarter: {
      image: optimize('https://images.unsplash.com/photo-1553406830-ef2513450d76', 800),
      badge: "Beginner Friendly",
    },
    sensorPack: {
      image: optimize('https://images.unsplash.com/photo-1629654297299-c8506221ca97', 800),
      badge: "37 Sensors in 1",
    },
  },

  // B2B & Wholesale Section
  b2b: {
    bannerBg: optimize('https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc', 1400),
  },

  // Products Catalog (Unique images & 4-angle galleries)
  products: {
    arduinoUno: {
      main: optimize('https://images.unsplash.com/photo-1553406830-ef2513450d76', 700),
      gallery: [
        optimize('https://images.unsplash.com/photo-1553406830-ef2513450d76', 700),
        optimize('https://images.unsplash.com/photo-1518770660439-4636190af475', 700),
        optimize('https://images.unsplash.com/photo-1597733336794-12d05021d510', 700),
        optimize('https://images.unsplash.com/photo-1629654297299-c8506221ca97', 700),
      ],
      alt: "Original Arduino Uno R3 ATmega328P Board"
    },
    esp32Wroom: {
      main: optimize('https://images.unsplash.com/photo-1518770660439-4636190af475', 700),
      gallery: [
        optimize('https://images.unsplash.com/photo-1518770660439-4636190af475', 700),
        optimize('https://images.unsplash.com/photo-1553406830-ef2513450d76', 700),
        optimize('https://images.unsplash.com/photo-1597733336794-12d05021d510', 700),
        optimize('https://images.unsplash.com/photo-1580982327559-c1202864eb05', 700),
      ],
      alt: "ESP32 NodeMCU Wi-Fi & Bluetooth Development Board"
    },
    raspberryPi4: {
      main: optimize('https://images.unsplash.com/photo-1607604276583-eef5d076aa5f', 700),
      gallery: [
        optimize('https://images.unsplash.com/photo-1607604276583-eef5d076aa5f', 700),
        optimize('https://images.unsplash.com/photo-1518770660439-4636190af475', 700),
        optimize('https://images.unsplash.com/photo-1550751827-4bd374c3f58b', 700),
        optimize('https://images.unsplash.com/photo-1581092160607-ee22621dd758', 700),
      ],
      alt: "Raspberry Pi 4 Model B (4GB RAM) Single Board Computer"
    },
    ultrasonicSensor: {
      main: optimize('https://images.unsplash.com/photo-1563770660941-20978e870e26', 700),
      gallery: [
        optimize('https://images.unsplash.com/photo-1563770660941-20978e870e26', 700),
        optimize('https://images.unsplash.com/photo-1629654297299-c8506221ca97', 700),
        optimize('https://images.unsplash.com/photo-1518770660439-4636190af475', 700),
        optimize('https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc', 700),
      ],
      alt: "HC-SR04 Ultrasonic Distance Sensor Module"
    },
    relayModule: {
      main: optimize('https://images.unsplash.com/photo-1580982327559-c1202864eb05', 700),
      gallery: [
        optimize('https://images.unsplash.com/photo-1580982327559-c1202864eb05', 700),
        optimize('https://images.unsplash.com/photo-1518770660439-4636190af475', 700),
        optimize('https://images.unsplash.com/photo-1563770660941-20978e870e26', 700),
        optimize('https://images.unsplash.com/photo-1553406830-ef2513450d76', 700),
      ],
      alt: "5V 4-Channel Optocoupler Relay Module for Arduino"
    },
    solderingStation: {
      main: optimize('https://images.unsplash.com/photo-1581092335397-9583fe92d232', 700),
      gallery: [
        optimize('https://images.unsplash.com/photo-1581092335397-9583fe92d232', 700),
        optimize('https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7', 700),
        optimize('https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc', 700),
        optimize('https://images.unsplash.com/photo-1581092162384-8987c1d64718', 700),
      ],
      alt: "60W Digital Temperature Controlled Soldering Station"
    },
    multimeterDigital: {
      main: optimize('https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc', 700),
      gallery: [
        optimize('https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc', 700),
        optimize('https://images.unsplash.com/photo-1581092335397-9583fe92d232', 700),
        optimize('https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7', 700),
        optimize('https://images.unsplash.com/photo-1518770660439-4636190af475', 700),
      ],
      alt: "True-RMS Auto-Ranging Digital Multimeter"
    },
    breadboardBundle: {
      main: optimize('https://images.unsplash.com/photo-1629654297299-c8506221ca97', 700),
      gallery: [
        optimize('https://images.unsplash.com/photo-1629654297299-c8506221ca97', 700),
        optimize('https://images.unsplash.com/photo-1517077304055-6e89abbf09b0', 700),
        optimize('https://images.unsplash.com/photo-1553406830-ef2513450d76', 700),
        optimize('https://images.unsplash.com/photo-1580982327559-c1202864eb05', 700),
      ],
      alt: "MB-102 830-Point Solderless Breadboard with 65pcs Jumper Wires"
    },
    resistorKit: {
      main: optimize('https://images.unsplash.com/photo-1588508065123-287b28e013da', 700),
      gallery: [
        optimize('https://images.unsplash.com/photo-1588508065123-287b28e013da', 700),
        optimize('https://images.unsplash.com/photo-1580982327559-c1202864eb05', 700),
        optimize('https://images.unsplash.com/photo-1518770660439-4636190af475', 700),
        optimize('https://images.unsplash.com/photo-1629654297299-c8506221ca97', 700),
      ],
      alt: "600pcs 1/4W Metal Film Resistors Assortment Kit (30 Values)"
    },
    servoMotorSG90: {
      main: optimize('https://images.unsplash.com/photo-1562408590-e32931084e23', 700),
      gallery: [
        optimize('https://images.unsplash.com/photo-1562408590-e32931084e23', 700),
        optimize('https://images.unsplash.com/photo-1563770660941-20978e870e26', 700),
        optimize('https://images.unsplash.com/photo-1553406830-ef2513450d76', 700),
        optimize('https://images.unsplash.com/photo-1629654297299-c8506221ca97', 700),
      ],
      alt: "SG90 9g Micro Servo Motor 180 Degree Rotation"
    },
    lipoBattery: {
      main: optimize('https://images.unsplash.com/photo-1619725002198-6a689b72f41d', 700),
      gallery: [
        optimize('https://images.unsplash.com/photo-1619725002198-6a689b72f41d', 700),
        optimize('https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc', 700),
        optimize('https://images.unsplash.com/photo-1580982327559-c1202864eb05', 700),
        optimize('https://images.unsplash.com/photo-1562408590-e32931084e23', 700),
      ],
      alt: "3.7V 1200mAh Rechargeable Li-Po Battery with JST-PH2.0 Connector"
    },
    oledDisplayI2C: {
      main: optimize('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5', 700),
      gallery: [
        optimize('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5', 700),
        optimize('https://images.unsplash.com/photo-1563770660941-20978e870e26', 700),
        optimize('https://images.unsplash.com/photo-1518770660439-4636190af475', 700),
        optimize('https://images.unsplash.com/photo-1597733336794-12d05021d510', 700),
      ],
      alt: "0.96 inch I2C OLED Display Module 128x64 White on Blue"
    }
  },

  // Testimonials Maker Avatars
  testimonials: [
    {
      avatar: optimize('https://images.unsplash.com/photo-1534528741775-53994a69daeb', 200),
    },
    {
      avatar: optimize('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d', 200),
    },
    {
      avatar: optimize('https://images.unsplash.com/photo-1500648767791-00dcc994a43e', 200),
    },
    {
      avatar: optimize('https://images.unsplash.com/photo-1494790108377-be9c29b29330', 200),
    }
  ]
};
