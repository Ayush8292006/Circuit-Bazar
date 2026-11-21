import { IMAGES } from './images';

export const KITS = [
  {
    id: "kit-iot-home",
    name: "IoT Smart Home Master Kit",
    subtitle: "ESP32 + 12 Cloud Connected Sensors & Relays",
    badge: IMAGES.kits.iot.badge,
    image: IMAGES.kits.iot.image,
    price: 3499,
    originalPrice: 4500,
    discount: "22% OFF",
    level: "Intermediate",
    itemsIncluded: 24,
    features: [
      "ESP32 Wi-Fi + BLE Dev Board",
      "4-Channel Optocoupled Relay Board",
      "DHT22 High-Precision Temp & Humidity",
      "0.96\" I2C OLED Display",
      "Comprehensive 80-Page Cloud Handbook",
      "Blynk & Home Assistant Starter Code"
    ]
  },
  {
    id: "kit-robotics-rover",
    name: "Autonomous 4WD Robotics Rover Kit",
    subtitle: "Chassis, Obstacle Avoidance & Line Tracking",
    badge: IMAGES.kits.robotics.badge,
    image: IMAGES.kits.robotics.image,
    price: 4299,
    originalPrice: 5400,
    discount: "20% OFF",
    level: "All Levels",
    itemsIncluded: 38,
    features: [
      "Laser-Cut Acrylic Dual-Deck Chassis",
      "4 × TT Gear Motors with Rubber Wheels",
      "L298N Dual H-Bridge Motor Driver",
      "HC-SR04 Ultrasonic Servo Pan/Tilt",
      "3-Channel Infrared Line Follower Sensor",
      "Wireless Bluetooth Android App Control"
    ]
  },
  {
    id: "kit-arduino-starter",
    name: "Ultimate Arduino UNO Starter Kit",
    subtitle: "Complete Curriculum with 45+ Maker Projects",
    badge: IMAGES.kits.arduinoStarter.badge,
    image: IMAGES.kits.arduinoStarter.image,
    price: 2899,
    originalPrice: 3800,
    discount: "24% OFF",
    level: "Beginner Friendly",
    itemsIncluded: 52,
    features: [
      "Original ATmega328P Arduino Uno R3",
      "MB-102 Breadboard with Power Supply Module",
      "1602 I2C LCD Blue Backlight Display",
      "Stepper Motor with ULN2003 Driver",
      "Resistors, Capacitors, LEDs & Buzzers",
      "Color Printed Step-by-Step Tutorial Book"
    ]
  },
  {
    id: "kit-sensor-pack",
    name: "37-in-1 Sensor Modules Mega Pack",
    subtitle: "Sensors for IoT, Robotics, Automation & AI",
    badge: IMAGES.kits.sensorPack.badge,
    image: IMAGES.kits.sensorPack.image,
    price: 1899,
    originalPrice: 2600,
    discount: "27% OFF",
    level: "All Levels",
    itemsIncluded: 37,
    features: [
      "Sound, Flame, Vibration, Touch & Hall Sensors",
      "Analog Gas (MQ-2) & Soil Moisture Sensors",
      "IR Transmitter & Receiver Pair",
      "RGB Full Color SMD LED Modules",
      "Rotary Encoder & Joystick Modules",
      "Sturdy Transparent Compartment Organizer"
    ]
  }
];

export const BRANDS = [
  { name: "Arduino", role: "Official Distributor", country: "Italy", logoText: "ARDUINO" },
  { name: "Raspberry Pi", role: "Authorized Reseller", country: "UK", logoText: "RASPBERRY PI" },
  { name: "Espressif", role: "IoT Solutions Partner", country: "China", logoText: "ESPRESSIF" },
  { name: "Texas Instruments", role: "Precision IC Partner", country: "USA", logoText: "TEXAS INST." },
  { name: "STMicroelectronics", role: "32-Bit ARM Architectures", country: "Switzerland", logoText: "STMICRO" },
  { name: "SparkFun", role: "Maker Innovation Hub", country: "USA", logoText: "SPARKFUN" },
  { name: "Adafruit", role: "DIY Electronics & Feather", country: "USA", logoText: "ADAFRUIT" },
  { name: "Bosch Sensortec", role: "MEMS Environmental Sensors", country: "Germany", logoText: "BOSCH" },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Arjun Nair",
    role: "Lead Hardware Engineer, TerraBots",
    avatar: IMAGES.testimonials[0].avatar,
    rating: 5,
    text: "CircuitBazzar solved our biggest hardware headache in Bangalore: authentic chips without the 3-week customs wait. We ordered 200 ESP32-WROOM modules on Tuesday morning, received them Wednesday afternoon anti-static sealed with lot verification barcodes.",
    project: "AgriTech Autonomous Quad"
  },
  {
    id: 2,
    name: "Devendra Verma",
    role: "Robotics Club Lead, IIT Bombay",
    avatar: IMAGES.testimonials[1].avatar,
    rating: 5,
    text: "Their Student Corner and bulk pricing helped our 40-member team build our university rover under budget. The 0.96 OLEDs and metal gear servos performed flawlessly under competition stress testing.",
    project: "Mars Society University Rover"
  },
  {
    id: 3,
    name: "Karan Singhania",
    role: "IoT Solutions Architect, SmartGrid India",
    avatar: IMAGES.testimonials[2].avatar,
    rating: 5,
    text: "The B2B quotation service is lightning fast. We uploaded a BOM sheet for 45 custom line items and received verified stock quotes in under 2 hours. Best electronics component marketplace in the country.",
    project: "Smart City Energy Meters"
  },
  {
    id: 4,
    name: "Pooja Sundaram",
    role: "Embedded Systems Educator & Youtuber",
    avatar: IMAGES.testimonials[3].avatar,
    rating: 5,
    text: "Every single component matches its datasheet specs down to the nanoamp. No cloned IC counterfeits, no rusted pins. CircuitBazzar has earned my total recommendation for all my students.",
    project: "Embedded C & RTOS Academy"
  }
];

export const MARQUEE_ITEMS = [
  "⚡ ARDUINO UNO R3 ATMEGA328P",
  "⚡ ESP32-WROOM DUAL CORE WI-FI + BLE",
  "⚡ RASPBERRY PI 4 MODEL B 4GB",
  "⚡ STM32 BLUE PILL ARM CORTEX-M3",
  "⚡ HC-SR04 ULTRASONIC TRANSCEIVER",
  "⚡ 60W DIGITAL TEMPERATURE SOLDERING GEAR",
  "⚡ 5V 10A OPTOCOUPLED RELAYS",
  "⚡ 0.96\" I2C 128X64 HIGH CONTRAST OLED",
  "⚡ TOWERPRO SG90 9G PRECISION SERVOS",
  "⚡ TRUE-RMS 6000-COUNT BENCH MULTIMETERS",
  "⚡ 830-POINT SOLDERLESS BREADBOARDS",
  "⚡ 3.7V HIGH DENSITY LIPO CELLS"
];
