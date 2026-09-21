import { CategoryInfo, Product } from '../types';

export const categories: CategoryInfo[] = [
  { name: 'Home Decor', icon: '🏠', imageUrl: 'https://images.unsplash.com/photo-1618220179428-22790b461013' },
  { name: 'Handicrafts', icon: '🐘', imageUrl: 'https://images.unsplash.com/photo-1602523961358-f9f03dd557db' },
  { name: 'Textiles', icon: '🧵', imageUrl: 'https://images.unsplash.com/photo-1602810316693-3667c854239a' },
  { name: 'Jewellery', icon: '💎', imageUrl: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d' },
  { name: 'Paintings', icon: '🎨', imageUrl: 'https://images.unsplash.com/photo-1577083552431-6e5fd01988a5' },
  { name: 'Pottery', icon: '🏺', imageUrl: 'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9' },
  { name: 'Wooden Crafts', icon: '🪵', imageUrl: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a' },
  { name: 'Bamboo Products', icon: '🎋', imageUrl: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6' },
  { name: 'Metal Crafts', icon: '🪔', imageUrl: 'https://images.unsplash.com/photo-1601058268499-e52658d8e1b5' },
  { name: 'Stone Crafts', icon: '🗿', imageUrl: 'https://images.unsplash.com/photo-1561214115-7c3c7c7e7f9a' },
  { name: 'Leather Products', icon: '👜', imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62' },
  { name: 'Organic & Natural', icon: '🌿', imageUrl: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883' },
  { name: 'Toys & Games', icon: '🧸', imageUrl: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1' },
  { name: 'Wall Hangings', icon: '🧶', imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7' },
  { name: 'Festive Items', icon: '🪔', imageUrl: 'https://images.unsplash.com/photo-1604608672516-f1e9a7e3190f' },
  { name: 'Kitchen & Dining', icon: '🍲', imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f' },
  { name: 'Personal Care', icon: '🧼', imageUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108' },
  { name: 'Clothing & Apparel', icon: '👗', imageUrl: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c' },
  { name: 'Bags & Accessories', icon: '👜', imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3' },
  { name: 'Stationery', icon: '📓', imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a' },
];

export const namesByCategory: Record<string, string[]> = {
  'Home Decor': ['Terracotta Lamp', 'Wooden Wall Shelf', 'Decorative Mirror', 'Clay Flower Vase', 'Macrame Table Accent', 'Brass Diya Set', 'Candle Holder', 'Ceramic Plant Pot', 'Wooden Table Clock', 'Bamboo Lampshade'],
  'Handicrafts': ['Wooden Elephant', 'Palm Leaf Basket', 'Warli Figurine', 'Handmade Tribal Mask', 'Carved Peacock', 'Paper Mache Doll', 'Palm Leaf Fan', 'Cane Craft Box', 'Miniature Bull', 'Handmade Bird Pair'],
  'Textiles': ['Cotton Saree', 'Handloom Stole', 'Block Print Dupatta', 'Ikat Cushion Cover', 'Khadi Scarf', 'Embroidered Shawl', 'Tie Dye Fabric', 'Cotton Table Runner', 'Handwoven Bedsheet', 'Silk Wall Textile'],
  'Jewellery': ['Beaded Necklace', 'Terracotta Earrings', 'Brass Jhumka', 'Silver Oxidised Ring', 'Thread Bracelet', 'Kundan Pendant', 'Tribal Choker', 'Pearl Hair Pin', 'Wooden Earrings', 'Handmade Anklet'],
  'Paintings': ['Painted Canvas', 'Madhubani Art', 'Tanjore Miniature', 'Warli Painting', 'Floral Folk Art', 'Village Landscape', 'Abstract Folk Frame', 'Mandala Art', 'Gond Painting', 'Nature Wall Art'],
  'Pottery': ['Terracotta Vase', 'Clay Serving Bowl', 'Handmade Mug', 'Earthen Diya Set', 'Planter Pot', 'Clay Water Bottle', 'Pottery Plate', 'Ceramic Kettle', 'Mini Kulhad Set', 'Decorative Urli'],
  'Wooden Crafts': ['Carved Trinket Box', 'Wooden Bowl', 'Wooden Wall Clock', 'Carved Pen Stand', 'Wooden Horse', 'Wooden Owl', 'Wooden Peacock', 'Puzzle Toy', 'Serving Tray', 'Carved Photo Frame'],
  'Bamboo Products': ['Bamboo Pen Stand', 'Bamboo Basket', 'Bamboo Lamp', 'Bamboo Tray', 'Bamboo Bottle', 'Bamboo Storage Box', 'Bamboo Plant Stand', 'Bamboo Wind Chime', 'Bamboo Organizer', 'Bamboo Serving Set'],
  'Metal Crafts': ['Brass Lamp', 'Brass Bell', 'Copper Bottle', 'Metal Wall Art', 'Brass Ganesha', 'Handmade Tumbler', 'Bronze Figurine', 'Metal Diya', 'Brass Tray', 'Decorative Horse'],
  'Stone Crafts': ['Stone Buddha', 'Soapstone Bowl', 'Marble Inlay Coaster', 'Granite Mortar', 'Carved Stone Elephant', 'Stone Lamp', 'Mini Stone Ganesha', 'Pebble Photo Stand', 'Stone Candle Holder', 'Carved Stone Plate'],
  'Leather Products': ['Leather Wallet', 'Leather Belt', 'Leather Journal', 'Leather Sling Bag', 'Leather Pouch', 'Leather Passport Cover', 'Leather Card Holder', 'Leather Keychain', 'Leather Tote', 'Leather Spectacle Case'],
  'Organic & Natural': ['Organic Soap Set', 'Herbal Bath Powder', 'Natural Incense', 'Neem Comb', 'Coconut Shell Bowl', 'Handmade Lip Balm', 'Aloe Face Bar', 'Herbal Shampoo Bar', 'Natural Candle', 'Rose Bath Salt'],
  'Toys & Games': ['Wooden Toy Car', 'Stacking Rings', 'Wooden Puzzle', 'Cloth Doll', 'Pull Along Duck', 'Spinning Top', 'Wooden Blocks', 'Finger Puppet Set', 'Traditional Board Game', 'Handmade Rattle'],
  'Wall Hangings': ['Macrame Hanging', 'Jute Wall Art', 'Cotton Tassel Decor', 'Bamboo Wall Fan', 'Embroidered Hoop', 'Mirror Wall Hanging', 'Dream Catcher', 'Woven Tapestry', 'Shell Wall Decor', 'Beaded Toran'],
  'Festive Items': ['Decorative Diya', 'Festival Toran', 'Clay Ganesha', 'Puja Thali', 'Brass Bell Set', 'Rangoli Stencil', 'Festive Lantern', 'Handmade Incense Stand', 'Decorative Kalash', 'Flower Garland'],
  'Kitchen & Dining': ['Kitchen Bowl Set', 'Spice Box', 'Wooden Spoon Set', 'Serving Tray', 'Clay Casserole', 'Coconut Ladle', 'Masala Box', 'Wooden Chopping Board', 'Ceramic Dinner Set', 'Handmade Strainer'],
  'Personal Care': ['Herbal Soap', 'Bamboo Toothbrush', 'Natural Scrub', 'Handmade Comb', 'Lip Balm Set', 'Bath Salt Jar', 'Rose Water', 'Herbal Hair Oil', 'Face Pack', 'Natural Loofah'],
  'Clothing & Apparel': ['Handloom Saree', 'Cotton Kurta', 'Embroidered Dupatta', 'Linen Shirt', 'Block Print Skirt', 'Handmade Scarf', 'Cotton Dress', 'Ikat Shirt', 'Traditional Shawl', 'Printed Stole'],
  'Bags & Accessories': ['Jute Handbag', 'Canvas Tote', 'Bamboo Clutch', 'Handwoven Sling Bag', 'Embroidered Purse', 'Leather Pouch Bag', 'Jute Backpack', 'Cotton Tote', 'Tribal Shoulder Bag', 'Handmade Coin Purse'],
  'Stationery': ['Handmade Notebook', 'Recycled Journal', 'Bamboo Pen Set', 'Art Sketchbook', 'Handmade Greeting Cards', 'Leather Diary', 'Craft Paper Pack', 'Wooden Bookmark', 'Calligraphy Set', 'Mini Desk Organizer'],
};

export const artisans = [
  'Ramesh Crafts',
  'Lakshmi Handicrafts',
  'Green Weaves',
  'Clay Creations',
  'Metal Artisans',
  'ColorStrokes',
  'Bamboo Hub',
  'Stone Crafts',
  'Leather Works',
  'Nature Care',
  'Toy Makers',
  'Knot Studio',
  'Kitchen Crafts',
  'Eco Bags',
  'Traditional Arts',
];

export const cities = [
  'Thanjavur',
  'Madurai',
  'Kanchipuram',
  'Coimbatore',
  'Jaipur',
  'Mysuru',
  'Kolkata',
  'Varanasi',
];

export function buildProducts(): Product[] {
  const result: Product[] = [];
  let id = 1;

  for (let c = 0; c < categories.length; c++) {
    const category = categories[c];
    const names = namesByCategory[category.name] || [];
    for (let i = 0; i < names.length; i++) {
      const base = 299 + ((c * 97 + i * 83) % 1600);
      const ratingRaw = 4.2 + (((c + i) % 8) / 10);
      const rating = Math.round(ratingRaw * 10) / 10;
      const reviews = 18 + ((c * 23 + i * 17) % 240);

      result.push({
        id,
        name: names[i],
        category: category.name,
        artisan: artisans[(c + i) % artisans.length],
        city: cities[(c + i) % cities.length],
        price: base,
        rating,
        reviews,
        description: `Handmade ${names[i].toLowerCase()} crafted by skilled artisans. Made with care using traditional techniques and quality materials.`,
        imageUrl: `${category.imageUrl}?auto=format&fit=crop&w=800&q=82&ixlib=rb-4.1.0&index=${i}`,
        tags: [category.name, 'Handmade', 'Local', 'Artisan'],
        featured: id <= 20 || id % 13 === 0,
        stock: 12 + ((c * 7 + i * 3) % 25),
        materials: ['Natural Raw Materials', 'Handcrafted Elements'],
      });
      id++;
    }
  }

  return result;
}
