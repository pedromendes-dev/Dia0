import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const VehicleCard = ({ vehicle, onFavorite, isFavorite }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const formatMileage = (mileage) => {
    return new Intl.NumberFormat('pt-BR').format(mileage) + ' km';
  };

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative">
        <img 
          src={vehicle.images[0] || "https://images.unsplash.com/photo-1519245659620-e859806a8d3b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBjYXJzfGVufDB8fHx8MTc1NTUwOTgyMHww&ixlib=rb-4.1.0&q=85"} 
          alt={vehicle.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          {vehicle.is_featured && (
            <Badge className="bg-amber-500 text-white">
              <Star className="w-3 h-3 mr-1" />
              Destaque
            </Badge>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/80 hover:bg-white"
            onClick={() => onFavorite && onFavorite(vehicle.id)}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
          </Button>
        </div>
        <div className="absolute bottom-3 left-3">
          <Badge variant={vehicle.condition === 'new' ? 'default' : 'secondary'}>
            {vehicle.condition === 'new' ? 'Novo' : vehicle.condition === 'used' ? 'Usado' : 'Seminovo'}
          </Badge>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-gray-900 group-hover:text-indigo-600 transition-colors">
            {vehicle.title}
          </h3>
          <span className="text-2xl font-bold text-indigo-600">
            {formatPrice(vehicle.price)}
          </span>
        </div>
        
        <p className="text-gray-600 mb-3 line-clamp-2">{vehicle.description}</p>
        
        <div className="grid grid-cols-2 gap-2 mb-3 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{vehicle.year}</span>
          </div>
          <div className="flex items-center gap-1">
            <Gauge className="w-4 h-4" />
            <span>{formatMileage(vehicle.mileage)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Fuel className="w-4 h-4" />
            <span className="capitalize">{vehicle.fuel_type}</span>
          </div>
          <div className="flex items-center gap-1">
            <Settings className="w-4 h-4" />
            <span className="capitalize">{vehicle.transmission}</span>
          </div>
        </div>
        
        <Separator className="mb-3" />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{vehicle.location}</span>
          </div>
          <div className="flex gap-1">
            <Button size="sm" variant="outline">
              <Phone className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline">
              <Mail className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

const FilterPanel = ({ filters, onFilterChange, onApplyFilters }) => {
  return (
    <Card className="p-4 h-fit">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5" />
        <h3 className="font-semibold">Filtros</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Marca</label>
          <Select value={filters.brand} onValueChange={(value) => onFilterChange('brand', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione a marca" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todas as marcas</SelectItem>
              <SelectItem value="Toyota">Toyota</SelectItem>
              <SelectItem value="Honda">Honda</SelectItem>
              <SelectItem value="Volkswagen">Volkswagen</SelectItem>
              <SelectItem value="Ford">Ford</SelectItem>
              <SelectItem value="Chevrolet">Chevrolet</SelectItem>
              <SelectItem value="Hyundai">Hyundai</SelectItem>
              <SelectItem value="BMW">BMW</SelectItem>
              <SelectItem value="Mercedes">Mercedes</SelectItem>
              <SelectItem value="Audi">Audi</SelectItem>
              <SelectItem value="Porsche">Porsche</SelectItem>
              <SelectItem value="Ferrari">Ferrari</SelectItem>
              <SelectItem value="Lamborghini">Lamborghini</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-2 block">Tipo</label>
          <Select value={filters.vehicle_type} onValueChange={(value) => onFilterChange('vehicle_type', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Tipo do veículo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos os tipos</SelectItem>
              <SelectItem value="car">Carro</SelectItem>
              <SelectItem value="suv">SUV</SelectItem>
              <SelectItem value="motorcycle">Moto</SelectItem>
              <SelectItem value="truck">Caminhão</SelectItem>
              <SelectItem value="van">Van</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-2 block">Condição</label>
          <Select value={filters.condition} onValueChange={(value) => onFilterChange('condition', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Condição" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todas as condições</SelectItem>
              <SelectItem value="new">Novo</SelectItem>
              <SelectItem value="used">Usado</SelectItem>
              <SelectItem value="certified">Seminovo</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-2 block">Preço Mínimo</label>
          <Input
            type="number"
            placeholder="R$ 0"
            value={filters.min_price}
            onChange={(e) => onFilterChange('min_price', e.target.value)}
          />
        </div>
        
        <div>
          <label className="text-sm font-medium mb-2 block">Preço Máximo</label>
          <Input
            type="number"
            placeholder="R$ 999.999"
            value={filters.max_price}
            onChange={(e) => onFilterChange('max_price', e.target.value)}
          />
        </div>
        
        <div>
          <label className="text-sm font-medium mb-2 block">Ano Mínimo</label>
          <Input
            type="number"
            placeholder="2000"
            value={filters.min_year}
            onChange={(e) => onFilterChange('min_year', e.target.value)}
          />
        </div>
        
        <div>
          <label className="text-sm font-medium mb-2 block">Ano Máximo</label>
          <Input
            type="number"
            placeholder="2024"
            value={filters.max_year}
            onChange={(e) => onFilterChange('max_year', e.target.value)}
          />
        </div>
        
        <Button onClick={onApplyFilters} className="w-full">
          Aplicar Filtros
        </Button>
      </div>
    </Card>
  );
};

const Home = () => {
  const [vehicles, setVehicles] = useState([]);
  const [featuredVehicles, setFeaturedVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [filters, setFilters] = useState({
    brand: "",
    vehicle_type: "",
    condition: "",
    min_price: "",
    max_price: "",
    min_year: "",
    max_year: ""
  });

  // Dados de demonstração
  const demoVehicles = [
    {
      id: "1",
      title: "Lamborghini Huracán 2023",
      brand: "Lamborghini",
      model: "Huracán",
      year: 2023,
      price: 1850000,
      mileage: 2500,
      vehicle_type: "car",
      fuel_type: "gasoline",
      transmission: "automatic",
      condition: "new",
      color: "Cinza",
      description: "Superesportivo em perfeito estado, com todos os opcionais de fábrica. Motor V10 naturalmente aspirado.",
      location: "São Paulo, SP",
      seller_name: "Premium Motors",
      seller_phone: "(11) 99999-9999",
      seller_email: "contato@premiummotors.com",
      images: ["https://images.unsplash.com/photo-1519245659620-e859806a8d3b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBjYXJzfGVufDB8fHx8MTc1NTUwOTgyMHww&ixlib=rb-4.1.0&q=85"],
      features: ["Ar condicionado", "Direção elétrica", "Freios ABS"],
      is_featured: true,
      is_sold: false
    },
    {
      id: "2",
      title: "Ferrari 458 Italia 2019",
      brand: "Ferrari",
      model: "458 Italia",
      year: 2019,
      price: 2100000,
      mileage: 8900,
      vehicle_type: "car",
      fuel_type: "gasoline",
      transmission: "automatic",
      condition: "used",
      color: "Vermelho",
      description: "Ferrari 458 Italia em excelente estado de conservação. Revisões em dia, histórico completo.",
      location: "Rio de Janeiro, RJ",
      seller_name: "Exotic Cars RJ",
      seller_phone: "(21) 98888-8888",
      seller_email: "vendas@exoticcars.com",
      images: ["https://images.unsplash.com/photo-1583121274602-3e2820c69888?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwzfHxjYXJzfGVufDB8fHx8MTc1NTYxNDkwNXww&ixlib=rb-4.1.0&q=85"],
      features: ["Sistema de som premium", "Bancos em couro", "Rodas esportivas"],
      is_featured: true,
      is_sold: false
    },
    {
      id: "3",
      title: "Porsche 911 Carrera 2021",
      brand: "Porsche",
      model: "911 Carrera",
      year: 2021,
      price: 850000,
      mileage: 12000,
      vehicle_type: "car",
      fuel_type: "gasoline",
      transmission: "automatic",
      condition: "certified",
      color: "Preto",
      description: "Porsche 911 Carrera seminovo, procedência garantida. Único dono, sempre na concessionária.",
      location: "Belo Horizonte, MG",
      seller_name: "Porsche Center BH",
      seller_phone: "(31) 97777-7777",
      seller_email: "seminovos@porschebh.com",
      images: ["https://images.unsplash.com/photo-1503376780353-7e6692767b70?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwyfHxjYXJzfGVufDB8fHx8MTc1NTYxNDkwNXww&ixlib=rb-4.1.0&q=85"],
      features: ["PDK", "Sport Chrono", "PASM"],
      is_featured: false,
      is_sold: false
    },
    {
      id: "4",
      title: "Lamborghini Aventador 2020",
      brand: "Lamborghini",
      model: "Aventador",
      year: 2020,
      price: 2850000,
      mileage: 5200,
      vehicle_type: "car",
      fuel_type: "gasoline",
      transmission: "automatic",
      condition: "used",
      color: "Laranja",
      description: "Lamborghini Aventador em cor exclusiva. Manutenção sempre em dia, documentação ok.",
      location: "Curitiba, PR",
      seller_name: "Speed Garage",
      seller_phone: "(41) 96666-6666",
      seller_email: "info@speedgarage.com",
      images: ["https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHw0fHxjYXJzfGVufDB8fHx8MTc1NTYxNDkwNXww&ixlib=rb-4.1.0&q=85"],
      features: ["Sistema de escape esportivo", "Fibra de carbono", "Bancos Alcantara"],
      is_featured: true,
      is_sold: false
    },
    {
      id: "5",
      title: "Mercedes-AMG GT 2022",
      brand: "Mercedes",
      model: "AMG GT",
      year: 2022,
      price: 1250000,
      mileage: 7800,
      vehicle_type: "car",
      fuel_type: "gasoline",
      transmission: "automatic",
      condition: "certified",
      color: "Prata",
      description: "Mercedes-AMG GT com performance excepcional. Certificado de procedência Mercedes-Benz.",
      location: "Brasília, DF",
      seller_name: "Mercedes-Benz Brasília",
      seller_phone: "(61) 95555-5555",
      seller_email: "seminovos@mercedesbsb.com",
      images: ["https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg"],
      features: ["AMG Performance", "Sistema multimídia", "Suspensão adaptativa"],
      is_featured: false,
      is_sold: false
    },
    {
      id: "6",
      title: "Maserati GranTurismo 2021",
      brand: "Maserati",
      model: "GranTurismo",
      year: 2021,
      price: 1650000,
      mileage: 9500,
      vehicle_type: "car",
      fuel_type: "gasoline",
      transmission: "automatic",
      condition: "used",
      color: "Vermelho",
      description: "Maserati GranTurismo com design italiano inconfundível. Som característico do motor V8.",
      location: "Salvador, BA",
      seller_name: "Luxury Motors",
      seller_phone: "(71) 94444-4444",
      seller_email: "vendas@luxurymotors.com",
      images: ["https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg"],
      features: ["Bancos elétricos", "Teto solar", "Sistema Bose"],
      is_featured: false,
      is_sold: false
    }
  ];

  useEffect(() => {
    loadVehicles();
    loadFeaturedVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      setLoading(true);
      // Simular carregamento da API
      setTimeout(() => {
        setVehicles(demoVehicles);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Erro ao carregar veículos:", error);
      setVehicles(demoVehicles);
      setLoading(false);
    }
  };

  const loadFeaturedVehicles = async () => {
    try {
      const featured = demoVehicles.filter(v => v.is_featured);
      setFeaturedVehicles(featured);
    } catch (error) {
      console.error("Erro ao carregar veículos em destaque:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const applyFilters = () => {
    let filtered = demoVehicles;

    if (searchTerm) {
      filtered = filtered.filter(vehicle =>
        vehicle.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.brand) {
      filtered = filtered.filter(vehicle => vehicle.brand === filters.brand);
    }

    if (filters.vehicle_type) {
      filtered = filtered.filter(vehicle => vehicle.vehicle_type === filters.vehicle_type);
    }

    if (filters.condition) {
      filtered = filtered.filter(vehicle => vehicle.condition === filters.condition);
    }

    if (filters.min_price) {
      filtered = filtered.filter(vehicle => vehicle.price >= parseInt(filters.min_price));
    }

    if (filters.max_price) {
      filtered = filtered.filter(vehicle => vehicle.price <= parseInt(filters.max_price));
    }

    if (filters.min_year) {
      filtered = filtered.filter(vehicle => vehicle.year >= parseInt(filters.min_year));
    }

    if (filters.max_year) {
      filtered = filtered.filter(vehicle => vehicle.year <= parseInt(filters.max_year));
    }

    setVehicles(filtered);
  };

  const toggleFavorite = (vehicleId) => {
    setFavorites(prev => {
      if (prev.includes(vehicleId)) {
        return prev.filter(id => id !== vehicleId);
      } else {
        return [...prev, vehicleId];
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 text-white p-2 rounded-lg">
                <Car className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">AutoCommerce</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar veículos..."
                  className="pl-10 w-80"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              <Button>Anunciar Veículo</Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Encontre o Veículo dos Seus Sonhos
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            O maior marketplace de veículos premium do Brasil
          </p>
        </section>

        {/* Featured Vehicles */}
        {featuredVehicles.length > 0 && (
          <section className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Veículos em Destaque</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredVehicles.map(vehicle => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onFavorite={toggleFavorite}
                  isFavorite={favorites.includes(vehicle.id)}
                />
              ))}
            </div>
          </section>
        )}

        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">Todos os Veículos</TabsTrigger>
            <TabsTrigger value="cars">Carros</TabsTrigger>
            <TabsTrigger value="suvs">SUVs</TabsTrigger>
            <TabsTrigger value="motorcycles">Motos</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              onApplyFilters={applyFilters}
            />
          </div>

          {/* Vehicles Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-80 bg-gray-200 rounded-lg animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {vehicles.map(vehicle => (
                  <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    onFavorite={toggleFavorite}
                    isFavorite={favorites.includes(vehicle.id)}
                  />
                ))}
              </div>
            )}
            
            {!loading && vehicles.length === 0 && (
              <div className="text-center py-12">
                <Car className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Nenhum veículo encontrado
                </h3>
                <p className="text-gray-500">
                  Tente ajustar os filtros ou termos de busca
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-indigo-600 text-white p-2 rounded-lg">
                  <Car className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">AutoCommerce</h3>
              </div>
              <p className="text-gray-400">
                O marketplace mais confiável para compra e venda de veículos premium.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Para Compradores</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Como Comprar</li>
                <li>Financiamento</li>
                <li>Garantias</li>
                <li>Vistoria</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Para Vendedores</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Como Vender</li>
                <li>Anunciar Grátis</li>
                <li>Dicas de Venda</li>
                <li>Avaliação</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Central de Ajuda</li>
                <li>Fale Conosco</li>
                <li>WhatsApp</li>
                <li>Sobre Nós</li>
              </ul>
            </div>
          </div>
          
          <Separator className="my-8 bg-gray-700" />
          
          <div className="text-center text-gray-400">
            <p>&copy; 2024 AutoCommerce. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;