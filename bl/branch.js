const fs = require("fs");
const path = require("path");
const moment = require("moment");

exports.listTopBranches = async () => {
    await makeBranchData();
    return _branches
        .map((branch, i) => {
            const sales = flatSales(branch.Sales);
            const Amount = sales.map(o => o.Amount).reduce((a, b) => a + b);
            const Products = sales.map(o => o.Quantity).reduce((a, b) => a + b);
            return {
                ID: branch.ID,
                Name: branch.Name,
                Cashiers: branch.Cashiers,
                Employees: branch.Employees,
                Amount,
                Products,
                Rank: i + 1
            };
        })
        .sort((a, b) => b.Amount - a.Amount)
        .filter((_, i) => i < 8);
};

exports.getGlobalData = async () => {
    await makeBranchData();
    const buckets = [];
    for (let branch of _branches) {
        buckets.push(
            ...flatSales(branch.Sales).map(o => ({
                bucket: dateToBucket(o.Date),
                amount: o.Amount,
                quantity: o.Quantity,
                category: o.Product.Category.Name,
                product: o.Product.Name
            }))
        );
    }
    const timeline = getAllBuckets().map(bucket => ({
        Date: bucketToDate(bucket),
        Amount: buckets
            .filter(o => o.bucket == bucket)
            .map(o => o.amount)
            .reduce((a, b) => a + b, 0)
    }));
    const TimeLine = timeline.map((o, i) => {
        const prev = timeline.filter((_, j) => j >= i - 2 && j < i + 2).map(p => p.Amount);
        o.Avg = prev.length ? prev.reduce((a, b) => a + b, 0) / prev.length : 0;
        o.Min = o.Avg * 0.8;
        o.Max = o.Avg * 1.2;
        return o;
    });

    const TopCategory = [...new Set(buckets.map(o => o.category))]
        .map(o => ({
            Category: o,
            Amount: buckets
                .filter(b => b.category == o)
                .map(b => b.amount)
                .reduce((a, b) => a + b)
        }))
        .sort((a, b) => b.Amount - a.Amount)
        .filter((_, i) => i < 10);
    const TopProduct = [...new Set(buckets.map(o => o.product))]
        .map(o => ({
            Product: o,
            Amount: buckets
                .filter(b => b.product == o)
                .map(b => b.amount)
                .reduce((a, b) => a + b)
        }))
        .sort((a, b) => b.Amount - a.Amount)
        .filter((_, i) => i < 10);
    const amount = TimeLine.map(o => o.Amount).reduce((a, b) => a + b);
    const num_stores = _branch_list.length;
    const prod_sold = buckets.map(o => o.quantity).reduce((a, b) => a + b);
    return { TimeLine, TopCategory, TopProduct, amount, num_stores, prod_sold };
};

exports.getBranch = async id => {
    await makeBranchData();
    const branch = _branches.find(o => o.ID == id);
    const sales = flatSales(branch.Sales);
    const Amount = sales.map(o => o.Amount).reduce((a, b) => a + b);
    return { ID: branch.ID, Name: branch.Name, Amount: Amount };
};

exports.getBranchData = async id => {
    stopwatch.start();
    await makeBranchData();
    const branch = _branches.find(o => o.ID == id);
    const buckets = flatSales(branch.Sales).map(o => ({
        bucket: dateToBucket(o.Date),
        amount: o.Amount,
        category: o.Product.Category.Name,
        product: o.Product.Name
    }));
    const timeline = getAllBuckets().map(bucket => ({
        Date: bucketToDate(bucket),
        Amount: buckets
            .filter(o => o.bucket == bucket)
            .map(o => o.amount)
            .reduce((a, b) => a + b, 0)
    }));
    const TimeLine = timeline.map((o, i) => {
        const prev = timeline.filter((_, j) => j >= i - 2 && j < i + 2).map(p => p.Amount);
        o.Avg = prev.length ? prev.reduce((a, b) => a + b, 0) / prev.length : 0;
        o.Min = o.Avg * 0.8;
        o.Max = o.Avg * 1.2;
        return o;
    });
    const TopCategory = [...new Set(buckets.map(o => o.category))]
        .map(o => ({
            Category: o,
            Amount: buckets
                .filter(b => b.category == o)
                .map(b => b.amount)
                .reduce((a, b) => a + b)
        }))
        .sort((a, b) => b.Amount - a.Amount)
        .filter((_, i) => i < 10);
    const TopProduct = [...new Set(buckets.map(o => o.product))]
        .map(o => ({
            Product: o,
            Amount: buckets
                .filter(b => b.product == o)
                .map(b => b.amount)
                .reduce((a, b) => a + b)
        }))
        .sort((a, b) => b.Amount - a.Amount)
        .filter((_, i) => i < 10);
    stopwatch.lap("getBranchData " + id);
    return {
        Branch: branch.Name,
        TimeLine,
        TopCategory,
        TopProduct
    };
};

