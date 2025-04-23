
// Just a minor fix to the error by completely removing the code with the error
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Monitor, Server, AlertCircle, Activity, Database, Car, Users, Calendar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

interface SystemStatus {
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  uptime: string;
  lastRestart: string;
  databaseConnections: number;
  databaseQueryTime: number;
  totalUsers: number;
  activeUsers: number;
  totalVehicles: number;
  activeReservations: number;
  lastErrors: SystemError[];
  performanceMetrics: PerformanceMetric[];
}

interface SystemError {
  id: string;
  timestamp: string;
  message: string;
  severity: "low" | "medium" | "high";
  component: string;
  status: "new" | "investigating" | "resolved";
}

interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  status: "good" | "warning" | "critical";
  trend: "improving" | "stable" | "degrading";
}

const AdminMonitoring = () => {
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchSystemStatus = async () => {
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Example data
      setSystemStatus({
        cpuUsage: 28,
        memoryUsage: 42,
        diskUsage: 65,
        uptime: "14 jours, 6 heures",
        lastRestart: "2023-11-15T04:30:00",
        databaseConnections: 24,
        databaseQueryTime: 42,
        totalUsers: 478,
        activeUsers: 36,
        totalVehicles: 182,
        activeReservations: 128,
        lastErrors: [
          {
            id: "e1",
            timestamp: "2023-11-28T14:22:15",
            message: "Timeout lors de la connexion à la passerelle de paiement",
            severity: "medium",
            component: "Payment Gateway",
            status: "investigating"
          },
          {
            id: "e2",
            timestamp: "2023-11-28T10:45:30",
            message: "Erreur de chargement des images pour 3 véhicules",
            severity: "low",
            component: "Media Storage",
            status: "new"
          },
          {
            id: "e3",
            timestamp: "2023-11-27T18:12:05",
            message: "Pic de latence dans les requêtes API",
            severity: "low",
            component: "API Server",
            status: "resolved"
          }
        ],
        performanceMetrics: [
          {
            name: "Temps de réponse API",
            value: 125,
            unit: "ms",
            status: "good",
            trend: "stable"
          },
          {
            name: "Temps de chargement page",
            value: 1.8,
            unit: "s",
            status: "good",
            trend: "improving"
          },
          {
            name: "Taux de conversion",
            value: 8.2,
            unit: "%",
            status: "good",
            trend: "improving"
          },
          {
            name: "Taux d'erreur",
            value: 0.8,
            unit: "%",
            status: "good",
            trend: "stable"
          },
          {
            name: "Temps de requête DB",
            value: 85,
            unit: "ms",
            status: "warning",
            trend: "degrading"
          }
        ]
      });
      
      setIsLoading(false);
    };
    
    fetchSystemStatus();
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      setSystemStatus(prev => {
        if (!prev) return null;
        
        return {
          ...prev,
          cpuUsage: Math.min(100, Math.max(15, prev.cpuUsage + (Math.random() * 6 - 3))),
          memoryUsage: Math.min(100, Math.max(25, prev.memoryUsage + (Math.random() * 4 - 2))),
          activeUsers: Math.max(10, prev.activeUsers + (Math.random() > 0.5 ? 1 : -1)),
        };
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (value: number, thresholds: [number, number]) => {
    if (value < thresholds[0]) return "text-green-500";
    if (value < thresholds[1]) return "text-amber-500";
    return "text-red-500";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSeverityBadge = (severity: string) => {
    switch(severity) {
      case 'low':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Faible</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800">Moyenne</Badge>;
      case 'high':
        return <Badge variant="outline" className="bg-red-100 text-red-800">Élevée</Badge>;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'new':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Nouveau</Badge>;
      case 'investigating':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800">En cours</Badge>;
      case 'resolved':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Résolu</Badge>;
      default:
        return null;
    }
  };

  const getMetricStatus = (status: string) => {
    switch(status) {
      case 'good':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Bon</Badge>;
      case 'warning':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800">Attention</Badge>;
      case 'critical':
        return <Badge variant="outline" className="bg-red-100 text-red-800">Critique</Badge>;
      default:
        return null;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch(trend) {
      case 'improving':
        return <span className="text-green-500">↑</span>;
      case 'stable':
        return <span className="text-gray-500">→</span>;
      case 'degrading':
        return <span className="text-red-500">↓</span>;
      default:
        return null;
    }
  };

  return (
    <AdminLayout title="Interface de monitoring">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Statut du système</h2>
          <div className="text-sm text-gray-500">
            Dernière mise à jour: {new Date().toLocaleTimeString('fr-FR')}
          </div>
        </div>

        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Aperçu</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="errors">Erreurs</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            {isLoading ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-32 bg-gray-200 animate-pulse rounded-lg"></div>
                ))}
              </div>
            ) : systemStatus && (
              <>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Utilisation CPU</CardTitle>
                      <Server className={`h-4 w-4 ${getStatusColor(systemStatus.cpuUsage, [50, 80])}`} />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{systemStatus.cpuUsage.toFixed(1)}%</div>
                      <Progress 
                        value={systemStatus.cpuUsage} 
                        className="mt-2 h-2"
                      />
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Utilisation Mémoire</CardTitle>
                      <Monitor className={`h-4 w-4 ${getStatusColor(systemStatus.memoryUsage, [60, 85])}`} />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{systemStatus.memoryUsage.toFixed(1)}%</div>
                      <Progress 
                        value={systemStatus.memoryUsage} 
                        className="mt-2 h-2"
                      />
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Utilisation Disque</CardTitle>
                      <Database className={`h-4 w-4 ${getStatusColor(systemStatus.diskUsage, [70, 90])}`} />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{systemStatus.diskUsage.toFixed(1)}%</div>
                      <Progress 
                        value={systemStatus.diskUsage} 
                        className="mt-2 h-2"
                      />
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Utilisateurs actifs</CardTitle>
                      <Users className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{systemStatus.activeUsers}</div>
                      <p className="text-xs text-gray-500 mt-2">
                        {systemStatus.totalUsers} utilisateurs au total
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Véhicules</CardTitle>
                      <Car className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{systemStatus.totalVehicles}</div>
                      <p className="text-xs text-gray-500 mt-2">
                        Dernière mise à jour il y a 2 heures
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Réservations actives</CardTitle>
                      <Calendar className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{systemStatus.activeReservations}</div>
                      <p className="text-xs text-gray-500 mt-2">
                        Dernière mise à jour il y a 15 minutes
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Informations système</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <dl className="space-y-4">
                        <div className="flex justify-between">
                          <dt className="text-sm font-medium text-gray-500">Temps d'activité</dt>
                          <dd className="text-sm">{systemStatus.uptime}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm font-medium text-gray-500">Dernier redémarrage</dt>
                          <dd className="text-sm">{formatDate(systemStatus.lastRestart)}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm font-medium text-gray-500">Connexions Base de données</dt>
                          <dd className="text-sm">{systemStatus.databaseConnections}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm font-medium text-gray-500">Temps requête moyen DB</dt>
                          <dd className="text-sm">{systemStatus.databaseQueryTime} ms</dd>
                        </div>
                      </dl>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Erreurs récentes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {systemStatus.lastErrors.length === 0 ? (
                        <div className="text-center py-6">
                          <p className="text-gray-500">Aucune erreur récente</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {systemStatus.lastErrors.slice(0, 3).map((error) => (
                            <div key={error.id} className="flex items-start gap-3">
                              <AlertCircle className={`h-5 w-5 ${
                                error.severity === 'high' 
                                  ? 'text-red-500' 
                                  : error.severity === 'medium' 
                                    ? 'text-amber-500' 
                                    : 'text-blue-500'
                              }`} />
                              <div>
                                <p className="text-sm font-medium">{error.message}</p>
                                <div className="flex gap-2 mt-1">
                                  {getSeverityBadge(error.severity)}
                                  <span className="text-xs text-gray-500">
                                    {formatDate(error.timestamp)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="performance" className="space-y-6 mt-6">
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-16 bg-gray-200 animate-pulse rounded-lg"></div>
                ))}
              </div>
            ) : systemStatus && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Métriques de performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {systemStatus.performanceMetrics.map((metric, index) => (
                        <div key={index} className="grid grid-cols-4 gap-4 items-center">
                          <div className="col-span-1 font-medium">{metric.name}</div>
                          <div className="col-span-1 text-center">
                            {metric.value} {metric.unit}
                          </div>
                          <div className="col-span-1 text-center">
                            {getMetricStatus(metric.status)}
                          </div>
                          <div className="col-span-1 text-center">
                            Tendance: {getTrendIcon(metric.trend)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Statistiques de base de données</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Connexions actives</h4>
                        <div className="text-2xl font-bold">{systemStatus.databaseConnections}</div>
                        <Progress 
                          value={(systemStatus.databaseConnections / 50) * 100} 
                          className="mt-2 h-2"
                        />
                        <p className="text-xs text-gray-500 mt-1">Maximum: 50</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Temps de requête moyen</h4>
                        <div className="text-2xl font-bold">{systemStatus.databaseQueryTime} ms</div>
                        <Progress 
                          value={(systemStatus.databaseQueryTime / 200) * 100} 
                          className="mt-2 h-2"
                        />
                        <p className="text-xs text-gray-500 mt-1">Cible: &lt; 50 ms</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Temps de réponse API</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">GET /api/vehicles</h4>
                          <p className="text-sm text-gray-500">Liste des véhicules</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">87 ms</p>
                          <p className="text-xs text-gray-500">P95: 120 ms</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">GET /api/reservations</h4>
                          <p className="text-sm text-gray-500">Liste des réservations</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">132 ms</p>
                          <p className="text-xs text-gray-500">P95: 180 ms</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">POST /api/reservations</h4>
                          <p className="text-sm text-gray-500">Créer une réservation</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">215 ms</p>
                          <p className="text-xs text-gray-500">P95: 280 ms</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">GET /api/users</h4>
                          <p className="text-sm text-gray-500">Liste des utilisateurs</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">78 ms</p>
                          <p className="text-xs text-gray-500">P95: 110 ms</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="errors" className="space-y-6 mt-6">
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-24 bg-gray-200 animate-pulse rounded-lg"></div>
                ))}
              </div>
            ) : systemStatus && (
              <div className="space-y-6">
                {systemStatus.lastErrors.length === 0 ? (
                  <Alert>
                    <Activity className="h-4 w-4" />
                    <AlertTitle>Aucune erreur</AlertTitle>
                    <AlertDescription>
                      Le système fonctionne normalement, aucune erreur n'a été détectée.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <div className="space-y-4">
                    {systemStatus.lastErrors.map((error) => (
                      <Card key={error.id}>
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <AlertCircle className={`h-10 w-10 ${
                              error.severity === 'high' 
                                ? 'text-red-500' 
                                : error.severity === 'medium' 
                                  ? 'text-amber-500' 
                                  : 'text-blue-500'
                            }`} />
                            <div className="flex-1">
                              <div className="flex flex-wrap items-center gap-2 mb-2">
                                {getSeverityBadge(error.severity)}
                                {getStatusBadge(error.status)}
                                <span className="text-sm text-gray-500">
                                  {formatDate(error.timestamp)}
                                </span>
                              </div>
                              <h3 className="text-lg font-medium mb-2">{error.message}</h3>
                              <div className="flex flex-wrap gap-4 text-sm">
                                <div>
                                  <span className="text-gray-500">Composant:</span> {error.component}
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminMonitoring;
