"use client";

import { useState } from "react";
import { Shield, LogOut, Settings, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MaintenanceView from "./MaintenanceView";
import GPSTrackingView from "./GPSTrackingView";
import PartsRecommendationView from "./PartsRecommendationView";
import FleetManagementView from "./FleetManagementView";
import MotorcycleSetup from "./MotorcycleSetup";

interface DashboardViewProps {
  userType: 'motoboy' | 'daily' | 'traveler' | 'fleet';
  onLogout: () => void;
}

// Logo Component with Shield and Motorcycle Wheel
function AxionLogo({ size = "default" }: { size?: "default" | "small" }) {
  const shieldSize = size === "small" ? "w-6 h-6" : "w-8 h-8";
  const wheelSize = size === "small" ? 12 : 16;
  
  return (
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
  );
}

export default function DashboardView({ userType, onLogout }: DashboardViewProps) {
  const [hasMotorcycle, setHasMotorcycle] = useState(false);
  const [motorcycleData, setMotorcycleData] = useState<any>(null);
  const [showSettings, setShowSettings] = useState(false);

  const handleMotorcycleSetup = (data: any) => {
    setMotorcycleData(data);
    setHasMotorcycle(true);
  };

  const getUserTypeLabel = () => {
    switch (userType) {
      case 'motoboy':
        return 'Motoboy';
      case 'daily':
        return 'Casa ↔ Trabalho';
      case 'traveler':
        return 'Viajante';
      case 'fleet':
        return 'Administrador de Frota';
    }
  };

  if (!hasMotorcycle && userType !== 'fleet') {
    return <MotorcycleSetup onComplete={handleMotorcycleSetup} userType={userType} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AxionLogo />
              <div>
                <h1 className="text-2xl font-bold text-white">AxionRide</h1>
                <p className="text-xs text-blue-300">{getUserTypeLabel()}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white"
                onClick={() => setShowSettings(true)}
              >
                <Settings className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white"
                onClick={onLogout}
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {userType === 'fleet' ? (
          <FleetManagementView />
        ) : (
          <Tabs defaultValue="maintenance" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white/5 border border-white/10">
              <TabsTrigger value="maintenance" className="data-[state=active]:bg-blue-500 text-gray-300 data-[state=active]:text-white">
                Manutenção
              </TabsTrigger>
              <TabsTrigger value="tracking" className="data-[state=active]:bg-blue-500 text-gray-300 data-[state=active]:text-white">
                Quilometragem
              </TabsTrigger>
              <TabsTrigger value="parts" className="data-[state=active]:bg-blue-500 text-gray-300 data-[state=active]:text-white">
                Peças
              </TabsTrigger>
            </TabsList>

            <TabsContent value="maintenance" className="mt-6">
              <MaintenanceView motorcycle={motorcycleData} />
            </TabsContent>

            <TabsContent value="tracking" className="mt-6">
              <GPSTrackingView userType={userType} motorcycle={motorcycleData} />
            </TabsContent>

            <TabsContent value="parts" className="mt-6">
              <PartsRecommendationView motorcycle={motorcycleData} />
            </TabsContent>
          </Tabs>
        )}
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md bg-slate-900 border-white/10">
            <CardHeader className="border-b border-white/10">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Configurações</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowSettings(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <CardDescription className="text-gray-400">
                Gerencie suas preferências e dados da moto
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <Button
                variant="outline"
                className="w-full justify-start border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white font-medium"
                onClick={() => {
                  setHasMotorcycle(false);
                  setMotorcycleData(null);
                  setShowSettings(false);
                }}
              >
                <Settings className="w-4 h-4 mr-2" />
                Editar Dados da Moto
              </Button>
              
              <Button
                variant="outline"
                className="w-full justify-start border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white font-medium"
              >
                <Settings className="w-4 h-4 mr-2" />
                Preferências de Notificação
              </Button>
              
              <Button
                variant="outline"
                className="w-full justify-start border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white font-medium"
              >
                <Settings className="w-4 h-4 mr-2" />
                Gerenciar Assinatura
              </Button>
              
              <div className="pt-4 border-t border-white/10">
                <Button
                  variant="destructive"
                  className="w-full font-medium"
                  onClick={onLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair da Conta
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
