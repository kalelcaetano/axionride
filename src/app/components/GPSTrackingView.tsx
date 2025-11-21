"use client";

import { useState, useEffect } from "react";
import { MapPin, Play, Pause, Navigation, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface GPSTrackingViewProps {
  userType: 'motoboy' | 'daily' | 'traveler';
  motorcycle: any;
}

export default function GPSTrackingView({ userType, motorcycle }: GPSTrackingViewProps) {
  const [isTracking, setIsTracking] = useState(false);
  const [currentTripKm, setCurrentTripKm] = useState(0);
  const [todayKm, setTodayKm] = useState(0);
  const [weekKm, setWeekKm] = useState(0);
  const [monthKm, setMonthKm] = useState(0);
  const [dailyTrips, setDailyTrips] = useState(0);

  // Simulação de GPS tracking
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTracking) {
      interval = setInterval(() => {
        // Simula incremento de km (em produção, seria GPS real)
        const increment = Math.random() * 0.5;
        setCurrentTripKm(prev => prev + increment);
        setTodayKm(prev => prev + increment);
        setWeekKm(prev => prev + increment);
        setMonthKm(prev => prev + increment);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking]);

  const handleStartTracking = () => {
    setIsTracking(true);
    setCurrentTripKm(0);
  };

  const handleStopTracking = () => {
    setIsTracking(false);
  };

  const handleDailyTrip = () => {
    const distance = parseFloat(motorcycle?.dailyDistance || '0');
    setTodayKm(prev => prev + distance);
    setWeekKm(prev => prev + distance);
    setMonthKm(prev => prev + distance);
    setDailyTrips(prev => prev + 1);
  };

  const renderTrackingControl = () => {
    switch (userType) {
      case 'motoboy':
        return (
          <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">
                    Modo Trabalho
                  </h3>
                  <p className="text-gray-400 text-sm">
                    GPS automático durante expediente
                  </p>
                </div>
                <Badge className={isTracking ? "bg-green-500" : "bg-gray-500"}>
                  {isTracking ? "ATIVO" : "PAUSADO"}
                </Badge>
              </div>

              {isTracking && (
                <div className="bg-white/5 rounded-lg p-4 mb-4">
                  <p className="text-gray-400 text-sm mb-1">Viagem atual</p>
                  <p className="text-white text-3xl font-bold">
                    {currentTripKm.toFixed(2)} km
                  </p>
                </div>
              )}

              <Button
                onClick={isTracking ? handleStopTracking : handleStartTracking}
                className={`w-full ${
                  isTracking 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'
                }`}
              >
                {isTracking ? (
                  <>
                    <Pause className="w-5 h-5 mr-2" />
                    Pausar Rastreamento
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Iniciar Rastreamento
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        );

      case 'traveler':
        return (
          <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">
                    Modo Viagem
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Controle manual de viagens
                  </p>
                </div>
                <Badge className={isTracking ? "bg-purple-500" : "bg-gray-500"}>
                  {isTracking ? "EM VIAGEM" : "PARADO"}
                </Badge>
              </div>

              {isTracking && (
                <div className="bg-white/5 rounded-lg p-4 mb-4">
                  <p className="text-gray-400 text-sm mb-1">Viagem atual</p>
                  <p className="text-white text-3xl font-bold">
                    {currentTripKm.toFixed(2)} km
                  </p>
                </div>
              )}

              <Button
                onClick={isTracking ? handleStopTracking : handleStartTracking}
                className={`w-full ${
                  isTracking 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                }`}
              >
                {isTracking ? (
                  <>
                    <Pause className="w-5 h-5 mr-2" />
                    Finalizar Viagem
                  </>
                ) : (
                  <>
                    <Navigation className="w-5 h-5 mr-2" />
                    Iniciar Viagem
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        );

      case 'daily':
        return (
          <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30">
            <CardContent className="p-6">
              <div className="mb-4">
                <h3 className="text-white font-semibold text-lg mb-1">
                  Modo Casa ↔ Trabalho
                </h3>
                <p className="text-gray-400 text-sm">
                  Distância configurada: {motorcycle?.dailyDistance || '0'} km (ida)
                </p>
              </div>

              <div className="bg-white/5 rounded-lg p-4 mb-4">
                <p className="text-gray-400 text-sm mb-1">Viagens hoje</p>
                <p className="text-white text-3xl font-bold">
                  {dailyTrips}
                </p>
              </div>

              <Button
                onClick={handleDailyTrip}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
              >
                <Plus className="w-5 h-5 mr-2" />
                Registrar Viagem
              </Button>
              <p className="text-gray-400 text-xs text-center mt-2">
                Clique ao fazer ida ou volta
              </p>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-white/5 border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-blue-400 text-lg">Hoje</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">{todayKm.toFixed(1)} km</p>
            <p className="text-gray-400 text-sm">Quilômetros rodados</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-purple-400 text-lg">Esta Semana</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">{weekKm.toFixed(1)} km</p>
            <p className="text-gray-400 text-sm">Últimos 7 dias</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-green-400 text-lg">Este Mês</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">{monthKm.toFixed(1)} km</p>
            <p className="text-gray-400 text-sm">Últimos 30 dias</p>
          </CardContent>
        </Card>
      </div>

      {/* Tracking Control */}
      {renderTrackingControl()}

      {/* Recent Trips */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Histórico de Viagens
          </CardTitle>
          <CardDescription className="text-gray-400">
            Suas últimas viagens registradas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
              >
                <div>
                  <p className="text-white font-semibold">
                    {userType === 'daily' ? 'Casa → Trabalho' : 'Viagem'}
                  </p>
                  <p className="text-gray-400 text-sm">
                    Hoje às {14 - index}:30
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">
                    {(Math.random() * 50 + 10).toFixed(1)} km
                  </p>
                  <p className="text-gray-400 text-sm">
                    {(Math.random() * 60 + 20).toFixed(0)} min
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
