import {companies,companycredittransactions,orderitems,orderlogs,orderpaymenttypes,orders,orderstatuses,paymenttypes,practitioners,products,userroles,users,AppointmentPostDto,AppointmentResultDto,LoadScheduleProfessional,ShospAgendaGetPorPaciente,ResponseGetUserDto} from "@/back-end" 

 export type Swagger = {
  "/Appointment": {
    post: {
      params: null,
      requestBody: AppointmentPostDto,
      result: AppointmentResultDto
    }
  },
  "/Authentication": {
    post: {
      params: null,
      requestBody: {emailAddress:string,password:string},
      result: {data:{token:string}}
    }
  },
  "/Companies": {
    get: {
      params: null,
      requestBody: null,
      result: companies[]
    },
    post: {
      params: null,
      requestBody: companies,
      result: companies
    },
    put: {
      params: null,
      requestBody: companies,
      result: {}
    },
    delete: {
      params: {CompanyId:string | undefined},
      requestBody: null,
      result: {}
    }
  },
  "/Companies/{id}": {
    get: {
      params: {id:string | undefined},
      requestBody: null,
      result: companies
    }
  },
  "/Practitioners": {
    get: {
      params: null,
      requestBody: null,
      result: {}
    },
    post: {
      params: null,
      requestBody: practitioners,
      result: practitioners
    },
    put: {
      params: null,
      requestBody: practitioners,
      result: {ok:boolean}
    },
    delete: {
      params: null,
      requestBody: {PractitionerId:string},
      result: {ok:boolean}
    }
  },
  "/Products": {
    get: {
      params: null,
      requestBody: null,
      result: products[]
    },
    post: {
      params: null,
      requestBody: products,
      result: products
    },
    put: {
      params: null,
      requestBody: products,
      result: {}
    },
    delete: {
      params: null,
      requestBody: {ProductId:string},
      result: {ok:boolean}
    }
  },
  "/Shosp/agenda": {
    get: {
      params: {codigoPrestador:string | undefined},
      requestBody: null,
      result: LoadScheduleProfessional
    }
  },
  "/Shosp/detail-patient": {
    get: {
      params: {codigoPaciente:string | undefined},
      requestBody: null,
      result: ShospAgendaGetPorPaciente
    }
  },
  "/Shosp/prestadores": {
    get: {
      params: null,
      requestBody: null,
      result: {}
    }
  },
  "/Users/me": {
    get: {
      params: null,
      requestBody: null,
      result: {data:users}
    }
  },
  "/Users": {
    get: {
      params: {RoleId:string | undefined,CompanyId:string | undefined},
      requestBody: null,
      result: ResponseGetUserDto[]
    },
    post: {
      params: null,
      requestBody: users,
      result: {ok:boolean}
    },
    put: {
      params: null,
      requestBody: users,
      result: {ok:boolean}
    },
    delete: {
      params: {UserId:string | undefined},
      requestBody: null,
      result: {ok:boolean}
    }
  }
};