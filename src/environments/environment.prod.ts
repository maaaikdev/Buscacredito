export const environment = {
  production: true,
  gtmPruebas: false,
  envName: 'master',
  clientId: 'AvI7MZug3dyIZk1JGFNDm+JOX28ruCgtA9I6d71C4Wg=',
  domain: 'midatacredito.com',
  APIEndpoint_nwuser: 'https://buscacredito.midatacredito.com/nwuser-ws',
  APIEndpoint_lstng: 'https://buscacredito.midatacredito.com/listing-ws',
  APIEndpoint_bank: 'https://buscacredito.midatacredito.com/bank-ws',
  APIEndpoint_authn: 'https://buscacredito.midatacredito.com/authn-ws/',
  urlLogin: 'https://usuario.midatacredito.com//login?product=bc',
  urlRegister: 'https://usuario.midatacredito.com/registro?product=bc',
  urlSeguridad: 'https://usuario.midatacredito.com/seguridad?product=bc',
  urlOTP: 'https://usuario.midatacredito.com/seguridad/otp?product=bc',

  updateProfile: '/new-user-ws/api/v1/user/updateProfile',
  offersListHome: '/ecs/datacash/bank/v1/homeOffers',
  offers: '/ecs/datacash/bank/v1/offers',

  EvidenteEP: {
    validateQues: 'https://usuario.midatacredito.com/validation/api/v1/evidente/validateQuestionsCustomer',
    validateCusto: 'https://usuario.midatacredito.com/validation/api/v1/evidente/validateCustomer',
    validateOTPCusto: 'https://usuario.midatacredito.com/validation/api/v1/evidente/validateOTPCustomer',
    generateOTP: 'https://usuario.midatacredito.com/validation/api/v1/evidente/generateOTP',
    verifyOTP: 'https://usuario.midatacredito.com/validation/api/v1/evidente/verifyOTP'
  },
  country:'CO'
};