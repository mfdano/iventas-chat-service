export class AddUserDTO {
  name: string;
  phoneNumber: number;
  imageProfileSRC: string;
  age: number;
  email: string;
  priority: string;
  problemDescription: string;
  promoDescription: string;
  CURP: string;
  password: string;
  notes: string;

  constructor(name: string, phoneNumber: number, imageProfileSRC: string,
    age: number, email: string, priority: string, problemDescription: string,
    promoDescription: string, CURP: string, password: string,  notes: string) {
      
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.imageProfileSRC = imageProfileSRC;
    this.age = age;
    this.email = email;
    this.priority = priority;
    this.problemDescription = problemDescription;
    this.promoDescription = promoDescription;
    this.CURP = CURP;
    this.password = password;
    this.notes = notes;
  }
}
