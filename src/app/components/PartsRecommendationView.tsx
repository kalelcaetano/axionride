"use client";

import { useState, useEffect } from "react";
import { Search, ExternalLink, Star, TrendingUp, ShoppingCart, Sparkles, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PartsRecommendationViewProps {
  motorcycle: any;
}

interface PartRecommendation {
  id: string;
  name: string;
  type: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  store: string;
  storeUrl: string;
  imageUrl: string;
  inStock: boolean;
  isRecommended?: boolean;
  isBestSeller?: boolean;
}

export default function PartsRecommendationView({ motorcycle }: PartsRecommendationViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('oil');
  const [showCompatibilityWarning, setShowCompatibilityWarning] = useState(false);

  // Verifica compatibilidade ao mudar categoria
  useEffect(() => {
    // Simulação: algumas categorias podem não ser compatíveis com certas motos
    const incompatibleCombos = [
      { brand: 'honda', model: 'CG 160', category: 'tires', year: 2020 },
      { brand: 'yamaha', model: 'MT-03', category: 'chain-kit', year: 2019 },
    ];

    const isIncompatible = incompatibleCombos.some(
      combo => 
        motorcycle?.brand?.toLowerCase() === combo.brand &&
        motorcycle?.model?.toLowerCase().includes(combo.model.toLowerCase()) &&
        selectedCategory === combo.category &&
        parseInt(motorcycle?.year) <= combo.year
    );

    setShowCompatibilityWarning(isIncompatible);
  }, [selectedCategory, motorcycle]);

  // Dados simulados de recomendações com peças mais vendidas
  const recommendations: Record<string, PartRecommendation[]> = {
    oil: [
      {
        id: '1',
        name: 'Óleo Motul 5100 10W40 Semissintético 1L',
        type: 'oil',
        price: 42.90,
        originalPrice: 54.90,
        rating: 4.8,
        reviews: 1247,
        store: 'Mercado Livre',
        storeUrl: 'https://mercadolivre.com.br',
        imageUrl: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=200&h=200&fit=crop',
        inStock: true,
        isRecommended: true,
        isBestSeller: true,
      },
      {
        id: '2',
        name: 'Óleo Ipiranga Semissintético 10W40 1L',
        type: 'oil',
        price: 38.50,
        originalPrice: 45.00,
        rating: 4.6,
        reviews: 892,
        store: 'Shopee',
        storeUrl: 'https://shopee.com.br',
        imageUrl: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=200&h=200&fit=crop',
        inStock: true,
      },
      {
        id: '3',
        name: 'Óleo Castrol Power1 10W40 1L',
        type: 'oil',
        price: 45.90,
        rating: 4.9,
        reviews: 2103,
        store: 'Mercado Livre',
        storeUrl: 'https://mercadolivre.com.br',
        imageUrl: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=200&h=200&fit=crop',
        inStock: true,
      },
    ],
    'oil-filter': [
      {
        id: '4',
        name: 'Filtro de Óleo Tecfil PSL319',
        type: 'oil-filter',
        price: 18.90,
        originalPrice: 25.00,
        rating: 4.7,
        reviews: 543,
        store: 'Mercado Livre',
        storeUrl: 'https://mercadolivre.com.br',
        imageUrl: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=200&h=200&fit=crop',
        inStock: true,
        isRecommended: true,
        isBestSeller: true,
      },
      {
        id: '5',
        name: 'Filtro de Óleo Mann W719/30',
        type: 'oil-filter',
        price: 22.50,
        rating: 4.8,
        reviews: 321,
        store: 'Shopee',
        storeUrl: 'https://shopee.com.br',
        imageUrl: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=200&h=200&fit=crop',
        inStock: true,
      },
    ],
    'air-filter': [
      {
        id: '8',
        name: 'Filtro de Ar Tecfil ARL5380',
        type: 'air-filter',
        price: 35.90,
        originalPrice: 45.00,
        rating: 4.6,
        reviews: 432,
        store: 'Mercado Livre',
        storeUrl: 'https://mercadolivre.com.br',
        imageUrl: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=200&h=200&fit=crop',
        inStock: true,
        isRecommended: true,
        isBestSeller: true,
      },
      {
        id: '8b',
        name: 'Filtro de Ar K&N Premium',
        type: 'air-filter',
        price: 89.90,
        originalPrice: 120.00,
        rating: 4.9,
        reviews: 876,
        store: 'Mercado Livre',
        storeUrl: 'https://mercadolivre.com.br',
        imageUrl: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=200&h=200&fit=crop',
        inStock: true,
      },
    ],
    'brake-fluid': [
      {
        id: '9',
        name: 'Fluido de Freio DOT 4 Bosch 500ml',
        type: 'brake-fluid',
        price: 28.90,
        rating: 4.7,
        reviews: 654,
        store: 'Shopee',
        storeUrl: 'https://shopee.com.br',
        imageUrl: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=200&h=200&fit=crop',
        inStock: true,
        isRecommended: true,
        isBestSeller: true,
      },
      {
        id: '9b',
        name: 'Fluido de Freio DOT 4 Castrol 500ml',
        type: 'brake-fluid',
        price: 32.50,
        rating: 4.8,
        reviews: 543,
        store: 'Mercado Livre',
        storeUrl: 'https://mercadolivre.com.br',
        imageUrl: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=200&h=200&fit=crop',
        inStock: true,
      },
    ],
    tires: [
      {
        id: '6',
        name: 'Pneu Pirelli MT60 RS 110/80-18',
        type: 'tires',
        price: 289.90,
        originalPrice: 349.90,
        rating: 4.9,
        reviews: 1876,
        store: 'Mercado Livre',
        storeUrl: 'https://mercadolivre.com.br',
        imageUrl: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=200&h=200&fit=crop',
        inStock: true,
        isRecommended: true,
        isBestSeller: true,
      },
      {
        id: '7',
        name: 'Pneu Michelin Pilot Street 100/80-17',
        type: 'tires',
        price: 245.00,
        rating: 4.7,
        reviews: 987,
        store: 'Shopee',
        storeUrl: 'https://shopee.com.br',
        imageUrl: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=200&h=200&fit=crop',
        inStock: true,
      },
    ],
    'chain-kit': [
      {
        id: '10',
        name: 'Kit Relação Vaz 1045 com Retentor',
        type: 'chain-kit',
        price: 189.90,
        originalPrice: 230.00,
        rating: 4.8,
        reviews: 765,
        store: 'Mercado Livre',
        storeUrl: 'https://mercadolivre.com.br',
        imageUrl: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=200&h=200&fit=crop',
        inStock: true,
        isRecommended: true,
        isBestSeller: true,
      },
      {
        id: '10b',
        name: 'Kit Relação DID Premium com Retentor',
        type: 'chain-kit',
        price: 249.90,
        originalPrice: 299.90,
        rating: 4.9,
        reviews: 1234,
        store: 'Mercado Livre',
        storeUrl: 'https://mercadolivre.com.br',
        imageUrl: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=200&h=200&fit=crop',
        inStock: true,
      },
    ],
    'brake-pads': [
      {
        id: '11',
        name: 'Pastilha de Freio Cobreq Dianteira',
        type: 'brake-pads',
        price: 45.90,
        originalPrice: 59.90,
        rating: 4.7,
        reviews: 892,
        store: 'Mercado Livre',
        storeUrl: 'https://mercadolivre.com.br',
        imageUrl: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=200&h=200&fit=crop',
        inStock: true,
        isRecommended: true,
        isBestSeller: true,
      },
    ],
    'spark-plug': [
      {
        id: '12',
        name: 'Vela de Ignição NGK Iridium',
        type: 'spark-plug',
        price: 32.90,
        originalPrice: 42.00,
        rating: 4.9,
        reviews: 1543,
        store: 'Shopee',
        storeUrl: 'https://shopee.com.br',
        imageUrl: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=200&h=200&fit=crop',
        inStock: true,
        isRecommended: true,
        isBestSeller: true,
      },
    ],
  };

  const categories = [
    { id: 'oil', name: 'Óleo', icon: '🛢️' },
    { id: 'oil-filter', name: 'Filtro de Óleo', icon: '🔧' },
    { id: 'air-filter', name: 'Filtro de Ar', icon: '💨' },
    { id: 'brake-fluid', name: 'Fluido de Freio', icon: '🛑' },
    { id: 'brake-pads', name: 'Pastilhas de Freio', icon: '🔴' },
    { id: 'spark-plug', name: 'Velas', icon: '⚡' },
    { id: 'tires', name: 'Pneus', icon: '⚫' },
    { id: 'chain-kit', name: 'Kit Relação', icon: '⛓️' },
  ];

  const currentRecommendations = recommendations[selectedCategory] || [];
  const recommendedItem = currentRecommendations.find(item => item.isRecommended);
  const bestSellerItem = currentRecommendations.find(item => item.isBestSeller);

  // Sempre garante que há uma peça recomendada
  const displayRecommendedItem = recommendedItem || bestSellerItem || currentRecommendations[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="w-6 h-6" />
            Recomendações de Peças
          </CardTitle>
          <CardDescription className="text-gray-400">
            Encontre as melhores ofertas para {motorcycle?.brand} {motorcycle?.model} {motorcycle?.year}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Compatibility Warning */}
      {showCompatibilityWarning && (
        <Alert className="bg-yellow-500/10 border-yellow-500/30">
          <AlertCircle className="h-4 w-4 text-yellow-500" />
          <AlertDescription className="text-yellow-300">
            ⚠️ <strong>Atenção:</strong> Algumas peças desta categoria podem não ser compatíveis com {motorcycle?.brand} {motorcycle?.model} {motorcycle?.year}. Verifique as especificações antes de comprar.
          </AlertDescription>
        </Alert>
      )}

      {/* Search */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Buscar peças específicas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
          />
        </div>
        <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
          Buscar
        </Button>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`p-4 rounded-lg border transition-all ${
              selectedCategory === category.id
                ? 'bg-purple-500/20 border-purple-500'
                : 'bg-white/5 border-white/10 hover:bg-white/10'
            }`}
          >
            <span className="text-2xl mb-2 block">{category.icon}</span>
            <p className="text-white text-sm font-semibold">{category.name}</p>
          </button>
        ))}
      </div>

      {/* Recommended Item (Always visible) */}
      {displayRecommendedItem && (
        <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            {displayRecommendedItem.isBestSeller ? 'MAIS VENDIDO' : 'RECOMENDADO'}
          </div>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="aspect-square bg-white/5 rounded-lg flex items-center justify-center overflow-hidden">
                <img 
                  src={displayRecommendedItem.imageUrl} 
                  alt={displayRecommendedItem.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex gap-2 mb-3">
                  <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                    {categories.find(c => c.id === selectedCategory)?.name}
                  </Badge>
                  {displayRecommendedItem.isBestSeller && (
                    <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                      🔥 Mais Vendido
                    </Badge>
                  )}
                </div>
                <h3 className="text-white text-2xl font-bold mb-3">
                  {displayRecommendedItem.name}
                </h3>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                    <span className="text-white font-semibold text-lg">{displayRecommendedItem.rating}</span>
                  </div>
                  <span className="text-gray-400">
                    ({displayRecommendedItem.reviews} avaliações)
                  </span>
                </div>
                <div className="mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-green-400">
                      R$ {displayRecommendedItem.price.toFixed(2)}
                    </span>
                    {displayRecommendedItem.originalPrice && (
                      <span className="text-lg text-gray-400 line-through">
                        R$ {displayRecommendedItem.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  {displayRecommendedItem.originalPrice && (
                    <Badge className="bg-green-500/20 text-green-400 border-0 mt-2">
                      {Math.round(((displayRecommendedItem.originalPrice - displayRecommendedItem.price) / displayRecommendedItem.originalPrice) * 100)}% OFF
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-gray-400">{displayRecommendedItem.store}</span>
                  {displayRecommendedItem.inStock && (
                    <Badge className="bg-blue-500/20 text-blue-400 border-0">
                      Em estoque
                    </Badge>
                  )}
                </div>
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold"
                  onClick={() => window.open(displayRecommendedItem.storeUrl, '_blank')}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Ver oferta especial
                  <ExternalLink className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recommendations */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-white text-xl font-semibold">
            Mais ofertas - {categories.find(c => c.id === selectedCategory)?.name}
          </h3>
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            {currentRecommendations.length} ofertas encontradas
          </Badge>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentRecommendations.filter(item => item.id !== displayRecommendedItem?.id).map((item) => (
            <Card key={item.id} className="bg-white/5 border-white/10 hover:border-purple-500/50 transition-all">
              <CardContent className="p-4">
                <div className="aspect-square bg-white/5 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h4 className="text-white font-semibold mb-2 line-clamp-2 min-h-[3rem]">
                  {item.name}
                </h4>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    <span className="text-white font-semibold">{item.rating}</span>
                  </div>
                  <span className="text-gray-400 text-sm">
                    ({item.reviews} avaliações)
                  </span>
                </div>

                <div className="mb-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-green-400">
                      R$ {item.price.toFixed(2)}
                    </span>
                    {item.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        R$ {item.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  {item.originalPrice && (
                    <Badge className="bg-green-500/20 text-green-400 border-0 text-xs mt-1">
                      {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-400 text-sm">{item.store}</span>
                  {item.inStock && (
                    <Badge className="bg-blue-500/20 text-blue-400 border-0 text-xs">
                      Em estoque
                    </Badge>
                  )}
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  onClick={() => window.open(item.storeUrl, '_blank')}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Ver oferta
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Info Card */}
      <Card className="bg-blue-500/10 border-blue-500/30">
        <CardContent className="p-4">
          <p className="text-blue-300 text-sm">
            💡 <strong>Dica:</strong> Os preços são atualizados em tempo real e incluem as melhores ofertas de Mercado Livre, Shopee e outras lojas parceiras. Sempre verifique a reputação do vendedor e a compatibilidade com sua moto antes de comprar.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
