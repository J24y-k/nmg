// /product-page/data.js

// This file centralizes all product data, making it accessible to any script that needs it.
// Each product now has a unique 'id' and the 'price' is a number for correct calculations.

const products = {
    laundry: [
        { id: 1, name: "Laundry Soap", description: "Gentle cleaning for all fabrics.", price: 50, image: "https://placehold.co/300x300/EBF4F6/2B2D42?text=Laundry+Soap" },
        { id: 2, name: "Fabric Softener", description: "Keeps clothes soft and fresh.", price: 35, image: "https://placehold.co/300x300/EBF4F6/2B2D42?text=Fabric+Softener" },
        { id: 3, name: "Stain Remover", description: "Removes tough stains easily.", price: 40, image: "https://placehold.co/300x300/EBF4F6/2B2D42?text=Stain+Remover" },
        { id: 4, name: "Laundry Basket", description: "Durable and spacious.", price: 80, image: "https://placehold.co/300x300/EBF4F6/2B2D42?text=Laundry+Basket" },
        { id: 5, name: "Ironing Spray", description: "Smooth out wrinkles fast.", price: 25, image: "https://placehold.co/300x300/EBF4F6/2B2D42?text=Ironing+Spray" }
    ],
    "pies-noodles": [
        { id: 6, name: "Chicken Pie", description: "Classic chicken pie.", price: 30, image: "https://placehold.co/300x300/EBF4F6/2B2D42?text=Chicken+Pie" },
        { id: 7, name: "Beef Pie", description: "Savory beef filling.", price: 32, image: "https://placehold.co/300x300/EBF4F6/2B2D42?text=Beef+Pie" },
        { id: 8, name: "Veggie Pie", description: "Loaded with vegetables.", price: 28, image: "https://placehold.co/300x300/EBF4F6/2B2D42?text=Veggie+Pie" },
        { id: 9, name: "Instant Noodles", description: "Quick and tasty.", price: 15, image: "https://placehold.co/300x300/EBF4F6/2B2D42?text=Instant+Noodles" },
        { id: 10, name: "Spicy Noodles", description: "For a fiery kick.", price: 18, image: "https://placehold.co/300x300/EBF4F6/2B2D42?text=Spicy+Noodles" }
    ],
    lunchbox: [
        { id: 11, name: "Fruit Pack", description: "Fresh seasonal fruits.", price: 20, image: "https://placehold.co/300x300/EBF4F6/2B2D42?text=Fruit+Pack" },
        { id: 12, name: "Sandwich Box", description: "Assorted sandwiches.", price: 25, image: "https://placehold.co/300x300/EBF4F6/2B2D42?text=Sandwich+Box" },
        { id: 13, name: "Snack Mix", description: "Healthy snacks.", price: 18, image: "https://placehold.co/300x300/EBF4F6/2B2D42?text=Snack+Mix" },
        { id: 14, name: "Juice Box", description: "100% fruit juice.", price: 10, image: "https://placehold.co/300x300/EBF4F6/2B2D42?text=Juice+Box" },
        { id: 15, name: "Mini Muffins", description: "Perfect for lunch.", price: 15, image: "https://placehold.co/300x300/EBF4F6/2B2D42?text=Mini+Muffins" }
    ],
    gifts: [
        { id: 16, name: "Custom Mug", description: "Personalized mug.", price: 50, image: "https://placehold.co/300x300/EBF4F6/2B2D42?text=Custom+Mug" },
        { id: 17, name: "Branded T-shirt", description: "Your logo here.", price: 80, image: "https://placehold.co/300x300/EBF4F6/2B2D42?text=Branded+T-Shirt" },
        { id: 18, name: "Gift Hamper", description: "Assorted treats.", price: 120, image: "https://placehold.co/300x300/EBF4F6/2B2D42?text=Gift+Hamper" },
        { id: 19, name: "Keychain", description: "Custom design.", price: 20, image: "https://placehold.co/300x300/EBF4F6/2B2D42?text=Keychain" },
        { id: 20, name: "Notebook", description: "Branded stationery.", price: 35, image: "https://placehold.co/300x300/EBF4F6/2B2D42?text=Notebook" }
    ],
    supply: [
        { id: 21, name: "A4 Paper", description: "500 sheets.", price: 60, image: "https://placehold.co/300x300/EBF4F6/2B2D42?text=A4+Paper" },
        { id: 22, name: "Pens Pack", description: "Pack of 10.", price: 25, image: "https://placehold.co/300x300/EBF4F6/2B2D42?text=Pens" },
        { id: 23, name: "Stapler", description: "Heavy duty.", price: 40, image: "https://placehold.co/300x300/EBF4F6/2B2D42?text=Stapler" },
        { id: 24, name: "Folders", description: "Set of 5.", price: 30, image: "https://placehold.co/300x300/EBF4F6/2B2D42?text=Folders" },
        { id: 25, name: "Desk Organizer", description: "Keep tidy.", price: 55, image: "https://placehold.co/300x300/EBF4F6/2B2D42?text=Desk+Organizer" }
    ]
};
