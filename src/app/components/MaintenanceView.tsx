"use client";

import { useState } from "react";
import { Wrench, AlertTriangle, CheckCircle2, Clock, Edit } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface MaintenanceViewProps {
  motorcycle: any;
}

interface MaintenanceItem {
  id: string;
  type: string;
  name: string;
  lastChangeKm: number;
  intervalKm: number;
  icon: string;
}

export default function MaintenanceView({ motorcycle }: MaintenanceViewProps) {
  const currentKm = parseInt(motorcycle?.currentKm || '0');
  
  const [maintenanceItems, setMaintenanceItems] = useState<MaintenanceItem[]>([
    { id: '1', type: 'oil', name: 'Óleo do motor', lastChangeKm: currentKm - 2500, intervalKm: 3000, icon: '🛢️' },
    { id: '2', type: 'oil-filter', name: 'Filtro de óleo', lastChangeKm: currentKm - 2500, intervalKm: 3000, icon: '🔧' },
    { id: '3', type: 'air-filter', name: 'Filtro de ar', lastChangeKm: currentKm - 4000, intervalKm: 6000, icon: '💨' },
    { id: '4', type: 'brake-fluid', name: 'Fluido de freio', lastChangeKm: currentKm - 8000, intervalKm: 12000, icon: '🛑' },
    { id: '5', type: 'tires', name: 'Pneus', lastChangeKm: currentKm - 10000, intervalKm: 15000, icon: '⚫' },
    { id: '6', type: 'chain-kit', name: 'Kit relação', lastChangeKm: currentKm - 15000, intervalKm: 20000, icon: '⛓️' },
  ]);

  const [editingItem, setEditingItem] = useState<MaintenanceItem | null>(null);
  const [editKm, setEditKm] = useState('');

  const getMaintenanceStatus = (item: MaintenanceItem) => {
    const kmSinceChange = currentKm - item.lastChangeKm;
    const nextChangeKm = item.lastChangeKm + item.intervalKm;
    const kmRemaining = nextChangeKm - currentKm;
    const percentage = (kmSinceChange / item.intervalKm) * 100;

    if (percentage >= 100) {
      return { status: 'urgent', label: 'URGENTE', color: 'text-red-500', bgColor: 'bg-red-500/10', borderColor: 'border-red-500' };
    } else if (percentage >= 80) {
      return { status: 'warning', label: 'EM BREVE', color: 'text-yellow-500', bgColor: 'bg-yellow-500/10', borderColor: 'border-yellow-500' };
    } else {
      return { status: 'ok', label: 'OK', color: 'text-green-500', bgColor: 'bg-green-500/10', borderColor: 'border-green-500' };
    }
  };

  const handleUpdateMaintenance = (item: MaintenanceItem) => {
    if (!editKm) return;
    
    const updatedItems = maintenanceItems.map(i => 
      i.id === item.id ? { ...i, lastChangeKm: parseInt(editKm) } : i
    );
    setMaintenanceItems(updatedItems);
    setEditingItem(null);
    setEditKm('');
  };

  const urgentItems = maintenanceItems.filter(item => getMaintenanceStatus(item).status === 'urgent');
  const warningItems = maintenanceItems.filter(item => getMaintenanceStatus(item).status === 'warning');
  const okItems = maintenanceItems.filter(item => getMaintenanceStatus(item).status === 'ok');

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-red-500/10 border-red-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-red-500 text-lg flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Urgente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">{urgentItems.length}</p>
            <p className="text-gray-400 text-sm">Manutenções atrasadas</p>
          </CardContent>
        </Card>

        <Card className="bg-yellow-500/10 border-yellow-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-yellow-500 text-lg flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Em breve
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">{warningItems.length}</p>
            <p className="text-gray-400 text-sm">Próximas manutenções</p>
          </CardContent>
        </Card>

        <Card className="bg-green-500/10 border-green-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-green-500 text-lg flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Em dia
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">{okItems.length}</p>
            <p className="text-gray-400 text-sm">Itens OK</p>
          </CardContent>
        </Card>
      </div>

      {/* Motorcycle Info */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Wrench className="w-5 h-5" />
            {motorcycle?.brand} {motorcycle?.model} - {motorcycle?.year}
          </CardTitle>
          <CardDescription className="text-gray-400">
            Quilometragem atual: <span className="text-white font-semibold">{currentKm.toLocaleString('pt-BR')} km</span>
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Maintenance Items */}
      <div className="space-y-4">
        <h3 className="text-white text-xl font-semibold">Itens de Manutenção</h3>
        
        {maintenanceItems.map((item) => {
          const status = getMaintenanceStatus(item);
          const kmSinceChange = currentKm - item.lastChangeKm;
          const nextChangeKm = item.lastChangeKm + item.intervalKm;
          const kmRemaining = nextChangeKm - currentKm;
          const percentage = Math.min((kmSinceChange / item.intervalKm) * 100, 100);

          return (
            <Card key={item.id} className={`bg-white/5 border ${status.borderColor}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{item.icon}</span>
                    <div>
                      <h4 className="text-white font-semibold text-lg">{item.name}</h4>
                      <p className="text-gray-400 text-sm">
                        Última troca: {item.lastChangeKm.toLocaleString('pt-BR')} km
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`${status.bgColor} ${status.color} border-0`}>
                      {status.label}
                    </Badge>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-gray-400 hover:text-white"
                          onClick={() => {
                            setEditingItem(item);
                            setEditKm(item.lastChangeKm.toString());
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-slate-900 border-white/10">
                        <DialogHeader>
                          <DialogTitle className="text-white">Atualizar {item.name}</DialogTitle>
                          <DialogDescription className="text-gray-400">
                            Informe a quilometragem da última troca
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="editKm" className="text-white">
                              Quilometragem da última troca
                            </Label>
                            <Input
                              id="editKm"
                              type="number"
                              value={editKm}
                              onChange={(e) => setEditKm(e.target.value)}
                              className="bg-white/5 border-white/10 text-white"
                            />
                          </div>
                          <Button
                            onClick={() => handleUpdateMaintenance(item)}
                            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500"
                          >
                            Salvar
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Progresso até próxima troca</span>
                    <span className={status.color}>
                      {kmRemaining > 0 
                        ? `${kmRemaining.toLocaleString('pt-BR')} km restantes`
                        : `${Math.abs(kmRemaining).toLocaleString('pt-BR')} km atrasado`
                      }
                    </span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                  <p className="text-gray-400 text-xs">
                    Próxima troca em: {nextChangeKm.toLocaleString('pt-BR')} km
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
