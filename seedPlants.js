const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Plant = require('./models/Plant');

// Load env vars
dotenv.config();

// Sample plant data (images generated as inline SVG data URIs to avoid external fetch issues)
let plants = [
    { name: "Snake Plant", category: "Indoor", price: 24.99, quantity: 50, description: "Low-maintenance indoor plant with striking vertical leaves" ,image:'https://images.unsplash.com/photo-1687552212914-03a30c82053c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=715'},
    { name: "Peace Lily", category: "Indoor", price: 29.99, quantity: 40, description: "Beautiful flowering indoor plant that purifies air", image: 'https://plus.unsplash.com/premium_photo-1676117273363-2b13dbbc5385?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687' },
    { name: "Spider Plant", category: "Indoor", price: 19.99, quantity: 45, description: "Easy to grow plant with arching leaves", image: 'https://images.unsplash.com/photo-1611527664689-d430dd2a6774?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2073' },
    { name: "Rose Bush", category: "Outdoor", price: 34.99, quantity: 30, description: "Classic garden rose with fragrant blooms", image: 'https://images.unsplash.com/photo-1535846660354-f998ee0797e3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687' },
    { name: "Lavender", category: "Herb", price: 15.99, quantity: 60, description: "Fragrant herb with purple flowers", image: 'https://images.unsplash.com/photo-1610121811962-d81eaffae303?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1169' },
    { name: "Aloe Vera", category: "Succulent", price: 18.99, quantity: 55, description: "Medicinal succulent with thick, gel-filled leaves", image: 'https://images.unsplash.com/photo-1669655547035-753fe19deaac?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1974' },
    { name: "Orchid", category: "Flowering", price: 39.99, quantity: 25, description: "Elegant flowering plant with exotic blooms", image: 'https://images.unsplash.com/photo-1748115234744-c914dcbd1cc9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074' },
    { name: "Mint", category: "Herb", price: 12.99, quantity: 70, description: "Fast-growing aromatic herb", image: 'https://images.unsplash.com/photo-1588908933351-eeb8cd4c4521?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074' },
    { name: "Jade Plant", category: "Succulent", price: 22.99, quantity: 40, description: "Popular succulent with thick, woody stems", image: 'https://images.unsplash.com/photo-1621552330975-f5f9c85dc9c9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735' },
    { name: "Hydrangea", category: "Outdoor", price: 29.99, quantity: 35, description: "Shrub with large, colorful flower clusters", image: 'https://plus.unsplash.com/premium_photo-1668073437039-56653719d1fd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1192' },
    { name: "Bamboo Palm", category: "Indoor", price: 45.99, quantity: 20, description: "Tropical palm perfect for indoor spaces", image: 'https://plus.unsplash.com/premium_photo-1711992368891-5120d686c128?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=685' },
    { name: "Rosemary", category: "Herb", price: 14.99, quantity: 65, description: "Aromatic herb used in cooking", image: 'https://images.unsplash.com/photo-1515586000433-45406d8e6662?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=765' },
    { name: "Echeveria", category: "Succulent", price: 16.99, quantity: 50, description: "Beautiful rosette-forming succulent", image: 'https://images.unsplash.com/photo-1637634378442-4c59ae44c7cf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170' },
    { name: "Dahlia", category: "Flowering", price: 27.99, quantity: 30, description: "Stunning flowers in various colors", image: 'https://plus.unsplash.com/premium_photo-1701185759083-f9d8c10b9a7a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=688' },
    { name: "Basil", category: "Herb", price: 11.99, quantity: 75, description: "Essential culinary herb", image: 'https://images.unsplash.com/photo-1500420254515-0faefa2dac99?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687' },
    { name: "String of Pearls", category: "Succulent", price: 21.99, quantity: 35, description: "Trailing succulent with pearl-like leaves", image: 'https://images.unsplash.com/photo-1648070024741-43f8fa965966?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170' },
    { name: "Chrysanthemum", category: "Flowering", price: 23.99, quantity: 40, description: "Colorful autumn flowering plant", image: 'https://images.unsplash.com/photo-1666513387827-f16e52ee4ef1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074' },
    { name: "Thyme", category: "Herb", price: 12.99, quantity: 60, description: "Low-growing aromatic herb", image: 'https://plus.unsplash.com/premium_photo-1726138617708-f3a7e667739f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1172' },
    { name: "Pothos", category: "Indoor", price: 17.99, quantity: 55, description: "Popular trailing houseplant", image: 'https://images.unsplash.com/photo-1596724878582-76f1a8fdc24f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=764' },
    { name: "Azalea", category: "Outdoor", price: 32.99, quantity: 25, description: "Flowering shrub with spring blooms", image: 'https://images.unsplash.com/photo-1653194519439-ab461d973fe3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170' },
    { name: "Cactus", category: "Succulent", price: 19.99, quantity: 45, description: "Low-maintenance desert plant", image: 'https://images.unsplash.com/photo-1519336056116-bc0f1771dec8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687' },
    { name: "Geranium", category: "Flowering", price: 25.99, quantity: 35, description: "Classic flowering plant with colorful blooms", image: 'https://images.unsplash.com/photo-1716139811679-d1009190d65b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=737' },
    { name: "Sage", category: "Herb", price: 13.99, quantity: 50, description: "Gray-green herb with purple flowers", image: 'https://images.unsplash.com/photo-1639412290613-9acae1500e5b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170' },
    { name: "ZZ Plant", category: "Indoor", price: 28.99, quantity: 30, description: "Hardy indoor plant with glossy leaves", image: 'https://images.unsplash.com/photo-1614594895304-fe7116ac3b58?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=764' },
    { name: "Marigold", category: "Flowering", price: 20.99, quantity: 45, description: "Bright orange and yellow flowers", image: 'https://images.unsplash.com/photo-1706791441354-3d6017bc7e06?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735' },
    { name: "Oregano", category: "Herb", price: 11.99, quantity: 65, description: "Mediterranean herb for cooking", image: 'https://images.unsplash.com/photo-1624041216133-888ec261f50e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1309' },
    { name: "Haworthia", category: "Succulent", price: 15.99, quantity: 40, description: "Small, striped succulent", image: 'https://images.unsplash.com/photo-1711690161377-ba1bd24ab27c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687' },
    { name: "Rubber Plant", category: "Indoor", price: 35.99, quantity: 25, description: "Large indoor plant with glossy leaves", image: 'https://images.unsplash.com/photo-1669392597221-bbfd4b6e13ff?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1974' },
    { name: "Gardenia", category: "Outdoor", price: 37.99, quantity: 20, description: "Fragrant flowering shrub", image: 'https://plus.unsplash.com/premium_photo-1676068243733-df1880c2aef8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687' },
    { name: "Cilantro", category: "Herb", price: 10.99, quantity: 80, description: "Popular herb used in many cuisines", image: 'https://plus.unsplash.com/premium_photo-1679500088050-16109170589e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=747' }
];

// Assign each plant an Unsplash search URL based on the plant name so the
// image generally matches the plant. Using the search endpoint returns a
// relevant image for the query (the browser will follow any redirects).


// We will not download images anymore. Use static external image URLs so
// seeded plants reference remote images directly and nothing is written to
// the local `public/uploads` directory. This avoids intermittent failures
// when downloads or proxying fail.

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    console.log('Connected to MongoDB');

    try {
        // Clear existing plants
        await Plant.deleteMany({});
        console.log('Cleared existing plants');

        // Insert new plants
        await Plant.insertMany(plants);
        console.log('Sample plants inserted successfully');
    } catch (error) {
        console.error('Error inserting plants:', error);
    }

    // Close the connection
    mongoose.connection.close();
    console.log('Database connection closed');
}).catch(err => {
    console.error('Mongo connection error:', err);
});