export type Swagger = {
  "/Account/user/create": {
    post: {
      params: {},
      requestBody: CreateAccountResponse,
      result: CreateAccountResult
    }
  },
  "/Account/user/verification": {
    get: {
      params: {email:string,token:string},
      requestBody: null,
      result: null
    }
  },
  "/Account/user/update": {
    post: {
      params: {},
      requestBody: UpdateAccountResponse,
      result: UpdateAccountResult
    }
  },
  "/Authentication": {
    post: {
      params: {},
      requestBody: UsuarioLoginDto,
      result: LoginResult
    }
  },
  "/Users/me": {
    get: {
      params: {},
      requestBody: null,
      result: null
    }
  },
  "/Blog/list": {
    get: {
      params: {category:string,search:string,tags:string,page:number},
      requestBody: null,
      result: BlogPage
    }
  },
  "/Blog/detail/{url}": {
    get: {
      params: {url:string},
      requestBody: null,
      result: null
    }
  },
  "/Blog/destaques": {
    get: {
      params: {page:number},
      requestBody: null,
      result: null
    }
  },
  "/Blog/categorias": {
    get: {
      params: {},
      requestBody: null,
      result: null
    }
  },
  "/Configs": {
    get: {
      params: {},
      requestBody: null,
      result: null
    }
  },
  "/Courses/list": {
    get: {
      params: {},
      requestBody: null,
      result: CoursesPage
    }
  },
  "/Courses/detail/{guid}": {
    get: {
      params: {guid:string},
      requestBody: null,
      result: CourseDetailPage
    }
  },
  "/Forms/contact": {
    post: {
      params: {},
      requestBody: ContactDTO,
      result: null
    }
  },
  "/Forms/prelaunch": {
    post: {
      params: {},
      requestBody: User,
      result: null
    }
  },
  "/Forms/work": {
    post: {
      params: {},
      requestBody: ContactDTO,
      result: null
    }
  },
  "/Forms/newsletter": {
    post: {
      params: {},
      requestBody: ContactDTO,
      result: null
    }
  },
  "/Language": {
    get: {
      params: {},
      requestBody: null,
      result: null
    }
  },
  "/Language/word": {
    get: {
      params: {},
      requestBody: null,
      result: null
    }
  },
  "/Metadata": {
    post: {
      params: {},
      requestBody: null,
      result: null
    }
  },
  "/Metadata/{id}": {
    delete: {
      params: {id:string},
      requestBody: null,
      result: null
    }
  },
  "/Pages/{url}": {
    get: {
      params: {url:string},
      requestBody: null,
      result: null
    }
  },
  "/Pages/{entityKey}/listing": {
    get: {
      params: {entityKey:string,category:string,search:string,tags:string,page:number,pageSize:number},
      requestBody: null,
      result: null
    }
  },
  "/Pages/detail/{entityKey}/{url}": {
    get: {
      params: {entityKey:string,url:string},
      requestBody: null,
      result: null
    }
  },
  "/Platform/configs": {
    get: {
      params: {tenantId:string},
      requestBody: null,
      result: Configs
    }
  },
  "/Section": {
    post: {
      params: {},
      requestBody: SectionDto,
      result: null
    },
    get: {
      params: {page:string},
      requestBody: null,
      result: null
    }
  },
  "/Section/{id}": {
    put: {
      params: {id:number},
      requestBody: SectionDto,
      result: null
    }
  },
  "/Sitemap/xml": {
    get: {
      params: {},
      requestBody: null,
      result: null
    }
  },
  "/Sitemap/json": {
    get: {
      params: {},
      requestBody: null,
      result: null
    }
  }
};

export interface Address {
  id?: number;
  ativo?: boolean;
  excluido?: boolean;
  dataCriacao?: string;
  dataEdicao?: string;
  userId?: number;
  fullAddress?: string;
  identification?: string;
  street?: string;
  number?: string;
  district?: string;
  complement?: string;
  zipCode?: string;
  city?: string;
  state?: string;
  mainAddress?: boolean;
  country?: string;
  cep?: string;
  localidade?: string;
  uf?: string;
  estado?: string;
  regiao?: string;
  ibge?: string;
  gia?: string;
  ddd?: string;
  siafi?: string;
}

