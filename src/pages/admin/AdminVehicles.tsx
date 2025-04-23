
import AdminLayout from "@/components/admin/AdminLayout";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Car, Search, Filter, Plus, Edit, Trash, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  agency: string;
  category: string;
  status: "active" | "pending" | "rejected";
  price: number;
}

const AdminVehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call
    const fetchVehicles = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Example data
      setVehicles([
        {
          id: "v1",
          make: "Renault",
          model: "Clio",
          year: 2020,
          agency: "Auto Premium",
          category: "Économique",
          status: "active",
          price: 90
        },
        {
          id: "v2",
          make: "Peugeot",
          model: "208",
          year: 2021,
          agency: "Location Facile",
          category: "Économique",
          status: "active",
          price: 85
        },
        {
          id: "v3",
          make: "Dacia",
          model: "Duster",
          year: 2019,
          agency: "Auto Tunisie",
          category: "SUV",
          status: "active",
          price: 120
        },
        {
          id: "v4",
          make: "Volkswagen",
          model: "Golf",
          year: 2022,
          agency: "Easy Car",
          category: "Compacte",
          status: "pending",
          price: 110
        },
        {
          id: "v5",
          make: "BMW",
          model: "Serie 3",
          year: 2020,
          agency: "Auto Premium",
          category: "Premium",
          status: "active",
          price: 180
        },
        {
          id: "v6",
          make: "Mercedes",
          model: "Classe C",
          year: 2021,
          agency: "Premium Cars",
          category: "Premium",
          status: "pending",
          price: 200
        },
        {
          id: "v7",
          make: "Kia",
          model: "Sportage",
          year: 2020,
          agency: "Auto Speed",
          category: "SUV",
          status: "rejected",
          price: 130
        },
        {
          id: "v8",
          make: "Hyundai",
          model: "Tucson",
          year: 2022,
          agency: "Easy Car",
          category: "SUV",
          status: "active",
          price: 140
        }
      ]);
      
      setIsLoading(false);
    };
    
    fetchVehicles();
  }, []);
  
  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = 
      vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.agency.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !filterCategory || vehicle.category === filterCategory;
    const matchesStatus = !filterStatus || vehicle.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });
  
  const categories = [...new Set(vehicles.map(v => v.category))];
  
  const statusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">En attente</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">Rejetée</Badge>;
      default:
        return null;
    }
  };

  return (
    <AdminLayout title="Gestion des véhicules">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Liste des véhicules</h2>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Ajouter un véhicule
          </Button>
        </div>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher par marque, modèle ou agence"
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <div className="w-40">
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Toutes les catégories</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="w-40">
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Tous les statuts</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">En attente</SelectItem>
                      <SelectItem value="rejected">Rejetée</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {isLoading ? (
          <div className="space-y-4">
            <div className="h-10 bg-gray-200 animate-pulse rounded"></div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 animate-pulse rounded"></div>
            ))}
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Véhicule</TableHead>
                  <TableHead>Année</TableHead>
                  <TableHead>Agence</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Prix/jour</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVehicles.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10 text-gray-500">
                      <Car className="w-10 h-10 mx-auto mb-2 text-gray-400" />
                      Aucun véhicule trouvé
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredVehicles.map((vehicle) => (
                    <TableRow key={vehicle.id}>
                      <TableCell className="font-medium">
                        {vehicle.make} {vehicle.model}
                      </TableCell>
                      <TableCell>{vehicle.year}</TableCell>
                      <TableCell>{vehicle.agency}</TableCell>
                      <TableCell>{vehicle.category}</TableCell>
                      <TableCell>{vehicle.price} DT</TableCell>
                      <TableCell>{statusBadge(vehicle.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminVehicles;
