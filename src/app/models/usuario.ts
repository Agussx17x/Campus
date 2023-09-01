export interface Usuario {
  uid: string | any; // uid = id para auth de firebase
  email: string;
  password: string; //password del email

  //////////// Datos Usuario ///////////////////
  
  nombre:string;
  apellido:string;
  dni:string;
  credencial:string; //estudiante, profesor, o admin
}
