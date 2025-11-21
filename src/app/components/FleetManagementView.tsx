"use client";

import { useState } from "react";
import { Users, Plus, Bike, AlertTriangle, CheckCircle2, MapPin, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FleetMotorcycle {
  id: string;
  brand: string;
  model: string;
  year: number;
  licensePlate: string;
  currentKm: number;
  status: 'available' | 'rented' | 'maintenance';
  rentedTo?: string;
  rentedToName?: string;
  rentalStartDate?: Date;
  maintenanceAlerts: number;
}

export default function FleetManagementView() {
  const [motorcycles, setMotorcycles] = useState<FleetMotorcycle[]>([
    {
      id: '1',
      brand: 'Honda',
      model: 'CG 160',
      year: 2023,
      licensePlate: 'ABC-1234',
      currentKm: 15420,
      status: 'rented',
      rentedTo: '123.456.789-00',
      rentedToName: 'João Silva',
      rentalStartDate: new Date('2024-01-15'),
      maintenanceAlerts: 1,
    },
    {
      id: '2',
      brand: 'Yamaha',
      model: 'Factor 150',
      year: 2023,
      licensePlate: 'DEF-5678',
      currentKm: 8230,
      status: 'available',
      maintenanceAlerts: 0,
    },
    {
      id: '3',
      brand: 'Honda',
      model: 'Biz 125',
      year: 2022,
      licensePlate: 'GHI-9012',
      currentKm: 22150,
      status: 'maintenance',
      maintenanceAlerts: 3,
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showRentModal, setShowRentModal] = useState(false);
  const [selectedMoto, setSelectedMoto] = useState<FleetMotorcycle | null>(null);

  const availableCount = motorcycles.filter(m => m.status === 'available').length;
  const rentedCount = motorcycles.filter(m => m.status === 'rented').length;
  const maintenanceCount = motorcycles.filter(m => m.status === 'maintenance').length;
  const totalAlerts = motorcycles.reduce((sum, m) => sum + m.maintenanceAlerts, 0);

  const getStatusBadge = (status: FleetMotorcycle['status']) => {
    switch (status) {
      case 'available':
        return <Badge className="bg-green-500/20 text-green-400 border-0">Disponível</Badge>;
      case 'rented':
        return <Badge className="bg-blue-500/20 text-blue-400 border-0">Alugada</Badge>;
      case 'maintenance':
        return <Badge className="bg-red-500/20 text-red-400 border-0">Manutenção</Badge>;
    }
  };

  const handleRentMotorcycle = (moto: FleetMotorcycle) => {
    setSelectedMoto(moto);
    setShowRentModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Gestão de Frota</h2>
          <p className="text-gray-400">
            Gerencie suas motos e locações em tempo real
          </p>
        </div>
        <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
              <Plus className="w-5 h-5 mr-2" />
              Adicionar Moto
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-900 border-white/10">
            <DialogHeader>
              <DialogTitle className="text-white">Adicionar Nova Moto</DialogTitle>
              <DialogDescription className="text-gray-400">
                Cadastre uma nova moto na frota
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-white">Marca</Label>
                  <Select>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="honda">Honda</SelectItem>
                      <SelectItem value="yamaha">Yamaha</SelectItem>
                      <SelectItem value="suzuki">Suzuki</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-white">Modelo</Label>
                  <Input className="bg-white/5 border-white/10 text-white" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-white">Ano</Label>
                  <Input type="number" className="bg-white/5 border-white/10 text-white" />
                </div>
                <div>
                  <Label className="text-white">Placa</Label>
                  <Input className="bg-white/5 border-white/10 text-white" />
                </div>
              </div>
              <div>
                <Label className="text-white">Quilometragem Atual</Label>
                <Input type="number" className="bg-white/5 border-white/10 text-white" />
              </div>
              <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500">
                Adicionar à Frota
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="bg-white/5 border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-blue-400 text-lg flex items-center gap-2">
              <Bike className="w-5 h-5" />
              Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">{motorcycles.length}</p>
            <p className="text-gray-400 text-sm">Motos na frota</p>
          </CardContent>
        </Card>

        <Card className="bg-green-500/10 border-green-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-green-400 text-lg flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Disponíveis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">{availableCount}</p>
            <p className="text-gray-400 text-sm">Prontas para alugar</p>
          </CardContent>
        </Card>

        <Card className="bg-blue-500/10 border-blue-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-blue-400 text-lg flex items-center gap-2">
              <Users className="w-5 h-5" />
              Alugadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">{rentedCount}</p>
            <p className="text-gray-400 text-sm">Em uso</p>
          </CardContent>
        </Card>

        <Card className="bg-red-500/10 border-red-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-red-400 text-lg flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Alertas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">{totalAlerts}</p>
            <p className="text-gray-400 text-sm">Manutenções pendentes</p>
          </CardContent>
        </Card>
      </div>

      {/* Plan Info */}
      <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/30">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-semibold mb-1">
                Plano Atual: Frota Base (5 motos)
              </p>
              <p className="text-gray-400 text-sm">
                {motorcycles.length}/5 motos utilizadas • {5 - motorcycles.length} slots disponíveis
              </p>
            </div>
            <Button variant="outline" className="border-orange-500 text-orange-400 hover:bg-orange-500/10">
              Adicionar Slots
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Motorcycles List */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-white/5 border border-white/10">
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="available">Disponíveis</TabsTrigger>
          <TabsTrigger value="rented">Alugadas</TabsTrigger>
          <TabsTrigger value="maintenance">Manutenção</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6 space-y-4">
          {motorcycles.map((moto) => (
            <Card key={moto.id} className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-orange-500 to-red-500 w-16 h-16 rounded-lg flex items-center justify-center">
                      <Bike className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-1">
                        {moto.brand} {moto.model} {moto.year}
                      </h3>
                      <p className="text-gray-400 text-sm mb-2">
                        Placa: {moto.licensePlate} • {moto.currentKm.toLocaleString('pt-BR')} km
                      </p>
                      {getStatusBadge(moto.status)}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {moto.status === 'available' && (
                      <Button
                        onClick={() => handleRentMotorcycle(moto)}
                        className="bg-blue-500 hover:bg-blue-600"
                      >
                        Alugar
                      </Button>
                    )}
                    <Button variant="outline" className="border-white/10 text-gray-400">
                      Detalhes
                    </Button>
                  </div>
                </div>

                {moto.status === 'rented' && moto.rentedTo && (
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Locatário</p>
                        <p className="text-white font-semibold">{moto.rentedToName}</p>
                        <p className="text-gray-400 text-xs">{moto.rentedTo}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Início da locação</p>
                        <p className="text-white font-semibold">
                          {moto.rentalStartDate?.toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Tempo de uso</p>
                        <p className="text-white font-semibold">
                          {moto.rentalStartDate 
                            ? Math.floor((Date.now() - moto.rentalStartDate.getTime()) / (1000 * 60 * 60 * 24))
                            : 0} dias
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {moto.maintenanceAlerts > 0 && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                      <p className="text-red-400 font-semibold">
                        {moto.maintenanceAlerts} {moto.maintenanceAlerts === 1 ? 'alerta' : 'alertas'} de manutenção
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="available" className="mt-6 space-y-4">
          {motorcycles.filter(m => m.status === 'available').map((moto) => (
            <Card key={moto.id} className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-green-500 to-emerald-500 w-16 h-16 rounded-lg flex items-center justify-center">
                      <Bike className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">
                        {moto.brand} {moto.model} {moto.year}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {moto.licensePlate} • {moto.currentKm.toLocaleString('pt-BR')} km
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleRentMotorcycle(moto)}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500"
                  >
                    Alugar Moto
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="rented" className="mt-6 space-y-4">
          {motorcycles.filter(m => m.status === 'rented').map((moto) => (
            <Card key={moto.id} className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-16 h-16 rounded-lg flex items-center justify-center">
                    <Bike className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg mb-1">
                      {moto.brand} {moto.model} {moto.year}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {moto.licensePlate} • {moto.currentKm.toLocaleString('pt-BR')} km
                    </p>
                  </div>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Locatário</p>
                      <p className="text-white font-semibold">{moto.rentedToName}</p>
                      <p className="text-gray-400 text-xs">{moto.rentedTo}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Tempo de locação</p>
                      <p className="text-white font-semibold">
                        {moto.rentalStartDate 
                          ? Math.floor((Date.now() - moto.rentalStartDate.getTime()) / (1000 * 60 * 60 * 24))
                          : 0} dias
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="maintenance" className="mt-6 space-y-4">
          {motorcycles.filter(m => m.status === 'maintenance').map((moto) => (
            <Card key={moto.id} className="bg-white/5 border-red-500/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-red-500 to-orange-500 w-16 h-16 rounded-lg flex items-center justify-center">
                      <Bike className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">
                        {moto.brand} {moto.model} {moto.year}
                      </h3>
                      <p className="text-gray-400 text-sm mb-2">
                        {moto.licensePlate} • {moto.currentKm.toLocaleString('pt-BR')} km
                      </p>
                      <Badge className="bg-red-500/20 text-red-400 border-0">
                        {moto.maintenanceAlerts} alertas pendentes
                      </Badge>
                    </div>
                  </div>
                  <Button variant="outline" className="border-red-500 text-red-400">
                    Ver Alertas
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Rent Modal */}
      <Dialog open={showRentModal} onOpenChange={setShowRentModal}>
        <DialogContent className="bg-slate-900 border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">Alugar Moto</DialogTitle>
            <DialogDescription className="text-gray-400">
              {selectedMoto && `${selectedMoto.brand} ${selectedMoto.model} - ${selectedMoto.licensePlate}`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-white">Nome do Locatário</Label>
              <Input 
                placeholder="Nome completo"
                className="bg-white/5 border-white/10 text-white" 
              />
            </div>
            <div>
              <Label className="text-white">CPF do Locatário</Label>
              <Input 
                placeholder="000.000.000-00"
                className="bg-white/5 border-white/10 text-white" 
              />
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <p className="text-blue-300 text-sm">
                💡 O locatário precisará instalar o AxionRide no celular dele para vincular a moto ao CPF.
              </p>
            </div>
            <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500">
              Confirmar Locação
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
