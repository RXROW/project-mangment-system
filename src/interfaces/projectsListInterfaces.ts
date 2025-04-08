export interface getProjectTypes {
    id: number;
    title: string;
    description: string;
    creationDate: string;
    modificationDate: string;
    tasks: [
        {
            id: number;
            title: string;
            description: string;
            status: string;
            creationDate: string;
            modificationDate: string;
        }
    ];
    manager: ManagerType
}

export interface ProjectsType {
    id: number;
    title: string;
    description: string;
    creationDate: string;
    isActivated: boolean;
    task: [
        {
            id: string;
            title: string;
            description: string;
            status: string;
            creationDate: string;
            modificationDate: string;
        }
    ];
}


export interface ManagerType {
    id: string;
    userName: string;
    phoneNumber: string;
    email: string;
    imagePath: string;
}

export interface ProjectsRequestParams {
    pageSize?: number;
    pageNumber?: string | number;
    title?: string | null;
}


export interface AddNewProject {
    title: string
    description: string
}

export const Headers = {
  headers: { Authorization: localStorage.getItem('token') },
};