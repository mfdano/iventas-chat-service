export class UserDTO {
  id: string;
  name: string;
  phoneNumber: number;
  imageProfileSRC: string;
  age: number;
  email: string;
  priority: string;
  problemDescription: string;
  promoDescription: string;
  CURP: string;

  constructor(id: string, name: string, phoneNumber: number, imageProfileSRC: string,
    age: number, email: string, priority: string, problemDescription: string,
    promoDescription: string, CURP: string) {
      
    this.id = id;
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.imageProfileSRC = imageProfileSRC;
    this.age = age;
    this.email = email;
    this.priority = priority;
    this.problemDescription = problemDescription;
    this.promoDescription = promoDescription;
    this.CURP = CURP;
  }
}