export interface BlogPage {
  head?: Head;
  body?: Body;
  page?: Item;
  posts?: Item[];
  destaques?: Item[];
  categorias?: Item[];
  pagination?: Pagination;
}

export interface Body {
  bodyScripts?: string;
  tituloBanner?: string;
  descricaoBanner?: string;
  subtitulo?: string;
  descricao?: string;
  nossaHistoria?: string;
  solucoesPersonalizadas?: string;
}

export interface Categories {
  title?: string;
  courses?: CourseItemShort[];
}

export interface Configs {
  workspaces?: WorkspaceItems[];
  configurations?: Configurations;
  contents?: Contents;
}

export interface Configurations {
  logo?: string;
  primaryColor?: string;
  secondaryColor?: string;
  tertiaryColor?: string;
  subscriptionModel?: string;
}

export interface ContactDTO {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  additionalFields?: Record<string, any>;
}

export interface Contents {
  methodology?: string;
}

export interface Course {
  id?: number;
  guid?: string;
  title: string;
  description?: string;
  coverImageUrl?: string;
  url?: string;
  duration?: number;
  numberOfModules?: number;
  numberOfLessons?: number;
  numberOfReviews?: number;
  averageRating?: number;
  isActive?: boolean;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  updatedBy?: number;
  courseCategoryId?: number;
  courseCategory?: CourseCategory;
  updatedByUser?: User;
  modules?: Module[];
  journeyCourses?: JourneyCourse[];
  userCourses?: UserCourse[];
}

export interface CourseCategory {
  id?: number;
  title: string;
  description?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  courses?: Course[];
}

export interface CourseDetailPage {
  page?: CourseItemShort;
}

export interface CourseItemShort {
  id?: number;
  title?: string;
  coverThumbUrl?: string;
  coverImageUrl?: string;
  duration?: number;
  averageRating?: number;
  url?: string;
  modules?: ModuleItemShort[];
  lessons?: LessonItemShort[];
}

export interface CoursesPage {
  page?: Item;
  banners?: Item[];
  categories?: Categories[];
}

export interface CreateAccountResponse {
  nome: string;
  sobrenome: string;
  cpf: string;
  email: string;
  whatsapp: string;
  password: string;
  confirmPassword: string;
}

export interface CreateAccountResult {
  data?: UserDto;
  status?: number;
  title?: string;
  message?: string;
  validationErrors?: Record<string, any>;
}

export interface DataResult {
  token?: string;
}

export interface ErrorKeyString {
  errors?: string[];
}

export interface ErrorResult {
  status?: number;
  title?: string;
  message?: string;
  validationErrors?: Record<string, any>;
}

export interface Head {
  pageTitle?: string;
  metaDescription?: string;
  imageOpenGraph?: string;
  headScripts?: string;
}

export interface Item {
  id?: number;
  ordem?: number;
  titulo?: string;
  subtitulo?: string;
  thumbnail?: string;
  imagem?: string;
  ref?: string;
  pageTitle?: string;
  metaDescription?: string;
  imageOpenGraph?: string;
  headScripts?: string;
  bodyScripts?: string;
  groupPagina?: string;
  imagemAlt?: string;
  thumbnailAlt?: string;
  imagemMobile?: string;
  arquivo?: string;
  url?: string;
  tags?: string;
  destaque?: boolean;
  datas?: string;
  menu?: boolean;
  data?: string;
  dataCriacao?: string;
  link?: string;
  descricao?: string;
  dataCadastro?: string;
  fields?: Record<string, any>;
  imagens?: Item[];
  items?: Item[];
}

export interface Journey {
  id?: number;
  userId?: number;
  title: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
  progressData?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  user?: User;
  journeyCourses?: JourneyCourse[];
}

export interface JourneyCourse {
  journeyId?: number;
  courseId?: number;
  journey?: Journey;
  course?: Course;
}

export interface KeyString {
  errors?: string[];
}

