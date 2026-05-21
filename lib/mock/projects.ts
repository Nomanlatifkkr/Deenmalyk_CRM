import { Project, SubService, ActualCost } from '@/types/project';

export const mockProjects: Project[] = [
  {
    id: '1',
    projectNumber: 'P-1001',
    name: 'Bürogebäude Stuttgart',
    description: 'Komplettsanierung Bürogebäude, 1200m²',
    customerId: '1',
    customerName: 'ABC Construction GmbH',
    status: 'in_progress',
    startDate: '2024-05-01',
    endDate: '2024-08-30',
    totalValue: 285000,
    plannedCosts: 198000,
    actualCosts: 156000,
    plannedMargin: 87000,
    actualMargin: 129000,
    subServices: [
      {
        id: 'ss1',
        name: 'Estrich verlegen',
        description: 'Zementestrich EG',
        quantity: 450,
        unit: 'm²',
        unitPrice: 22.5,
        totalPrice: 10125,
        assignedCrewId: 'crew1',
        status: 'in_progress',
      },
      {
        id: 'ss2',
        name: 'Heizungsinstallation',
        description: 'Fußbodenheizung',
        quantity: 450,
        unit: 'm²',
        unitPrice: 85,
        totalPrice: 38250,
        assignedCrewId: 'crew2',
        status: 'pending',
      },
    ],
    actualCostsList: [
      {
        id: 'ac1',
        category: 'material',
        description: 'Zement 25kg Säcke',
        amount: 4250,
        date: '2024-05-05',
        invoiceNumber: 'RE-1001',
      },
      {
        id: 'ac2',
        category: 'labor',
        description: 'Estrich Team A - 120h',
        amount: 5400,
        date: '2024-05-10',
      },
    ],
    createdAt: '2024-04-15T10:00:00Z',
    updatedAt: '2024-05-15T10:00:00Z',
  },
  {
    id: '2',
    projectNumber: 'P-1002',
    name: 'Wohnanlage München',
    description: 'Neubau 24 Wohneinheiten',
    customerId: '2',
    customerName: 'Bauwerk AG',
    status: 'planning',
    startDate: '2024-06-15',
    totalValue: 890000,
    plannedCosts: 645000,
    actualCosts: 0,
    plannedMargin: 245000,
    actualMargin: 0,
    subServices: [],
    actualCostsList: [],
    createdAt: '2024-05-01T10:00:00Z',
    updatedAt: '2024-05-01T10:00:00Z',
  },
];

export const fetchProjects = async (): Promise<Project[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return [...mockProjects];
};

export const fetchProject = async (id: string): Promise<Project | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return mockProjects.find(p => p.id === id);
};

export const createProject = async (data: Omit<Project, 'id' | 'projectNumber' | 'createdAt' | 'updatedAt' | 'actualCosts' | 'actualCostsList'>): Promise<Project> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const newProject: Project = {
    ...data,
    id: Date.now().toString(),
    projectNumber: `P-${Date.now()}`,
    actualCosts: 0,
    actualMargin: data.totalValue - data.plannedCosts,
    actualCostsList: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  mockProjects.push(newProject);
  return newProject;
};

export const updateProject = async (id: string, data: Partial<Project>): Promise<Project> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = mockProjects.findIndex(p => p.id === id);
  if (index === -1) throw new Error('Project not found');
  const updated = { ...mockProjects[index], ...data, updatedAt: new Date().toISOString() };
  mockProjects[index] = updated;
  return updated;
};

export const deleteProject = async (id: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = mockProjects.findIndex(p => p.id === id);
  if (index !== -1) mockProjects.splice(index, 1);
};

export const updateSubServices = async (projectId: string, subServices: SubService[]): Promise<Project> => {
  return updateProject(projectId, { subServices });
};

export const addActualCost = async (projectId: string, cost: Omit<ActualCost, 'id'>): Promise<Project> => {
  const project = await fetchProject(projectId);
  if (!project) throw new Error('Project not found');
  const newCost: ActualCost = { ...cost, id: Date.now().toString() };
  const newCosts = [...project.actualCostsList, newCost];
  const totalActual = newCosts.reduce((sum, c) => sum + c.amount, 0);
  const actualMargin = project.totalValue - totalActual;
  return updateProject(projectId, { actualCostsList: newCosts, actualCosts: totalActual, actualMargin });
};

export const completeProject = async (projectId: string): Promise<Project> => {
  return updateProject(projectId, { status: 'completed', endDate: new Date().toISOString().split('T')[0] });
};