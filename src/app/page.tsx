"use client";

import { useState } from "react";
import { Shield, MapPin, Wrench, Users, TrendingUp, Zap, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LoginModal from "./components/LoginModal";
import DashboardView from "./components/DashboardView";

// Logo Component with Shield and Motorcycle Wheel
function AxionLogo({ size = "default" }: { size?: "default" | "small" }) {
  const shieldSize = size === "small" ? "w-6 h-6" : "w-8 h-8";
  const wheelSize = size === "small" ? 12 : 16;
  
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative">
        <Shield className={`${shieldSize} text-blue-500`} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <svg width={wheelSize} height={wheelSize} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Outer tire (thicker) */}
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" className="text-cyan-500" />
            
            {/* Inner rim (smaller) */}
            <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-cyan-400" />
            
            {/* Spokes */}
            <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" strokeWidth="1" className="text-cyan-400" />
            <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="1" className="text-cyan-400" />
            <line x1="6.76" y1="6.76" x2="17.24" y2="17.24" stroke="currentColor" strokeWidth="1" className="text-cyan-400" />
            <line x1="17.24" y1="6.76" x2="6.76" y2="17.24" stroke="currentColor" strokeWidth="1" className="text-cyan-400" />
            
            {/* Hub */}
            <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="currentColor" strokeWidth="1" className="text-cyan-500" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<'motoboy' | 'daily' | 'traveler' | 'fleet' | null>(null);

  const handleLogin = (type: 'motoboy' | 'daily' | 'traveler' | 'fleet') => {
    setUserType(type);
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  const handleCanalTavares = () => {
    window.open('https://www.youtube.com/@tavares160', '_blank', 'noopener,noreferrer');
  };

  if (isLoggedIn && userType) {
    return <DashboardView userType={userType} onLogout={() => {
      setIsLoggedIn(false);
      setUserType(null);
    }} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AxionLogo />
            <div>
              <h1 className="text-2xl font-bold text-white">AxionRide</h1>
              <p className="text-xs text-blue-300">Manutenção Inteligente</p>
            </div>
          </div>
          <Button 
            onClick={() => setShowLogin(true)}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold"
          >
            Entrar / Cadastrar
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/30">
            🏍️ Tecnologia de Ponta para Motociclistas
          </Badge>
          
          {/* Logo acima do slogan */}
          <div className="flex justify-center mb-6">
            <AxionLogo size="default" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Sua moto sempre em
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"> perfeito estado</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Monitoramento inteligente de manutenção, GPS automático, recomendações de peças e gestão completa para motoboys, viajantes e frotas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => setShowLogin(true)}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold text-lg px-8 py-6"
            >
              Começar Agora
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-blue-500/50 text-blue-300 hover:bg-blue-500/10 text-lg px-8 py-6"
            >
              Ver Planos
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Recursos Poderosos
          </h3>
          <p className="text-gray-400 text-lg">
            Tudo que você precisa para cuidar da sua moto
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
            <CardHeader>
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Wrench className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-white">Manutenção Inteligente</CardTitle>
              <CardDescription className="text-gray-400">
                Sistema automático que lê o manual da sua moto e calcula o momento exato de cada manutenção
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
            <CardHeader>
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-white">GPS Automático</CardTitle>
              <CardDescription className="text-gray-400">
                Rastreamento inteligente de quilometragem com modos específicos para cada tipo de uso
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
            <CardHeader>
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-white">Melhores Preços</CardTitle>
              <CardDescription className="text-gray-400">
                Encontre as peças mais baratas e bem avaliadas em Mercado Livre, Shopee e mais
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
            <CardHeader>
              <div className="bg-gradient-to-br from-orange-500 to-red-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-white">Modo Frota</CardTitle>
              <CardDescription className="text-gray-400">
                Gerencie até 10 motos (base) com monitoramento em tempo real e relatórios completos
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
            <CardHeader>
              <div className="bg-gradient-to-br from-yellow-500 to-orange-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-white">Alertas Inteligentes</CardTitle>
              <CardDescription className="text-gray-400">
                Notificações precisas sobre óleo, pneus, filtros, fluidos e muito mais
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
            <CardHeader>
              <div className="bg-gradient-to-br from-cyan-500 to-blue-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-white">Diagnóstico Premium</CardTitle>
              <CardDescription className="text-gray-400">
                Análise avançada de desgaste, otimização de custos e relatórios detalhados
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Planos para Todos
          </h3>
          <p className="text-gray-400 text-lg">
            Escolha o plano ideal para o seu uso
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {/* Motoboy Plan */}
          <Card className="bg-white/5 border-blue-500/30 backdrop-blur-sm hover:border-blue-500 transition-all">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Motoboy</CardTitle>
              <CardDescription className="text-gray-400">
                Para profissionais
              </CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold text-white">R$ 30</span>
                <span className="text-gray-400">/mês</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>GPS automático durante trabalho</span>
                </li>
                <li className="flex items-start gap-2 text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Alertas de manutenção</span>
                </li>
                <li className="flex items-start gap-2 text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Recomendações de peças</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Daily Plan */}
          <Card className="bg-white/5 border-green-500/30 backdrop-blur-sm hover:border-green-500 transition-all">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Casa ↔ Trabalho</CardTitle>
              <CardDescription className="text-gray-400">
                Para uso diário
              </CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold text-white">R$ 20</span>
                <span className="text-gray-400">/mês</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Registro de distância diária</span>
                </li>
                <li className="flex items-start gap-2 text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Alertas de manutenção</span>
                </li>
                <li className="flex items-start gap-2 text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Recomendações de peças</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Traveler Plan */}
          <Card className="bg-white/5 border-purple-500/30 backdrop-blur-sm hover:border-purple-500 transition-all">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Viajante</CardTitle>
              <CardDescription className="text-gray-400">
                Para aventureiros
              </CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold text-white">R$ 30</span>
                <span className="text-gray-400">/mês</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>GPS com controle manual</span>
                </li>
                <li className="flex items-start gap-2 text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Alertas de manutenção</span>
                </li>
                <li className="flex items-start gap-2 text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Recomendações de peças</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-bl-lg">
              POPULAR
            </div>
            <CardHeader>
              <CardTitle className="text-white text-2xl">Premium</CardTitle>
              <CardDescription className="text-gray-400">
                Recursos avançados
              </CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold text-white">R$ 40</span>
                <span className="text-gray-400">/mês</span>
              </div>
              <p className="text-sm text-yellow-400">ou R$ 360/ano (R$ 30/mês)</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <span>Até 5 motos</span>
                </li>
                <li className="flex items-start gap-2 text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <span>Histórico ilimitado</span>
                </li>
                <li className="flex items-start gap-2 text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <span>Relatórios avançados</span>
                </li>
                <li className="flex items-start gap-2 text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <span>Diagnóstico inteligente</span>
                </li>
                <li className="flex items-start gap-2 text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <span>Análise de desgaste</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Fleet Plan */}
        <div className="mt-8 max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <CardTitle className="text-white text-3xl mb-2">Modo Frota</CardTitle>
                  <CardDescription className="text-gray-400 text-lg">
                    Para locadoras e gestores de frotas
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div>
                    <span className="text-4xl font-bold text-white">R$ 50</span>
                    <span className="text-gray-400">/mês</span>
                  </div>
                  <p className="text-sm text-orange-400">ou R$ 600/ano</p>
                  <p className="text-xs text-gray-500 mt-1">Base: 10 motos</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-semibold mb-3">Recursos Inclusos:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>Gerenciamento de até 10 motos</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>Vinculação por CPF do locatário</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>Monitoramento em tempo real</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-3">Motos Extras:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>+ R$ 10/mês por moto extra (mensal)</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>+ R$ 160/ano por moto extra (anual)</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>Relatórios completos de uso</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-r from-blue-600 to-cyan-600 border-0">
          <CardContent className="p-8 md:p-12 text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Pronto para começar?
            </h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de motociclistas que já economizam tempo e dinheiro com o AxionRide
            </p>
            <Button 
              size="lg"
              onClick={() => setShowLogin(true)}
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold text-lg px-8 py-6"
            >
              Criar Conta Grátis
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <AxionLogo size="small" />
              <div>
                <p className="text-white font-semibold">AxionRide</p>
                <p className="text-xs text-gray-400">Manutenção Inteligente de Motos</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                © 2024 AxionRide. Todos os direitos reservados.
              </p>
              <Button
                variant="link"
                className="text-yellow-400 hover:text-yellow-300 text-sm"
                onClick={handleCanalTavares}
              >
                🎥 Canal Tavares 160
              </Button>
            </div>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {showLogin && (
        <LoginModal 
          onClose={() => setShowLogin(false)}
          onLogin={handleLogin}
        />
      )}
    </div>
  );
}
