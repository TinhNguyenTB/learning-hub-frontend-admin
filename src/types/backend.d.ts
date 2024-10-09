export interface IRequest {
    url: string
    method: string
    body?: { [key: string]: any }
    queryParams?: any
    useCredentials?: boolean
    headers?: any
}

export interface IBackendRes<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: T;
}

export interface IModelPaginate<T> {
    meta: {
        current: number;
        pageSize: number;
        pages: number;
        total: number;
    },
    result: T[]
}

export interface ILevel {
    id: string
    name: string
}

export interface ICategory {
    id: string
    name: string
    subCategories: ISubcategory[]
}

export interface ISubcategory {
    id: string
    name: string
    categoryId: string
}

export interface ICourse {
    id: string
    title: string
    subTitle: string
    description: string
    imageUrl: string
    price: number
    isPublished: boolean
    instructorId: string
    category: ICategory
    categoryId: string
    subCategoryId: string
    levelId: string
    sections: ISection[]
    comments?: IComment[]
    ratings?: IRating[]
    averageRating?: number
    statusName: string
}

export interface ILevel {
    id: string
    name: string
}

export interface IResource {
    id: string
    name: string
    fileUrl: string
    sectionId: string
}

export interface ISection {
    id: string
    title: string
    description: string
    videoUrl: string
    position: number
    isPublished: boolean
    isFree: boolean
    courseId: string
    resources: IResource[]
}

export interface IComment {
    id: string
    content: string
    userId: string
    courseId: string
    createdAt: Date
    updatedAt: Date
}

export interface IRating {
    id: string
    content: string
    quality: number
    userId: string
    courseId: string
    createdAt: Date
    updatedAt: Date
}