const stopwatch = {
    t0: new Date(),
    start: () => {
        t0 = new Date();
    },
    lap: text => {
        console.log(text, new Date().valueOf() - t0.valueOf());
    }
};

function flatSales(sales, sofar = true) {
    const now = new Date();
    return sales
        .flatMap(o => o.Items.map(item => Object.assign({ Date: o.Date }, item)))
        .filter(o => (sofar ? o.Date <= now : true));
}

let _branches, _products;

async function makeBranchData() {
    if (_branches) return;
    _categories = _categoriesList;
    _products = _productsList.map(o => {
        o.Category = _categories.find(p => p.ID == o.CategoryID);
        delete o.CategoryID;
        return o;
    });
    // _branches = readBranchData();
    // if (_branches) return;
    const branches = _branch_list;
    _branches = branches.map((branch, i) => {
        const Sales = generateSales(branch);
        console.log(branch.Name, `${i} / ${branches.length}`, pct(i / branches.length));
        return {
            ID: branch.ID,
            Name: branch.Name,
            Cashiers: branch.cashiers,
            Employees: branch.employees,
            Sales
        };
    });
    // saveBranchData();
}

const _branch_list = [
    "Acoxpa",
    "Av. Toluca",
    "Axomiatla",
    "Bosques De Las Lomas",
    "Calzada De Los Leones",
    "Churubusco",
    "Copilco",
    "Coyoacan",
    "Del Valle",
    "Del Valle Norte",
    "División Del Norte",
    "Felix Cuevas",
    "Fuentes Del Pedregal",
    "Georgia",
    "Girasoles",
    "Grand Polanco",
    "Homero",
    "Horacio",
    "Indiana",
    "Insurgentes La Joya",
    "Jardines Del Pedregal",
    "Jardines En La Montaña",
    "Lilas",
    "Lindavista",
    "Los Morales",
    "Luis Cabrera",
    "Mayorazgo",
    "Michoacán",
    "Narvarte",
    "Oliplaza",
    "Pachuca",
    "Parques Polanco",
    "Paseos De Taxqueña",
    "Patio Pedregal",
    "Pedregal",
    "Periferico",
    "Popocatepetl",
    "Revolución",
    "Rio Churubusco",
    "Santa Fe",
    "Sena",
    "Virreyes",
    "Vista Hermosa",
    "Wtc Dakota"
].map((o, i) => ({ ID: i + 1, Name: o }));

const _branchFile = "data/branchdata";

function readBranchData() {
    const files = fs.readdirSync("data/").filter(o => /branchdata_\d+\.json$/.test(o));
    if (files.length == 0) return null;
    return files.map(o => JSON.parse(fs.readFileSync(path.join("data", o)).toString()));
}

function saveBranchData() {
    for (let i = 0; i < _branches.length; i++) {
        fs.writeFileSync(`${_branchFile}_${i}.json`, JSON.stringify(_branches[i]));
    }
}

function pct(value, digits) {
    return (
        new Intl.NumberFormat("es-MX", {
            minimumFractionDigits: digits,
            maximumFractionDigits: digits
        }).format(value * 100) + "%"
    );
}

const BUCKET_SIZE = 15;

function dateToBucket(date) {
    return Math.floor((date.getHours() * 60 + date.getMinutes()) / BUCKET_SIZE);
}

function bucketToDate(bucket) {
    const d = new Date();
    const m = bucket * BUCKET_SIZE;
    return new Date(d.getFullYear(), d.getMonth(), d.getDate(), Math.floor(m / 60), m % 60, 0);
}

function getAllBuckets() {
    return new Array((24 * 60) / BUCKET_SIZE).fill().map((_, i) => i);
}

function generateSales(branch) {
    branch.cashiers = randi(10, 20);
    branch.employees = randi(350, 400);
    const sales = [];
    for (let c = 0; c < branch.cashiers; c++) {
        let date = moment().startOf("day").set("hour", 7);
        while (date.get("hour") < 23) {
            date.add("minute", rand(1, 20));
            sales.push({
                CashierID: c,
                Date: date.toDate(),
                Items: new Array(randi(1, 20)).fill().map((_, i) => {
                    const Product = randa(_products);
                    const Quantity = Product.Fractional ? rand(0.1, Product.MaxItems) : randi(1, Product.MaxItems);
                    return {
                        Product,
                        Quantity,
                        Amount: Product.Price * Quantity
                    };
                })
            });
        }
    }
    return sales;
}

