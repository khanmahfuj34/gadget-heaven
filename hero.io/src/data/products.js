const products = [{
        id: 1, // unique number for each product
        name: "iPhone 15 Pro",
        price: 999, // number (no quotes)
        category: "phones", // string (in quotes)
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop",
        rating: 4.8,
        description: "The most powerful iPhone ever with A17 Pro chip and titanium design.",
        inStock: true, // boolean: true or false
        specs: ["A17 Pro Chip", "48MP Camera", "Titanium Frame", "USB-C"]
            //       ↑ this is an array INSIDE an object — arrays can hold anything!
    },
    {
        id: 2,
        name: "Samsung Galaxy S24",
        price: 899,
        category: "phones",
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop",
        rating: 4.7,
        description: "Galaxy AI is here. Snapdragon 8 Gen 3 and 200MP camera.",
        inStock: true,
        specs: ["Snapdragon 8 Gen 3", "200MP Camera", "6.8 inch Display", "AI Features"]
    },
    {
        id: 3,
        name: "MacBook Pro M3",
        price: 1599,
        category: "computers",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
        rating: 4.9,
        description: "Supercharged by M3 Pro chip with outstanding performance and battery life.",
        inStock: true,
        specs: ["M3 Pro Chip", "18GB RAM", "512GB SSD", "18-hr Battery"]
    },
    {
        id: 4,
        name: "Dell XPS 15",
        price: 1299,
        category: "computers",
        image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=400&fit=crop",
        rating: 4.5,
        description: "Stunning OLED display and powerful performance for creators.",
        inStock: true,
        specs: ["Intel Core i7", "16GB RAM", "1TB SSD", "OLED Display"]
    },
    {
        id: 5,
        name: "Apple Watch Ultra 2",
        price: 799,
        category: "smartwatches",
        image: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400&h=400&fit=crop",
        rating: 4.8,
        description: "The most rugged Apple Watch built for endurance athletes.",
        inStock: true,
        specs: ["S9 SiP Chip", "49mm Titanium", "60-hr Battery", "GPS + LTE"]
    },
    {
        id: 6,
        name: "Samsung Galaxy Watch 6",
        price: 299,
        category: "smartwatches",
        image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop",
        rating: 4.4,
        description: "Advanced health tracking with stylish design and smart features.",
        inStock: true,
        specs: ["Exynos W930", "Health Monitoring", "40mm Display", "LTE Ready"]
    },
    {
        id: 7,
        name: "Sony WH-1000XM5",
        price: 349,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=400&fit=crop",
        rating: 4.9,
        description: "Industry-leading noise cancellation with exceptional sound quality.",
        inStock: true,
        specs: ["30-hr Battery", "ANC", "Multipoint Connect", "Foldable"]
    },
    {
        id: 8,
        name: "iPad Pro M2",
        price: 1099,
        category: "computers",
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
        rating: 4.7,
        description: "Supercharged by M2 chip with Liquid Retina XDR display.",
        inStock: false, // ← false means out of stock
        specs: ["M2 Chip", "12.9-inch Display", "2TB Storage", "5G Ready"]
    },
    {
        id: 9,
        name: "Google Pixel 8 Pro",
        price: 999,
        category: "phones",
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop",
        rating: 4.6,
        description: "The most helpful phone with Tensor G3 chip and best Google AI.",
        inStock: true,
        specs: ["Tensor G3", "50MP Camera", "7 Years Updates", "Temperature Sensor"]
    },
    {
        id: 10,
        name: "AirPods Pro 2nd Gen",
        price: 249,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&h=400&fit=crop",
        rating: 4.8,
        description: "Active Noise Cancellation, Transparency mode, and Spatial Audio.",
        inStock: true,
        specs: ["H2 Chip", "6-hr Battery", "ANC", "MagSafe Charging"]
    },
    {
        id: 11,
        name: "Logitech MX Master 3",
        price: 99,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
        rating: 4.7,
        description: "Advanced wireless mouse for power users with precision scrolling.",
        inStock: true,
        specs: ["7 Buttons", "Bluetooth", "USB-C Charging", "Multi-Device"]
    },
    {
        id: 12,
        name: "Garmin Fenix 7X",
        price: 899,
        category: "smartwatches",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
        rating: 4.6,
        description: "Ultimate multisport GPS watch with solar charging.",
        inStock: true,
        specs: ["Solar Charging", "28-day Battery", "GPS", "Health Metrics"]
    }
];

// export default = share this data with any file that imports it
export default products;