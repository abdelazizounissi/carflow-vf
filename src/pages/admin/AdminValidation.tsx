
import AdminLayout from "@/components/admin/AdminLayout";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckSquare, 
  X, 
  AlertCircle, 
  Car, 
  Calendar, 
  DollarSign, 
  User, 
  MapPin 
} from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PendingVehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  agency: {
    id: string;
    name: string;
    email: string;
  };
  category: string;
  price: number;
  description: string;
  features: string[];
  images: string[];
  location: string;
  submittedDate: string;
}

const AdminValidation = () => {
  const [pendingVehicles, setPendingVehicles] = useState<PendingVehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call
    const fetchPendingVehicles = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Example data
      setPendingVehicles([
        {
          id: "v1",
          make: "Volkswagen",
          model: "Golf",
          year: 2022,
          agency: {
            id: "a1",
            name: "Easy Car",
            email: "contact@easycar.tn"
          },
          category: "Compacte",
          price: 110,
          description: "Volkswagen Golf en parfait état. Voiture fiable et économique, idéale pour les déplacements en ville et les voyages.",
          features: ["Climatisation", "Radio", "Bluetooth", "USB", "GPS", "Caméra de recul"],
          images: ["https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=1974&auto=format&fit=crop"],
          location: "Tunis",
          submittedDate: "2023-11-15"
        },
        {
          id: "v2",
          make: "Mercedes",
          model: "Classe C",
          year: 2021,
          agency: {
            id: "a2",
            name: "Premium Cars",
            email: "info@premiumcars.tn"
          },
          category: "Premium",
          price: 200,
          description: "Mercedes Classe C, véhicule haut de gamme offrant confort et performance. Parfait pour les déplacements professionnels ou familiaux.",
          features: ["Climatisation", "Cuir", "Système audio premium", "Navigation", "Caméra 360°", "Sièges électriques", "Toit panoramique"],
          images: ["https://images.unsplash.com/photo-1617469767053-8f6465fae8b9?q=80&w=2070&auto=format&fit=crop"],
          location: "Sousse",
          submittedDate: "2023-11-20"
        },
        {
          id: "v3",
          make: "Audi",
          model: "A4",
          year: 2020,
          agency: {
            id: "a3",
            name: "Elite Auto",
            email: "contact@eliteauto.tn"
          },
          category: "Premium",
          price: 180,
          description: "Audi A4 en excellent état. Véhicule sportif et élégant avec toutes les options pour un confort optimal.",
          features: ["Climatisation", "Intérieur cuir", "Système audio premium", "GPS intégré", "Caméra de recul", "Régulateur de vitesse adaptatif"],
          images: ["https://images.unsplash.com/photo-1669219566695-b8297ae9e5f0?q=80&w=2070&auto=format&fit=crop"],
          location: "Hammamet",
          submittedDate: "2023-11-22"
        }
      ]);
      
      setIsLoading(false);
    };
    
    fetchPendingVehicles();
  }, []);

  const handleApprove = (id: string) => {
    console.log(`Vehicle ${id} approved`);
    // Here you would make API call to approve vehicle
    setPendingVehicles(pendingVehicles.filter(vehicle => vehicle.id !== id));
  };

  const handleReject = (id: string) => {
    console.log(`Vehicle ${id} rejected`);
    // Here you would make API call to reject vehicle
    setPendingVehicles(pendingVehicles.filter(vehicle => vehicle.id !== id));
  };

  return (
    <AdminLayout title="Validation véhicules">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Validation des véhicules</h2>
            <p className="text-gray-500 mt-1">
              {pendingVehicles.length} véhicule{pendingVehicles.length !== 1 ? 's' : ''} en attente de validation
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-96 bg-gray-200 animate-pulse rounded-lg"></div>
            ))}
          </div>
        ) : pendingVehicles.length === 0 ? (
          <Card className="border-dashed bg-gray-50">
            <CardContent className="py-10 text-center">
              <CheckSquare className="h-12 w-12 mx-auto text-green-500 mb-4" />
              <h3 className="text-lg font-medium mb-2">Aucun véhicule en attente</h3>
              <p className="text-gray-500">
                Tous les véhicules ont été validés. Revenez plus tard pour de nouvelles validations.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pendingVehicles.map((vehicle) => (
              <Card key={vehicle.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">
                      {vehicle.make} {vehicle.model}
                    </CardTitle>
                    <Badge variant="outline" className="bg-amber-100 text-amber-800">
                      En attente
                    </Badge>
                  </div>
                  <CardDescription>Soumis le {new Date(vehicle.submittedDate).toLocaleDateString('fr-FR')}</CardDescription>
                </CardHeader>
                <Tabs defaultValue="details">
                  <TabsList className="mx-6">
                    <TabsTrigger value="details">Détails</TabsTrigger>
                    <TabsTrigger value="images">Images</TabsTrigger>
                  </TabsList>
                  <TabsContent value="details" className="p-6 pt-2">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="text-sm">Année: {vehicle.year}</span>
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="text-sm">Prix: {vehicle.price} DT/jour</span>
                        </div>
                        <div className="flex items-center">
                          <Car className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="text-sm">Catégorie: {vehicle.category}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="text-sm">Lieu: {vehicle.location}</span>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-1">Description</h4>
                        <p className="text-sm text-gray-600 line-clamp-3">
                          {vehicle.description}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-1">Caractéristiques</h4>
                        <div className="flex flex-wrap gap-1">
                          {vehicle.features.slice(0, 5).map((feature, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                          {vehicle.features.length > 5 && (
                            <Badge variant="secondary" className="text-xs">
                              +{vehicle.features.length - 5}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-1">Agence</h4>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2 text-gray-500" />
                          <div>
                            <p className="text-sm font-medium">{vehicle.agency.name}</p>
                            <p className="text-xs text-gray-500">{vehicle.agency.email}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="images" className="p-0">
                    <AspectRatio ratio={16 / 9}>
                      <img
                        src={vehicle.images[0]}
                        alt={`${vehicle.make} ${vehicle.model}`}
                        className="object-cover h-full w-full"
                      />
                    </AspectRatio>
                    <div className="p-4">
                      <p className="text-sm text-gray-500">Image principale</p>
                    </div>
                  </TabsContent>
                </Tabs>
                <CardFooter className="bg-gray-50">
                  <div className="flex space-x-2 w-full">
                    <Button 
                      variant="destructive" 
                      className="w-1/2"
                      onClick={() => handleReject(vehicle.id)}
                    >
                      <X className="mr-2 h-4 w-4" /> Rejeter
                    </Button>
                    <Button 
                      className="w-1/2"
                      onClick={() => handleApprove(vehicle.id)}
                    >
                      <CheckSquare className="mr-2 h-4 w-4" /> Approuver
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminValidation;
