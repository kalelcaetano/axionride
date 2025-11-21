"use client";

import { useState } from "react";
import { Bike, ChevronRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface MotorcycleSetupProps {
  onComplete: (data: any) => void;
  userType: 'motoboy' | 'daily' | 'traveler' | 'fleet';
}

// Base de dados de motos por marca e ano
const motorcycleDatabase: Record<string, Record<string, string[]>> = {
  honda: {
    "2024": ["CG 160", "CB 500F", "CB 650R", "CBR 650R", "Africa Twin", "NC 750X", "PCX 160", "ADV 160", "XRE 300", "CB 300F"],
    "2023": ["CG 160", "CB 500F", "CB 650R", "CBR 650R", "Africa Twin", "NC 750X", "PCX 160", "ADV 160", "XRE 300", "CB 300F", "Biz 125"],
    "2022": ["CG 160", "CB 500F", "CB 650R", "CBR 650R", "Africa Twin", "NC 750X", "PCX 160", "ADV 160", "XRE 300", "CB 300F", "Biz 125", "Pop 110i"],
    "2021": ["CG 160", "CB 500F", "CB 650R", "CBR 650R", "Africa Twin", "NC 750X", "PCX 150", "XRE 300", "CB 300F", "Biz 125", "Pop 110i"],
    "2020": ["CG 160", "CB 500F", "CB 650R", "CBR 650R", "Africa Twin", "NC 750X", "PCX 150", "XRE 300", "CB 300F", "Biz 125", "Pop 110i"],
  },
  yamaha: {
    "2024": ["MT-03", "MT-07", "MT-09", "MT-10", "YZF-R3", "YZF-R7", "Tracer 9", "Ténéré 700", "XTZ 150", "Factor 150", "Fazer 250"],
    "2023": ["MT-03", "MT-07", "MT-09", "MT-10", "YZF-R3", "YZF-R7", "Tracer 9", "Ténéré 700", "XTZ 150", "Factor 150", "Fazer 250", "Crosser 150"],
    "2022": ["MT-03", "MT-07", "MT-09", "YZF-R3", "Tracer 900", "Ténéré 700", "XTZ 150", "Factor 150", "Fazer 250", "Crosser 150", "Neo 125"],
    "2021": ["MT-03", "MT-07", "MT-09", "YZF-R3", "Tracer 900", "Ténéré 700", "XTZ 150", "Factor 150", "Fazer 250", "Crosser 150", "Neo 125"],
    "2020": ["MT-03", "MT-07", "MT-09", "YZF-R3", "Tracer 900", "Ténéré 700", "XTZ 150", "Factor 150", "Fazer 250", "Crosser 150"],
  },
  suzuki: {
    "2024": ["GSX-S750", "GSX-S1000", "GSX-R1000", "V-Strom 650", "V-Strom 1050", "Hayabusa", "Burgman 400", "Intruder 150"],
    "2023": ["GSX-S750", "GSX-S1000", "GSX-R1000", "V-Strom 650", "V-Strom 1050", "Hayabusa", "Burgman 400", "Intruder 150", "GSX-R750"],
    "2022": ["GSX-S750", "GSX-S1000", "GSX-R1000", "V-Strom 650", "V-Strom 1050", "Hayabusa", "Burgman 400", "Intruder 150", "GSX-R750"],
    "2021": ["GSX-S750", "GSX-S1000", "GSX-R1000", "V-Strom 650", "V-Strom 1050", "Hayabusa", "Burgman 400", "Intruder 150"],
    "2020": ["GSX-S750", "GSX-S1000", "GSX-R1000", "V-Strom 650", "V-Strom 1050", "Hayabusa", "Burgman 400", "Intruder 150"],
  },
  kawasaki: {
    "2024": ["Ninja 400", "Ninja 650", "Ninja ZX-6R", "Ninja ZX-10R", "Z400", "Z650", "Z900", "Versys 650", "Versys 1000"],
    "2023": ["Ninja 400", "Ninja 650", "Ninja ZX-6R", "Ninja ZX-10R", "Z400", "Z650", "Z900", "Versys 650", "Versys 1000", "Vulcan S"],
    "2022": ["Ninja 400", "Ninja 650", "Ninja ZX-6R", "Ninja ZX-10R", "Z400", "Z650", "Z900", "Versys 650", "Versys 1000", "Vulcan S"],
    "2021": ["Ninja 400", "Ninja 650", "Ninja ZX-6R", "Ninja ZX-10R", "Z400", "Z650", "Z900", "Versys 650", "Versys 1000"],
    "2020": ["Ninja 400", "Ninja 650", "Ninja ZX-6R", "Ninja ZX-10R", "Z400", "Z650", "Z900", "Versys 650", "Versys 1000"],
  },
  bmw: {
    "2024": ["G 310 R", "G 310 GS", "F 900 R", "F 900 XR", "S 1000 RR", "R 1250 GS", "R 1250 RT", "K 1600 GT"],
    "2023": ["G 310 R", "G 310 GS", "F 900 R", "F 900 XR", "S 1000 RR", "R 1250 GS", "R 1250 RT", "K 1600 GT", "R nineT"],
    "2022": ["G 310 R", "G 310 GS", "F 900 R", "F 900 XR", "S 1000 RR", "R 1250 GS", "R 1250 RT", "K 1600 GT", "R nineT"],
    "2021": ["G 310 R", "G 310 GS", "F 900 R", "F 900 XR", "S 1000 RR", "R 1250 GS", "R 1250 RT", "K 1600 GT"],
    "2020": ["G 310 R", "G 310 GS", "F 900 R", "S 1000 RR", "R 1250 GS", "R 1250 RT", "K 1600 GT"],
  },
  harley: {
    "2024": ["Street 750", "Iron 883", "Forty-Eight", "Sportster S", "Fat Boy", "Road King", "Street Glide", "Road Glide"],
    "2023": ["Street 750", "Iron 883", "Forty-Eight", "Sportster S", "Fat Boy", "Road King", "Street Glide", "Road Glide", "Low Rider S"],
    "2022": ["Street 750", "Iron 883", "Forty-Eight", "Sportster S", "Fat Boy", "Road King", "Street Glide", "Road Glide", "Low Rider S"],
    "2021": ["Street 750", "Iron 883", "Forty-Eight", "Fat Boy", "Road King", "Street Glide", "Road Glide", "Low Rider S"],
    "2020": ["Street 750", "Iron 883", "Forty-Eight", "Fat Boy", "Road King", "Street Glide", "Road Glide"],
  },
  triumph: {
    "2024": ["Street Triple", "Speed Triple", "Tiger 900", "Tiger 1200", "Bonneville T120", "Scrambler 900", "Rocket 3"],
    "2023": ["Street Triple", "Speed Triple", "Tiger 900", "Tiger 1200", "Bonneville T120", "Scrambler 900", "Rocket 3", "Trident 660"],
    "2022": ["Street Triple", "Speed Triple", "Tiger 900", "Tiger 1200", "Bonneville T120", "Scrambler 900", "Rocket 3", "Trident 660"],
    "2021": ["Street Triple", "Speed Triple", "Tiger 900", "Tiger 1200", "Bonneville T120", "Scrambler 900", "Trident 660"],
    "2020": ["Street Triple", "Speed Triple", "Tiger 900", "Tiger 1200", "Bonneville T120", "Scrambler 900"],
  },
  ducati: {
    "2024": ["Monster", "Panigale V2", "Panigale V4", "Streetfighter V2", "Streetfighter V4", "Multistrada V4", "Scrambler Icon", "Diavel V4"],
    "2023": ["Monster", "Panigale V2", "Panigale V4", "Streetfighter V2", "Streetfighter V4", "Multistrada V4", "Scrambler Icon", "Diavel V4"],
    "2022": ["Monster", "Panigale V2", "Panigale V4", "Streetfighter V2", "Streetfighter V4", "Multistrada V4", "Scrambler Icon"],
    "2021": ["Monster", "Panigale V2", "Panigale V4", "Streetfighter V4", "Multistrada V4", "Scrambler Icon"],
    "2020": ["Monster 821", "Panigale V2", "Panigale V4", "Streetfighter V4", "Multistrada 1260", "Scrambler Icon"],
  },
  "royal-enfield": {
    "2024": ["Meteor 350", "Classic 350", "Hunter 350", "Himalayan", "Continental GT 650", "Interceptor 650", "Super Meteor 650"],
    "2023": ["Meteor 350", "Classic 350", "Hunter 350", "Himalayan", "Continental GT 650", "Interceptor 650", "Super Meteor 650"],
    "2022": ["Meteor 350", "Classic 350", "Himalayan", "Continental GT 650", "Interceptor 650"],
    "2021": ["Meteor 350", "Classic 350", "Himalayan", "Continental GT 650", "Interceptor 650"],
    "2020": ["Classic 350", "Himalayan", "Continental GT 650", "Interceptor 650"],
  },
  ktm: {
    "2024": ["Duke 200", "Duke 390", "RC 390", "Adventure 390", "Duke 790", "Duke 890", "Adventure 890", "Super Duke 1290"],
    "2023": ["Duke 200", "Duke 390", "RC 390", "Adventure 390", "Duke 790", "Duke 890", "Adventure 890", "Super Duke 1290"],
    "2022": ["Duke 200", "Duke 390", "RC 390", "Adventure 390", "Duke 790", "Duke 890", "Adventure 890"],
    "2021": ["Duke 200", "Duke 390", "RC 390", "Adventure 390", "Duke 790", "Duke 890"],
    "2020": ["Duke 200", "Duke 390", "RC 390", "Duke 790", "Duke 890"],
  },
  shineray: {
    "2024": ["Phoenix 50", "Jet 50", "Retro 50", "Jet 150", "Explorer 150"],
    "2023": ["Phoenix 50", "Jet 50", "Retro 50", "Jet 150", "Explorer 150"],
    "2022": ["Phoenix 50", "Jet 50", "Retro 50", "Jet 150"],
    "2021": ["Phoenix 50", "Jet 50", "Retro 50"],
    "2020": ["Phoenix 50", "Jet 50"],
  },
  traxx: {
    "2024": ["JH 150", "JH 250", "TS 150", "TS 250"],
    "2023": ["JH 150", "JH 250", "TS 150", "TS 250"],
    "2022": ["JH 150", "JH 250", "TS 150"],
    "2021": ["JH 150", "JH 250"],
    "2020": ["JH 150"],
  },
};

export default function MotorcycleSetup({ onComplete, userType }: MotorcycleSetupProps) {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    currentKm: '',
    licensePlate: '',
    dailyDistance: '', // Para uso diário
  });

  const [validationError, setValidationError] = useState('');
  const [availableModels, setAvailableModels] = useState<string[]>([]);

  // Atualiza modelos disponíveis quando marca ou ano mudam
  const updateAvailableModels = (brand: string, year: string) => {
    if (brand && year && motorcycleDatabase[brand]?.[year]) {
      setAvailableModels(motorcycleDatabase[brand][year]);
      setValidationError('');
    } else if (brand && year) {
      setAvailableModels([]);
      setValidationError(`Não há modelos cadastrados para ${brand.toUpperCase()} ${year}. Você pode continuar, mas recomendamos verificar os dados.`);
    } else {
      setAvailableModels([]);
      setValidationError('');
    }
  };

  const handleBrandChange = (value: string) => {
    setFormData({ ...formData, brand: value, model: '' });
    updateAvailableModels(value, formData.year);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const year = e.target.value;
    setFormData({ ...formData, year, model: '' });
    updateAvailableModels(formData.brand, year);
  };

  const handleModelChange = (value: string) => {
    setFormData({ ...formData, model: value });
    
    // Validação: verifica se o modelo existe para a marca e ano selecionados
    if (formData.brand && formData.year && motorcycleDatabase[formData.brand]?.[formData.year]) {
      const validModels = motorcycleDatabase[formData.brand][formData.year];
      if (!validModels.includes(value)) {
        setValidationError(`⚠️ O modelo "${value}" pode não existir para ${formData.brand.toUpperCase()} ${formData.year}. Verifique os dados antes de continuar.`);
      } else {
        setValidationError('');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação final antes de enviar
    if (formData.brand && formData.year && formData.model) {
      const validModels = motorcycleDatabase[formData.brand]?.[formData.year];
      if (validModels && !validModels.includes(formData.model)) {
        setValidationError(`⚠️ ATENÇÃO: O modelo "${formData.model}" pode não existir para ${formData.brand.toUpperCase()} ${formData.year}. Tem certeza que deseja continuar?`);
        // Permite continuar mesmo com erro
      }
    }
    
    onComplete(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-slate-900 border-white/10">
        <CardHeader className="text-center">
          <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Bike className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-white text-3xl">Configure sua moto</CardTitle>
          <CardDescription className="text-gray-400 text-lg">
            Precisamos de algumas informações para começar o monitoramento inteligente
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {validationError && (
              <Alert className="bg-yellow-500/10 border-yellow-500/30">
                <AlertCircle className="h-4 w-4 text-yellow-500" />
                <AlertDescription className="text-yellow-300">
                  {validationError}
                </AlertDescription>
              </Alert>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="brand" className="text-white">Marca</Label>
                <Select
                  value={formData.brand}
                  onValueChange={handleBrandChange}
                  required
                >
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="Selecione a marca" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="honda">Honda</SelectItem>
                    <SelectItem value="yamaha">Yamaha</SelectItem>
                    <SelectItem value="suzuki">Suzuki</SelectItem>
                    <SelectItem value="kawasaki">Kawasaki</SelectItem>
                    <SelectItem value="bmw">BMW</SelectItem>
                    <SelectItem value="harley">Harley-Davidson</SelectItem>
                    <SelectItem value="triumph">Triumph</SelectItem>
                    <SelectItem value="ducati">Ducati</SelectItem>
                    <SelectItem value="royal-enfield">Royal Enfield</SelectItem>
                    <SelectItem value="ktm">KTM</SelectItem>
                    <SelectItem value="shineray">Shineray</SelectItem>
                    <SelectItem value="traxx">Traxx</SelectItem>
                    <SelectItem value="outras">Outras</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="year" className="text-white">Ano</Label>
                <Input
                  id="year"
                  type="number"
                  placeholder="2024"
                  value={formData.year}
                  onChange={handleYearChange}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                  required
                  min="1900"
                  max="2025"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="model" className="text-white">Modelo</Label>
              {availableModels.length > 0 ? (
                <Select
                  value={formData.model}
                  onValueChange={handleModelChange}
                  required
                >
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="Selecione o modelo" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {availableModels.map((model) => (
                      <SelectItem key={model} value={model}>
                        {model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  id="model"
                  type="text"
                  placeholder="Ex: CG 160, MT-03, GSX-S750"
                  value={formData.model}
                  onChange={(e) => handleModelChange(e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                  required
                />
              )}
              {formData.brand && formData.year && availableModels.length === 0 && (
                <p className="text-yellow-400 text-sm mt-1">
                  ⚠️ Nenhum modelo encontrado para esta combinação. Digite manualmente.
                </p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="licensePlate" className="text-white">Placa</Label>
                <Input
                  id="licensePlate"
                  type="text"
                  placeholder="ABC-1234"
                  value={formData.licensePlate}
                  onChange={(e) => setFormData({ ...formData, licensePlate: e.target.value.toUpperCase() })}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                  required
                />
              </div>

              <div>
                <Label htmlFor="currentKm" className="text-white">Quilometragem atual</Label>
                <Input
                  id="currentKm"
                  type="number"
                  placeholder="15000"
                  value={formData.currentKm}
                  onChange={(e) => setFormData({ ...formData, currentKm: e.target.value })}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                  required
                  min="0"
                />
              </div>
            </div>

            {userType === 'daily' && (
              <div>
                <Label htmlFor="dailyDistance" className="text-white">
                  Distância casa → trabalho (km)
                </Label>
                <Input
                  id="dailyDistance"
                  type="number"
                  placeholder="15"
                  value={formData.dailyDistance}
                  onChange={(e) => setFormData({ ...formData, dailyDistance: e.target.value })}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                  required
                  min="0"
                  step="0.1"
                />
                <p className="text-gray-400 text-sm mt-1">
                  Distância de ida (a volta será calculada automaticamente)
                </p>
              </div>
            )}

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <p className="text-blue-300 text-sm">
                💡 <strong>Dica:</strong> Após configurar, você poderá registrar quando fez cada manutenção pela última vez para receber alertas precisos.
              </p>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold text-lg py-6"
            >
              Continuar
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
