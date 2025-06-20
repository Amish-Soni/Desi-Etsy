// src/data.js

// Import all product and artisan images
import pro1 from './assets/pro1.jpg';
import pro2 from './assets/pro2.jpg';
import pro3 from './assets/pro3.jpg';
import pro4 from './assets/pro4.jpg';
import pro5 from './assets/pro5.jpg';
import pro6 from './assets/pro6.jpg';
import pro7 from './assets/pro7.jpg';
import pro8 from './assets/pro8.jpg';

import artisan1 from './assets/a1.jpg';
import artisan2 from './assets/a2.jpg';
import artisan3 from './assets/a3.jpg';
import artisan4 from './assets/a4.jpg';
import artisan5 from './assets/a1.jpg'; 
import artisan6 from './assets/a2.jpg';
import artisan7 from './assets/a3.jpg';
import artisan8 from './assets/a4.jpg';

import { faJar, faSocks, faGem, faTree, faPalette, faCouch } from '@fortawesome/free-solid-svg-icons';

export const initialCategories = [
  { id: "pottery", name: "Pottery", icon: faJar },
  { id: "textiles", name: "Textiles", icon: faSocks },
  { id: "jewelry", name: "Jewelry", icon: faGem },
  { id: "woodwork", name: "Woodwork", icon: faTree },
  { id: "paintings", name: "Paintings", icon: faPalette },
  { id: "home-decor", name: "Home Decor", icon: faCouch },
];

export const initialProducts = [
  { id: 1, name: "Hand-painted Ceramic Vase", description: "Beautifully crafted ceramic vase...", price: 45.99, originalPrice: 59.99, image:pro1, artisan: "Maya Sharma", location: "Jaipur, Rajasthan", rating: 4.8, reviews: 124, categoryId: 'pottery' },
  { id: 2, name: "Handwoven Cotton Scarf", description: "Soft cotton scarf...", price: 29.99, originalPrice: 39.99, image:pro2, artisan: "Ravi Patel", location: "Ahmedabad, Gujarat", rating: 4.6, reviews: 89, categoryId: 'textiles' },
  { id: 3, name: "Brass Pendant Necklace", description: "Handcrafted brass pendant...", price: 32.5, originalPrice: null, image:pro3, artisan: "Priya Verma", location: "Bhubaneswar, Odisha", rating: 4.9, reviews: 56, categoryId: 'jewelry' },
  { id: 4, name: "Wooden Elephant Sculpture", description: "Hand-carved rosewood elephant...", price: 78.5, originalPrice: 95.0, image:pro4, artisan: "Anand Kumar", location: "Mysore, Karnataka", rating: 4.7, reviews: 103, categoryId: 'woodwork' },
  { id: 5, name: "Embroidered Wall Hanging", description: "Colorful hand-embroidered wall art...", price: 65.99, originalPrice: null, image:pro5, artisan: "Lakshmi Devi", location: "Kutch, Gujarat", rating: 4.9, reviews: 78, categoryId: 'home-decor' },
  { id: 6, name: "Terracotta Wind Chimes", description: "Handmade clay wind chimes...", price: 24.99, originalPrice: 32.99, image:pro6, artisan: "Rajesh Gupta", location: "Kolkata, West Bengal", rating: 3.5, reviews: 42, categoryId: 'home-decor' },
  { id: 7, name: "Madhubani Painting", description: "Traditional Madhubani art...", price: 89.99, originalPrice: 110.0, image:pro7, artisan: "Sunita Jha", location: "Madhubani, Bihar", rating: 5.0, reviews: 67, categoryId: 'paintings' },
  { id: 8, name: "Brass Table Lamp", description: "Intricately designed brass lamp...", price: 119.99, originalPrice: 149.99, image:pro8, artisan: "Mohammed Ali", location: "Moradabad, Uttar Pradesh", rating: 2.8, reviews: 91, categoryId: 'home-decor' },
];

export const initialArtisans = [
  { id: 1, name: "Maya Sharma", specialty: "Ceramic Pottery", location: "Jaipur, Rajasthan", image:artisan1, rating: 4.8, role: 'artisan' },
  { id: 2, name: "Ravi Patel", specialty: "Textile Weaving", location: "Ahmedabad, Gujarat", image:artisan2, rating: 4.6, role: 'artisan' },
  { id: 3, name: "Priya Verma", specialty: "Metal Jewelry", location: "Bhubaneswar, Odisha", image:artisan3, rating: 4.9, role: 'artisan' },
  { id: 4, name: "Anand Kumar", specialty: "Wood Carving", location: "Mysore, Karnataka", image:artisan4, rating: 4.7, role: 'artisan' },
  { id: 5, name: "Suresh Singh", specialty: "Leather Goods", location: "Kanpur, Uttar Pradesh", image:artisan5, rating: 4.5, role: 'artisan' },
  { id: 6, name: "Geeta Das", specialty: "Jute Crafts", location: "Kolkata, West Bengal", image:artisan6, rating: 4.8, role: 'artisan' },
  { id: 7, name: "Imran Khan", specialty: "Brassware", location: "Moradabad, Uttar Pradesh", image:artisan7, rating: 4.4, role: 'artisan' },
  { id: 8, name: "Lakshmi Murthy", specialty: "Tanjore Paintings", location: "Thanjavur, Tamil Nadu", image:artisan8, rating: 5.0, role: 'artisan' },
];