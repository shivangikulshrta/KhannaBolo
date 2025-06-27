const express = require('express');
const path = require('path'); // required for serving index.html

const app = express();
app.use(express.json());


app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Static recipe database
const recipeDatabase = {
  'dal makhani': [
    { name: 'Urad dal (whole)', price: 60 },
    { name: 'Rajma', price: 30 },
    { name: 'Butter', price: 40 },
    { name: 'Cream', price: 30 },
    { name: 'Tomato puree', price: 25 },
    { name: 'Garam masala', price: 20 }
  ],
  'dosa': [
    { name: 'Rice', price: 50 },
    { name: 'Urad dal', price: 40 },
    { name: 'Fenugreek seeds', price: 10 },
    { name: 'Salt', price: 5 },
    { name: 'Oil', price: 30 }
  ],
  'idly': [
    { name: 'Rice', price: 45 },
    { name: 'Urad dal', price: 35 },
    { name: 'Salt', price: 5 }
  ],
  'rajma': [
    { name: 'Rajma (Kidney Beans)', price: 50 },
    { name: 'Onion', price: 20 },
    { name: 'Tomato', price: 25 },
    { name: 'Garlic', price: 10 },
    { name: 'Ginger', price: 10 },
    { name: 'Garam masala', price: 20 }
  ],
  'chole bhature': [
    { name: 'Chickpeas', price: 60 },
    { name: 'Onion', price: 20 },
    { name: 'Tomato', price: 25 },
    { name: 'Flour (Maida)', price: 40 },
    { name: 'Curd', price: 25 }
  ],
  'paneer butter masala': [
    { name: 'Paneer', price: 90 },
    { name: 'Butter', price: 40 },
    { name: 'Tomato puree', price: 25 },
    { name: 'Cream', price: 30 },
    { name: 'Garam masala', price: 20 }
  ],
  'aloo paratha': [
    { name: 'Wheat flour', price: 30 },
    { name: 'Boiled potato', price: 25 },
    { name: 'Spices', price: 15 }
  ],
  'baingan bharta': [
    { name: 'Brinjal', price: 20 },
    { name: 'Onion', price: 20 },
    { name: 'Tomato', price: 25 }
  ],
  'butter chicken': [
    { name: 'Chicken', price: 150 },
    { name: 'Butter', price: 40 },
    { name: 'Cream', price: 30 }
  ],
  'kadhi pakora': [
    { name: 'Besan', price: 30 },
    { name: 'Curd', price: 25 },
    { name: 'Spices', price: 15 }
  ],
  'malai kofta': [
    { name: 'Paneer', price: 90 },
    { name: 'Potato', price: 20 },
    { name: 'Cream', price: 30 }
  ],
  'shahi paneer': [
    { name: 'Paneer', price: 90 },
    { name: 'Cream', price: 30 },
    { name: 'Cashew paste', price: 35 }
  ],
  'matar paneer': [
    { name: 'Paneer', price: 90 },
    { name: 'Green peas', price: 30 },
    { name: 'Tomato', price: 25 }
  ],
  'tandoori chicken': [
    { name: 'Chicken', price: 150 },
    { name: 'Curd', price: 25 },
    { name: 'Spices', price: 20 }
  ],
  'veg biryani': [
    { name: 'Basmati rice', price: 60 },
    { name: 'Mixed vegetables', price: 40 },
    { name: 'Biryani masala', price: 30 }
  ],
  'chicken biryani': [
    { name: 'Chicken', price: 150 },
    { name: 'Basmati rice', price: 60 },
    { name: 'Spices', price: 30 }
  ],
  'palak paneer': [
    { name: 'Spinach', price: 30 },
    { name: 'Paneer', price: 90 },
    { name: 'Spices', price: 20 }
  ],
  'korma': [
    { name: 'Chicken/Mutton', price: 160 },
    { name: 'Cream', price: 30 },
    { name: 'Spices', price: 30 }
  ],
  'bhindi masala': [
    { name: 'Okra', price: 40 },
    { name: 'Onion', price: 20 },
    { name: 'Spices', price: 15 }
  ],
  'gobhi aloo': [
    { name: 'Cauliflower', price: 30 },
    { name: 'Potato', price: 20 },
    { name: 'Spices', price: 15 }
  ],
  'jeera rice': [
    { name: 'Rice', price: 50 },
    { name: 'Cumin seeds', price: 10 },
    { name: 'Ghee', price: 20 }
  ],
  'vegetable pulao': [
    { name: 'Rice', price: 50 },
    { name: 'Vegetables', price: 40 },
    { name: 'Spices', price: 20 }
  ],
  'lachha paratha': [
    { name: 'Wheat flour', price: 30 },
    { name: 'Ghee', price: 20 }
  ],
  'missi roti': [
    { name: 'Besan', price: 30 },
    { name: 'Wheat flour', price: 25 }
  ],
  'makki di roti': [
    { name: 'Cornmeal', price: 35 },
    { name: 'Ghee', price: 20 }
  ],
  'sarson da saag': [
    { name: 'Mustard leaves', price: 30 },
    { name: 'Spinach', price: 25 },
    { name: 'Spices', price: 20 }
  ],
  'navratan korma': [
    { name: 'Mixed vegetables', price: 40 },
    { name: 'Dry fruits', price: 50 },
    { name: 'Cream', price: 30 }
  ],
  'kashmiri dum aloo': [
    { name: 'Baby potatoes', price: 30 },
    { name: 'Curd', price: 25 },
    { name: 'Spices', price: 20 }
  ],
  'moong dal tadka': [
    { name: 'Moong dal', price: 40 },
    { name: 'Garlic', price: 10 },
    { name: 'Ghee', price: 20 }
  ],
  'tandoori roti': [
    { name: 'Wheat flour', price: 30 },
    { name: 'Salt', price: 5 }
  ],
  'naan': [
    { name: 'Maida', price: 35 },
    { name: 'Curd', price: 20 }
  ],
  'stuffed capsicum': [
    { name: 'Capsicum', price: 30 },
    { name: 'Paneer', price: 90 },
    { name: 'Spices', price: 20 }
  ],
  'veg kofta': [
    { name: 'Mixed vegetables', price: 40 },
    { name: 'Paneer', price: 90 },
    { name: 'Spices', price: 20 }
  ],
  'kofta curry': [
    { name: 'Kofta', price: 60 },
    { name: 'Tomato puree', price: 25 },
    { name: 'Cream', price: 30 }
  ],
  'pav bhaji': [
    { name: 'Mixed vegetables', price: 40 },
    { name: 'Pav buns', price: 20 },
    { name: 'Butter', price: 40 }
  ],
  'poha': [
    { name: 'Flattened rice', price: 30 },
    { name: 'Onion', price: 20 },
    { name: 'Mustard seeds', price: 10 }
  ],
  'samosa': [
    { name: 'Maida', price: 30 },
    { name: 'Potato', price: 20 },
    { name: 'Spices', price: 15 }
  ],
  'kachaudi': [
    { name: 'Maida', price: 30 },
    { name: 'Spices', price: 20 },
    { name: 'Moong dal', price: 30 }
  ],
  'khaman dhokla': [
    { name: 'Besan', price: 30 },
    { name: 'Eno', price: 10 },
    { name: 'Spices', price: 15 }
  ],
  'halwa': [
    { name: 'Suji', price: 25 },
    { name: 'Ghee', price: 30 },
    { name: 'Sugar', price: 20 }
  ],
  'gulab jamun': [
    { name: 'Khoya', price: 60 },
    { name: 'Sugar', price: 30 },
    { name: 'Cardamom', price: 10 }
  ],
  'rasgulla': [
    { name: 'Chhena', price: 50 },
    { name: 'Sugar syrup', price: 20 }
  ],
  'jalebi': [
    { name: 'Maida', price: 30 },
    { name: 'Sugar syrup', price: 25 }
  ],
  'rasmalai': [
    { name: 'Chhena', price: 50 },
    { name: 'Milk', price: 30 },
    { name: 'Sugar', price: 20 }
  ],
  'kheer': [
    { name: 'Rice', price: 30 },
    { name: 'Milk', price: 30 },
    { name: 'Sugar', price: 20 }
  ],
  'ladoo': [
    { name: 'Besan', price: 30 },
    { name: 'Sugar', price: 20 },
    { name: 'Ghee', price: 30 }
  ],
  'besan ladoo': [
    { name: 'Besan', price: 30 },
    { name: 'Sugar', price: 20 },
    { name: 'Ghee', price: 30 }
  ],
  'suji halwa': [
    { name: 'Suji', price: 25 },
    { name: 'Sugar', price: 20 },
    { name: 'Ghee', price: 30 }
  ],
  'pani puri': [
    { name: 'Semolina', price: 20 },
    { name: 'Tamarind water', price: 15 },
    { name: 'Masala', price: 20 }
  ],
  'dahi puri': [
    { name: 'Curd', price: 25 },
    { name: 'Puris', price: 20 },
    { name: 'Spices', price: 15 }
  ],
  'aloo tikki chaat': [
    { name: 'Potato', price: 20 },
    { name: 'Spices', price: 15 },
    { name: 'Chutney', price: 10 }
  ],
  'papdi chaat': [
    { name: 'Papdi', price: 20 },
    { name: 'Curd', price: 25 },
    { name: 'Chutneys', price: 15 }
  ],
  'methi paratha': [
    { name: 'Methi leaves', price: 20 },
    { name: 'Wheat flour', price: 30 },
    { name: 'Spices', price: 25 }
  ],
  'lachha onion salad': [
    { name: 'Onion', price: 15 },
    { name: 'Lemon juice', price: 10 },
    { name: 'Chaat masala', price: 10 }
  ],
  'boondi raita': [
    { name: 'Boondi', price: 25 },
    { name: 'Curd', price: 30 },
    { name: 'Spices', price: 10 }
  ],
  'tamarind chutney': [
    { name: 'Tamarind', price: 20 },
    { name: 'Jaggery', price: 15 },
    { name: 'Spices', price: 10 }
  ],
  'mint chutney': [
    { name: 'Mint leaves', price: 15 },
    { name: 'Coriander', price: 10 },
    { name: 'Green chili', price: 10 }
  ],
  'paneer tikka': [
    { name: 'Paneer', price: 60 },
    { name: 'Capsicum', price: 20 },
    { name: 'Yogurt', price: 30 }
  ],
  'veg cutlet': [
    { name: 'Boiled potato', price: 20 },
    { name: 'Breadcrumbs', price: 10 },
    { name: 'Carrot & peas', price: 15 }
  ],
  'paneer pakora': [
    { name: 'Paneer', price: 60 },
    { name: 'Besan', price: 20 },
    { name: 'Spices', price: 10 }
  ],
  'bread pakora': [
    { name: 'Bread', price: 25 },
    { name: 'Besan', price: 20 },
    { name: 'Aloo masala', price: 30 }
  ],
  'aloo tikki': [
    { name: 'Potato', price: 20 },
    { name: 'Cornflour', price: 10 },
    { name: 'Spices', price: 10 }
  ],
  'chana chaat': [
    { name: 'Boiled chana', price: 25 },
    { name: 'Onion & tomato', price: 20 },
    { name: 'Lemon & masala', price: 10 }
  ],
  'fruit chaat': [
    { name: 'Mixed fruits', price: 50 },
    { name: 'Chaat masala', price: 10 },
    { name: 'Lemon juice', price: 10 }
  ],
  'veg sandwich': [
    { name: 'Bread', price: 25 },
    { name: 'Butter', price: 20 },
    { name: 'Veggies', price: 30 }
  ],
  'cheese toast': [
    { name: 'Bread', price: 25 },
    { name: 'Cheese', price: 40 },
    { name: 'Herbs', price: 10 }
  ],
  'veg burger': [
    { name: 'Burger bun', price: 20 },
    { name: 'Veg patty', price: 30 },
    { name: 'Sauce', price: 15 }
  ],
  'kathi roll': [
    { name: 'Roti', price: 15 },
    { name: 'Paneer stuffing', price: 40 },
    { name: 'Onions & chutney', price: 15 }
  ],
  'egg curry': [
    { name: 'Eggs', price: 30 },
    { name: 'Onion-tomato gravy', price: 25 },
    { name: 'Spices', price: 10 }
  ],
  'anda bhurji': [
    { name: 'Eggs', price: 30 },
    { name: 'Onion', price: 10 },
    { name: 'Green chili', price: 5 }
  ],
  'chicken curry': [
    { name: 'Chicken', price: 100 },
    { name: 'Spices', price: 30 },
    { name: 'Onion gravy', price: 20 }
  ],
  'mutton curry': [
    { name: 'Mutton', price: 150 },
    { name: 'Spices', price: 40 },
    { name: 'Yogurt', price: 20 }
  ],
  'fish curry': [
    { name: 'Fish', price: 120 },
    { name: 'Mustard seeds', price: 10 },
    { name: 'Curry leaves', price: 5 }
  ],
  'veg manchurian': [
    { name: 'Veg balls', price: 40 },
    { name: 'Soy sauce', price: 10 },
    { name: 'Spring onion', price: 10 }
  ],
  'hakka noodles': [
    { name: 'Noodles', price: 30 },
    { name: 'Capsicum', price: 15 },
    { name: 'Soy & vinegar', price: 10 }
  ],
  'veg fried rice': [
    { name: 'Boiled rice', price: 20 },
    { name: 'Carrot & beans', price: 15 },
    { name: 'Sauces', price: 10 }
  ],
  'chilli paneer': [
    { name: 'Paneer', price: 60 },
    { name: 'Capsicum', price: 20 },
    { name: 'Chili sauce', price: 10 }
  ],
  'masala papad': [
    { name: 'Papad', price: 10 },
    { name: 'Onion tomato', price: 15 },
    { name: 'Masala', price: 10 }
  ],
  'corn salad': [
    { name: 'Boiled corn', price: 20 },
    { name: 'Onion tomato', price: 15 },
    { name: 'Lemon juice', price: 10 }
  ],
  'sprout salad': [
    { name: 'Sprouts', price: 25 },
    { name: 'Onion', price: 10 },
    { name: 'Lemon', price: 5 }
  ],
  'moong dal chilla': [
    { name: 'Moong dal', price: 30 },
    { name: 'Ginger chili', price: 10 },
    { name: 'Spices', price: 10 }
  ],
  'besan chilla': [
    { name: 'Besan', price: 20 },
    { name: 'Onion chili', price: 10 },
    { name: 'Coriander', price: 5 }
  ],
  'aloo bonda': [
    { name: 'Potato', price: 20 },
    { name: 'Besan', price: 15 },
    { name: 'Spices', price: 10 }
  ],
  'paneer bhurji': [
    { name: 'Paneer', price: 60 },
    { name: 'Onion', price: 10 },
    { name: 'Tomato', price: 10 }
  ],
  'stuffed paratha': [
    { name: 'Wheat flour', price: 30 },
    { name: 'Stuffing (aloo/paneer)', price: 40 },
    { name: 'Butter', price: 20 }
  ],
  'chana dal': [
    { name: 'Chana dal', price: 25 },
    { name: 'Spices', price: 10 },
    { name: 'Coriander', price: 5 }
  ],
  'masoor dal': [
    { name: 'Masoor dal', price: 25 },
    { name: 'Tomato', price: 10 },
    { name: 'Ginger garlic', price: 10 }
  ],
  'toor dal': [
    { name: 'Toor dal', price: 30 },
    { name: 'Hing', price: 5 },
    { name: 'Mustard seeds', price: 5 }
  ],
  'dal fry': [
    { name: 'Mixed dal', price: 30 },
    { name: 'Ghee', price: 20 },
    { name: 'Spices', price: 10 }
  ],
  'dal tadka': [
    { name: 'Toor dal', price: 30 },
    { name: 'Garlic tadka', price: 10 },
    { name: 'Cumin', price: 5 }
  ],
  'veg upma': [
    { name: 'Rava', price: 20 },
    { name: 'Veggies', price: 20 },
    { name: 'Curry leaves', price: 5 }
  ],
  'sabudana khichdi': [
    { name: 'Sabudana', price: 25 },
    { name: 'Peanuts', price: 20 },
    { name: 'Potato', price: 15 }
  ],
  'sabudana vada': [
    { name: 'Sabudana', price: 25 },
    { name: 'Potato', price: 15 },
    { name: 'Peanuts', price: 20 }
  ],
  'batata vada': [
    { name: 'Boiled potato', price: 20 },
    { name: 'Besan', price: 15 },
    { name: 'Spices', price: 10 }
  ],
  'garlic naan': [
    { name: 'Maida', price: 25 },
    { name: 'Garlic', price: 10 },
    { name: 'Butter', price: 20 }
  ],
  'stuffed naan': [
    { name: 'Maida', price: 25 },
    { name: 'Stuffing', price: 30 },
    { name: 'Butter', price: 20 }
  ],
  'kesar pista kulfi': [
    { name: 'Milk', price: 40 },
    { name: 'Kesar', price: 20 },
    { name: 'Pista', price: 30 }
  ],
  'gajar ka halwa': [
    { name: 'Carrot', price: 30 },
    { name: 'Milk', price: 20 },
    { name: 'Dry fruits', price: 30 }
  ],
  'moong dal halwa': [
    { name: 'Moong dal', price: 35 },
    { name: 'Ghee', price: 30 },
    { name: 'Dry fruits', price: 25 }
  ],
  'paneer roll': [
  { name: 'Wheat wrap', price: 20 },
  { name: 'Paneer stuffing', price: 40 },
  { name: 'Chutney', price: 10 }
],

'cheese sandwich': [
  { name: 'Bread', price: 25 },
  { name: 'Cheese', price: 40 },
  { name: 'Butter', price: 20 }
],

'masala corn': [
  { name: 'Sweet corn', price: 25 },
  { name: 'Butter', price: 20 },
  { name: 'Chaat masala', price: 10 }
],

'peri peri fries': [
  { name: 'French fries', price: 30 },
  { name: 'Peri peri powder', price: 10 }
],

'garlic bread': [
  { name: 'Bread', price: 25 },
  { name: 'Garlic butter', price: 20 },
  { name: 'Herbs', price: 10 }
],

'cheesy nachos': [
  { name: 'Nachos', price: 30 },
  { name: 'Cheese sauce', price: 40 },
  { name: 'Jalapenos', price: 15 }
],

'mojito': [
  { name: 'Mint', price: 10 },
  { name: 'Lemon', price: 10 },
  { name: 'Soda', price: 15 }
],

'cold coffee': [
  { name: 'Milk', price: 20 },
  { name: 'Coffee powder', price: 10 },
  { name: 'Sugar', price: 10 }
],

'oreo shake': [
  { name: 'Milk', price: 20 },
  { name: 'Oreo biscuits', price: 30 },
  { name: 'Ice cream', price: 40 }
],

'mango lassi': [
  { name: 'Curd', price: 20 },
  { name: 'Mango pulp', price: 30 },
  { name: 'Sugar', price: 10 }
],

'sweet lassi': [
  { name: 'Curd', price: 20 },
  { name: 'Sugar', price: 10 },
  { name: 'Cardamom', price: 5 }
],

'badam milk': [
  { name: 'Milk', price: 30 },
  { name: 'Almonds', price: 30 },
  { name: 'Sugar', price: 10 }
],

'paneer frankie': [
  { name: 'Roti', price: 20 },
  { name: 'Paneer stuffing', price: 40 },
  { name: 'Onion & chutney', price: 15 }
],

'cheese paratha': [
  { name: 'Wheat flour', price: 30 },
  { name: 'Cheese', price: 40 },
  { name: 'Butter', price: 20 }
],

'schezwan noodles': [
  { name: 'Noodles', price: 30 },
  { name: 'Schezwan sauce', price: 20 },
  { name: 'Veggies', price: 20 }
],

'veg spring roll': [
  { name: 'Spring roll sheets', price: 25 },
  { name: 'Veg filling', price: 30 },
  { name: 'Soy sauce', price: 10 }
],

'chocolate brownie': [
  { name: 'Cocoa powder', price: 20 },
  { name: 'Butter', price: 30 },
  { name: 'Flour', price: 20 }
],

'vanilla ice cream': [
  { name: 'Milk', price: 30 },
  { name: 'Vanilla essence', price: 10 },
  { name: 'Sugar', price: 20 }
],

'chocolate ice cream': [
  { name: 'Milk', price: 30 },
  { name: 'Cocoa powder', price: 20 },
  { name: 'Sugar', price: 20 }
],

'kulcha': [
  { name: 'Maida', price: 30 },
  { name: 'Butter', price: 20 },
  { name: 'Coriander', price: 10 }
],

'amritsari kulcha': [
  { name: 'Maida', price: 30 },
  { name: 'Potato filling', price: 25 },
  { name: 'Butter', price: 20 }
],

'stuffed kulcha': [
  { name: 'Maida', price: 30 },
  { name: 'Stuffing', price: 30 },
  { name: 'Butter', price: 20 }
],

'corn tikki': [
  { name: 'Boiled corn', price: 25 },
  { name: 'Potato', price: 15 },
  { name: 'Spices', price: 10 }
],

'paneer cutlet': [
  { name: 'Paneer', price: 50 },
  { name: 'Boiled potato', price: 20 },
  { name: 'Spices', price: 10 }
],

'cheese maggi': [
  { name: 'Maggi noodles', price: 15 },
  { name: 'Cheese', price: 30 }
],

'tomato soup': [
  { name: 'Tomatoes', price: 20 },
  { name: 'Butter', price: 20 },
  { name: 'Cream', price: 15 }
],

'carrot halwa': [
  { name: 'Carrot', price: 25 },
  { name: 'Milk', price: 30 },
  { name: 'Dry fruits', price: 30 }
],

'malpua': [
  { name: 'Flour', price: 20 },
  { name: 'Sugar syrup', price: 25 },
  { name: 'Fennel seeds', price: 5 }
],

'falooda': [
  { name: 'Sabja seeds', price: 10 },
  { name: 'Rose syrup', price: 20 },
  { name: 'Milk', price: 30 }
],

'jaljeera': [
  { name: 'Cumin powder', price: 10 },
  { name: 'Mint', price: 10 },
  { name: 'Lemon', price: 10 }
],

'lemonade': [
  { name: 'Lemon', price: 10 },
  { name: 'Sugar', price: 10 },
  { name: 'Water', price: 0 }
],

'sabzi sandwich': [
  { name: 'Bread', price: 25 },
  { name: 'Mixed veggies', price: 30 },
  { name: 'Butter', price: 20 }
],

'paneer dosa': [
  { name: 'Dosa batter', price: 20 },
  { name: 'Paneer filling', price: 40 },
  { name: 'Chutney', price: 10 }
],

'chocolate milkshake': [
  { name: 'Milk', price: 30 },
  { name: 'Chocolate syrup', price: 20 },
  { name: 'Sugar', price: 10 }
],

'strawberry milkshake': [
  { name: 'Milk', price: 30 },
  { name: 'Strawberry syrup', price: 20 },
  { name: 'Sugar', price: 10 }
],

'corn sandwich': [
  { name: 'Bread', price: 25 },
  { name: 'Boiled corn', price: 20 },
  { name: 'Cheese', price: 30 }
],

'paneer kulcha': [
  { name: 'Maida', price: 30 },
  { name: 'Paneer stuffing', price: 40 },
  { name: 'Butter', price: 20 }
],

'fruit custard': [
  { name: 'Milk', price: 30 },
  { name: 'Custard powder', price: 20 },
  { name: 'Fruits', price: 40 }
],

'moong dal dosa': [
  { name: 'Moong dal', price: 30 },
  { name: 'Ginger chili paste', price: 10 },
  { name: 'Oil', price: 10 }
],

'carrot salad': [
  { name: 'Carrot', price: 15 },
  { name: 'Lemon juice', price: 10 },
  { name: 'Salt & pepper', price: 5 }
],

'cucumber salad': [
  { name: 'Cucumber', price: 15 },
  { name: 'Chaat masala', price: 10 },
  { name: 'Lemon juice', price: 10 }
],

'green chutney sandwich': [
  { name: 'Bread', price: 25 },
  { name: 'Green chutney', price: 10 },
  { name: 'Butter', price: 15 }
]

};

// Endpoint to get ingredients manually
app.post('/get-ingredients', (req, res) => {
  const dishRaw = req.body.dish;
  if (!dishRaw || typeof dishRaw !== 'string') {
    return res.json({ ingredients: [] });
  }

const dish = dishRaw.toLowerCase().trim().replace(/[.,!?;:]+$/, '');

  console.log('🔍 Manually searching for:', dish);

  const ingredients = recipeDatabase[dish] || [];
  console.log('✅ Ingredients:', ingredients);

  res.json({ ingredients });
});

// Serve index.html by default
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
