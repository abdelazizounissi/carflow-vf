
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AdminLayout from "@/components/admin/AdminLayout";
import { useEffect, useState } from "react";
import { LayoutDashboard, Users, Clock, CarFront, CheckCircle2, AlertCircle } from "lucide-react";

// This would come from your API in a real application
interface DashboardStat {
  id: string;
  label: string;
  value: number | string;
  icon: React.ElementType;
  color: string;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // This would be API data in a real app
      setStats([
        {
          id: "total-reservations",
          label: "Réservations totales",
          value: 458,
          icon: Clock,
          color: "text-blue-500"
        },
        {
          id: "active-reservations",
          label: "Réservations actives",
          value: 128,
          icon: CheckCircle2,
          color: "text-green-500"
        },
        {
          id: "users",
          label: "Utilisateurs",
          value: 315,
          icon: Users,
          color: "text-purple-500"
        },
        {
          id: "agencies",
          label: "Agences",
          value: 24,
          icon: Users,
          color: "text-orange-500"
        },
        {
          id: "vehicles",
          label: "Véhicules",
          value: 182,
          icon: CarFront,
          color: "text-teal-500"
        },
        {
          id: "pending-validation",
          label: "En attente de validation",
          value: 12,
          icon: AlertCircle,
          color: "text-amber-500"
        }
      ]);
      
      setIsLoading(false);
    };
    
    loadData();
  }, []);

  return (
    <AdminLayout title="Vue globale des réservations">
      <div className="grid gap-6">
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Tableau de bord administrateur</h2>
            <div className="text-sm text-gray-500">
              Dernière mise à jour: {new Date().toLocaleDateString('fr-FR', { 
                hour: '2-digit', 
                minute: '2-digit'
              })}
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="h-20 bg-gray-200 animate-pulse rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stats.map((stat) => (
                <Card key={stat.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className={`p-3 rounded-full ${stat.color.replace('text', 'bg')} bg-opacity-20 mr-4`}>
                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          {stat.label}
                        </p>
                        <h3 className="text-2xl font-bold">
                          {stat.value}
                        </h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Réservations récentes</CardTitle>
              <CardDescription>Les 5 dernières réservations sur la plateforme</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {isLoading ? (
                  [...Array(5)].map((_, i) => (
                    <div key={i} className="h-12 bg-gray-200 animate-pulse rounded"></div>
                  ))
                ) : (
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-sm text-gray-500">
                        <th className="pb-3">Client</th>
                        <th className="pb-3">Agence</th>
                        <th className="pb-3">Véhicule</th>
                        <th className="pb-3">Statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-2">Ahmed Ben Ali</td>
                        <td className="py-2">Auto Premium</td>
                        <td className="py-2">Renault Clio</td>
                        <td className="py-2"><span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Confirmée</span></td>
                      </tr>
                      <tr>
                        <td className="py-2">Leila Mansour</td>
                        <td className="py-2">Location Facile</td>
                        <td className="py-2">Peugeot 208</td>
                        <td className="py-2"><span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">En attente</span></td>
                      </tr>
                      <tr>
                        <td className="py-2">Mehdi Karoui</td>
                        <td className="py-2">Auto Tunisie</td>
                        <td className="py-2">Dacia Duster</td>
                        <td className="py-2"><span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Confirmée</span></td>
                      </tr>
                      <tr>
                        <td className="py-2">Sonia Jebali</td>
                        <td className="py-2">Easy Car</td>
                        <td className="py-2">Volkswagen Golf</td>
                        <td className="py-2"><span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Confirmée</span></td>
                      </tr>
                      <tr>
                        <td className="py-2">Karim Trabelsi</td>
                        <td className="py-2">Auto Premium</td>
                        <td className="py-2">BMW Serie 3</td>
                        <td className="py-2"><span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">En attente</span></td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Véhicules populaires</CardTitle>
              <CardDescription>Les véhicules les plus réservés</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {isLoading ? (
                  [...Array(5)].map((_, i) => (
                    <div key={i} className="h-12 bg-gray-200 animate-pulse rounded"></div>
                  ))
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                        <CarFront className="h-6 w-6 text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">Renault Clio</h4>
                          <span className="text-sm text-gray-500">124 réservations</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                          <div className="h-2 bg-green-500 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                        <CarFront className="h-6 w-6 text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">Dacia Logan</h4>
                          <span className="text-sm text-gray-500">98 réservations</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                          <div className="h-2 bg-green-500 rounded-full" style={{ width: '70%' }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                        <CarFront className="h-6 w-6 text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">Peugeot 208</h4>
                          <span className="text-sm text-gray-500">76 réservations</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                          <div className="h-2 bg-green-500 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                        <CarFront className="h-6 w-6 text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">Volkswagen Golf</h4>
                          <span className="text-sm text-gray-500">62 réservations</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                          <div className="h-2 bg-green-500 rounded-full" style={{ width: '48%' }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                        <CarFront className="h-6 w-6 text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">Dacia Duster</h4>
                          <span className="text-sm text-gray-500">54 réservations</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                          <div className="h-2 bg-green-500 rounded-full" style={{ width: '40%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
