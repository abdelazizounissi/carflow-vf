
import AdminLayout from "@/components/admin/AdminLayout";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  MessageSquare, 
  ChevronRight,
  Clock,
  AlertCircle,
  CheckCircle,
  User,
  Building,
  Car
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Dispute {
  id: string;
  clientName: string;
  clientEmail: string;
  agencyName: string;
  agencyEmail: string;
  subject: string;
  description: string;
  status: "open" | "in_progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high";
  createdAt: string;
  vehicle: {
    make: string;
    model: string;
    year: number;
  };
  messages: Message[];
}

interface Message {
  id: string;
  sender: "client" | "agency" | "admin";
  senderName: string;
  content: string;
  timestamp: string;
}

const AdminMediation = () => {
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [activeDispute, setActiveDispute] = useState<Dispute | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [newMessage, setNewMessage] = useState("");
  
  useEffect(() => {
    // Simulate API call
    const fetchDisputes = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Example data
      const mockDisputes: Dispute[] = [
        {
          id: "d1",
          clientName: "Ahmed Ben Ali",
          clientEmail: "ahmed@example.com",
          agencyName: "Auto Premium",
          agencyEmail: "contact@autopremium.tn",
          subject: "Problème de facturation supplémentaire",
          description: "J'ai loué une voiture et l'agence me facture des frais supplémentaires non mentionnés dans le contrat initial.",
          status: "open",
          priority: "high",
          createdAt: "2023-11-10T14:30:00",
          vehicle: {
            make: "Renault",
            model: "Clio",
            year: 2020
          },
          messages: [
            {
              id: "m1",
              sender: "client",
              senderName: "Ahmed Ben Ali",
              content: "Bonjour, j'ai loué une Renault Clio du 5 au 8 novembre et l'agence me réclame des frais supplémentaires pour le nettoyage, alors que j'ai rendu le véhicule propre.",
              timestamp: "2023-11-10T14:30:00"
            },
            {
              id: "m2",
              sender: "agency",
              senderName: "Auto Premium",
              content: "Bonjour M. Ben Ali, selon notre procédure standard, le véhicule nécessitait un nettoyage professionnel suite à des traces de sable sur les sièges et tapis.",
              timestamp: "2023-11-10T16:45:00"
            }
          ]
        },
        {
          id: "d2",
          clientName: "Leila Mansour",
          clientEmail: "leila@example.com",
          agencyName: "Location Facile",
          agencyEmail: "info@locationfacile.tn",
          subject: "Annulation de réservation non remboursée",
          description: "J'ai annulé ma réservation 5 jours avant la date prévue mais je n'ai pas reçu de remboursement.",
          status: "in_progress",
          priority: "medium",
          createdAt: "2023-11-08T10:15:00",
          vehicle: {
            make: "Peugeot",
            model: "208",
            year: 2021
          },
          messages: [
            {
              id: "m3",
              sender: "client",
              senderName: "Leila Mansour",
              content: "Bonjour, j'ai annulé ma réservation 5 jours avant la date prévue conformément à votre politique d'annulation, mais je n'ai toujours pas reçu mon remboursement.",
              timestamp: "2023-11-08T10:15:00"
            },
            {
              id: "m4",
              sender: "agency",
              senderName: "Location Facile",
              content: "Bonjour Mme Mansour, nous avons bien reçu votre demande d'annulation. Le remboursement est en cours de traitement et sera effectué sous 10 jours ouvrables.",
              timestamp: "2023-11-08T14:22:00"
            },
            {
              id: "m5",
              sender: "admin",
              senderName: "Support CarFlow",
              content: "Bonjour, suite à l'examen de ce litige, nous rappelons que selon les CGV, le remboursement doit être effectué sous 5 jours ouvrables. Merci de régulariser la situation rapidement.",
              timestamp: "2023-11-09T11:05:00"
            }
          ]
        },
        {
          id: "d3",
          clientName: "Mehdi Karoui",
          clientEmail: "mehdi@example.com",
          agencyName: "Auto Tunisie",
          agencyEmail: "contact@autotunisie.tn",
          subject: "État du véhicule non conforme",
          description: "Le véhicule loué présentait des problèmes mécaniques non signalés lors de la prise en charge.",
          status: "resolved",
          priority: "high",
          createdAt: "2023-11-05T09:30:00",
          vehicle: {
            make: "Dacia",
            model: "Duster",
            year: 2019
          },
          messages: [
            {
              id: "m6",
              sender: "client",
              senderName: "Mehdi Karoui",
              content: "J'ai rencontré des problèmes avec les freins du véhicule qui n'étaient pas mentionnés lors de la prise en charge. J'ai dû payer pour une réparation d'urgence.",
              timestamp: "2023-11-05T09:30:00"
            },
            {
              id: "m7",
              sender: "agency",
              senderName: "Auto Tunisie",
              content: "Nous sommes désolés pour ce désagrément. Pouvez-vous nous fournir des détails sur la réparation effectuée et la facture correspondante?",
              timestamp: "2023-11-05T11:42:00"
            },
            {
              id: "m8",
              sender: "client",
              senderName: "Mehdi Karoui",
              content: "Voici la facture de la réparation s'élevant à 120 DT. J'attends votre remboursement.",
              timestamp: "2023-11-05T14:20:00"
            },
            {
              id: "m9",
              sender: "agency",
              senderName: "Auto Tunisie",
              content: "Après vérification, nous acceptons de vous rembourser intégralement. Le virement sera effectué dans les 48h.",
              timestamp: "2023-11-06T10:15:00"
            },
            {
              id: "m10",
              sender: "admin",
              senderName: "Support CarFlow",
              content: "Ce litige est désormais résolu suite à l'accord de remboursement de l'agence. Le dossier sera fermé une fois le paiement confirmé.",
              timestamp: "2023-11-06T16:30:00"
            }
          ]
        }
      ];
      
      setDisputes(mockDisputes);
      if (mockDisputes.length > 0) {
        setActiveDispute(mockDisputes[0]);
      }
      setIsLoading(false);
    };
    
    fetchDisputes();
  }, []);

  const filteredDisputes = disputes.filter(dispute => {
    const matchesSearch = 
      dispute.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.agencyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !statusFilter || dispute.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeDispute) return;
    
    const updatedDisputes = disputes.map(dispute => {
      if (dispute.id === activeDispute.id) {
        const newMsg: Message = {
          id: `m${Date.now()}`,
          sender: "admin",
          senderName: "Support CarFlow",
          content: newMessage,
          timestamp: new Date().toISOString()
        };
        
        return {
          ...dispute,
          messages: [...dispute.messages, newMsg]
        };
      }
      return dispute;
    });
    
    setDisputes(updatedDisputes);
    setActiveDispute(prev => {
      if (!prev) return null;
      
      const newMsg: Message = {
        id: `m${Date.now()}`,
        sender: "admin",
        senderName: "Support CarFlow",
        content: newMessage,
        timestamp: new Date().toISOString()
      };
      
      return {
        ...prev,
        messages: [...prev.messages, newMsg]
      };
    });
    
    setNewMessage("");
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

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'open':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Ouvert</Badge>;
      case 'in_progress':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800">En cours</Badge>;
      case 'resolved':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Résolu</Badge>;
      case 'closed':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800">Fermé</Badge>;
      default:
        return null;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case 'low':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Faible</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800">Moyenne</Badge>;
      case 'high':
        return <Badge variant="outline" className="bg-red-100 text-red-800">Élevée</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'open':
        return <AlertCircle className="h-5 w-5 text-blue-500" />;
      case 'in_progress':
        return <Clock className="h-5 w-5 text-amber-500" />;
      case 'resolved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'closed':
        return <MessageSquare className="h-5 w-5 text-gray-500" />;
      default:
        return null;
    }
  };

  return (
    <AdminLayout title="Médiation client-agence">
      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-120px)]">
        {/* Disputes List */}
        <div className="lg:w-1/3 flex flex-col">
          <div className="mb-4 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher un litige"
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tous les statuts</SelectItem>
                <SelectItem value="open">Ouverts</SelectItem>
                <SelectItem value="in_progress">En cours</SelectItem>
                <SelectItem value="resolved">Résolus</SelectItem>
                <SelectItem value="closed">Fermés</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="overflow-y-auto flex-1 border rounded-lg">
            {isLoading ? (
              <div className="space-y-4 p-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-24 bg-gray-200 animate-pulse rounded"></div>
                ))}
              </div>
            ) : filteredDisputes.length === 0 ? (
              <div className="p-8 text-center">
                <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-900">Aucun litige trouvé</h3>
                <p className="text-gray-500 mt-1">Essayez d'ajuster vos filtres</p>
              </div>
            ) : (
              <ul className="divide-y">
                {filteredDisputes.map((dispute) => (
                  <li 
                    key={dispute.id}
                    className={`p-4 hover:bg-gray-50 cursor-pointer ${activeDispute?.id === dispute.id ? 'bg-gray-50' : ''}`}
                    onClick={() => setActiveDispute(dispute)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1">{getStatusIcon(dispute.status)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {dispute.subject}
                          </p>
                          <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-xs text-gray-500 truncate">
                            {dispute.clientName} vs {dispute.agencyName}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          {getStatusBadge(dispute.status)}
                          {getPriorityBadge(dispute.priority)}
                          <span className="text-xs text-gray-500">
                            {formatDate(dispute.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        
        {/* Dispute Details */}
        <div className="lg:w-2/3 flex flex-col">
          {!activeDispute ? (
            <div className="h-full flex items-center justify-center border rounded-lg">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-900">Sélectionnez un litige</h3>
                <p className="text-gray-500 mt-1">Choisissez un litige dans la liste pour voir les détails</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-full border rounded-lg overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">{activeDispute.subject}</h3>
                  <div className="flex gap-2">
                    {getStatusBadge(activeDispute.status)}
                    {getPriorityBadge(activeDispute.priority)}
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  {activeDispute.description}
                </div>
              </div>
              
              <Tabs defaultValue="conversation" className="flex-1 flex flex-col">
                <TabsList className="mx-4 mt-2">
                  <TabsTrigger value="conversation">Conversation</TabsTrigger>
                  <TabsTrigger value="details">Détails</TabsTrigger>
                </TabsList>
                
                <TabsContent value="conversation" className="flex-1 flex flex-col p-0">
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {activeDispute.messages.map((message) => (
                      <div 
                        key={message.id} 
                        className={`flex gap-3 ${message.sender === 'admin' ? 'justify-end' : ''}`}
                      >
                        {message.sender !== 'admin' && (
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className={
                              message.sender === 'client' 
                                ? 'bg-blue-100 text-blue-600' 
                                : 'bg-amber-100 text-amber-600'
                            }>
                              {message.senderName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div className={`max-w-[75%] rounded-lg p-3 ${
                          message.sender === 'admin' 
                            ? 'bg-green-100' 
                            : message.sender === 'client' 
                              ? 'bg-blue-100' 
                              : 'bg-amber-100'
                        }`}>
                          <div className="flex justify-between items-start">
                            <span className="text-sm font-medium">
                              {message.sender === 'client' 
                                ? 'Client' 
                                : message.sender === 'agency' 
                                  ? 'Agence' 
                                  : 'Admin'}
                            </span>
                            <span className="text-xs text-gray-500 ml-2">
                              {formatDate(message.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm mt-1">
                            {message.content}
                          </p>
                        </div>
                        {message.sender === 'admin' && (
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-green-100 text-green-600">
                              A
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-4 border-t mt-auto">
                    <div className="flex gap-2">
                      <Textarea 
                        placeholder="Écrivez votre message ici..." 
                        className="min-h-[80px]"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                      />
                      <Button 
                        className="self-end"
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                      >
                        Envoyer
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="details" className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Informations client</h4>
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <User className="h-10 w-10 text-blue-500 p-2 bg-blue-100 rounded-full" />
                            <div>
                              <p className="font-medium">{activeDispute.clientName}</p>
                              <p className="text-sm text-gray-500">{activeDispute.clientEmail}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Informations agence</h4>
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <Building className="h-10 w-10 text-amber-500 p-2 bg-amber-100 rounded-full" />
                            <div>
                              <p className="font-medium">{activeDispute.agencyName}</p>
                              <p className="text-sm text-gray-500">{activeDispute.agencyEmail}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Véhicule concerné</h4>
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <Car className="h-10 w-10 text-gray-500 p-2 bg-gray-100 rounded-full" />
                            <div>
                              <p className="font-medium">
                                {activeDispute.vehicle.make} {activeDispute.vehicle.model}
                              </p>
                              <p className="text-sm text-gray-500">
                                Année: {activeDispute.vehicle.year}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Actions</h4>
                      <Card>
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Changer le statut" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="open">Ouvert</SelectItem>
                                <SelectItem value="in_progress">En cours</SelectItem>
                                <SelectItem value="resolved">Résolu</SelectItem>
                                <SelectItem value="closed">Fermé</SelectItem>
                              </SelectContent>
                            </Select>
                            
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Changer la priorité" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="low">Faible</SelectItem>
                                <SelectItem value="medium">Moyenne</SelectItem>
                                <SelectItem value="high">Élevée</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </CardContent>
                        <CardFooter className="bg-gray-50 border-t">
                          <Button 
                            variant="outline" 
                            className="w-1/2"
                          >
                            Notifier les deux parties
                          </Button>
                          <Button 
                            className="w-1/2 ml-2"
                          >
                            Appliquer les changements
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminMediation;