function rand(a, b) {
    return Math.random() * (b - a) + a;
}

function randi(a, b) {
    return Math.round(rand(a, b));
}

function randa(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

var _categoriesList = [
    {
      "ID": 1,
      "Name": "Abarrotes"
    },
    {
      "ID": 2,
      "Name": "Lácteos"
    },
    {
      "ID": 3,
      "Name": "Frutas y Verduras"
    },
    {
      "ID": 4,
      "Name": "Carnes, Pescados y Mariscos"
    },
    {
      "ID": 5,
      "Name": "Salchichonería"
    },
    {
      "ID": 6,
      "Name": "Panadería y Tortillería"
    },
    {
      "ID": 7,
      "Name": "Bebidas y Licores"
    },
    {
      "ID": 8,
      "Name": "Congelados"
    },
    {
      "ID": 9,
      "Name": "Limpieza para el Hogar"
    },
    {
      "ID": 10,
      "Name": "Cuidado de la Ropa"
    },
    {
      "ID": 11,
      "Name": "Mascotas"
    },
    {
      "ID": 12,
      "Name": "Bebés"
    },
    {
      "ID": 13,
      "Name": "Farmacia"
    },
    {
      "ID": 14,
      "Name": "Higiene y Belleza"
    },
    {
      "ID": 15,
      "Name": "Electrónica"
    },
    {
      "ID": 16,
      "Name": "Artículos para el Hogar y autos"
    },
    {
      "ID": 17,
      "Name": "Ropa y Zapatería"
    },
    {
      "ID": 18,
      "Name": "Juguetería y Deportes"
    }
  ];
var _productsList = [
    {
      "ID": 1,
      "Name": "Café, Té y Sustitutos",
      "CategoryID": 1,
      "Price": 50,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 2,
      "Name": "Pan y Tortillas Empacados",
      "CategoryID": 1,
      "Price": 20,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 3,
      "Name": "Cereales y Barras",
      "CategoryID": 1,
      "Price": 60,
      "MaxItems": 4,
      "Fractional": 0
    },
    {
      "ID": 4,
      "Name": "Galletas",
      "CategoryID": 1,
      "Price": 30,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 5,
      "Name": "Enlatados y Conservas",
      "CategoryID": 1,
      "Price": 40,
      "MaxItems": 10,
      "Fractional": 0
    },
    {
      "ID": 6,
      "Name": "Azúcar y Postres",
      "CategoryID": 1,
      "Price": 30,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 7,
      "Name": "Mermeladas y Miel",
      "CategoryID": 1,
      "Price": 50,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 8,
      "Name": "Dulces y Chocolates",
      "CategoryID": 1,
      "Price": 30,
      "MaxItems": 1,
      "Fractional": 0
    },
    {
      "ID": 9,
      "Name": "Botanas y Fruta Seca",
      "CategoryID": 1,
      "Price": 60,
      "MaxItems": 4,
      "Fractional": 0
    },
    {
      "ID": 10,
      "Name": "Salsas, Aderezos y Vinagre",
      "CategoryID": 1,
      "Price": 30,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 11,
      "Name": "Pastas",
      "CategoryID": 1,
      "Price": 5,
      "MaxItems": 10,
      "Fractional": 0
    },
    {
      "ID": 12,
      "Name": "Harina y Repostería",
      "CategoryID": 1,
      "Price": 20,
      "MaxItems": 5,
      "Fractional": 0
    },
    {
      "ID": 13,
      "Name": "Saborizantes y Jarabes",
      "CategoryID": 1,
      "Price": 4,
      "MaxItems": 20,
      "Fractional": 0
    },
    {
      "ID": 14,
      "Name": "Arroz, Frijol y Semillas",
      "CategoryID": 1,
      "Price": 25,
      "MaxItems": 3,
      "Fractional": 0
    },
    {
      "ID": 15,
      "Name": "Sal, Especias y Sazonadores",
      "CategoryID": 1,
      "Price": 15,
      "MaxItems": 5,
      "Fractional": 0
    },
    {
      "ID": 16,
      "Name": "Alimentos Instantáneos",
      "CategoryID": 1,
      "Price": 80,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 17,
      "Name": "Comida Oriental",
      "CategoryID": 1,
      "Price": 70,
      "MaxItems": 3,
      "Fractional": 0
    },
    {
      "ID": 18,
      "Name": "Alimentos Saludables",
      "CategoryID": 1,
      "Price": 40,
      "MaxItems": 4,
      "Fractional": 0
    },
    {
      "ID": 19,
      "Name": "Aceites de Cocina",
      "CategoryID": 1,
      "Price": 30,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 20,
      "Name": "Accesorios para cocina",
      "CategoryID": 16,
      "Price": 50,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 21,
      "Name": "Accesorios para mesa",
      "CategoryID": 16,
      "Price": 200,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 22,
      "Name": "Artículos de temporada",
      "CategoryID": 16,
      "Price": 100,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 23,
      "Name": "Artículos deportivos",
      "CategoryID": 16,
      "Price": 400,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 24,
      "Name": "Colchones y Blancos",
      "CategoryID": 16,
      "Price": 1500,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 25,
      "Name": "Decoración y Muebles",
      "CategoryID": 16,
      "Price": 1500,
      "MaxItems": 1,
      "Fractional": 0
    },
    {
      "ID": 26,
      "Name": "Ferretería y Pinturas",
      "CategoryID": 16,
      "Price": 100,
      "MaxItems": 5,
      "Fractional": 0
    },
    {
      "ID": 27,
      "Name": "Jardineria y exteriores",
      "CategoryID": 16,
      "Price": 50,
      "MaxItems": 4,
      "Fractional": 0
    },
    {
      "ID": 28,
      "Name": "Línea Blanca",
      "CategoryID": 16,
      "Price": 5000,
      "MaxItems": 1,
      "Fractional": 0
    },
    {
      "ID": 29,
      "Name": "Organización y Almacenamiento",
      "CategoryID": 16,
      "Price": 150,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 30,
      "Name": "Papelería",
      "CategoryID": 16,
      "Price": 40,
      "MaxItems": 10,
      "Fractional": 0
    },
    {
      "ID": 31,
      "Name": "Electrodomésticos",
      "CategoryID": 16,
      "Price": 500,
      "MaxItems": 1,
      "Fractional": 0
    },
    {
      "ID": 32,
      "Name": "Libros y Revistas",
      "CategoryID": 16,
      "Price": 60,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 33,
      "Name": "Autos y Motos",
      "CategoryID": 16,
      "Price": 200,
      "MaxItems": 1,
      "Fractional": 0
    },
    {
      "ID": 34,
      "Name": "Pañales y toallitas húmedas para bebé",
      "CategoryID": 12,
      "Price": 99,
      "MaxItems": 5,
      "Fractional": 0
    },
    {
      "ID": 35,
      "Name": "Juguetes para bebé y estimulación temprana",
      "CategoryID": 12,
      "Price": 184,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 36,
      "Name": "Higiene del bebé",
      "CategoryID": 12,
      "Price": 158,
      "MaxItems": 3,
      "Fractional": 0
    },
    {
      "ID": 37,
      "Name": "Fórmula láctea",
      "CategoryID": 12,
      "Price": 115,
      "MaxItems": 4,
      "Fractional": 0
    },
    {
      "ID": 38,
      "Name": "Leche de Crecimiento",
      "CategoryID": 12,
      "Price": 129,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 39,
      "Name": "Comida para bebé y lactancia",
      "CategoryID": 12,
      "Price": 154,
      "MaxItems": 5,
      "Fractional": 0
    },
    {
      "ID": 40,
      "Name": "Artículos para fiesta",
      "CategoryID": 12,
      "Price": 55,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 41,
      "Name": "Ropa para bebé",
      "CategoryID": 12,
      "Price": 130,
      "MaxItems": 4,
      "Fractional": 0
    },
    {
      "ID": 42,
      "Name": "Cunas, carriolas y accesorios",
      "CategoryID": 12,
      "Price": 165,
      "MaxItems": 1,
      "Fractional": 0
    },
    {
      "ID": 43,
      "Name": "Cervezas",
      "CategoryID": 7,
      "Price": 245,
      "MaxItems": 6,
      "Fractional": 0
    },
    {
      "ID": 44,
      "Name": "Coolers",
      "CategoryID": 7,
      "Price": 188,
      "MaxItems": 6,
      "Fractional": 0
    },
    {
      "ID": 45,
      "Name": "Licores Digestivos",
      "CategoryID": 7,
      "Price": 194,
      "MaxItems": 6,
      "Fractional": 0
    },
    {
      "ID": 46,
      "Name": "Licores",
      "CategoryID": 7,
      "Price": 203,
      "MaxItems": 6,
      "Fractional": 0
    },
    {
      "ID": 47,
      "Name": "Vinos",
      "CategoryID": 7,
      "Price": 145,
      "MaxItems": 6,
      "Fractional": 0
    },
    {
      "ID": 48,
      "Name": "Agua",
      "CategoryID": 7,
      "Price": 115,
      "MaxItems": 6,
      "Fractional": 0
    },
    {
      "ID": 49,
      "Name": "Energizantes e Hidratantes",
      "CategoryID": 7,
      "Price": 90,
      "MaxItems": 6,
      "Fractional": 0
    },
    {
      "ID": 50,
      "Name": "Café y Té Preparado",
      "CategoryID": 7,
      "Price": 61,
      "MaxItems": 6,
      "Fractional": 0
    },
    {
      "ID": 51,
      "Name": "Jugos y Néctares",
      "CategoryID": 7,
      "Price": 89,
      "MaxItems": 6,
      "Fractional": 0
    },
    {
      "ID": 52,
      "Name": "Polvos y Jarabes",
      "CategoryID": 7,
      "Price": 216,
      "MaxItems": 6,
      "Fractional": 0
    },
    {
      "ID": 53,
      "Name": "Refrescos",
      "CategoryID": 7,
      "Price": 100,
      "MaxItems": 6,
      "Fractional": 0
    },
    {
      "ID": 54,
      "Name": "Pollo y Pavo",
      "CategoryID": 4,
      "Price": 69,
      "MaxItems": 5,
      "Fractional": 1
    },
    {
      "ID": 55,
      "Name": "Cerdo",
      "CategoryID": 4,
      "Price": 231,
      "MaxItems": 5,
      "Fractional": 1
    },
    {
      "ID": 56,
      "Name": "Pescados y Mariscos",
      "CategoryID": 4,
      "Price": 224,
      "MaxItems": 5,
      "Fractional": 1
    },
    {
      "ID": 57,
      "Name": "Res",
      "CategoryID": 4,
      "Price": 246,
      "MaxItems": 5,
      "Fractional": 1
    },
    {
      "ID": 58,
      "Name": "Sushi",
      "CategoryID": 4,
      "Price": 67,
      "MaxItems": 4,
      "Fractional": 0
    },
    {
      "ID": 59,
      "Name": "Comida Fácil",
      "CategoryID": 8,
      "Price": 209,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 60,
      "Name": "Frutas y Verduras Congeladas",
      "CategoryID": 8,
      "Price": 135,
      "MaxItems": 4,
      "Fractional": 0
    },
    {
      "ID": 61,
      "Name": "Hielo",
      "CategoryID": 8,
      "Price": 154,
      "MaxItems": 3,
      "Fractional": 0
    },
    {
      "ID": 62,
      "Name": "Postres Congelados",
      "CategoryID": 8,
      "Price": 183,
      "MaxItems": 6,
      "Fractional": 0
    },
    {
      "ID": 63,
      "Name": "Cloro",
      "CategoryID": 10,
      "Price": 231,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 64,
      "Name": "Detergente",
      "CategoryID": 10,
      "Price": 126,
      "MaxItems": 3,
      "Fractional": 0
    },
    {
      "ID": 65,
      "Name": "Pre-lavadores y quitamanchas para ropa",
      "CategoryID": 10,
      "Price": 235,
      "MaxItems": 1,
      "Fractional": 0
    },
    {
      "ID": 66,
      "Name": "Suavizantes, Almidón y colorantes",
      "CategoryID": 10,
      "Price": 232,
      "MaxItems": 6,
      "Fractional": 0
    },
    {
      "ID": 67,
      "Name": "Televisores",
      "CategoryID": 15,
      "Price": 10000,
      "MaxItems": 1,
      "Fractional": 0
    },
    {
      "ID": 68,
      "Name": "Telefonía",
      "CategoryID": 15,
      "Price": 5000,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 69,
      "Name": "Computación",
      "CategoryID": 15,
      "Price": 8000,
      "MaxItems": 1,
      "Fractional": 0
    },
    {
      "ID": 70,
      "Name": "Videojuegos",
      "CategoryID": 15,
      "Price": 500,
      "MaxItems": 1,
      "Fractional": 0
    },
    {
      "ID": 71,
      "Name": "Audio",
      "CategoryID": 15,
      "Price": 1000,
      "MaxItems": 1,
      "Fractional": 0
    },
    {
      "ID": 72,
      "Name": "Fotografía",
      "CategoryID": 15,
      "Price": 862,
      "MaxItems": 1,
      "Fractional": 0
    },
    {
      "ID": 73,
      "Name": "Vitaminas y Suplementos",
      "CategoryID": 13,
      "Price": 952,
      "MaxItems": 1,
      "Fractional": 0
    },
    {
      "ID": 74,
      "Name": "Cuidado Personal",
      "CategoryID": 13,
      "Price": 21,
      "MaxItems": 1,
      "Fractional": 0
    },
    {
      "ID": 75,
      "Name": "Estomacales",
      "CategoryID": 13,
      "Price": 20,
      "MaxItems": 1,
      "Fractional": 0
    },
    {
      "ID": 76,
      "Name": "Material de Curación",
      "CategoryID": 13,
      "Price": 662,
      "MaxItems": 1,
      "Fractional": 0
    },
    {
      "ID": 77,
      "Name": "Incontinencia",
      "CategoryID": 13,
      "Price": 160,
      "MaxItems": 1,
      "Fractional": 0
    },
    {
      "ID": 78,
      "Name": "Analgésicos",
      "CategoryID": 13,
      "Price": 445,
      "MaxItems": 1,
      "Fractional": 0
    },
    {
      "ID": 79,
      "Name": "Bienestar Sexual",
      "CategoryID": 13,
      "Price": 242,
      "MaxItems": 1,
      "Fractional": 0
    },
    {
      "ID": 80,
      "Name": "Medicamentos Genéricos",
      "CategoryID": 13,
      "Price": 528,
      "MaxItems": 1,
      "Fractional": 0
    },
    {
      "ID": 81,
      "Name": "Medicamentos de Patente",
      "CategoryID": 13,
      "Price": 839,
      "MaxItems": 1,
      "Fractional": 0
    },
    {
      "ID": 82,
      "Name": "Respiratorios",
      "CategoryID": 13,
      "Price": 156,
      "MaxItems": 1,
      "Fractional": 0
    },
    {
      "ID": 83,
      "Name": "Oftálmicos y Oticos",
      "CategoryID": 13,
      "Price": 70,
      "MaxItems": 1,
      "Fractional": 0
    },
    {
      "ID": 84,
      "Name": "Medicamentos de Alta Especialidad",
      "CategoryID": 13,
      "Price": 952,
      "MaxItems": 1,
      "Fractional": 0
    },
    {
      "ID": 85,
      "Name": "Ortopedia y Equipos de Medición",
      "CategoryID": 13,
      "Price": 120,
      "MaxItems": 1,
      "Fractional": 0
    },
    {
      "ID": 86,
      "Name": "Dieta",
      "CategoryID": 13,
      "Price": 203,
      "MaxItems": 1,
      "Fractional": 0
    },
    {
      "ID": 87,
      "Name": "Naturistas y Herbolarios",
      "CategoryID": 13,
      "Price": 618,
      "MaxItems": 1,
      "Fractional": 0
    },
    {
      "ID": 88,
      "Name": "Nutrición Deportiva",
      "CategoryID": 13,
      "Price": 571,
      "MaxItems": 1,
      "Fractional": 0
    },
    {
      "ID": 89,
      "Name": "Cuidado de los Pies",
      "CategoryID": 13,
      "Price": 97,
      "MaxItems": 1,
      "Fractional": 0
    },
    {
      "ID": 90,
      "Name": "Diabetes",
      "CategoryID": 13,
      "Price": 197,
      "MaxItems": 1,
      "Fractional": 0
    },
    {
      "ID": 91,
      "Name": "Medicamentos Infantiles",
      "CategoryID": 13,
      "Price": 85,
      "MaxItems": 1,
      "Fractional": 0
    },
    {
      "ID": 92,
      "Name": "Membresías de salud",
      "CategoryID": 13,
      "Price": 40,
      "MaxItems": 1,
      "Fractional": 0
    },
    {
      "ID": 93,
      "Name": "Frutas",
      "CategoryID": 3,
      "Price": 50,
      "MaxItems": 5,
      "Fractional": 1
    },
    {
      "ID": 94,
      "Name": "Verduras",
      "CategoryID": 3,
      "Price": 20,
      "MaxItems": 5,
      "Fractional": 1
    },
    {
      "ID": 95,
      "Name": "Orgánicos y Superfoods",
      "CategoryID": 3,
      "Price": 70,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 96,
      "Name": "Afeitado y Depilación",
      "CategoryID": 14,
      "Price": 49,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 97,
      "Name": "Cuidado bucal",
      "CategoryID": 14,
      "Price": 8,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 98,
      "Name": "Cuidado Facial",
      "CategoryID": 14,
      "Price": 61,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 99,
      "Name": "Cosméticos",
      "CategoryID": 14,
      "Price": 8,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 100,
      "Name": "Cuidado del cabello",
      "CategoryID": 14,
      "Price": 52,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 101,
      "Name": "Higiene y cuidado corporal",
      "CategoryID": 14,
      "Price": 49,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 102,
      "Name": "Higiene y cuidado para manos",
      "CategoryID": 14,
      "Price": 29,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 103,
      "Name": "Cuidado para pies",
      "CategoryID": 14,
      "Price": 53,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 104,
      "Name": "Pañuelos desechables",
      "CategoryID": 14,
      "Price": 93,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 105,
      "Name": "Cuidado femenino",
      "CategoryID": 14,
      "Price": 47,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 106,
      "Name": "Kits de viaje",
      "CategoryID": 14,
      "Price": 44,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 107,
      "Name": "Higiene masculina",
      "CategoryID": 14,
      "Price": 28,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 108,
      "Name": "Accesorios de Moda",
      "CategoryID": 14,
      "Price": 99,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 109,
      "Name": "Desmaquillantes y quitaesmaltes",
      "CategoryID": 14,
      "Price": 29,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 110,
      "Name": "Crema corporal y de manos",
      "CategoryID": 14,
      "Price": 52,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 111,
      "Name": "Desodorantes para hombre y mujer",
      "CategoryID": 14,
      "Price": 91,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 112,
      "Name": "Productos destacados",
      "CategoryID": 14,
      "Price": 7,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 113,
      "Name": "Juguetes para bebé y estimulación temprana",
      "CategoryID": 18,
      "Price": 8,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 114,
      "Name": "Muñecas y Accesorios",
      "CategoryID": 18,
      "Price": 71,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 115,
      "Name": "Figuras de Acción",
      "CategoryID": 18,
      "Price": 80,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 116,
      "Name": "Juegos de Mesa y Rompecabezas",
      "CategoryID": 18,
      "Price": 49,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 117,
      "Name": "Peluches y Electrónicos",
      "CategoryID": 18,
      "Price": 9,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 118,
      "Name": "Lanzadores",
      "CategoryID": 18,
      "Price": 18,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 119,
      "Name": "Triciclos y Montables",
      "CategoryID": 18,
      "Price": 15,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 120,
      "Name": "Aparatos de Ejercicio y Fitness",
      "CategoryID": 18,
      "Price": 59,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 121,
      "Name": "Campismo",
      "CategoryID": 18,
      "Price": 14,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 122,
      "Name": "Deportes Acuáticos",
      "CategoryID": 18,
      "Price": 11,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 123,
      "Name": "Deportes Individuales y en Equipo",
      "CategoryID": 18,
      "Price": 58,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 124,
      "Name": "Juegos Recreativos",
      "CategoryID": 18,
      "Price": 82,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 125,
      "Name": "Bicicletas",
      "CategoryID": 18,
      "Price": 14,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 126,
      "Name": "Juegos para Exterior y Albercas",
      "CategoryID": 18,
      "Price": 59,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 127,
      "Name": "Juegos de Ciencia y Creatividad",
      "CategoryID": 18,
      "Price": 87,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 128,
      "Name": "Vehículos y Autopistas",
      "CategoryID": 18,
      "Price": 63,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 129,
      "Name": "Juguetes de Construcción",
      "CategoryID": 18,
      "Price": 65,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 130,
      "Name": "Leche",
      "CategoryID": 2,
      "Price": 20,
      "MaxItems": 4,
      "Fractional": 0
    },
    {
      "ID": 131,
      "Name": "Yogurt",
      "CategoryID": 2,
      "Price": 80,
      "MaxItems": 10,
      "Fractional": 0
    },
    {
      "ID": 132,
      "Name": "Gelatinas y Postres",
      "CategoryID": 2,
      "Price": 84,
      "MaxItems": 10,
      "Fractional": 0
    },
    {
      "ID": 133,
      "Name": "Mantequilla y margarina",
      "CategoryID": 2,
      "Price": 29,
      "MaxItems": 6,
      "Fractional": 0
    },
    {
      "ID": 134,
      "Name": "Huevo",
      "CategoryID": 2,
      "Price": 60,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 135,
      "Name": "Crema",
      "CategoryID": 2,
      "Price": 64,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 136,
      "Name": "Quesos",
      "CategoryID": 2,
      "Price": 65,
      "MaxItems": 4,
      "Fractional": 0
    },
    {
      "ID": 137,
      "Name": "Alimento Líquido",
      "CategoryID": 2,
      "Price": 76,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 138,
      "Name": "Quesos Gourmet",
      "CategoryID": 2,
      "Price": 99,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 139,
      "Name": "Accesorios para Limpieza",
      "CategoryID": 9,
      "Price": 35,
      "MaxItems": 6,
      "Fractional": 0
    },
    {
      "ID": 140,
      "Name": "Desechables",
      "CategoryID": 9,
      "Price": 91,
      "MaxItems": 4,
      "Fractional": 0
    },
    {
      "ID": 141,
      "Name": "Aromatizantes",
      "CategoryID": 9,
      "Price": 40,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 142,
      "Name": "Lavatrastes y lavavajillas",
      "CategoryID": 9,
      "Price": 57,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 143,
      "Name": "Limpieza del hogar",
      "CategoryID": 9,
      "Price": 18,
      "MaxItems": 5,
      "Fractional": 0
    },
    {
      "ID": 144,
      "Name": "Papel higiénico",
      "CategoryID": 9,
      "Price": 5,
      "MaxItems": 4,
      "Fractional": 0
    },
    {
      "ID": 145,
      "Name": "Desinfectantes",
      "CategoryID": 9,
      "Price": 14,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 146,
      "Name": "Insecticidas y Trampas",
      "CategoryID": 9,
      "Price": 49,
      "MaxItems": 1,
      "Fractional": 0
    },
    {
      "ID": 147,
      "Name": "Alimento para Perros",
      "CategoryID": 11,
      "Price": 39,
      "MaxItems": 1,
      "Fractional": 0
    },
    {
      "ID": 148,
      "Name": "Arenas y Accesorios Gatos",
      "CategoryID": 11,
      "Price": 89,
      "MaxItems": 1,
      "Fractional": 0
    },
    {
      "ID": 149,
      "Name": "Alimento y accesorios otras mascotas",
      "CategoryID": 11,
      "Price": 86,
      "MaxItems": 1,
      "Fractional": 0
    },
    {
      "ID": 150,
      "Name": "Accesorios e Higiene Perros",
      "CategoryID": 11,
      "Price": 17,
      "MaxItems": 1,
      "Fractional": 0
    },
    {
      "ID": 151,
      "Name": "Alimento para Gatos",
      "CategoryID": 11,
      "Price": 75,
      "MaxItems": 1,
      "Fractional": 0
    },
    {
      "ID": 152,
      "Name": "Pan Salado",
      "CategoryID": 6,
      "Price": 2,
      "MaxItems": 20,
      "Fractional": 0
    },
    {
      "ID": 153,
      "Name": "Tortillería",
      "CategoryID": 6,
      "Price": 20,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 154,
      "Name": "Pan Dulce",
      "CategoryID": 6,
      "Price": 10,
      "MaxItems": 10,
      "Fractional": 0
    },
    {
      "ID": 155,
      "Name": "Pasteles, Panqués y Postres",
      "CategoryID": 6,
      "Price": 150,
      "MaxItems": 1,
      "Fractional": 0
    },
    {
      "ID": 156,
      "Name": "Pan para Hornear y Pasta Hojaldre",
      "CategoryID": 6,
      "Price": 200,
      "MaxItems": 1,
      "Fractional": 0
    },
    {
      "ID": 157,
      "Name": "Pan de Temporada",
      "CategoryID": 6,
      "Price": 40,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 158,
      "Name": "Especializados",
      "CategoryID": 6,
      "Price": 36,
      "MaxItems": 5,
      "Fractional": 0
    },
    {
      "ID": 159,
      "Name": "Ropa para Hombre",
      "CategoryID": 17,
      "Price": 200,
      "MaxItems": 4,
      "Fractional": 0
    },
    {
      "ID": 160,
      "Name": "Ropa para Mujer",
      "CategoryID": 17,
      "Price": 200,
      "MaxItems": 4,
      "Fractional": 0
    },
    {
      "ID": 161,
      "Name": "Ropa para Niña y Juvenil",
      "CategoryID": 17,
      "Price": 150,
      "MaxItems": 4,
      "Fractional": 0
    },
    {
      "ID": 162,
      "Name": "Ropa para Niño y Juvenil",
      "CategoryID": 17,
      "Price": 150,
      "MaxItems": 4,
      "Fractional": 0
    },
    {
      "ID": 163,
      "Name": "Zapatería",
      "CategoryID": 17,
      "Price": 500,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 164,
      "Name": "Ropa para Bebé",
      "CategoryID": 17,
      "Price": 100,
      "MaxItems": 4,
      "Fractional": 0
    },
    {
      "ID": 165,
      "Name": "Comida Preparada",
      "CategoryID": 5,
      "Price": 98,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 166,
      "Name": "Carnes frías",
      "CategoryID": 5,
      "Price": 54,
      "MaxItems": 4,
      "Fractional": 0
    },
    {
      "ID": 167,
      "Name": "Artículos a granel",
      "CategoryID": 5,
      "Price": 7,
      "MaxItems": 5,
      "Fractional": 1
    },
    {
      "ID": 168,
      "Name": "Quesos",
      "CategoryID": 5,
      "Price": 54,
      "MaxItems": 2,
      "Fractional": 0
    },
    {
      "ID": 169,
      "Name": "Empacados",
      "CategoryID": 5,
      "Price": 20,
      "MaxItems": 10,
      "Fractional": 0
    }
  ];