export interface Lesson {
  id?: number;
  guid?: string;
  moduleId?: number;
  title: string;
  contentUrl?: string;
  duration?: number;
  order?: number;
  isActive?: boolean;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  thumbnail?: string;
  url?: string;
  videoContent?: string;
  description?: string;
  isFeatured?: boolean;
  updatedBy?: number;
  module?: Module;
  updatedByUser?: User;
}

export interface LessonItemShort {
  id?: number;
  title?: string;
  order?: number;
  thumbnail?: string;
  url?: string;
  videoContent?: string;
  description?: string;
  isFeatured?: boolean;
}

export interface LoginResult {
  data?: DataResult;
}

export interface Module {
  id?: number;
  guid?: string;
  courseId?: number;
  title: string;
  description?: string;
  coverImageUrl?: string;
  duration?: number;
  numberOfLessons?: number;
  order?: number;
  isActive?: boolean;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  updatedBy?: number;
  course?: Course;
  updatedByUser?: User;
  lessons?: Lesson[];
}

export interface ModuleItemShort {
  id?: number;
  title?: string;
  order?: number;
  duration?: number;
  lessons?: LessonItemShort[];
}

export interface Pagination {
  pageTotal?: number;
  pageSize?: number;
  pageNumber?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  isFirstPage?: boolean;
  isLastPage?: boolean;
  endPage?: number;
  startPage?: number;
  totalPages?: number;
  totalItems?: number;
  pages?: number[];
}

export interface Permission {
  id?: number;
  name: string;
  description?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  rolePermissions?: RolePermission[];
  subscriptionPlanPermissions?: SubscriptionPlanPermission[];
}

export interface Role {
  id?: number;
  name: string;
  description?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  userRoles?: UserRole[];
  rolePermissions?: RolePermission[];
}

export interface RolePermission {
  roleId?: number;
  permissionId?: number;
  role?: Role;
  permission?: Permission;
}

export interface SectionDto {
  id?: number;
  ref?: string;
  linkUrl?: string;
  videoUrl?: string;
  jsonContent?: string;
  enabled?: boolean;
  i18n?: Record<string, any>;
}

export interface SubscriptionPlan {
  id?: number;
  guid?: string;
  planName: string;
  description?: string;
  price?: number;
  durationInDays?: number;
  isActive?: boolean;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  subscriptionPlanPermissions?: SubscriptionPlanPermission[];
  userSubscriptions?: UserSubscription[];
}

export interface SubscriptionPlanPermission {
  subscriptionPlanId?: number;
  permissionId?: number;
  subscriptionPlan?: SubscriptionPlan;
  permission?: Permission;
}

export interface TranslationDto {
  title?: string;
  subtitle?: string;
  description?: string;
  linkText?: string;
}

export interface UpdateAccountResponse {
  email?: string;
  nome?: string;
  login?: string;
  password?: string;
  roleGate?: string;
  avatar?: string;
  imagem?: string;
}

export interface UpdateAccountResult {
  success?: boolean;
  message?: string;
  updatedUser?: UserDto;
}

export interface User {
  id?: number;
  ativo?: boolean;
  excluido?: boolean;
  dataCriacao?: string;
  dataEdicao?: string;
  email?: string;
  username?: string;
  password?: string;
  role?: string;
  avatar?: string;
  name?: string;
  surname?: string;
  guid?: string;
  birthday?: string;
  gender?: string;
  phone?: string;
  cpf?: string;
  address?: Address;
  userRoles?: UserRole[];
  userSubscriptions?: UserSubscription[];
  userCourses?: UserCourse[];
  journeys?: Journey[];
}

export interface UserCourse {
  id?: number;
  userId?: number;
  courseId?: number;
  purchaseDate?: string;
  accessStartDate?: string;
  accessEndDate?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  user?: User;
  course?: Course;
}

export interface UserDto {
  token?: string;
}

export interface UserRole {
  userId?: number;
  roleId?: number;
  user?: User;
  role?: Role;
}

export interface UserSubscription {
  id?: number;
  userId?: number;
  subscriptionPlanId?: number;
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  user?: User;
  subscriptionPlan?: SubscriptionPlan;
}

export interface UsuarioLoginDto {
  emailAddress?: string;
  password?: string;
}

export interface WorkspaceItems {

}