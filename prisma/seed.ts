import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});
const prisma = new PrismaClient({ adapter });

type Item = {
  ru: string;
  uz: string;
  en: string;
  price: number;
  unit?: string;
};

type Category = {
  slug: string;
  ru: string;
  uz: string;
  en: string;
  items: Item[];
};

const categories: Category[] = [
  {
    slug: "antipasti",
    ru: "Антипасти",
    uz: "Antipasti",
    en: "Antipasti",
    items: [
      { ru: "Овощное плато", uz: "Sabzavotli plato", en: "Vegetable platter", price: 85000 },
      { ru: "Сырное плато", uz: "Pishloqli plato", en: "Cheese platter", price: 180000 },
      { ru: "Мясное плато", uz: "Go'shtli plato", en: "Meat platter", price: 170000 },
    ],
  },
  {
    slug: "holodnie-zakuski",
    ru: "Холодные закуски",
    uz: "Sovuq zakuskalar",
    en: "Cold appetizers",
    items: [
      { ru: "Хрустящая лепешка с говяжьей вырезкой", uz: "Mol go'shti filesi bilan qarsildoq lepyoshka", en: "Crispy flatbread with beef tenderloin", price: 135000 },
      { ru: "Хрустящая лепешка с томатами и пармезаном", uz: "Pomidor va parmezan bilan qarsildoq lepyoshka", en: "Crispy flatbread with tomato and parmesan", price: 52000 },
      { ru: "Битые огурцы", uz: "Ezilgan bodring", en: "Smashed cucumbers", price: 56000 },
      { ru: "Перец Рамиро с риетом из угря и сливочного сыра", uz: "Ramiro qalampiri, ilonbaliq va qaymoqli pishloq rieti bilan", en: "Ramiro pepper with eel and cream cheese rillette", price: 95000 },
    ],
  },
  {
    slug: "goryachie-zakuski",
    ru: "Горячие закуски",
    uz: "Issiq zakuskalar",
    en: "Hot appetizers",
    items: [
      { ru: "Тигровые креветки с соусом манго", uz: "Mango sousli yo'lbars qisqichbaqalari", en: "Tiger prawns with mango sauce", price: 94000 },
      { ru: "Костный мозг с багетом", uz: "Baget bilan suyak iligi", en: "Bone marrow with baguette", price: 148000 },
      { ru: "Эмпанадас с говядиной", uz: "Mol go'shtli empanadas", en: "Beef empanadas", price: 84000 },
      { ru: "Эмпанадас с лососем и сметаной", uz: "Losos va smetana bilan empanadas", en: "Salmon and sour cream empanadas", price: 89000 },
      { ru: "Говяжий язык на гриле", uz: "Grilda pishirilgan mol tili", en: "Grilled beef tongue", price: 115000 },
    ],
  },
  {
    slug: "namazki",
    ru: "Намазки",
    uz: "Namazkalar",
    en: "Spreads",
    items: [{ ru: "Дзадзики", uz: "Dzadziki", en: "Tzatziki", price: 40000 }],
  },
  {
    slug: "pechy",
    ru: "Печь",
    uz: "Pech taomlari",
    en: "From the oven",
    items: [
      { ru: "Каталонская пицца Маргарита", uz: "Katalon pitsasi Margarita", en: "Catalan pizza Margherita", price: 90000 },
      { ru: "Каталонская пицца Пепперони", uz: "Katalon pitsasi Pepperoni", en: "Catalan pizza Pepperoni", price: 110000 },
      { ru: "Каталонская пицца Море-море", uz: "Katalon pitsasi «Dengiz-dengiz»", en: "Catalan pizza “Sea-sea”", price: 160000 },
      { ru: "Багет", uz: "Baget", en: "Baguette", price: 13000 },
      { ru: "Каталонская пицца 4 сыра", uz: "Katalon pitsasi 4 pishloq", en: "Catalan pizza 4 cheeses", price: 119000 },
      { ru: "Каталонская пицца с мясом", uz: "Katalon pitsasi go'sht bilan", en: "Catalan pizza with meat", price: 129000 },
      { ru: "Лепешка Quadro", uz: "Quadro lepyoshkasi", en: "Quadro flatbread", price: 19000 },
      { ru: "Бородинский с семечками", uz: "Kunjara urug'li Borodin noni", en: "Borodinsky bread with seeds", price: 18000 },
    ],
  },
  {
    slug: "salati",
    ru: "Салаты",
    uz: "Salatlar",
    en: "Salads",
    items: [
      { ru: "Хрустящий баклажан с зеленью, кедровыми орехами и страчателлой", uz: "Ko'katlar, qarag'ay yong'og'i va stracciatella bilan qarsildoq baqlajon", en: "Crispy eggplant with herbs, pine nuts and stracciatella", price: 79000 },
      { ru: "Буррата с томатами", uz: "Pomidorli burrata", en: "Burrata with tomatoes", price: 158000 },
      { ru: "Зеленый салат с ореховым соусом и пудрой из пармезана", uz: "Yong'oq sousi va parmezan kukuni bilan yashil salat", en: "Green salad with nut sauce and parmesan powder", price: 109000 },
      { ru: "Салат с куриным бедром, ореховым соусом и киноа", uz: "Tovuq soni, yong'oq sousi va kinoa bilan salat", en: "Chicken thigh salad with nut sauce and quinoa", price: 98000 },
      { ru: "Печеный баклажан, томаты, соус дзадзики", uz: "Pishirilgan baqlajon, pomidor, dzadziki sousi", en: "Baked eggplant, tomatoes, tzatziki sauce", price: 85000 },
      { ru: "Салат Греческий", uz: "Grek salati", en: "Greek salad", price: 107000 },
      { ru: "Овощной салат со сметаной", uz: "Smetanali sabzavotli salat", en: "Vegetable salad with sour cream", price: 70000 },
      { ru: "Салат с ростбифом", uz: "Rostbif bilan salat", en: "Roast beef salad", price: 110000 },
      { ru: "Цезарь с курицей на гриле", uz: "Grilda pishirilgan tovuq bilan Sezar", en: "Caesar with grilled chicken", price: 120000 },
      { ru: "Цезарь с креветками на гриле", uz: "Grilda pishirilgan qisqichbaqasimon bilan Sezar", en: "Caesar with grilled shrimp", price: 160000 },
    ],
  },
  {
    slug: "supi",
    ru: "Супы",
    uz: "Sho'rvalar",
    en: "Soups",
    items: [
      { ru: "Томатный суп с морепродуктами", uz: "Dengiz mahsulotli pomidor sho'rvasi", en: "Tomato soup with seafood", price: 108000 },
      { ru: "Окрошка на айране", uz: "Ayronli okroshka", en: "Okroshka with ayran", price: 78000 },
      { ru: "Гаспачо", uz: "Gazpacho", en: "Gazpacho", price: 98000 },
      { ru: "Суп с цыпленком", uz: "Tovuqli sho'rva", en: "Chicken soup", price: 48000 },
      { ru: "Борщ с говядиной", uz: "Mol go'shtli borsh", en: "Beef borscht", price: 78000 },
      { ru: "Окрошка на квасе", uz: "Kvasli okroshka", en: "Okroshka with kvass", price: 78000 },
    ],
  },
  {
    slug: "paelyya",
    ru: "Паэлья",
    uz: "Paelya",
    en: "Paella",
    items: [
      { ru: "Паэлья с морепродуктами", uz: "Dengiz mahsulotli paelya", en: "Seafood paella", price: 148000 },
      { ru: "Паэлья с цыпленком", uz: "Tovuqli paelya", en: "Chicken paella", price: 132000 },
      { ru: "Паэлья с тальятой из говядины", uz: "Mol go'shti talyatasi bilan paelya", en: "Paella with beef tagliata", price: 120000 },
    ],
  },
  {
    slug: "asado",
    ru: "Асадо",
    uz: "Asado",
    en: "Asado (grill steaks)",
    items: [
      { ru: "Стейк Пиканья", uz: "Steyk Pikanya", en: "Picanha steak", price: 145000, unit: "100г" },
      { ru: "Стейк Нью-Йорк", uz: "Steyk Nyu-York", en: "New York steak", price: 165000, unit: "100г" },
      { ru: "Стейк Мачете", uz: "Steyk Machete", en: "Machete steak", price: 102000, unit: "100г" },
      { ru: "Корейка ягненка", uz: "Qo'zi koreykasi", en: "Lamb loin", price: 82000, unit: "100г" },
      { ru: "Стейк Рибай Dry Aged", uz: "Steyk Ribay Dry Aged", en: "Ribeye steak Dry Aged", price: 155000, unit: "100г" },
    ],
  },
  {
    slug: "myaso-i-ptitsa",
    ru: "Мясо и птица",
    uz: "Go'sht va parranda",
    en: "Meat & poultry",
    items: [
      { ru: "Куриная грудка на гриле с овощами и соусом дзадзики", uz: "Sabzavot va dzadziki sousi bilan grilda pishirilgan tovuq ko'kragi", en: "Grilled chicken breast with vegetables and tzatziki sauce", price: 118000 },
      { ru: "Говяжья вырезка с домашним картофелем и соусом пеппер", uz: "Uy kartoshkasi va peper sousi bilan mol go'shti filesi", en: "Beef tenderloin with home-style potatoes and pepper sauce", price: 210000 },
      { ru: "Цыпленок на гриле с соусом куриный жу", uz: "Tovuq jusi sousi bilan grilda pishirilgan tovuq", en: "Grilled chicken with chicken jus sauce", price: 132000 },
      { ru: "Куриные котлеты с пюре и грибным соусом", uz: "Pyure va qo'ziqorin sousi bilan tovuq kotletlari", en: "Chicken cutlets with mash and mushroom sauce", price: 89000 },
      { ru: "Золотой бургер", uz: "Oltin burger", en: "Golden burger", price: 132000 },
      { ru: "Томленые говяжьи щечки с пюре", uz: "Pyure bilan dimlangan mol lunji", en: "Braised beef cheeks with mash", price: 152000 },
      { ru: "Рубленая котлета Quadro с чипсами", uz: "Chipslar bilan Quadro qiyma kotleti", en: "Quadro chopped cutlet with chips", price: 120000 },
      { ru: "Запеченный бефстроганов", uz: "Pishirilgan befstroganov", en: "Baked beef stroganoff", price: 138000 },
      { ru: "Куриный кебаб по-испански", uz: "Ispancha tovuq kababi", en: "Spanish-style chicken kebab", price: 89000 },
      { ru: "Кебаб из баранины по-испански", uz: "Ispancha qo'y go'shti kababi", en: "Spanish-style lamb kebab", price: 110000 },
      { ru: "Кебаб из говядины по-испански", uz: "Ispancha mol go'shti kababi", en: "Spanish-style beef kebab", price: 110000 },
      { ru: "Трио мини-бургеров", uz: "Uchta mini-burger", en: "Trio of mini burgers", price: 149000 },
      { ru: "Бургер в сырном соусе", uz: "Pishloq sousli burger", en: "Burger in cheese sauce", price: 125000 },
    ],
  },
  {
    slug: "moreprodukti",
    ru: "Морепродукты",
    uz: "Dengiz mahsulotlari",
    en: "Seafood",
    items: [
      { ru: "Лосось с брокколи", uz: "Brokkoli bilan losos", en: "Salmon with broccoli", price: 220000 },
      { ru: "Тигровые креветки на гриле", uz: "Grilda pishirilgan yo'lbars qisqichbaqalari", en: "Grilled tiger prawns", price: 149000 },
      { ru: "Мидии в сливочном соусе", uz: "Qaymoqli sousda midiyalar", en: "Mussels in cream sauce", price: 198000 },
      { ru: "Морепродукты в печи", uz: "Pechda pishirilgan dengiz mahsulotlari", en: "Seafood from the oven", price: 165000 },
      { ru: "Мидии в томатном соусе", uz: "Pomidor sousida midiyalar", en: "Mussels in tomato sauce", price: 198000 },
    ],
  },
  {
    slug: "pasta",
    ru: "Паста",
    uz: "Pasta",
    en: "Pasta",
    items: [
      { ru: "Спагетти арабьята с креветками", uz: "Qisqichbaqasimon bilan spagetti arabyata", en: "Spaghetti arrabbiata with shrimp", price: 138000 },
      { ru: "Спагетти болоньезе", uz: "Spagetti bolonyez", en: "Spaghetti bolognese", price: 138000 },
      { ru: "Спагетти с морепродуктами", uz: "Dengiz mahsulotli spagetti", en: "Spaghetti with seafood", price: 174000 },
      { ru: "Феттучине альфредо", uz: "Fettuchine alfredo", en: "Fettuccine alfredo", price: 128000 },
      { ru: "Орзо с говяжьими щечками", uz: "Mol lunji bilan orzo", en: "Orzo with beef cheeks", price: 105000 },
    ],
  },
  {
    slug: "garniri",
    ru: "Гарниры",
    uz: "Garnirlar",
    en: "Sides",
    items: [
      { ru: "Батат фри с пармезаном", uz: "Parmezanli batat fri", en: "Sweet potato fries with parmesan", price: 53000 },
      { ru: "Брокколи на гриле с перечным соусом", uz: "Qalampir sousli grill brokkoli", en: "Grilled broccoli with pepper sauce", price: 53000 },
      { ru: "Овощи гриль", uz: "Grill sabzavotlar", en: "Grilled vegetables", price: 65000 },
      { ru: "Кукуруза на гриле", uz: "Grilda pishirilgan makkajo'xori", en: "Grilled corn", price: 53000 },
      { ru: "Картофельные дольки", uz: "Kartoshka bo'laklari", en: "Potato wedges", price: 39000 },
      { ru: "Картофельное пюре с трюфельным маслом", uz: "Tryufel yog'i bilan kartoshka pyuresi", en: "Mashed potatoes with truffle oil", price: 39000 },
      { ru: "Фри с пармезаном", uz: "Parmezanli fri", en: "Fries with parmesan", price: 35000 },
      { ru: "Картофель с грибами и сметаной", uz: "Qo'ziqorin va smetana bilan kartoshka", en: "Potatoes with mushrooms and sour cream", price: 53000 },
    ],
  },
  {
    slug: "deserti",
    ru: "Десерты",
    uz: "Desertlar",
    en: "Desserts",
    items: [
      { ru: "Тирамису", uz: "Tiramisu", en: "Tiramisu", price: 84000 },
      { ru: "Чуррос", uz: "Churros", en: "Churros", price: 45000 },
      { ru: "Сан Себастьян", uz: "San Sebastyan cheesecake", en: "San Sebastian cheesecake", price: 85000 },
      { ru: "Шоколадный фондан", uz: "Shokoladli fondan", en: "Chocolate fondant", price: 64000 },
      { ru: "Наполеон", uz: "Napoleon", en: "Napoleon cake", price: 65000 },
      { ru: "Банановый пирог", uz: "Banan pirogi", en: "Banana pie", price: 65000 },
      { ru: "Грушевый пирог", uz: "Nok pirogi", en: "Pear pie", price: 88000 },
      { ru: "Тарт ванильный с ягодами", uz: "Rezavorli vanilli tart", en: "Vanilla berry tart", price: 85000 },
      { ru: "Медовик с сорбетом из манго", uz: "Mango sorbeti bilan medovik", en: "Honey cake with mango sorbet", price: 62000 },
    ],
  },
  {
    slug: "detskoe-menyu",
    ru: "Детское меню",
    uz: "Bolalar menyusi",
    en: "Kids menu",
    items: [
      { ru: "Десерт «Мишка»", uz: "«Ayiqcha» deserti", en: "“Little Bear” dessert", price: 34000 },
      { ru: "Куриный супчик с фрикадельками", uz: "Frikadelkali tovuq sho'rvasi", en: "Chicken soup with meatballs", price: 33000 },
      { ru: "Куриные котлетки с пюрешкой", uz: "Pyurechka bilan tovuq kotletchalari", en: "Chicken cutlets with mashed potato", price: 52000 },
      { ru: "Паста-бантики с курочкой", uz: "Tovuqli bantik-pasta", en: "Bowtie pasta with chicken", price: 49000 },
      { ru: "Овощные палочки", uz: "Sabzavot tayoqchalari", en: "Vegetable sticks", price: 38000 },
      { ru: "Салатик со сметаной", uz: "Smetanali salatcha", en: "Salad with sour cream", price: 36000 },
    ],
  },
];

const events = [
  {
    titleRu: "Tinto de Verano — каждый четверг",
    titleUz: "Tinto de Verano — har payshanba",
    titleEn: "Tinto de Verano — every Thursday",
    descriptionRu: "Летний испанский коктейль дня и особая атмосфера каждый четверг вечером.",
    descriptionUz: "Yozgi ispan kokteyli va har payshanba kechqurun o'ziga xos muhit.",
    descriptionEn: "A summer Spanish cocktail of the day and a special atmosphere every Thursday evening.",
    order: 1,
  },
  {
    titleRu: "Ужин в 4 руки",
    titleUz: "“4 qo'l” kechki ovqati",
    titleEn: "Four-hands dinner",
    descriptionRu: "Путешествие по Шёлковому пути от Ташкента до Испании — совместный ужин приглашённого шеф-повара и команды Quadro.",
    descriptionUz: "Toshkentdan Ispaniyagacha Ipak yo'li bo'ylab sayohat — taklif qilingan shef-повар va Quadro jamoasining hamkorlikdagi kechki ovqati.",
    descriptionEn: "A journey along the Silk Road from Tashkent to Spain — a collaborative dinner with a guest chef and the Quadro team.",
    order: 2,
  },
];

async function main() {
  console.log("Seeding database...");

  await prisma.menuItem.deleteMany();
  await prisma.menuCategory.deleteMany();
  await prisma.event.deleteMany();
  await prisma.galleryImage.deleteMany();

  for (const [catIndex, category] of categories.entries()) {
    const createdCategory = await prisma.menuCategory.create({
      data: {
        slug: category.slug,
        nameRu: category.ru,
        nameUz: category.uz,
        nameEn: category.en,
        order: catIndex,
      },
    });

    for (const [itemIndex, item] of category.items.entries()) {
      await prisma.menuItem.create({
        data: {
          categoryId: createdCategory.id,
          nameRu: item.ru,
          nameUz: item.uz,
          nameEn: item.en,
          priceSum: item.price,
          unit: item.unit,
          order: itemIndex,
        },
      });
    }
  }

  for (const [index, event] of events.entries()) {
    await prisma.event.create({
      data: { ...event, order: index },
    });
  }

  const galleryImages = [
    { imageUrl: "/images/mirrors-lounge.jpg", category: "interer" },
    { imageUrl: "/images/dining-shelves.jpg", category: "interer" },
    { imageUrl: "/images/dining-window.jpg", category: "interer" },
    { imageUrl: "/images/lounge-statue.jpg", category: "interer" },
    { imageUrl: "/images/mezze-bowls.jpg", category: "blyuda" },
    { imageUrl: "/images/mezze-spread.jpg", category: "blyuda" },
    { imageUrl: "/images/mezze-scoop.jpg", category: "blyuda" },
    { imageUrl: "/images/steak-closeup.jpg", category: "blyuda" },
    { imageUrl: "/images/beef-skewer-salad.jpg", category: "blyuda" },
    { imageUrl: "/images/dessert-berries.jpg", category: "blyuda" },
    { imageUrl: "/images/dessert-coffee.jpg", category: "blyuda" },
    { imageUrl: "/images/bar-display.jpg", category: "bar" },
    { imageUrl: "/images/steak-wine.jpg", category: "bar" },
  ];

  for (const [index, image] of galleryImages.entries()) {
    await prisma.galleryImage.create({
      data: {
        imageUrl: image.imageUrl,
        category: image.category,
        order: index,
      },
    });
  }

  const categoryCount = await prisma.menuCategory.count();
  const itemCount = await prisma.menuItem.count();
  console.log(`Seeded ${categoryCount} categories and ${itemCount} menu items.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
